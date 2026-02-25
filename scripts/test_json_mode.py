#!/usr/bin/env python3
"""Test Gemini JSON mode without Pydantic schemas"""

import os
import json
import google.generativeai as genai

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyBOFqBJ1TeWC56RgLxPy8_FaKbfmmql7EQ')
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-2.0-flash')

prompt = """Extract contact info for Austin waste management.

TEXT:
Austin Resource Recovery
Phone: 512-974-2000 (3-1-1)
Website: https://www.austintexas.gov/department/austin-resource-recovery

Return JSON with this exact structure:
{
  "official_phone": "exact text or null",
  "department_name": "exact text or null",
  "website_url": "exact text or null"
}

No markdown, just JSON."""

print("Testing Gemini JSON mode (no Pydantic)...")
print(f"Model: gemini-1.5-flash-latest\n")

try:
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            temperature=0.1
        )
    )
    
    result = json.loads(response.text)
    print("✅ SUCCESS!")
    print(json.dumps(result, indent=2))
    
except Exception as e:
    print(f"❌ ERROR: {e}")
    print(f"Error type: {type(e).__name__}")
    if hasattr(e, '__dict__'):
        print(f"Details: {e.__dict__}")
