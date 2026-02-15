#!/usr/bin/env python3
"""
AI-Powered City Data Scraper using Gemini 2.5
Intelligently extracts mattress disposal information from city websites
"""

import json
import os
import time
import requests
from typing import Dict, List
import google.generativeai as genai

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyDbDek1fvT6yln-jR0yVQ1CUb1QB3IXEPA"
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-2.5-flash')

# Target cities for data collection
TARGET_CITIES = [
    {"city": "Austin", "state": "Texas", "abbr": "TX"},
    {"city": "New York", "state": "New York", "abbr": "NY"},
    {"city": "Los Angeles", "state": "California", "abbr": "CA"},
    {"city": "Chicago", "state": "Illinois", "abbr": "IL"},
    {"city": "Houston", "state": "Texas", "abbr": "TX"},
    {"city": "Phoenix", "state": "Arizona", "abbr": "AZ"},
    {"city": "Philadelphia", "state": "Pennsylvania", "abbr": "PA"},
    {"city": "San Antonio", "state": "Texas", "abbr": "TX"},
    {"city": "San Diego", "state": "California", "abbr": "CA"},
    {"city": "Dallas", "state": "Texas", "abbr": "TX"},
]

def search_city_website(city: str, state: str) -> str:
    """
    Search for city's official mattress disposal page
    Returns the URL of the most relevant page
    """
    # Use Google Custom Search or SerpAPI for better results
    # For now, construct likely URLs
    city_clean = city.lower().replace(' ', '')
    queries = [
        f"https://www.{city_clean}.gov/bulky-trash",
        f"https://www.{city_clean}.gov/sanitation",
        f"https://www.{city_clean}.gov/solid-waste",
    ]
    
    # Return search query for Gemini to process
    return f"{city} {state} bulk trash mattress disposal rules site:.gov"

