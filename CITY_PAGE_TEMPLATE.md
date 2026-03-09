# City Page Template

## Page Structure (Los Angeles Example)

This template documents the exact layout and component order for City-level pages.

---

## Component Order (Top to Bottom)

### 1. **CityHero**
**Purpose:** First impression, captures "lazy/rich" cohort immediately  
**Location:** `src/components/city/CityHero.jsx`

**Contains:**
- Breadcrumb navigation (Home > Cities > State > City)
- Location badge with city, state, last updated date
- Main headline: "Mattress Disposal in [City, State]"
- Subheadline: "The 2026 Guide to Drop-off Centers, Curbside Rules, and Private Haulers"
- Warning banner: Red alert with illegal dumping fine (e.g., "$500 citation")
- Primary CTA: "Skip the Hassle — See Instant Pro Pricing"
- Zip code badges (6 covered zip codes)
- Interactive map with animated radar blip

**Data Required:**
```javascript
{
  city: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  zipCodes: ["90001", "90012", "90021", "90028", "90035", "90045"],
  heroHookStatement: "Don't risk a $500 citation for illegal dumping in LA.",
  fineAmount: "$500",
  lastUpdated: "February 27, 2026"
}
```

---

### 2. **TriggerRibbon**
**Purpose:** Builds environmental friction with urgency triggers  
**Location:** `src/components/city/TriggerRibbon.jsx`

**Contains:** 3 urgency cards
1. **Weather Risk** (Yellow)
   - Weather profile (e.g., "Rainy Season Nov-Mar")
   - Warning: "Wet mattresses are automatically rejected"
   
2. **Pickup Countdown** (Orange)
   - Next municipal pickup availability
   - Warning: "Schedules fill quickly"
   
3. **Market Rate** (Blue)
   - Current pro rates (e.g., "$75-$180")
   - Note: "Prices rise on weekends"

**Data Required:**
```javascript
{
  weatherProfile: "Rainy Season (Nov–Mar)",
  nextPickupDays: 9,
  competitorComparisonPrice: "$75–$180"
}
```

---

### 3. **ChoiceMatrix** (THE CONTRAST)
**Purpose:** Side-by-side comparison showing massive DIY friction vs. zero-friction Pro option  
**Location:** `src/components/city/ChoiceMatrix.jsx`

**Contains:**
- Heading: "Compare Your Options in [City]"
- Subheading: "Professional haulers vs. DIY — see the difference"

**Two-column comparison:**

**Left Card - DIY Option** (Gray border)
- Header: "City Drop-Off / Self-Haul"
- Pros (green checkmarks):
  - Cost info (e.g., "Free with permit or $28.50 tip fee")
- Cons (red X marks):
  - Truck required
  - Heavy lifting (75-100 lbs)
  - Strict bagging rules
  - Limited hours
  - **Highlighted catch**: Scheduling requirement
- Warning: "High friction — most people abandon this route"

**Right Card - Professional Haulers** (Blue border, recommended)
- Header: "Licensed Network Pros"
- Badge: "Professional Haulers"
- Pros (green checkmarks):
  - In-home removal
  - Zero heavy lifting
  - Eco-recycling certified
  - Same/next-day availability
  - Instant online pricing
- Cost: Starting price (e.g., "From $89")
- CTA button: "See Available Haulers Below ↓" (scrolls down)

**Data Required:**
```javascript
{
  city: "Los Angeles",
  cityCostInfo: "Free (permit required) or $28.50 tip fee",
  baggingRules: "Plastic wrap required (city mandate)",
  hoursDays: "Sat–Sun 7AM–3PM only",
  theCatch: "Must schedule 14 days in advance online",
  basePriceDisplay: "From $89"
}
```

---

### 4. **CityProFeed** (THE SALE)
**Purpose:** Shows available haulers with filters  
**Location:** `src/components/city/CityProFeed.jsx`

**Contains:**
- Heading: "Available Haulers in [City]"
- Subheading: "Compare licensed professionals near [zip]"
- **Left Sidebar** (sticky, desktop only):
  - DIY Info Card (amber) - Shows DIY cons
  - Filter controls:
    - Eco-Friendly toggle
    - Same-Day toggle
    - Licensed toggle
    - Upfront Pricing toggle
    - Max Price slider ($0-$300)
  - Trust badge: "All pros are background-checked"
  
