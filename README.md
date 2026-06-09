# Huner Industries

A modern firearms archive and educational reference built with Vite, React, Tailwind CSS, and TanStack Router. The project showcases a hero landing page, country and manufacturer filters, firearm encyclopedia pages, legal summaries, and historical timeline content.

## Features

- Home page with hero section, featured firearms, categories, timeline preview, and manufacturer highlights
- Country archive page showing firearm groups with flag icons and search/filter support
- Manufacturer listing page with responsive cards and detail dialogs
- Legal information page with country-specific firearm ownership and licensing notes
- Dedicated route-based architecture powered by TanStack React Router
- Smooth animations using Framer Motion
- Mobile-friendly responsive layout with modern UI components

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- TanStack React Router
- Framer Motion
- Lucide icons
- Radix UI dialog component

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal (usually http://localhost:5173)

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production SPA bundle to `dist/` folder
- `npm run preview` - Preview the built production bundle locally
- `npm run lint` - Run ESLint across the project
- `npm run format` - Format source files with Prettier

## Deployment

This project is a **static Single Page Application (SPA)** that can be deployed to any static hosting platform.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel automatically detects the `vercel.json` configuration and sets:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Routes rewritten to `index.html` for SPA routing

### Cloudflare Pages Deployment

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. The `_redirects` file in `public/` automatically rewrites all routes to `index.html`

### Other Static Hosts

The `dist/` folder contains a complete static SPA ready for deployment to:
- GitHub Pages
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps
- Any HTTP server

Just serve the `dist/` folder and ensure all routes redirect to `index.html` for client-side routing.

## Project Structure

- `src/routes/` - Route components for pages like Home, Countries, Manufacturers, Legal, Timeline, etc.
- `src/components/` - Reusable UI components including cards, footer, navbar, dialogs, and page sections
- `src/data/` - Static firearm and manufacturer data used by the site
- `src/lib/` - Shared helper utilities such as flag lookup
- `src/utils/` - Utility functions for image handling and other helpers
- `public/` - Static assets and media files
- `dist/` - Production build output (created by `npm run build`)

## Architecture

This project uses a **client-side SPA architecture** with:
- **Vite** - Fast build tool with instant HMR during development
- **TanStack React Router** - Client-side routing without SSR
- **React Query** - Data fetching and caching
- **TypeScript** - Type-safe development

All routes are handled on the client side, making this a true static site suitable for CDN distribution.

## Notes

- The site is intended as an educational and informational archive, not a firearms dealer or legal authority.
- Country and legal content is fictional/educational and should be verified with official sources before relying on it.
- Logo icons and header/footer styling use solid backgrounds for improved visibility.
- Project was converted from TanStack Start SSR to a standard React + Vite SPA for static hosting.

## License

This repository does not include a formal license file. Use and modify the project according to your own needs.

Built by G VISHNU VARDHAN RAJU

