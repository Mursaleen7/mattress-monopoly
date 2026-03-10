# OpenStreetMap Static Map Implementation

## Overview

The drop-off center location cards now display map thumbnails using **free OpenStreetMap (OSM)** services. This provides authentic location visualization without API costs or usage limits.

## Implementation Details

### Component: `src/components/city/DropOffCenters.jsx`

**Features:**
- Free OpenStreetMap-based static maps
- No API key required
- Red marker showing exact facility location
- Zoom level 15 for optimal street-level detail
- Graceful fallback to styled placeholder
- Lazy loading for performance

**Map Service:** `staticmap.openstreetmap.de`
- Completely free
- No registration required
- No usage limits
- High-quality OSM tiles

**URL Format (when coordinates available):**
```
https://staticmap.openstreetmap.de/staticmap.php?
  center={lat},{lon}
  &zoom=15
  &size=300x200
  &markers={lat},{lon},red-pushpin
```

**Fallback (when no coordinates):**
```
https://via.placeholder.com/600x400/f3f4f6/1f2937?text={facility_type}
```

### Benefits

1. **Zero Cost** - Completely free, no API keys or billing
2. **No Limits** - Unlimited requests
3. **Open Source** - Built on OpenStreetMap data
4. **Privacy** - No tracking or data collection
5. **Reliable** - Community-maintained infrastructure
6. **Professional** - Clean, modern map styling

### Data Structure

For best results, location data should include coordinates:

```javascript
{
  name: "Facility Name",
  address: "123 Main St",
  lat: 42.3601,  // Optional but recommended
  lon: -71.0589, // Optional but recommended
  type: "Transfer Station"
}
```

### How It Works

1. **With Coordinates**: Generates real OSM map with marker
2. **Without Coordinates**: Shows clean placeholder with facility type
3. **On Error**: Falls back to map pin icon overlay

### Error Handling

If the OSM service fails to load:
1. Image is hidden (`display: none`)
2. Fallback map pin icon is shown
3. User experience remains functional

### Performance

- Images use `loading="lazy"` for deferred loading
- Cached by browser after first load
- No external dependencies
- Minimal impact on page load time

## Advantages Over Google Maps

| Feature | OpenStreetMap | Google Maps |
|---------|---------------|-------------|
| Cost | Free | Paid (after quota) |
| API Key | Not required | Required |
| Usage Limits | None | 25,000/month free |
| Privacy | No tracking | Tracks users |
| Open Source | Yes | No |
| Customization | Full control | Limited |

## Future Enhancements

Potential improvements:
- Add geocoding service to convert addresses to coordinates
- Custom map styling with different OSM tile providers
- Add nearby landmarks in the view
- Show facility boundaries
- Display distance from user's location
- Alternative tile styles (satellite, terrain, etc.)

## Alternative Free Services

If staticmap.openstreetmap.de is unavailable, consider:
- **Nominatim** - Free OSM geocoding API
- **Mapbox** - Free tier (50,000 requests/month)
- **LocationIQ** - Free tier (5,000 requests/day)
- **Geoapify** - Free tier (3,000 requests/day)