- **Right Main Feed**:
  - Pro cards (12 haulers shown)
    - Company name, rating, reviews
    - Price range
    - Distance from zip
    - Service badges (eco, same-day, licensed)
    - "View Profile" button
  - "Show 8 More Haulers" button

**Data Required:**
```javascript
{
  city: "Los Angeles",
  zipCodes: ["90012"]
}
```

---

### 5. **CityFAQ** (OBJECTION HANDLING)
**Purpose:** Answer questions specifically about booking a pro  
**Location:** `src/components/city/CityFAQ.jsx`

**Contains:**
- Heading: "Frequently Asked Questions"
- Subheading: "Local rules, costs, and policies — answered."
- FAQ accordion (4-6 questions)
  - Questions focus on booking pros, pricing, requirements
  - Examples: "Do I need to be home?", "Are there hidden fees?", "What if I need to cancel?"
- Neighborhoods section showing service coverage

**Data Required:**
```javascript
{
  city: "Los Angeles",
  faqs: [
    {
      q: "Is mattress disposal free in Los Angeles?",
      a: "The City of LA offers free bulky item pickup twice per year..."
    }
    // ... more FAQs
  ],
  neighborhoods: ["Downtown LA", "Silver Lake", ...]
}
```

---

### 6. **CityCTA** (FINAL PUSH)
**Purpose:** Final conversion push to book  
**Location:** `src/components/city/CityCTA.jsx`

**Contains:**
- Badge: "Local Pros Available Now"
- Headline: "Skip the Hassle in [City]."
- Subheadline: Benefits summary
- Trust badges (background-checked, eco-compliant, same-day)
- Primary CTA button: "Check Availability in [City]"
- Fine print: "No credit card required to check pricing"

**Data Required:**
```javascript
{
  city: "Los Angeles",
  basePriceDisplay: "From $89"
}
```

---

### 7. **MunicipalRulebook** (SEO ANCHOR - DE-EMPHASIZED)
**Purpose:** Show the red tape and strict rules of DIY (for SEO and hard "no" buyers)  
**Location:** `src/components/city/MunicipalRulebook.jsx`
**Styling:** Light gray background (bg-gray-50) to visually de-emphasize

**Contains:**
- Heading: "Can I Leave It on the Curb in [City]?"
- Status banner (color-coded):
  - Yellow: "Conditionally Allowed — Strict Rules Apply"
  - Rejection warning: "Rejected at the curb if: not wrapped, placed too early, or suspected of bed bugs"
  
- **3-column data grid:**
  1. Mattress Rule (blue) - e.g., "Must be wrapped in plastic"
  2. Placement Time (orange) - e.g., "No earlier than 6PM night before"
  3. Size Limits (purple) - e.g., "Max 2 per household"
  
- **Illegal Dumping Warning** (red box):
  - Fine amount prominently displayed
  - Enforcement details (cameras, hotlines)
  
- **Official Contact Card**:
  - Department name
  - Phone number (clickable)
  - Official website link

**Data Required:**
```javascript
{
  city: "Los Angeles",
  availabilityStatus: "conditional",
  mattressSpecificRule: "Must be wrapped in plastic before curbside placement",
  placementTime: "No earlier than 6PM the night before pickup",
  sizeLimits: "Max 2 mattresses per household per collection",
  fineAmount: "$500",
  officialDept: "LA Sanitation & Environment",
  officialPhone: "(800) 773-2489",
  websiteUrl: "https://www.lacity.org/lasan"
}
```

---

### 8. **DropOffCenters** (SEO ANCHOR - DE-EMPHASIZED)
**Purpose:** Show true cost of DIY with calculator (for SEO and time-on-page metrics)  
**Location:** `src/components/city/DropOffCenters.jsx`
**Styling:** Light gray background (bg-gray-50) to visually de-emphasize

**Contains:**
- Heading: "Where to Dump a Mattress in [City]"
- **Truck Requirement Warning** (orange box):
  - "🚚 Minimum 6ft truck bed required"
  - Warning about folding in SUVs/sedans
  
- **Left: Location Cards** (3 facilities)
  Each card shows:
  - Map thumbnail with pin icon
  - Facility number badge
  - Facility name and type
  - Price (large, prominent)
  - Address with map pin
  - Hours with clock icon
  - Accepted items (green badges)
  - Residency requirement (yellow warning)
  - "Get Directions" button
  
