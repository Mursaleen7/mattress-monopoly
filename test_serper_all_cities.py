#!/usr/bin/env python3
"""
Test Serper.dev API for all Greater Boston cities
Equivalent to SerpAPI but using serper.dev endpoint
"""
import requests
import json
import time
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Serper.dev API configuration
SERPER_API_KEY = os.getenv('SERPER_API_KEY', '9ed1f7bc62e135d713cfda4ad402c35ee9967713')
SERPER_URL = "https://google.serper.dev/search"

# All 36 Greater Boston cities
CITIES = [
    # Core Boston Metro
    'Boston', 'Cambridge', 'Somerville', 'Brookline',
    
    # Inner Ring Cities
    'Quincy', 'Newton', 'Waltham', 'Watertown', 'Medford', 'Malden',
    'Everett', 'Chelsea', 'Revere', 'Winthrop', 'Arlington', 'Belmont',
    
    # North Shore
    'Lynn', 'Salem', 'Peabody', 'Beverly', 'Danvers', 'Marblehead',
    'Swampscott', 'Nahant',
    
    # South Shore
    'Braintree', 'Weymouth', 'Milton', 'Dedham', 'Needham', 'Wellesley',
    'Hingham',
    
    # West/Northwest
    'Lexington', 'Woburn', 'Burlington', 'Winchester', 'Stoneham'
]

def search_serper(query, num_results=5):
    """
    Search using serper.dev API
    
    Args:
        query: Search query string
        num_results: Number of results to return
        
    Returns:
        dict: Search results
    """
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }
    
    payload = {
        'q': query,
        'num': num_results,
        'gl': 'us',
        'hl': 'en'
    }
    
    try:
        response = requests.post(SERPER_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def test_all_cities():
    """Test serper.dev API for all 36 cities"""
    
    print("=" * 80)
    print("SERPER.DEV API TEST - ALL GREATER BOSTON CITIES")
    print("=" * 80)
    print(f"Total cities to test: {len(CITIES)}")
    print(f"API Key: {SERPER_API_KEY[:20]}...")
    print("=" * 80)
    print()
    
    results_summary = []
    
    for i, city in enumerate(CITIES, 1):
        query = f'"{city}" solid waste department mattress disposal 2024 OR 2025 OR 2026'
        
        print(f"[{i}/{len(CITIES)}] Testing: {city}, MA")
        print(f"Query: {query}")
        
        results = search_serper(query, num_results=5)
        
        if results:
            organic_count = len(results.get('organic', []))
            print(f"✅ Success: {organic_count} results found")
            
            # Show top 3 results
            for j, result in enumerate(results.get('organic', [])[:3], 1):
                print(f"  {j}. {result.get('title', 'N/A')}")
                print(f"     {result.get('link', 'N/A')}")
            
            results_summary.append({
                'city': city,
                'query': query,
                'results_count': organic_count,
                'success': True
            })
        else:
            print(f"❌ Failed: No results")
            results_summary.append({
                'city': city,
                'query': query,
                'results_count': 0,
                'success': False
            })
        
        print()
        
        # Rate limiting: wait 1 second between requests
        if i < len(CITIES):
            time.sleep(1)
    
    # Print summary
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    
    successful = sum(1 for r in results_summary if r['success'])
    failed = len(results_summary) - successful
    
    print(f"Total cities tested: {len(CITIES)}")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Success rate: {(successful/len(CITIES)*100):.1f}%")
    print()
    
    # Show cities with no results
    if failed > 0:
        print("Cities with no results:")
        for r in results_summary:
            if not r['success']:
                print(f"  - {r['city']}")
    
    # Save results to JSON
    output_file = 'serper_test_results.json'
    with open(output_file, 'w') as f:
        json.dump(results_summary, f, indent=2)
    
    print()
    print(f"Full results saved to: {output_file}")
    print("=" * 80)

if __name__ == '__main__':
    test_all_cities()
