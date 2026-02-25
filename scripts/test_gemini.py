#!/usr/bin/env python3
"""
Test Gemini API Key
"""

import google.generativeai as genai
import sys

# Your Gemini API key
GEMINI_KEY = "AIzaSyBOFqBJ1TeWC56RgLxPy8_FaKbfmmql7EQ"

print("Testing Gemini API...")
print(f"Key: {GEMINI_KEY[:20]}...")

try:
    genai.configure(api_key=GEMINI_KEY)
    
    # List available models
    print("\nListing available models...")
    models = list(genai.list_models())
    
    print(f"\n✅ Found {len(models)} models")
    
    # Find models that support generateContent
    content_models = [m for m in models if 'generateContent' in m.supported_generation_methods]
    
    if content_models:
        print(f"\nModels supporting generateContent:")
        for m in content_models:
            print(f"  - {m.name}")
        
        # Test with first available model
        test_model = content_models[0]
        print(f"\nTesting with {test_model.name}...")
        
        model = genai.GenerativeModel(test_model.name)
        response = model.generate_content('Say hello in JSON: {"message": "hello"}')
        
        print(f"\n✅ SUCCESS! Gemini API is working!")
        print(f"Response: {response.text[:200]}")
        
    else:
        print("\n❌ No models support generateContent")
        
except Exception as e:
    print(f"\n❌ ERROR: {e}")
    print("\nThe API key appears to be invalid or revoked.")
    print("\nTo fix:")
    print("1. Go to: https://aistudio.google.com/app/apikey")
    print("2. Create a new API key")
    print("3. Update scripts/.env with the new key")
    sys.exit(1)