- **Right: DIY Cost Calculator** (sticky sidebar)
  - Breakdown:
    - Dump tip fee (e.g., $28.50)
    - Truck rental ($40)
    - Gas & Your Time ($35 - "3 hours @ $10/hr + fuel")
  - **Total DIY Cost** (red, bold) - e.g., $103.50
  - vs.
  - **Professional Pickup** (blue, bold) - e.g., "From $89"
  - Note: "Zero lifting. Done in 30 minutes"
  - CTA: "Book a Pro Instead →"

**Data Required:**
```javascript
{
  city: "Los Angeles",
  basePriceDisplay: "From $89",
  locations: [
    {
      name: "Antelope Valley Recycling Center",
      type: "City Landfill / Transfer Station",
      address: "1200 W. City Ranch Rd, Palmdale, CA 93551",
      hours: "Mon–Sat 7:00AM–4:00PM",
      tippingFee: "$28.50",
      accepted: ["Mattresses", "Box Springs", "Furniture"],
      residencyReq: "LA County residents only. Photo ID required.",
      mapsUrl: "https://maps.google.com/?q=..."
    }
    // ... 2 more locations
  ]
}
```

---

## Summary: The Conversion-Optimized Flow

**The New Order (Education to Conversion):**

1. **CityHero** - Hook with big promise and clear CTA
2. **TriggerRibbon** - Establish urgency (weather, delays, pricing)
3. **ChoiceMatrix** - Visual contrast of DIY friction vs. Pro ease
4. **CityProFeed** - Show the pros, let them see ratings and prices
5. **CityFAQ** - Answer objections about booking a pro
6. **CityCTA** - Final push to book
7. **MunicipalRulebook** - SEO anchor (de-emphasized with light gray bg)
8. **DropOffCenters** - SEO anchor (de-emphasized with light gray bg)

**Key Changes:**
- ChoiceMatrix moved up to position 3 (right after urgency triggers)
- CityProFeed immediately follows the contrast
- CityFAQ moved up to handle objections right after seeing pros
- CityCTA provides final conversion push
- MunicipalRulebook & DropOffCenters pushed to bottom with lighter backgrounds
- Removed UGCCarousel to minimize distractions from conversion path

**Rationale:**
Users who scroll past CityCTA to MunicipalRulebook/DropOffCenters are likely hard "no" buyers on professional services. We still provide DIY info for SEO value and time-on-page metrics, but visually de-emphasize it to avoid distracting conversion-ready users.

---

### UGCCarousel (REMOVED FROM FLOW)
**Purpose:** Social proof with recent jobs  
**Location:** `src/components/marketplace/UGCCarousel.jsx`

**Contains:**
- Heading: "Recent Jobs Completed in [City]"
- Carousel of customer testimonials:
  - Before/after photos
  - Customer name and neighborhood
  - Job details
  - Rating

**Data Required:**
```javascript
{
  city: "Los Angeles"
}
```

---

### 8. **CityFAQ**
**Purpose:** Answer common questions and show neighborhoods  
**Location:** `src/components/city/CityFAQ.jsx`

**Contains:**

**Left Column - FAQ Accordion:**
- Heading: "Frequently Asked Questions"
- 4 expandable questions:
  1. "Is mattress disposal free in [City]?"
  2. "Does a mattress need to be wrapped or bagged?"
  3. "Can I donate my mattress instead?"
  4. "What are the fines for illegal dumping in [City]?"
- Click to expand/collapse
- Active question highlighted in blue

**Right Column - Neighborhoods:**
- Heading: "Neighborhoods Served in [City]"
- 20+ neighborhood badges in pill format
- Each badge has pin emoji
- Hover effect (blue highlight)

**Data Required:**
```javascript
{
  city: "Los Angeles",
  neighborhoods: [
    "Downtown LA", "Silver Lake", "Echo Park", "Koreatown",
    // ... 16 more
  ],
  faqs: [
    {
      q: "Is mattress disposal free in Los Angeles?",
      a: "The City of LA offers free bulky item pickup..."
    }
    // ... 3 more
  ]
}
```

---

### 9. **CityCTA** (Final Conversion)
**Purpose:** Last chance to convert scrollers  
**Location:** `src/components/city/CityCTA.jsx`

