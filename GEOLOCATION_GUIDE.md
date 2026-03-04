# Geolocation Implementation Guide

## How It Works

The site now automatically detects the user's location using the **Browser Geolocation API** and shows them the nearest 1-800 services.

## Features Implemented

### 1. **Automatic Location Detection**
- When users visit the home page, the browser asks for location permission
- If granted, the site detects their coordinates (latitude/longitude)
- Uses reverse geocoding to convert coordinates to city, state, and zip code

### 2. **Smart Fallback**
- If permission is denied: Shows default location (Los Angeles)
- If geolocation fails: Falls back to default location
- User can always manually enter their location in the search bar

### 3. **User Experience**
- **Loading state**: "📍 Detecting your location..."
- **Success state**: "✓ Showing services near [City, State]"
- **Error state**: "⚠️ [Error message] — Showing default location"

### 4. **Auto-populated Search**
- Once location is detected, the search bar automatically fills with the user's city and state
- Users can still modify or search for different locations

## Technical Details

### Files Modified/Created:
1. **`src/hooks/useGeolocation.js`** - Custom React hook for geolocation
2. **`src/pages/Home.jsx`** - Updated to use geolocation

### How the Hook Works:
```javascript
const { location, error, loading, requestLocation } = useGeolocation();

// location object contains:
// - latitude, longitude
// - city, zip, state
// - fullAddress
```

### Reverse Geocoding Service:
- Uses **OpenStreetMap Nominatim API** (free, no API key needed)
- Converts GPS coordinates to human-readable addresses
- Rate limit: 1 request per second (sufficient for this use case)

## Browser Requirements

### ✅ Supported:
- Chrome, Firefox, Safari, Edge (all modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### ⚠️ Requirements:
- **HTTPS only** - Geolocation API only works on secure connections
- User must grant location permission
- JavaScript must be enabled

## Testing

### Local Development (HTTPS):
Since geolocation requires HTTPS, you have two options:

1. **Use localhost** (automatically treated as secure):
   ```bash
   npm run dev
   # Visit http://localhost:5173
   ```

2. **Deploy to production** (Vercel automatically uses HTTPS):
   ```bash
   git push origin main
   # Visit your Vercel URL
   ```

### Testing the Flow:
1. Visit the home page
2. Browser will show permission prompt: "Allow [site] to access your location?"
3. Click "Allow"
4. See your detected location in the banner
5. Search bar auto-fills with your city

### Testing Permission Denied:
1. Click "Block" on the permission prompt
2. See error message with fallback to Los Angeles
3. User can still manually enter location

## Privacy & Security

- ✅ Location is only requested, never stored on servers
- ✅ User must explicitly grant permission
- ✅ Location data stays in browser (client-side only)
- ✅ No tracking or analytics on location data
- ✅ Users can revoke permission anytime in browser settings

## Future Enhancements

### Possible Improvements:
1. **Distance Calculation**: Sort pros by actual distance from user
2. **Service Area Matching**: Only show pros that serve the user's area
3. **IP Fallback**: Add IP-based geolocation if browser permission denied
4. **Location Caching**: Remember user's location for return visits
5. **Manual Override**: Add button to "Change Location" or "Use My Location"

## Troubleshooting

### "Geolocation not working"
- Ensure you're on HTTPS (or localhost)
- Check browser permissions (Settings → Site Settings → Location)
- Try in incognito mode to reset permissions

### "Location is inaccurate"
- Browser geolocation accuracy varies (10-100m typical)
- Mobile devices are usually more accurate than desktops
- Reverse geocoding may return nearby city instead of exact location

### "Permission prompt not showing"
- User may have previously blocked location
- Check browser settings to reset permissions
- Try different browser

## API Rate Limits

**OpenStreetMap Nominatim:**
- Free tier: 1 request per second
- No API key required
- Fair use policy applies

If you need higher limits, consider:
- Google Maps Geocoding API (paid, $5 per 1000 requests)
- Mapbox Geocoding API (free tier: 100,000 requests/month)
- Here Geocoding API (free tier: 250,000 requests/month)
