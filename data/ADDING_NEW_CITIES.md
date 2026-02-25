# Adding New Cities Guide (v4.0 - God Mode)

This guide explains how to add new cities to the disposal guide system. The template is designed to work dynamically with or without optional fields.

## Schema Version: v4.0 (God Mode)

Version 4.0 adds strategic fields for Schema.org rich snippets, Google Maps integration, and affiliate conversion optimization. See `GOD_MODE_UPGRADE.md` for detailed rationale.

## Required Fields (Must Have)

Every city MUST have these fields:

```json
{
  "city_slug": "city-name-st",
  "city_name": "City Name",
  "state_name": "State Name",
  "state_slug": "state-name",
  "state_abbr": "ST",
  "geo": {
    "latitude": 30.2672,
    "longitude": -97.7431,
    "zip_codes": ["12345", "12346", "12347", "12348", "12349"]
  },
  "population": {
    "count": 123456,
    "year": 2020,
    "source": "https://census.gov/..."
  },
  "contacts": {
    "official_phone": "3-1-1 (City General Line)",
    "department_name": "Department Name",
    "website_url": "https://city.gov/..."
  },
  "curbside_rules": {
    "is_available": true,
    "mattress_specific_rule": "Rule text here",
    "placement_time": "Before 7am on collection day",
    "size_limits": "Size/weight limits"
  },
  "drop_off_locations": [],
  "illegal_dumping": {
    "fine_amount": "Up to $X,XXX",
    "citation": "Code Section X-X-X"
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
    "sources_used": ["https://..."],
    "last_updated": "2026-02-18"
  }
}
```

## God Mode Fields (v4.0)

### NEW REQUIRED: `geo` Object
**Purpose**: Enables Schema.org ServiceArea markup and affiliate link pre-filling.

```json
"geo": {
  "latitude": 30.2672,
  "longitude": -97.7431,
  "zip_codes": ["78701", "78702", "78703", "78704", "78705"]
}
```

**How to Get:**
1. Search city name on Google Maps
2. Right-click city center → "What's here?"
3. Copy decimal coordinates (30.2672, -97.7431)
4. Find 5-10 major ZIP codes covering the metro area

**Why It Matters:**
- Schema.org markup tells Google you serve this location → Local pack visibility
- Pre-filled ZIP codes in affiliate links → 15-30% conversion lift

---

## Optional Fields (Recommended for SEO & Conversion)

### 1. `seo` Object (NEW - v4.0)
**Purpose**: Hand-written titles/descriptions for top cities that beat programmatic templates.

```json
"seo": {
  "title_override": "Mattress Disposal in Austin: 2026 Drop-off Guide & Rules",
  "meta_desc_override": "Don't pay the $2,000 fine. Official guide to Austin Resource Recovery rules, bulk pickup schedules, and private haulers."
}
```

**When to Use**: Top 20-50 cities by population or search volume.

**Fallback**: Uses programmatic template: "Mattress Disposal in [City], [State] | Free Guide"

**Best Practices**:
- Add year ("2026") for freshness signal
- Include urgency ("Don't pay the fine")
- Mention specific local department names
- Keep title under 60 characters

---

### 2. `affiliate_config` Object (NEW - v4.0)
**Purpose**: Per-city affiliate partner configuration and price anchoring.

```json
"affiliate_config": {
  "partner_name": "LoadUp",
  "custom_link_slug": "austin-tx-mattress-disposal",
  "base_price_display": "$80"
}
```

**Why It Matters:**
- Different cities can have different partners (LoadUp vs. 1-800-GOT-JUNK)
- Price anchor makes DIY look expensive ($20 dump + $40 truck + time = "$80 looks cheap")
- Typical conversion lift: 10-20%

**Fallback**: Uses default national partner if not provided.

---

### 3. `drop_off_locations[].google_maps_url` (NEW - v4.0)
**Purpose**: One-click navigation for mobile users.

