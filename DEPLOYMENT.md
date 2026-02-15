# Deployment Guide

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project settings

### 3. Add Environment Variables

In Vercel project settings, add these environment variables:

**Environment Variables:**
- `NEXT_PUBLIC_BASE_URL` = `https://your-domain.vercel.app`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` = `AIzaSyC0julW4pIMfdBobnzotEFFb4pLyW6osFI`

**Steps:**
1. Go to Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Click "Save"

### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Build the site (generates all city pages)
- Deploy to production

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## Updating City Data

To add or update city information:

1. Run the AI scraper:
   ```bash
   cd scripts
   python3 ai_scraper.py
   ```

2. Review the generated data in `data/cities.json`

3. Commit and push:
   ```bash
   git add data/cities.json
   git commit -m "Update city data"
   git push
   ```

4. Vercel will automatically rebuild and deploy

## Build Performance

- **10 cities**: ~30 seconds build time
- **50 cities**: ~2 minutes build time
- **500 cities**: ~15 minutes build time

All pages are pre-rendered at build time for instant loading.

## Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Logs**: View deployment logs in Vercel dashboard
- **Performance**: Check Core Web Vitals in Vercel Speed Insights

## Troubleshooting

### Maps Not Showing

1. Verify API key is set in Vercel environment variables
2. Check that Maps JavaScript API and Geocoding API are enabled in Google Cloud Console
3. Ensure API key has no domain restrictions (or add your Vercel domain)

### Build Failures

1. Check build logs in Vercel dashboard
2. Verify `cities.json` is valid JSON
3. Test build locally: `npm run build`

### Slow Page Loads

- All pages are pre-rendered, so loads should be <500ms
- Check Vercel Speed Insights for performance metrics
- Consider enabling Vercel Edge Network for faster global delivery

## Security

- API keys are stored as environment variables (not in code)
- `.env.local` is gitignored (never committed)
- Consider restricting Google Maps API key to your domain in production

## Scaling

The platform can handle thousands of cities:
- Each city page is ~50KB pre-rendered HTML
- 1,000 cities = ~50MB total
- Vercel has no page limit for static sites
- Build time scales linearly with city count
