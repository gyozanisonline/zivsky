# Ziv Balbirsky portfolio

Portfolio site for painter Ziv Balbirsky. Next.js 16 App Router, fully static pages, plain CSS, no CMS.
Hebrew at `/`, English at `/en`. Vercel project `zivsky` (GitHub `gyozanisonline/zivsky`).
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
| `lib/i18n.ts` | Copy in both languages, `DEFAULT_LANG`, link helpers |
| `app/(he)`, `app/(en)` | One root layout per language (sets `lang`/`dir`) |
| `components/wall.tsx` | Home: works at true relative scale |
| `components/work-view.tsx` | Single work with museum label |
| `app/site.css` | All styles and tokens |

## Run
- `npm run dev` (in the Claude Browser pane: `npm run dev -- --webpack`)
- `npm run typecheck`, `npm run build`

## Design (agreed with Yoel)
- White wall `#FFFFFF`, ink `#161614`, graphite `#6B6B66`, hairline `#E6E6E1`, olive `#8C8A5E` for hover only.
- Wall: every work sized by its real height in cm (`--cm` in `site.css`), rows share a centre line. Do not switch to equal-height rows.
- Labels: title, year, medium, height × width cm (height first).
- Fonts: Bellefair + IBM Plex Sans Hebrew, placeholders until Ziv names the font she liked.
- One motion: cross-document view transition between a work on the wall and its page.

## Waiting on Ziv (emailed 2026-09-15)
Font, which language opens first, phone on site, order of works, CV and artist statement (then add an About page), 5 missing years, Hebrew wording for "mounted on panel".

## Permissions
- Free to: read, typecheck, build, run dev, push `feat/*` branches.
- Ask before: installing packages, merging to `main` (that is production).
- Never commit `.env.local` or tokens.

## Gotchas
- Paths contain spaces: use `fileURLToPath`, never `new URL(...).pathname`.
- Vercel only ships committed files; generated images must be committed.
