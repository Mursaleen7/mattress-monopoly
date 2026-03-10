# City Data Scraper - Complete Guide

## Overview

Two comprehensive scrapers to gather all required real-time data for city pages using Serper.dev API.

## What Data Gets Scraped

For each of the 36 Greater Boston cities, the scraper collects:

### 1. Basic City Info
- City name, state, abbreviation
- City slug for URLs
- Last updated date

### 2. Municipal Rules & Regulations
- Curbside pickup availability (free/conditional/not available)
- Mattress-specific rules (wrapping, bagging requirements)
- Placement timing restrictions
- Size/quantity limits per household
- Official department name, phone, website

### 3. Illegal Dumping & Fines
- Fine amounts ($250-$10,000 range)
- Citation codes and ordinances
- Enforcement details

### 4. Drop-Off Locations (3+ facilities per city)
- Facility name and type
- Full address
- Operating hours (days/times)
- Tipping fees per mattress
- Accepted items list
- Residency requirements
- Google Maps URLs

### 5. Pricing Intelligence
- Current market rate range for pros ($75-$180)
- Base professional pricing ("From $89")
- Competitor pricing (1-800-GOT-JUNK, etc.)

### 6. Weather/Seasonal Data
- Weather profile (rainy season, etc.)
- Weather-related rejection risks

### 7. Neighborhoods
- 5-20+ neighborhood names per city

### 8. FAQs (4 standard questions)
- Is disposal free?
- Wrapping/bagging requirements?
- Donation options?
- Illegal dumping fines?

### 9. Donation Options
- Goodwill, Habitat for Humanity policies

## Files

### 1. `scrape_all_36_cities.py` - Basic Scraper
- Executes 15 queries per city
- Basic data extraction
- Saves raw results + extracted data

### 2. `scrape_cities_enhanced.py` - Enhanced Scraper (RECOMMENDED)
- Executes 15 queries per city
- Smart extraction with regex parsing
- Extracts phone numbers, addresses, hours, fines
- Generates FAQs automatically
- Better structured output

## Usage

### Test with Sample Cities First

```bash
# Test with first 3 cities (recommended for testing)
python scrape_cities_enhanced.py 3

# Output: sample_3_cities_enhanced.json
```

### Scrape All 36 Cities

```bash
# Full scrape (takes ~15 minutes)
python scrape_cities_enhanced.py

# Output: all_36_cities_enhanced_data.json
```

### Basic Scraper (Alternative)

```bash
# Test with 3 cities
python scrape_all_36_cities.py 3

# Full scrape
python scrape_all_36_cities.py
```

## Requirements

### Environment Variables

Add to `.env` file:
```
SERPER_API_KEY=your_serper_api_key_here
```

### Python Packages

```bash
pip install requests python-dotenv
```

## Output Format

Each city produces a JSON object with this structure:

```json
{
  "city_name": "Boston",
  "state_name": "Massachusetts",
  "state_abbr": "MA",
  "city_slug": "boston-ma",
  "last_updated": "March 6, 2026",
  
  "contacts": {
    "official_dept": "Boston Public Works Department",
    "official_phone": "(617) 635-4500",
    "website_url": "https://www.boston.gov/departments/public-works"
  },
  
  "curbside_rules": {
    "availability_status": "conditional",
    "mattress_specific_rule": "Must be wrapped in plastic before curbside placement",
    "placement_time": "No earlier than 6PM the night before pickup",
    "size_limits": "Max 2 mattresses per household per collection",
    "bagging_rules": "Plastic wrap required (city mandate)"
  },
  
  "illegal_dumping": {
    "fine_amount": "Up to $1,000"
  },
  
  "drop_off_locations": [
    {
      "name": "Boston Transfer Station",
      "type": "Transfer Station / Recycling Center",
      "address": "123 Main St, Boston, MA",
      "hours": "Mon-Sat 7:00AM-4:00PM",
      "tipping_fee": "$25.00",
      "accepted": ["Mattresses", "Box Springs", "Furniture"],
      "residency_req": "Boston residents only. Photo ID required.",
      "google_maps_url": "https://maps.google.com/..."
    }
  ],
  
  "pricing": {
    "base_price_display": "From $89",
    "competitor_comparison": "$75–$180",
    "market_rate_range": "$75–$180"
  },
  
  "weather_profile": {
    "profile": "Rainy Season (Nov–Mar)",
    "risk": "Wet mattresses are automatically rejected"
  },
  
  "donation_policy": "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only",
  
  "neighborhoods": [
    "Back Bay", "Beacon Hill", "Charlestown", "Dorchester", "South Boston"
  ],
  
  "faqs": [
    {
      "q": "Is mattress disposal free in Boston?",
      "a": "The City of Boston offers bulky item pickup..."
    }
  ],
  
  "sources": [
    "https://www.boston.gov/...",
    "https://www.boston.gov/..."
  ]
}
```

## Query Types

The enhanced scraper executes 15 queries per city:

1. **Official Department** - Contact info, website
2. **Waste Management Rules** - Curbside requirements
3. **Illegal Dumping Fines** - Fine amounts, penalties
4. **Transfer Stations** - Drop-off locations
5. **Competitor Pricing** - Market rates
6. **Donation Options** - Charity policies
7. **Weather Profile** - Climate data
8. **Neighborhoods** - District names
9. **Schedule** - Pickup frequency
10. **Ordinance** - City codes
11. **Fees** - Tipping fees
12. **Recycling** - Recycling programs
13. **Bulky Items** - Collection rules
14. **Permits** - Permit requirements
15. **Enforcement** - Enforcement methods

## Rate Limiting

- 0.6 seconds between queries
- 2 seconds between cities
- Respects Serper API limits
- Progress saved after each city

## Estimated Time

- **3 cities**: ~2 minutes
- **10 cities**: ~7 minutes
- **36 cities**: ~15 minutes

## Error Handling

- Continues on individual query failures
- Saves progress after each city
- Provides default values for missing data
- Logs errors without stopping

## Next Steps

After scraping:

1. Review the JSON output
2. Verify data accuracy for a few sample cities
3. Import into your database
4. Use data to populate city page components

## Tips

- Start with 3 cities to test
- Check `.env` has valid SERPER_API_KEY
- Monitor API usage (Serper has rate limits)
- Review extracted data for accuracy
- Some fields may need manual verification

## All 36 Cities

Boston, Cambridge, Somerville, Brookline, Quincy, Newton, Waltham, Watertown, Medford, Malden, Everett, Chelsea, Revere, Winthrop, Arlington, Belmont, Lynn, Salem, Peabody, Beverly, Danvers, Marblehead, Swampscott, Nahant, Braintree, Weymouth, Milton, Dedham, Needham, Wellesley, Hingham, Lexington, Woburn, Burlington, Winchester, Stoneham
