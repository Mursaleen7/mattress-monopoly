# Greater Boston Area Scraper

This scraper is configured to scrape waste management data for all cities, municipalities, and zip codes in the Greater Boston metropolitan area.

## Overview

The scraper has been modified from the original nationwide USA scraper to focus specifically on the Greater Boston area in Massachusetts. It now scrapes three types of locations:

1. **Cities** - Major municipalities (Boston, Cambridge, Somerville, Quincy, etc.)
2. **Municipalities** - Neighborhoods and suburbs (Allston, Brighton, Charlestown, etc.)
3. **Zip Codes** - Specific zip code areas for hyper-local targeting

## Configuration

All Boston area locations are defined in `boston_config.py`:

- **16 Cities** - Major municipalities in Greater Boston
- **24 Municipalities** - Neighborhoods and suburbs
- **52 Zip Codes** - High-traffic areas across the region

You can edit `boston_config.py` to add or remove locations as needed.

## Usage

### Basic Commands

```bash
# Scrape all locations (cities, municipalities, and zip codes)
python3 run_boston_scraper.py --all

# Scrape only cities
python3 run_boston_scraper.py --cities

# Scrape only municipalities
python3 run_boston_scraper.py --municipalities

# Scrape only zip codes
python3 run_boston_scraper.py --zip-codes

# Dry run (test without saving)
python3 run_boston_scraper.py --all --dry-run

# Custom output directory
python3 run_boston_scraper.py --all --output /path/to/output

# Adjust delay between requests (default 5 seconds)
python3 run_boston_scraper.py --all --delay 10
```

### Output Structure

The scraper creates the following output files:

```
data/boston/
├── city_boston-ma.json
├── city_cambridge-ma.json
├── city_somerville-ma.json
├── municipality_allston-ma.json
├── municipality_brighton-ma.json
├── zipcode_02108.json
├── zipcode_02109.json
└── boston_combined.json
```

- **Individual files** - One JSON file per location
- **boston_combined.json** - All results combined with metadata

## Data Structure

### City Data
```json
{
  "city_slug": "boston-ma",
  "city_name": "Boston",
  "state_name": "Massachusetts",
  "state_abbr": "MA",
  "geo": {
    "latitude": 42.3601,
    "longitude": -71.0589,
    "zip_codes": ["02108", "02109", ...]
  },
  "contacts": { ... },
  "curbside_rules": { ... },
  "drop_off_locations": [ ... ],
  ...
}
```

### Municipality Data
```json
{
  "municipality_name": "Allston",
  "parent_city": "Boston",
  "is_municipality": true,
  "city_slug": "allston-ma",
  ...
}
```

### Zip Code Data
```json
{
  "zip_code": "02108",
  "neighborhood": "Beacon Hill",
  "parent_city": "Boston",
  "is_zipcode": true,
  "city_slug": "02108-beacon-hill",
  ...
}
```

## How It Works

### For Cities
The scraper runs the full autonomous pipeline:
1. Validates city-state combination via Google Geocoding API
2. Fetches population from Census API
3. Searches for official waste management pages
4. Extracts structured data using LLM agents
5. Generates SEO copy and marketing content

### For Municipalities
The scraper:
1. Scrapes the parent city's data
2. Customizes it for the municipality
3. Tags it as a municipality with parent city reference

### For Zip Codes
The scraper:
1. Scrapes the parent city's data
2. Customizes it for the specific zip code
3. Filters zip codes to only include the target one
4. Tags it as a zip code with neighborhood and city reference

## Rate Limiting

The scraper includes built-in rate limiting:
- Default 5-second delay between locations
- Adjustable via `--delay` flag
- Respects API rate limits for Google Maps, Census, and SerpAPI

## Error Handling

- Skips locations that fail geographical validation
- Continues processing even if individual locations fail
- Logs all errors with stack traces
- Saves partial results if interrupted

## Extending the Configuration

To add more locations, edit `boston_config.py`:

```python
# Add a new city
BOSTON_CITIES.append({
    'name': 'Waltham',
    'state_abbr': 'MA',
    'state_name': 'Massachusetts'
})

# Add a new municipality
BOSTON_MUNICIPALITIES.append({
    'name': 'Fenway',
    'parent_city': 'Boston',
    'state_abbr': 'MA',
    'state_name': 'Massachusetts'
})

# Add a new zip code
BOSTON_ZIP_CODES.append({
    'zip': '02215',
    'neighborhood': 'Fenway',
    'city': 'Boston',
    'state_abbr': 'MA'
})
```

## Requirements

Same as the original scraper:
- Python 3.8+
- Required environment variables:
  - `GEMINI_API_KEY`
  - `GOOGLE_MAPS_API_KEY`
  - `SERPAPI_KEY`
- Python packages: `httpx`, `beautifulsoup4`, `google-generativeai`, `pdfplumber` or `PyPDF2`

## Comparison with Original Scraper

| Feature | Original Scraper | Boston Scraper |
|---------|-----------------|----------------|
| Scope | All USA cities | Greater Boston only |
| Location Types | Cities only | Cities, Municipalities, Zip Codes |
| Configuration | Command-line args | Pre-configured in `boston_config.py` |
| Output | Individual + combined | Individual + combined with metadata |
| Use Case | Nationwide coverage | Hyper-local Boston focus |

## Notes

- The scraper reuses the parent city's data for municipalities and zip codes to avoid redundant API calls
- All locations are tagged with their type (`is_municipality`, `is_zipcode`) for easy filtering
- The combined output includes metadata about the scraping run
- You can run multiple types simultaneously with `--all` or individually for testing

## Troubleshooting

**Issue**: Scraper fails with "GEMINI_API_KEY not set"
**Solution**: Set environment variables in `.env` file or export them

**Issue**: Too many API rate limit errors
**Solution**: Increase `--delay` to 10 or 15 seconds

**Issue**: Some locations are skipped
**Solution**: Check the logs - they may fail geographical validation if the location doesn't exist or is ambiguous

**Issue**: Want to scrape a different metro area
**Solution**: Create a new config file (e.g., `nyc_config.py`) following the same structure as `boston_config.py`
