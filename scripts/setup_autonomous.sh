#!/bin/bash
# AUTONOMOUS SCRAPER SETUP SCRIPT

echo "🤖 Setting up Autonomous Multi-Agent Pipeline..."
echo ""

# Check Python version
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✓ Python version: $python_version"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pip3 install -r requirements_autonomous.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Edit .env and add your API keys!"
    echo ""
    echo "Required API keys:"
    echo "  - ANTHROPIC_API_KEY (get from https://console.anthropic.com/)"
    echo "  - GOOGLE_MAPS_API_KEY (get from https://console.cloud.google.com/)"
    echo ""
    echo "Optional but recommended:"
    echo "  - SERPAPI_KEY (get from https://serpapi.com/)"
    echo ""
else
    echo ""
    echo "✓ .env file already exists"
fi

# Create data directory if it doesn't exist
if [ ! -d ../data ]; then
    mkdir ../data
    echo "✓ Created data directory"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit scripts/.env and add your API keys"
echo "  2. Test with: python3 autonomous_scraper.py"
echo "  3. Batch process: python3 batch_autonomous.py 0 10"
echo ""
echo "Read AUTONOMOUS_PIPELINE_GUIDE.md for full documentation."
