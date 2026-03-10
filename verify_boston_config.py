#!/usr/bin/env python3
"""
Verification script for Boston scraper configuration.
Run this to verify all locations are properly configured.
"""
import sys
sys.path.insert(0, 'src/scraper')

from boston_config import get_location_count, get_all_boston_locations

def main():
    print("=" * 70)
    print("BOSTON SCRAPER CONFIGURATION VERIFICATION")
    print("=" * 70)
    print()
    
    # Get counts
    counts = get_location_count()
    
    print("📊 LOCATION COUNTS:")
    print(f"  ├─ Cities:          {counts['cities']}")
    print(f"  ├─ Municipalities:  {counts['municipalities']}")
    print(f"  ├─ Zip Codes:       {counts['zip_codes']}")
    print(f"  └─ TOTAL:           {counts['total']}")
    print()
    
    # Get all locations
    locations = get_all_boston_locations()
    
    # Verify cities
    print("🏙️  CITIES (Sample):")
    for city in locations['cities'][:5]:
        print(f"  ├─ {city['name']}, {city['state_abbr']}")
    print(f"  └─ ... and {len(locations['cities']) - 5} more")
    print()
    
    # Verify municipalities
    print("🏘️  MUNICIPALITIES (Sample):")
    for muni in locations['municipalities'][:5]:
        print(f"  ├─ {muni['name']} (part of {muni['parent_city']})")
    print(f"  └─ ... and {len(locations['municipalities']) - 5} more")
    print()
    
    # Verify zip codes
    print("📮 ZIP CODES (Sample):")
    for zip_data in locations['zip_codes'][:5]:
        print(f"  ├─ {zip_data['zip']} - {zip_data['neighborhood']}, {zip_data['city']}")
    print(f"  └─ ... and {len(locations['zip_codes']) - 5} more")
    print()
    
    # Status check
    print("=" * 70)
    if counts['total'] >= 300:
        print("✅ STATUS: READY FOR MARKET SATURATION")
        print(f"   {counts['total']} locations configured for Greater Boston")
    else:
        print("⚠️  STATUS: CONFIGURATION INCOMPLETE")
        print(f"   Only {counts['total']} locations configured")
    print("=" * 70)
    print()
    
    # Next steps
    print("🚀 NEXT STEPS:")
    print("  1. Run scraper: python3 src/scraper/run_boston_scraper.py --all")
    print("  2. Or run in batches:")
    print("     - Cities: python3 src/scraper/run_boston_scraper.py --cities")
    print("     - Municipalities: python3 src/scraper/run_boston_scraper.py --municipalities")
    print("     - Zip Codes: python3 src/scraper/run_boston_scraper.py --zip-codes")
    print()
    print("📚 DOCUMENTATION:")
    print("  - Quick Start: BOSTON_SCRAPER_QUICKSTART.md")
    print("  - Full Docs: BOSTON_SCRAPER_README.md")
    print("  - Market Analysis: BOSTON_SATURATION_SUMMARY.md")
    print("  - Final Summary: FINAL_SUMMARY.md")
    print()

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
