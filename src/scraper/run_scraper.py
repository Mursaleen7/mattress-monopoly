#!/usr/bin/env python3
"""
CLI entry point for the autonomous scraper.
Refactored with proper argument parsing and progress reporting.
"""
import asyncio
import argparse
import json
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from scraper import AutonomousScraper


# US State mapping for major cities
CITY_STATE_MAP = {
    # Major cities - unambiguous
    'phoenix': ('AZ', 'Arizona'),
    'philadelphia': ('PA', 'Pennsylvania'),
    'new york': ('NY', 'New York'),
    'los angeles': ('CA', 'California'),
    'chicago': ('IL', 'Illinois'),
    'houston': ('TX', 'Texas'),
    'dallas': ('TX', 'Texas'),
    'austin': ('TX', 'Texas'),
    'san antonio': ('TX', 'Texas'),
    'san diego': ('CA', 'California'),
    'san jose': ('CA', 'California'),
    'san francisco': ('CA', 'California'),
    'seattle': ('WA', 'Washington'),
    'denver': ('CO', 'Colorado'),
    'boston': ('MA', 'Massachusetts'),
    'miami': ('FL', 'Florida'),
    'atlanta': ('GA', 'Georgia'),
    'detroit': ('MI', 'Michigan'),
    'portland': ('OR', 'Oregon'),  # Default to Oregon (larger)
    'las vegas': ('NV', 'Nevada'),
    'baltimore': ('MD', 'Maryland'),
    'milwaukee': ('WI', 'Wisconsin'),
    'nashville': ('TN', 'Tennessee'),
    'memphis': ('TN', 'Tennessee'),
    'louisville': ('KY', 'Kentucky'),
    'oklahoma city': ('OK', 'Oklahoma'),
    'tucson': ('AZ', 'Arizona'),
    'albuquerque': ('NM', 'New Mexico'),
    'fresno': ('CA', 'California'),
    'sacramento': ('CA', 'California'),
    'kansas city': ('MO', 'Missouri'),  # Default to Missouri (larger)
    'mesa': ('AZ', 'Arizona'),
    'virginia beach': ('VA', 'Virginia'),
    'omaha': ('NE', 'Nebraska'),
    'colorado springs': ('CO', 'Colorado'),
    'raleigh': ('NC', 'North Carolina'),
    'long beach': ('CA', 'California'),
    'minneapolis': ('MN', 'Minnesota'),
    'cleveland': ('OH', 'Ohio'),
    'tampa': ('FL', 'Florida'),
    'arlington': ('TX', 'Texas'),  # Default to Texas (larger)
    'new orleans': ('LA', 'Louisiana'),
    'wichita': ('KS', 'Kansas'),
    'bakersfield': ('CA', 'California'),
    'aurora': ('CO', 'Colorado'),  # Default to Colorado (larger)
    'anaheim': ('CA', 'California'),
    'honolulu': ('HI', 'Hawaii'),
    'santa ana': ('CA', 'California'),
    'riverside': ('CA', 'California'),
    'corpus christi': ('TX', 'Texas'),
    'lexington': ('KY', 'Kentucky'),
    'stockton': ('CA', 'California'),
    'henderson': ('NV', 'Nevada'),
    'saint paul': ('MN', 'Minnesota'),
    'st. paul': ('MN', 'Minnesota'),
    'cincinnati': ('OH', 'Ohio'),
    'pittsburgh': ('PA', 'Pennsylvania'),
    'greensboro': ('NC', 'North Carolina'),
    'anchorage': ('AK', 'Alaska'),
    'plano': ('TX', 'Texas'),
    'lincoln': ('NE', 'Nebraska'),
    'orlando': ('FL', 'Florida'),
    'irvine': ('CA', 'California'),
    'newark': ('NJ', 'New Jersey'),
    'toledo': ('OH', 'Ohio'),
    'durham': ('NC', 'North Carolina'),
    'chula vista': ('CA', 'California'),
    'fort worth': ('TX', 'Texas'),
    'jersey city': ('NJ', 'New Jersey'),
    'chandler': ('AZ', 'Arizona'),
    'madison': ('WI', 'Wisconsin'),
    'lubbock': ('TX', 'Texas'),
    'scottsdale': ('AZ', 'Arizona'),
    'reno': ('NV', 'Nevada'),
    'buffalo': ('NY', 'New York'),
    'gilbert': ('AZ', 'Arizona'),
    'glendale': ('AZ', 'Arizona'),  # Default to Arizona (larger)
    'north las vegas': ('NV', 'Nevada'),
    'winston-salem': ('NC', 'North Carolina'),
    'chesapeake': ('VA', 'Virginia'),
    'norfolk': ('VA', 'Virginia'),
    'fremont': ('CA', 'California'),
    'garland': ('TX', 'Texas'),
    'irving': ('TX', 'Texas'),
    'hialeah': ('FL', 'Florida'),
    'richmond': ('VA', 'Virginia'),
    'boise': ('ID', 'Idaho'),
    'spokane': ('WA', 'Washington'),
    'baton rouge': ('LA', 'Louisiana'),
}


