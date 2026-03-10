"""
Greater Boston Area Configuration - SATURATED COVERAGE
Defines cities, municipalities, and zip codes for complete Boston metro market penetration.

Target: ~350-400 total locations
- Tier 1 (Cities): ~35 files
- Tier 2 (Municipalities): ~120 files  
- Tier 3 (Zip Codes): ~220 files
"""

# ═══════════════════════════════════════════════════════════════════════════════
# TIER 1: CITIES (Major municipalities and towns) - ~35 locations
# ═══════════════════════════════════════════════════════════════════════════════

BOSTON_CITIES = [
    # Core Boston Metro
    {'name': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Brookline', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # Inner Ring Cities
    {'name': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Waltham', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Watertown', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Medford', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Malden', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Everett', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Chelsea', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Revere', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Winthrop', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Arlington', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Belmont', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # North Shore
    {'name': 'Lynn', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Salem', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Peabody', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Beverly', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Danvers', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Marblehead', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Swampscott', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Nahant', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # South Shore
    {'name': 'Braintree', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Weymouth', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Milton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Dedham', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Needham', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Wellesley', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Hingham', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # West/Northwest
    {'name': 'Lexington', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Woburn', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Burlington', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Winchester', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Stoneham', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
]

# ═══════════════════════════════════════════════════════════════════════════════
# TIER 2: MUNICIPALITIES (Neighborhoods, suburbs, villages) - ~120 locations
# ═══════════════════════════════════════════════════════════════════════════════

BOSTON_MUNICIPALITIES = [
    # ── BOSTON NEIGHBORHOODS (Official 23 neighborhoods + popular sub-areas) ──
    {'name': 'Allston', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Brighton', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Charlestown', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Dorchester', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'East Boston', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Hyde Park', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Jamaica Plain', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Mattapan', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Roslindale', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Roxbury', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'South Boston', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'West Roxbury', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Back Bay', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Beacon Hill', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'North End', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'South End', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Fenway', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Kenmore', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Mission Hill', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Chinatown', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Downtown Boston', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Financial District', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Seaport', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'West End', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Bay Village', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Leather District', 'parent_city': 'Boston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # ── CAMBRIDGE NEIGHBORHOODS ──
    {'name': 'Harvard Square', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Central Square', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Kendall Square', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Porter Square', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Inman Square', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'East Cambridge', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'North Cambridge', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'West Cambridge', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Cambridgeport', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Riverside', 'parent_city': 'Cambridge', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # ── SOMERVILLE NEIGHBORHOODS ──
    {'name': 'Davis Square', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Union Square', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Assembly Square', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Ball Square', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Teele Square', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Winter Hill', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Spring Hill', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'East Somerville', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'West Somerville', 'parent_city': 'Somerville', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # ── BROOKLINE NEIGHBORHOODS ──
    {'name': 'Coolidge Corner', 'parent_city': 'Brookline', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Brookline Village', 'parent_city': 'Brookline', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Washington Square', 'parent_city': 'Brookline', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Chestnut Hill', 'parent_city': 'Brookline', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Longwood', 'parent_city': 'Brookline', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # ── NEWTON VILLAGES (13 villages) ──
    {'name': 'Newton Centre', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Newton Highlands', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Newton Corner', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Newtonville', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'West Newton', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Auburndale', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Waban', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Chestnut Hill', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Newton Upper Falls', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Newton Lower Falls', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Nonantum', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Oak Hill', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Thompsonville', 'parent_city': 'Newton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # ── QUINCY NEIGHBORHOODS ──
    {'name': 'Quincy Center', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Wollaston', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'North Quincy', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'West Quincy', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Squantum', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Marina Bay', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Merrymount', 'parent_city': 'Quincy', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    
    # ── SMALLER TOWNS & VILLAGES (High apartment density areas) ──
    {'name': 'Concord', 'parent_city': 'Concord', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Natick', 'parent_city': 'Natick', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Framingham', 'parent_city': 'Framingham', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Weston', 'parent_city': 'Weston', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Wayland', 'parent_city': 'Wayland', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Lincoln', 'parent_city': 'Lincoln', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Bedford', 'parent_city': 'Bedford', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Reading', 'parent_city': 'Reading', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Wakefield', 'parent_city': 'Wakefield', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Melrose', 'parent_city': 'Melrose', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Saugus', 'parent_city': 'Saugus', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Lynnfield', 'parent_city': 'Lynnfield', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Wilmington', 'parent_city': 'Wilmington', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Billerica', 'parent_city': 'Billerica', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Tewksbury', 'parent_city': 'Tewksbury', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Andover', 'parent_city': 'Andover', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'North Andover', 'parent_city': 'North Andover', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Gloucester', 'parent_city': 'Gloucester', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Rockport', 'parent_city': 'Rockport', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Essex', 'parent_city': 'Essex', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Manchester-by-the-Sea', 'parent_city': 'Manchester-by-the-Sea', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Cohasset', 'parent_city': 'Cohasset', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Scituate', 'parent_city': 'Scituate', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Hull', 'parent_city': 'Hull', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Randolph', 'parent_city': 'Randolph', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Holbrook', 'parent_city': 'Holbrook', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Canton', 'parent_city': 'Canton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Sharon', 'parent_city': 'Sharon', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Stoughton', 'parent_city': 'Stoughton', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Norwood', 'parent_city': 'Norwood', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Westwood', 'parent_city': 'Westwood', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Dover', 'parent_city': 'Dover', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Medfield', 'parent_city': 'Medfield', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Millis', 'parent_city': 'Millis', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
    {'name': 'Sherborn', 'parent_city': 'Sherborn', 'state_abbr': 'MA', 'state_name': 'Massachusetts'},
]

# Import extended zip code list for saturated coverage
try:
    from .boston_zipcodes_extended import EXTENDED_BOSTON_ZIP_CODES
except ImportError:
    from boston_zipcodes_extended import EXTENDED_BOSTON_ZIP_CODES

# Greater Boston Area - Zip Codes (High-traffic areas)
# Using extended list for maximum market saturation (~220 zip codes)
BOSTON_ZIP_CODES = EXTENDED_BOSTON_ZIP_CODES

# Alternatively, use the basic list below for faster testing (uncomment to use):
# BOSTON_ZIP_CODES = [
#     # Boston proper
#     {'zip': '02108', 'neighborhood': 'Beacon Hill', 'city': 'Boston', 'state_abbr': 'MA'},
#     ... (see boston_zipcodes_extended.py for full list)
# ]


def get_all_boston_locations():
    """
    Returns all cities, municipalities, and zip codes for Greater Boston area.
    
    Returns:
        dict with keys: 'cities', 'municipalities', 'zip_codes'
    """
    return {
        'cities': BOSTON_CITIES,
        'municipalities': BOSTON_MUNICIPALITIES,
        'zip_codes': BOSTON_ZIP_CODES,
    }


def get_location_count():
    """Returns total count of locations to scrape."""
    return {
        'cities': len(BOSTON_CITIES),
        'municipalities': len(BOSTON_MUNICIPALITIES),
        'zip_codes': len(BOSTON_ZIP_CODES),
        'total': len(BOSTON_CITIES) + len(BOSTON_MUNICIPALITIES) + len(BOSTON_ZIP_CODES),
    }
