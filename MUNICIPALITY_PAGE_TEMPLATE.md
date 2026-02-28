# Municipality Page Template

## Page Structure (Culver City Example)

This template documents the exact layout and component order for Municipality-level pages (Tier 2: neighborhoods/suburbs within a city).

---

## Component Order (Top to Bottom)

### 1. **MunicipalityHero**
**Purpose:** Hyper-local landing with municipality-specific urgency  
**Location:** `src/components/municipality/MunicipalityHero.jsx`

**Contains:**
- Breadcrumb: Home > Cities > State > City > Municipality
- Location badge: "[Municipality], [City], [State]"
- Main headline: "Mattress Disposal in [Municipality]"
- Subheadline: Municipality-specific hook (e.g., "Culver City has strict bulky item rules")
- Warning banner: Municipality-specific fine and wait time
- Primary CTA: "Book a Local Pro — [Price]"
- Zip code badges (2-3 for municipality)
- Smaller map focused on municipality boundaries

**Data Required:**
```javascript
{
  name: "Culver City",
  parentCity: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  zipCodes: ["90230", "90232"],
  population: "40,048",
  lastUpdated: "February 27, 2026",
  hookStatement: "Culver City has strict bulky item rules — missed pickup windows mean a 30-day wait.",
  fineAmount: "$350",
  waitDays: 30,
  basePriceDisplay: "From $79"
}
```

---

### 2. **MunicipalityProFeed**
**Purpose:** Show haulers serving this specific municipality  
**Location:** `src/components/municipality/MunicipalityProFeed.jsx`

**Contains:**
- Heading: "Available Haulers in [Municipality]"
- Subheading: "Serving [zip codes] · [X] pros available today"
- **Simplified layout** (no sidebar on municipality pages):
  - Pro cards (8-10 haulers)
  - Each card shows:
    - Company name, rating
    - Price range
    - Distance from municipality center
    - Service badges
    - "Book Now" button
  - Urgency note: "3 other residents in [Municipality] booked in last 2 hours"

**Data Required:**
```javascript
{
  name: "Culver City",
  zipCodes: ["90230", "90232"]
}
```

---

### 3. **MunicipalityRules**
**Purpose:** Municipality-specific disposal rules  
**Location:** `src/components/municipality/MunicipalityRules.jsx`

**Contains:**
- Heading: "Bulky Item Rules for [Municipality]"
- **Status card** (color-coded):
  - Shows if municipality has its own rules or follows parent city
  - Pickup schedule (e.g., "Every other month, Saturdays 8AM-12PM")
  - Advance booking requirement (e.g., "21-day advance online booking")
  
- **Key Rules Grid** (2-column):
  1. **Pickup Schedule**
     - Frequency (bi-monthly, quarterly, etc.)
     - Days/times
     - Booking window
  
  2. **Requirements**
     - Bagging rules
     - Placement rules
     - Size limits
  
- **Warning Box** (red):
  - "Missed or cancelled appointments cannot be rescheduled until next cycle"
  - Fine amount for violations
  
- **Contact Card**:
  - Municipality department
  - Phone number
  - Website link

**Data Required:**
```javascript
{
  name: "Culver City",
  pickupSchedule: "Every other month, Saturdays 8AM–12PM",
  baggingRules: "Must be in sealed plastic bag or wrapped",
  theCatch: "Requires 21-day advance online booking",
  availabilityStatus: "conditional",
  fineAmount: "$350",
  officialDept: "Culver City Public Works",
  officialPhone: "(310) 253-5993",
  websiteUrl: "https://www.culvercity.org/publicworks"
}
```

---

### 4. **UGCCarousel**
**Purpose:** Social proof from municipality residents  
**Location:** `src/components/marketplace/UGCCarousel.jsx`

**Contains:**
- Heading: "Recent Jobs in [Municipality]"
- Carousel of local testimonials
- Shows neighborhood-specific before/after photos

**Data Required:**
```javascript
{
  city: "Culver City" // Uses municipality name
}
```

---

### 5. **MunicipalityFAQ**
**Purpose:** Municipality-specific questions  
**Location:** `src/components/municipality/MunicipalityFAQ.jsx`

**Contains:**

**Left Column - FAQ Accordion:**
- Heading: "Common Questions in [Municipality]"
- 3 municipality-specific questions:
  1. "How often does [Municipality] collect bulky items?"
  2. "What happens if my mattress isn't bagged?"
  3. "Is a private hauler worth it in [Municipality]?"
- Answers reference municipality-specific rules and wait times

