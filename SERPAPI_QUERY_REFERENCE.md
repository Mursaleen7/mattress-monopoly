# SerpAPI Query Reference - Greater Boston Area
## Complete Search Query List for All 320 Locations

This document contains all search queries used by the scraper for comprehensive data collection across the Greater Boston area.

---

## Query Template Structure

Each location uses 8 different query types to gather complete data:

### Phase 2A: Waste Management Queries (5 queries)
1. `site:.gov "{LOCATION}" bulk trash mattress disposal`
2. `site:.gov "{LOCATION}" sanitation large item pickup`
3. `"{LOCATION}" "Massachusetts" official waste management mattress schedule`
4. `"{LOCATION}" "MA" bulk item curbside pickup schedule site:.gov OR site:.us`
5. `"{LOCATION}" solid waste department mattress disposal 2024 OR 2025 OR 2026`

### Phase 2B: Ordinance/Fine Queries (3 queries)
6. `site:.gov "{LOCATION}" illegal dumping fine ordinance code`
7. `"{LOCATION}" "MA" illegal dumping penalty "$" misdemeanor`
8. `"{LOCATION}" city code illegal dumping fine amount`

### Phase 5: Competitor Pricing Query (1 query)
9. `1-800-got-junk mattress removal {LOCATION} MA price`

---

## TIER 1: CITIES (36 locations)

### Core Boston Metro

#### 1. Boston, MA
```
site:.gov "Boston" bulk trash mattress disposal
site:.gov "Boston" sanitation large item pickup
"Boston" "Massachusetts" official waste management mattress schedule
"Boston" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"Boston" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "Boston" illegal dumping fine ordinance code
"Boston" "MA" illegal dumping penalty "$" misdemeanor
"Boston" city code illegal dumping fine amount
1-800-got-junk mattress removal Boston MA price
```

#### 2. Cambridge, MA
```
site:.gov "Cambridge" bulk trash mattress disposal
site:.gov "Cambridge" sanitation large item pickup
"Cambridge" "Massachusetts" official waste management mattress schedule
"Cambridge" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"Cambridge" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "Cambridge" illegal dumping fine ordinance code
"Cambridge" "MA" illegal dumping penalty "$" misdemeanor
"Cambridge" city code illegal dumping fine amount
1-800-got-junk mattress removal Cambridge MA price
```

#### 3. Somerville, MA
```
site:.gov "Somerville" bulk trash mattress disposal
site:.gov "Somerville" sanitation large item pickup
"Somerville" "Massachusetts" official waste management mattress schedule
"Somerville" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"Somerville" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "Somerville" illegal dumping fine ordinance code
"Somerville" "MA" illegal dumping penalty "$" misdemeanor
"Somerville" city code illegal dumping fine amount
1-800-got-junk mattress removal Somerville MA price
```

#### 4. Brookline, MA
```
site:.gov "Brookline" bulk trash mattress disposal
site:.gov "Brookline" sanitation large item pickup
"Brookline" "Massachusetts" official waste management mattress schedule
"Brookline" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"Brookline" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "Brookline" illegal dumping fine ordinance code
"Brookline" "MA" illegal dumping penalty "$" misdemeanor
"Brookline" city code illegal dumping fine amount
1-800-got-junk mattress removal Brookline MA price
```

### Inner Ring Cities

#### 5. Quincy, MA | 6. Newton, MA | 7. Waltham, MA | 8. Watertown, MA
#### 9. Medford, MA | 10. Malden, MA | 11. Everett, MA | 12. Chelsea, MA
#### 13. Revere, MA | 14. Winthrop, MA | 15. Arlington, MA | 16. Belmont, MA

**Query Pattern (replace {CITY} with city name):**
```
site:.gov "{CITY}" bulk trash mattress disposal
site:.gov "{CITY}" sanitation large item pickup
"{CITY}" "Massachusetts" official waste management mattress schedule
"{CITY}" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"{CITY}" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "{CITY}" illegal dumping fine ordinance code
"{CITY}" "MA" illegal dumping penalty "$" misdemeanor
"{CITY}" city code illegal dumping fine amount
1-800-got-junk mattress removal {CITY} MA price
```

### North Shore Cities

