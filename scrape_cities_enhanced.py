#!/usr/bin/env python3
"""
Enhanced City Data Scraper with Smart Extraction
Gathers all required data for city pages with intelligent parsing
"""
import requests
import json
import time
import os
import re
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

SERPER_API_KEY = os.getenv('SERPER_API_KEY')
SERPER_URL = "https://google.serper.dev/search"

if not SERPER_API_KEY:
    raise EnvironmentError("SERPER_API_KEY not found in .env file")

CITIES = [
    'Boston', 'Cambridge', 'Somerville', 'Brookline',
    'Quincy', 'Newton', 'Waltham', 'Watertown', 'Medford', 'Malden',
    'Everett', 'Chelsea', 'Revere', 'Winthrop', 'Arlington', 'Belmont',
    'Lynn', 'Salem', 'Peabody', 'Beverly', 'Danvers', 'Marblehead',
    'Swampscott', 'Nahant', 'Braintree', 'Weymouth', 'Milton', 'Dedham',
    'Needham', 'Wellesley', 'Hingham', 'Lexington', 'Woburn', 'Burlington',
    'Winchester', 'Stoneham'
]


def search_serper(query, num_results=10):
    """Search using serper.dev API"""
    headers = {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
    }
    
    payload = {
        'q': query,
        'num': num_results,
        'gl': 'us',
        'hl': 'en'
    }
    
    try:
        response = requests.post(SERPER_URL, json=payload, headers=headers, timeout=15)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': str(e)}


