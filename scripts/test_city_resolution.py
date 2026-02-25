#!/usr/bin/env python3
"""Test city-state resolution logic."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from run_scraper import resolve_city_state, CITY_STATE_MAP

def test_resolution():
    """Test various city resolution scenarios."""
    
    test_cases = [
        # (input, expected_city, expected_state, expected_state_name)
        ("Phoenix", "Phoenix", "AZ", "Arizona"),
        ("Philadelphia", "Philadelphia", "PA", "Pennsylvania"),
        ("Phoenix, AZ", "Phoenix", "AZ", "Arizona"),
        ("Portland, ME", "Portland", "ME", "Maine"),
        ("New York", "New York", "NY", "New York"),
        ("Los Angeles", "Los Angeles", "CA", "California"),
        ("Seattle", "Seattle", "WA", "Washington"),
    ]
    
    print("\n" + "="*80)
    print("CITY-STATE RESOLUTION TEST")
    print("="*80 + "\n")
    
    print(f"Built-in city map contains {len(CITY_STATE_MAP)} cities\n")
    
    passed = 0
    failed = 0
    
    for input_city, expected_city, expected_state, expected_state_name in test_cases:
        try:
            city, state, state_name = resolve_city_state(input_city)
            
            if (city == expected_city and 
                state == expected_state and 
                state_name == expected_state_name):
                print(f"✅ PASS: '{input_city}' → {city}, {state} ({state_name})")
                passed += 1
            else:
                print(f"❌ FAIL: '{input_city}'")
                print(f"   Expected: {expected_city}, {expected_state} ({expected_state_name})")
                print(f"   Got:      {city}, {state} ({state_name})")
                failed += 1
        except Exception as e:
            print(f"❌ ERROR: '{input_city}' - {e}")
            failed += 1
    
    # Test error cases
    print("\n" + "-"*80)
    print("ERROR HANDLING TESTS")
    print("-"*80 + "\n")
    
    error_cases = [
        "UnknownCity",
        "Smallville",
    ]
    
    for input_city in error_cases:
        try:
            city, state, state_name = resolve_city_state(input_city)
            print(f"❌ FAIL: '{input_city}' should have raised error but got: {city}, {state}")
            failed += 1
        except ValueError as e:
            print(f"✅ PASS: '{input_city}' correctly raised error")
            print(f"   Message: {str(e)[:100]}...")
            passed += 1
    
    # Summary
    print("\n" + "="*80)
    print(f"RESULTS: {passed} passed, {failed} failed")
    print("="*80 + "\n")
    
    return failed == 0


if __name__ == "__main__":
    success = test_resolution()
    sys.exit(0 if success else 1)
