"""Multi-agent extraction system using Gemini."""
import json
import asyncio
from typing import Dict, List, Optional
import google.generativeai as genai

from .utils import Logger, ParseError
from .config import GEMINI_API_KEY

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)


# ── SHARED HELPER ─────────────────────────────────────────────────────────────

async def _gemini_json(model, prompt: str, temperature: float = 0.1,
                       retries: int = 3, logger: Optional[Logger] = None,
                       tag: str = '') -> Optional[dict]:
    """
    Call Gemini and return parsed JSON. Retries with backoff.
    Returns None on total failure so callers can decide their own fallback.
    """
    for attempt in range(retries):
        try:
            response = model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=temperature,
                ),
            )
            return json.loads(response.text)
        except Exception as e:
            if attempt < retries - 1:
                await asyncio.sleep(2 ** attempt)
                if logger:
                    logger.log(tag, 'RETRY', f"Attempt {attempt + 1} failed: {e}")
            else:
                if logger:
                    logger.log(tag, 'ERROR', str(e))
    return None


# ── AGENT 0: CITY DISCOVERY ───────────────────────────────────────────────────

class AgentCityDiscovery:
    """
    Agent 0: Synthesise city government URLs and department info from LLM knowledge.

    This is a LAST-RESORT agent — it runs only when Phase 2 content is empty.
    All URLs it returns MUST be verified live by Phase2._verify_url_is_live()
    before being fetched (BUG 7 fix in phases.py).

    IMPORTANT: The prompt explicitly instructs the model to:
      1. Only reference {city_name}, {state_abbr} — not any namesake city.
      2. Acknowledge uncertainty rather than hallucinate.
      3. Mark URLs it is NOT certain about as null.
    """

    def __init__(self, logger: Logger):
        self.logger = logger
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def discover(self, city_name: str, state_abbr: str, state_name: str) -> Dict:
        """
        Generate candidate URLs, department names, and 311 phone for a specific city.

        Returns a dict compatible with the contacts schema plus candidate_urls.
        """
        prompt = f"""You are a US municipal government expert.

TARGET CITY: {city_name}, {state_abbr} ({state_name})

CRITICAL: You must ONLY provide information about {city_name} in {state_abbr} ({state_name}).
Do NOT confuse this with any other city named "{city_name}" in a different state.
If you are not confident this specific city has a particular feature, use null.

For {city_name}, {state_abbr}, provide:
1. The official city government website URL for solid waste / sanitation
2. The official department name for waste management in {city_name}, {state_abbr}
3. The 3-1-1 number or main waste department phone for {city_name}, {state_abbr}
4. Up to 3 candidate URLs to scrape for bulk item / mattress disposal rules
5. The most likely illegal dumping fine range and ordinance citation

RULES:
- Only output URLs you are HIGHLY confident exist for {city_name}, {state_abbr} specifically
- Use null for any field you are uncertain about
- Do NOT guess — accuracy matters more than completeness
- Do NOT provide information for a different {city_name} in another state

Return JSON with this exact structure:
{{
  "website_url": "https://... or null",
  "department_name": "Official Dept Name or null",
  "official_phone": "3-1-1 (XXX-XXX-XXXX) or null",
  "candidate_urls": ["url1", "url2"],
  "illegal_dumping_fine": "$X,XXX or null",
  "illegal_dumping_citation": "City Code Chapter X or null"
}}

No markdown. Return only JSON."""

        result = await _gemini_json(
            self.model, prompt, temperature=0.1,
            logger=self.logger, tag='agent_city_discovery',
        )

        if result:
            # Remove any null URLs from candidate list
            result['candidate_urls'] = [
                u for u in result.get('candidate_urls', [])
                if u and isinstance(u, str) and u.startswith('http')
            ]
            self.logger.log(
                'agent_city_discovery', 'SUCCESS',
                f"Found {len(result.get('candidate_urls', []))} candidate URLs for "
                f"{city_name}, {state_abbr}",
            )
            return result

        self.logger.log('agent_city_discovery', 'FAILED',
                        f"Could not discover URLs for {city_name}, {state_abbr}")
        return {
            'website_url': None,
            'department_name': None,
            'official_phone': '3-1-1',
            'candidate_urls': [],
            'illegal_dumping_fine': None,
            'illegal_dumping_citation': None,
        }


