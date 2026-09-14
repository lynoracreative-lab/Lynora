# Lynora

Premium marketing website and private CMS for **Lynora** — a digital studio offering website design, branding, marketing, SEO and app development.

The public site is a cinematic Next.js website. The private studio dashboard lives at `/admin` and works like a focused WordPress: edit pages, services, projects, posts, media, FAQs, testimonials and enquiries without touching source code.

## Local setup

1. Install Node.js 20+ and PostgreSQL.
2. Create a database:

```bash
createdb lynora
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Fill in `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/lynora"
AUTH_SECRET="generate-a-long-random-string"
ADMIN_EMAIL="you@example.com"
ADMIN_PASSWORD="choose-a-strong-password"
NEXT_PUBLIC_SITE_URL="http://localhost:43127"
STORAGE_PROVIDER="local"
```

5. Install and seed:

```bash
npm install
npx prisma migrate dev
npm run db:seed
```

6. Start the site:

```bash
npm run dev
```

Open [http://localhost:43127](http://localhost:43127) for the website and [http://localhost:43127/admin](http://localhost:43127/admin) for the CMS.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server on port 43127 |
| `npx prisma migrate dev` | Create / apply database migrations |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npm run db:seed` | Seed admin user, services, homepage copy and FAQs |
| `npm run lint` | Run ESLint |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

## Environment variables

See `.env.example`.

- `DATABASE_URL` — PostgreSQL connection
- `AUTH_SECRET` — signs admin session cookies
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only by the seed script to create the first admin
- `NEXT_PUBLIC_SITE_URL` — used for sitemap, canonical URLs and Open Graph
- `STORAGE_PROVIDER` — `local` or `cloudinary`
- Cloudinary keys — only required when using Cloudinary storage

Do not commit real secrets.

## Where to edit content

Once the CMS is seeded, prefer the admin dashboard. If you still want to work in the repo:

- **Logo:** `public/branding/lynora-logo.png` (full lockup) and `public/branding/lynora-mark.png` (panther mark). Keep the original at `public/branding/lynora-logo-original.jpg`.
- **Images / founder / portfolio covers:** `public/images`, `public/portfolio`, `public/branding`
- **Uploaded media:** `public/uploads`
- **Services / projects / FAQs as fallbacks:** `lib/fallback.ts` and `data/`
- **Contact details:** Admin → Settings, or seed defaults in `lib/constants.ts`

Full owner instructions are in `ADMIN_GUIDE.md`.

## Production checklist

1. Provision PostgreSQL.
2. Set strong `AUTH_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
3. Run `npx prisma migrate deploy` and `npm run db:seed` once.
4. Set `NEXT_PUBLIC_SITE_URL` to the live domain.
5. Switch `STORAGE_PROVIDER` to `cloudinary` (or keep local disk if the host persists `public/uploads`).
6. Connect email later in `app/api/contact/route.ts` (Resend, SendGrid, Gmail or a CRM).
7. Change the admin password after first login.