```json
"drop_off_locations": [
  {
    "google_maps_url": "https://maps.app.goo.gl/8VqYzKxPjNzJvZYu9"
  }
]
```

**How to Get:**
1. Search facility address on Google Maps
2. Click "Share" → "Copy link"
3. Use shortened format (maps.app.goo.gl)

**Why It Matters:**
- Mobile users (70%+ of traffic) want one-click navigation
- Google tracks exit clicks as "helpful interactions" → Ranking boost

---

### 4. `drop_off_locations[].accepted_items` (NEW - v4.0)
**Purpose**: Keyword density and user clarity.

```json
"drop_off_locations": [
  {
    "accepted_items": ["Mattresses", "Box Springs", "Furniture", "Appliances"]
  }
]
```

**Why It Matters:**
- More mentions of "mattresses" = Better ranking
- Users see exactly what's accepted without reading paragraphs

---

### 5. `hero_hook` (string, optional)
**Purpose**: City-specific pain point that appears prominently in the hero section.

**Examples**:
- "Don't want to drive to Trail Road?"
- "Can't carry it down five flights of stairs?"
- "Don't want to haul it in 115-degree desert heat?"

**Fallback**: If not provided, displays: "Need to dispose of a mattress in [City Name]?"

**Best Practices**:
- Keep it under 60 characters
- Focus on a specific local pain point
- Reference local landmarks or conditions when possible

---

### 6. `neighborhoods` (string, optional)
**Purpose**: Comma-separated list of 10-15 neighborhoods for local SEO.

**Example**:
```
"Hyde Park, Zilker, East Austin, South Congress, Barton Hills, Clarksville, Bouldin Creek, Travis Heights, Allandale, Rosedale, Tarrytown, Mueller, Domain, Westlake, Bee Cave"
```

**Fallback**: If not provided, the neighborhoods section doesn't appear.

**Best Practices**:
- Include 10-15 well-known neighborhoods
- Mix affluent and working-class areas
- Include nearby suburbs if relevant
- Separate with commas and spaces

---

### 7. `curbside_rules.the_catch` (string, optional)
**Purpose**: Highlights the main bureaucratic hurdle in red text.

**Examples**:
- "Bulk collection only happens 2x a year per address"
- "Must be sealed in a plastic bag to prevent bedbugs or it will NOT be collected"
- "Items over 150 lbs or 8 feet will NOT be collected - you must haul them yourself"

**Fallback**: If not provided, only shows generic cons list.

**Best Practices**:
- Focus on the MOST frustrating rule
- Use strong language ("will NOT", "MUST")
- Keep it under 100 characters

---

### 8. `drop_off_locations[].tipping_fee` (string, optional)
**Purpose**: Shows cost prominently to make paid pickup seem cheaper.

**Examples**:
- "$15-20 depending on weight"
- "Free for residents"
- "$30-50 depending on weight and vehicle type"

**Fallback**: If not provided, cost line doesn't appear.

**Best Practices**:
- Always include if there's a fee
- Use ranges when exact cost varies
- Mention "Free for residents" when applicable

---

### 9. `drop_off_locations[].residency_required` (boolean, optional)
**Purpose**: Shows warning icon if ID check is required.

**Example**: `true` or `false`

**Fallback**: If not provided or false, no warning appears.

**Best Practices**:
- Set to `true` if facility checks ID
- Set to `false` or omit if open to all

---

### 10. `donation_policy` (string, optional)
**Purpose**: Creates an FAQ entry explaining why charities don't accept mattresses.

**Example**:
```
"Most charities in Austin (Salvation Army, Goodwill) do not accept used mattresses due to hygiene laws and bed bug concerns."
```

**Fallback**: If not provided, donation FAQ doesn't appear.

**Best Practices**:
- Mention specific local charities
- Explain the reason (hygiene laws, bed bugs)
- Keep it factual and helpful

---

