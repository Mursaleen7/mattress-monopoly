#!/bin/bash
# Check status of Run 2

echo "=================================="
echo "RUN 2 STATUS CHECK"
echo "=================================="
echo ""

if [ -d "data_run2" ]; then
    echo "✓ data_run2 folder exists"
    echo ""
    echo "Files generated:"
    ls -1 data_run2/autonomous_*.json 2>/dev/null | wc -l | xargs echo "  Count:"
    echo ""
    
    if [ -f "data_run2/autonomous_cities.json" ]; then
        echo "✅ Combined file exists!"
        echo "   Size: $(ls -lh data_run2/autonomous_cities.json | awk '{print $5}')"
        echo ""
        echo "Ready to compare! Run:"
        echo "  python3 scripts/compare_runs.py"
    else
        echo "⏳ Still processing... (combined file not yet created)"
        echo ""
        echo "Latest files:"
        ls -lt data_run2/autonomous_*.json 2>/dev/null | head -3
    fi
else
    echo "⏳ Run 2 not started or folder not created yet"
fi

echo ""
echo "=================================="
