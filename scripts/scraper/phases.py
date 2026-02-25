"""Phase implementations for the scraper pipeline."""
import asyncio
import random
import re
import tempfile
import os
from typing import Dict, List, Optional
from datetime import datetime

import httpx
from bs4 import BeautifulSoup

from .config import (
    GOOGLE_MAPS_API_KEY, SERPAPI_KEY, USER_AGENTS,
    CITY_KNOWN_DATA, RAINY_CITIES,
    GOV_URL_PATTERNS, WASTE_SEARCH_QUERIES, ORDINANCE_SEARCH_QUERIES,
    LOW_CONFIDENCE_THRESHOLD,
)
from .utils import Logger, calculate_confidence
from .agents import (
    AgentCityDiscovery,
    AgentDispatcher, AgentRuleEnforcer, AgentNavigator,
    AgentAuditor, CharismaSynthesizer,
)
from .geo_validator import GeoValidator, US_STATES


# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 1: FOUNDATION LAYER
# ═══════════════════════════════════════════════════════════════════════════════

class Phase1Foundation:
    """Phase 1: Get deterministic data from APIs."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.geo_validator = GeoValidator(logger, GOOGLE_MAPS_API_KEY)

    async def execute(self, city_name: str, state_abbr: str, state_name: str = '') -> Dict:
        """Execute Phase 1: Foundation Layer."""
        foundation: Dict = {}
        state_abbr = state_abbr.upper()
        state_name = state_name or US_STATES.get(state_abbr, state_abbr)

        # ── CRITICAL: Validate city-state BEFORE any scraping ────────────────
        is_valid, error = await self.geo_validator.validate_city_state(city_name, state_abbr)
        if not is_valid:
            self.logger.log('geo_validation', 'BLOCKED',
                            f"Skipping {city_name}, {state_abbr}: {error}")
            return {
                'geo_validation_failed': True,
                'geo_validation_error': error,
                'latitude': None,
                'longitude': None,
                'zip_codes': [],
                'population': {'count': None, 'year': 2020, 'source': None},
                'weather_profile': {'is_rain_heavy': False, 'rejection_risk_copy': None},
            }

        foundation['geo_validation_failed'] = False

        async with httpx.AsyncClient(timeout=15.0) as client:
            # ── 1A: Google Geocoding (state-verified) ─────────────────────────
            # BUG 5 FIX: Use components filter and verify returned state matches.
            try:
                geocode_url = "https://maps.googleapis.com/maps/api/geocode/json"
                params = {
                    'address': f"{city_name}, {state_name}, USA",
                    'components': f"administrative_area:{state_abbr}|country:US",
                    'key': GOOGLE_MAPS_API_KEY,
                }
                response = await client.get(geocode_url, params=params)
                data = response.json()

                if data['status'] == 'OK':
                    result = data['results'][0]

                    # Verify returned state matches before trusting coordinates.
                    components = {
                        c['types'][0]: c
                        for c in result.get('address_components', [])
                    }
                    actual_state = (
                        components.get('administrative_area_level_1', {})
                        .get('short_name', '').upper()
                    )

                    if actual_state != state_abbr:
                        self.logger.log(
                            'geo_api', 'STATE_MISMATCH',
                            f"Geocode returned {actual_state} for {city_name}, {state_abbr}",
                        )
                        foundation['latitude'] = None
                        foundation['longitude'] = None
                        foundation['zip_codes'] = []
                    else:
                        location = result['geometry']['location']
                        foundation['latitude'] = location['lat']
                        foundation['longitude'] = location['lng']
                        self.logger.log(
                            'geo_api', 'SUCCESS',
                            f"Lat: {location['lat']}, Lng: {location['lng']}",
                        )

                        # ── 1A-ii: Zip codes via Geocoding bounding box ───────
                        # BUG 8 FIX: Use viewport bounding box to query zip codes
                        # within the city's actual boundary rather than just the
                        # centroid result, which gives only 0–3 zip codes.
                        foundation['zip_codes'] = await self._fetch_zip_codes(
                            client, city_name, state_abbr,
                            result['geometry'].get('viewport', {}),
                        )
                else:
                    self.logger.log('geo_api', 'FAILED', data['status'])
                    foundation['latitude'] = None
                    foundation['longitude'] = None
                    foundation['zip_codes'] = []

            except Exception as e:
                self.logger.log('geo_api', 'ERROR', str(e))
                foundation['latitude'] = None
                foundation['longitude'] = None
                foundation['zip_codes'] = []

            # ── 1B: Census population ─────────────────────────────────────────
            foundation['population'] = await self._fetch_population(
                client, city_name, state_abbr
            )

        # ── 1C: Weather profile ───────────────────────────────────────────────
        is_rainy = city_name in RAINY_CITIES
        foundation['weather_profile'] = {
            'is_rain_heavy': is_rainy,
            'rejection_risk_copy': (
                f"WARNING: {city_name} averages 100+ rainy days per year. "
                f"If your mattress gets wet before pickup, the city WILL NOT take it "
                f"(too heavy, mold risk). Our haulers pick up from inside your home — rain or shine."
            ) if is_rainy else None,
        }
        self.logger.log('weather_profile', 'DETERMINED', f"Rainy: {is_rainy}")

        return foundation

    # ── HELPERS ──────────────────────────────────────────────────────────────

    async def _fetch_zip_codes(
        self,
        client: httpx.AsyncClient,
        city_name: str,
        state_abbr: str,
        viewport: Dict,
    ) -> List[str]:
        """
        Fetch zip codes within the city's viewport bounding box.

        BUG 8 FIX (original): Sample a grid within the viewport rather than
        trusting the 0–3 postal_code components in a single geocoding result.

        BUG C FIX (live run): Detroit's viewport includes Windsor, Ontario →
        Canadian postal codes like "N0R 1K0" were leaking in.

        BUG D FIX (live run): Coastal cities (San Diego) have grid points that
        land in the ocean; reverse geocoding those returns zip codes from distant
        states (e.g., 22444 Virginia). 

        Solution: after sampling, filter to:
          - Exactly 5 ASCII digits (US zip format, not Canadian alphanumeric)
          - State abbreviation in the reverse-geocode response matches target state
        """
        zip_codes: List[str] = []
        try:
            ne = viewport.get('northeast', {})
            sw = viewport.get('southwest', {})

            if not ne or not sw:
                return await self._fetch_zip_codes_radius(client, city_name, state_abbr)

            lat_steps = [
                sw.get('lat', 0),
                (ne.get('lat', 0) + sw.get('lat', 0)) / 2,
                ne.get('lat', 0),
            ]
            lng_steps = [
                sw.get('lng', 0),
                (ne.get('lng', 0) + sw.get('lng', 0)) / 2,
                ne.get('lng', 0),
            ]

            seen: set = set()
            for lat in lat_steps:
                for lng in lng_steps:
                    try:
                        resp = await client.get(
                            "https://maps.googleapis.com/maps/api/geocode/json",
                            params={
                                'latlng': f"{lat},{lng}",
                                'result_type': 'postal_code',
                                'key': GOOGLE_MAPS_API_KEY,
                            },
                        )
                        data = resp.json()
                        for result in data.get('results', []):
                            comps = result.get('address_components', [])
                            # Verify the returned result is actually in the target state.
                            result_state = ''
                            for c in comps:
                                if 'administrative_area_level_1' in c.get('types', []):
                                    result_state = c.get('short_name', '').upper()
                            if result_state and result_state != state_abbr.upper():
                                continue   # BUG C/D FIX: skip wrong-state results
                            for c in comps:
                                if 'postal_code' in c.get('types', []):
                                    zc = c['long_name']
                                    # BUG C FIX: US zip codes are exactly 5 ASCII digits.
                                    # Canadian codes are alphanumeric (e.g., "N0R 1K0").
                                    if zc.isdigit() and len(zc) == 5 and zc not in seen:
                                        seen.add(zc)
                                        zip_codes.append(zc)
                    except Exception:
                        pass

            if zip_codes:
                self.logger.log('zip_codes', 'SUCCESS', f"Found {len(zip_codes)} zip codes")
                return sorted(set(zip_codes))[:20]

        except Exception as e:
            self.logger.log('zip_codes', 'ERROR', str(e))

        return await self._fetch_zip_codes_radius(client, city_name, state_abbr)

    async def _fetch_zip_codes_radius(
        self, client: httpx.AsyncClient, city_name: str, state_abbr: str
    ) -> List[str]:
        """
        Fallback zip code fetch using a single centroid geocode result.

        BUG H FIX: The original fallback had no state filtering — it would accept
        any postal_code component from the first 5 geocoding results, including
        zip codes from adjacent states (Philadelphia → NJ 08xxx codes).
        Fix: verify each result's administrative_area_level_1 matches target state.
        """
        try:
            resp = await client.get(
                "https://maps.googleapis.com/maps/api/geocode/json",
                params={
                    'address': f"{city_name}, {state_abbr}, USA",
                    'key': GOOGLE_MAPS_API_KEY,
                },
            )
            zips = []
            for result in resp.json().get('results', [])[:5]:
                comps = result.get('address_components', [])
                # Verify this result is in the target state.
                result_state = ''
                for c in comps:
                    if 'administrative_area_level_1' in c.get('types', []):
                        result_state = c.get('short_name', '').upper()
                if result_state and result_state != state_abbr.upper():
                    continue  # Skip results from wrong state
                for c in comps:
                    if 'postal_code' in c.get('types', []):
                        zc = c['long_name']
                        if zc.isdigit() and len(zc) == 5:
                            zips.append(zc)
            return list(set(zips))[:10]
        except Exception:
            return []

    async def _fetch_population(
        self, client: httpx.AsyncClient, city_name: str, state_abbr: str
    ) -> Dict:
        """
        Fetch population from Census Bureau ACS5 API.

        BUG A FIX (live run): Philadelphia returned 1,052 instead of ~1.6M.
        The old code iterated ACS5 rows and returned the FIRST substring match for
        city_name, which could be a tiny "Philadelphia township" CDP before
        "Philadelphia city, Pennsylvania". San Diego had same issue (21,759 not 1.4M).

        Fix strategy:
          1. Try EXACT canonical Census name: "{city} city, {state_full_name}"
          2. Fall back to the row with the LARGEST population among all substring matches
             (always picks the major incorporated city over a small CDP or township)
        """
        state_fips = _STATE_FIPS.get(state_abbr.upper())
        state_full = US_STATES.get(state_abbr.upper(), state_abbr)
        city_slug = city_name.lower().replace(' ', '').replace('-', '')
        census_url = (
            f"https://www.census.gov/quickfacts/fact/table/"
            f"{city_slug}city{state_abbr.lower()}"
        )

        if not state_fips:
            return {'count': None, 'year': 2022, 'source': census_url}

        try:
            resp = await client.get(
                "https://api.census.gov/data/2022/acs/acs5",
                params={
                    'get': 'NAME,B01003_001E',
                    'for': 'place:*',
                    'in': f'state:{state_fips}',
                },
                timeout=8.0,
            )
            if resp.status_code == 200:
                rows = resp.json()
                city_lower = city_name.lower()
                state_full_lower = state_full.lower()
                # Census canonical name: "Austin city, Texas" or "New York city, New York"
                canonical = f"{city_lower} city, {state_full_lower}"

                exact_row = None
                best_pop = -1
                best_row = None

                for row in rows[1:]:
                    name_field = row[0].lower()   # e.g. "philadelphia city, pennsylvania"
                    try:
                        pop_val = int(row[1]) if row[1] else 0
                    except (ValueError, TypeError):
                        pop_val = 0

                    # Exact canonical match → use immediately
                    if name_field == canonical:
                        exact_row = row
                        break

                    # Among substring matches, keep the one with LARGEST population.
                    # This ensures "Philadelphia city" (1.6M) beats "Philadelphia Mills CDP" (1,052).
                    if city_lower in name_field and pop_val > best_pop:
                        best_pop = pop_val
                        best_row = row

                chosen = exact_row if exact_row else best_row
                if chosen:
                    pop = int(chosen[1]) if chosen[1] else None
                    self.logger.log(
                        'census_api', 'SUCCESS',
                        f"Population: {pop:,} ({chosen[0]})" if pop else "No population",
                    )
                    return {'count': pop, 'year': 2022, 'source': census_url}

        except Exception as e:
            self.logger.log('census_api', 'ERROR', str(e))

        self.logger.log('census_api', 'QUEUED', census_url)
        return {'count': None, 'year': 2022, 'source': census_url}


# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 2: RECONNAISSANCE LAYER
# ═══════════════════════════════════════════════════════════════════════════════

class Phase2Reconnaissance:
    """
    Phase 2: Search and fetch official sources.

    FIX 1 — Generic domain validation  (no more hardcoded Dallas URLs)
    FIX 2 — Generic URL pattern fallback  (replaces _dallas_fallback)
    FIX 3 — AgentCityDiscovery integration  (when all scraping fails)
    FIX 4 — Secondary source fallback  (Wikipedia, news) on LOW confidence
    FIX 5 — Geographical content validation (prevents NYC/New York TX confusion)
    FIX 6 — State-aware domain filtering (no more ny.gov passing for TX queries)
    FIX 7 — LLM-generated URL verification before use
    """

    def __init__(self, logger: Logger):
        self.logger = logger
        self._city_discovery: Optional[AgentCityDiscovery] = None
        self.geo_validator = GeoValidator(logger, GOOGLE_MAPS_API_KEY)

    async def execute(self, city_name: str, state_abbr: str,
                      state_name: str = '') -> Dict:
        """Execute Phase 2: Reconnaissance Layer."""
        state_abbr = state_abbr.upper()
        state_name = state_name or US_STATES.get(state_abbr, state_abbr)

        content: Dict = {
            'gov_pages': [],
            'pdf_text': [],
            'relevant_chunks': [],
            'discovery_data': {},
        }

        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            # 2A: SERPAPI-driven searches
            if SERPAPI_KEY:
                await self._search_waste_pages(client, city_name, state_abbr,
                                               state_name, content)
                await self._search_ordinances(client, city_name, state_abbr, content)
                await self._search_fines(client, city_name, state_abbr, content)

            # 2B: Generic URL pattern fallback
            if not content['gov_pages']:
                await self._try_gov_url_patterns(client, city_name, state_abbr, content)

            # 2C: AgentCityDiscovery — LLM generates + verifies candidate URLs
            if not content['gov_pages']:
                self.logger.log('recon', 'INFO',
                                'Gov pages empty — triggering AgentCityDiscovery')
                discovery = await self._run_city_discovery(
                    city_name, state_abbr, state_name, content
                )
                # BUG 7 FIX: Verify each LLM-generated URL before fetching.
                for url in discovery.get('candidate_urls', []):
                    if await self._verify_url_is_live(client, url):
                        await self._fetch_page_or_pdf(client, url, content)
                        await asyncio.sleep(random.uniform(1, 2))
                    else:
                        self.logger.log('llm_url_verify', 'REJECTED',
                                        f"URL not live or wrong content: {url}")

        # 2D: Geographical content validation
        all_text = "\n\n".join(
            [page['text'] for page in content['gov_pages']] +
            [pdf['text'] for pdf in content['pdf_text']]
        )

        if all_text:
            is_valid, warning = self.geo_validator.validate_scraped_content(
                all_text, city_name, state_abbr, state_name
            )
            if not is_valid:
                self.logger.log('content_validation', 'FAILED',
                                f"Scraped content validation failed: {warning}")
                content['gov_pages'] = []
                content['pdf_text'] = []
                content['content_validation_failed'] = True
                content['content_validation_warning'] = warning
                all_text = ""
            else:
                content['content_validation_failed'] = False

            if all_text:
                content['relevant_chunks'] = self._filter_relevant_chunks(
                    all_text, city_name
                )

        # 2E: Validate source URLs
        all_sources = (
            [p['url'] for p in content['gov_pages']] +
            [p['url'] for p in content['pdf_text']]
        )
        if all_sources:
            valid_sources, rejected_sources = self.geo_validator.validate_sources(
                all_sources, city_name, state_abbr
            )
            content['rejected_sources'] = rejected_sources

        # 2F: Secondary source fallback when content is sparse
        if len(content['relevant_chunks']) < 2 and SERPAPI_KEY:
            self.logger.log('recon', 'INFO',
                            'Sparse content — searching secondary sources')
            async with httpx.AsyncClient(timeout=20.0, follow_redirects=True) as client:
                await self._search_secondary_sources(
                    client, city_name, state_abbr, state_name, content
                )

        return content

    # ── SEARCH HELPERS ────────────────────────────────────────────────────────

    async def _search_waste_pages(self, client, city_name, state_abbr,
                                  state_name, content):
        """Try multiple query templates, stop when we have 3+ pages."""
        for template in WASTE_SEARCH_QUERIES:
            if len(content['gov_pages']) >= 3:
                break
            query = (template
                     .replace('{city}', city_name)
                     .replace('{state_name}', state_name)
                     .replace('{state_abbr}', state_abbr))
            try:
                params = {'q': query, 'api_key': SERPAPI_KEY, 'num': 5}
                response = await client.get("https://serpapi.com/search", params=params)
                results = response.json()
                for result in results.get('organic_results', [])[:3]:
                    url = result['link']
                    if not self._is_relevant_domain(url, city_name, state_abbr):
                        self.logger.log('gov_page_scraped', 'SKIPPED',
                                        f"{url} — not relevant to {city_name}, {state_abbr}")
                        continue
                    await self._fetch_page_or_pdf(client, url, content)
                    await asyncio.sleep(random.uniform(1, 2))
            except Exception as e:
                self.logger.log('waste_search', 'ERROR', str(e))

    async def _search_ordinances(self, client, city_name, state_abbr, content):
        """Search for illegal dumping ordinances."""
        for template in ORDINANCE_SEARCH_QUERIES:
            query = (template
                     .replace('{city}', city_name)
                     .replace('{state_abbr}', state_abbr))
            try:
                params = {'q': query, 'api_key': SERPAPI_KEY, 'num': 3}
                response = await client.get("https://serpapi.com/search", params=params)
                results = response.json()
                for result in results.get('organic_results', [])[:2]:
                    url = result['link']
                    if not self._is_relevant_domain(url, city_name, state_abbr):
                        continue
                    await self._fetch_page_or_pdf(client, url, content)
                    await asyncio.sleep(random.uniform(1, 2))
            except Exception as e:
                self.logger.log('ordinance_search', 'ERROR', str(e))

    async def _search_fines(self, client, city_name, state_abbr, content):
        """Extract fine amounts from search snippets."""
        try:
            params = {
                'q': (f'"{city_name}" "{state_abbr}" illegal dumping fine '
                      f'"$" penalty amount ordinance'),
                'api_key': SERPAPI_KEY,
                'num': 5,
            }
            response = await client.get("https://serpapi.com/search", params=params)
            results = response.json()
            for result in results.get('organic_results', [])[:5]:
                snippet = result.get('snippet', '')
                if any(kw in snippet.lower() for kw in ['fine', 'penalty', 'dumping']):
                    price_match = re.search(
                        r'\$[\d,]+(?:\s*[-–to]+\s*\$[\d,]+)?', snippet
                    )
                    if price_match:
                        amount_str = (
                            price_match.group(0).split()[0]
                            .replace('$', '').replace(',', '')
                        )
                        try:
                            amount = int(amount_str)
                            if amount >= 100:
                                content['dumping_fine_snippet'] = snippet
                                content['dumping_fine_raw'] = price_match.group(0)
                                self.logger.log('fine_search', 'FOUND',
                                                price_match.group(0))
                                return
                        except ValueError:
                            content['dumping_fine_snippet'] = snippet
                            content['dumping_fine_raw'] = price_match.group(0)
                            self.logger.log('fine_search', 'FOUND', price_match.group(0))
                            return
        except Exception as e:
            self.logger.log('fine_search', 'ERROR', str(e))

    async def _search_secondary_sources(self, client, city_name, state_abbr,
                                        state_name, content):
        """Secondary source search when .gov pages are blocked or empty."""
        query = (
            f"{city_name} {state_name} bulk waste mattress disposal schedule "
            f"curbside pickup OR landfill"
        )
        try:
            params = {'q': query, 'api_key': SERPAPI_KEY, 'num': 8}
            response = await client.get("https://serpapi.com/search", params=params)
            results = response.json()

            snippets = []
            for result in results.get('organic_results', [])[:6]:
                snippet = result.get('snippet', '')
                url = result.get('link', '')
                if snippet:
                    snippets.append(f"[Source: {url}]\n{snippet}")
                if (url and
                        not any(url == p['url'] for p in content['gov_pages']) and
                        'wikipedia' in url.lower()):
                    try:
                        await self._fetch_page_or_pdf(client, url, content)
                    except Exception:
                        pass

            if snippets:
                combined = "\n\n".join(snippets)
                content['gov_pages'].append({
                    'url': 'secondary_search_snippets',
                    'text': combined,
                })
                self.logger.log('secondary_sources', 'SUCCESS',
                                f"Added {len(snippets)} secondary snippets")
        except Exception as e:
            self.logger.log('secondary_sources', 'ERROR', str(e))

    # ── URL FALLBACKS ─────────────────────────────────────────────────────────

    async def _try_gov_url_patterns(self, client, city_name, state_abbr, content):
        """Generic URL pattern fallback for any city."""
        city_lower = city_name.lower().replace(' ', '')
        city_hyphen = city_name.lower().replace(' ', '-')
        state_lower = state_abbr.lower()

        for pattern in GOV_URL_PATTERNS:
            url = (pattern
                   .replace('{city}', city_lower)
                   .replace('{city_hyphen}', city_hyphen)
                   .replace('{state}', state_lower))
            try:
                response = await client.get(
                    url, headers={'User-Agent': random.choice(USER_AGENTS)}
                )
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    for tag in soup(['script', 'style', 'nav', 'footer', 'header']):
                        tag.decompose()
                    text = soup.get_text(separator='\n', strip=True)
                    content['gov_pages'].append({'url': url, 'text': text[:15000]})
                    self.logger.log('gov_url_pattern', 'SUCCESS', url)
                    await self._follow_sanitation_link(client, response, url, content)
                    break
            except Exception:
                continue

    async def _follow_sanitation_link(self, client, response, base_url, content):
        """From a city homepage, follow the first sanitation/waste link."""
        try:
            soup = BeautifulSoup(response.content, 'html.parser')
            keywords = ['sanitation', 'solid waste', 'waste management',
                        'trash', 'recycling', 'garbage', 'bulk']
            for link in soup.find_all('a', href=True):
                text = link.get_text(strip=True).lower()
                href = link['href']
                if any(kw in text or kw in href.lower() for kw in keywords):
                    full_url = (href if href.startswith('http')
                                else base_url.rstrip('/') + '/' + href.lstrip('/'))
                    await self._fetch_page_or_pdf(client, full_url, content)
                    self.logger.log('sanitation_link_follow', 'SUCCESS', full_url)
                    return
        except Exception as e:
            self.logger.log('sanitation_link_follow', 'ERROR', str(e))

    async def _run_city_discovery(self, city_name, state_abbr, state_name, content):
        """AgentCityDiscovery integration."""
        if not self._city_discovery:
            self._city_discovery = AgentCityDiscovery(self.logger)
        discovery = await self._city_discovery.discover(city_name, state_abbr, state_name)
        content['discovery_data'] = discovery
        return discovery

    # ── BUG 7 FIX: URL verification ──────────────────────────────────────────

    async def _verify_url_is_live(self, client: httpx.AsyncClient, url: str) -> bool:
        """
        BUG 7 FIX: Verify an LLM-generated URL actually responds with 200 before
        trusting its content. LLMs hallucinate URLs confidently.
        """
        if not url or not url.startswith('http'):
            return False
        try:
            response = await client.head(url, timeout=8.0,
                                         headers={'User-Agent': USER_AGENTS[0]})
            # 200, 301, 302 are all acceptable (follow_redirects=True handles them).
            return response.status_code < 400
        except Exception:
            return False

    # ── DOMAIN VALIDATION ─────────────────────────────────────────────────────

    @staticmethod
    def _is_relevant_domain(url: str, city_name: str, state_abbr: str) -> bool:
        """
        BUG 6 FIX: State-aware domain filtering.

        Previous code accepted ANY .gov URL. Now we additionally check that
        a .gov/.us URL does not clearly belong to a DIFFERENT state's domain
        by inspecting the DNS labels (not the path).

        Accept if:
          - Is a .gov or .us domain AND does not have a different state's abbr
            as a DNS label (e.g. ny.gov rejected when processing TX city)
          - OR contains the city name slug
          - OR contains the state abbreviation

        Reject if:
          - Is an excluded federal agency
          - Is a .gov/.us domain whose DNS label reveals a different state
        """
        url_lower = url.lower()
        city_slug = city_name.lower().replace(' ', '')
        state_lower = state_abbr.lower()

        # Always exclude unrelated federal agencies
        excluded = ['epa.gov', 'census.gov', 'usgs.gov', 'fema.gov',
                    'hud.gov', 'dot.gov', 'whitehouse.gov', 'irs.gov']
        if any(ex in url_lower for ex in excluded):
            return False

        # Extract domain (no path)
        try:
            without_scheme = re.sub(r'^https?://', '', url_lower)
            domain = without_scheme.split('/')[0]
        except Exception:
            domain = url_lower

        # Check for conflicting state in DNS labels
        labels = domain.replace('-', '.').split('.')
        for label in labels:
            if (label != state_lower and
                    label.upper() in {s for s in _STATE_ABBRS_SET} and
                    label.upper() != state_abbr.upper()):
                return False   # Domain belongs to a different state

        if '.gov' in url_lower or '.us' in url_lower:
            return True
        if city_slug in url_lower or state_lower in url_lower:
            return True

        return False

    # ── PAGE FETCHERS ─────────────────────────────────────────────────────────

    async def _fetch_page_or_pdf(self, client, url, content):
        """Fetch and parse a page or PDF."""
        if any(url == p.get('url')
               for p in content['gov_pages'] + content['pdf_text']):
            return
        try:
            if url.lower().endswith('.pdf'):
                pdf_text = await self._extract_pdf(client, url)
                if pdf_text:
                    content['pdf_text'].append({'url': url, 'text': pdf_text[:20000]})
                    self.logger.log('pdf_extracted', 'SUCCESS', url)
            else:
                response = await client.get(
                    url, headers={'User-Agent': random.choice(USER_AGENTS)}
                )
                soup = BeautifulSoup(response.content, 'html.parser')

                # Follow PDF links on the page
                for link in soup.find_all('a', href=True):
                    href = link['href']
                    if '.pdf' in href.lower() and any(
                        kw in href.lower()
                        for kw in ['waste', 'bulk', 'guide', 'trash', 'mattress', 'sanitation']
                    ):
                        pdf_url = (href if href.startswith('http')
                                   else url.rstrip('/') + '/' + href.lstrip('/'))
                        pdf_text = await self._extract_pdf(client, pdf_url)
                        if pdf_text:
                            content['pdf_text'].append(
                                {'url': pdf_url, 'text': pdf_text[:20000]}
                            )
                            self.logger.log('pdf_extracted', 'SUCCESS', pdf_url)

                for tag in soup(['script', 'style', 'nav', 'footer', 'header']):
                    tag.decompose()
                text = soup.get_text(separator='\n', strip=True)
                content['gov_pages'].append({'url': url, 'text': text[:15000]})
                self.logger.log('gov_page_scraped', 'SUCCESS', url)

        except Exception as e:
            self.logger.log('page_fetch', 'FAILED', f"{url}: {e}")

    async def _extract_pdf(self, client, url) -> Optional[str]:
        """Extract text from PDF."""
        try:
            response = await client.get(url)
            if response.status_code != 200:
                return None
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
                tmp.write(response.content)
                tmp_path = tmp.name
            try:
                import pdfplumber
                text = ""
                with pdfplumber.open(tmp_path) as pdf:
                    for page in pdf.pages[:20]:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
                return text if len(text) > 100 else None
            except ImportError:
                try:
                    from PyPDF2 import PdfReader
                    reader = PdfReader(tmp_path)
                    text = ""
                    for page in reader.pages[:20]:
                        text += page.extract_text() + "\n"
                    return text if len(text) > 100 else None
                except Exception:
                    return None
            finally:
                os.unlink(tmp_path)
        except Exception:
            return None

    def _filter_relevant_chunks(self, text: str, city_name: str) -> List[str]:
        """Filter text for relevant chunks."""
        words = text.split()
        chunks = [' '.join(words[i:i + 500]) for i in range(0, len(words), 500)]
        keywords = [
            'mattress', 'box spring', 'bulk', 'large item', 'furniture', 'heavy trash',
            'curbside collection', 'drop-off', 'drop off', 'landfill', 'transfer station',
            'recycle center', 'reuse center', 'disposal', 'facility', 'location',
            'hours', 'fee', 'tipping', 'address', 'appointment', 'schedule',
            'illegal dumping', 'fine', 'penalty', 'ordinance', 'code',
            'pickup', 'collection', 'bulky', 'oversize', 'large',
        ]
        relevant = [c for c in chunks[:30] if any(kw in c.lower() for kw in keywords)]
        if len(relevant) < 3 and chunks:
            relevant = chunks[:5]
        self.logger.log('relevance_filter', 'SUCCESS',
                        f"Filtered {len(relevant)}/{min(len(chunks), 30)} relevant chunks")
        return relevant


# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 3: INTELLIGENCE LAYER
# ═══════════════════════════════════════════════════════════════════════════════

class Phase3Intelligence:
    """Phase 3: Multi-agent extraction."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.dispatcher = AgentDispatcher(logger)
        self.rule_enforcer = AgentRuleEnforcer(logger)
        self.navigator = AgentNavigator(logger)
        self.auditor = AgentAuditor(logger)

    async def execute(self, content: Dict, city_name: str, state_abbr: str) -> Dict:
        """Execute Phase 3: Intelligence Layer."""
        state_abbr = state_abbr.upper()
        relevant_text = "\n\n".join(content.get('relevant_chunks', []))

        if not relevant_text:
            relevant_text = "\n\n".join(
                [page['text'] for page in content['gov_pages']][:2]
            )

        if not relevant_text:
            self.logger.log('llm_extraction', 'SKIPPED', 'No content to extract from')
            fallback = self._get_fallback_data(city_name, state_abbr)
            discovery = content.get('discovery_data', {})
            if discovery:
                fallback = self._seed_from_discovery(fallback, discovery)
            return fallback

        fine_hint = ""
        if content.get('dumping_fine_raw'):
            fine_hint = (
                f"\n\nFINE HINT FROM SEARCH: {content['dumping_fine_raw']} "
                f"— {content.get('dumping_fine_snippet', '')[:200]}"
            )

        # Run agents concurrently
        contacts, rules_and_fines, facilities = await asyncio.gather(
            self.dispatcher.extract(relevant_text, city_name),
            self.rule_enforcer.extract(relevant_text, city_name, fine_hint),
            self.navigator.extract(relevant_text, city_name, state_abbr),
        )

        extracted = {
            'contacts': contacts,
            'curbside_rules': rules_and_fines.get('curbside_rules', {}),
            'illegal_dumping': rules_and_fines.get('illegal_dumping', {}),
            'drop_off_locations': facilities,
        }

        if not extracted['illegal_dumping'].get('fine_amount') and content.get('dumping_fine_raw'):
            extracted['illegal_dumping']['fine_amount'] = content['dumping_fine_raw']
            self.logger.log('fine_fallback', 'APPLIED', content['dumping_fine_raw'])

        # BUG F FIX: Pass fine_hint to auditor so it knows the fine came from a verified
        # search snippet — not just the main scraped text. Without this, the auditor
        # sees a fine in extracted_data that it can't find in relevant_text and
        # "helpfully" nullifies it (confirmed: Atlanta $5,000 was lost this way).
        extracted = await self.auditor.verify(
            extracted, relevant_text, city_name, state_abbr,
            fine_hint=fine_hint,
        )

        discovery = content.get('discovery_data', {})
        if discovery:
            extracted = self._seed_from_discovery(extracted, discovery)

        if not extracted.get('drop_off_locations'):
            self.logger.log('navigator_fallback', 'INFO', 'Falling back to Google Places API')
            extracted['drop_off_locations'] = await self._google_places_facilities(
                city_name, state_abbr
            )

        extracted['drop_off_locations'] = self._validate_facilities(
            extracted.get('drop_off_locations', []), city_name, state_abbr
        )

        # BUG 3 FIX: Use state-qualified key for known data lookup
        extracted = self._apply_known_data_patch(extracted, city_name, state_abbr)
        extracted['donation_policy'] = None

        return extracted

    # ── GOOGLE PLACES FALLBACK ────────────────────────────────────────────────

    async def _google_places_facilities(self, city_name: str, state_abbr: str) -> List[Dict]:
        """Fallback to Google Places API."""
        queries = [
            f"landfill {city_name} {state_abbr}",
            f"transfer station {city_name} {state_abbr}",
            f"bulk waste drop off {city_name} {state_abbr}",
        ]
        facilities: List[Dict] = []
        seen_names: set = set()
        state_name = US_STATES.get(state_abbr, state_abbr)

        async with httpx.AsyncClient(timeout=10.0) as client:
            for query in queries:
                try:
                    params = {
                        'query': query,
                        'key': GOOGLE_MAPS_API_KEY,
                        'type': 'establishment',
                    }
                    response = await client.get(
                        "https://maps.googleapis.com/maps/api/place/textsearch/json",
                        params=params,
                    )
                    data = response.json()

                    for place in data.get('results', [])[:2]:
                        name = place.get('name', '')
                        if name in seen_names:
                            continue
                        seen_names.add(name)

                        address = place.get('formatted_address', '')
                        # BUG 9 FIX: Also accept addresses in the same state even if the
                        # city name differs — nearby county/metro facilities are valid.
                        addr_lower = address.lower()
                        if (city_name.lower() not in addr_lower and
                                state_abbr.lower() not in addr_lower and
                                state_name.lower() not in addr_lower):
                            continue

                        place_id = place.get('place_id')
                        hours = None
                        if place_id:
                            detail_params = {
                                'place_id': place_id,
                                'fields': 'opening_hours,formatted_phone_number',
                                'key': GOOGLE_MAPS_API_KEY,
                            }
                            detail_resp = await client.get(
                                "https://maps.googleapis.com/maps/api/place/details/json",
                                params=detail_params,
                            )
                            oh = detail_resp.json().get('result', {}).get('opening_hours', {})
                            if oh.get('weekday_text'):
                                hours = ' | '.join(oh['weekday_text'])

                        facilities.append({
                            'name': name,
                            'address': address,
                            'type': (
                                'Landfill' if 'landfill' in name.lower()
                                else 'Transfer Station' if 'transfer' in name.lower()
                                else 'Drop-Off Center'
                            ),
                            'hours': hours,
                            'tipping_fee': None,
                            'residency_required': None,
                            'notes': 'Verify accepts mattresses before visiting',
                            'google_maps_url': (
                                f"https://www.google.com/maps/place/?q=place_id:{place_id}"
                                if place_id else None
                            ),
                            'source': 'google_places',
                        })
                    await asyncio.sleep(0.5)
                except Exception as e:
                    self.logger.log('google_places', 'ERROR', str(e))

        self.logger.log('google_places_facilities',
                        'FOUND' if facilities else 'EMPTY',
                        f"{len(facilities)} facilities")
        return facilities

    # ── VALIDATION & PATCHING ─────────────────────────────────────────────────

    def _validate_facilities(self, facilities: List[Dict],
                              city_name: str, state_abbr: str = '') -> List[Dict]:
        """
        Validate facilities — keep those in the target state even if
        they're in a different city within that state (metro area coverage).

        BUG 9 FIX: Previous code rejected any facility whose address didn't
        contain the exact city name. This wrongly rejected transfer stations
        and landfills that are in nearby incorporated areas serving the city.
        """
        valid = []
        generic_names = {'landfill', 'transfer station', 'recycling center',
                         'drop-off center', 'facility'}
        state_name = US_STATES.get(state_abbr.upper(), '')

        for f in facilities:
            name = (f.get('name') or '').strip()
            address = (f.get('address') or '').strip()

            if name.lower() in generic_names:
                self.logger.log('facility_validation', 'REJECTED',
                                f"Generic name: '{name}'")
                continue

            if f.get('source') != 'google_places' and not address:
                self.logger.log('facility_validation', 'REJECTED',
                                f"No address: '{name}'")
                continue

            if address and state_abbr:
                addr_lower = address.lower()
                # Accept if city name OR state appears in address
                in_right_area = (
                    city_name.lower() in addr_lower or
                    state_abbr.lower() in addr_lower or
                    state_name.lower() in addr_lower
                )
                if not in_right_area:
                    self.logger.log('facility_validation', 'REJECTED',
                                    f"Wrong area: '{address}' (expected {state_abbr})")
                    continue

            valid.append(f)

        self.logger.log('facility_validation', 'PASSED',
                        f"{len(valid)}/{len(facilities)} facilities kept")
        return valid

    def _apply_known_data_patch(
        self, extracted: Dict, city_name: str, state_abbr: str
    ) -> Dict:
        """
        BUG 3 FIX: Look up CITY_KNOWN_DATA with state-qualified key "City|ST"
        so that Portland ME never gets Portland OR data, Columbus GA never
        gets Columbus OH data, etc.
        """
        known_key = f"{city_name}|{state_abbr.upper()}"
        known = CITY_KNOWN_DATA.get(known_key, {})
        if not known:
            return extracted

        contacts = extracted.setdefault('contacts', {})
        dumping = extracted.setdefault('illegal_dumping', {})

        if not contacts.get('official_phone') and known.get('official_phone'):
            contacts['official_phone'] = known['official_phone']
            self.logger.log('known_data_patch', 'APPLIED',
                            f"phone: {known['official_phone']}")

        if not contacts.get('department_name') and known.get('department_name'):
            contacts['department_name'] = known['department_name']

        if not contacts.get('website_url') and known.get('website_url'):
            contacts['website_url'] = known['website_url']
            self.logger.log('known_data_patch', 'APPLIED',
                            f"website: {known['website_url']}")

        if not dumping.get('fine_amount') and known.get('illegal_dumping_fine'):
            dumping['fine_amount'] = known['illegal_dumping_fine']
            self.logger.log('known_data_patch', 'APPLIED',
                            f"fine: {known['illegal_dumping_fine']}")

        if not dumping.get('citation') and known.get('illegal_dumping_citation'):
            dumping['citation'] = known['illegal_dumping_citation']

        return extracted

    def _seed_from_discovery(self, extracted: Dict, discovery: Dict) -> Dict:
        """Seed extracted data from AgentCityDiscovery. Only fills gaps."""
        contacts = extracted.setdefault('contacts', {})
        dumping = extracted.setdefault('illegal_dumping', {})

        for field in ('website_url', 'department_name', 'official_phone'):
            if not contacts.get(field) and discovery.get(field):
                contacts[field] = discovery[field]
                self.logger.log('discovery_seed', 'APPLIED',
                                f"{field}: {discovery[field]}")

        if not dumping.get('fine_amount') and discovery.get('illegal_dumping_fine'):
            dumping['fine_amount'] = discovery['illegal_dumping_fine']
            self.logger.log('discovery_seed', 'APPLIED',
                            f"fine: {discovery['illegal_dumping_fine']}")

        if not dumping.get('citation') and discovery.get('illegal_dumping_citation'):
            dumping['citation'] = discovery['illegal_dumping_citation']

        return extracted

    def _get_fallback_data(self, city_name: str, state_abbr: str) -> Dict:
        """Return null/unknown data — never fabricate False for is_available."""
        return {
            'contacts': {
                'official_phone': '3-1-1',
                'department_name': None,
                'website_url': None,
            },
            'curbside_rules': {
                'is_available': None,    # null = unknown, NOT false
                'mattress_specific_rule': None,
                'placement_time': None,
                'size_limits': None,
                'the_catch': None,
                'schedule_logic': None,
            },
            'drop_off_locations': [],
            'illegal_dumping': {
                'fine_amount': None,
                'citation': None,
            },
            'donation_policy': None,
        }


# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 5: COMPETITOR TRIANGULATION
# ═══════════════════════════════════════════════════════════════════════════════

class Phase5Competitor:
    """Phase 5: Competitor price scraping."""

    def __init__(self, logger: Logger):
        self.logger = logger

    async def execute(self, city_name: str, state_abbr: str) -> Dict:
        """Execute Phase 5: Competitor Triangulation."""
        competitor_data = {
            'competitor_name': 'National Junk Chains',
            'competitor_price': '$139+',
            'value_prop': 'No franchise fees. Just local haulers.',
        }

        if not SERPAPI_KEY:
            return competitor_data

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                params = {
                    'q': f'1-800-got-junk mattress removal {city_name} {state_abbr} price',
                    'api_key': SERPAPI_KEY,
                    'num': 3,
                }
                response = await client.get("https://serpapi.com/search", params=params)
                results = response.json()
                for result in results.get('organic_results', [])[:3]:
                    snippet = result.get('snippet', '')
                    price_match = re.search(r'\$\d{2,3}', snippet)
                    if price_match:
                        competitor_data['competitor_price'] = f"{price_match.group(0)}+"
                        self.logger.log('competitor_price', 'EXTRACTED',
                                        competitor_data['competitor_price'])
                        break
        except Exception as e:
            self.logger.log('competitor_scraping', 'ERROR', str(e))

        return competitor_data


