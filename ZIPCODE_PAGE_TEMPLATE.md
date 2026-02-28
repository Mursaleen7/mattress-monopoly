# Zip Code Page Template

## Page Structure (90028 Hollywood Example)

This template documents the exact layout and component order for Zip Code-level pages (Tier 3: highest granularity, single zip code).

---

## Component Order (Top to Bottom)

### 1. **ZipHero**
**Purpose:** Ultra-targeted landing with zip-specific urgency  
**Location:** `src/components/zipcode/ZipHero.jsx`

**Contains:**
- Breadcrumb: Home > Cities > State > City > Neighborhood > Zip Code
- Large zip code display: "#90028"
- Neighborhood name: "Hollywood"
- Main headline: "Mattress Removal in [Zip Code]"
- Subheadline: "[Neighborhood], [City]"
- **Real-time urgency indicators:**
  - "[X] pros available in your zip code right now"
  - "Next available: Today"
  - "3 other residents in this zip booked in last 2 hours"
- Warning banner: Zip-specific fine amount
- Primary CTA: "Get Instant Quote for [Zip]"
- Small map zoomed to zip code boundaries

**Data Required:**
```javascript
{
  zip: "90028",
  neighborhood: "Hollywood",
  city: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  activePros: 11,
  nextAvailable: "Today",
  urgencyNote: "3 other residents in this zip booked removal in the last 2 hours.",
  hookStatement: "Illegal dumping fines in 90028 start at $500. Don't risk it.",
  fineAmount: "$500",
  basePriceDisplay: "From $79"
}
```

---

### 2. **ZipTrustBar**
**Purpose:** Build immediate trust with zip-specific stats  
**Location:** `src/components/zipcode/ZipTrustBar.jsx`

**Contains:**
- 4 stat cards in a row:
  
  1. **Active Pros**
     - Icon: Users
     - Number: "11 Pros"
     - Label: "Available in [Zip]"
  
  2. **Recent Jobs**
     - Icon: CheckCircle
     - Number: "47 Jobs"
     - Label: "Completed This Month"
  
  3. **Average Response**
     - Icon: Clock
     - Number: "< 2 Hours"
     - Label: "Average Response Time"
  
  4. **Customer Rating**
     - Icon: Star
     - Number: "4.8/5"
     - Label: "Average Rating"

**Data Required:**
```javascript
{
  zip: "90028",
  activePros: 11,
  recentJobsCount: 47,
  avgResponseTime: "< 2 Hours",
  avgRating: 4.8
}
```

---

### 3. **ZipProFeed**
**Purpose:** Show haulers serving this exact zip code  
**Location:** `src/components/zipcode/ZipProFeed.jsx`

**Contains:**
- Heading: "Available Now in [Zip Code]"
- Subheadline: "All pros verified to serve [Neighborhood]"
- **Ultra-focused pro list:**
  - 6-8 haulers maximum
  - Each card shows:
    - Company name, rating
    - Price range
    - **Distance in minutes** (not miles) - e.g., "12 min away"
    - Service badges
    - **Availability badge** - "Available Today" or "Next-Day"
    - "Book Now" button (larger, more prominent)
  
- **Urgency footer:**
  - "⚡ [X] slots left today in [Zip]"
  - Real-time availability indicator

**Data Required:**
```javascript
{
  zip: "90028",
  neighborhood: "Hollywood",
  activePros: 11
}
```

---

### 4. **UGCCarousel**
**Purpose:** Hyper-local social proof  
**Location:** `src/components/marketplace/UGCCarousel.jsx`

**Contains:**
- Heading: "Recent Jobs in [Zip Code]"
- Carousel showing:
  - Before/after photos from this exact zip
  - Customer names with street (e.g., "Sarah M. - Sunset Blvd")
  - Job completion date
  - Rating

**Data Required:**
```javascript
{
  city: "90028" // Pass zip code as city parameter
}
```

---

### 5. **ZipCTA**
**Purpose:** Final conversion with zip-specific urgency  
**Location:** `src/components/zipcode/ZipCTA.jsx`

**Contains:**
- Dark background
- Badge: "🔥 High Demand in [Zip]"
- Headline: "Book Your [Zip Code] Pickup Now"
- Description: 
  - "Don't wait [X] days for city pickup"
  - "Pros in your zip available today"
  - Starting price
- **Large CTA button**: "Get My [Zip] Quote — [Price]"
- Trust indicators:
  - "Same-day available"
  - "No hidden fees"
  - "100% satisfaction guarantee"
- Fine print: "Serving [Neighborhood] since 2020"

