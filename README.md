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
**Login:** set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local`, then run `npm run set-admin` (creates or updates the admin without touching other data).

## MongoDB

Uses local MongoDB database `little-mounties` at `mongodb://127.0.0.1:27017/little-mounties`.

Install MongoDB locally or set `MONGODB_URI` in `.env.local` to your Atlas connection string.

```bash
npm run seed        # first-time only: loads starter content (refuses to run on a non-empty DB unless --force)
npm run set-admin   # create / update the admin login only (safe on production)
```

## Structure

Everything runs in one Next.js app:

- Public pages: `/`, `/about`, `/services`, `/pricing`, `/news`, `/contact`, etc.
- Admin portal: `/admin`
- API routes: `/api/v1/*` (same app, no separate API URL)

## Admin-managed content

Everything on the public site is editable from `/admin`:

| Admin section | Controls |
| --- | --- |
| Site Content | Every text block and picture on the Home, About, Partners, Future Members, Shop and Booking pages, plus the banner title/subtitle of every page. Each section can be reset to the original text. |
| Schedule | Weekly timetable and one-time events (`/schedule`) |
| Coaches | Coach profiles with photo, bio, credentials (`/coaches`) |
| Gallery | Photo gallery (`/gallery`) |
| Settings | Logo, contact details, announcement bar, analytics |
| Facilities, Services, Pricing, Team, FAQ, News, Shop, Sponsors, Stats, Pages | Lists and detail pages |
| Bookings, Contacts, Inquiries | Form submissions |

### Image uploads (serverless safe)

Nothing is written to `public/` or the local disk, so uploads survive redeploys on Vercel.

- `POST /api/upload` (admin only): `file` + `folder` (`products | gallery | pages | misc`). JPEG/PNG/WebP/GIF, max 8MB, content verified by file signature. Stored in the MongoDB `StoredUpload` collection.
- `GET /api/uploads/<folder>/<filename>` streams the image with immutable caching.
- Only the URL string is saved on content documents. When an image is replaced/removed and the record is saved (or the record is deleted), the old upload is deleted automatically. **Dashboard > Clean up unused images** removes uploads nothing references (older than 24h).
- Large photos are shrunk in the browser first (Vercel rejects request bodies over about 4.5MB).
- Legacy `/uploads/...` URLs fall back to a placeholder image.

## Environment

See `.env.example` for required variables.
