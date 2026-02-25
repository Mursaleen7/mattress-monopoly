# Migration Checklist

## 🔒 Security (DO THIS FIRST)

- [ ] **Check if API keys were committed to git**
  ```bash
  git log -p scripts/autonomous_scraper.py | grep -i "AIzaSy"
  ```

- [ ] **If keys were committed, rotate ALL keys immediately**
  - [ ] Gemini API: https://aistudio.google.com/app/apikey
  - [ ] Google Maps API: https://console.cloud.google.com/apis/credentials
  - [ ] SerpAPI: https://serpapi.com/manage-api-key

- [ ] **Delete old keys from API dashboards**
  - [ ] Gemini: Delete old key
  - [ ] Google Maps: Delete old key
  - [ ] SerpAPI: Delete old key

- [ ] **Monitor API usage for anomalies**
  - [ ] Check Gemini usage dashboard
  - [ ] Check Google Maps billing
  - [ ] Check SerpAPI usage

## 📦 Setup

- [ ] **Navigate to scripts directory**
  ```bash
  cd scripts
  ```

- [ ] **Run setup script**
  ```bash
  chmod +x setup.sh
  ./setup.sh
  ```

- [ ] **Verify dependencies installed**
  ```bash
  pip3 list | grep -E "httpx|beautifulsoup4|google-generativeai|pydantic|python-dotenv"
  ```

- [ ] **Create .env file with NEW keys**
  ```bash
  # Edit .env file
  nano .env
  
  # Add:
  GEMINI_API_KEY=your_new_key_here
  GOOGLE_MAPS_API_KEY=your_new_key_here
  SERPAPI_KEY=your_new_key_here
  ```

- [ ] **Verify .env is in .gitignore**
  ```bash
  grep -E "\.env|scripts/\.env" ../.gitignore
  ```

## 🧪 Testing

- [ ] **Test Python compilation**
  ```bash
  python3 -m py_compile scraper/*.py run_scraper.py
  ```

- [ ] **Test with dry run (single city)**
  ```bash
  python3 run_scraper.py --dry-run --cities Austin
  ```

- [ ] **Verify no errors in output**
  - [ ] No "EnvironmentError"
  - [ ] No "ModuleNotFoundError"
  - [ ] No "KeyError" or "AttributeError"

- [ ] **Check API calls work**
  - [ ] See "[SUCCESS]" messages for geo_api
  - [ ] See "[SUCCESS]" messages for gov_page_scraped
  - [ ] See "[SUCCESS]" messages for agent_dispatcher

## 🚀 First Real Run

- [ ] **Run with single city first**
  ```bash
  python3 run_scraper.py --cities Austin
  ```

- [ ] **Verify output file created**
  ```bash
  ls -lh ../data/autonomous_austin.json
  ```

- [ ] **Check output quality**
  ```bash
  # View confidence score
  cat ../data/autonomous_austin.json | grep -A 3 "confidence"
  
  # Count facilities
  cat ../data/autonomous_austin.json | grep -c "\"name\":"
  
  # Check for required fields
  cat ../data/autonomous_austin.json | grep -E "official_phone|website_url|mattress_specific_rule"
  ```

- [ ] **Verify confidence score**
  - [ ] Should be MEDIUM or HIGH
  - [ ] Check breakdown to see what's missing

## 📊 Full Run

- [ ] **Run with all default cities**
  ```bash
  python3 run_scraper.py
  ```

- [ ] **Verify all output files created**
  ```bash
  ls -lh ../data/autonomous_*.json
  ```

- [ ] **Check combined file**
  ```bash
  cat ../data/autonomous_cities.json | grep "city_name"
  ```

- [ ] **Review confidence scores for all cities**
  ```bash
  for file in ../data/autonomous_*.json; do
    echo "=== $file ==="
    cat "$file" | grep -A 2 "confidence_score"
  done
  ```

## 🔍 Quality Checks

- [ ] **Facilities have addresses**
  ```bash
  cat ../data/autonomous_austin.json | grep -A 5 "drop_off_locations"
  ```

- [ ] **No generic facility names**
  - [ ] Not just "Landfill" or "Transfer Station"
  - [ ] Should have actual names

- [ ] **Phone numbers are valid**
  - [ ] Format looks correct
  - [ ] Not placeholder text

- [ ] **Fines are reasonable**
  - [ ] Dollar amounts present
  - [ ] Not obviously wrong (like $1 or $1,000,000)

- [ ] **SEO copy is unique per city**
  ```bash
  cat ../data/autonomous_austin.json | grep "hero_hook"
  cat ../data/autonomous_dallas.json | grep "hero_hook"
  # Should be different
  ```

## 📝 Documentation Review

- [ ] **Read QUICKSTART.md**
- [ ] **Read SECURITY_UPGRADE.md**
- [ ] **Read README_REFACTOR.md**
- [ ] **Read IMPROVEMENTS_SUMMARY.md**
- [ ] **Read ARCHITECTURE.md** (optional)

## 🧹 Cleanup

- [ ] **Backup old script** (optional)
  ```bash
  cp autonomous_scraper.py autonomous_scraper.py.backup
  ```

- [ ] **Consider deleting old script** (after migration complete)
  ```bash
  # Only after you're confident the new version works
  # rm autonomous_scraper.py
  ```

- [ ] **Update any documentation that references old script**

- [ ] **Update any automation/cron jobs**

## 🎯 Production Readiness

- [ ] **Test with different states**
  ```bash
  python3 run_scraper.py --cities Seattle --state WA --state-name Washington --dry-run
  ```

- [ ] **Test error handling**
  - [ ] Try with invalid city name
  - [ ] Try with missing .env file
  - [ ] Try with invalid API key

- [ ] **Monitor API usage**
  - [ ] Check quotas aren't exceeded
  - [ ] Verify costs are as expected

- [ ] **Set up monitoring** (optional)
  - [ ] Log files
  - [ ] Error alerts
  - [ ] Success notifications

## ✅ Final Verification

- [ ] **All API keys rotated** (if they were in git)
- [ ] **New scraper runs successfully**
- [ ] **Output quality is good**
- [ ] **Confidence scores are acceptable**
- [ ] **No security issues remain**
- [ ] **Documentation is clear**
- [ ] **Team is informed of changes**

## 🎉 Success Criteria

You're done when:
- ✅ Security issues resolved
- ✅ New scraper produces good output
- ✅ Confidence scores are MEDIUM or HIGH
- ✅ Performance is 60% faster
- ✅ No errors in production runs
- ✅ Team can use new CLI easily

## 📞 Support

If you encounter issues:

1. **Check logs** for [ERROR] or [FAILED] messages
2. **Verify API keys** are valid and have quota
3. **Review documentation** in scripts/ directory
4. **Test with --dry-run** first
5. **Try single city** before batch processing

## 🚨 Rollback Plan

If you need to rollback:

1. **Old script still works** (with deprecation warning)
2. **Just use old script** until issues resolved
3. **Keep .env file** for when you retry
4. **Review error messages** to understand what went wrong

## 📅 Timeline

- **Day 1**: Security fixes (rotate keys)
- **Day 1**: Setup and testing
- **Day 2**: First production runs
- **Week 1**: Monitor and adjust
- **Week 2**: Full migration complete

---

**Current Status**: [ ] Not Started / [ ] In Progress / [ ] Complete

**Notes**:
_Add any notes or issues encountered during migration_
