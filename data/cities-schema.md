# City Data Schema

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
      "lat": 30.2241,
      "long": -97.6272,
      "accepts_mattresses": true
    }
  ],
  "pickup_service_available": true,
  "pickup_phone": "311",
  "illegal_dumping_fine": "$500-$2000",
  "last_updated": "2026-02-14"
}
```

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
