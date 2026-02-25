#!/usr/bin/env python3
"""Combine all individual city JSON files into one."""
import json
from pathlib import Path

data_dir = Path(__file__).parent.parent / 'data'

# Find all autonomous_*.json files except the combined one
city_files = sorted([
    f for f in data_dir.glob('autonomous_*.json')
    if f.name != 'autonomous_cities.json'
])

print(f"Found {len(city_files)} city files:")
for f in city_files:
    print(f"  - {f.name}")

# Load all cities
all_cities = []
for city_file in city_files:
    try:
        with open(city_file, 'r') as f:
            city_data = json.load(f)
            all_cities.append(city_data)
            print(f"✓ Loaded: {city_file.name}")
    except Exception as e:
        print(f"✗ Error loading {city_file.name}: {e}")

# Save combined file
output_file = data_dir / 'autonomous_cities.json'
with open(output_file, 'w') as f:
    json.dump(all_cities, f, indent=2)

print(f"\n✅ Saved {len(all_cities)} cities to: {output_file}")
print(f"   File size: {output_file.stat().st_size / 1024:.1f} KB")
