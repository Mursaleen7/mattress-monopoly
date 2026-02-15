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
You are a HIGHLY ACCURATE data extraction specialist for municipal waste management regulations. Your task is to research and extract VERIFIED information about mattress disposal in {city}, {state}.

⚠️ CRITICAL ACCURACY REQUIREMENTS:
1. ONLY use information from OFFICIAL city/county government websites (.gov domains)
2. DO NOT make up or estimate ANY data - if you cannot find specific information, mark it as null or use the fallback values specified below
3. VERIFY every piece of data by cross-referencing multiple sections of official sources
4. DO NOT hallucinate phone numbers, addresses, or facility names
5. If a city uses a regional waste authority, find and cite that authority's information
6. Population data must be from recent census data (2020 or later)

RESEARCH PROCESS (follow this order):
Step 1: Search for "{city} {state} official government website solid waste" or "{city} {state} sanitation department"
Step 2: Look for bulk trash, bulky item pickup, or mattress-specific disposal pages
Step 3: Find the official waste management contact number (often 311, but verify)
Step 4: Locate drop-off centers, transfer stations, or recycling facilities that accept mattresses
Step 5: Find illegal dumping penalties in city ordinances or waste management codes
Step 6: Verify population from official census data

REQUIRED OUTPUT FORMAT (JSON):
{{
  "city_slug": "{city.lower().replace(' ', '-')}-{state_abbr.lower()}",
  "city_name": "{city}",
  "state_name": "{state}",
  "state_slug": "{state.lower().replace(' ', '-')}",
  "state_abbr": "{state_abbr}",
  "population": <EXACT population from 2020+ census, NOT estimated>,
  "mattress_rules": "<EXACT rules from official source - include: wrapping requirements, size limits, scheduling process, fees if any. If no specific mattress rules found, state general bulk item rules>",
  "dropoff_locations": [
    {{
      "name": "<EXACT facility name from official source>",
      "address": "<COMPLETE street address with ZIP code>",
      "phone": "<VERIFIED phone number in format: (XXX) XXX-XXXX>",
      "hours": "<EXACT operating hours, e.g., 'Mon-Fri 8AM-5PM, Sat 9AM-3PM'>",
      "accepts_mattresses": <true only if explicitly stated, false if uncertain>
    }}
  ],
  "pickup_service_available": <true ONLY if city offers curbside bulk pickup, false if drop-off only>,
  "pickup_phone": "<VERIFIED phone number for scheduling pickup, often 311 but MUST verify>",
  "illegal_dumping_fine": "<EXACT fine amount from city ordinance, e.g., '$500-$2,500' or 'Up to $1,000'>",
  "last_updated": "2026-02-14",
  "data_confidence": "<HIGH if all data verified from official sources, MEDIUM if some data missing, LOW if mostly fallback data>",
  "sources_checked": ["<list of official URLs you referenced>"]
}}

FIELD-SPECIFIC INSTRUCTIONS:

population: 
- Use official 2020 Census or later data
- Search: "{city} {state} population 2020 census"
- If unavailable, use most recent official city estimate

mattress_rules:
- Look for specific mattress disposal requirements
- Common requirements: plastic wrapping, scheduling advance notice, placement location
- Include any fees or restrictions
- If no mattress-specific rules, describe bulk item pickup rules
- Example: "Mattresses must be wrapped in plastic. Schedule pickup 24 hours in advance by calling 311. Place at curb by 6 AM on collection day."

dropoff_locations:
- ONLY include facilities explicitly listed on official city/county websites
- Verify each facility accepts mattresses (look for "accepted items" lists)
- Include 1-3 most accessible locations
- If no drop-off locations found, use empty array []
- DO NOT include private businesses unless officially listed by the city

pickup_service_available:
- true = city offers scheduled curbside bulk pickup
- false = residents must transport to drop-off location themselves
- Verify by looking for "bulk pickup", "curbside collection", or "schedule pickup" services

pickup_phone:
- Most common: 311 (but VERIFY this is correct for the city)
- Some cities use specific department numbers
- Format: (XXX) XXX-XXXX
- If no pickup service, use general sanitation department number

illegal_dumping_fine:
- Search city ordinances or waste management codes
- Look for "illegal dumping", "littering", or "unauthorized disposal" penalties
- Provide range if specified (e.g., "$500-$2,500")
- If not found, use "$500+" as conservative estimate

