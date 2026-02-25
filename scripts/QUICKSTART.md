# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
cd scripts
chmod +x setup.sh
./setup.sh
```

### Step 2: Add API Keys (2 min)
```bash
# Edit the .env file that was created
nano .env  # or use your favorite editor

# Add your keys:
GEMINI_API_KEY=your_actual_key_here
GOOGLE_MAPS_API_KEY=your_actual_key_here
SERPAPI_KEY=your_actual_key_here
```

**Get your keys**:
- Gemini: https://aistudio.google.com/app/apikey
- Google Maps: https://console.cloud.google.com/apis/credentials
- SerpAPI: https://serpapi.com/manage-api-key

### Step 3: Test (1 min)
```bash
python3 run_scraper.py --dry-run --cities Austin
```

If you see output without errors, you're good to go!

### Step 4: Run for Real (1 min)
```bash
# Process default cities (Austin, Dallas, Houston)
python3 run_scraper.py

# Or specify custom cities
python3 run_scraper.py --cities Austin "San Antonio" Dallas
```

## 📊 Output

Results are saved to `../data/`:
- `autonomous_austin.json` - Individual city file
- `autonomous_dallas.json` - Individual city file
- `autonomous_houston.json` - Individual city file
- `autonomous_cities.json` - Combined file

## 🔍 Check Results

```bash
# View confidence score
cat ../data/autonomous_austin.json | grep -A 5 "confidence"

# Count facilities found
cat ../data/autonomous_austin.json | grep -c "\"name\":"

# View all city names processed
cat ../data/autonomous_cities.json | grep "city_name"
```

## ⚠️ Troubleshooting

### "EnvironmentError: GEMINI_API_KEY not set"
- Make sure you created `.env` file in `scripts/` directory
- Check that keys are on separate lines with no quotes
- Verify file is named exactly `.env` (not `.env.txt`)

### "ModuleNotFoundError: No module named 'httpx'"
- Run `pip3 install -r requirements.txt`
- Or manually: `pip3 install httpx beautifulsoup4 google-generativeai pydantic python-dotenv`

### "Rate limit exceeded"
- Wait a few minutes and try again
- Reduce number of cities per run
- Check your API quotas

### "No facilities found"
- This is normal for some cities
- Check the confidence score in output
- Review the logs for what was found

## 🎯 Common Use Cases

### Process one city quickly
```bash
python3 run_scraper.py --cities Austin
```

### Process multiple cities with custom output
```bash
python3 run_scraper.py --cities Austin Dallas Houston --output /tmp/scraper-output
```

### Test without saving files
```bash
python3 run_scraper.py --dry-run
```

### Different state
```bash
python3 run_scraper.py --cities Seattle Portland --state WA --state-name Washington
```

## 📚 More Info

- Full migration guide: `README_REFACTOR.md`
- Security info: `SECURITY_UPGRADE.md`
- All improvements: `IMPROVEMENTS_SUMMARY.md`

## 🆘 Need Help?

1. Check the logs in terminal output
2. Look for `[ERROR]` or `[FAILED]` messages
3. Verify API keys are valid
4. Check API quotas haven't been exceeded
5. Try with `--dry-run` first

## ✅ Success Checklist

- [ ] Dependencies installed
- [ ] `.env` file created with valid keys
- [ ] Dry run completes without errors
- [ ] Output files created in `../data/`
- [ ] Confidence scores are MEDIUM or HIGH
- [ ] Facilities have addresses (not just names)

You're all set! 🎉