**Contains:**
- Dark background (gray-950)
- Badge: "Local Pros Available Now" with lightning bolt
- Headline: "Skip the Hassle in [City]." (large, bold)
- Description: Benefits summary with starting price
- **3 trust badges:**
  - Shield icon: "Background-checked pros"
  - Leaf icon: "Eco-compliant disposal"
  - Clock icon: "Same-day available"
- **Large CTA button**: "Check Availability in [City]" with animated pulse rings
- Fine print: "No credit card required. Free cancellation up to 24hrs"

**Data Required:**
```javascript
{
  city: "Los Angeles",
  basePriceDisplay: "From $89"
}
```

---

## Complete Data Object Template

```javascript
const CITY_DATA = {
  // Basic Info
  city: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  zipCodes: ["90001", "90012", "90021", "90028", "90035", "90045"],
  cityGeoCoords: { lat: 34.0522, lng: -118.2437 },
  population: "3,979,576",
  lastUpdated: "February 27, 2026",
  
  // Hero Section
  heroHookStatement: "Don't risk a $500 citation for illegal dumping in LA.",
  fineAmount: "$500",
  
  // Trigger Ribbon
  weatherProfile: "Rainy Season (Nov–Mar)",
  nextPickupDays: 9,
  competitorComparisonPrice: "$75–$180",
  
  // Pricing
  basePriceDisplay: "From $89",
  cityCostInfo: "Free (permit required) or $28.50 tip fee",
  
  // Municipal Rules
  availabilityStatus: "conditional",
  mattressSpecificRule: "Must be wrapped in plastic before curbside placement",
  placementTime: "No earlier than 6PM the night before pickup",
  sizeLimits: "Max 2 mattresses per household per collection",
  baggingRules: "Plastic wrap required (city mandate)",
  hoursDays: "Sat–Sun 7AM–3PM only",
  theCatch: "Must schedule 14 days in advance online",
  
  // Official Contact
  officialDept: "LA Sanitation & Environment",
  officialPhone: "(800) 773-2489",
  websiteUrl: "https://www.lacity.org/lasan",
  
  // Drop-off Locations
  locations: [
    {
      name: "Antelope Valley Recycling & Reclamation Center",
      type: "City Landfill / Transfer Station",
      address: "1200 W. City Ranch Rd, Palmdale, CA 93551",
      hours: "Mon–Sat 7:00AM–4:00PM",
      tippingFee: "$28.50",
      accepted: ["Mattresses", "Box Springs", "Furniture", "Appliances"],
      residencyReq: "LA County residents only. Photo ID required.",
      mapsUrl: "https://maps.google.com/?q=Antelope+Valley+Recycling+Center"
    }
    // ... 2 more locations
  ],
  
  // Neighborhoods
  neighborhoods: [
    "Downtown LA", "Silver Lake", "Echo Park", "Koreatown", "Mid-Wilshire",
    "West Adams", "Culver City", "Mar Vista", "Venice", "Santa Monica",
    "Westwood", "Brentwood", "Sherman Oaks", "North Hollywood", "Burbank",
    "Pasadena", "Alhambra", "Inglewood", "Compton", "Long Beach"
  ],
  
  // FAQs
  faqs: [
    {
      q: "Is mattress disposal free in Los Angeles?",
      a: "The City of LA offers free bulky item pickup twice per year..."
    }
    // ... 3 more
  ],
  
  // Donation
  donationPolicy: "Goodwill & Habitat for Humanity accept clean, non-stained mattresses only"
};
```

---

## Psychological Flow (PAS Framework)

1. **Hero** → Catches 10-15% "lazy/rich" cohort
2. **TriggerRibbon** → Builds environmental friction
3. **CityProFeed** → Shows marketplace (but after establishing need)
4. **MunicipalRulebook** → THE AGITATION (red tape)
5. **DropOffCenters** → THE REALITY CHECK (true cost)
6. **ChoiceMatrix** → THE PIVOT (comparison)
7. **UGCCarousel** → Social proof
8. **CityFAQ** → Answer objections
9. **CityCTA** → Final conversion

---

## Key CRO Elements

✅ **Truck requirement warning** - Eliminates DIY for sedan/SUV owners  
✅ **Time value in calculator** - "3 hours @ $10/hr" makes DIY $103.50 vs $89 pro  
✅ **Bed bug mention** - Adds fear of rejection at curb  
✅ **Scroll direction** - Button points DOWN to haulers (logical flow)  
✅ **PAS Framework** - Problem → Agitate → Solution maximizes conversions
