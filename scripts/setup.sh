#!/bin/bash
# Setup script for the refactored autonomous scraper

set -e

echo "🚀 Setting up Autonomous Scraper (Refactored Version)"
echo "=================================================="
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python 3 found: $(python3 --version)"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip."
    exit 1
fi

echo "✅ pip3 found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt

echo ""
echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit scripts/.env and add your API keys:"
    echo "   - GEMINI_API_KEY"
    echo "   - GOOGLE_MAPS_API_KEY"
    echo "   - SERPAPI_KEY"
    echo ""
    echo "   Get your keys from:"
    echo "   - Gemini: https://aistudio.google.com/app/apikey"
    echo "   - Google Maps: https://console.cloud.google.com/apis/credentials"
    echo "   - SerpAPI: https://serpapi.com/manage-api-key"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if .env is in .gitignore
if ! grep -q "scripts/.env" ../.gitignore 2>/dev/null && ! grep -q ".env\*" ../.gitignore 2>/dev/null; then
    echo "⚠️  WARNING: .env is not in .gitignore!"
    echo "   Adding it now..."
    echo "scripts/.env" >> ../.gitignore
    echo "✅ Added to .gitignore"
    echo ""
fi

echo "=================================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit scripts/.env and add your API keys"
echo "2. Run: python3 run_scraper.py --dry-run"
echo "3. If successful, run: python3 run_scraper.py"
echo ""
echo "For help: python3 run_scraper.py --help"
echo "=================================================="