# ═══════════════════════════════════════════════════════════════════════════════
# MODULE-LEVEL HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

# Set of all state abbreviations for fast lookup in domain filtering.
_STATE_ABBRS_SET = frozenset(US_STATES.keys())

# ── ZIP CODE STATE PREFIX RANGES ─────────────────────────────────────────────
# BUG B FIX: Each US state has a known set of ZIP code prefixes (first 3 digits).
# Used to filter out zip codes that belong to a different state or country.
# Source: USPS ZIP prefix assignments.
_STATE_ZIP_PREFIXES: Dict[str, tuple] = {
    'AL': (('350','352','354','356','357','358','359','360','361','362','363','364','365','366','367','368','369'),),
    'AK': (('995','996','997','998','999'),),
    'AZ': (('850','851','852','853','855','856','857','859','860','863','864','865'),),
    'AR': (('716','717','718','719','720','721','722','723','724','725','726','727','728','729'),),
    'CA': (('900','901','902','903','904','905','906','907','908','910','911','912','913','914','915','916','917','918','919','920','921','922','923','924','925','926','927','928','930','931','932','933','934','935','936','937','938','939','940','941','942','943','944','945','946','947','948','949','950','951','952','953','954','955','956','957','958','959','960','961'),),
    'CO': (('800','801','802','803','804','805','806','807','808','809','810','811','812','813','814','815','816'),),
    'CT': (('060','061','062','063','064','065','066','067','068','069'),),
    'DE': (('197','198','199'),),
    'FL': (('320','321','322','323','324','325','326','327','328','329','330','331','332','333','334','335','336','337','338','339','341','342','344','346','347','349'),),
    'GA': (('300','301','302','303','304','305','306','307','308','309','310','311','312','313','314','315','316','317','318','319'),),
    'HI': (('967','968'),),
    'ID': (('832','833','834','835','836','837','838'),),
    'IL': (('600','601','602','603','604','605','606','607','608','609','610','611','612','613','614','615','616','617','618','619','620','621','622','623','624','625','626','627','628','629'),),
    'IN': (('460','461','462','463','464','465','466','467','468','469','470','471','472','473','474','475','476','477','478','479'),),
    'IA': (('500','501','502','503','504','505','506','507','508','509','510','511','512','513','514','515','516','520','521','522','523','524','525','526','527','528'),),
    'KS': (('660','661','662','664','665','666','667','668','669','670','671','672','673','674','675','676','677','678','679'),),
    'KY': (('400','401','402','403','404','405','406','407','408','409','410','411','412','413','414','415','416','417','418','420','421','422','423','424','425','426','427'),),
    'LA': (('700','701','703','704','705','706','707','708','710','711','712','713','714'),),
    'ME': (('039','040','041','042','043','044','045','046','047','048','049'),),
    'MD': (('206','207','208','209','210','211','212','214','215','216','217','218','219'),),
    'MA': (('010','011','012','013','014','015','016','017','018','019','020','021','022','023','024','025','026','027'),),
    'MI': (('480','481','482','483','484','485','486','487','488','489','490','491','492','493','494','495','496','497','498','499'),),
    'MN': (('550','551','553','554','555','556','557','558','559','560','561','562','563','564','565','566','567'),),
    'MS': (('386','387','388','389','390','391','392','393','394','395','396','397'),),
    'MO': (('630','631','633','634','635','636','637','638','639','640','641','644','645','646','647','648','649','650','651','652','653','654','655','656','657','658'),),
    'MT': (('590','591','592','593','594','595','596','597','598','599'),),
    'NE': (('680','681','683','684','685','686','687','688','689','690','691','692','693'),),
    'NV': (('889','890','891','893','894','895','897','898'),),
    'NH': (('030','031','032','033','034','035','036','037','038'),),
    'NJ': (('070','071','072','073','074','075','076','077','078','079','080','081','082','083','084','085','086','087','088','089'),),
    'NM': (('870','871','872','873','874','875','877','878','879','880','881','882','883','884'),),
    'NY': (('100','101','102','103','104','105','106','107','108','109','110','111','112','113','114','115','116','117','118','119','120','121','122','123','124','125','126','127','128','129','130','131','132','133','134','135','136','137','138','139','140','141','142','143','144','145','146','147','148','149'),),
    'NC': (('270','271','272','273','274','275','276','277','278','279','280','281','282','283','284','285','286','287','288','289'),),
    'ND': (('580','581','582','583','584','585','586','587','588'),),
    'OH': (('430','431','432','433','434','435','436','437','438','439','440','441','442','443','444','445','446','447','448','449','450','451','452','453','454','455','456','457','458'),),
    'OK': (('730','731','734','735','736','737','738','739','740','741','743','744','745','746','747','748','749'),),
    'OR': (('970','971','972','973','974','975','976','977','978','979'),),
    'PA': (('150','151','152','153','154','155','156','157','158','159','160','161','162','163','164','165','166','167','168','169','170','171','172','173','174','175','176','177','178','179','180','181','182','183','184','185','186','187','188','189','190','191','192','193','194','195','196'),),
    'RI': (('028','029'),),
    'SC': (('290','291','292','293','294','295','296','297','298','299'),),
    'SD': (('570','571','572','573','574','575','576','577'),),
    'TN': (('370','371','372','373','374','375','376','377','378','379','380','381','382','383','384','385'),),
    'TX': (('750','751','752','753','754','755','756','757','758','759','760','761','762','763','764','765','766','767','768','769','770','771','772','773','774','775','776','777','778','779','780','781','782','783','784','785','786','787','788','789','790','791','792','793','794','795','796','797','798','799'),),
    'UT': (('840','841','842','843','844','845','846','847'),),
    'VT': (('050','051','052','053','054','055','056','057','058','059'),),
    'VA': (('200','201','202','203','204','205','220','221','222','223','224','225','226','227','228','229','230','231','232','233','234','235','236','237','238','239','240','241','242','243','244','245','246'),),
    'WA': (('980','981','982','983','984','985','986','988','989','990','991','992','993','994'),),
    'WV': (('247','248','249','250','251','252','253','254','255','256','257','258','259','260','261','262','263','264','265','266','267','268'),),
    'WI': (('530','531','532','534','535','537','538','539','540','541','542','543','544','545','546','547','548','549'),),
    'WY': (('820','821','822','823','824','825','826','827','828','829','830','831'),),
}


