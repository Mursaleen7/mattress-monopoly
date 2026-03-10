#!/usr/bin/env python3
"""
Comprehensive Serper.dev API Test
Tests all 9 query types for all 36 Greater Boston cities
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
    'Boston', 'Cambridge', 'Somerville', 'Brookline',
    'Quincy', 'Newton', 'Waltham', 'Watertown', 'Medford', 'Malden',
    'Everett', 'Chelsea', 'Revere', 'Winthrop', 'Arlington', 'Belmont',
    'Lynn', 'Salem', 'Peabody', 'Beverly', 'Danvers', 'Marblehead',
    'Swampscott', 'Nahant', 'Braintree', 'Weymouth', 'Milton', 'Dedham',
    'Needham', 'Wellesley', 'Hingham', 'Lexington', 'Woburn', 'Burlington',
    'Winchester', 'Stoneham'
]

# Query templates (9 queries per city) - EXACT FORMAT FROM SCRAPER
QUERY_TEMPLATES = {
    # Phase 2A: Waste Management Queries (5 queries)
    'phase2a_query1': 'site:.gov "{LOCATION}" bulk trash mattress disposal',
    'phase2a_query2': 'site:.gov "{LOCATION}" sanitation large item pickup',
    'phase2a_query3': '"{LOCATION}" "Massachusetts" official waste management mattress schedule',
    'phase2a_query4': '"{LOCATION}" "MA" bulk item curbside pickup schedule site:.gov OR site:.us',
    'phase2a_query5': '"{LOCATION}" solid waste department mattress disposal 2024 OR 2025 OR 2026',
    
    # Phase 2B: Ordinance/Fine Queries (3 queries)
    'phase2b_query1': 'site:.gov "{LOCATION}" illegal dumping fine ordinance code',
    'phase2b_query2': '"{LOCATION}" "MA" illegal dumping penalty "$" misdemeanor',
    'phase2b_query3': '"{LOCATION}" city code illegal dumping fine amount',
    
    # Phase 5: Competitor Pricing Query (1 query)
    'phase5_query1': '1-800-got-junk mattress removal {LOCATION} MA price'
}

def search_serper(query, num_results=5):
    """Search using serper.dev API"""
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
        return {'error': str(e)}

def test_city_all_queries(city, verbose=False):
    """Test all 9 queries for a single city"""
    city_results = {
        'city': city,
        'queries': {}
    }
    
    for query_type, template in QUERY_TEMPLATES.items():
        # Replace {LOCATION} with city name
        query = template.replace('{LOCATION}', city)
        
        if verbose:
            print(f"  Testing: {query_type}")
            print(f"  Query: {query}")
        
        results = search_serper(query, num_results=5)
        
        if 'error' in results:
            city_results['queries'][query_type] = {
                'query': query,
                'success': False,
                'error': results['error'],
                'results_count': 0
            }
            if verbose:
                print(f"  ❌ Error: {results['error']}")
        else:
            organic_count = len(results.get('organic', []))
            top_result = results.get('organic', [{}])[0] if organic_count > 0 else {}
            
            city_results['queries'][query_type] = {
                'query': query,
                'success': True,
                'results_count': organic_count,
                'top_result': {
                    'title': top_result.get('title', 'N/A'),
                    'link': top_result.get('link', 'N/A'),
                    'snippet': top_result.get('snippet', 'N/A')[:100] + '...' if top_result.get('snippet') else 'N/A'
                }
            }
            if verbose:
                print(f"  ✅ Success: {organic_count} results")
                if organic_count > 0:
                    print(f"     Top: {top_result.get('title', 'N/A')}")
        
        if verbose:
            print()
        
        # Rate limiting
        time.sleep(0.5)
    
    return city_results

def test_all_cities_full(sample_size=None, verbose=True):
    """Test all cities with all queries"""
    
    cities_to_test = CITIES[:sample_size] if sample_size else CITIES
    
    print("=" * 80)
    print("SERPER.DEV COMPREHENSIVE API TEST")
    print("=" * 80)
    print(f"Cities to test: {len(cities_to_test)}")
    print(f"Queries per city: {len(QUERY_TEMPLATES)}")
    print(f"Total queries: {len(cities_to_test) * len(QUERY_TEMPLATES)}")
    print(f"API Key: {SERPER_API_KEY[:20]}...")
    print("=" * 80)
    print()
    
    all_results = []
    
    for i, city in enumerate(cities_to_test, 1):
        print(f"[{i}/{len(cities_to_test)}] Testing: {city}, MA")
        print("-" * 80)
        
        city_results = test_city_all_queries(city, verbose=verbose)
        all_results.append(city_results)
        
        # Summary for this city
        successful_queries = sum(1 for q in city_results['queries'].values() if q['success'])
        print(f"City Summary: {successful_queries}/{len(QUERY_TEMPLATES)} queries successful")
        print()
        
        # Longer pause between cities
        if i < len(cities_to_test):
            time.sleep(2)
    
    # Overall summary
    print("=" * 80)
    print("OVERALL SUMMARY")
    print("=" * 80)
    
    total_queries = len(cities_to_test) * len(QUERY_TEMPLATES)
    successful_queries = sum(
        sum(1 for q in city['queries'].values() if q['success'])
        for city in all_results
    )
    
    print(f"Total cities tested: {len(cities_to_test)}")
    print(f"Total queries executed: {total_queries}")
    print(f"Successful queries: {successful_queries}")
    print(f"Failed queries: {total_queries - successful_queries}")
    print(f"Success rate: {(successful_queries/total_queries*100):.1f}%")
    print()
    
    # Query type performance
    print("Performance by Query Type:")
    for query_type in QUERY_TEMPLATES.keys():
        successes = sum(1 for city in all_results if city['queries'][query_type]['success'])
        print(f"  {query_type}: {successes}/{len(cities_to_test)} ({successes/len(cities_to_test)*100:.1f}%)")
    
    # Save results
    output_file = 'serper_full_test_results.json'
    with open(output_file, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    print()
    print(f"Full results saved to: {output_file}")
    print("=" * 80)
    
    return all_results

if __name__ == '__main__':
    import sys
    
    # Optional: test only first N cities for quick testing
    # Usage: python serper_full_test.py 3  (tests first 3 cities)
    sample_size = int(sys.argv[1]) if len(sys.argv) > 1 else None
    
    if sample_size:
        print(f"SAMPLE MODE: Testing first {sample_size} cities only")
        print()
    
    test_all_cities_full(sample_size=sample_size, verbose=True)
