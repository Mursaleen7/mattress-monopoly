# City Data Schema (v3.0 - Government Waste Data Auditor)

## Overview

This schema enforces strict compliance with the "Facility Capability Test" to ensure only verified heavy trash/mattress disposal facilities are listed (NOT recycling centers).

## Complete Schema

```json
{
  "city_slug": "austin-tx",
  "city_name": "Austin",
  "state_name": "Texas",
  "state_slug": "texas",
  "state_abbr": "TX",
  "population": {
    "count": 961855,
    "year": 2020,
    "source": "https://data.census.gov/profile/Austin_city,_Texas"
  },
  "contacts": {
    "official_phone": "(512) 974-4343",
    "department_name": "Austin Resource Recovery",
    "website_url": "https://www.austintexas.gov/department/austin-resource-recovery"
  },
  "curbside_rules": {
    "is_available": true,
    "mattress_specific_rule": "Must be wrapped in plastic",
    "placement_time": "Before 7am on collection day",
    "size_limits": "Not to exceed 200 lbs, easily handled by two people"
  },
  "drop_off_locations": [
    {
      "name": "Austin Resource Recovery Drop-Off Center",
      "address": "2510 Texas Avenue, Austin, TX 78704",
      "type": "Heavy Trash",
      "hours": "Open 7 days a week, 9am-5pm",
      "notes": "Mattresses accepted, proof of residency required"
    }
  ],
  "illegal_dumping": {
    "fine_amount": "Up to $2,000",
    "citation": "Municipal Code Section 15-6-3"
  },
  "audit_metadata": {
    "confidence_score": "HIGH",
    "verification_checklist": {
      "gov_source_found": true,
      "mattress_rule_verified": true,
      "facility_hours_verified": true,
      "facility_type_verified": true,
      "population_census_verified": true
    },
    "sources_used": [
      "https://www.austintexas.gov/department/austin-resource-recovery",
      "https://www.austintexas.gov/department/heavy-trash-collection"
    ],
    "last_updated": "2026-02-14"
  }
}
```

## Field Descriptions

### Core Identification

- **city_slug**: URL-friendly identifier (e.g., "austin-tx")
- **city_name**: Official city name
- **state_name**: Full state name
- **state_slug**: URL-friendly state identifier
- **state_abbr**: Two-letter state abbreviation

### Population (Nested Object)

- **count**: Official population from 2020+ census (Integer)
- **year**: Year of census data (Integer)
- **source**: URL to official census data source

### Contacts (Nested Object)

- **official_phone**: Specific department line or "3-1-1 (City General Line)"
- **department_name**: Official department name (e.g., "Austin Resource Recovery")
- **website_url**: Official .gov URL for the department

### Curbside Rules (Nested Object)

- **is_available**: Boolean - true only if curbside pickup exists
- **mattress_specific_rule**: Exact quote from official source (e.g., "Must be wrapped in plastic")
- **placement_time**: When to place items (e.g., "Before 7am on collection day")
- **size_limits**: Any size/weight restrictions

### Drop-off Locations (Array)

Each location must pass the "Facility Capability Test":

1. **Type Check**: Must be "Heavy Trash", "Landfill", or "Transfer Station" - NOT "Recycling Center"
2. **Item Verification**: Must explicitly accept mattresses or bulk waste
3. **Schedule Audit**: Exact hours verified (e.g., "Closed Mon, Tue-Sun 8am-5pm")

Fields:

- **name**: Exact facility name from official source
- **address**: Complete street address with ZIP code
- **type**: MUST be "Heavy Trash", "Landfill", or "Transfer Station"
- **hours**: EXACT operating hours (e.g., "Tue-Sat 9am-6pm" or "Closed Mon, Tue-Sun 8am-5pm")
- **notes**: Additional info (e.g., "Proof of residency required", "Mattresses accepted")

### Illegal Dumping (Nested Object)