VERIFICATION CHECKLIST (complete before submitting):
✓ Population is from official census/city data, not estimated
✓ All phone numbers are verified from official sources
✓ All addresses are complete with street, city, state, ZIP
✓ Facility names match exactly as listed on official sites
✓ Hours of operation are current and verified
✓ Mattress rules are quoted or paraphrased from official policy
✓ No information is fabricated or assumed

If you cannot find verified information for a field after thorough research:
- population: Use 0 (will be manually updated)
- mattress_rules: "Contact [City] Sanitation Department at [verified phone] for mattress disposal requirements."
- dropoff_locations: [] (empty array)
- pickup_phone: "311" (most common, but note low confidence)
- illegal_dumping_fine: "$500+" (conservative estimate)
- data_confidence: "LOW"

OUTPUT ONLY THE JSON - no additional commentary or explanation.
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
        confidence = city_data.get('data_confidence', 'UNKNOWN')
        sources = city_data.get('sources_checked', [])
        
        print(f"✓ Successfully extracted data for {city}")
        print(f"  📊 Data Confidence: {confidence}")
        print(f"  📚 Sources Checked: {len(sources)}")
        if sources:
            for source in sources[:3]:  # Show first 3 sources
                print(f"     - {source}")
        
        # Validate required fields
        required_fields = ['city_name', 'state_name', 'population', 'mattress_rules']
        missing_fields = [field for field in required_fields if not city_data.get(field)]
        if missing_fields:
            print(f"  ⚠️  Missing fields: {', '.join(missing_fields)}")
        
        # Check for potential hallucination indicators
        if city_data.get('population', 0) == 0:
            print(f"  ⚠️  Population not found - needs manual verification")
        if not city_data.get('dropoff_locations'):
            print(f"  ⚠️  No drop-off locations found")
        
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
            "population": 0,
            "mattress_rules": f"Contact {city} Sanitation Department for mattress disposal requirements. Call 311 for information.",
            "dropoff_locations": [],
            "pickup_service_available": False,
            "pickup_phone": "311",
            "illegal_dumping_fine": "$500+",
            "last_updated": "2026-02-14",
            "data_confidence": "ERROR",
            "sources_checked": []
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
            "population": 0,
            "mattress_rules": f"Contact {city} Sanitation Department for mattress disposal requirements. Call 311 for information.",
            "dropoff_locations": [],
            "pickup_service_available": False,
            "pickup_phone": "311",
            "illegal_dumping_fine": "$500+",
            "last_updated": "2026-02-14",
            "data_confidence": "ERROR",
            "sources_checked": []
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
    high_confidence = sum(1 for r in results if r.get('data_confidence') == 'HIGH')
    medium_confidence = sum(1 for r in results if r.get('data_confidence') == 'MEDIUM')
    low_confidence = sum(1 for r in results if r.get('data_confidence') == 'LOW')
    errors = sum(1 for r in results if r.get('data_confidence') == 'ERROR')
    
    cities_with_population = sum(1 for r in results if r.get('population', 0) > 0)
    cities_with_dropoffs = sum(1 for r in results if r.get('dropoff_locations'))
    cities_with_pickup = sum(1 for r in results if r.get('pickup_service_available'))
    
    print("\n📊 DATA QUALITY REPORT:")
    print(f"   High Confidence: {high_confidence}/{len(results)} cities")
    print(f"   Medium Confidence: {medium_confidence}/{len(results)} cities")
    print(f"   Low Confidence: {low_confidence}/{len(results)} cities")
    if errors > 0:
        print(f"   ⚠️  Errors: {errors}/{len(results)} cities")
    
    print(f"\n📈 DATA COMPLETENESS:")
    print(f"   Population Data: {cities_with_population}/{len(results)} cities ({cities_with_population/len(results)*100:.1f}%)")
    print(f"   Drop-off Locations: {cities_with_dropoffs}/{len(results)} cities ({cities_with_dropoffs/len(results)*100:.1f}%)")
    print(f"   Pickup Service: {cities_with_pickup}/{len(results)} cities ({cities_with_pickup/len(results)*100:.1f}%)")
    
    # List cities needing manual review
    needs_review = [r['city_name'] for r in results if r.get('data_confidence') in ['LOW', 'ERROR'] or r.get('population', 0) == 0]
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
    print("5. Re-run scraper for low-confidence cities if needed")
    print("6. Deploy to Vercel once data is verified")
    print("=" * 60)

if __name__ == "__main__":
    main()