#### 17. Lynn, MA | 18. Salem, MA | 19. Peabody, MA | 20. Beverly, MA
#### 21. Danvers, MA | 22. Marblehead, MA | 23. Swampscott, MA | 24. Nahant, MA

**Query Pattern:** Same as above, replace {CITY} with city name

### South Shore Cities

#### 25. Braintree, MA | 26. Weymouth, MA | 27. Milton, MA | 28. Dedham, MA
#### 29. Needham, MA | 30. Wellesley, MA | 31. Hingham, MA

**Query Pattern:** Same as above, replace {CITY} with city name

### West/Northwest Cities

#### 32. Lexington, MA | 33. Woburn, MA | 34. Burlington, MA
#### 35. Winchester, MA | 36. Stoneham, MA

**Query Pattern:** Same as above, replace {CITY} with city name

---

## TIER 2: MUNICIPALITIES (105 locations)

### Boston Neighborhoods (26 neighborhoods)

#### Allston | Brighton | Charlestown | Dorchester | East Boston
#### Hyde Park | Jamaica Plain | Mattapan | Roslindale | Roxbury
#### South Boston | West Roxbury | Back Bay | Beacon Hill | North End
#### South End | Fenway | Kenmore | Mission Hill | Chinatown
#### Downtown Boston | Financial District | Seaport | West End
#### Bay Village | Leather District

**Query Pattern for Boston Neighborhoods:**
```
site:.gov "{NEIGHBORHOOD}" bulk trash mattress disposal
site:.gov "{NEIGHBORHOOD}" sanitation large item pickup
"{NEIGHBORHOOD}" "Massachusetts" official waste management mattress schedule
"{NEIGHBORHOOD}" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"{NEIGHBORHOOD}" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "{NEIGHBORHOOD}" illegal dumping fine ordinance code
"{NEIGHBORHOOD}" "MA" illegal dumping penalty "$" misdemeanor
"{NEIGHBORHOOD}" city code illegal dumping fine amount
1-800-got-junk mattress removal {NEIGHBORHOOD} MA price
```

### Cambridge Neighborhoods (10 areas)

#### Harvard Square | Central Square | Kendall Square | Porter Square
#### Inman Square | East Cambridge | North Cambridge | West Cambridge
#### Cambridgeport | Riverside

**Query Pattern:** Same as above, replace {NEIGHBORHOOD} with area name

### Somerville Neighborhoods (9 areas)

#### Davis Square | Union Square | Assembly Square | Ball Square
#### Teele Square | Winter Hill | Spring Hill | East Somerville
#### West Somerville

**Query Pattern:** Same as above

### Brookline Neighborhoods (5 areas)

#### Coolidge Corner | Brookline Village | Washington Square
#### Chestnut Hill | Longwood

**Query Pattern:** Same as above

### Newton Villages (13 villages)

#### Newton Centre | Newton Highlands | Newton Corner | Newtonville
#### West Newton | Auburndale | Waban | Chestnut Hill
#### Newton Upper Falls | Newton Lower Falls | Nonantum | Oak Hill
#### Thompsonville

**Query Pattern:** Same as above

### Quincy Neighborhoods (7 areas)

#### Quincy Center | Wollaston | North Quincy | West Quincy
#### Squantum | Marina Bay | Merrymount

**Query Pattern:** Same as above

### Additional High-Density Towns (35 locations)

#### Concord | Natick | Framingham | Weston | Wayland | Lincoln
#### Bedford | Reading | Wakefield | Melrose | Saugus | Lynnfield
#### Wilmington | Billerica | Tewksbury | Andover | North Andover
#### Gloucester | Rockport | Essex | Manchester-by-the-Sea | Cohasset
#### Scituate | Hull | Randolph | Holbrook | Canton | Sharon
#### Stoughton | Norwood | Westwood | Dover | Medfield | Millis
#### Sherborn

**Query Pattern:** Same as above, replace {NEIGHBORHOOD} with town name

---

## TIER 3: ZIP CODES (179 locations)

### Query Pattern for Zip Codes:
```
site:.gov "{ZIP}" bulk trash mattress disposal
site:.gov "{ZIP}" sanitation large item pickup
"{ZIP}" "Massachusetts" official waste management mattress schedule
"{ZIP}" "MA" bulk item curbside pickup schedule site:.gov OR site:.us
"{ZIP}" solid waste department mattress disposal 2024 OR 2025 OR 2026
site:.gov "{ZIP}" illegal dumping fine ordinance code
"{ZIP}" "MA" illegal dumping penalty "$" misdemeanor
"{ZIP}" city code illegal dumping fine amount
1-800-got-junk mattress removal {ZIP} MA price
```

