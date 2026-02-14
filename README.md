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

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

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
