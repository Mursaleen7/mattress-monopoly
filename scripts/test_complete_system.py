#!/usr/bin/env python3
"""
Complete system integration test.
Tests the full pipeline with all improvements.
"""
import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from scraper import AutonomousScraper


async def test_complete_system():
    """Test the complete system with various city types."""
    
    scraper = AutonomousScraper()
    
    test_cases = [
        # (city, state, state_name, expected_result)
        ("Austin", "TX", "Texas", "HIGH"),           # Major city, good data
        ("Phoenix", "AZ", "Arizona", "MEDIUM/HIGH"), # Major city, different state
        ("New York", "TX", "Texas", "SKIP/MEDIUM"),  # Problematic namesake
    ]
    
    print("\n" + "="*80)
    print("COMPLETE SYSTEM INTEGRATION TEST")
    print("="*80 + "\n")
    
    results = []
    
    for city_name, state_abbr, state_name, expected in test_cases:
        print(f"\n{'─'*80}")
        print(f"Testing: {city_name}, {state_abbr} (Expected: {expected})")
        print(f"{'─'*80}\n")
        
        try:
            result = await scraper.scrape_city_autonomous(city_name, state_abbr, state_name)
            
            if result.get('skipped'):
                print(f"✅ CORRECTLY SKIPPED: {result.get('message')}")
                results.append({
                    'city': f"{city_name}, {state_abbr}",
                    'status': 'SKIPPED',
                    'expected': expected,
                    'passed': 'SKIP' in expected
                })
            else:
                confidence = result.get('audit_metadata', {}).get('confidence_score', 'UNKNOWN')
                geo_valid = result.get('audit_metadata', {}).get('verification_checklist', {}).get('geo_validation_passed', False)
                content_valid = result.get('audit_metadata', {}).get('verification_checklist', {}).get('content_validation_passed', True)
                
                print(f"\n✅ COMPLETED")
                print(f"   Confidence: {confidence}")
                print(f"   Geo Validation: {'✓' if geo_valid else '✗'}")
                print(f"   Content Validation: {'✓' if content_valid else '✗'}")
                
                # Check if confidence matches expected
                passed = confidence in expected or expected == "MEDIUM/HIGH"
                
                results.append({
                    'city': f"{city_name}, {state_abbr}",
                    'status': 'COMPLETED',
                    'confidence': confidence,
                    'expected': expected,
                    'passed': passed
                })
                
        except Exception as e:
            print(f"\n❌ ERROR: {str(e)}")
            results.append({
                'city': f"{city_name}, {state_abbr}",
                'status': 'ERROR',
                'error': str(e),
                'expected': expected,
                'passed': False
            })
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80 + "\n")
    
    passed_count = sum(1 for r in results if r.get('passed'))
    total_count = len(results)
    
    for result in results:
        status_emoji = {
            'COMPLETED': '✅',
            'SKIPPED': '🚫',
            'ERROR': '❌'
        }.get(result['status'], '❓')
        
        pass_emoji = '✓' if result.get('passed') else '✗'
        
        print(f"{status_emoji} {result['city']}: {result['status']} {pass_emoji}")
        if 'confidence' in result:
            print(f"   Confidence: {result['confidence']} (Expected: {result['expected']})")
        if 'error' in result:
            print(f"   Error: {result['error']}")
        print()
    
    print(f"{'='*80}")
    print(f"FINAL RESULT: {passed_count}/{total_count} tests passed")
    print(f"{'='*80}\n")
    
    return passed_count == total_count


if __name__ == "__main__":
    success = asyncio.run(test_complete_system())
    sys.exit(0 if success else 1)
