# Zipcode Page Template - Detailed Specification

## URL Pattern
`/[zipcode]` → Example: `/02108`, `/02139`, `/02145`

## Page Purpose
Capture hyper-local searches like "02108 mattress disposal" or "mattress removal near 02139"

---

## Data Structure

```javascript
const ZIPCODE_DATA = {
  zipcode: "02108",
  neighborhood: "Downtown Boston",
  city: "Boston",
  state: "Massachusetts",
  stateAbbr: "MA",
  county: "Suffolk County",
  
  // Geographic
  coordinates: { lat: 42.3601, lng: -71.0589 },
  population: "12,500",
  
  // Inherit from parent city
  parentCitySlug: "boston",
  parentCityData: BOSTON_DATA, // Reference to city data
  
  // Zipcode-specific
  nearestFacilities: [
    // Sorted by distance from zipcode center
    {
      name: "Boston Recycling Center",
      distance: "1.2 miles",
      driveTime: "5 mins",
      ...facilityData
    }
  ],
  
  // Nearby zipcodes
  nearbyZipcodes: ["02109", "02110", "02111"],
  
  // Local haulers serving this zip
  localHaulers: [
    {
      name: "Boston Junk Removal",
      servesZip: true,
      rating: 4.8,
      priceRange: "$89-$150"
    }
  ]
};
```

---

## Page Layout

### 1. Hero Section
```
H1: Mattress Disposal in [Zipcode] ([Neighborhood], [City])
Subheading: Fast, affordable mattress removal serving [zipcode]. 
            Same-day pickup available.

Search Bar: [Service] [Zipcode] [Search Button]

Trust Badges: ✓ Licensed Pros  ✓ Same-Day  ✓ Eco-Friendly
```

### 2. Quick Info Card
```
📍 Location: [Neighborhood], [City], MA
👥 Population: [population]
🏛️ County: [County]
📞 City Contact: [phone]
🗑️ Pickup Schedule: [schedule]
```

### 3. Nearest Drop-Off Facilities
```
Title: Where to Drop Off a Mattress Near [Zipcode]

[Facility Card 1]
- Name
- Distance from [zipcode]: 1.2 miles (5 min drive)
- Address
- Hours
- Fees
- Phone
- [Get Directions Button]

[Facility Card 2]
[Facility Card 3]
```

### 4. Local Rules Section
```
Title: Mattress Disposal Rules for [Zipcode]

Inherited from [City]:
- Wrapping requirement: [rule]
- Placement time: [time]
- Size limits: [limits]
- Fine for illegal dumping: [amount]

[Link to full city page for more details]
```

### 5. Professional Haulers
```
Title: Professional Mattress Removal in [Zipcode]

[Pro Card 1]
[Pro Card 2]
[Pro Card 3]

All pros are:
✓ Background checked
✓ Licensed & insured
✓ Serving [zipcode] area
```

### 6. Nearby Areas
```
Title: Mattress Disposal in Nearby Areas

[Card: Nearby Zipcode 1] → Link to /02109
[Card: Nearby Zipcode 2] → Link to /02110
[Card: Nearby Zipcode 3] → Link to /02111

[Link to parent city page: View all of Boston →]
```

### 7. FAQs (Zipcode-specific)
```
Q: Is mattress disposal free in [zipcode]?
A: [City] offers curbside pickup for [zipcode] residents...

Q: What's the nearest drop-off location to [zipcode]?
A: The closest facility is [name] at [distance] away...

Q: Do I need to schedule pickup in [zipcode]?
A: Yes, [city] requires...

Q: How much does professional removal cost in [zipcode]?
A: Prices typically range from [range]...
```

### 8. Breadcrumbs
```
Home > Massachusetts > Suffolk County > Boston > Downtown Boston > 02108
```

---

## SEO Elements

### Title Tag
`Mattress Disposal in [Zipcode] ([Neighborhood], [City]) | DisposalGrid`

### Meta Description
`Need mattress disposal in [zipcode]? Find drop-off locations, pickup schedules, and professional haulers serving [neighborhood], [city]. Same-day service available.`

### H1
`Mattress Disposal in [Zipcode] ([Neighborhood], [City], MA)`

### H2s
- Where to Drop Off a Mattress Near [Zipcode]
- Mattress Disposal Rules for [Zipcode]
- Professional Mattress Removal in [Zipcode]
- Mattress Disposal in Nearby Areas
- Frequently Asked Questions

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Mattress Disposal in [Zipcode]",
  "areaServed": {
    "@type": "PostalCode",
    "postalCode": "[zipcode]",
    "addressLocality": "[city]",
    "addressRegion": "MA"
  },
  "provider": {
    "@type": "Organization",
    "name": "DisposalGrid"
  }
}
```

---

## Content Strategy

### Unique Content (20%)
- Zipcode-specific intro paragraph
- Distance calculations to facilities
- Nearby zipcode recommendations
- Zipcode-specific FAQs

### Inherited Content (80%)
- City rules and regulations
- Facility details (from city page)
- Municipal contacts
- General FAQs

### Internal Links
- Link to parent city page (3-5 times)
- Link to neighborhood page
- Link to nearby zipcode pages
- Link to county page
- Link to state page
- Link to relevant service pages

---

## Component Structure

```jsx
// src/pages/Zipcode.jsx
import ZipcodeHero from "@/components/zipcode/ZipcodeHero";
import QuickInfoCard from "@/components/zipcode/QuickInfoCard";
import NearestFacilities from "@/components/zipcode/NearestFacilities";
import LocalRules from "@/components/zipcode/LocalRules";
import ProHaulers from "@/components/zipcode/ProHaulers";
import NearbyAreas from "@/components/zipcode/NearbyAreas";
import ZipcodeFAQ from "@/components/zipcode/ZipcodeFAQ";

