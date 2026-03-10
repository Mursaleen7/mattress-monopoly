#!/usr/bin/env python3
"""
Test script to verify API keys are working correctly.
"""
import os
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
SERPAPI_KEY = os.getenv('SERPAPI_KEY')

print("=" * 70)
print("API KEY VERIFICATION TEST")
print("=" * 70)
print()

# Test 1: Check if keys are loaded
print("1️⃣  Checking if API keys are loaded from .env...")
print(f"   GEMINI_API_KEY: {'✅ Set' if GEMINI_API_KEY else '❌ Missing'}")
print(f"   GOOGLE_MAPS_API_KEY: {'✅ Set' if GOOGLE_MAPS_API_KEY else '❌ Missing'}")
print(f"   SERPAPI_KEY: {'✅ Set' if SERPAPI_KEY else '❌ Missing'}")
print()

# Test 2: Test Google Maps Geocoding API
print("2️⃣  Testing Google Maps Geocoding API...")
if GOOGLE_MAPS_API_KEY:
    try:
        url = "https://maps.googleapis.com/maps/api/geocode/json"
        params = {
            'address': 'Boston, MA, USA',
            'key': GOOGLE_MAPS_API_KEY
        }
        response = httpx.get(url, params=params, timeout=10.0)
        data = response.json()
        
        if data['status'] == 'OK':
            print(f"   ✅ SUCCESS: Geocoding API is working")
            print(f"   Location: {data['results'][0]['formatted_address']}")
        elif data['status'] == 'REQUEST_DENIED':
            print(f"   ❌ FAILED: REQUEST_DENIED")
            print(f"   Error: {data.get('error_message', 'No error message')}")
            print()
            print("   🔧 FIX: Enable Geocoding API in Google Cloud Console:")
            print("      1. Go to https://console.cloud.google.com/")
            print("      2. Select your project")
            print("      3. Go to APIs & Services → Library")
            print("      4. Search for 'Geocoding API' and enable it")
            print("      5. Search for 'Places API' and enable it")
        else:
            print(f"   ⚠️  Status: {data['status']}")
            print(f"   Message: {data.get('error_message', 'Unknown error')}")
    except Exception as e:
        print(f"   ❌ ERROR: {e}")
else:
    print("   ❌ SKIPPED: No API key found")
print()

# Test 3: Test Google Gemini API
print("3️⃣  Testing Google Gemini API...")
if GEMINI_API_KEY:
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content("Say 'API working' if you can read this.")
        print(f"   ✅ SUCCESS: Gemini API is working")
        print(f"   Response: {response.text[:50]}...")
    except Exception as e:
        error_str = str(e)
        if 'API_KEY_INVALID' in error_str or 'expired' in error_str.lower():
            print(f"   ❌ FAILED: API key is invalid or expired")
            print(f"   Error: {error_str[:100]}")
            print()
            print("   🔧 FIX: Get a new Gemini API key:")
            print("      1. Go to https://aistudio.google.com/app/apikey")
            print("      2. Create a new API key")
            print("      3. Update GEMINI_API_KEY in .env file")
        else:
            print(f"   ❌ ERROR: {error_str[:100]}")
else:
    print("   ❌ SKIPPED: No API key found")
print()

# Test 4: Test SerpAPI (if using)
print("4️⃣  Testing SerpAPI...")
if SERPAPI_KEY:
    try:
        url = "https://serpapi.com/search"
        params = {
            'q': 'test',
            'api_key': SERPAPI_KEY,
            'num': 1
        }
        response = httpx.get(url, params=params, timeout=10.0)
        
        if response.status_code == 200:
            print(f"   ✅ SUCCESS: SerpAPI is working")
        else:
            print(f"   ⚠️  Status: {response.status_code}")
            print(f"   Note: You provided a serper.dev key, but scraper uses serpapi.com")
            print()
            print("   🔧 FIX: Get a SerpAPI key:")
            print("      1. Go to https://serpapi.com/")
            print("      2. Sign up and get an API key")
            print("      3. Update SERPAPI_KEY in .env file")
            print()
            print("   OR use serper.dev (requires code changes)")
    except Exception as e:
        print(f"   ⚠️  Could not test: {str(e)[:100]}")
        print(f"   Note: You may need a serpapi.com key instead of serper.dev")
else:
    print("   ❌ SKIPPED: No API key found")
print()

print("=" * 70)
print("SUMMARY")
print("=" * 70)
print()
print("Next steps:")
print("1. Fix any ❌ FAILED tests above")
print("2. Re-run this test: python3 test_api_keys.py")
print("3. Once all tests pass, run the scraper again")
print()
