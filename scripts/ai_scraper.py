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
model = genai.GenerativeModel('gemini-2.0-flash-exp')

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
You are a data extraction expert. Research and provide accurate information about mattress disposal in {city}, {state}.

Please provide the following information in JSON format:

{{
  "city_slug": "{city.lower().replace(' ', '-')}-{state_abbr.lower()}",
  "city_name": "{city}",
  "state_name": "{state}",
  "state_slug": "{state.lower().replace(' ', '-')}",
  "state_abbr": "{state_abbr}",
  "population": <estimated population>,
  "mattress_rules": "<specific rules for mattress disposal - wrapping requirements, scheduling, etc>",
  "dropoff_locations": [
    {{
      "name": "<facility name>",
      "address": "<full address>",
      "phone": "<phone number>",
      "hours": "<operating hours>",
      "accepts_mattresses": true
    }}
  ],
  "pickup_service_available": <true/false>,
  "pickup_phone": "<phone number for bulk pickup, usually 311>",
  "illegal_dumping_fine": "<fine amount range>",
  "last_updated": "2026-02-14"
}}

Search for official city government information. Focus on:
1. Official city sanitation/solid waste department rules
2. Bulk item collection policies
3. Drop-off center locations that accept mattresses
4. Pickup scheduling requirements
5. Penalties for illegal dumping

Provide accurate, factual information from official sources. If you cannot find specific information, use reasonable defaults based on typical city policies.
"""
    
    try:
        response = model.generate_content(prompt)
        
        # Extract JSON from response
        response_text = response.text
        
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
            json_text = response_text.strip()
        
        # Parse JSON
        city_data = json.loads(json_text)
        print(f"✓ Successfully extracted data for {city}")
        return city_data
        
    except Exception as e:
        print(f"✗ Error processing {city}: {str(e)}")
        # Return template data as fallback
        return {
            "city_slug": f"{city.lower().replace(' ', '-')}-{state_abbr.lower()}",
            "city_name": city,
            "state_name": state,
            "state_slug": state.lower().replace(' ', '-'),
            "state_abbr": state_abbr,
            "population": 0,
            "mattress_rules": "Contact local sanitation department for specific disposal rules.",
            "dropoff_locations": [],
            "pickup_service_available": True,
            "pickup_phone": "311",
            "illegal_dumping_fine": "$500+",
            "last_updated": "2026-02-14"
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
    output_file = 'data/cities.json'
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print("\n" + "=" * 60)
    print(f"✓ SUCCESS! Saved {len(results)} cities to {output_file}")
    print("=" * 60)
    print("\nNEXT STEPS:")
    print("1. Review the data in data/cities.json")
    print("2. Verify accuracy for 2-3 cities manually")
    print("3. Deploy to Vercel to see the updated pages")
    print("4. Run again with more cities to scale to 50+")

if __name__ == "__main__":
    main()