def extract_city_data_with_ai(city: str, state: str, state_abbr: str) -> Dict:
    """
    Use Gemini AI to extract structured data about mattress disposal
    """
    print(f"\n🤖 Processing {city}, {state} with Gemini AI...")
    
    prompt = f"""
# Role & Objective
You are a **Government Waste Data Auditor** (Strict Compliance Mode). Your goal is to extract 100% verifiable heavy trash and mattress disposal data for {city}, {state}. You must act as a filter, rejecting any data that is ambiguous, estimated, or unofficial.

# Critical Logic: The "Facility Capability" Test
Before adding ANY drop-off location to the final JSON, you must perform this internal audit for that specific address:

1. **Type Check:** Is this facility a "Recycling Center" (Cans/Paper only) or a "Neighborhood Depository/Transfer Station" (Heavy Trash/Furniture allowed)?

2. **Item Verification:** Does the official "Accepted Items" list for THIS specific location explicitly include "Mattresses" or "Bulk Waste"?
   - *If NO:* Do NOT list it as a disposal site. Label it "Recycling Only" or exclude it.

3. **Schedule Audit:** Does the schedule say "Mon-Sat"?
   - *Action:* Re-read carefully. Look for "Closed Mondays" or "Wed-Sun" patterns. Most depositories have non-standard hours.

# Research Steps (Execute in Order)
1. **Find the Authority:** Locate the official City/County ".gov" Solid Waste Department page.
2. **Locate the Policy:** Find the specific PDF or page for "Heavy Trash" or "Bulk Waste."
3. **Verify Pickup:** Check if curbside mattress pickup is automatic, by appointment, or non-existent.
4. **Verify Drop-off:** Accurate names, addresses, and *specific* hours for facilities that accept mattresses.
5. **Verify Fines:** Find the specific municipal code or official warning for illegal dumping fines.

# Strict Constraints
- **No "Recycling Centers" for Trash:** Never list a facility that only accepts recyclables (like Westpark in Houston) as a dump site for mattresses.
- **Exact Hours:** If a site is closed on Mondays, the JSON must explicitly state "Closed Mon" or list the exact days (e.g., "Tue-Sun"). Do not generalize to "Mon-Sat" unless verified.
- **Phone Numbers:** Only use the specific department line. If "311" is the only option, format it as "3-1-1 (City General Line)".
- **Population:** Use the 2020 (or later) US Census data. Do not estimate.

# Output Schema (JSON Only)
Return a single valid JSON object. No markdown formatting, no conversational text.

{{
  "city_slug": "{city.lower().replace(' ', '-')}-{state_abbr.lower()}",
  "city_name": "{city}",
  "state_name": "{state}",
  "state_slug": "{state.lower().replace(' ', '-')}",
  "state_abbr": "{state_abbr}",
  "population": {{
    "count": <Integer from 2020+ census>,
    "year": <Integer year of census data>,
    "source": "<URL to census data>"
  }},
  "contacts": {{
    "official_phone": "<String - specific department line or '3-1-1 (City General Line)'>",
    "department_name": "<String - e.g., 'Austin Resource Recovery'>",
    "website_url": "<String - official .gov URL>"
  }},
  "curbside_rules": {{
    "is_available": <Boolean - true only if curbside pickup exists>,
    "mattress_specific_rule": "<String - Exact quote from official source, e.g., 'Must be wrapped in plastic'>",
    "placement_time": "<String - e.g., 'Before 7am on collection day'>",
    "size_limits": "<String - any size/weight restrictions>"
  }},
  "drop_off_locations": [
    {{
      "name": "<String - e.g., 'North Main Neighborhood Depository'>",
      "address": "<String - complete address with ZIP>",
      "type": "<String - MUST be 'Heavy Trash' or 'Landfill' or 'Transfer Station' - NOT 'Recycling Center'>",
      "hours": "<String - EXACT hours, e.g., 'Tue-Sat 9am-6pm' or 'Closed Mon, Tue-Sun 8am-5pm'>",
      "notes": "<String - e.g., 'Proof of residency required' or 'Mattresses accepted'>"
    }}
  ],
  "illegal_dumping": {{
    "fine_amount": "<String - e.g., 'Up to $4,000' or '$500-$2,000'>",
    "citation": "<String - Source of fine info, e.g., 'Municipal Code Section 15-6-3'>"
  }},
  "audit_metadata": {{
    "confidence_score": "<HIGH/MEDIUM/LOW>",
    "verification_checklist": {{
      "gov_source_found": <Boolean>,
      "mattress_rule_verified": <Boolean>,
      "facility_hours_verified": <Boolean>,
      "facility_type_verified": <Boolean>,
      "population_census_verified": <Boolean>
    }},
    "sources_used": ["<URL>", "<URL>"],
    "last_updated": "2026-02-14"
  }}
}}

# Critical Reminders
- If a facility only accepts recyclables (cans, paper, cardboard), DO NOT include it
- If hours are uncertain or show "Mon-Sat" but you see "Closed Monday" elsewhere, use the specific days
- If no curbside pickup exists, set "is_available" to false and leave other curbside fields empty or null
- Population MUST be from official census, not estimated
- Confidence score should be LOW if any critical data is missing or uncertain

OUTPUT ONLY THE JSON - no markdown code blocks, no commentary.
"""
    
    try:
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        response_text = response.text
        print(f"📄 Raw response preview: {response_text[:200]}...")
        
        # Find JSON in the response (it might be wrapped in markdown code blocks)
        if "```json" in response_text:
            json_start = response_text.find("```json") + 7
            json_end = response_text.find("```", json_start)
            json_text = response_text[json_start:json_end].strip()
        elif "```" in response_text:
            json_start = response_text.find("```") + 3
            json_end = response_text.find("```", json_start)
            json_text = response_text[json_start:json_end].strip()
        else:
            # Try to find JSON object directly
            json_start = response_text.find("{")
            json_end = response_text.rfind("}") + 1
            if json_start != -1 and json_end > json_start:
                json_text = response_text[json_start:json_end].strip()
            else:
                json_text = response_text.strip()
        
        # Parse JSON
        city_data = json.loads(json_text)
        
        # Validate and report data quality
        audit = city_data.get('audit_metadata', {})
        confidence = audit.get('confidence_score', 'UNKNOWN')
        sources = audit.get('sources_used', [])
        checklist = audit.get('verification_checklist', {})
        
        print(f"✓ Successfully extracted data for {city}")
        print(f"  📊 Data Confidence: {confidence}")
        print(f"  📚 Sources Checked: {len(sources)}")
        if sources:
            for source in sources[:3]:  # Show first 3 sources
                print(f"     - {source}")
        
        # Validate required fields
        required_fields = ['city_name', 'state_name', 'population', 'curbside_rules']
        missing_fields = [field for field in required_fields if not city_data.get(field)]
        if missing_fields:
            print(f"  ⚠️  Missing fields: {', '.join(missing_fields)}")
        
        # Check for potential issues
        pop_count = city_data.get('population', {}).get('count', 0) if isinstance(city_data.get('population'), dict) else city_data.get('population', 0)
        if pop_count == 0:
            print(f"  ⚠️  Population not found - needs manual verification")
        
        if not city_data.get('drop_off_locations'):
            print(f"  ⚠️  No drop-off locations found")
        
        # Check verification checklist
        if checklist:
            failed_checks = [k for k, v in checklist.items() if not v]
            if failed_checks:
                print(f"  ⚠️  Failed verification checks: {', '.join(failed_checks)}")
        
        return city_data
        
    except json.JSONDecodeError as e:
        print(f"✗ JSON Parse Error for {city}: {str(e)}")
        print(f"   Response text: {response_text[:500]}")
        # Return conservative fallback data
        return {
            "city_slug": f"{city.lower().replace(' ', '-')}-{state_abbr.lower()}",
            "city_name": city,
            "state_name": state,
            "state_slug": state.lower().replace(' ', '-'),
            "state_abbr": state_abbr,
            "population": {
                "count": 0,
                "year": 2020,
                "source": "Not found"
            },
            "contacts": {
                "official_phone": "3-1-1 (City General Line)",
                "department_name": f"{city} Sanitation Department",
                "website_url": ""
            },
            "curbside_rules": {
                "is_available": False,
                "mattress_specific_rule": "",
                "placement_time": "",
                "size_limits": ""
            },
            "drop_off_locations": [],
            "illegal_dumping": {
                "fine_amount": "$500+",
                "citation": "Not found"
            },
            "audit_metadata": {
                "confidence_score": "ERROR",
                "verification_checklist": {
                    "gov_source_found": False,
                    "mattress_rule_verified": False,
                    "facility_hours_verified": False,
                    "facility_type_verified": False,
                    "population_census_verified": False
                },
                "sources_used": [],
                "last_updated": "2026-02-14"
            }
        }
    except Exception as e:
        print(f"✗ Error processing {city}: {str(e)}")
        # Return conservative fallback data
        return {
            "city_slug": f"{city.lower().replace(' ', '-')}-{state_abbr.lower()}",
            "city_name": city,
            "state_name": state,
            "state_slug": state.lower().replace(' ', '-'),
            "state_abbr": state_abbr,
            "population": {
                "count": 0,
                "year": 2020,
                "source": "Not found"
            },
            "contacts": {
                "official_phone": "3-1-1 (City General Line)",
                "department_name": f"{city} Sanitation Department",
                "website_url": ""
            },
            "curbside_rules": {
                "is_available": False,
                "mattress_specific_rule": "",
                "placement_time": "",
                "size_limits": ""
            },
            "drop_off_locations": [],
            "illegal_dumping": {
                "fine_amount": "$500+",
                "citation": "Not found"
            },
            "audit_metadata": {
                "confidence_score": "ERROR",
                "verification_checklist": {
                    "gov_source_found": False,
                    "mattress_rule_verified": False,
                    "facility_hours_verified": False,
                    "facility_type_verified": False,
                    "population_census_verified": False
                },
                "sources_used": [],
                "last_updated": "2026-02-14"
            }
        }

