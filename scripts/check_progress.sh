#!/bin/bash
# Quick progress checker for autonomous scraper

echo "=================================="
echo "SCRAPER PROGRESS CHECK"
echo "=================================="
echo ""

# Count generated files
echo "Generated city files:"
ls -1 data/autonomous_*.json 2>/dev/null | wc -l | xargs echo "  Files:"

echo ""
echo "Latest files:"
ls -lt data/autonomous_*.json 2>/dev/null | head -5

echo ""
echo "=================================="
echo "To view full output, check the process logs"
echo "=================================="
