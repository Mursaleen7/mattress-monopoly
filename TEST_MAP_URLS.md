# Test OpenStreetMap Static Map URLs

## Test URLs Generated

These are the actual URLs that will be generated for each location:

### Boston Locations

1. **Boston Recycling & Trash Services**
   ```
   https://staticmap.openstreetmap.de/staticmap.php?center=42.3601,-71.0589&zoom=15&size=300x200&markers=42.3601,-71.0589,red-pushpin
   ```

2. **Wayland Transfer Station**
   ```
   https://staticmap.openstreetmap.de/staticmap.php?center=42.3626,-71.3631&zoom=15&size=300x200&markers=42.3626,-71.3631,red-pushpin
   ```

3. **MA DEP Recycling Facility**
   ```
   https://staticmap.openstreetmap.de/staticmap.php?center=42.3603,-71.0623&zoom=15&size=300x200&markers=42.3603,-71.0623,red-pushpin
   ```

### Los Angeles Locations

1. **Antelope Valley Recycling Center**
   ```
   https://staticmap.openstreetmap.de/staticmap.php?center=34.5794,-118.1165&zoom=15&size=300x200&markers=34.5794,-118.1165,red-pushpin
   ```

2. **Sun Valley Recycle Center**
   ```
   https://staticmap.openstreetmap.de/staticmap.php?center=34.2167,-118.3897&zoom=15&size=300x200&markers=34.2167,-118.3897,red-pushpin
   ```

3. **GreenWaste Solutions**
   ```
   https://staticmap.openstreetmap.de/staticmap.php?center=33.9983,-118.1598&zoom=15&size=300x200&markers=33.9983,-118.1598,red-pushpin
   ```

## How to Test

1. Copy any URL above
2. Paste into browser address bar
3. You should see a map with a red marker at the facility location

## Expected Result

Each URL should display:
- OpenStreetMap tiles showing the area
- Red pushpin marker at the exact coordinates
- Zoom level 15 (street-level detail)
- 300x200 pixel image

## Troubleshooting

If maps don't load:
- Check browser console for errors
- Verify the staticmap.openstreetmap.de service is accessible
- Ensure coordinates are valid (lat: -90 to 90, lon: -180 to 180)
- Try opening one of the test URLs directly in a new tab

## Alternative Services

If staticmap.openstreetmap.de is down, we can switch to:
- MapQuest Open Static Maps
- Geoapify (3000 free requests/day)
- LocationIQ (5000 free requests/day)
