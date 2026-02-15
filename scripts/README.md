# AI-Powered Data Scraper

This scraper uses Gemini 2.5 AI to intelligently extract mattress disposal information from city websites.

## Setup

1. Install Python dependencies:
```bash
cd scripts
pip install -r requirements.txt
```

2. Run the scraper:
```bash
python ai_scraper.py
```

## How It Works

1. The scraper iterates through a list of target cities
2. For each city, it sends a prompt to Gemini 2.5 asking for structured data
3. Gemini researches and extracts:
   - Official disposal rules
   - Drop-off locations
   - Pickup service info
   - Fines and penalties
4. Results are saved to `data/cities.json`

## Scaling

To add more cities, edit the `TARGET_CITIES` list in `ai_scraper.py`:

```python
TARGET_CITIES = [
    {"city": "Seattle", "state": "Washington", "abbr": "WA"},
    {"city": "Boston", "state": "Massachusetts", "abbr": "MA"},
    # Add more cities here
]
```

## Rate Limiting

The scraper waits 3 seconds between requests to respect API limits. For 50 cities, expect ~3-5 minutes total runtime.

## Cost

Gemini 2.5 Flash is very affordable:
- ~1,500 tokens per city
- 50 cities = ~75,000 tokens
- Cost: ~$0.01 (essentially free)

## Next Steps

After running the scraper:
1. Review `data/cities.json` for accuracy
2. Manually verify 2-3 cities
3. Deploy to Vercel: `git add . && git commit -m "Update city data" && git push`
4. Your site will auto-rebuild with new data