# ── AGENT 1: DISPATCHER (contacts) ────────────────────────────────────────────

class AgentDispatcher:
    """Agent 1: Extract contact information."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def extract(self, text: str, city_name: str,
                      state_abbr: str = '', state_name: str = '') -> Dict:
        """Extract contacts from text."""
        location_context = f"{city_name}, {state_abbr}" if state_abbr else city_name
        prompt = f"""Extract contact information for the waste management department
serving {location_context}.

IMPORTANT: Only extract contacts that are for {location_context} specifically.
Ignore any contact info for other cities or states that may appear in the text.

TEXT:
{text[:3000]}

Find:
- official_phone: The main phone number for {location_context} waste/sanitation department
- department_name: Official name of the {location_context} department
- website_url: Official website URL for {location_context} waste management

Return JSON:
{{
  "official_phone": "exact text or null",
  "department_name": "exact text or null",
  "website_url": "exact text or null"
}}

Extract exact text. Use null if not found. No markdown."""

        result = await _gemini_json(
            self.model, prompt, temperature=0.1,
            logger=self.logger, tag='agent_dispatcher',
        )

        if result:
            self.logger.log('agent_dispatcher', 'SUCCESS', 'Extracted contacts')
            return result

        return {"official_phone": None, "department_name": None, "website_url": None}


# ── AGENT 2: RULE ENFORCER ────────────────────────────────────────────────────

class AgentRuleEnforcer:
    """Agent 2: Extract curbside rules and illegal dumping fines."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def extract(self, text: str, city_name: str,
                      fine_hint: str = '', state_abbr: str = '') -> Dict:
        """Extract rules and fines from text."""
        location_context = f"{city_name}, {state_abbr}" if state_abbr else city_name
        prompt = f"""Extract curbside collection rules and illegal dumping fines for
{location_context} from the text below.

TEXT:
{text[:5000]}

════════════════════════════════════════
SECTION 1: CURBSIDE BULK ITEM RULES
════════════════════════════════════════
TARGET: Rules for BULK ITEM / MATTRESS / FURNITURE curbside collection in {location_context}.

⚠️  IGNORE THESE COMPLETELY — do NOT extract into curbside_rules:
  • Yard waste rules (grass, leaves, branches, twigs, hedge clippings, biodegradable bags)
  • Standard weekly trash/garbage cart rules (96-gallon carts, regular trash cans)
  • Recycling bin rules (cardboard, glass, cans, paper, plastic, bottles)
  • Composting or food waste rules

ONLY extract rules that specifically apply to:
  mattresses, box springs, furniture, couches, sofas, bulk items, large items,
  heavy trash, oversize items, white goods, appliances, junk pickup

Three-valued logic for is_available:
  true  → text explicitly says bulk/mattress curbside pickup IS available
  false → text explicitly says it is NOT available or requires special arrangement
  null  → text does not mention curbside bulk pickup (DO NOT default to false)

Priority for mattress_specific_rule:
  1. Explicit "mattress" or "box spring" mention → exact quote
  2. "bulk item", "large item", "furniture", "junk pickup" rules → exact quote
  3. If only yard waste or trash cart rules found → null (do not use those)

For size_limits: ONLY bulk/large item limits (max cubic yards, weight limits for bulk items).
  NOT standard trash can sizes (96-gallon cart = standard trash, ignore it).
  NOT yard waste bag limits. If only those found → null.

For placement_time: ONLY bulk item placement timing. NOT yard waste schedule. NOT trash cart timing.

════════════════════════════════════════
SECTION 2: ILLEGAL DUMPING FINES
════════════════════════════════════════
Find fine amounts and legal code citations for illegal dumping in {location_context}.

{fine_hint}

FIELD DEFINITIONS:
- fine_amount: Dollar amount only (e.g., "$500–$2,000", "Up to $4,000"). From search hint if provided.
- citation: ONLY a legal code reference (e.g., "City Code Chapter 18", "Municipal Code §12-8",
  "Texas Health & Safety Code §365.012"). 
  NOT a sentence. NOT body text. NOT enforcement warnings.
  If the text has no code section number, use null.

════════════════════════════════════════
Return JSON (no markdown):
{{
  "curbside_rules": {{
    "is_available": true/false/null,
    "mattress_specific_rule": "exact bulk/mattress rule text or null",
    "placement_time": "exact bulk item timing or null",
    "size_limits": "exact bulk item size limits or null",
    "the_catch": "exact gotcha/restriction for bulk pickup or null",
    "schedule_logic": "exact scheduling info for bulk/junk pickup or null"
  }},
  "illegal_dumping": {{
    "fine_amount": "dollar amount or null",
    "citation": "legal code reference or null"
  }}
}}

CRITICAL: null means not found. Do NOT fill fields with yard waste, trash cart, or recycling rules."""

        result = await _gemini_json(
            self.model, prompt, temperature=0.1,
            logger=self.logger, tag='agent_rule_enforcer',
        )

        if result:
            self.logger.log('agent_rule_enforcer', 'SUCCESS', 'Extracted rules')
            return result

        return {
            "curbside_rules": {
                "is_available": None,
                "mattress_specific_rule": None,
                "placement_time": None,
                "size_limits": None,
                "the_catch": None,
                "schedule_logic": None,
            },
            "illegal_dumping": {
                "fine_amount": None,
                "citation": None,
            },
        }


