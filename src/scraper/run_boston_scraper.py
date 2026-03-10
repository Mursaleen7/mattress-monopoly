#!/usr/bin/env python3
"""
CLI entry point for scraping Greater Boston Area.
Scrapes all cities, municipalities, and zip codes in the Boston metro area.
"""
import asyncio
import argparse
import json
import os
import sys
from pathlib import Path
from datetime import datetime

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

# Import with proper module handling
try:
    from scraper.main import AutonomousScraper
    from scraper.boston_config import get_all_boston_locations, get_location_count
except ImportError:
    from main import AutonomousScraper
    from boston_config import get_all_boston_locations, get_location_count


async def scrape_city(scraper, city_data, output_dir, dry_run=False):
    """Scrape a single city."""
    city_name = city_data['name']
    state_abbr = city_data['state_abbr']
    state_name = city_data['state_name']
    
    print(f"\n{'─'*80}")
    print(f"Processing CITY: {city_name}, {state_abbr}")
    print(f"{'─'*80}")
    
    try:
        result = await scraper.scrape_city_autonomous(
            city_name,
            state_abbr,
            state_name
        )
        
        # Check if city was skipped due to validation failure
        if result.get('skipped'):
            print(f"\n⚠️  SKIPPED: {city_name}, {state_abbr}")
            print(f"Reason: {result.get('message')}")
            return None
        
        if not dry_run:
            # Save individual city file
            city_slug = city_name.lower().replace(' ', '-')
            output_file = output_dir / f"city_{city_slug}-{state_abbr.lower()}.json"
            with open(output_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"\n✅ Saved: {output_file}")
            confidence = result.get('audit_metadata', {}).get('confidence_score', 'UNKNOWN')
            print(f"Confidence: {confidence}")
        else:
            print(f"\n✅ Processed: {city_name} (dry run - not saved)")
        
        return result
        
    except Exception as e:
        print(f"\n❌ ERROR processing {city_name}, {state_abbr}: {e}")
        import traceback
        traceback.print_exc()
        return None


async def scrape_municipality(scraper, muni_data, output_dir, dry_run=False):
    """
    Scrape a municipality (neighborhood/suburb).
    Uses the parent city's data as base and customizes for the municipality.
    """
    muni_name = muni_data['name']
    parent_city = muni_data['parent_city']
    state_abbr = muni_data['state_abbr']
    state_name = muni_data['state_name']
    
    print(f"\n{'─'*80}")
    print(f"Processing MUNICIPALITY: {muni_name} (part of {parent_city}), {state_abbr}")
    print(f"{'─'*80}")
    
    try:
        # For municipalities, we scrape the parent city but tag it as municipality
        result = await scraper.scrape_city_autonomous(
            parent_city,  # Use parent city for scraping
            state_abbr,
            state_name
        )
        
        if result.get('skipped'):
            print(f"\n⚠️  SKIPPED: {muni_name}, {state_abbr}")
            print(f"Reason: {result.get('message')}")
            return None
        
        # Customize result for municipality
        result['municipality_name'] = muni_name
        result['parent_city'] = parent_city
        result['city_slug'] = f"{muni_name.lower().replace(' ', '-')}-{state_abbr.lower()}"
        result['is_municipality'] = True
        
        if not dry_run:
            # Save individual municipality file
            muni_slug = muni_name.lower().replace(' ', '-')
            output_file = output_dir / f"municipality_{muni_slug}-{state_abbr.lower()}.json"
            with open(output_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"\n✅ Saved: {output_file}")
        else:
            print(f"\n✅ Processed: {muni_name} (dry run - not saved)")
        
        return result
        
    except Exception as e:
        print(f"\n❌ ERROR processing {muni_name}, {state_abbr}: {e}")
        import traceback
        traceback.print_exc()
        return None


async def scrape_zipcode(scraper, zip_data, output_dir, dry_run=False):
    """
    Scrape a zip code area.
    Uses the city's data as base and customizes for the zip code.
    """
    zip_code = zip_data['zip']
    neighborhood = zip_data['neighborhood']
    city = zip_data['city']
    state_abbr = zip_data['state_abbr']
    
    print(f"\n{'─'*80}")
    print(f"Processing ZIP CODE: {zip_code} ({neighborhood}, {city}), {state_abbr}")
    print(f"{'─'*80}")
    
    try:
        # For zip codes, we scrape the city but tag it as zip code
        result = await scraper.scrape_city_autonomous(
            city,
            state_abbr,
            'Massachusetts'
        )
        
        if result.get('skipped'):
            print(f"\n⚠️  SKIPPED: {zip_code}, {state_abbr}")
            print(f"Reason: {result.get('message')}")
            return None
        
        # Customize result for zip code
        result['zip_code'] = zip_code
        result['neighborhood'] = neighborhood
        result['parent_city'] = city
        result['city_slug'] = f"{zip_code}-{neighborhood.lower().replace(' ', '-')}"
        result['is_zipcode'] = True
        
        # Filter zip codes to only include this specific one
        if 'geo' in result and 'zip_codes' in result['geo']:
            if zip_code in result['geo']['zip_codes']:
                result['geo']['zip_codes'] = [zip_code]
            else:
                result['geo']['zip_codes'] = [zip_code]
        
        if not dry_run:
            # Save individual zip code file
            output_file = output_dir / f"zipcode_{zip_code}.json"
            with open(output_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"\n✅ Saved: {output_file}")
        else:
            print(f"\n✅ Processed: {zip_code} (dry run - not saved)")
        
        return result
        
    except Exception as e:
        print(f"\n❌ ERROR processing {zip_code}: {e}")
        import traceback
        traceback.print_exc()
        return None


