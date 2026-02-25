# City-State Resolution Guide

## Problem

When running the scraper with just city names like:
```bash
python3 run_scraper.py --cities "Phoenix" "Philadelphia"
```

The old version would assume all cities are in Texas, causing geographical confusion (Phoenix, TX doesn't exist as a major city).

## Solution

The updated `run_scraper.py` now includes:

1. **Built-in City-State Map**: 100+ major US cities with their states
2. **Explicit State Format**: Support for "City, ST" format
3. **State Override**: Optional `--state` flag for batch processing
4. **Smart Resolution**: Automatic state detection with validation

## Usage Examples

### 1. Auto-Detect States (Recommended)

For major cities, just provide the name:

```bash
python3 run_scraper.py --cities Phoenix Philadelphia Seattle
```

Output:
```
✓ Resolved: Phoenix → Phoenix, AZ (Arizona)
✓ Resolved: Philadelphia → Philadelphia, PA (Pennsylvania)
✓ Resolved: Seattle → Seattle, WA (Washington)
```

### 2. Explicit City, State Format

Use "City, ST" format for clarity or smaller cities:

```bash
python3 run_scraper.py --cities "Phoenix, AZ" "Philadelphia, PA" "Portland, ME"
```

This is useful for:
- Cities not in the built-in map
- Disambiguating common names (Portland, OR vs Portland, ME)
- Being explicit about the target

### 3. State Override

Process multiple cities in the same state:

```bash
python3 run_scraper.py --cities Austin Dallas Houston --state TX --state-name Texas
```

### 4. Mixed Formats

Combine auto-detection with explicit states:

```bash
python3 run_scraper.py --cities Phoenix "Portland, ME" Seattle
```

## Built-in City Coverage

The scraper includes 100+ major US cities:

**Top 50 Cities by Population**:
- Phoenix, AZ
- Philadelphia, PA
- San Antonio, TX
- San Diego, CA
- Dallas, TX
- San Jose, CA
- Austin, TX
- Jacksonville, FL
- Fort Worth, TX
- Columbus, OH
- And 40+ more...

**State Coverage**: All 50 states represented

## Handling Ambiguous Cities

Some city names exist in multiple states. The scraper defaults to the larger/more prominent city:

| City | Default State | Alternative |
|------|---------------|-------------|
| Portland | OR (Oregon) | Portland, ME (Maine) |
| Kansas City | MO (Missouri) | Kansas City, KS (Kansas) |
| Arlington | TX (Texas) | Arlington, VA (Virginia) |
| Springfield | IL (Illinois) | 30+ other states |
| Glendale | AZ (Arizona) | Glendale, CA (California) |

**To override**: Use explicit format:
```bash
python3 run_scraper.py --cities "Portland, ME" "Springfield, MA"
```

## Error Handling

If a city cannot be resolved:

```bash
python3 run_scraper.py --cities "Smalltown"
```

Output:
```
❌ Error: Cannot determine state for 'Smalltown'. Please specify:
  1. Use format: 'Smalltown, ST'
  2. Use --state flag: --state ST --state-name StateName
  3. Add city to CITY_STATE_MAP in run_scraper.py
```

## Adding New Cities

To add a city to the built-in map, edit `scripts/run_scraper.py`:

```python
CITY_STATE_MAP = {
    # ... existing cities ...
    'your city': ('ST', 'State Name'),
}
```

Example:
```python
'bozeman': ('MT', 'Montana'),
'asheville': ('NC', 'North Carolina'),
```

## Integration with Validation

The city-state resolution works with the geographical validation system:

1. **Resolution**: City name → (City, State, State Name)
2. **Validation**: Verify city-state combination exists
3. **Scraping**: Fetch data for validated location
4. **Content Validation**: Ensure scraped data matches target

Example flow:
```
Input: "Phoenix"
↓
Resolution: Phoenix, AZ (Arizona)
↓
Validation: ✓ Phoenix, AZ exists (Google Geocoding)
↓
Scraping: Fetch Phoenix, AZ waste management data
↓
Content Validation: ✓ Content is about Phoenix, AZ (not Phoenix, TX)
↓
Output: High-confidence Phoenix, AZ data
```

## Best Practices

1. **Use Auto-Detection**: For major cities, let the scraper resolve the state
2. **Be Explicit**: For smaller cities or ambiguous names, use "City, ST" format
3. **Batch by State**: Use `--state` flag when processing multiple cities in one state
4. **Verify Output**: Check the resolution output before scraping starts
5. **Add to Map**: If you frequently scrape a city, add it to CITY_STATE_MAP

## Examples

### Scrape Top 10 US Cities
```bash
python3 run_scraper.py --cities \
  "New York" \
  "Los Angeles" \
  Chicago \
  Houston \
  Phoenix \
  Philadelphia \
  "San Antonio" \
  "San Diego" \
  Dallas \
  Austin
```

### Scrape All Texas Major Cities
```bash
python3 run_scraper.py --cities \
  Houston Dallas Austin "San Antonio" "Fort Worth" \
  --state TX --state-name Texas
```

### Scrape Cities with Same Name
```bash
python3 run_scraper.py --cities \
  "Portland, OR" \
  "Portland, ME" \
  "Springfield, IL" \
  "Springfield, MA" \
  "Springfield, MO"
```

## Troubleshooting

**Problem**: City resolves to wrong state
```bash
# Wrong: Portland defaults to OR
python3 run_scraper.py --cities Portland

# Right: Specify ME explicitly
python3 run_scraper.py --cities "Portland, ME"
```

**Problem**: Small city not in map
```bash
# Error: Cannot determine state
python3 run_scraper.py --cities "Smallville"

# Solution: Use explicit format
python3 run_scraper.py --cities "Smallville, KS"
```

**Problem**: Want to override default
```bash
# Wrong: Arlington defaults to TX
python3 run_scraper.py --cities Arlington

# Right: Specify VA explicitly
python3 run_scraper.py --cities "Arlington, VA"
```

## Summary

The city-state resolution system prevents geographical confusion by:

✅ Auto-detecting states for 100+ major cities  
✅ Supporting explicit "City, ST" format  
✅ Providing clear error messages for unknown cities  
✅ Integrating with geographical validation  
✅ Handling ambiguous city names with sensible defaults  

This ensures the scraper always knows exactly which city and state to target, preventing bugs like the "New York, TX" hallucination.