def resolve_city_state(city_name: str, state_override: str = None, 
                        state_name_override: str = None):
    """
    Resolve city name to (city, state_abbr, state_name) tuple.
    
    Args:
        city_name: City name (e.g., "Phoenix" or "Phoenix, AZ")
        state_override: Optional state abbreviation override
        state_name_override: Optional state name override
        
    Returns:
        (city, state_abbr, state_name) tuple
        
    Raises:
        ValueError if city cannot be resolved
    """
    # US State abbreviations to full names
    US_STATES = {
        'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
        'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
        'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
        'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
        'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
        'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
        'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
        'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
        'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
        'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
        'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
        'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
        'WI': 'Wisconsin', 'WY': 'Wyoming'
    }
    
    # Check if city includes state (e.g., "Phoenix, AZ")
    if ',' in city_name:
        parts = [p.strip() for p in city_name.split(',')]
        if len(parts) == 2:
            city, state = parts
            # If state is 2 letters, assume it's abbreviation
            if len(state) == 2:
                state_abbr = state.upper()
                state_name = US_STATES.get(state_abbr, state)
                return (city, state_abbr, state_name)
            else:
                # State is full name, find abbreviation
                state_name = state
                for abbr, name in US_STATES.items():
                    if name.lower() == state_name.lower():
                        return (city, abbr, name)
                # If not found, can't proceed
                raise ValueError(
                    f"Unknown state: {state_name}. Please use state abbreviation "
                    f"(e.g., 'Phoenix, AZ') or use --state flag."
                )
    
    # Use override if provided
    if state_override and state_name_override:
        return (city_name, state_override, state_name_override)
    
    # Look up in city-state map
    city_lower = city_name.lower()
    if city_lower in CITY_STATE_MAP:
        state_abbr, state_name = CITY_STATE_MAP[city_lower]
        return (city_name, state_abbr, state_name)
    
    # If we have a state override but no state name, look it up
    if state_override:
        state_abbr = state_override.upper()
        state_name = US_STATES.get(state_abbr, state_name_override or state_override)
        return (city_name, state_abbr, state_name)
    
    # Cannot resolve
    raise ValueError(
        f"Cannot determine state for '{city_name}'. Please specify:\n"
        f"  1. Use format: 'Phoenix, AZ'\n"
        f"  2. Use --state flag: --state AZ --state-name Arizona\n"
        f"  3. Add city to CITY_STATE_MAP in run_scraper.py"
    )