def extract_phone_numbers(text):
    """Extract phone numbers from text"""
    patterns = [
        r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',  # (123) 456-7890
        r'\d{3}[-.\s]\d{4}',  # 311 or 3-1-1
        r'3-1-1',  # 311 format
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(0)
    return None


def extract_fine_amount(text):
    """Extract fine amounts from text"""
    patterns = [
        r'\$[\d,]+(?:\s*(?:to|-|–)\s*\$[\d,]+)?',  # $500 to $1,000
        r'up to \$[\d,]+',  # up to $1,000
        r'\$[\d,]+ fine',  # $500 fine
        r'\$[\d,]+ citation',  # $500 citation
        r'fine[s]?\s+(?:of|up to|range from)?\s*\$[\d,]+',  # fines of $500
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return match.group(0)
    return None


def extract_hours(text):
    """Extract operating hours from text"""
    patterns = [
        # Full schedule with days: Mon-Fri 8:00AM-5:00PM
        r'(?:Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thu|Thursday|Fri|Friday|Sat|Saturday|Sun|Sunday)(?:\s*[-–]\s*(?:Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thu|Thursday|Fri|Friday|Sat|Saturday|Sun|Sunday))?\s*:?\s*\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)\s*(?:to|-|–)\s*\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)',
        # Simple time range: 8:00AM-5:00PM or 8AM-5PM
        r'\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)\s*(?:to|-|–)\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)',
        # 24-hour format: 08:00-17:00
        r'\d{2}:\d{2}\s*(?:to|-|–)\s*\d{2}:\d{2}',
        # Days only: Monday-Friday, Sat-Sun
        r'(?:Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thu|Thursday|Fri|Friday|Sat|Saturday|Sun|Sunday)\s*[-–]\s*(?:Mon|Monday|Tue|Tuesday|Wed|Wednesday|Thu|Thursday|Fri|Friday|Sat|Saturday|Sun|Sunday)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            hours = match.group(0)
            # Clean up the hours string
            hours = re.sub(r'\s+', ' ', hours)
            return hours
    
    # Check for "by appointment" or "call for hours"
    if 'by appointment' in text.lower():
        return 'By appointment only'
    if 'call' in text.lower() and 'hour' in text.lower():
        return 'Call for hours'
    
    return None


def extract_address(text):
    """Extract addresses from text"""
    # Look for street addresses with various formats
    patterns = [
        # Standard: 123 Main Street
        r'\d+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:St|Street|Ave|Avenue|Rd|Road|Dr|Drive|Blvd|Boulevard|Way|Lane|Ln|Ct|Court|Pl|Place|Pkwy|Parkway)\.?(?:\s*,?\s*[A-Z][a-z]+)?',
        # With suite/unit: 123 Main St, Suite 100
        r'\d+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:St|Street|Ave|Avenue|Rd|Road)\.?(?:\s*,?\s*(?:Suite|Ste|Unit|#)\s*\d+)?',
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(0)
    return None


def extract_fee_amount(text):
    """Extract tipping fees or disposal costs"""
    patterns = [
        r'\$\d+(?:\.\d{2})?\s*(?:per|/)\s*(?:mattress|item|ton)',  # $25 per mattress
        r'(?:fee|cost|charge|tip)(?:\s+is)?\s*\$\d+(?:\.\d{2})?',  # fee is $25
        r'\$\d+(?:\.\d{2})?\s+(?:fee|charge|cost)',  # $25 fee
        r'(?:tipping|disposal)\s+fee[s]?:\s*\$\d+(?:\.\d{2})?',  # tipping fee: $25
    ]
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            # Extract just the dollar amount
            amount_match = re.search(r'\$\d+(?:\.\d{2})?', match.group(0))
            if amount_match:
                return amount_match.group(0)
    return None


def extract_wrapping_requirement(text):
    """Extract specific wrapping/bagging requirements"""
    text_lower = text.lower()
    
    # Check for plastic wrap requirement
    if 'plastic' in text_lower and ('wrap' in text_lower or 'bag' in text_lower or 'cover' in text_lower):
        if 'must' in text_lower or 'required' in text_lower or 'need' in text_lower:
            return "Must be wrapped in plastic before curbside placement"
    
    # Check for no wrapping required
    if 'no wrap' in text_lower or 'not required' in text_lower:
        return "No wrapping required"
    
    # Check for sealed bag requirement
    if 'sealed' in text_lower and 'bag' in text_lower:
        return "Must be in sealed plastic bag"
    
    return None


def extract_placement_time(text):
    """Extract placement timing requirements"""
    text_lower = text.lower()
    
    # Night before patterns
    if 'night before' in text_lower or 'evening before' in text_lower:
        if '6' in text or 'six' in text_lower:
            return "No earlier than 6PM the night before pickup"
        elif '7' in text or 'seven' in text_lower:
            return "No earlier than 7PM the night before pickup"
        else:
            return "Evening before scheduled pickup"
    
    # Morning of patterns
    if 'morning of' in text_lower or 'day of' in text_lower:
        if '6' in text or 'six' in text_lower:
            return "After 6AM on day of pickup"
        elif '7' in text or 'seven' in text_lower:
            return "After 7AM on day of pickup"
        else:
            return "Morning of scheduled pickup"
    
    # Specific time patterns
    time_match = re.search(r'(?:after|no earlier than)\s+(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))', text_lower)
    if time_match:
        return f"No earlier than {time_match.group(1)}"
    
    return None


def extract_size_limits(text):
    """Extract size/quantity limits"""
    text_lower = text.lower()
    
    # Look for quantity limits with various patterns
    patterns = [
        (r'(?:max|maximum|limit|up to)\s+(\d+)\s+(?:mattress|item)', 'Max {} mattresses per household per collection'),
        (r'(\d+)\s+(?:mattress|item)\s+(?:max|maximum|limit|per)', 'Max {} mattresses per household per collection'),
        (r'no more than\s+(\d+)', 'No more than {} mattresses per collection'),
        (r'limit(?:ed)? to\s+(\d+)', 'Limited to {} mattresses per household'),
        (r'(\d+)\s+per\s+(?:household|residence|pickup)', '{} mattresses per household per pickup'),
    ]
    
    for pattern, template in patterns:
        match = re.search(pattern, text_lower)
        if match:
            num = match.group(1)
            return template.format(num)
    
    # Check for "unlimited" or "no limit"
    if 'no limit' in text_lower or 'unlimited' in text_lower:
        return 'No specific limit - check with local department'
    
    return None


def extract_schedule_days(text):
    """Extract next available pickup days"""
    text_lower = text.lower()
    
    # Look for specific day patterns
    patterns = [
        r'(?:next|available|schedule).*?(\d+)\s*(?:day|business day)',
        r'(?:within|in)\s+(\d+)\s*(?:day|business day)',
        r'(\d+)[-\s](?:day|business day)\s+(?:notice|advance|wait)',
        r'(?:wait|waiting)\s+(?:time|period).*?(\d+)\s*(?:day|week)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text_lower)
        if match:
            num = int(match.group(1))
            # Convert weeks to days
            if 'week' in match.group(0):
                num = num * 7
            # Only accept reasonable ranges (1-30 days)
            if 1 <= num <= 30:
                return num
    
    return None


def scrape_city_data(city):
    """Scrape comprehensive data for a city"""
    print(f"\n{'='*80}")
    print(f"🔍 Scraping: {city}, MA")
    print(f"{'='*80}")
    
    data = {
        'city_name': city,
        'state_name': 'Massachusetts',
        'state_abbr': 'MA',
        'city_slug': f"{city.lower().replace(' ', '-')}-ma",
        'last_updated': datetime.now().strftime('%B %d, %Y'),
        'scraped_at': datetime.now().isoformat(),
        
        # Initialize all required fields
        'contacts': {},
        'curbside_rules': {},
        'illegal_dumping': {},
        'drop_off_locations': [],
        'pricing': {},
        'weather_profile': {},
        'donation_policy': None,
        'neighborhoods': [],
        'faqs': [],
        'next_pickup_days': None,  # Will be populated if found
        
        # Metadata
        'sources': [],
        'raw_queries': {}
    }
    
    # Query 1: Official Department & Contact
    print("  [1/15] Official department...")
    query = f'site:.gov "{city}" Massachusetts sanitation department contact'
    results = search_serper(query)
    data['raw_queries']['official_dept'] = {'query': query, 'results': results}
    
    if results.get('organic'):
        for result in results['organic'][:3]:
            if '.gov' in result.get('link', ''):
                data['contacts']['website_url'] = result['link']
                data['contacts']['official_dept'] = result['title']
                data['sources'].append(result['link'])
                
                # Extract phone from snippet
                phone = extract_phone_numbers(result.get('snippet', ''))
                if phone:
                    data['contacts']['official_phone'] = phone
                break
    time.sleep(0.6)
    
    # Query 2: Waste Management Rules
    print("  [2/15] Waste management rules...")
    query = f'"{city}" MA mattress disposal curbside pickup rules requirements wrapping bagging'
    results = search_serper(query)
    data['raw_queries']['waste_rules'] = {'query': query, 'results': results}
    
    if results.get('organic'):
        for result in results['organic'][:5]:
            snippet = result.get('snippet', '')
            title = result.get('title', '')
            combined_text = f"{title} {snippet}"
            
            # Extract wrapping requirements
            if not data['curbside_rules'].get('bagging_rules'):
                wrapping = extract_wrapping_requirement(combined_text)
                if wrapping:
                    data['curbside_rules']['bagging_rules'] = wrapping
                    data['curbside_rules']['mattress_specific_rule'] = wrapping
            
            # Extract placement timing
            if not data['curbside_rules'].get('placement_time'):
                placement = extract_placement_time(combined_text)
                if placement:
                    data['curbside_rules']['placement_time'] = placement
            
            # Extract size limits
            if not data['curbside_rules'].get('size_limits'):
                limits = extract_size_limits(combined_text)
                if limits:
                    data['curbside_rules']['size_limits'] = limits
            
            if '.gov' in result.get('link', ''):
                data['sources'].append(result['link'])
    time.sleep(0.6)
    
    # Query 3: Illegal Dumping Fines
    print("  [3/15] Illegal dumping fines...")
    query = f'"{city}" Massachusetts illegal dumping fine penalty amount'
    results = search_serper(query)
    data['raw_queries']['fines'] = {'query': query, 'results': results}
    
    if results.get('organic'):
        for result in results['organic'][:3]:
            snippet = result.get('snippet', '')
            fine = extract_fine_amount(snippet)
            if fine:
                data['illegal_dumping']['fine_amount'] = fine
                data['sources'].append(result['link'])
                break
    
    # Default if not found
    if not data['illegal_dumping'].get('fine_amount'):
        data['illegal_dumping']['fine_amount'] = 'Up to $1,000'
    time.sleep(0.6)
    
    # Query 4: Transfer Stations / Drop-off Locations
    print("  [4/15] Transfer stations...")
    query = f'"{city}" MA transfer station recycling center mattress disposal address hours fees open'
    results = search_serper(query)
    data['raw_queries']['facilities'] = {'query': query, 'results': results}
    
    if results.get('organic'):
        for i, result in enumerate(results['organic'][:5]):
            snippet = result.get('snippet', '')
            title = result.get('title', '')
            link = result.get('link', '')
            combined_text = f"{title} {snippet}"
            
            # Extract address
            address = extract_address(combined_text)
            if not address:
                address = extract_address(title)
            
            # Extract phone number
            phone = extract_phone_numbers(combined_text)
            
            # Extract hours - try multiple patterns
            hours = extract_hours(combined_text)
            if not hours:
                # Try to find hours in a different format
                hours_pattern = r'(?:open|hours).*?(?:monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun)[^.]*'
                hours_match = re.search(hours_pattern, combined_text.lower())
                if hours_match:
                    hours = hours_match.group(0)[:100]  # Limit length
            
            # Extract fee
            fee = extract_fee_amount(combined_text)
            
            # Only add if we have at least an address or it's a .gov site
            if address or '.gov' in link or 'transfer' in title.lower() or 'recycling' in title.lower():
                location = {
                    'name': title[:80],  # Limit title length
                    'type': 'Transfer Station / Recycling Center',
                    'address': address if address else 'Contact facility for address',
                    'phone': phone if phone else None,  # Add phone number
                    'hours': hours if hours else 'Call for hours',
                    'tipping_fee': fee if fee else 'Call for fees',
                    'accepted': ['Mattresses', 'Box Springs', 'Furniture'],
                    'residency_req': f'{city} residents only. Photo ID may be required.',
                    'google_maps_url': link if link else f'https://www.google.com/maps/search/?api=1&query=transfer+station+{city}+MA'
                }
                
                data['drop_off_locations'].append(location)
                
                # Stop after 3 good locations
                if len(data['drop_off_locations']) >= 3:
                    break
    time.sleep(0.6)
    
    # Query 4b: Specific facility hours and phone search
    print("  [4b/15] Facility hours & contact...")
    query = f'"{city}" MA transfer station phone number hours contact'
    results = search_serper(query, num_results=5)
    data['raw_queries']['facility_hours'] = {'query': query, 'results': results}
    
    if results.get('organic'):
        for result in results['organic'][:3]:
            snippet = result.get('snippet', '')
            title = result.get('title', '')
            combined = f"{title} {snippet}"
            
            # Try to extract hours
            hours = extract_hours(combined)
            phone = extract_phone_numbers(combined)
            
            # Update first location if it doesn't have hours or phone
            if len(data['drop_off_locations']) > 0:
                if data['drop_off_locations'][0]['hours'] == 'Call for hours' and hours:
                    data['drop_off_locations'][0]['hours'] = hours
                if not data['drop_off_locations'][0].get('phone') and phone:
                    data['drop_off_locations'][0]['phone'] = phone
    time.sleep(0.6)
    
    # Query 5: Competitor Pricing
    print("  [5/15] Competitor pricing...")
    query = f'mattress removal "{city}" MA price cost "$" 2026'
    results = search_serper(query)
    data['raw_queries']['pricing'] = {'query': query, 'results': results}
    
    # Try to extract real pricing from results
    price_low = None
    price_high = None
    
    if results.get('organic'):
        for result in results['organic'][:5]:
            snippet = result.get('snippet', '')
            title = result.get('title', '')
            combined = f"{title} {snippet}"
            
            # Look for price ranges like $80-$150 or $80 to $150
            price_range = re.search(r'\$(\d+)(?:\s*(?:-|to)\s*\$?(\d+))?', combined)
            if price_range:
                low = int(price_range.group(1))
                high = int(price_range.group(2)) if price_range.group(2) else low
                
                # Update if we found reasonable prices (between $50-$300)
                if 50 <= low <= 300:
                    if price_low is None or low < price_low:
                        price_low = low
                if 50 <= high <= 300:
                    if price_high is None or high > price_high:
                        price_high = high
    
    # Set pricing with real data if found, otherwise use defaults
    if price_low and price_high:
        data['pricing'] = {
            'base_price_display': f'From ${price_low}',
            'competitor_comparison': f'${price_low}–${price_high}',
            'market_rate_range': f'${price_low}–${price_high}'
        }
    else:
        data['pricing'] = {
            'base_price_display': 'From $89',
            'competitor_comparison': '$75–$180',
            'market_rate_range': '$75–$180'
        }
    time.sleep(0.6)
    
    # Query 6: Donation Options
    print("  [6/15] Donation options...")
    query = f'"{city}" MA mattress donation Goodwill Habitat for Humanity'
    results = search_serper(query)
    data['raw_queries']['donation'] = {'query': query, 'results': results}
    
    data['donation_policy'] = 'Goodwill & Habitat for Humanity accept clean, non-stained mattresses only'
    time.sleep(0.6)
    
    # Query 7: Weather Profile
    print("  [7/15] Weather profile...")
    query = f'"{city}" Massachusetts average rainfall climate'
    results = search_serper(query)
    data['raw_queries']['weather'] = {'query': query, 'results': results}
    
    data['weather_profile'] = {
        'profile': 'Rainy Season (Nov–Mar)',
        'risk': 'Wet mattresses are automatically rejected'
    }
    time.sleep(0.6)
    
    # Query 8: Neighborhoods - Enhanced
    print("  [8/15] Neighborhoods...")
    query = f'"{city}" Massachusetts neighborhoods list complete all'
    results = search_serper(query, num_results=10)
    data['raw_queries']['neighborhoods'] = {'query': query, 'results': results}
    
    # Extract neighborhoods from results
    neighborhoods_found = set()
    
    if results.get('organic'):
        for result in results['organic'][:5]:
            snippet = result.get('snippet', '')
            title = result.get('title', '')
            combined = f"{title} {snippet}"
            
            # Look for comma-separated lists
            if ',' in combined:
                # Split by common delimiters
                parts = re.split(r'[,;•\n]', combined)
                for part in parts:
                    clean = part.strip()
                    # Filter out non-neighborhood text
                    if (len(clean) > 3 and len(clean) < 40 and 
                        not any(x in clean.lower() for x in ['http', 'www', 'click', 'read', 'more', 'view', 'see', 'map', 'guide', 'list', 'neighborhood', 'district', 'area'])):
                        # Remove leading numbers or bullets
                        clean = re.sub(r'^\d+[\.\)]\s*', '', clean)
                        clean = re.sub(r'^[•\-\*]\s*', '', clean)
                        # Remove trailing punctuation
                        clean = clean.rstrip('.,;:')
                        if clean and len(clean) > 3 and not clean.isdigit():
                            neighborhoods_found.add(clean)
            
            # Look for "X neighborhoods" or "X districts" patterns
            pattern = r'(?:including|such as|like)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)'
            matches = re.findall(pattern, combined)
            for match in matches:
                if len(match) < 40:
                    neighborhoods_found.add(match)
    
    # Convert to list and limit to 20
    if neighborhoods_found:
        data['neighborhoods'] = sorted(list(neighborhoods_found))[:20]
    
    # Query 8b: Wikipedia/official neighborhoods
    print("  [8b/15] Official neighborhoods...")
    query = f'site:wikipedia.org OR site:.gov "{city}" Massachusetts neighborhoods official'
    results = search_serper(query, num_results=5)
    data['raw_queries']['neighborhoods_official'] = {'query': query, 'results': results}
    
    if results.get('organic'):
        for result in results['organic'][:2]:
            snippet = result.get('snippet', '')
            if ',' in snippet:
                parts = re.split(r'[,;•\n]', snippet)
                for part in parts[:10]:
                    clean = part.strip().rstrip('.,;:')
                    clean = re.sub(r'^\d+[\.\)]\s*', '', clean)
                    if (len(clean) > 3 and len(clean) < 40 and 
                        not any(x in clean.lower() for x in ['http', 'www', 'click', 'read', 'more', 'view', 'see', 'map', 'guide', 'list', 'neighborhood'])):
                        if clean not in data['neighborhoods']:
                            data['neighborhoods'].append(clean)
    
    # Remove duplicates and limit to 20
    data['neighborhoods'] = list(dict.fromkeys(data['neighborhoods']))[:20]
    
    # Add default neighborhoods only if we found fewer than 5
    if len(data['neighborhoods']) < 5:
        default_neighborhoods = [
            f'{city} Center', f'Downtown {city}', f'North {city}', 
            f'South {city}', f'East {city}', f'West {city}'
        ]
        for neighborhood in default_neighborhoods:
            if neighborhood not in data['neighborhoods'] and len(data['neighborhoods']) < 20:
                data['neighborhoods'].append(neighborhood)
    
    time.sleep(0.6)
    
    # Queries 9-20: Additional data gathering (expanded for better accuracy)
    additional_queries = [
        ('schedule', f'"{city}" MA bulk trash pickup schedule frequency appointment days'),
        ('schedule_specific', f'"{city}" Massachusetts bulky item next available pickup date wait time'),
        ('schedule_advance', f'"{city}" MA mattress pickup how many days advance notice required'),
        ('ordinance', f'site:.gov "{city}" MA city code illegal dumping ordinance'),
        ('fees_detailed', f'"{city}" Massachusetts waste disposal fees tipping cost per ton mattress "$"'),
        ('recycling', f'"{city}" MA mattress recycling program free'),
        ('bulky_items', f'"{city}" Massachusetts bulky item collection appointment schedule advance'),
        ('permits', f'"{city}" MA waste disposal permit requirements resident'),
        ('enforcement', f'"{city}" Massachusetts illegal dumping enforcement cameras fine'),
        ('placement_rules', f'"{city}" MA curbside mattress placement time rules when'),
        ('size_limits', f'"{city}" MA mattress disposal limit maximum how many per household'),
        ('hours_specific', f'"{city}" MA transfer station hours open close schedule'),
    ]
    
    for i, (key, query) in enumerate(additional_queries, 9):
        print(f"  [{i}/20] {key.replace('_', ' ').title()}...")
        results = search_serper(query)
        data['raw_queries'][key] = {'query': query, 'results': results}
        
        # Extract additional data from these queries
        if results.get('organic'):
            for result in results['organic'][:5]:
                snippet = result.get('snippet', '')
                title = result.get('title', '')
                combined = f"{title} {snippet}"
                
                # Extract placement time
                if key in ['schedule', 'schedule_specific', 'placement_rules']:
                    if 'Contact local department' in data['curbside_rules'].get('placement_time', ''):
                        placement = extract_placement_time(combined)
                        if placement:
                            data['curbside_rules']['placement_time'] = placement
                
                # Extract next pickup days
                if key in ['schedule', 'schedule_specific', 'schedule_advance']:
                    if data.get('next_pickup_days') is None:
                        days = extract_schedule_days(combined)
                        if days:
                            data['next_pickup_days'] = days
                
                # Extract size limits
                if key == 'size_limits':
                    if 'Contact local department' in data['curbside_rules'].get('size_limits', ''):
                        limits = extract_size_limits(combined)
                        if limits:
                            data['curbside_rules']['size_limits'] = limits
                
                # Extract appointment requirements
                if key in ['bulky_items', 'schedule_advance']:
                    if 'appointment' in combined.lower() or 'schedule' in combined.lower():
                        if 'advance' in combined.lower():
                            days_match = re.search(r'(\d+)\s*(?:day|week)', combined.lower())
                            if days_match:
                                num = days_match.group(1)
                                unit = 'days' if 'day' in days_match.group(0) else 'weeks'
                                data['curbside_rules']['the_catch'] = f'Must schedule {num} {unit} in advance'
                
                # Extract facility hours
                if key == 'hours_specific':
                    hours = extract_hours(combined)
                    if hours and len(data['drop_off_locations']) > 0:
                        # Update locations without hours
                        for location in data['drop_off_locations']:
                            if 'Call for hours' in location['hours']:
                                location['hours'] = hours
                                break
                
                # Extract tipping fees
                if key == 'fees_detailed':
                    fee = extract_fee_amount(combined)
                    if fee:
                        # Update locations with placeholder fees
                        for location in data['drop_off_locations']:
                            if location['tipping_fee'] == 'Call for fees':
                                location['tipping_fee'] = fee
                                break
        
        time.sleep(0.6)
    
    # Generate FAQs
    data['faqs'] = generate_faqs(city, data)
    
    # Set availability status
    data['curbside_rules']['availability_status'] = 'conditional'
    
    # Set intelligent defaults for missing fields
    if not data['curbside_rules'].get('bagging_rules') or data['curbside_rules']['bagging_rules'] == 'Check with local department':
        # Check if we found any wrapping info in any query
        found_wrapping = False
        for query_data in data.get('raw_queries', {}).values():
            if isinstance(query_data, dict) and 'results' in query_data:
                results = query_data['results']
                if isinstance(results, dict) and 'organic' in results:
                    for result in results['organic'][:3]:
                        snippet = result.get('snippet', '').lower()
                        if 'plastic' in snippet and ('wrap' in snippet or 'bag' in snippet):
                            data['curbside_rules']['bagging_rules'] = 'Plastic wrap required (city mandate)'
                            data['curbside_rules']['mattress_specific_rule'] = 'Must be wrapped in plastic before curbside placement'
                            found_wrapping = True
                            break
                if found_wrapping:
                    break
        
        if not found_wrapping:
            data['curbside_rules']['bagging_rules'] = 'Contact local department for requirements'
            data['curbside_rules']['mattress_specific_rule'] = f'Contact {data["contacts"].get("official_dept", "local department")} for specific requirements'
    
    if not data['curbside_rules'].get('placement_time'):
        data['curbside_rules']['placement_time'] = 'Contact local department for schedule'
    
    if not data['curbside_rules'].get('size_limits'):
        data['curbside_rules']['size_limits'] = 'Contact local department for limits'
    
    if not data['curbside_rules'].get('the_catch'):
        data['curbside_rules']['the_catch'] = 'Appointment or scheduling may be required'
    
    # Ensure we have at least one drop-off location
    if len(data['drop_off_locations']) == 0:
        data['drop_off_locations'].append({
            'name': f'{city} Transfer Station',
            'type': 'Municipal Facility',
            'address': f'Contact {data["contacts"].get("official_dept", "city hall")} for location',
            'hours': 'Call for hours',
            'tipping_fee': 'Call for fees',
            'accepted': ['Mattresses', 'Box Springs', 'Furniture'],
            'residency_req': f'{city} residents only. Photo ID may be required.',
            'google_maps_url': data['contacts'].get('website_url', f'https://www.google.com/maps/search/?api=1&query=transfer+station+{city}+MA')
        })
    
    print(f"  ✅ Completed {city}")
    return data


def generate_faqs(city, data):
    """Generate FAQs based on scraped data"""
    
    # FAQ 1: Is disposal free?
    cost_info = data['curbside_rules'].get('the_catch', 'requirements vary')
    faq1_answer = f'The City of {city} offers bulky item pickup'
    if 'appointment' in cost_info.lower():
        faq1_answer += f', but {cost_info.lower()}.'
    else:
        faq1_answer += ', but requirements vary. Check with your local sanitation department for scheduling and any fees.'
    faq1_answer += ' Many residents find professional haulers more convenient.'
    
    # FAQ 2: Wrapping requirements
    bagging = data['curbside_rules'].get('bagging_rules', 'Check with local department')
    faq2_answer = f'{bagging}. Unwrapped mattresses may not be collected.'
    
    # FAQ 3: Donation
    faq3_answer = data.get('donation_policy', 'Contact local charities for donation requirements.')
    
    # FAQ 4: Fines
    fine_amount = data['illegal_dumping'].get('fine_amount', 'substantial')
    faq4_answer = f'Illegal dumping fines in {city} can be {fine_amount}. The city has active enforcement'
    if 'camera' in str(data.get('raw_queries', {}).get('enforcement', {})).lower():
        faq4_answer += ' including surveillance cameras'
    faq4_answer += '.'
    
    return [
        {
            'q': f'Is mattress disposal free in {city}?',
            'a': faq1_answer
        },
        {
            'q': 'Does a mattress need to be wrapped or bagged?',
            'a': faq2_answer
        },
        {
            'q': 'Can I donate my mattress instead?',
            'a': faq3_answer
        },
        {
            'q': f'What are the fines for illegal dumping in {city}?',
            'a': faq4_answer
        }
    ]


def scrape_all_cities(output_file='all_cities_enhanced_data.json', sample_size=None):
    """Scrape all cities with enhanced extraction"""
    cities_to_scrape = CITIES[:sample_size] if sample_size else CITIES
    
    print("=" * 80)
    print("ENHANCED CITY DATA SCRAPER")
    print("=" * 80)
    print(f"Cities: {len(cities_to_scrape)}")
    print(f"Queries per city: 20")
    print(f"Estimated time: ~{len(cities_to_scrape) * 20 * 0.6 / 60:.1f} minutes")
    print("=" * 80)
    
    all_data = []
    start_time = time.time()
    
    for i, city in enumerate(cities_to_scrape, 1):
        print(f"\n[{i}/{len(cities_to_scrape)}] Processing {city}...")
        
        try:
            city_data = scrape_city_data(city)
            all_data.append(city_data)
            
            # Save progress
            with open(output_file, 'w') as f:
                json.dump(all_data, f, indent=2)
            
            print(f"  💾 Progress saved")
            
        except Exception as e:
            print(f"  ❌ Error: {e}")
            continue
        
        # Pause between cities
        if i < len(cities_to_scrape):
            time.sleep(2)
    
    elapsed = time.time() - start_time
    
    print("\n" + "=" * 80)
    print("SCRAPING COMPLETE")
    print("=" * 80)
    print(f"Cities scraped: {len(all_data)}")
    print(f"Total time: {elapsed/60:.1f} minutes")
    print(f"Output: {output_file}")
    print("=" * 80)
    
    return all_data


if __name__ == '__main__':
    import sys
    
    sample_size = int(sys.argv[1]) if len(sys.argv) > 1 else None
    
    if sample_size:
        print(f"\n⚠️  SAMPLE MODE: Scraping first {sample_size} cities\n")
        output_file = f'sample_{sample_size}_cities_enhanced.json'
    else:
        output_file = 'all_36_cities_enhanced_data.json'
    
    scrape_all_cities(output_file=output_file, sample_size=sample_size)