# ── AGENT 3: NAVIGATOR (facilities) ───────────────────────────────────────────

class AgentNavigator:
    """Agent 3: Extract drop-off facilities."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def extract(self, text: str, city_name: str, state_abbr: str) -> List[Dict]:
        """Extract facilities from text."""
        state_name_map = {
            'TX': 'Texas', 'CA': 'California', 'NY': 'New York', 'FL': 'Florida',
            'IL': 'Illinois', 'PA': 'Pennsylvania', 'OH': 'Ohio', 'GA': 'Georgia',
            'NC': 'North Carolina', 'MI': 'Michigan', 'WA': 'Washington',
            'AZ': 'Arizona', 'CO': 'Colorado', 'OR': 'Oregon',
        }
        state_name = state_name_map.get(state_abbr.upper(), state_abbr)

        prompt = f"""Extract drop-off facilities that accept mattresses/bulk waste
in {city_name}, {state_abbr} ({state_name}).

TEXT:
{text[:5000]}

IMPORTANT: Only extract facilities physically located in or near {city_name}, {state_abbr}.
Do NOT include facilities from other states or unrelated cities.

Find facilities accepting: mattresses, box springs, furniture, bulk waste, large items.

INCLUDE: landfills, transfer stations, bulk waste centers, reuse/recycle centers that
accept mattresses or large items.
EXCLUDE: facilities that ONLY accept cardboard/glass/cans/paper (no bulk items).

Return JSON:
{{
  "drop_off_locations": [
    {{
      "name": "exact text",
      "address": "full address with city and {state_abbr} state",
      "type": "Landfill/Transfer Station/Drop-Off Center or null",
      "hours": "exact text or null",
      "tipping_fee": "exact text or null",
      "residency_required": true/false/null,
      "notes": "exact text or null"
    }}
  ]
}}

