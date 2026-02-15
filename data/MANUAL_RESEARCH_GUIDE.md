# Manual Data Collection Guide

## Quick Research Process (15 min per city)

### Step 1: Find Official Rules
Google: `[City Name] bulk trash mattress disposal site:.gov`

Look for:
- City sanitation/solid waste department page
- Bulk item collection rules
- Mattress-specific requirements (wrapping, scheduling)

### Step 2: Find Drop-off Locations
Google: `[City Name] recycling center mattress`

Check:
- City transfer stations
- Household hazardous waste facilities
- Recycling centers that accept bulky items

### Step 3: Find Pickup Services
- Check if city offers bulk pickup (usually yes)
- Find phone number (usually 311 or sanitation dept)
- Note if appointment required

### Step 4: Find Penalties
Google: `[City Name] illegal dumping fine`

---

## Example: Austin, TX (Template)

**Research URLs:**
- https://www.austintexas.gov/department/bulky-collection
- https://www.austintexas.gov/department/recycle-drop-centers

**Data Collected:**
```json
{
  "city_slug": "austin-tx",
  "city_name": "Austin",
  "state_name": "Texas",
  "state_slug": "texas",
  "state_abbr": "TX",
  "population": 961855,
  "mattress_rules": "Mattresses must be wrapped in plastic for curbside pickup. Schedule online at AustinTexas.gov or call 311.",
  "dropoff_locations": [
    {
      "name": "Recycle & Reuse Drop-off Center",
      "address": "2514 Business Center Dr, Austin, TX 78744",
      "phone": "(512) 974-4343",
      "hours": "Tue-Sat 8am-6pm",
      "accepts_mattresses": true
    }
  ],
  "pickup_service_available": true,
  "pickup_phone": "311",
  "illegal_dumping_fine": "$500-$2000",
  "last_updated": "2026-02-14"
}
```

---

## Top 5 Cities to Research First

1. **Austin, TX** - Example above
2. **New York, NY** - Start with NYC.gov/sanitation
3. **Los Angeles, CA** - Check LASAN (LA Sanitation)
4. **Chicago, IL** - Check chicago.gov/streets
5. **Houston, TX** - Check houstontx.gov/solidwaste

**Time Budget:** 1-2 hours for all 5 cities

---

## Shortcut: Hire a VA

If you don't want to do this manually:
1. Go to Upwork.com
2. Post: "Need research on mattress disposal rules for 50 US cities"
3. Budget: $50-100
4. Provide this template
5. Get results in 24-48 hours