export default function Zipcode({ zipcodeData }) {
  return (
    <div className="min-h-screen bg-background">
      <ZipcodeHero data={zipcodeData} />
      <QuickInfoCard data={zipcodeData} />
      <NearestFacilities data={zipcodeData} />
      <LocalRules data={zipcodeData} />
      <ProHaulers data={zipcodeData} />
      <NearbyAreas data={zipcodeData} />
      <ZipcodeFAQ data={zipcodeData} />
    </div>
  );
}
```

---

## Data Generation Script

```python
# generate_zipcode_pages.py

import json

def generate_zipcode_page(zipcode, city_data):
    """Generate zipcode page data from city data"""
    
    # Get zipcode details
    zipcode_info = get_zipcode_info(zipcode)  # From database
    
    # Calculate distances to facilities
    facilities_with_distance = []
    for facility in city_data['drop_off_locations']:
        distance = calculate_distance(
            zipcode_info['coordinates'],
            facility['coordinates']
        )
        facilities_with_distance.append({
            **facility,
            'distance': f"{distance:.1f} miles",
            'driveTime': estimate_drive_time(distance)
        })
    
    # Sort by distance
    facilities_with_distance.sort(key=lambda x: float(x['distance'].split()[0]))
    
    return {
        'zipcode': zipcode,
        'neighborhood': zipcode_info['neighborhood'],
        'city': city_data['city_name'],
        'state': city_data['state_name'],
        'stateAbbr': city_data['state_abbr'],
        'county': zipcode_info['county'],
        'coordinates': zipcode_info['coordinates'],
        'population': zipcode_info['population'],
        'parentCitySlug': city_data['city_slug'],
        'nearestFacilities': facilities_with_distance[:3],
        'nearbyZipcodes': get_nearby_zipcodes(zipcode),
        'cityRules': city_data['curbside_rules'],
        'cityContacts': city_data['contacts'],
        'illegalDumping': city_data['illegal_dumping'],
    }

# Generate all zipcode pages
for city_data in all_cities_data:
    zipcodes = get_zipcodes_for_city(city_data['city_name'])
    for zipcode in zipcodes:
        zipcode_data = generate_zipcode_page(zipcode, city_data)
        save_zipcode_page(zipcode_data)
```

---

## Example: 02108 Page

### URL
`/02108`

### Title
`Mattress Disposal in 02108 (Downtown Boston, MA) | DisposalGrid`

### H1
`Mattress Disposal in 02108 (Downtown Boston, Boston, MA)`

### Content Preview
```
Looking for mattress disposal in 02108? Downtown Boston residents have 
multiple options for eco-friendly mattress removal. Whether you need 
curbside pickup or want to drop off at a nearby facility, we've got you 
covered.

📍 Location: Downtown Boston, Boston, MA
👥 Population: 12,500
🏛️ County: Suffolk County
📞 City Contact: (617) 635-5300

Nearest Drop-Off Facilities:
1. Boston Recycling Center - 1.2 miles (5 min drive)
2. MA DEP Facility - 2.3 miles (8 min drive)
3. Wayland Transfer Station - 15.4 miles (25 min drive)

[Continue with full page content...]
```

---

## Benefits of Zipcode Pages

1. **Low Competition**: Most competitors don't create zipcode pages
2. **High Intent**: People searching by zipcode are ready to act
3. **Easy to Rank**: Less competitive than city pages
4. **Scalable**: Can generate hundreds automatically
5. **Local Authority**: Shows comprehensive coverage

---

## Maintenance

### Update Frequency
- **Quarterly**: Review and update facility distances
- **Annually**: Update population data
- **As Needed**: Update when city rules change

### Quality Checks
- Verify all distances are accurate
- Ensure parent city data is current
- Check for broken links
- Validate phone numbers
- Test "Get Directions" links

---

## Success Metrics

### Target Rankings (6 months)
- 70% of zipcode pages in top 5
- 50% of zipcode pages in top 3
- 30% of zipcode pages in position 1

### Traffic Goals
- Average 50-200 visits/month per zipcode page
- Total: 10,000-40,000 visits/month from 200 zipcode pages

### Conversion Goals
- 5-10% conversion rate (higher than city pages)
- Strong local intent = higher conversions