## God Mode City Example (Austin)

See the Austin entry in `cities.json` for a complete God Mode reference implementation with all v4.0 fields.

## Minimal Valid City Example

This is the absolute minimum required to create a working city page:

```json
{
  "city_slug": "smalltown-st",
  "city_name": "Smalltown",
  "state_name": "State",
  "state_slug": "state",
  "state_abbr": "ST",
  "geo": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "zip_codes": ["12345", "12346", "12347"]
  },
  "population": {
    "count": 50000,
    "year": 2020,
    "source": "https://census.gov/..."
  },
  "contacts": {
    "official_phone": "3-1-1 (City General Line)",
    "department_name": "Public Works",
    "website_url": "https://smalltown.gov"
  },
  "curbside_rules": {
    "is_available": false,
    "mattress_specific_rule": "No curbside pickup available",
    "placement_time": "N/A",
    "size_limits": "N/A"
  },
  "drop_off_locations": [],
  "illegal_dumping": {
    "fine_amount": "Up to $500",
    "citation": "Municipal Code"
  },
  "audit_metadata": {
    "confidence_score": "MEDIUM",
    "verification_checklist": {
      "gov_source_found": true,
      "mattress_rule_verified": true,
      "facility_hours_verified": false,
      "facility_type_verified": false,
      "population_census_verified": true
    },
    "sources_used": ["https://smalltown.gov"],
    "last_updated": "2026-02-18"
  }
}
```

This will create a functional page that:
- Uses generic hero hook
- Shows no neighborhoods section
- Displays basic curbside info
- Shows no drop-off locations
- Creates 2 FAQ entries (free disposal, illegal dumping)
- Uses default affiliate partner

## Scaling to 1,000+ Cities

The template is designed to scale efficiently:

1. **Batch Data Collection**: Use the scraper scripts in `/scripts` to collect data
2. **Prioritize Required Fields**: Get all required fields first (including geo data)
3. **Add Optional Fields Later**: Enhance high-traffic cities with optional fields
4. **Use Fallbacks**: Pages work without optional fields
5. **Automate Where Possible**: Generate generic hero hooks based on city characteristics

### Suggested Priority Order:

**Tier 1 (Top 50 cities)**: All God Mode fields (geo, seo, affiliate_config, google_maps_url, accepted_items) + hero_hook, neighborhoods, the_catch, tipping_fees, donation_policy

**Tier 2 (Cities 51-200)**: Required fields + geo + hero_hook + the_catch + google_maps_url

**Tier 3 (Cities 201-1000+)**: Required fields + geo only (use fallbacks for everything else)

## Testing New Cities

After adding a city to `data/cities.json`:

1. Restart the dev server
2. Visit: `/disposal-guides/[state-slug]/[city-slug]`
3. Check that all sections render properly
4. Verify fallbacks work if optional fields are missing
5. Test on mobile and desktop
6. Verify Schema.org markup in page source (if implemented)

## Common Mistakes to Avoid

❌ **Don't** leave required fields empty or null
❌ **Don't** forget the `geo` object (required in v4.0)
❌ **Don't** use inconsistent slug formats (use lowercase with hyphens)
❌ **Don't** forget to update `last_updated` date
❌ **Don't** copy/paste hero hooks between cities (make them unique)
❌ **Don't** use degree notation for coordinates (use decimal: 30.2672, not 30°16'2"N)
✅ **Do** verify all government sources
✅ **Do** test the page after adding
✅ **Do** use proper JSON formatting
✅ **Do** include at least one source in `sources_used`
✅ **Do** add geo data for Schema.org markup
✅ **Do** use Google Maps shortened URLs (maps.app.goo.gl)

## See Also

- `cities-schema.md` - Complete field documentation
- `GOD_MODE_UPGRADE.md` - Detailed rationale for v4.0 changes
- `MANUAL_RESEARCH_GUIDE.md` - How to research city data
