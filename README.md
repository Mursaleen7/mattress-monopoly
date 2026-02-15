# Mattress Monopoly - Scalable City Guide Platform

A Next.js-powered platform for generating thousands of city-specific mattress disposal guides using Static Site Generation (SSG).

## Tech Stack

- **Next.js 15** (App Router) - SSG for pre-rendered HTML pages
- **TypeScript** - Type safety
- **Tailwind CSS** - Rapid UI development
- **Vercel** - CI/CD deployment

## Architecture

- **Data Layer**: `data/cities.json` - Central database for all cities
- **Dynamic Routes**: `[state]/[city]` - Generates 5,000+ pages from single template
- **Static Generation**: All pages pre-rendered at build time for <500ms load times
- **Interactive Maps**: Google Maps integration showing drop-off locations with directions

## Features

- ✅ **Verified Data**: Government Waste Data Auditor ensures 100% accurate information
- ✅ **Interactive Maps**: Real-time location mapping with directions
- ✅ **Curbside Rules**: Detailed pickup requirements, timing, and size limits
- ✅ **Drop-off Locations**: Verified facilities with hours, types, and notes
- ✅ **Contact Information**: Direct department phone numbers and websites
- ✅ **Illegal Dumping Fines**: Official penalty amounts from city ordinances
- ✅ **Mobile Responsive**: Optimized for all devices
- ✅ **SEO Optimized**: Pre-rendered pages with proper metadata

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Google Maps API key:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Getting a Google Maps API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Create a new project or select an existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the key to your domain for security

**Note:** The site works without the API key, but interactive maps won't display. Location information is still shown in the list view.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/src/app
  /disposal-guides/[state]/[city]
    page.tsx              # Dynamic city page template
  page.tsx                # Homepage
/data
  cities.json             # City database
```

## Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on every push

## Scaling

To add more cities, simply update `data/cities.json` with new entries. The build process will automatically generate pages for all cities.