**Data Required:**
```javascript
{
  zip: "90028",
  neighborhood: "Hollywood",
  city: "Los Angeles",
  avgWaitCityDays: 14,
  basePriceDisplay: "From $79"
}
```

---

## Complete Data Object Template

```javascript
const ZIP_DATA = {
  // Basic Info
  zip: "90028",
  neighborhood: "Hollywood",
  city: "Los Angeles",
  state: "California",
  stateAbbr: "CA",
  
  // Urgency Indicators
  activePros: 11,
  nextAvailable: "Today",
  urgencyNote: "3 other residents in this zip booked removal in the last 2 hours.",
  
  // Hero Section
  hookStatement: "Illegal dumping fines in 90028 start at $500. Don't risk it.",
  fineAmount: "$500",
  
  // Pricing
  basePriceDisplay: "From $79",
  diyCostEstimate: "$55–$110",
  proPrice: "$79–$149",
  
  // Stats
  recentJobsCount: 47,
  avgResponseTime: "< 2 Hours",
  avgRating: 4.8,
  
  // Comparison
  avgWaitCityDays: 14
};
```

---

## Key Differences from City & Municipality Pages

### **Compared to City Page:**
1. **No Educational Content** - No ChoiceMatrix, no DropOffCenters, no MunicipalRulebook
2. **Pure Conversion Focus** - Shortest path to booking
3. **Real-time Urgency** - "Available now", "X slots left today"
4. **Distance in Minutes** - Not miles, emphasizes proximity
5. **Smaller Pro List** - 6-8 haulers vs 12+ on city page

### **Compared to Municipality Page:**
1. **Even Simpler** - No rules section at all
2. **Single Zip Focus** - Not 2-3 zips
3. **Trust Bar Added** - Stats to build immediate credibility
4. **Time-based Urgency** - "Today", "2 hours", "12 min away"
5. **No FAQ Section** - Assumes user is ready to book

---

## Page Structure Comparison

| Component | City Page | Municipality Page | Zip Code Page |
|-----------|-----------|-------------------|---------------|
| Hero | ✅ Full | ✅ Simplified | ✅ Ultra-focused |
| TriggerRibbon | ✅ | ❌ | ❌ |
| TrustBar | ❌ | ❌ | ✅ |
| ProFeed | ✅ With sidebar | ✅ No sidebar | ✅ Minimal |
| MunicipalRulebook | ✅ | ❌ | ❌ |
| DropOffCenters | ✅ | ❌ | ❌ |
| ChoiceMatrix | ✅ | ❌ | ❌ |
| Rules Section | ❌ | ✅ | ❌ |
| UGCCarousel | ✅ | ✅ | ✅ |
| FAQ | ✅ 4 questions | ✅ 3 questions | ❌ |
| CTA | ✅ | ✅ | ✅ |

---

## Psychological Flow

1. **Hero** → Immediate urgency (available now, X slots left)
2. **TrustBar** → Build credibility with stats
3. **ProFeed** → Show available pros (6-8 max)
4. **UGC** → Hyper-local social proof
5. **CTA** → Final conversion with scarcity

---

## When to Use Zip Code Page

**Use Zip Code Page when:**
- User searched for specific zip code
- High-intent traffic (ready to book)
- Want shortest conversion path
- Emphasize real-time availability
- Show hyper-local social proof

**Don't Use Zip Code Page when:**
- User needs education about disposal options
- Want to show DIY comparison
- Need to explain municipal rules
- User is in research phase (not ready to book)

---

## Conversion Optimization

The Zip Code page is designed for **maximum conversion** with:

✅ **Scarcity** - "X slots left today"  
✅ **Urgency** - "Available now", "Today"  
✅ **Proximity** - "12 min away"  
✅ **Social Proof** - Recent jobs in this exact zip  
✅ **Trust** - Stats, ratings, verified pros  
✅ **Simplicity** - No educational content, direct path to booking

---

## Traffic Sources

Zip Code pages are ideal for:
- **Paid Search** - "mattress removal 90028"
- **Local SEO** - "[neighborhood] mattress disposal"
- **Retargeting** - Users who visited city page
- **Direct Traffic** - Users who know their zip
- **Email Campaigns** - Geo-targeted to specific zips

---

## A/B Testing Opportunities

1. **Hero CTA** - "Get Quote" vs "Book Now" vs "See Prices"
2. **Urgency Message** - "X slots left" vs "X people booked today"
3. **Distance Format** - Minutes vs miles
4. **Pro Count** - 6 vs 8 vs 10 haulers shown
5. **Trust Bar Position** - Above vs below pro feed
