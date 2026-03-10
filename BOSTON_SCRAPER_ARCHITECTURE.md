# Boston Scraper Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    BOSTON AREA SCRAPER                          │
│                  (run_boston_scraper.py)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ├─── Reads Configuration
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BOSTON CONFIG                                │
│                  (boston_config.py)                             │
├─────────────────────────────────────────────────────────────────┤
│  • 16 Cities                                                    │
│  • 24 Municipalities                                            │
│  • 52 Zip Codes                                                 │
│  = 92 Total Locations                                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ├─── For Each Location
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              AUTONOMOUS SCRAPER PIPELINE                        │
│                    (main.py)                                    │
├─────────────────────────────────────────────────────────────────┤
│  Phase 1: Foundation (Geo + Census + Weather)                  │
│  Phase 2: Reconnaissance (Search & Fetch)                      │
│  Phase 3: Intelligence (LLM Extraction)                        │
│  Phase 4: Charisma (SEO + Copy)                                │
│  Phase 5: Competitor (Pricing)                                 │
│  Phase 6: Assembly & Validation                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ├─── Outputs
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    OUTPUT FILES                                 │
├─────────────────────────────────────────────────────────────────┤
│  data/boston/                                                   │
│  ├── city_*.json           (16 files)                          │
│  ├── municipality_*.json   (24 files)                          │
│  ├── zipcode_*.json        (52 files)                          │
│  └── boston_combined.json  (1 file with all data)             │
└─────────────────────────────────────────────────────────────────┘
```

## Location Type Hierarchy

```
Greater Boston Area
│
├── CITIES (Tier 1)
│   ├── Boston ──────────────┐
│   ├── Cambridge            │
│   ├── Somerville           │
│   ├── Quincy               │
│   └── ... (12 more)        │
│                            │
├── MUNICIPALITIES (Tier 2)  │
│   ├── Allston ─────────────┤ (part of Boston)
│   ├── Brighton ────────────┤ (part of Boston)
│   ├── Charlestown ─────────┤ (part of Boston)
│   ├── Dorchester ──────────┤ (part of Boston)
│   ├── Harvard Square ──────┤ (part of Cambridge)
│   └── ... (19 more)        │
│                            │
└── ZIP CODES (Tier 3)       │
    ├── 02108 (Beacon Hill) ─┤ (part of Boston)
    ├── 02109 (North End) ───┤ (part of Boston)
    ├── 02138 (Harvard Sq) ──┤ (part of Cambridge)
    └── ... (49 more)        │
                             │
                             └─── All inherit parent city data
```

## Data Flow for Each Location Type

### CITY Scraping Flow
```
Input: City Name + State
    │
    ├─► Validate with Google Geocoding API
    ├─► Fetch Census Population
    ├─► Search for Official Pages (SerpAPI)
    ├─► Extract Structured Data (LLM Agents)
    ├─► Generate SEO Copy (LLM)
    └─► Output: Complete City Data
```

### MUNICIPALITY Scraping Flow
```
Input: Municipality Name + Parent City + State
    │
    ├─► Scrape Parent City Data (full pipeline)
    ├─► Customize for Municipality:
    │   ├─ Add municipality_name
    │   ├─ Add parent_city reference
    │   ├─ Set is_municipality = true
    │   └─ Update city_slug
    └─► Output: Municipality Data (inherits city data)
```

### ZIP CODE Scraping Flow
```
Input: Zip Code + Neighborhood + City + State
    │
    ├─► Scrape Parent City Data (full pipeline)
    ├─► Customize for Zip Code:
    │   ├─ Add zip_code
    │   ├─ Add neighborhood
    │   ├─ Add parent_city reference
    │   ├─ Filter geo.zip_codes to [this_zip]
    │   ├─ Set is_zipcode = true
    │   └─ Update city_slug
    └─► Output: Zip Code Data (inherits city data)
```

## Page Template Mapping

```
┌──────────────────────────────────────────────────────────────┐
│                    LOCATION TYPE                             │
│                         ↓                                    │
│                  PAGE TEMPLATE                               │
└──────────────────────────────────────────────────────────────┘

CITY (e.g., Boston)
    ↓
CITY_PAGE_TEMPLATE.md
    • CityHero
    • TriggerRibbon
    • CityProFeed (with sidebar)
    • MunicipalRulebook
    • DropOffCenters
    • ChoiceMatrix
    • UGCCarousel
    • CityFAQ
    • CityCTA

MUNICIPALITY (e.g., Allston)
    ↓
MUNICIPALITY_PAGE_TEMPLATE.md
    • MunicipalityHero
    • MunicipalityProFeed (no sidebar)
    • MunicipalityRules
    • UGCCarousel
    • MunicipalityFAQ
    • MunicipalityCTA

ZIP CODE (e.g., 02108)
    ↓
ZIPCODE_PAGE_TEMPLATE.md
    • ZipHero
    • ZipTrustBar
    • ZipProFeed (minimal)
    • UGCCarousel
    • ZipCTA
