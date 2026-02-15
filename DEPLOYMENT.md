# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub (can be private)
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/mattress-monopoly.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

That's it! Your site will be live in ~2 minutes.

## Why Deploy Early?

- **Domain Age**: Google favors older domains in rankings
- **Indexing**: Start getting crawled immediately
- **Testing**: Verify production performance (<500ms load times)
- **Continuous Deployment**: Every git push auto-deploys

## Post-Deployment

1. Check your site at `https://your-project.vercel.app`
2. Test a city page: `/disposal-guides/arizona/phoenix`
3. Verify load times in Chrome DevTools (should be <500ms)
4. Submit sitemap to Google Search Console

## Adding More Cities

1. Update `data/cities.json` with new cities
2. Commit and push to GitHub
3. Vercel automatically rebuilds with new pages
4. All 5,000+ pages regenerated in minutes

## Performance Tips

- All pages are pre-rendered (SSG)
- No database queries at runtime
- Served from Vercel's global CDN
- Automatic image optimization
- Edge caching enabled
