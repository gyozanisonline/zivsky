# Sanity CMS Setup Guide

Follow these steps **in order** to go live with Sanity.

---

## Step 1 — Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a free account (or log in)
2. Click **"Create new project"**
3. Name it `ziv-portfolio`, dataset `production`
4. Copy the **Project ID** (shown in the project dashboard URL or Settings → API)

---

## Step 2 — Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```

2. Fill in `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz   ← from Step 1
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=sk...                    ← create below
   ```

3. To create an API token:
   - Sanity dashboard → your project → **Settings → API → Tokens**
   - Click **Add API token** → name it `migration`, role: **Editor**
   - Copy the token into `.env.local` as `SANITY_API_TOKEN`
   - ⚠️ This token is only needed for the migration script. Keep it secret.

---

## Step 3 — Add CORS Origin

In the Sanity dashboard → **Settings → API → CORS Origins**, add:
- `http://localhost:3000` (for local development)
- `https://zivsky.vercel.app` (or your production domain)

---

## Step 4 — Migrate Existing Artworks

Run the migration script once. It uploads all 15 artworks + images to Sanity:

```bash
node scripts/migrate-to-sanity.mjs
```

Verify the artworks appear in the Studio (next step).

---

## Step 5 — Open Sanity Studio

Start the dev server:
```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio) — log in with your Sanity account and confirm all 15 artworks are there.

---

## Step 6 — Deploy to Vercel

1. In the **Vercel dashboard** → your project → **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - *(Do NOT add `SANITY_API_TOKEN` — it's only for local migration)*

2. Push to `main` — Vercel will rebuild with Sanity data.

---

## Step 7 — Configure Auto-Redeploy Webhook

When Ziv publishes a change in Studio, this webhook triggers a Vercel rebuild.

1. In Vercel → your project → **Settings → Git → Deploy Hooks**
   - Create a hook named `sanity-publish`, branch `main`
   - Copy the generated URL (looks like `https://api.vercel.com/v1/integrations/deploy/...`)

2. In Sanity dashboard → **API → Webhooks → Add Webhook**:
   - Name: `Vercel redeploy`
   - URL: paste the Vercel hook URL
   - Trigger on: **Publish**
   - Click Save

3. Test it: publish any artwork in Studio and watch Vercel trigger a new build.

---

## Step 8 — Invite Ziv

1. Sanity dashboard → your project → **Members → Invite**
2. Enter Ziv's email, role: **Editor**
3. Share the Studio URL: `https://zivsky.vercel.app/studio`

---

## Ziv's Day-to-Day Workflow

1. Go to `https://zivsky.vercel.app/studio`
2. Log in with her Sanity account
3. Click **Artwork → Create new** to add a piece
4. Fill in: title, category, image (drag & drop), medium, dimensions, year
5. Click **Publish** → site rebuilds automatically in ~30 seconds

---

## Notes

- **Local images** in `public/images/` are kept as backups but the live site uses Sanity CDN
- **Fallback**: if Sanity is unreachable during a build, the site falls back to the hardcoded artworks array
- **Order**: set the "Display Order" field to control gallery sequence (lower = first)
