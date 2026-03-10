# Serper.dev API Testing Guide

## Updated Script: `serper_full_test.py`

This script tests ALL 9 queries for ALL 36 Greater Boston cities using serper.dev API.

---

## What It Tests

### For Each City (36 total):

**Phase 2A: Waste Management Queries (5 queries)**
1. `site:.gov "{LOCATION}" bulk trash mattress disposal`
2. `site:.gov "{LOCATION}" sanitation large item pickup`
3. `"{LOCATION}" "Massachusetts" official waste management mattress schedule`
4. `"{LOCATION}" "MA" bulk item curbside pickup schedule site:.gov OR site:.us`
5. `"{LOCATION}" solid waste department mattress disposal 2024 OR 2025 OR 2026`

**Phase 2B: Ordinance/Fine Queries (3 queries)**
6. `site:.gov "{LOCATION}" illegal dumping fine ordinance code`
7. `"{LOCATION}" "MA" illegal dumping penalty "$" misdemeanor`
8. `"{LOCATION}" city code illegal dumping fine amount`

**Phase 5: Competitor Pricing Query (1 query)**
9. `1-800-got-junk mattress removal {LOCATION} MA price`

---

## Total Coverage

- **36 cities** × **9 queries each** = **324 total API calls**
- Estimated time: ~15-20 minutes (with rate limiting)
- Cost: 324 API calls on your serper.dev plan

---

## Usage

### Test All 36 Cities (Full Test)
```bash
python3 serper_full_test.py
```

### Test First 3 Cities Only (Quick Test)
```bash
python3 serper_full_test.py 3
```

### Test First 5 Cities
```bash
python3 serper_full_test.py 5
```

---

## Example Output

```
================================================================================
SERPER.DEV COMPREHENSIVE API TEST
================================================================================
Cities to test: 36
Queries per city: 9
Total queries: 324
API Key: 9ed1f7bc62e135d713...
================================================================================

[1/36] Testing: Boston, MA
--------------------------------------------------------------------------------
  Testing: phase2a_query1
  Query: site:.gov "Boston" bulk trash mattress disposal
  ✅ Success: 5 results
     Top: Mattress Recycling | Boston.gov

  Testing: phase2a_query2
  Query: site:.gov "Boston" sanitation large item pickup
  ✅ Success: 4 results
     Top: Special Collection Items | Boston.gov

  Testing: phase2a_query3
  Query: "Boston" "Massachusetts" official waste management mattress schedule
  ✅ Success: 5 results
     Top: Mattress Recycling | Mass.gov

  ... (continues for all 9 queries)

City Summary: 9/9 queries successful

[2/36] Testing: Cambridge, MA
--------------------------------------------------------------------------------
  ... (continues for all cities)

================================================================================
OVERALL SUMMARY
================================================================================
Total cities tested: 36
Total queries executed: 324
Successful queries: 310
Failed queries: 14
Success rate: 95.7%

Performance by Query Type:
  phase2a_query1: 35/36 (97.2%)
  phase2a_query2: 34/36 (94.4%)
  phase2a_query3: 36/36 (100.0%)
  phase2a_query4: 33/36 (91.7%)
  phase2a_query5: 35/36 (97.2%)
  phase2b_query1: 32/36 (88.9%)
  phase2b_query2: 30/36 (83.3%)
  phase2b_query3: 31/36 (86.1%)
  phase5_query1: 34/36 (94.4%)

Full results saved to: serper_full_test_results.json
================================================================================
```

---

## Output Files

### `serper_full_test_results.json`

Complete JSON with all results:

```json
[
  {
    "city": "Boston",
    "queries": {
      "phase2a_query1": {
        "query": "site:.gov \"Boston\" bulk trash mattress disposal",
        "success": true,
        "results_count": 5,
        "top_result": {
          "title": "Mattress Recycling | Boston.gov",
          "link": "https://www.boston.gov/departments/public-works/mattress-recycling",
          "snippet": "Curbside mattress pick-up is limited to 10 items per calendar year..."
        }
      },
      "phase2a_query2": {
        "query": "site:.gov \"Boston\" sanitation large item pickup",
        "success": true,
        "results_count": 4,
        "top_result": {
          "title": "Special Collection Items | Boston.gov",
          "link": "https://www.boston.gov/departments/public-works/special-collection-items",
          "snippet": "311 can help answer questions about bulk item pickup..."
        }
      }
      // ... all 9 queries
    }
  },
  {
    "city": "Cambridge",
    "queries": {
      // ... all 9 queries for Cambridge
    }
  }
  // ... all 36 cities
]
```

---

## Rate Limiting

The script includes automatic rate limiting:
- **0.5 seconds** between queries (same city)
- **2 seconds** between cities
- Total runtime: ~15-20 minutes for all 324 queries

---

## API Key

The script automatically uses your API key from `.env`:
```
SERPER_API_KEY=9ed1f7bc62e135d713cfda4ad402c35ee9967713
```

---

## All 36 Cities Tested

1. Boston
2. Cambridge
3. Somerville
4. Brookline
5. Quincy
6. Newton
7. Waltham
8. Watertown
9. Medford
10. Malden
11. Everett
12. Chelsea
13. Revere
14. Winthrop
15. Arlington
16. Belmont
17. Lynn
18. Salem
19. Peabody
20. Beverly
21. Danvers
22. Marblehead
23. Swampscott
24. Nahant
25. Braintree
26. Weymouth
27. Milton
28. Dedham
29. Needham
30. Wellesley
31. Hingham
32. Lexington
33. Woburn
34. Burlington
35. Winchester
36. Stoneham

---

## What This Tests

This script validates that serper.dev API returns the same quality of results as your scraper expects:

✅ Official .gov pages for waste management  
✅ Mattress-specific disposal rules  
✅ Ordinance and fine information  
✅ Competitor pricing data  
✅ Geographic relevance filtering  

The results from this test show you exactly what data your scraper will collect for each city!

---

## Quick Start

```bash
# Install dependencies
pip install requests python-dotenv

# Test first 3 cities (quick validation)
python3 serper_full_test.py 3

# Test all 36 cities (full validation)
python3 serper_full_test.py
```

---

*This matches the exact query format used by your Greater Boston scraper*
