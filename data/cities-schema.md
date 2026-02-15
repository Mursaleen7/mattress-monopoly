# City Data Schema (v2.0)

## Required Fields for Each City

```json
{
  "city_slug": "austin-tx",
  "city_name": "Austin",
  "state_name": "Texas",
  "state_slug": "texas",
  "state_abbr": "TX",
  "population": 961855,
  "mattress_rules": "Must be wrapped in plastic. Schedule bulk collection online or call 311.",
  "dropoff_locations": [
    {
      "name": "Hornsby Bend Biosolids Management Plant",
      "address": "2210 S FM 973, Austin, TX 78725",
      "phone": "(512) 972-1960",
      "hours": "Mon-Sat 8am-5pm",
      "accepts_mattresses": true
    }
  ],
  "pickup_service_available": true,
  "pickup_phone": "311",
  "illegal_dumping_fine": "$500-$2000",
  "last_updated": "2026-02-14",
  "data_confidence": "HIGH",
  "sources_checked": [
    "https://www.austintexas.gov/department/austin-resource-recovery",
    "https://www.austintexas.gov/page/bulk-item-collection"
  ]
}
```

## Field Descriptions

### Core Identification
- **city_slug**: URL-friendly identifier (e.g., "austin-tx")
- **city_name**: Official city name
- **state_name**: Full state name
- **state_slug**: URL-friendly state identifier
- **state_abbr**: Two-letter state abbreviation

### Population
- **population**: Official population from 2020+ census
- Set to `0` if not found (requires manual update)
- Must be from official census or city data, not estimated

### Disposal Rules
- **mattress_rules**: Exact rules from official sources
- Should include: wrapping requirements, scheduling process, fees
- Falls back to contact info if specific rules not found

### Drop-off Locations
- **dropoff_locations**: Array of facilities accepting mattresses
- Each location includes:
  - **name**: Exact facility name from official source
  - **address**: Complete street address with ZIP code
  - **phone**: Verified phone in format (XXX) XXX-XXXX
  - **hours**: Exact operating hours (e.g., "Mon-Fri 8AM-5PM")
  - **accepts_mattresses**: true only if explicitly stated
- Use empty array `[]` if no locations found

### Pickup Service
- **pickup_service_available**: true if city offers curbside bulk pickup
- **pickup_phone**: Verified phone for scheduling (often 311, but must verify)

### Penalties
- **illegal_dumping_fine**: Exact fine from city ordinance (e.g., "$500-$2,000")
- Use "$500+" as conservative estimate if not found

### Metadata (NEW in v2.0)
- **last_updated**: Date data was collected (YYYY-MM-DD)
- **data_confidence**: Quality indicator
  - **HIGH**: All data verified from official sources
  - **MEDIUM**: Most data verified, some fields missing
  - **LOW**: Limited data found, mostly fallback values
  - **ERROR**: Scraping failed, needs manual collection
- **sources_checked**: Array of official URLs referenced during data collection

## Data Quality Standards

### Anti-Hallucination Requirements
1. ✅ Only use official .gov sources
2. ✅ Do not estimate or make up data
3. ✅ Mark missing data as null, 0, or empty arrays
4. ✅ Verify all phone numbers and addresses
5. ✅ Cross-reference multiple official pages
6. ✅ Provide confidence scores for transparency

### Verification Checklist
- [ ] Population from official census/city data
- [ ] All phone numbers verified from official sources
- [ ] All addresses complete with street, city, state, ZIP
- [ ] Facility names match exactly as listed on official sites
- [ ] Hours of operation are current and verified
- [ ] Mattress rules quoted/paraphrased from official policy
- [ ] No information fabricated or assumed

## Data Sources (Priority Order)

1. **City Government Website**: Search "[City] bulk trash collection"
2. **City .gov pages**: Look for solid waste/sanitation departments
3. **311 Services**: Most cities have online 311 portals
4. **State DEP**: Department of Environmental Protection pages
5. **Earth911.com**: Recycling location database

## Top 5 Cities to Start (Pilot)

1. Austin, TX
2. Toronto, ON (Canada)
3. Vancouver, BC (Canada)
4. New York, NY
5. Los Angeles, CA