def _zip_in_state(zip_code: str, state_abbr: str) -> bool:
    """
    Return True if a 5-digit ZIP code belongs to the given US state.

    Uses the known USPS ZIP prefix ranges per state. This prevents
    cross-border contamination (e.g., 08xxx NJ codes appearing for Philadelphia PA,
    or Canadian postal codes appearing for Detroit MI).

    Falls back to True (permissive) if state has no entry in the table.
    """
    if not zip_code or not zip_code.isdigit() or len(zip_code) != 5:
        return False
    prefixes = _STATE_ZIP_PREFIXES.get(state_abbr.upper())
    if not prefixes:
        return True   # Unknown state → let it through
    prefix3 = zip_code[:3]
    for group in prefixes:
        if prefix3 in group:
            return True
    return False

# FIPS codes for Census API population lookup.
_STATE_FIPS: Dict[str, str] = {
    'AL': '01', 'AK': '02', 'AZ': '04', 'AR': '05', 'CA': '06',
    'CO': '08', 'CT': '09', 'DE': '10', 'FL': '12', 'GA': '13',
    'HI': '15', 'ID': '16', 'IL': '17', 'IN': '18', 'IA': '19',
    'KS': '20', 'KY': '21', 'LA': '22', 'ME': '23', 'MD': '24',
    'MA': '25', 'MI': '26', 'MN': '27', 'MS': '28', 'MO': '29',
    'MT': '30', 'NE': '31', 'NV': '32', 'NH': '33', 'NJ': '34',
    'NM': '35', 'NY': '36', 'NC': '37', 'ND': '38', 'OH': '39',
    'OK': '40', 'OR': '41', 'PA': '42', 'RI': '44', 'SC': '45',
    'SD': '46', 'TN': '47', 'TX': '48', 'UT': '49', 'VT': '50',
    'VA': '51', 'WA': '53', 'WV': '54', 'WI': '55', 'WY': '56',
}