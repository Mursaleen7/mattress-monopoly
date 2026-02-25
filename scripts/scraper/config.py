"""Configuration and constants for the autonomous scraper."""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys - CRITICAL: No defaults, fail fast if missing
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise EnvironmentError("GEMINI_API_KEY not set in environment")

GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
if not GOOGLE_MAPS_API_KEY:
    raise EnvironmentError("GOOGLE_MAPS_API_KEY not set in environment")

SERPAPI_KEY = os.getenv('SERPAPI_KEY')
if not SERPAPI_KEY:
    raise EnvironmentError("SERPAPI_KEY not set in environment")

# User agents for web scraping
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
]

# ── CITY KNOWN DATA ──────────────────────────────────────────────────────────
# Keys are "City Name|ST" (city + pipe + 2-letter state abbreviation).
#
# CRITICAL FIX (Bug 3): Previously keyed only by city name, so "Portland"
# would incorrectly serve Portland, OR data to a query for Portland, ME.
# The "|ST" suffix disambiguates all namesake cities across states.
#
# Usage: CITY_KNOWN_DATA.get(f"{city_name}|{state_abbr.upper()}", {})
#
# This is a SEED CACHE, not the only source of truth.
# Phase 3 scrapes live data first and only falls back here.
# For new cities, AgentCityDiscovery generates candidate URLs dynamically.
CITY_KNOWN_DATA = {
    'Austin|TX': {
        'official_phone': '3-1-1 (512-974-2000)',
        'department_name': 'Austin Resource Recovery',
        'website_url': 'https://www.austintexas.gov/department/austin-resource-recovery',
        'illegal_dumping_fine': 'Up to $2,000 (Class B misdemeanor)',
        'illegal_dumping_citation': 'Austin City Code Chapter 12-8',
    },
    'Dallas|TX': {
        'official_phone': '3-1-1 (214-670-3111)',
        'department_name': 'Dallas Sanitation Services',
        'website_url': 'https://dallascityhall.com/departments/sanitation',
        'illegal_dumping_fine': '$500-$2,000',
        'illegal_dumping_citation': 'Dallas City Code Chapter 18',
    },
    'Houston|TX': {
        'official_phone': '3-1-1 (713-837-0311)',
        'department_name': 'Houston Solid Waste Management',
        'website_url': 'https://www.houstontx.gov/solidwaste',
        'illegal_dumping_fine': '$500-$4,000 (Class A/B misdemeanor)',
        'illegal_dumping_citation': 'Texas Health & Safety Code §365.012',
    },
    'San Antonio|TX': {
        'official_phone': '3-1-1 (210-207-6000)',
        'department_name': 'San Antonio Solid Waste Management Department',
        'website_url': 'https://www.sanantonio.gov/Solid-Waste',
        'illegal_dumping_fine': 'Up to $2,000',
        'illegal_dumping_citation': 'San Antonio City Code Chapter 21',
    },
    'Phoenix|AZ': {
        'official_phone': '(602) 262-7251',
        'department_name': 'Phoenix Public Works - Solid Waste',
        'website_url': 'https://www.phoenix.gov/publicworks/solidwaste',
        'illegal_dumping_fine': 'Up to $2,500',
        'illegal_dumping_citation': 'Phoenix City Code Section 23-18',
    },
    'Los Angeles|CA': {
        'official_phone': '3-1-1 (213-473-3231)',
        'department_name': 'Los Angeles Sanitation (LASAN)',
        'website_url': 'https://www.lacitysan.org',
        'illegal_dumping_fine': '$1,000-$10,000',
        'illegal_dumping_citation': 'Los Angeles Municipal Code Section 56.11',
    },
    'Chicago|IL': {
        'official_phone': '3-1-1',
        'department_name': 'Chicago Department of Streets and Sanitation',
        'website_url': 'https://www.chicago.gov/city/en/depts/streets.html',
        'illegal_dumping_fine': '$500-$5,000',
        'illegal_dumping_citation': 'Chicago Municipal Code Chapter 7-28',
    },
    'New York City|NY': {
        'official_phone': '3-1-1',
        'department_name': 'NYC Department of Sanitation (DSNY)',
        'website_url': 'https://www.nyc.gov/dsny',
        'illegal_dumping_fine': '$4,000-$18,000',
        'illegal_dumping_citation': 'NYC Administrative Code Section 16-118',
    },
    'Philadelphia|PA': {
        'official_phone': '3-1-1 (215-686-5560)',
        'department_name': 'Philadelphia Streets Department',
        'website_url': 'https://www.phila.gov/departments/streets-department',
        'illegal_dumping_fine': '$300-$1,000',
        'illegal_dumping_citation': 'Philadelphia Code Section 10-720',
    },
    'Seattle|WA': {
        'official_phone': '(206) 684-3000',
        'department_name': 'Seattle Public Utilities',
        'website_url': 'https://www.seattle.gov/utilities',
        'illegal_dumping_fine': 'Up to $5,000',
        'illegal_dumping_citation': 'Seattle Municipal Code Section 21.36',
    },
    'Denver|CO': {
        'official_phone': '3-1-1 (720-913-1311)',
        'department_name': 'Denver Department of Transportation and Infrastructure',
        'website_url': (
            'https://www.denvergov.org/Government/Agencies-Departments-Offices/'
            'Agencies-Departments-Offices-Directory/Department-of-Transportation-and-'
            'Infrastructure/Solid-Waste-Management'
        ),
        'illegal_dumping_fine': 'Up to $999',
        'illegal_dumping_citation': 'Denver Revised Municipal Code Section 48-76',
    },
    'Portland|OR': {
        'official_phone': '3-1-1 (503-823-4000)',
        'department_name': 'Portland Bureau of Environmental Services',
        'website_url': 'https://www.portland.gov/bes',
        'illegal_dumping_fine': 'Up to $500 per day',
        'illegal_dumping_citation': 'Portland City Code Chapter 17.102',
    },
    # ── Additional cities to demonstrate disambiguation ──────────────────────
    'Columbus|OH': {
        'official_phone': '311 (614-645-3111)',
        'department_name': 'Columbus Recreation and Parks / Refuse Collection',
        'website_url': 'https://www.columbus.gov/refuse',
        'illegal_dumping_fine': 'Up to $1,000',
        'illegal_dumping_citation': 'Columbus City Code Section 921',
    },
    'Columbus|GA': {
        'official_phone': '(706) 225-4700',
        'department_name': 'Columbus Consolidated Government Solid Waste',
        'website_url': 'https://www.columbusga.gov/solidwaste',
        'illegal_dumping_fine': 'Up to $1,000',
        'illegal_dumping_citation': 'Columbus City Code Chapter 14',
    },
    'Springfield|IL': {
        'official_phone': '(217) 789-2255',
        'department_name': 'Springfield Office of Public Works',
        'website_url': 'https://www.springfield.il.us/publicworks',
        'illegal_dumping_fine': 'Up to $750',
        'illegal_dumping_citation': 'Springfield City Code Chapter 93',
    },
    'Springfield|MO': {
        'official_phone': '(417) 864-1010',
        'department_name': 'Springfield Environmental Services',
        'website_url': 'https://www.springfieldmo.gov/environmental',
        'illegal_dumping_fine': 'Up to $500',
        'illegal_dumping_citation': 'Springfield City Code Chapter 8-230',
    },
    'Portland|ME': {
        'official_phone': '(207) 874-8300',
        'department_name': 'Portland Public Services',
        'website_url': 'https://www.portlandmaine.gov/publicservices',
        'illegal_dumping_fine': 'Up to $500',
        'illegal_dumping_citation': 'Portland ME City Code Chapter 27',
    },
}