Extract exact text. Include full addresses. No markdown."""

        result = await _gemini_json(
            self.model, prompt, temperature=0.1,
            logger=self.logger, tag='agent_navigator',
        )

        if result:
            locations = result.get('drop_off_locations', [])
            self.logger.log('agent_navigator', 'SUCCESS',
                            f"Extracted {len(locations)} facilities")
            return locations

        return []


# ── AGENT 4: AUDITOR ──────────────────────────────────────────────────────────

class AgentAuditor:
    """Agent 4: Verify and correct extractions."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def verify(self, extracted: Dict, text: str,
                     city_name: str, state_abbr: str = '',
                     fine_hint: str = '') -> Dict:
        """Verify and correct extracted data."""
        location_context = f"{city_name}, {state_abbr}" if state_abbr else city_name

        # BUG F FIX: Include the fine_hint in the auditor prompt so it knows a fine
        # was found via a verified search snippet and should NOT be nulled out just
        # because it doesn't appear in the main scraped text block.
        fine_note = ""
        if fine_hint:
            fine_note = (
                f"\n\nIMPORTANT — FINE FROM VERIFIED SEARCH SNIPPET:\n{fine_hint}\n"
                f"If illegal_dumping.fine_amount is set in EXTRACTED DATA, DO NOT "
                f"remove it even if you cannot find it in SOURCE TEXT above — it was "
                f"verified from a separate search result and is accurate."
            )

        prompt = f"""Verify and correct extracted waste management data for {location_context}.

EXTRACTED DATA:
{json.dumps(extracted, indent=2)[:2000]}

SOURCE TEXT:
{text[:2000]}
{fine_note}

VERIFICATION RULES:
1. Facilities: KEEP if they accept ANY of: mattresses, bulk waste, furniture, large items.
   ONLY REMOVE if facility explicitly accepts ONLY cardboard/glass/cans/paper.
2. Facilities: REMOVE if address clearly belongs to a different state than {state_abbr}.
3. Rules: If rules mention bulk items or furniture, KEEP even if "mattress" not explicit.
4. Phone: KEEP if it's for waste/sanitation management in {location_context}.
5. is_available: Keep as null if simply no information — do NOT change null to false.
6. fine_amount: If already set in EXTRACTED DATA, preserve it — see FINE note above.
7. When in doubt, KEEP the data rather than removing it.

Return corrected JSON with same structure. No markdown."""

        result = await _gemini_json(
            self.model, prompt, temperature=0.1,
            logger=self.logger, tag='agent_auditor',
        )

        if result:
            self.logger.log('agent_auditor', 'SUCCESS', 'Verified and corrected extractions')
            return result

        self.logger.log('agent_auditor', 'PASSTHROUGH', 'Returning unverified data')
        return extracted


# ── CHARISMA SYNTHESIZER ──────────────────────────────────────────────────────

class CharismaSynthesizer:
    """Generate SEO copy and marketing content."""

    def __init__(self, logger: Logger):
        self.logger = logger
        self.model = genai.GenerativeModel('gemini-2.5-flash')

    async def generate(self, extracted_data: Dict, geo_data: Dict,
                       city_name: str, state_abbr: str) -> Dict:
        """Generate charisma content."""
        fine_amount = extracted_data.get('illegal_dumping', {}).get('fine_amount', '$500-$2,000')

        curbside_status = extracted_data.get('curbside_rules', {}).get('is_available')
        if curbside_status is True:
            curbside_desc = "Curbside pickup available"
        elif curbside_status is False:
            curbside_desc = "No curbside pickup"
        else:
            curbside_desc = "Curbside pickup status unclear — check with city"

        prompt = f"""Generate SEO copy for {city_name}, {state_abbr} mattress disposal guide.

CONTEXT:
- Fine: {fine_amount}
- Weather: {"Rainy" if geo_data.get('weather_profile', {}).get('is_rain_heavy') else "Dry"}
- Curbside: {curbside_desc}

Create 4 pieces of copy specifically for {city_name}, {state_abbr} residents:
- hero_hook: One sentence pain point for {city_name} residents disposing of a mattress
- seo_title: Title with 2026 and keywords (under 60 chars)
- seo_description: Description with fine and rules (under 155 chars)
- neighborhoods: 15 comma-separated neighborhood names actually in {city_name}, {state_abbr}

IMPORTANT:
- If curbside status is "unclear", do NOT claim there is no curbside pickup.
- Neighborhoods must be real neighborhoods in {city_name}, {state_abbr} — not generic.

Return JSON:
{{
  "hero_hook": "one sentence",
  "seo_title": "title",
  "seo_description": "description",
  "neighborhoods": "15 real neighborhoods"
}}

No markdown."""

        result = await _gemini_json(
            self.model, prompt, temperature=0.7,
            logger=self.logger, tag='charisma_synthesis',
        )

        if result:
            self.logger.log('charisma_synthesis', 'SUCCESS', 'Generated copy')
            return result

        return {
            'hero_hook': f"Need to dispose of a mattress in {city_name}?",
            'seo_title': f"Mattress Disposal {city_name}: 2026 Guide",
            'seo_description': (
                f"Official guide to mattress disposal in {city_name}, {state_abbr}. "
                f"Rules, fees, and private haulers."
            ),
            'neighborhoods': (
                f"Downtown {city_name}, Midtown, Uptown, East {city_name}, West {city_name}, "
                f"North {city_name}, South {city_name}, Central {city_name}, {city_name} Heights, "
                f"Old {city_name}, New {city_name}, {city_name} Park, {city_name} Hills, "
                f"{city_name} Village, Greater {city_name}"
            ),
        }