def main():
    """Main scraper function"""
    print("=" * 60)
    print("AI-Powered Mattress Disposal Data Scraper")
    print("Using Gemini 2.5 for intelligent data extraction")
    print("=" * 60)
    
    results = []
    
    for idx, city_data in enumerate(TARGET_CITIES, 1):
        print(f"\n[{idx}/{len(TARGET_CITIES)}] Processing {city_data['city']}, {city_data['state']}")
        
        # Extract data using AI
        city_info = extract_city_data_with_ai(
            city_data['city'],
            city_data['state'],
            city_data['abbr']
        )
        
        results.append(city_info)
        
        # Rate limiting - be nice to the API
        if idx < len(TARGET_CITIES):
            print("⏳ Waiting 3 seconds before next request...")
            time.sleep(3)
    
    # Save to JSON
    output_file = '../data/cities.json'
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    # Generate Data Quality Report
    print("\n" + "=" * 60)
    print(f"✓ SUCCESS! Saved {len(results)} cities to {output_file}")
    print("=" * 60)
    
    # Analyze data quality
    high_confidence = sum(1 for r in results if r.get('audit_metadata', {}).get('confidence_score') == 'HIGH')
    medium_confidence = sum(1 for r in results if r.get('audit_metadata', {}).get('confidence_score') == 'MEDIUM')
    low_confidence = sum(1 for r in results if r.get('audit_metadata', {}).get('confidence_score') == 'LOW')
    errors = sum(1 for r in results if r.get('audit_metadata', {}).get('confidence_score') == 'ERROR')
    
    # Extract population count from nested structure
    def get_pop_count(r):
        pop = r.get('population', {})
        if isinstance(pop, dict):
            return pop.get('count', 0)
        return pop if pop else 0
    
    cities_with_population = sum(1 for r in results if get_pop_count(r) > 0)
    cities_with_dropoffs = sum(1 for r in results if r.get('drop_off_locations'))
    cities_with_pickup = sum(1 for r in results if r.get('curbside_rules', {}).get('is_available'))
    
    print("\n📊 DATA QUALITY REPORT:")
    print(f"   High Confidence: {high_confidence}/{len(results)} cities")
    print(f"   Medium Confidence: {medium_confidence}/{len(results)} cities")
    print(f"   Low Confidence: {low_confidence}/{len(results)} cities")
    if errors > 0:
        print(f"   ⚠️  Errors: {errors}/{len(results)} cities")
    
    print(f"\n📈 DATA COMPLETENESS:")
    print(f"   Population Data: {cities_with_population}/{len(results)} cities ({cities_with_population/len(results)*100:.1f}%)")
    print(f"   Drop-off Locations: {cities_with_dropoffs}/{len(results)} cities ({cities_with_dropoffs/len(results)*100:.1f}%)")
    print(f"   Curbside Pickup: {cities_with_pickup}/{len(results)} cities ({cities_with_pickup/len(results)*100:.1f}%)")
    
    # List cities needing manual review
    needs_review = [r['city_name'] for r in results if r.get('audit_metadata', {}).get('confidence_score') in ['LOW', 'ERROR'] or get_pop_count(r) == 0]
    if needs_review:
        print(f"\n⚠️  CITIES NEEDING MANUAL REVIEW ({len(needs_review)}):")
        for city in needs_review:
            print(f"   - {city}")
    
    print("\n" + "=" * 60)
    print("NEXT STEPS:")
    print("1. Review cities marked as LOW confidence or ERROR")
    print("2. Manually verify 2-3 HIGH confidence cities for accuracy")
    print("3. Fill in missing population data (marked as 0)")
    print("4. Verify phone numbers and addresses for drop-off locations")
    print("5. Check that no 'Recycling Centers' were incorrectly listed")
    print("6. Re-run scraper for low-confidence cities if needed")
    print("7. Deploy to Vercel once data is verified")
    print("=" * 60)

if __name__ == "__main__":
    main()