# ── GOV URL PATTERNS ─────────────────────────────────────────────────────────
# Generic URL patterns tried when SERPAPI finds nothing.
# {city} = city name lowercase no spaces, {state} = state abbr lowercase
GOV_URL_PATTERNS = [
    "https://www.{city}{state}.gov",
    "https://{city}.{state}.gov",
    "https://www.ci.{city_hyphen}.{state}.us",
    "https://{city}gov.com",
    "https://www.{city}tx.gov",
    "https://www.{city}ca.gov",
    "https://{city_hyphen}citycouncil.org",
]

# Search query templates for waste management discovery.
WASTE_SEARCH_QUERIES = [
    'site:.gov "{city}" bulk trash mattress disposal',
    'site:.gov "{city}" sanitation large item pickup',
    '"{city}" "{state_name}" official waste management mattress schedule',
    '"{city}" "{state_abbr}" bulk item curbside pickup schedule site:.gov OR site:.us',
    '"{city}" solid waste department mattress disposal 2024 OR 2025 OR 2026',
]

ORDINANCE_SEARCH_QUERIES = [
    'site:.gov "{city}" illegal dumping fine ordinance code',
    '"{city}" "{state_abbr}" illegal dumping penalty "$" misdemeanor',
    '"{city}" city code illegal dumping fine amount',
]

# ── WEATHER / REGIONAL ───────────────────────────────────────────────────────
# Cities with heavy rain → "wet mattress rejection risk" copy is surfaced.
RAINY_CITIES = {
    'Seattle', 'Portland', 'Miami', 'New Orleans', 'Houston', 'Mobile',
    'Pensacola', 'Baton Rouge', 'Tallahassee', 'Jacksonville',
    'Birmingham', 'Memphis', 'Nashville', 'Louisville', 'Cincinnati',
    'Atlanta', 'Tampa', 'Orlando', 'Charlotte', 'Raleigh', 'Richmond',
    'Norfolk', 'Baltimore', 'Philadelphia', 'New York City', 'Boston',
    'Providence', 'Hartford', 'Buffalo', 'Pittsburgh', 'Cleveland',
    'Detroit', 'Milwaukee', 'Minneapolis', 'Columbus', 'Indianapolis',
    'Kansas City', 'St. Louis', 'Oklahoma City', 'Tulsa', 'Little Rock',
    'Jackson', 'Savannah', 'Macon', 'Augusta',
}

# ── CONFIDENCE THRESHOLDS ────────────────────────────────────────────────────
LOW_CONFIDENCE_THRESHOLD = 0.4