- **fine_amount**: Exact fine from city ordinance (e.g., "Up to $4,000" or "$500-$2,000")
- **citation**: Source of fine info (e.g., "Municipal Code Section 15-6-3")

### Audit Metadata (Nested Object)

- **confidence_score**: "HIGH", "MEDIUM", "LOW", or "ERROR"
- **verification_checklist**: Object with boolean flags:
  - gov_source_found
  - mattress_rule_verified
  - facility_hours_verified
  - facility_type_verified
  - population_census_verified
- **sources_used**: Array of official URLs referenced
- **last_updated**: Date data was collected (YYYY-MM-DD)

## Critical Rules

### The "Facility Capability" Test

Before adding ANY drop-off location:

1. **Type Check**: Is this a recycling center (cans/paper only) or a transfer station (heavy trash allowed)?
2. **Item Verification**: Does the "Accepted Items" list explicitly include "Mattresses" or "Bulk Waste"?
3. **Schedule Audit**: Are the hours exact? Look for "Closed Mondays" patterns, not generic "Mon-Sat"

### Strict Constraints

- **No Recycling Centers**: Never list facilities that only accept recyclables (like Westpark in Houston)
- **Exact Hours**: If closed on Mondays, state "Closed Mon, Tue-Sun 8am-5pm" - not "Mon-Sat"
- **Phone Format**: Use specific department line or "3-1-1 (City General Line)"
- **Population**: Must be from 2020+ census, never estimated

## Confidence Levels

- **HIGH**: All data verified from official sources, all checklist items true
- **MEDIUM**: Most data verified, some fields missing or uncertain
- **LOW**: Limited data found, mostly fallback values used
- **ERROR**: Scraping failed, requires manual data collection

## Data Quality Standards

### Anti-Hallucination Requirements

1. ✅ Only use official .gov sources
2. ✅ Do not estimate or make up data
3. ✅ Mark missing data as empty strings, 0, or empty arrays
4. ✅ Verify all phone numbers and addresses
5. ✅ Cross-reference multiple official pages
6. ✅ Distinguish between recycling centers and transfer stations
7. ✅ Verify exact operating hours (watch for "Closed Monday" patterns)

### Verification Checklist

Before accepting data as HIGH confidence:

- [ ] Population from official 2020+ census with source URL
- [ ] All phone numbers verified from official sources
- [ ] All addresses complete with street, city, state, ZIP
- [ ] Facility names match exactly as listed on official sites
- [ ] Facility type verified (Heavy Trash/Landfill/Transfer Station - NOT Recycling Center)
- [ ] Hours of operation exact and current (not generalized)
- [ ] Mattress rules quoted/paraphrased from official policy
- [ ] No information fabricated or assumed

## Example: Houston (Correct vs Incorrect)

### ❌ INCORRECT (Recycling Center Listed)

```json
{
  "drop_off_locations": [
    {
      "name": "Westpark Recycling Center",
      "type": "Recycling Center",
      "notes": "Accepts cans, paper, cardboard only - NO MATTRESSES"
    }
  ]
}
```

### ✅ CORRECT (Transfer Station Only)

```json
{
  "drop_off_locations": [
    {
      "name": "Westpark Neighborhood Depository",
      "address": "5900 Westpark Dr, Houston, TX 77057",
      "type": "Heavy Trash",
      "hours": "Closed Mon, Tue-Fri 9am-6pm, Sat-Sun 9am-5pm",
      "notes": "Accepts mattresses and bulk waste, proof of residency required"
    }
  ]
}
```

## Migration from v2.0

If you have old data format, map fields as follows:

- `population` (number) → `population.count`
- `mattress_rules` (string) → `curbside_rules.mattress_specific_rule`
- `pickup_service_available` (boolean) → `curbside_rules.is_available`
- `pickup_phone` → `contacts.official_phone`
- `illegal_dumping_fine` → `illegal_dumping.fine_amount`
- `data_confidence` → `audit_metadata.confidence_score`
- `sources_checked` → `audit_metadata.sources_used`
