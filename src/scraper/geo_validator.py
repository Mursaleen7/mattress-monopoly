"""Geographical validation to prevent city namesake collisions."""
import re
from typing import Dict, List, Optional, Tuple
import httpx


# ---------------------------------------------------------------------------
# State data tables
# ---------------------------------------------------------------------------

US_STATES: Dict[str, str] = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming',
}

# Abbreviations that are also extremely common English words.
# We NEVER use bare abbreviation matching in body text for these.
_AMBIGUOUS_ABBRS = frozenset({
    'AL', 'AR', 'CO', 'DE', 'HI', 'ID', 'IN', 'LA',
    'MA', 'ME', 'MI', 'MS', 'MO', 'MT', 'NE', 'NH',
    'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
    'PA', 'RI', 'SC', 'SD', 'VT', 'VA', 'WA', 'WI',
})

# Only these short, unambiguous abbreviations are safe to match as
# bare words in body text (they don't read as common English).
_SAFE_ABBRS = frozenset(US_STATES.keys()) - _AMBIGUOUS_ABBRS
# → AK AZ CA CT FL GA IA KS KY MD MN MS  (still use name match as primary)

# URL-safe domain fragments that are definitely state patterns, not English words.
# These only appear in TLD/domain positions.
_URL_STATE_PATTERNS = re.compile(
    r'(?:^|[./\-])('
    + '|'.join(re.escape(s.lower()) for s in US_STATES)
    + r')(?:[./\-]|$)',
    re.IGNORECASE,
)

# Precompile word-boundary patterns for each full state name.
# Used to count genuine state name mentions in body text.
_STATE_NAME_RE: Dict[str, re.Pattern] = {
    abbr: re.compile(r'\b' + re.escape(name) + r'\b', re.IGNORECASE)
    for abbr, name in US_STATES.items()
}

# Geographic address pattern: ", TX" or ", Texas" — strong signal.
_GEO_ABBR_RE: Dict[str, re.Pattern] = {
    abbr: re.compile(r',\s*' + re.escape(abbr) + r'\b', re.IGNORECASE)
    for abbr in US_STATES
}


