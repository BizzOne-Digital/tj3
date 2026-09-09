# Little Mounties Community Sports Complex

Single-folder full-stack Next.js app with MongoDB. No separate backend server.

## Quick Start

```bash
npm install
copy .env.example .env.local
npm run seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin:** `/admin/login`  
**Default login:** `admin@littlemounties.com` / `Admin@12345`

## MongoDB

Uses local MongoDB database `little-mounties` at `mongodb://127.0.0.1:27017/little-mounties`.

Install MongoDB locally or set `MONGODB_URI` in `.env.local` to your Atlas connection string.

```bash
npm run seed
```

## Structure

Everything runs in one Next.js app:

- Public pages: `/`, `/about`, `/services`, `/pricing`, `/news`, `/contact`, etc.
- Admin portal: `/admin`
- API routes: `/api/v1/*` (same app, no separate API URL)

## Admin-managed content

Contact info, logo, sponsorship tiers, facilities, news, shop, team, FAQ, bookings, and settings are all managed from `/admin`.

## Environment

See `.env.example` for required variables.
