# Ziv Balbirsky portfolio

Portfolio site for Ziv Balbirsky. Next.js 16 App Router, fully static pages, plain CSS, no CMS.
English only, at `/` (Hebrew removed 2026-10-13; `/he`, `/en`, `/list` and `/sort/*` all redirect to `/`).
Vercel project `zivsky` (GitHub `gyozanisonline/zivsky`).
Rebuilt 2026-09-15 on `feat/rebuild`; the March Sanity site lives on in `main`'s history.

## How content gets in
| Step | Command | Output |
|---|---|---|
| Ziv fills the catalogue artifact https://claude.ai/artifact/TPddGHczeFdAtqBUTVYubc | Claude: `read_db` collection `works` with `out_dir` | `w01..w36.json` |
| Import | `npm run content -- <answers-dir> <manifest.json>` | `content/works.json` |
| Images from originals in `../Artwork originals 2026/` | `npm run images` | `public/works/*.avif`, `*-share.jpg`, `content/images.json` |

Commit `content/` and `public/works/`. The originals never enter the repo.

## Key files
| File | Purpose |
|---|---|
| `lib/works.ts` | Typed works list (catalogue + images), size label |
| `lib/i18n.ts` | All the site's words, link helpers |
| `app/layout.tsx`, `components/site-shell.tsx` | The one root layout (`lang="en"`, fonts, the mode script) |
| `components/wall.tsx` | Home: one wall, in the catalogue order |
| `components/view-modes.tsx` | The two switches: true size / equal size, names on / off |
| `components/about-view.tsx`, `lib/about.ts`, `content/about.json` | About: her photo, statement, CV. Empty file = no page, no nav link |
| `components/work-view.tsx` | Single work: viewer with museum label, arrows, close |
| `app/site.css` | All styles and tokens |

## Run
- `npm run dev` (in the Claude Browser pane: `npm run dev -- --webpack`)
- `npm run typecheck`, `npm run build`

## Design (agreed with Yoel)
- White wall `#FFFFFF`, ink `#161614`, graphite `#6B6B66`, hairline `#E6E6E1`, olive `#8C8A5E` for hover only.
- The whole site is: her name, Works, About (when there is one), Contact. No role label, no sort, no index, no medium groups, no language switch (all removed 2026-10-13).
- One wall, in the order held in `content/works.json` `order`. Ziv sets that order herself in the ordering artifact https://claude.ai/artifact/Nf2HwXaYbyUSkHvQFD47RW (drag the works, press Save), then `read_db` collection `order` doc `current` and write the ids into `order`. Hers, saved 2026-10-13, is live.
- Two switches while the hanging is being decided (`components/view-modes.tsx`): **true size** (each work by its real height in cm, `--cm`) or **equal size** (one height for all), **names off** (the default) or on, and in equal size a **spacing slider** (0 to 96 px, sets `--wall-gap` on both axes). They set `data-scale` / `data-names` on `<html>`, remember themselves in `localStorage`, and an inline script in the shell applies them before first paint, which is why `<html>` carries `suppressHydrationWarning`.
- The wall carries no names by default: the title, year, medium and size live on the work's own page.
- Rows share their leftover space evenly (`space-evenly`), works stand on one bottom line.
- Wall `<img sizes>` is the work's real on-screen width; a vague `sizes` made the wall download the 1600/2400 files.
- Fonts: **Eagle Lake for her name only** (`--font-name`), Bellefair for headings and work titles (`--font-display`), IBM Plex Sans for everything else (`--font-text`).
- Motion: pressing a work sends it from the wall into the viewer (cross-document view transition); the header and footer hold still, everything else fades.
- The work page is a viewer: chevrons flank the painting, a cross in the top corner returns to the wall, and arrow keys / Escape do the same (`components/work-keys.tsx`).

## Waiting on Ziv
CV and artist statement, and a photo of her, for the About page: fill `content/about.json` (`portrait`, `statement`, `cv`) and the page and its nav link appear by themselves. She answered the rest on 2026-09-17 (five missing years are 2025; she asked for English only).

## Permissions
- Free to: read, typecheck, build, run dev, push `feat/*` branches.
- Ask before: installing packages, merging to `main` (that is production).
- Never commit `.env.local` or tokens.

## Gotchas
- Paths contain spaces: use `fileURLToPath`, never `new URL(...).pathname`.
- Never name a route segment `index`: it collides with Next's own `index.html` and the Vercel build dies with `ENOENT .next/server/app/index/...`, even though the local build passes (2026-09-17).
- Vercel only ships committed files; generated images must be committed.
