#!/usr/bin/env python3
"""
BATCH AUTONOMOUS SCRAPER
Processes multiple cities with rate limiting and error recovery
"""

import asyncio
import json
import random
from autonomous_scraper import AutonomousScraper

# Top 50 US cities for mattress disposal
CITIES = [
    ('Austin', 'TX', 'Texas'),
    ('Dallas', 'TX', 'Texas'),
    ('Houston', 'TX', 'Texas'),
    ('San Antonio', 'TX', 'Texas'),
    ('Phoenix', 'AZ', 'Arizona'),
    ('Los Angeles', 'CA', 'California'),
    ('San Diego', 'CA', 'California'),
    ('San Jose', 'CA', 'California'),
    ('San Francisco', 'CA', 'California'),
    ('Seattle', 'WA', 'Washington'),
    ('Portland', 'OR', 'Oregon'),
    ('Denver', 'CO', 'Colorado'),
    ('Las Vegas', 'NV', 'Nevada'),
    ('Atlanta', 'GA', 'Georgia'),
    ('Miami', 'FL', 'Florida'),
    ('Tampa', 'FL', 'Florida'),
    ('Orlando', 'FL', 'Florida'),
    ('Jacksonville', 'FL', 'Florida'),
    ('Charlotte', 'NC', 'North Carolina'),
    ('Nashville', 'TN', 'Tennessee'),
    ('Memphis', 'TN', 'Tennessee'),
    ('Louisville', 'KY', 'Kentucky'),
    ('Indianapolis', 'IN', 'Indiana'),
    ('Columbus', 'OH', 'Ohio'),
    ('Cleveland', 'OH', 'Ohio'),
    ('Cincinnati', 'OH', 'Ohio'),
    ('Chicago', 'IL', 'Illinois'),
    ('Detroit', 'MI', 'Michigan'),
    ('Milwaukee', 'WI', 'Wisconsin'),
    ('Minneapolis', 'MN', 'Minnesota'),
    ('St. Louis', 'MO', 'Missouri'),
    ('Kansas City', 'MO', 'Missouri'),
    ('Oklahoma City', 'OK', 'Oklahoma'),
    ('Tulsa', 'OK', 'Oklahoma'),
    ('New Orleans', 'LA', 'Louisiana'),
    ('Baton Rouge', 'LA', 'Louisiana'),
    ('Birmingham', 'AL', 'Alabama'),
    ('Mobile', 'AL', 'Alabama'),
    ('Little Rock', 'AR', 'Arkansas'),
    ('Albuquerque', 'NM', 'New Mexico'),
    ('Salt Lake City', 'UT', 'Utah'),
    ('Boise', 'ID', 'Idaho'),
    ('Reno', 'NV', 'Nevada'),
    ('Tucson', 'AZ', 'Arizona'),
    ('El Paso', 'TX', 'Texas'),
    ('Fort Worth', 'TX', 'Texas'),
    ('Arlington', 'TX', 'Texas'),
    ('Plano', 'TX', 'Texas'),
    ('Corpus Christi', 'TX', 'Texas'),
    ('Laredo', 'TX', 'Texas')
]


async def batch_scrape(start_index: int = 0, batch_size: int = 10):
    """
    Scrape cities in batches with error recovery
    """
    scraper = AutonomousScraper()
    results = []
    errors = []
    
    cities_to_process = CITIES[start_index:start_index + batch_size]
    
    print(f"\n{'='*80}")
    print(f"🚀 BATCH AUTONOMOUS SCRAPING")
    print(f"Processing cities {start_index} to {start_index + len(cities_to_process)}")
    print(f"{'='*80}\n")
    
    for idx, (city_name, state_abbr, state_name) in enumerate(cities_to_process):
        try:
            print(f"\n[{idx + 1}/{len(cities_to_process)}] Processing: {city_name}, {state_abbr}")
            
            result = await scraper.scrape_city_autonomous(city_name, state_abbr, state_name)
            results.append(result)
            
            # Save individual city
            output_file = f"data/autonomous_{city_name.lower().replace(' ', '_')}_{state_abbr.lower()}.json"
            with open(output_file, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"✅ Saved: {output_file}")
            print(f"Confidence: {result['audit_metadata']['confidence_score']}")
            
            # Rate limiting with jitter (3-7 seconds between cities)
            await asyncio.sleep(random.uniform(3, 7))
            
        except Exception as e:
            error_entry = {
                'city': city_name,
                'state': state_abbr,
                'error': str(e)
            }
            errors.append(error_entry)
            print(f"❌ ERROR: {city_name}, {state_abbr} - {e}")
            continue
    
    # Save batch results
    batch_file = f"data/batch_{start_index}_{start_index + batch_size}.json"
    with open(batch_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    # Save errors
    if errors:
        error_file = f"data/batch_{start_index}_{start_index + batch_size}_errors.json"
        with open(error_file, 'w') as f:
            json.dump(errors, f, indent=2)
    
    print(f"\n{'='*80}")
    print(f"✅ BATCH COMPLETE")
    print(f"Successful: {len(results)}/{len(cities_to_process)}")
    print(f"Errors: {len(errors)}")
    print(f"Saved to: {batch_file}")
    print(f"{'='*80}\n")
    
    return results, errors


async def scrape_all_cities():
    """
    Scrape all cities in batches of 10
    """
    all_results = []
    all_errors = []
    
    batch_size = 10
    total_batches = (len(CITIES) + batch_size - 1) // batch_size
    
    for batch_num in range(total_batches):
        start_index = batch_num * batch_size
        
        print(f"\n{'#'*80}")
        print(f"BATCH {batch_num + 1}/{total_batches}")
        print(f"{'#'*80}")
        
        results, errors = await batch_scrape(start_index, batch_size)
        all_results.extend(results)
        all_errors.extend(errors)
        
        # Longer pause between batches (10-15 seconds)
        if batch_num < total_batches - 1:
            pause = random.uniform(10, 15)
            print(f"\n⏸️  Pausing {pause:.1f}s before next batch...")
            await asyncio.sleep(pause)
    
    # Save final combined results
    with open('data/all_autonomous_cities.json', 'w') as f:
        json.dump(all_results, f, indent=2)
    
    if all_errors:
        with open('data/all_errors.json', 'w') as f:
            json.dump(all_errors, f, indent=2)
    
    print(f"\n{'='*80}")
    print(f"🎉 ALL CITIES PROCESSED")
    print(f"Total successful: {len(all_results)}/{len(CITIES)}")
    print(f"Total errors: {len(all_errors)}")
    print(f"Success rate: {len(all_results)/len(CITIES)*100:.1f}%")
    print(f"{'='*80}\n")


if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        # Batch mode: python batch_autonomous.py 0 10
        start = int(sys.argv[1])
        size = int(sys.argv[2]) if len(sys.argv) > 2 else 10
        asyncio.run(batch_scrape(start, size))
    else:
        # Full mode: python batch_autonomous.py
        asyncio.run(scrape_all_cities())