async def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description='Scrape Greater Boston Area cities, municipalities, and zip codes',
        epilog="""
Examples:
  # Scrape all locations (cities, municipalities, zip codes)
  python3 run_boston_scraper.py --all
  
  # Scrape only cities
  python3 run_boston_scraper.py --cities
  
  # Scrape only municipalities
  python3 run_boston_scraper.py --municipalities
  
  # Scrape only zip codes
  python3 run_boston_scraper.py --zip-codes
  
  # Dry run (no output saved)
  python3 run_boston_scraper.py --all --dry-run
  
  # Custom output directory
  python3 run_boston_scraper.py --all --output ../boston_data
        """,
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--all',
        action='store_true',
        help='Scrape all locations (cities, municipalities, and zip codes)'
    )
    parser.add_argument(
        '--cities',
        action='store_true',
        help='Scrape only cities'
    )
    parser.add_argument(
        '--municipalities',
        action='store_true',
        help='Scrape only municipalities'
    )
    parser.add_argument(
        '--zip-codes',
        action='store_true',
        help='Scrape only zip codes'
    )
    parser.add_argument(
        '--output',
        default='../data/boston',
        help='Output directory (default: ../data/boston)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Run without saving output'
    )
    parser.add_argument(
        '--delay',
        type=int,
        default=5,
        help='Delay in seconds between requests (default: 5)'
    )
    
    args = parser.parse_args()
    
    # If no specific type selected, default to --all
    if not (args.all or args.cities or args.municipalities or args.zip_codes):
        args.all = True
    
    # Get all Boston locations
    locations = get_all_boston_locations()
    counts = get_location_count()
    
    # Determine what to scrape
    to_scrape = []
    if args.all or args.cities:
        to_scrape.extend([('city', c) for c in locations['cities']])
    if args.all or args.municipalities:
        to_scrape.extend([('municipality', m) for m in locations['municipalities']])
    if args.all or args.zip_codes:
        to_scrape.extend([('zipcode', z) for z in locations['zip_codes']])
    
    print(f"\n{'='*80}")
    print(f"🚀 GREATER BOSTON AREA SCRAPER")
    print(f"{'='*80}")
    print(f"Total locations to process: {len(to_scrape)}")
    if args.all or args.cities:
        print(f"  - Cities: {counts['cities']}")
    if args.all or args.municipalities:
        print(f"  - Municipalities: {counts['municipalities']}")
    if args.all or args.zip_codes:
        print(f"  - Zip Codes: {counts['zip_codes']}")
    print(f"Output: {args.output}")
    print(f"Dry run: {args.dry_run}")
    print(f"{'='*80}\n")
    
    # Create output directory
    output_dir = Path(args.output)
    if not args.dry_run:
        output_dir.mkdir(parents=True, exist_ok=True)
    
    # Initialize scraper
    scraper = AutonomousScraper()
    
    # Track results
    results = {
        'cities': [],
        'municipalities': [],
        'zip_codes': [],
    }
    
    # Process all locations
    for idx, (location_type, location_data) in enumerate(to_scrape, 1):
        print(f"\n[{idx}/{len(to_scrape)}] Processing {location_type}...")
        
        result = None
        if location_type == 'city':
            result = await scrape_city(scraper, location_data, output_dir, args.dry_run)
            if result:
                results['cities'].append(result)
        elif location_type == 'municipality':
            result = await scrape_municipality(scraper, location_data, output_dir, args.dry_run)
            if result:
                results['municipalities'].append(result)
        elif location_type == 'zipcode':
            result = await scrape_zipcode(scraper, location_data, output_dir, args.dry_run)
            if result:
                results['zip_codes'].append(result)
        
        # Rate limiting between requests
        if idx < len(to_scrape):
            print(f"\n⏳ Waiting {args.delay}s before next location...")
            await asyncio.sleep(args.delay)
    
    # Save combined results
    if not args.dry_run and (results['cities'] or results['municipalities'] or results['zip_codes']):
        combined_file = output_dir / 'boston_combined.json'
        combined_data = {
            'metadata': {
                'scraped_at': datetime.now().isoformat(),
                'region': 'Greater Boston Area',
                'state': 'Massachusetts',
                'counts': {
                    'cities': len(results['cities']),
                    'municipalities': len(results['municipalities']),
                    'zip_codes': len(results['zip_codes']),
                    'total': len(results['cities']) + len(results['municipalities']) + len(results['zip_codes']),
                },
            },
            'cities': results['cities'],
            'municipalities': results['municipalities'],
            'zip_codes': results['zip_codes'],
        }
        
        with open(combined_file, 'w') as f:
            json.dump(combined_data, f, indent=2)
        print(f"\n✅ Saved combined results: {combined_file}")
    
    # Print summary
    print(f"\n{'='*80}")
    print(f"✅ SCRAPING COMPLETE")
    print(f"{'='*80}")
    print(f"Successfully processed:")
    print(f"  - Cities: {len(results['cities'])}/{counts['cities'] if (args.all or args.cities) else 0}")
    print(f"  - Municipalities: {len(results['municipalities'])}/{counts['municipalities'] if (args.all or args.municipalities) else 0}")
    print(f"  - Zip Codes: {len(results['zip_codes'])}/{counts['zip_codes'] if (args.all or args.zip_codes) else 0}")
    print(f"{'='*80}\n")


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Fatal error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