async def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        description='Autonomous multi-agent scraper for city waste management data',
        epilog="""
Examples:
  # Auto-detect states for major cities
  python3 run_scraper.py --cities Phoenix Philadelphia Seattle
  
  # Specify city with state
  python3 run_scraper.py --cities "Phoenix, AZ" "Philadelphia, PA"
  
  # Override state for all cities
  python3 run_scraper.py --cities Austin Dallas --state TX --state-name Texas
  
  # Mix formats
  python3 run_scraper.py --cities "Phoenix, AZ" Houston "Seattle, WA"
        """,
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        '--cities',
        nargs='+',
        help='City names (e.g., Phoenix) or "City, ST" format (e.g., "Phoenix, AZ")'
    )
    parser.add_argument(
        '--state',
        help='State abbreviation override (applies to all cities without explicit state)'
    )
    parser.add_argument(
        '--state-name',
        help='Full state name override (applies to all cities without explicit state)'
    )
    parser.add_argument(
        '--output',
        default='../data',
        help='Output directory (default: ../data)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Run without saving output'
    )
    
    args = parser.parse_args()
    
    # Default cities if none specified
    if not args.cities:
        args.cities = ['Austin', 'Dallas', 'Houston']
    
    # Resolve all cities to (city, state_abbr, state_name) tuples
    resolved_cities = []
    for city_input in args.cities:
        try:
            city, state_abbr, state_name = resolve_city_state(
                city_input,
                args.state,
                args.state_name
            )
            resolved_cities.append((city, state_abbr, state_name))
            print(f"✓ Resolved: {city_input} → {city}, {state_abbr} ({state_name})")
        except ValueError as e:
            print(f"❌ Error: {e}")
            sys.exit(1)
    
    scraper = AutonomousScraper()
    results = []
    
    print(f"\n{'='*80}")
    print(f"🚀 STARTING AUTONOMOUS SCRAPER")
    print(f"Cities: {len(resolved_cities)} to process")
    print(f"Output: {args.output}")
    print(f"{'='*80}\n")
    
    for city_name, state_abbr, state_name in resolved_cities:
        try:
            print(f"\n{'─'*80}")
            print(f"Processing: {city_name}, {state_abbr}")
            print(f"{'─'*80}")
            
            result = await scraper.scrape_city_autonomous(
                city_name,
                state_abbr,
                state_name
            )
            
            # Check if city was skipped due to validation failure
            if result.get('skipped'):
                print(f"\n⚠️  SKIPPED: {city_name}, {state_abbr}")
                print(f"Reason: {result.get('message')}")
                continue
            
            results.append(result)
            
            if not args.dry_run:
                # Ensure output directory exists
                output_dir = Path(args.output)
                output_dir.mkdir(parents=True, exist_ok=True)
                
                # Save individual city file
                city_slug = city_name.lower().replace(' ', '-')
                output_file = output_dir / f"autonomous_{city_slug}.json"
                with open(output_file, 'w') as f:
                    json.dump(result, f, indent=2)
                
                print(f"\n✅ Saved: {output_file}")
                confidence = result.get('audit_metadata', {}).get('confidence_score', 'UNKNOWN')
                print(f"Confidence: {confidence}")
            else:
                print(f"\n✅ Processed: {city_name} (dry run - not saved)")
            
            # Rate limiting between cities
            if (city_name, state_abbr, state_name) != resolved_cities[-1]:
                wait_time = 5
                print(f"\n⏳ Waiting {wait_time}s before next city...")
                await asyncio.sleep(wait_time)
            
        except Exception as e:
            print(f"\n❌ ERROR processing {city_name}, {state_abbr}: {e}")
            import traceback
            traceback.print_exc()
            continue
    
    # Save combined results
    if not args.dry_run and results:
        output_dir = Path(args.output)
        combined_file = output_dir / 'autonomous_cities.json'
        
        # Load existing data if it exists
        existing_data = []
        if combined_file.exists():
            try:
                with open(combined_file, 'r') as f:
                    existing_data = json.load(f)
                print(f"\n📂 Loaded {len(existing_data)} existing cities")
            except Exception as e:
                print(f"\n⚠️  Could not load existing data: {e}")
        
        # Merge new results with existing (replace duplicates)
        city_slugs_new = {r['city_slug'] for r in results}
        merged_data = [r for r in existing_data if r['city_slug'] not in city_slugs_new]
        merged_data.extend(results)
        
        with open(combined_file, 'w') as f:
            json.dump(merged_data, f, indent=2)
        print(f"✅ Saved combined: {combined_file} ({len(merged_data)} total cities)")
    
    print(f"\n{'='*80}")
    print(f"✅ PIPELINE COMPLETE: {len(results)}/{len(resolved_cities)} cities processed")
    if len(results) < len(resolved_cities):
        skipped = len(resolved_cities) - len(results)
        print(f"⚠️  {skipped} cities skipped due to validation failures")
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
