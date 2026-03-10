#!/usr/bin/env python3
"""
Simple Serper.dev API test - matches your exact format
Tests one specific query for all 36 cities
"""
import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Serper.dev configuration
SERPER_API_KEY = os.getenv('SERPER_API_KEY', '9ed1f7bc62e135d713cfda4ad402c35ee9967713')

# All 36 Greater Boston cities
CITIES = [
    'Boston', 'Cambridge', 'Somerville', 'Brookline',
    'Quincy', 'Newton', 'Waltham', 'Watertown', 'Medford', 'Malden',
    'Everett', 'Chelsea', 'Revere', 'Winthrop', 'Arlington', 'Belmont',
    'Lynn', 'Salem', 'Peabody', 'Beverly', 'Danvers', 'Marblehead',
    'Swampscott', 'Nahant', 'Braintree', 'Weymouth', 'Milton', 'Dedham',
    'Needham', 'Wellesley', 'Hingham', 'Lexington', 'Woburn', 'Burlington',
    'Winchester', 'Stoneham'
]

def search_city(city):
    """
    Search using serper.dev API for a specific city
    Equivalent to SerpAPI format but using serper.dev
    """
    
    # Serper.dev uses POST request with JSON payload
    url = "https://google.serper.dev/search"
    
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }
    
    # Query matching your format
    query = f'"{city}" solid waste department mattress disposal 2024 OR 2025 OR 2026'
    
    payload = {
        'q': query,
        'num': 5,  # Number of results
        'gl': 'us',  # Country
        'hl': 'en'   # Language
    }
    
    print(f"\n{'='*80}")
    print(f"City: {city}, MA")
    print(f"Query: {query}")
    print(f"{'='*80}")
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        results = response.json()
        
        # Print results
        organic_results = results.get('organic', [])
        print(f"\nFound {len(organic_results)} results:")
        
        for i, result in enumerate(organic_results, 1):
            print(f"\n{i}. {result.get('title', 'N/A')}")
            print(f"   URL: {result.get('link', 'N/A')}")
            print(f"   Snippet: {result.get('snippet', 'N/A')[:150]}...")
        
        return results
        
    except requests.exceptions.RequestException as e:
        print(f"\n❌ Error: {e}")
        return None

def main():
    """Test all cities"""
    print("SERPER.DEV API TEST - ALL CITIES")
    print(f"Total cities: {len(CITIES)}")
    print(f"API Key: {SERPER_API_KEY[:20]}...")
    
    all_results = {}
    
    for city in CITIES:
        results = search_city(city)
        all_results[city] = results
        
        # Small delay between requests
        import time
        time.sleep(1)
    
    # Save all results
    with open('serper_all_cities_results.json', 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\n{'='*80}")
    print("All results saved to: serper_all_cities_results.json")
    print(f"{'='*80}")

if __name__ == '__main__':
    main()
