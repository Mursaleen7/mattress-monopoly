#!/usr/bin/env python3
"""Combine only the 10 newly scraped cities."""
import json
from pathlib import Path

data_dir = Path(__file__).parent.parent / 'data'

# Only the 10 cities we just ran
new_cities = [
    'phoenix',
    'philadelphia', 
    'san-diego',
    'san-jose',
    'seattle',
    'denver',
    'boston',
    'miami',
    'atlanta',
    'detroit'
]

print(f"Combining 10 newly scraped cities:\n")

all_cities = []
for city_slug in new_cities:
    city_file = data_dir / f'autonomous_{city_slug}.json'
    if city_file.exists():
        with open(city_file, 'r') as f:
            city_data = json.load(f)
            all_cities.append(city_data)
            city_name = city_data.get('city_name', city_slug)
            state = city_data.get('state_abbr', '?')
            confidence = city_data.get('audit_metadata', {}).get('confidence_score', '?')
            print(f"  ✓ {city_name}, {state} ({confidence})")
    else:
        print(f"  ✗ {city_slug} - file not found")

# Save combined file
output_file = data_dir / 'autonomous_cities.json'
with open(output_file, 'w') as f:
    json.dump(all_cities, f, indent=2)

print(f"\n✅ Saved {len(all_cities)} cities to: {output_file}")
print(f"   File size: {output_file.stat().st_size / 1024:.1f} KB")