**Right Column - Neighborhoods:**
- Heading: "Areas We Serve in [Municipality]"
- 6-8 neighborhood badges
- Smaller, more focused list than city page

**Data Required:**
```javascript
{
  name: "Culver City",
  neighborhoods: [
    "Downtown Culver City", "Sunkist Park", "Lucerne Park",
    "Fox Hills", "Culver West", "Blair Hills"
  ],
  faqs: [
    {
      q: "How often does Culver City collect bulky items?",
      a: "Culver City offers bulky item pickup on a bi-monthly schedule..."
    }
    // ... 2 more
  ]
}
```

---

### 6. **MunicipalityCTA**
**Purpose:** Final conversion with municipality-specific urgency  
**Location:** `src/components/municipality/MunicipalityCTA.jsx`

**Contains:**
- Dark background
- Badge: "Same-Day Slots Available in [Municipality]"
- Headline: "Skip the [X]-Day City Wait. Book a Local Pro Today."
- Description: Emphasizes avoiding municipality wait times
- CTA button: "Get My Free Quote — [Price]"
- Trust indicators
- Fine print

**Data Required:**
```javascript
{
  name: "Culver City",
  waitDays: 30,
  basePriceDisplay: "From $79"
}
```

---

## Complete Data Object Template

```javascript
const MUNI_DATA = {
  // Basic Info
  name: "Culver City",
  parentCity: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  zipCodes: ["90230", "90232"],
  population: "40,048",
  lastUpdated: "February 27, 2026",
  
  // Hero Section
  hookStatement: "Culver City has strict bulky item rules — missed pickup windows mean a 30-day wait.",
  fineAmount: "$350",
  waitDays: 30,
  
  // Pricing
  basePriceDisplay: "From $79",
  cityCostInfo: "Free (bi-monthly, schedule required)",
  
  // Municipal Rules
  pickupSchedule: "Every other month, Saturdays 8AM–12PM",
  baggingRules: "Must be in sealed plastic bag or wrapped",
  theCatch: "Requires 21-day advance online booking",
  availabilityStatus: "conditional",
  
  // Official Contact
  officialDept: "Culver City Public Works",
  officialPhone: "(310) 253-5993",
  websiteUrl: "https://www.culvercity.org/publicworks",
  
  // Neighborhoods
  neighborhoods: [
    "Downtown Culver City", "Sunkist Park", "Lucerne Park",
    "Fox Hills", "Culver West", "Blair Hills"
  ],
  
  // FAQs
  faqs: [
    {
      q: "How often does Culver City collect bulky items?",
      a: "Culver City offers bulky item pickup on a bi-monthly schedule (every 2 months). You must book online at least 21 days in advance. Missed or cancelled appointments cannot be rescheduled until the next cycle."
    },
    {
      q: "What happens if my mattress isn't bagged?",
      a: "Culver City will not collect an unwrapped mattress. You'll receive a notice and have to reschedule your next available slot, which could be 60+ days away. Fines up to $350 apply for repeat violations or illegal dumping."
    },
    {
      q: "Is a private hauler worth it in Culver City?",
      a: "For most residents, yes. Private haulers typically arrive same-day or next-day for $79–$140, compared to a 3–6 week wait for city pickup. When you factor in the bag cost ($8), fuel, and time off work, the price difference is often negligible."
    }
  ]
};
```

---

## Key Differences from City Page

1. **Simpler Structure** - No ChoiceMatrix, no DropOffCenters
2. **Hyper-Local Focus** - Emphasizes municipality-specific rules and wait times
3. **Urgency Amplified** - Highlights longer wait times (30 days vs 14 days)
4. **No Sidebar** - Cleaner, more direct path to booking
5. **Smaller Geography** - 2-3 zip codes vs 6+ on city page
6. **Fewer FAQs** - 3 questions vs 4 on city page

---

## Psychological Flow

1. **Hero** → Municipality-specific urgency (30-day wait)
2. **ProFeed** → Immediate solution (same-day available)
3. **Rules** → Show the friction (21-day advance booking)
4. **UGC** → Local social proof
5. **FAQ** → Answer objections
6. **CTA** → Final conversion with wait time comparison

---

## When to Use Municipality Page vs City Page

**Use Municipality Page when:**
- Suburb/neighborhood has its own rules
- Different pickup schedule than parent city
- Smaller geographic area (2-3 zip codes)
- Want to emphasize hyper-local service

**Use City Page when:**
- Major metropolitan area
- Multiple municipalities within
- Need full educational content (DIY comparison, drop-off centers)
- 6+ zip codes covered
