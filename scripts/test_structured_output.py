#!/usr/bin/env python3
"""Test Gemini structured output with simple schemas"""

import os
import json
import google.generativeai as genai
from pydantic import BaseModel

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyBOFqBJ1TeWC56RgLxPy8_FaKbfmmql7EQ')
genai.configure(api_key=GEMINI_API_KEY)

class ContactSchema(BaseModel):
    """Simple contact schema"""
    official_phone: str | None = None
    department_name: str | None = None
    website_url: str | None = None

# Test with gemini-1.5-flash-latest
model = genai.GenerativeModel('gemini-1.5-flash-latest')

prompt = """Extract contact info for Austin waste management.

TEXT:
Austin Resource Recovery
Phone: 512-974-2000 (3-1-1)
Website: https://www.austintexas.gov/department/austin-resource-recovery

Find: phone, department name, website URL"""

print("Testing Gemini structured output...")
print(f"Model: gemini-1.5-flash-latest")
print(f"Schema: ContactSchema\n")

try:
    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema=ContactSchema,
            temperature=0.1
        )
    )
    
    result = json.loads(response.text)
    print("✅ SUCCESS!")
    print(json.dumps(result, indent=2))
    
except Exception as e:
    print(f"❌ ERROR: {e}")
    print(f"Error type: {type(e).__name__}")
