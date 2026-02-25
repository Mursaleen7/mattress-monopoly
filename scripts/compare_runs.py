#!/usr/bin/env python3
"""Compare two scraper runs to measure consistency and improvements."""
import json
from pathlib import Path
from typing import Dict, List

def load_cities(file_path: Path) -> Dict[str, dict]:
    """Load cities from JSON file, keyed by city_slug."""
    with open(file_path, 'r') as f:
        cities = json.load(f)
    return {city['city_slug']: city for city in cities}

def compare_field(city1: dict, city2: dict, field_path: str) -> tuple:
    """
    Compare a nested field between two city objects.
    Returns (value1, value2, is_same)
    """
    def get_nested(obj, path):
        keys = path.split('.')
        for key in keys:
            if isinstance(obj, dict):
                obj = obj.get(key)
            else:
                return None
        return obj
    
    val1 = get_nested(city1, field_path)
    val2 = get_nested(city2, field_path)
    return val1, val2, val1 == val2

def main():
    data_dir = Path(__file__).parent.parent / 'data'
    
    run1_file = data_dir / 'autonomous_cities_run1.json'
    run2_file = Path(__file__).parent.parent / 'data_run2' / 'autonomous_cities.json'
    
    if not run1_file.exists():
        print(f"❌ Run 1 file not found: {run1_file}")
        return
    
    if not run2_file.exists():
        print(f"⏳ Run 2 not complete yet: {run2_file}")
        print("   Wait for the scraper to finish, then run this script again.")
        return
    
    print("\n" + "="*80)
    print("SCRAPER RUN COMPARISON")
    print("="*80 + "\n")
    
    cities1 = load_cities(run1_file)
    cities2 = load_cities(run2_file)
    
    print(f"Run 1: {len(cities1)} cities")
    print(f"Run 2: {len(cities2)} cities\n")
    
    # Fields to compare
    fields = [
        'audit_metadata.confidence_score',
        'contacts.official_phone',
        'contacts.website_url',
        'curbside_rules.is_available',
        'illegal_dumping.fine_amount',
        'drop_off_locations',
    ]
    
    # Compare each city
    for city_slug in sorted(cities2.keys()):
        if city_slug not in cities1:
            print(f"⚠️  {city_slug}: Only in Run 2")
            continue
        
        city1 = cities1[city_slug]
        city2 = cities2[city_slug]
        
        city_name = city2.get('city_name', city_slug)
        state = city2.get('state_abbr', '?')
        
        print(f"\n{'─'*80}")
        print(f"{city_name}, {state}")
        print(f"{'─'*80}")
        
        differences = []
        
        for field in fields:
            val1, val2, is_same = compare_field(city1, city2, field)
            
            if field == 'drop_off_locations':
                count1 = len(val1) if val1 else 0
                count2 = len(val2) if val2 else 0
                if count1 != count2:
                    differences.append(f"  Facilities: {count1} → {count2}")
            elif not is_same:
                field_name = field.split('.')[-1]
                differences.append(f"  {field_name}: {val1} → {val2}")
        
        if differences:
            print("Changes detected:")
            for diff in differences:
                print(diff)
        else:
            print("✓ Identical results")
    
    # Summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80 + "\n")
    
    # Confidence comparison
    conf1 = [cities1[slug]['audit_metadata']['confidence_score'] for slug in cities2.keys() if slug in cities1]
    conf2 = [cities2[slug]['audit_metadata']['confidence_score'] for slug in cities2.keys()]
    
    print("Confidence Distribution:")
    print(f"  Run 1: HIGH={conf1.count('HIGH')}, MEDIUM={conf1.count('MEDIUM')}, LOW={conf1.count('LOW')}")
    print(f"  Run 2: HIGH={conf2.count('HIGH')}, MEDIUM={conf2.count('MEDIUM')}, LOW={conf2.count('LOW')}")
    
    # Consistency check
    identical = sum(1 for slug in cities2.keys() if slug in cities1 and cities1[slug] == cities2[slug])
    print(f"\nIdentical cities: {identical}/{len(cities2)}")
    print(f"Changed cities: {len(cities2) - identical}/{len(cities2)}")
    
    if identical == len(cities2):
        print("\n✅ 100% consistency - scraper is deterministic!")
    elif identical >= len(cities2) * 0.8:
        print(f"\n✓ {identical/len(cities2)*100:.0f}% consistency - good stability")
    else:
        print(f"\n⚠️  {identical/len(cities2)*100:.0f}% consistency - high variance")

if __name__ == '__main__':
    main()