class GeoValidator:
    """
    Validates city-state combinations and detects geographical hallucinations.

    Prevents the "New York, TX" bug where the scraper confuses namesake cities
    across different states.
    """

    def __init__(self, logger, google_maps_api_key: str):
        self.logger = logger
        self.api_key = google_maps_api_key
        self._cache: Dict[str, Dict] = {}

    # ------------------------------------------------------------------
    # PUBLIC: city-state API validation
    # ------------------------------------------------------------------

    async def validate_city_state(
        self, city_name: str, state_abbr: str
    ) -> Tuple[bool, Optional[str]]:
        """
        Validate that a city-state combination is real and unambiguous.

        Uses Google Geocoding API with explicit country + state filter so that
        "New York, TX" cannot match the New York City geocode result.

        Returns:
            (is_valid, error_message)
        """
        cache_key = f"{city_name.strip().lower()}|{state_abbr.strip().upper()}"

        if cache_key in self._cache:
            cached = self._cache[cache_key]
            return cached['valid'], cached.get('error')

        state_abbr = state_abbr.strip().upper()
        state_name = US_STATES.get(state_abbr, state_abbr)

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                # Include full state name in address string to reduce
                # namesake collisions at the API level.
                params = {
                    'address': f"{city_name}, {state_name}, USA",
                    'components': f"administrative_area:{state_abbr}|country:US",
                    'key': self.api_key,
                }
                response = await client.get(
                    "https://maps.googleapis.com/maps/api/geocode/json",
                    params=params,
                )
                data = response.json()

                if data['status'] != 'OK':
                    error = (
                        f"City '{city_name}, {state_abbr}' not found by geocoding API "
                        f"(status: {data['status']})"
                    )
                    self._cache[cache_key] = {'valid': False, 'error': error}
                    self.logger.log('geo_validation', 'FAILED', error)
                    return False, error

                result = data['results'][0]
                components = {
                    c['types'][0]: c
                    for c in result.get('address_components', [])
                }

                # Verify the returned state actually matches what we asked for.
                # short_name for administrative_area_level_1 is the 2-letter abbr.
                state_comp = components.get('administrative_area_level_1', {})
                actual_abbr = state_comp.get('short_name', '').upper()
                actual_name = state_comp.get('long_name', '')

                if actual_abbr != state_abbr:
                    error = (
                        f"State mismatch: '{city_name}' resolved to {actual_name} "
                        f"({actual_abbr}), not {state_abbr} ({state_name}). "
                        f"This is a namesake city in a different state."
                    )
                    self._cache[cache_key] = {'valid': False, 'error': error}
                    self.logger.log('geo_validation', 'FAILED', error)
                    return False, error

                # Require a locality (incorporated city/town).
                # Unincorporated areas return only sublocality or no locality.
                locality = components.get('locality', {}).get('long_name', '')
                sublocality = components.get('sublocality', {}).get('long_name', '')

                if not locality and not sublocality:
                    error = (
                        f"'{city_name}, {state_abbr}' appears to be an unincorporated "
                        f"area or very small community — skipping to avoid data confusion."
                    )
                    self._cache[cache_key] = {'valid': False, 'error': error}
                    self.logger.log('geo_validation', 'WARNING', error)
                    return False, error

                formatted = result.get('formatted_address', '')
                location = result['geometry']['location']

                self._cache[cache_key] = {
                    'valid': True,
                    'error': None,
                    'formatted_address': formatted,
                    'location': location,
                    'actual_state_abbr': actual_abbr,
                }
                self.logger.log(
                    'geo_validation', 'PASSED',
                    f"{city_name}, {state_abbr} → {formatted}",
                )
                return True, None

        except Exception as e:
            error = f"Geocoding API error: {str(e)}"
            self.logger.log('geo_validation', 'ERROR', error)
            # Fail open on transient network errors to avoid blocking legitimate cities.
            return True, None

    # ------------------------------------------------------------------
    # PUBLIC: scraped content validation
    # ------------------------------------------------------------------

    def validate_scraped_content(
        self,
        text: str,
        city_name: str,
        state_abbr: str,
        state_name: str,
    ) -> Tuple[bool, Optional[str]]:
        """
        Validate that scraped content actually references the correct city/state.

        Key fix: uses word-boundary regex for state name counting instead of
        naive str.count() which matches substrings like "tx" inside "text".

        Returns:
            (is_valid, warning_message)
        """
        if not text or len(text) < 100:
            return True, None

        text_lower = text.lower()
        state_abbr_upper = state_abbr.upper()

        # Count target state mentions using reliable patterns only.
        target_mentions = self._count_state_mentions(text, state_abbr_upper, state_name)

        # Detect conflicting state mentions.
        conflicts = self._detect_conflicting_states(text, state_abbr_upper, state_name)

        if conflicts:
            conflict_name, conflict_count = conflicts[0]
            target_count_safe = max(target_mentions, 1)

            # BUG E FIX (live run — Boston false positive):
            # The old 2x threshold and even the previous 4x fix were too aggressive.
            # Boston MA pages include mass.gov crime lists and amlegal.com code pages
            # that enumerate all 50 states in tables, giving "Oregon" 23 hits vs only
            # 5 for "MA/Massachusetts" — causing Boston to be silently rejected.
            #
            # Reject ONLY when ALL three conditions are true simultaneously:
            #
            #   1. Absolute floor: conflict must appear ≥ 15 times (not just 5-10 times
            #      from a single table of US states in a legal document)
            #   2. Ratio: conflict appears ≥ 6× more than target mentions
            #   3. City name check: the city name itself appears < 3 times
            #      (if "Boston" appears ≥ 3 times, the page IS about Boston regardless
            #      of what other states appear in legal tables or comparisons)
            #
            # This three-part gate catches real cross-state confusion (NYC content
            # scraped for a TX city) while being immune to legal reference documents.

            city_mentions = len(re.findall(
                r'\b' + re.escape(city_name) + r'\b', text, re.IGNORECASE
            ))
            city_is_prominent = city_mentions >= 3

            suspicious = (
                conflict_count >= 15 and
                conflict_count > target_count_safe * 6 and
                not city_is_prominent
            )

            if suspicious:
                warning = (
                    f"Content appears to be about {conflict_name}, not {state_abbr}. "
                    f"Found {conflict_count} mentions of {conflict_name} vs "
                    f"{target_mentions} mentions of {state_abbr}/{state_name} "
                    f"(city '{city_name}' appears {city_mentions} times)."
                )
                self.logger.log('content_validation', 'FAILED', warning)
                return False, warning

        # NYC-specific indicators when target is NOT NY.
        if state_abbr_upper != 'NY':
            nyc_indicators = [
                'new york city', ' nyc ', 'nyc.gov', 'portal.311.nyc',
                'department of sanitation of new york', 'dsny',
                'manhattan', 'brooklyn', 'the bronx', 'staten island',
                'queens county',
            ]
            nyc_hits = [ind for ind in nyc_indicators if ind in text_lower]
            if len(nyc_hits) >= 3:
                warning = (
                    f"Content contains {len(nyc_hits)} NYC-specific indicators "
                    f"but target is {city_name}, {state_abbr}. Likely data confusion. "
                    f"Indicators: {nyc_hits[:3]}"
                )
                self.logger.log('content_validation', 'FAILED', warning)
                return False, warning

        self.logger.log(
            'content_validation', 'PASSED',
            f"Content validated for {city_name}, {state_abbr} "
            f"(target mentions: {target_mentions})",
        )
        return True, None

    # ------------------------------------------------------------------
    # PUBLIC: source URL validation
    # ------------------------------------------------------------------

    def validate_sources(
        self,
        sources: list,
        city_name: str,
        state_abbr: str,
    ) -> Tuple[list, list]:
        """
        Validate that source URLs are relevant to the target city/state.

        Returns:
            (valid_sources, rejected_sources)
        """
        valid: list = []
        rejected: list = []

        city_slug = city_name.lower().replace(' ', '')
        state_lower = state_abbr.lower()
        state_name_lower = US_STATES.get(state_abbr.upper(), '').lower()

        for source in sources:
            url = source if isinstance(source, str) else source.get('url', '')
            url_lower = url.lower()

            conflicting_state = self._detect_state_in_url(url_lower, state_abbr)

            if conflicting_state:
                rejected.append({
                    'url': url,
                    'reason': f"URL domain/TLD contains {conflicting_state}, not {state_abbr}",
                })
                self.logger.log('source_validation', 'REJECTED', f"{url} — wrong state in domain")
                continue

            has_city = city_slug in url_lower or city_name.lower().replace(' ', '-') in url_lower
            has_state = state_lower in url_lower or state_name_lower in url_lower
            is_gov = '.gov' in url_lower or '.us' in url_lower

            if has_city or has_state or is_gov:
                valid.append(source)
            else:
                rejected.append({
                    'url': url,
                    'reason': f"URL doesn't reference {city_name} or {state_abbr}",
                })
                self.logger.log('source_validation', 'REJECTED', f"{url} — not relevant")

        self.logger.log(
            'source_validation', 'COMPLETE',
            f"{len(valid)} valid, {len(rejected)} rejected",
        )
        return valid, rejected

    # ------------------------------------------------------------------
    # PRIVATE HELPERS
    # ------------------------------------------------------------------

    def _count_state_mentions(
        self, text: str, state_abbr: str, state_name: str
    ) -> int:
        """
        Reliably count how often a state is referenced in text.

        Strategy (avoids false positives from ambiguous 2-letter abbrs):
          1. Count full state name with word boundary.
          2. Count address-pattern abbreviation `, TX` or `, Texas`.
          3. For unambiguous abbrs only, also count bare word boundary matches.
        """
        count = 0

        # 1. Full state name (always safe).
        name_re = _STATE_NAME_RE.get(state_abbr)
        if name_re:
            count += len(name_re.findall(text))

        # 2. Geographic address pattern: ", TX" — reliable signal.
        abbr_geo_re = _GEO_ABBR_RE.get(state_abbr)
        if abbr_geo_re:
            count += len(abbr_geo_re.findall(text))

        # 3. Bare word boundary match — only for unambiguous abbreviations.
        if state_abbr not in _AMBIGUOUS_ABBRS:
            bare = re.compile(r'\b' + re.escape(state_abbr) + r'\b', re.IGNORECASE)
            count += len(bare.findall(text))

        return count

    def _detect_conflicting_states(
        self, text: str, target_state_abbr: str, target_state_name: str
    ) -> List[Tuple[str, int]]:
        """
        Return a list of (state_name, mention_count) for non-target states
        that appear prominently in the text, sorted by count descending.

        CRITICAL FIX: Only checks full state names (with word boundaries) and
        geographic address patterns — NEVER bare 2-letter abbreviation matching
        in body text, which causes massive false positives for words like
        "in", "or", "me", "la", "ma", "co", "de", "hi", "id", "ok", "al".
        """
        conflicts: List[Tuple[str, int]] = []

        for abbr, name in US_STATES.items():
            if abbr == target_state_abbr:
                continue

            count = self._count_state_mentions(text, abbr, name)
            if count >= 2:          # require at least 2 mentions before flagging
                conflicts.append((name, count))

        conflicts.sort(key=lambda x: x[1], reverse=True)
        return conflicts

    def _detect_state_in_url(self, url: str, target_state: str) -> Optional[str]:
        """
        Detect if a URL's DOMAIN or TLD segment contains a different US state.

        CRITICAL FIX: Only inspect the domain portion (up to the first '/'),
        not the full path — to avoid matching 'or' in '/ordinance/' or
        'in' in '/information/' or 'me' in '/membership/'.

        Examples of correct rejections:
          - https://www.ny.gov/waste         → rejects for non-NY target
          - https://www.dallascityhall.tx.us → keeps for TX target
        Examples that must NOT be rejected:
          - https://austin.gov/information   → 'in' in path, keep
          - https://portland.gov/ordinance   → 'or' in path, keep
        """
        # Only analyse the domain/subdomain portion.
        # Strip scheme, take up to first '/' after host.
        try:
            without_scheme = re.sub(r'^https?://', '', url)
            domain = without_scheme.split('/')[0]   # e.g. "www.ny.gov" or "dallas.tx.us"
        except Exception:
            domain = url

        # Look for state abbreviation as a DNS label (between dots).
        domain_lower = domain.lower()
        labels = domain_lower.replace('-', '.').split('.')
        target_lower = target_state.lower()

        for label in labels:
            if label == target_lower:
                continue                           # that's our own state
            if label.upper() in US_STATES:        # it's a state abbreviation
                return label.upper()

        return None