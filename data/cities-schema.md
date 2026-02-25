# City Data Schema (v5.0 - God Mode: Conversion + SEO Dominance + Psychological Triggers)

## Overview

This schema enforces strict compliance with the "Facility Capability Test" to ensure only verified heavy trash/mattress disposal facilities are listed (NOT recycling centers). Version 5.0 adds dynamic psychological triggers that convert static information into real-time urgency and comparative dominance.

## Complete Schema

```json
{
  "city_slug": "austin-tx",
  "city_name": "Austin",
  "state_name": "Texas",
  "state_slug": "texas",
  "state_abbr": "TX",
  "geo": {
    "latitude": 30.2672,
    "longitude": -97.7431,
    "zip_codes": ["78701", "78702", "78703", "78704", "78705"]
  },
  "seo": {
    "title_override": "Mattress Disposal in Austin: 2026 Drop-off Guide & Rules",
    "meta_desc_override": "Don't pay the $50 fine. Here is the official guide to Austin Resource Recovery rules, bulk pickup schedules, and private haulers."
  },
  "hero_hook": "Don't want to drive to the landfill in 100-degree heat?",
  "neighborhoods": "Hyde Park, Zilker, East Austin, South Congress, Barton Hills, Clarksville, Bouldin Creek, Travis Heights, Allandale, Rosedale",
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
    "size_limits": "Not to exceed 200 lbs, easily handled by two people",
    "the_catch": "Bulk collection only happens 2x a year per address",
    "schedule_logic": {
      "type": "specific_weeks",
      "dates_2026": ["2026-02-14", "2026-06-12", "2026-10-15"],
      "frequency_display": "Twice a year (Spring/Fall)",
      "missed_msg": "You missed the Feb pickup. Next free option is June (4 months wait)."
    }
  },
  "weather_profile": {
    "is_rain_heavy": false,
    "rejection_risk_copy": null
  },
  "drop_off_locations": [
    {
      "name": "Austin Resource Recovery Drop-Off Center",
      "address": "2510 Texas Avenue, Austin, TX 78704",
      "google_maps_url": "https://goo.gl/maps/...",
      "type": "Heavy Trash",
      "hours": "Open 7 days a week, 9am-5pm",
      "tipping_fee": "$15-20 depending on weight",
      "residency_required": true,
      "notes": "Mattresses accepted, proof of residency required",
      "accepted_items": ["Mattresses", "Box Springs", "Furniture", "Appliances"]
    }
  ],
  "affiliate_config": {
    "partner_name": "LoadUp",
    "custom_link_slug": "austin-tx-mattress-disposal",
    "base_price_display": "$80",
    "competitor_comparison": {
      "competitor_name": "National Junk Chains",
      "competitor_price": "$139",
      "value_prop": "No franchise fees. Just local haulers."
    }
  },
  "donation_policy": "Most charities in Austin (Salvation Army, Goodwill) do not accept used mattresses due to hygiene laws.",
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
- **hero_hook** (optional): City-specific pain point one-liner (e.g., "Don't want to drive to Trail Road?"). If not provided, defaults to generic message.
- **neighborhoods** (optional): Comma-separated list of 10-15 top neighborhoods for local SEO. Displayed in footer if provided.

### Geo Data (NEW - v4.0) - Schema.org & Maps Integration

- **geo** (object): Geographic coordinates for Schema.org ServiceArea JSON-LD and affiliate link pre-fill
  - **latitude** (number): Decimal latitude (e.g., 30.2672)
  - **longitude** (number): Decimal longitude (e.g., -97.7431)
  - **zip_codes** (array): 5-10 major ZIP codes for the city. Used to pre-fill affiliate booking forms (e.g., loadup.com/book?zip=78701), reducing friction and increasing conversion.

### SEO Overrides (NEW - v4.0) - Top City Optimization

- **seo** (object, optional): Hand-written overrides for high-value cities (NYC, LA, Austin, etc.)
  - **title_override** (string, optional): Custom title tag that beats programmatic templates (e.g., "Mattress Disposal in Austin: 2026 Drop-off Guide & Rules")
  - **meta_desc_override** (string, optional): Custom meta description with high-CTR copy (e.g., "Don't pay the $50 fine. Here is the official guide to Austin Resource Recovery rules, bulk pickup schedules, and private haulers.")
  - If not provided, page uses programmatic template defaults.

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
- **the_catch** (optional): The specific bureaucratic hurdle (e.g., "Bulk collection only happens 2x a year"). Highlighted in red if provided.
- **schedule_logic** (optional, object): FOMO Engine - Dynamic urgency based on pickup schedule
  - **type** (string): "fixed_dates", "weekly", "monthly", or "specific_weeks"
  - **dates_2026** (array): Specific pickup dates in YYYY-MM-DD format (e.g., ["2026-05-01", "2026-10-01"])
  - **frequency_display** (string): Human-readable frequency (e.g., "Twice a year (Spring/Fall)")
  - **missed_msg** (string, optional): Message shown when user just missed a pickup (e.g., "You just missed the spring pickup. Next one is in October (5 months away). Book a private hauler today.")

### Weather Profile (NEW - v5.0) - Wet Mattress Trigger

- **weather_profile** (object): Rain-based rejection psychology
  - **is_rain_heavy** (boolean): true for cities with frequent heavy rain (Seattle, Vancouver, Portland, etc.)
  - **rejection_risk_copy** (string, nullable): Warning message for rainy cities (e.g., "WARNING: Vancouver rain ruins mattresses. If it gets wet, the city WILL NOT take it. Our haulers pick up from inside your home."). Set to null for dry cities.

### Drop-off Locations (Array)

Each location must pass the "Facility Capability Test":

1. **Type Check**: Must be "Heavy Trash", "Landfill", or "Transfer Station" - NOT "Recycling Center"
2. **Item Verification**: Must explicitly accept mattresses or bulk waste
3. **Schedule Audit**: Exact hours verified (e.g., "Closed Mon, Tue-Sun 8am-5pm")

Fields:

- **name**: Exact facility name from official source
- **address**: Complete street address with ZIP code
- **google_maps_url** (NEW - v4.0, optional): Direct Google Maps link (e.g., "https://goo.gl/maps/..."). Mobile users click once to open navigation app. Google tracks these "helpful interactions" which boost rankings.
- **type**: MUST be "Heavy Trash", "Landfill", or "Transfer Station"
- **hours**: EXACT operating hours (e.g., "Tue-Sat 9am-6pm" or "Closed Mon, Tue-Sun 8am-5pm")
- **tipping_fee** (optional): Cost per item or per ton (e.g., "$15-20 depending on weight", "Free for residents"). Displayed prominently if provided.
- **residency_required** (optional): Boolean - true if they check ID. Shows warning icon if true.
- **notes**: Additional info (e.g., "Proof of residency required", "Mattresses accepted")
- **accepted_items** (NEW - v4.0, optional): Array of accepted items (e.g., ["Mattresses", "Box Springs", "Furniture"]). Helps with keyword density and user clarity.

### Affiliate Configuration (NEW - v4.0) - Revenue Optimization

- **affiliate_config** (object, optional): Per-city affiliate partner configuration
  - **partner_name** (string): Affiliate partner name (e.g., "LoadUp", "1-800-GOT-JUNK", "Junk King")
  - **custom_link_slug** (string): City-specific slug appended to base affiliate URL (e.g., "austin-tx-mattress-disposal" → yoursite.com/go/austin-tx-mattress-disposal)
  - **base_price_display** (string): Psychological price anchor displayed on page (e.g., "$80", "$99"). Sets expectation that makes DIY dump fees + truck rental + time look expensive by comparison.
  - **competitor_comparison** (NEW - v5.0, object, optional): Price dominance triangulation
    - **competitor_name** (string): Generic competitor reference (e.g., "National Junk Chains", "Major Franchises")
    - **competitor_price** (string): Typical competitor price (e.g., "$129+", "$159")
    - **value_prop** (string): Why your affiliate is better (e.g., "Save ~$50 vs major chains", "No franchise fees. Just local haulers.")
  - If not provided, uses default national partner.

### Donation Policy (String, optional)

- **donation_policy**: Statement about local charity policies (e.g., "Most charities in [City] do not accept used mattresses due to hygiene laws."). Creates FAQ entry if provided.

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

### God Mode Conversion Strategy (v4.0)

1. **Geo Data**: Always include latitude, longitude, and 5-10 major ZIP codes. This enables:
   - Schema.org ServiceArea markup (tells Google you serve this location)
   - Pre-filled affiliate links (loadup.com/book?zip=78701) - fewer clicks = higher conversion
   
2. **SEO Overrides**: For top 20-50 cities, hand-write title_override and meta_desc_override to test high-CTR copy. Templates are fine for the other 900 cities.

3. **Google Maps URLs**: Add google_maps_url to every drop-off location. Mobile users (your primary demographic) want one-click navigation. Google sees these clicks as "helpful interactions."

4. **Affiliate Config**: Set partner_name and base_price_display per city. The price anchor ("Starts at $80") makes DIY look expensive when dump fee + truck rental + gas + time adds up.

5. **Accepted Items**: List specific items in accepted_items array for keyword density and user clarity.

### Strict Constraints

- **No Recycling Centers**: Never list facilities that only accept recyclables (like Westpark in Houston)
- **Exact Hours**: If closed on Mondays, state "Closed Mon, Tue-Sun 8am-5pm" - not "Mon-Sat"
- **Phone Format**: Use specific department line or "3-1-1 (City General Line)"
- **Population**: Must be from 2020+ census, never estimated
- **Geo Coordinates**: Use decimal format (30.2672, not 30°16'2"N)

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

## Migration from v4.0 to v5.0 (Psychological Triggers)

Add these new fields to existing city records:

### 1. FOMO Engine (Optional - for cities with scheduled bulk pickup):
```json
{
  "curbside_rules": {
    // ... existing fields ...
    "schedule_logic": {
      "type": "specific_weeks",
      "dates_2026": ["2026-02-14", "2026-06-12", "2026-10-15"],
      "frequency_display": "Twice a year (Spring/Fall)",
      "missed_msg": "You missed the Feb pickup. Next free option is June (4 months wait)."
    }
  }
}
```

### 2. Weather Trigger (Required for all cities):
```json
{
  "weather_profile": {
    "is_rain_heavy": false,  // true for Seattle, Portland, Vancouver, etc.
    "rejection_risk_copy": null  // or "WARNING: Seattle rain ruins mattresses..."
  }
}
```

### 3. Competitor Anchor (Optional - add to affiliate_config):
```json
{
  "affiliate_config": {
    // ... existing fields ...
    "competitor_comparison": {
      "competitor_name": "National Junk Chains",
      "competitor_price": "$139+",
      "value_prop": "Save ~$50 vs major chains"
    }
  }
}
```

## Migration from v3.0 to v4.0 (God Mode)

Add these new fields to existing city records:

### Required for All Cities:
```json
{
  "geo": {
    "latitude": 30.2672,  // Look up on Google Maps
    "longitude": -97.7431,
    "zip_codes": ["78701", "78702", "78703", "78704", "78705"]  // 5-10 major ZIPs
  }
}
```

### Optional for Top 20-50 Cities:
```json
{
  "seo": {
    "title_override": "Mattress Disposal in Austin: 2026 Drop-off Guide & Rules",
    "meta_desc_override": "Don't pay the $50 fine. Official guide to Austin rules, bulk pickup, and private haulers."
  }
}
```

### Optional for Cities with Affiliate Deals:
```json
{
  "affiliate_config": {
    "partner_name": "LoadUp",
    "custom_link_slug": "austin-tx-mattress-disposal",
    "base_price_display": "$80"
  }
}
```

### Update Drop-off Locations:
```json
{
  "drop_off_locations": [
    {
      // ... existing fields ...
      "google_maps_url": "https://goo.gl/maps/...",  // Add this
      "accepted_items": ["Mattresses", "Box Springs", "Furniture"]  // Add this
    }
  ]
}
```

## Why These Changes Drive Revenue

1. **Geo Data** → Schema.org ServiceArea → Google shows you in local pack → More organic traffic
2. **Zip Codes** → Pre-filled affiliate links → Fewer steps → Higher conversion (typically 15-30% lift)
3. **SEO Overrides** → Hand-written titles for top cities → Higher CTR → More traffic
4. **Maps URLs** → One-click navigation → Better UX → Google sees "helpful interaction" → Ranking boost
5. **Price Anchor** → "$80" makes DIY ($20 dump + $40 truck + 3 hours) look expensive → More affiliate clicks

## v5.0 Psychological Triggers - The Final 5%

### 1. The FOMO Engine (schedule_logic)

Static text: "Bulk pickup available twice a year"
Dynamic trigger: "Next free pickup is in 5 days. Wait for it." OR "You just missed the spring pickup. Next one is in October (5 months away). Book a private hauler today."

Frontend calculates wait time based on current date vs dates_2026 array. Instant conversion when user realizes they just missed a pickup.

### 2. The Wet Mattress Trigger (weather_profile)

Static text: "Must be bagged for curbside pickup"
Dynamic trigger: "WARNING: Seattle rain ruins mattresses. If it gets wet, the city WILL NOT take it. Our haulers pick up from inside your home."

Sells peace of mind, not just junk removal. Especially powerful in rainy cities where curbside is a gamble.

### 3. The Competitor Anchor (competitor_comparison)

Static text: "Starts at $80"
Dynamic trigger: "National chains charge $139+. Save ~$50 with local haulers."

Triangulates the user between three options:
- Option 1 (DIY): $20 + Sweat + Truck Rental
- Option 2 (National Competitor): $159
- Option 3 (You): $80 ← The obvious choice

## Quick Reference: Adding v5.0 Fields to New Cities

### Step 1: Always Add Weather Profile
Every city needs this field. Set to `null` for dry cities:

```json
"weather_profile": {
  "is_rain_heavy": false,
  "rejection_risk_copy": null
}
```

For rainy cities (Seattle, Portland, Miami, etc.):
```json
"weather_profile": {
  "is_rain_heavy": true,
  "rejection_risk_copy": "WARNING: [City] rain ruins mattresses. If it gets wet, the city WILL NOT take it. Our haulers pick up from inside your home."
}
```

### Step 2: Add Schedule Logic (If Applicable)
Only for cities with scheduled bulk pickup (not weekly):

```json
"curbside_rules": {
  // ... existing fields ...
  "schedule_logic": {
    "type": "specific_weeks",
    "dates_2026": ["2026-02-14", "2026-06-12", "2026-10-15"],
    "frequency_display": "Three times a year (Feb/Jun/Oct)",
    "missed_msg": "You missed the [month] pickup. Next free option is [month] ([X] months wait)."
  }
}
```

### Step 3: Add Competitor Comparison (Optional)
For top cities with affiliate deals:

```json
"affiliate_config": {
  // ... existing fields ...
  "competitor_comparison": {
    "competitor_name": "National Junk Chains",
    "competitor_price": "$139+",
    "value_prop": "No franchise fees. Just local haulers."
  }
}
```

---

## Migration from v2.0

If you have old data format, map fields as follows:

- `population` (number) → `population.count`
- `mattress_rules` (string) → `curbside_rules.mattress_specific_rule`
- `pickup_service_available` (boolean) → `curbside_rules.is_available`
- `pickup_phone` → `contacts.official_phone`
- `illegal_dumping_fine` → `illegal_dumping.fine_amount`
- `data_confidence` → `audit_metadata.confidence_score`
- `sources_checked` → `audit_metadata.sources_used`
