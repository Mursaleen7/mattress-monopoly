# Metro Area Grouping System

## Overview
Cities are organized into metro areas to share common resources like hero images, ensuring visual consistency across related geographic regions.

## Metro Area Configuration

### Greater Boston Area
- **Hero Image**: `/public/GreaterBostonArea_hero.png`
- **Counties**: Suffolk, Middlesex, Norfolk, Essex, Plymouth
- **Cities Included**:
  - Boston, Cambridge, Somerville
  - Brookline, Quincy, Newton, Waltham, Watertown
  - Medford, Malden, Everett, Chelsea, Revere, Winthrop
  - Arlington, Belmont, Lynn, Salem, Peabody, Beverly
  - Danvers, Marblehead, Swampscott, Nahant
  - Braintree, Weymouth, Milton, Dedham, Needham, Wellesley
  - Hingham, Lexington, Woburn, Burlington, Winchester, Stoneham

## How It Works

### 1. City Data Structure (`src/data/cities.js`)
Each city includes a `metroArea` field:
```javascript
{
  name: "Boston",
  slug: "boston",
  state: "MA",
  county: "Suffolk",
  metroArea: "GREATER_BOSTON"
}
```

### 2. Metro Area Definitions
Metro areas are defined in `METRO_AREAS` object:
```javascript
export const METRO_AREAS = {
  GREATER_BOSTON: {
    name: "Greater Boston Area",
    heroImage: "/GreaterBostonArea_hero.png",
    counties: ["Suffolk", "Middlesex", "Norfolk", "Essex", "Plymouth"],
    cities: ["boston", "cambridge", "somerville", ...]
  }
}
```

### 3. Helper Functions
- `getMetroAreaForCity(citySlug)` - Returns metro area config for a city
- `getHeroImageForCity(citySlug)` - Returns the appropriate hero image
- `isCityInMetroArea(citySlug, metroAreaKey)` - Checks metro area membership

### 4. CityHero Component
The hero component automatically uses the correct image:
```javascript
const heroImage = getHeroImageForCity(citySlug) || "/GreaterBostonArea_hero.png";
```

## Adding New Metro Areas

1. Add hero image to `/public/` directory
2. Define metro area in `METRO_AREAS` object in `src/data/cities.js`
3. Add `metroArea` field to cities in `AVAILABLE_CITIES`
4. Cities will automatically use the metro area hero image

Example for a new metro area:
```javascript
METRO_AREAS.NEW_YORK_METRO = {
  name: "New York Metro Area",
  heroImage: "/NewYorkMetro_hero.png",
  counties: ["New York", "Kings", "Queens", "Bronx", "Richmond"],
  cities: ["new-york", "brooklyn", "queens", "bronx", "staten-island"]
};
```

## Benefits
- **Visual Consistency**: Related cities share the same hero image
- **Easy Maintenance**: Update one image for all cities in a metro area
- **Scalability**: Easy to add new metro areas as the site expands
- **Organization**: Clear geographic grouping of cities
- **Flexibility**: Cities can have custom images by not specifying a metro area

## Current Status
- ✅ Greater Boston Area configured with 3 active cities (Boston, Cambridge, Somerville)
- ✅ 33 additional Greater Boston cities ready to activate
- ✅ Hero image system fully functional
