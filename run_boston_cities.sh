#!/bin/bash
# Wrapper script to run Boston scraper with correct Python path

cd "$(dirname "$0")"
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"
cd src/scraper
python3 -m scraper.run_boston_scraper --cities