### Boston Zip Codes (23 codes)
02108, 02109, 02110, 02111, 02113, 02114, 02115, 02116, 02118, 02119, 02120, 02121, 02122, 02124, 02125, 02126, 02127, 02128, 02129, 02130, 02131, 02132, 02134

### Cambridge Zip Codes (6 codes)
02138, 02139, 02140, 02141, 02142, 02238

### Somerville Zip Codes (3 codes)
02143, 02144, 02145

### Brookline Zip Codes (2 codes)
02445, 02446

### Quincy Zip Codes (7 codes)
02169, 02170, 02171, 02269, 02171, 02269, 02171

### Newton Zip Codes (11 codes)
02458, 02459, 02460, 02461, 02462, 02464, 02465, 02466, 02467, 02468, 02495

### Additional Greater Boston Zip Codes (127+ codes)
02148, 02149, 02150, 02151, 02152, 02155, 02176, 02180, 02184, 02186, 02188, 02189, 02190, 02191, 02199, 02201, 02203, 02204, 02205, 02206, 02210, 02211, 02212, 02215, 02217, 02222, 02228, 02241, 02266, 02283, 02284, 02293, 02297, 02298, 02301, 02302, 02303, 02304, 02305, 02322, 02324, 02325, 02327, 02330, 02331, 02332, 02333, 02334, 02337, 02338, 02339, 02340, 02341, 02343, 02344, 02345, 02346, 02347, 02348, 02349, 02350, 02351, 02355, 02356, 02357, 02358, 02359, 02360, 02361, 02362, 02364, 02366, 02367, 02368, 02370, 02375, 02379, 02381, 02382, 02420, 02421, 02451, 02452, 02453, 02454, 02455, 02456, 02457, 02471, 02472, 02474, 02475, 02476, 02477, 02478, 02479, 02481, 02482, 02492, 02493, 02494, 01730, 01731, 01740, 01741, 01742, 01746, 01748, 01749, 01760, 01770, 01773, 01775, 01776, 01778, 01801, 01803, 01805, 01810, 01821, 01824, 01826, 01827, 01830, 01832, 01833, 01834, 01835, 01840, 01841, 01842, 01843, 01844, 01845, 01850, 01851, 01852, 01853, 01854, 01860, 01862, 01863, 01864, 01865, 01866, 01867, 01876, 01879, 01880, 01886, 01887, 01888, 01889, 01890, 01901, 01902, 01904, 01905, 01906, 01907, 01908, 01910, 01913, 01915, 01921, 01922, 01923, 01929, 01930, 01938, 01940, 01944, 01945, 01949, 01950, 01951, 01952, 01960, 01966, 01969, 01970, 01982, 01983, 01984, 01985

---

## SerpAPI Parameters

Use these parameters for all queries:

```json
{
  "engine": "google",
  "q": "[YOUR QUERY HERE]",
  "location": "United States",
  "gl": "us",
  "hl": "en",
  "num": 5
}
```

---

## Total Query Count

- **Cities:** 36 locations × 9 queries = 324 queries
- **Municipalities:** 105 locations × 9 queries = 945 queries
- **Zip Codes:** 179 locations × 9 queries = 1,611 queries

**GRAND TOTAL: 2,880 search queries** across all 320 Greater Boston locations

---

## Usage Notes

1. **Rate Limiting:** Space out queries to avoid hitting API rate limits
2. **Domain Filtering:** Scraper automatically filters results to keep only relevant .gov domains
3. **Fallback Logic:** If first query returns no results, scraper tries subsequent queries
4. **Content Validation:** All scraped content is validated for geographical relevance

---

## Quick Reference: Top 3 Most Effective Queries

Based on scraper performance, these queries typically yield the best results:

1. `site:.gov "{LOCATION}" bulk trash mattress disposal`
2. `"{LOCATION}" "Massachusetts" official waste management mattress schedule`
3. `1-800-got-junk mattress removal {LOCATION} MA price` (for competitor pricing)

---

*Generated for Greater Boston Area Scraper - 320 Total Locations*
