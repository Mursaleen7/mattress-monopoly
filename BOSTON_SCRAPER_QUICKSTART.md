# Boston Scraper Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites

1. **Environment Variables** - Create `.env` file in project root:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
SERPAPI_KEY=your_serpapi_key_here
```

2. **Python Dependencies** - Install required packages:
```bash
pip install httpx beautifulsoup4 google-generativeai pdfplumber python-dotenv
```

### Basic Usage

#### 1. Scrape All Boston Locations (Cities + Municipalities + Zip Codes)
```bash
cd src/scraper
python3 run_boston_scraper.py --all
```

**Output**: `../data/boston/` directory with 92 JSON files + 1 combined file

**Time**: ~1.5-3 hours for all 92 locations

---

#### 2. Test with Dry Run (No Files Saved)
```bash
python3 run_boston_scraper.py --all --dry-run
```

**Output**: Console logs only, no files saved

**Time**: Same as regular run

---

#### 3. Scrape Only Cities (16 locations)
```bash
python3 run_boston_scraper.py --cities
```

**Output**: 16 city JSON files

**Time**: ~15-30 minutes

---

#### 4. Scrape Only Municipalities (24 locations)
```bash
python3 run_boston_scraper.py --municipalities
```

**Output**: 24 municipality JSON files

**Time**: ~20-40 minutes

---

#### 5. Scrape Only Zip Codes (52 locations)
```bash
python3 run_boston_scraper.py --zip-codes
```

**Output**: 52 zip code JSON files

**Time**: ~45-90 minutes

---

### Advanced Options

#### Custom Output Directory
```bash
python3 run_boston_scraper.py --all --output /path/to/output
```

#### Adjust Rate Limiting (Slower = More Reliable)
```bash
python3 run_boston_scraper.py --all --delay 10
```

#### Combine Options
```bash
python3 run_boston_scraper.py --cities --municipalities --output ../data/boston_test --delay 8
```

---

## 📊 What You Get

### Individual Files (92 total)
```
data/boston/
├── city_boston-ma.json
├── city_cambridge-ma.json
├── city_somerville-ma.json
├── ...
├── municipality_allston-ma.json
├── municipality_brighton-ma.json
├── ...
├── zipcode_02108.json
├── zipcode_02109.json
└── ...
```

### Combined File (1 file with everything)
```json
{
  "metadata": {
    "scraped_at": "2026-03-05T10:30:00",
    "region": "Greater Boston Area",
    "counts": {
      "cities": 16,
      "municipalities": 24,
      "zip_codes": 52,
      "total": 92
    }
  },
  "cities": [ ... ],
  "municipalities": [ ... ],
  "zip_codes": [ ... ]
}
```

---

## 🎯 Common Use Cases

### Use Case 1: Build City Pages
```bash
# Scrape all cities
python3 run_boston_scraper.py --cities

# Use city_*.json files with CITY_PAGE_TEMPLATE.md
```

### Use Case 2: Build Municipality Pages
```bash
# Scrape all municipalities
python3 run_boston_scraper.py --municipalities

# Use municipality_*.json files with MUNICIPALITY_PAGE_TEMPLATE.md
```

### Use Case 3: Build Zip Code Pages
```bash
# Scrape all zip codes
python3 run_boston_scraper.py --zip-codes

# Use zipcode_*.json files with ZIPCODE_PAGE_TEMPLATE.md
```

### Use Case 4: Complete Boston Coverage
```bash
# Scrape everything
python3 run_boston_scraper.py --all

# Use all files with respective templates
```

---

## 🔧 Customization

### Add More Locations

Edit `src/scraper/boston_config.py`:

```python
# Add a city
BOSTON_CITIES.append({
    'name': 'Framingham',
    'state_abbr': 'MA',
    'state_name': 'Massachusetts'
})

# Add a municipality
BOSTON_MUNICIPALITIES.append({
    'name': 'Fenway',
    'parent_city': 'Boston',
    'state_abbr': 'MA',
    'state_name': 'Massachusetts'
})

# Add a zip code
BOSTON_ZIP_CODES.append({
    'zip': '02215',
    'neighborhood': 'Fenway',
    'city': 'Boston',
    'state_abbr': 'MA'
})
```

Then run the scraper again.

---

## 📈 Monitoring Progress

The scraper shows real-time progress:

```
================================================================================
🚀 GREATER BOSTON AREA SCRAPER
================================================================================
Total locations to process: 92
  - Cities: 16
  - Municipalities: 24
  - Zip Codes: 52
Output: ../data/boston
Dry run: False
================================================================================

[1/92] Processing city...
────────────────────────────────────────────────────────────────────────────────
Processing CITY: Boston, MA
────────────────────────────────────────────────────────────────────────────────

📍 PHASE 1: Foundation Layer (Geo + Census + Weather)
✓ Resolved: Boston, MA → Boston, MA (Massachusetts)
...

✅ Saved: ../data/boston/city_boston-ma.json
Confidence: HIGH

⏳ Waiting 5s before next location...

[2/92] Processing city...
...
```

---

## ⚠️ Troubleshooting

### Problem: "GEMINI_API_KEY not set"
**Solution**: Create `.env` file with API keys (see Prerequisites)

### Problem: "Rate limit exceeded"
**Solution**: Increase delay: `--delay 10` or `--delay 15`

### Problem: Some locations are skipped
**Solution**: Check logs - they may fail geographical validation. This is normal for ambiguous locations.

### Problem: Scraper is too slow
**Solution**: 
- Reduce delay: `--delay 3` (but may hit rate limits)
- Scrape in batches: `--cities` first, then `--municipalities`, then `--zip-codes`

### Problem: Want to scrape a different metro area
**Solution**: 
1. Copy `boston_config.py` to `your_area_config.py`
2. Copy `run_boston_scraper.py` to `run_your_area_scraper.py`
3. Update imports and location data
4. Run your new scraper

---

## 📚 Next Steps

1. **Review Output**: Check `data/boston/boston_combined.json`
2. **Build Pages**: Use JSON data with page templates
3. **Customize**: Edit `boston_config.py` to add/remove locations
4. **Extend**: Create scrapers for other metro areas

---

## 🆘 Need Help?

- **Documentation**: See `BOSTON_SCRAPER_README.md` for detailed docs
- **Architecture**: See `BOSTON_SCRAPER_ARCHITECTURE.md` for system design
- **Comparison**: See `SCRAPER_COMPARISON.md` for original vs Boston scraper
- **Templates**: See `CITY_PAGE_TEMPLATE.md`, `MUNICIPALITY_PAGE_TEMPLATE.md`, `ZIPCODE_PAGE_TEMPLATE.md`

---

## ✅ Checklist

Before running the scraper:
- [ ] API keys set in `.env` file
- [ ] Python dependencies installed
- [ ] Reviewed `boston_config.py` locations
- [ ] Decided on output directory
- [ ] Chosen scraper mode (--all, --cities, --municipalities, --zip-codes)

Ready to run:
```bash
cd src/scraper
python3 run_boston_scraper.py --all
```

That's it! 🎉