```

## API Usage Per Location

```
┌─────────────────────────────────────────────────────────────┐
│  API                    │  Calls per Location  │  Purpose   │
├─────────────────────────────────────────────────────────────┤
│  Google Geocoding       │  2-3                 │  Geo data  │
│  Google Places          │  3-5                 │  Facilities│
│  Census API             │  1                   │  Population│
│  SerpAPI                │  5-10                │  Search    │
│  Gemini LLM             │  5-8                 │  Extract   │
│  Web Scraping           │  3-10                │  Content   │
└─────────────────────────────────────────────────────────────┘

Total API calls per location: ~20-40
Total time per location: 30-60 seconds
Total time for all 92 locations: ~1.5-3 hours
```

## Configuration Structure

```python
# boston_config.py

BOSTON_CITIES = [
    {
        'name': 'Boston',
        'state_abbr': 'MA',
        'state_name': 'Massachusetts'
    },
    # ... 15 more cities
]

BOSTON_MUNICIPALITIES = [
    {
        'name': 'Allston',
        'parent_city': 'Boston',
        'state_abbr': 'MA',
        'state_name': 'Massachusetts'
    },
    # ... 23 more municipalities
]

BOSTON_ZIP_CODES = [
    {
        'zip': '02108',
        'neighborhood': 'Beacon Hill',
        'city': 'Boston',
        'state_abbr': 'MA'
    },
    # ... 51 more zip codes
]
```

## Output Data Structure

```json
{
  "metadata": {
    "scraped_at": "2026-03-05T10:30:00",
    "region": "Greater Boston Area",
    "state": "Massachusetts",
    "counts": {
      "cities": 16,
      "municipalities": 24,
      "zip_codes": 52,
      "total": 92
    }
  },
  "cities": [
    {
      "city_slug": "boston-ma",
      "city_name": "Boston",
      "state_name": "Massachusetts",
      "state_abbr": "MA",
      "geo": { ... },
      "contacts": { ... },
      "curbside_rules": { ... },
      "drop_off_locations": [ ... ],
      "seo": { ... },
      "hero_hook": "...",
      "neighborhoods": "...",
      "population": { ... },
      "weather_profile": { ... },
      "affiliate_config": { ... },
      "audit_metadata": { ... }
    }
    // ... 15 more cities
  ],
  "municipalities": [
    {
      "municipality_name": "Allston",
      "parent_city": "Boston",
      "is_municipality": true,
      "city_slug": "allston-ma",
      // ... inherits all city data
    }
    // ... 23 more municipalities
  ],
  "zip_codes": [
    {
      "zip_code": "02108",
      "neighborhood": "Beacon Hill",
      "parent_city": "Boston",
      "is_zipcode": true,
      "city_slug": "02108-beacon-hill",
      "geo": {
        "zip_codes": ["02108"]  // filtered to this zip only
      }
      // ... inherits all city data
    }
    // ... 51 more zip codes
  ]
}
```

## Error Handling Flow

```
Location Processing
    │
    ├─► Geo Validation
    │   ├─ PASS → Continue
    │   └─ FAIL → Skip location, log error, continue to next
    │
    ├─► Content Validation
    │   ├─ PASS → Use scraped content
    │   └─ FAIL → Use fallback data, continue
    │
    ├─► LLM Extraction
    │   ├─ SUCCESS → Use extracted data
    │   └─ ERROR → Retry 3x, then use fallback
    │
    └─► Save Output
        ├─ SUCCESS → Continue to next location
        └─ ERROR → Log error, continue to next location

Final Result: Partial success is OK
    • Saves all successfully processed locations
    • Logs all errors for review
    • Continues even if some locations fail
```

## Rate Limiting Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  Between Locations:  5 seconds (configurable)               │
│  Between API Calls:  0.5-2 seconds (random)                 │
│  On Rate Limit:      Exponential backoff (2^n seconds)      │
│  On Error:           Retry 3x with backoff                  │
└─────────────────────────────────────────────────────────────┘

Example Timeline:
    Location 1: 45 seconds
    Wait: 5 seconds
    Location 2: 52 seconds
    Wait: 5 seconds
    Location 3: 38 seconds
    ...
```

## Extending to Other Metro Areas

To create a scraper for another metro area (e.g., NYC):

1. **Create config file**: `nyc_config.py`
```python
NYC_CITIES = [
    {'name': 'New York', 'state_abbr': 'NY', 'state_name': 'New York'},
    {'name': 'Brooklyn', 'state_abbr': 'NY', 'state_name': 'New York'},
    # ...
]

NYC_MUNICIPALITIES = [
    {'name': 'Manhattan', 'parent_city': 'New York', ...},
    # ...
]

NYC_ZIP_CODES = [
    {'zip': '10001', 'neighborhood': 'Chelsea', 'city': 'New York', ...},
    # ...
]
```

2. **Create runner**: `run_nyc_scraper.py`
```python
from nyc_config import get_all_nyc_locations, get_location_count
# ... same structure as run_boston_scraper.py
```

3. **Run**: `python3 run_nyc_scraper.py --all`

The architecture is designed to be reusable for any metro area!
