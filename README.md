# Digital Solutions

Professional agency website for Digital Solutions, built with
Next-compatible React, TypeScript, and Vinext.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
npm start
```

`npm start` runs the production build through Wrangler's local Cloudflare runtime.
This project uses the generated `dist/server/wrangler.json` rather than a root
`wrangler.jsonc`.

## Project Structure

```text
frontend/app/                     Route entry points and global metadata
frontend/src/components/          Shared reusable UI
frontend/src/features/home/       Home page composition, data, and styles
frontend/src/features/services/   Service navigation, data, and styles
frontend/src/features/contact/    Booking and contact experience
frontend/src/features/blog/       Blog data and styles
frontend/src/features/reviews/    Review data and styles
frontend/public/assets/images/home/         Home page photography
frontend/public/assets/images/services/     Service menu photography
backend/worker/                   Cloudflare/Vinext worker entry point
build/                            Sites build integration
tests/                            Render and structure checks
```

## Architecture

- Route files remain intentionally thin.
- Frontend routes and browser code live under `frontend`.
- The backend contains only the Cloudflare worker runtime required to serve the site.
- Feature-specific content, UI, and styling live together under `frontend/src/features`.
- Reusable components live under `frontend/src/components`.
- Public assets are grouped by the feature that owns them.
- Service taxonomy is centralized so navigation and search share one source.

## Data and authentication

The current site is content-led and does not use a database. Add a database only
when the site needs durable, app-owned data such as form submissions, customer
accounts, bookings, orders, or a CMS. For the current contact and booking links,
an external service is the simpler option.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm start`: run the built Cloudflare Worker locally
- `npm test`: build the site and verify its rendered HTML
- `npm run test:cloudflare`: build and validate the Cloudflare upload bundle
- `npm run deploy`: build and deploy the generated Worker bundle

## Docker smoke test

```bash
docker build -t digital-solutions .
docker run --rm -p 3000:3000 digital-solutions
```

The contact endpoint needs `DATABASE_URL`, `RESEND_API_KEY`, and `ADMIN_EMAIL`
configured as Cloudflare secrets in production. Keep local values in `.dev.vars`;
never bake them into the image.

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
