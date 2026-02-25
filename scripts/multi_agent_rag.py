"""
Multi-Agent RAG Pipeline - Specialized Extraction Agents
Implements 95% accuracy through granular schema splitting
"""

# Agent 1: The Dispatcher - Extracts contacts & URLs
DISPATCHER_PROMPT = """Extract ONLY contact information from this text about {city_name} waste management.

TEXT:
{text}

Find:
1. Phone number (3-1-1, (XXX) XXX-XXXX, or similar)
2. Department name (e.g., "Sanitation Department", "Resource Recovery")
3. Website URL (.gov domain)

Return JSON:
{{
  "official_phone": "exact phone or null",
  "department_name": "exact name or null",
  "website_url": "exact URL or null"
}}

ONLY extract if explicitly stated. Use null if not found. No markdown."""

# Agent 2: The Rule Enforcer - Extracts curbside rules & fines
RULE_ENFORCER_PROMPT = """Extract ONLY curbside collection rules and illegal dumping fines for {city_name}.

TEXT:
{text}

Find:
1. Is curbside bulk/mattress pickup available? (true/false)
2. Mattress-specific rule (exact quote about mattresses, box springs, or bedding)
3. Placement time (when to put items out)
4. Size limits (weight, dimensions for bulk items)
5. The catch (main restriction like "appointment required" or "twice per year")
6. Fine amount for illegal dumping
7. Citation/code section for fines

Return JSON:
{{
  "curbside_rules": {{
    "is_available": true or false,
    "mattress_specific_rule": "exact quote or null",
    "placement_time": "exact time or null",
    "size_limits": "exact limits or null",
    "the_catch": "main restriction or null",
    "schedule_logic": null
  }},
  "illegal_dumping": {{
    "fine_amount": "exact amount or null",
    "citation": "exact code or null"
  }}
}}

CRITICAL: Only extract mattress/bulk item rules, NOT yard waste or recycling rules. No markdown."""

# Agent 3: The Navigator - Extracts drop-off locations
NAVIGATOR_PROMPT = """Extract ONLY drop-off facilities that accept mattresses or bulk waste for {city_name}, {state_abbr}.

TEXT:
{text}

Find facilities that accept:
- Mattresses
- Box springs
- Furniture
- Bulk waste
- Large items

For each facility extract:
1. Name (exact facility name)
2. Address (complete with ZIP if available)
3. Type (must be "Heavy Trash", "Landfill", or "Transfer Station" - NOT recycling center)
4. Hours (exact operating hours)
5. Fee (tipping fee or cost)
6. Residency required (true/false)
7. Notes (any restrictions)
8. Accepted items (list of items)

Return JSON:
{{
  "drop_off_locations": [
    {{
      "name": "exact name",
      "address": "complete address or null",
      "type": "Heavy Trash" or "Landfill" or "Transfer Station",
      "hours": "exact hours or null",
      "tipping_fee": "exact fee or null",
      "residency_required": true or false or null,
      "notes": "restrictions or null",
      "accepted_items": ["item1", "item2"] or null
    }}
  ]
}}

CRITICAL: Do NOT include recycling centers that only accept cans/paper. Only facilities that accept mattresses/furniture. No markdown."""

# Agent 4: The Skeptical Auditor - Verifies extractions
AUDITOR_PROMPT = """You are a skeptical auditor. Review this extracted data against the source text.

EXTRACTED DATA:
{extracted_json}

SOURCE TEXT:
{source_text}

Verify:
1. Does each facility explicitly accept mattresses or bulk waste? If not, remove it.
2. Do the size limits apply to bulk items, or to something else (yard waste, recycling)? Correct if wrong.
3. Is the phone number for waste management, or for something else? Correct if wrong.
4. Are the curbside rules for mattresses/bulk items, or for yard waste? Correct if wrong.

Return the CORRECTED JSON with the same structure. Remove any facilities that don't accept mattresses. Fix any misattributed rules. No markdown."""

