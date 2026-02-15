#!/usr/bin/env python3
"""
Data Verification Tool
Helps manually verify the accuracy of scraped city data
"""

import json
import sys

def load_cities_data():
    """Load the cities.json file"""
    try:
        with open('../data/cities.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ Error: cities.json not found in ../data/")
        sys.exit(1)

def verify_city(city_data):
    """Interactive verification for a single city"""
    print("\n" + "=" * 70)
    print(f"VERIFYING: {city_data['city_name']}, {city_data['state_abbr']}")
    print("=" * 70)
    
    print(f"\n📊 Data Confidence: {city_data.get('data_confidence', 'UNKNOWN')}")
    
    if city_data.get('sources_checked'):
        print(f"\n📚 Sources Used:")
        for source in city_data['sources_checked']:
            print(f"   - {source}")
    
    print(f"\n👥 Population: {city_data['population']:,}" if city_data['population'] > 0 else "\n👥 Population: ⚠️  NOT FOUND (0)")
    
    print(f"\n📋 Mattress Rules:")
    print(f"   {city_data['mattress_rules']}")
    
    print(f"\n📍 Drop-off Locations: {len(city_data['dropoff_locations'])}")
    for i, loc in enumerate(city_data['dropoff_locations'], 1):
        print(f"\n   Location {i}:")
        print(f"   Name: {loc['name']}")
        print(f"   Address: {loc['address']}")
        print(f"   Phone: {loc['phone']}")
        print(f"   Hours: {loc['hours']}")
        print(f"   Accepts Mattresses: {'✓ Yes' if loc['accepts_mattresses'] else '✗ No'}")
    
    print(f"\n📞 Pickup Service: {'✓ Available' if city_data['pickup_service_available'] else '✗ Not Available'}")
    print(f"   Pickup Phone: {city_data['pickup_phone']}")
    
    print(f"\n💰 Illegal Dumping Fine: {city_data['illegal_dumping_fine']}")
    
    print("\n" + "-" * 70)
    
    # Ask for verification
    response = input("\nIs this data ACCURATE? (y/n/skip): ").lower().strip()
    
    if response == 'y':
        return 'verified'
    elif response == 'n':
        notes = input("What needs to be corrected? ")
        return ('needs_correction', notes)
    else:
        return 'skipped'

def main():
    """Main verification function"""
    print("=" * 70)
    print("CITY DATA VERIFICATION TOOL")
    print("=" * 70)
    
    cities = load_cities_data()
    
    print(f"\nLoaded {len(cities)} cities")
    print("\nVerification Options:")
    print("1. Verify all cities")
    print("2. Verify only LOW/MEDIUM confidence cities")
    print("3. Verify specific city")
    print("4. Show summary only")
    
    choice = input("\nSelect option (1-4): ").strip()
    
    if choice == '4':
        # Show summary
        high = sum(1 for c in cities if c.get('data_confidence') == 'HIGH')
        medium = sum(1 for c in cities if c.get('data_confidence') == 'MEDIUM')
        low = sum(1 for c in cities if c.get('data_confidence') == 'LOW')
        error = sum(1 for c in cities if c.get('data_confidence') == 'ERROR')
        
        print(f"\n📊 SUMMARY:")
        print(f"   Total Cities: {len(cities)}")
        print(f"   High Confidence: {high}")
        print(f"   Medium Confidence: {medium}")
        print(f"   Low Confidence: {low}")
        print(f"   Errors: {error}")
        
        missing_pop = [c['city_name'] for c in cities if c.get('population', 0) == 0]
        if missing_pop:
            print(f"\n⚠️  Cities Missing Population Data ({len(missing_pop)}):")
            for city in missing_pop:
                print(f"   - {city}")
        
        no_dropoffs = [c['city_name'] for c in cities if not c.get('dropoff_locations')]
        if no_dropoffs:
            print(f"\n⚠️  Cities Without Drop-off Locations ({len(no_dropoffs)}):")
            for city in no_dropoffs:
                print(f"   - {city}")
        
        return
    
    elif choice == '3':
        # Verify specific city
        city_name = input("Enter city name: ").strip()
        city_data = next((c for c in cities if c['city_name'].lower() == city_name.lower()), None)
        if city_data:
            verify_city(city_data)
        else:
            print(f"❌ City '{city_name}' not found")
        return
    
    elif choice == '2':
        # Filter to low/medium confidence
        cities_to_verify = [c for c in cities if c.get('data_confidence') in ['LOW', 'MEDIUM', 'ERROR']]
        print(f"\nFound {len(cities_to_verify)} cities needing verification")
    else:
        cities_to_verify = cities
    
    # Verify cities
    results = {
        'verified': [],
        'needs_correction': [],
        'skipped': []
    }
    
    for city in cities_to_verify:
        result = verify_city(city)
        if isinstance(result, tuple):
            results['needs_correction'].append((city['city_name'], result[1]))
        else:
            results[result].append(city['city_name'])
    
    # Show results
    print("\n" + "=" * 70)
    print("VERIFICATION RESULTS")
    print("=" * 70)
    print(f"\n✓ Verified: {len(results['verified'])}")
    print(f"⚠️  Needs Correction: {len(results['needs_correction'])}")
    print(f"⊘ Skipped: {len(results['skipped'])}")
    
    if results['needs_correction']:
        print("\n📝 CORRECTIONS NEEDED:")
        for city, notes in results['needs_correction']:
            print(f"\n   {city}:")
            print(f"   → {notes}")

if __name__ == "__main__":
    main()
