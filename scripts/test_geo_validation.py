"""
Test script to demonstrate geographical validation preventing the New York, TX bug.
"""
import asyncio
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.scraper.main import AutonomousScraper


async def test_geo_validation():
    """
    Test the geographical validation system with problematic city names.
    """
    scraper = AutonomousScraper()
    
    test_cases = [
        # Valid cities
        ("Austin", "TX", "Texas"),
        ("Dallas", "TX", "Texas"),
        
        # The problematic case that caused the bug
        ("New York", "TX", "Texas"),  # Should be rejected - unincorporated area
        
        # Other edge cases
        ("Paris", "TX", "Texas"),  # Valid city in Texas
        ("Springfield", "IL", "Illinois"),  # Valid
    ]
    
    print("\n" + "="*80)
    print("GEOGRAPHICAL VALIDATION TEST")
    print("="*80 + "\n")
    
    results = []
    
    for city_name, state_abbr, state_name in test_cases:
        print(f"\n{'─'*80}")
        print(f"Testing: {city_name}, {state_abbr}")
        print(f"{'─'*80}")
        
        try:
            result = await scraper.scrape_city_autonomous(city_name, state_abbr, state_name)
            
            if result.get('skipped'):
                print(f"\n✅ CORRECTLY REJECTED: {result.get('message')}")
                results.append({
                    'city': f"{city_name}, {state_abbr}",
                    'status': 'REJECTED',
                    'reason': result.get('message')
                })
            elif result.get('audit_metadata', {}).get('verification_checklist', {}).get('geo_validation_passed'):
                print(f"\n✅ VALIDATION PASSED")
                print(f"   Confidence: {result.get('audit_metadata', {}).get('confidence_score')}")
                results.append({
                    'city': f"{city_name}, {state_abbr}",
                    'status': 'PASSED',
                    'confidence': result.get('audit_metadata', {}).get('confidence_score')
                })
            else:
                print(f"\n⚠️  VALIDATION FAILED")
                results.append({
                    'city': f"{city_name}, {state_abbr}",
                    'status': 'FAILED'
                })
                
        except Exception as e:
            print(f"\n❌ ERROR: {str(e)}")
            results.append({
                'city': f"{city_name}, {state_abbr}",
                'status': 'ERROR',
                'error': str(e)
            })
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80 + "\n")
    
    for result in results:
        status_emoji = {
            'PASSED': '✅',
            'REJECTED': '🚫',
            'FAILED': '❌',
            'ERROR': '💥'
        }.get(result['status'], '❓')
        
        print(f"{status_emoji} {result['city']}: {result['status']}")
        if 'reason' in result:
            print(f"   Reason: {result['reason']}")
        if 'confidence' in result:
            print(f"   Confidence: {result['confidence']}")
        if 'error' in result:
            print(f"   Error: {result['error']}")
        print()


if __name__ == "__main__":
    asyncio.run(test_geo_validation())
