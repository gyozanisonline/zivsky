# Ziv Balbirsky portfolio

Portfolio site for painter Ziv Balbirsky. Next.js 16 App Router, fully static pages, plain CSS, no CMS.
English at `/`, Hebrew at `/he` (old `/en` links redirect). Vercel project `zivsky` (GitHub `gyozanisonline/zivsky`).
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
| `components/index-view.tsx` | The same works as a catalogue register (title, year, medium, size) |
| `components/wall-bar.tsx` | The bar above both: wall/index, sort switch, scale ruler |
| `lib/arrange.ts`, `lib/views.ts` | The arrangements (Medium default, Year, Size, each reversible) and prev/next order |
| `components/work-view.tsx` | Single work: viewer with museum label, arrows, close |
| `app/site.css` | All styles and tokens |

## Run
- `npm run dev` (in the Claude Browser pane: `npm run dev -- --webpack`)
- `npm run typecheck`, `npm run build`

## Design (agreed with Yoel)
- White wall `#FFFFFF`, ink `#161614`, graphite `#6B6B66`, hairline `#E6E6E1`, olive `#8C8A5E` for hover only.
- Wall: every work sized by its real height in cm (`--cm` in `site.css`). Three arrangements, each with a reverse, one static page each: Medium at `/` (Paintings, then Works on paper), the rest at `/sort/<view>[-reversed]`. Pressing the option you are on reverses the wall (groups and works both), shown by the arrow next to it. Two layouts: the wall at `/` and the index at `/index`, each order on its own page under `/sort/<slug>`. Inside a year the work with the most surface leads and the rest run tallest first and a series hangs together; the wall never opens on a tiny work. Ordering by height (not area) keeps rows even, since a row is as tall as its tallest work. By year is not the default (Yoel). Rows share their leftover space evenly (`space-evenly`), since true scale can never fill a row and a ragged right edge read as unfinished, works stand on one bottom line, captions left-aligned (start) under each work. Yoel chose true scale over equal frames on 2026-09-15; do not switch to equal-height rows.
- English opens the site (Yoel's call, 2026-09-15). Flipping it means moving the route folders, not just `DEFAULT_LANG`.
- Wall `<img sizes>` is the work's real on-screen width; a vague `sizes` made the wall download the 1600/2400 files.
- Labels: title, year, medium, height × width cm (height first).
- Fonts: Bellefair + IBM Plex Sans Hebrew, placeholders until Ziv names the font she liked.
- Motion: pressing a work sends it from the wall into the viewer (cross-document view transition); the header and footer hold still, everything else fades. Same transition when the sort changes.
- The work page is a viewer: chevrons flank the painting, a cross in the top corner returns to the wall, and arrow keys / Escape do the same (`components/work-keys.tsx`).

## Waiting on Ziv (emailed 2026-09-15)
Font, phone on site, order of works, CV and artist statement (then add an About page), 5 missing years, Hebrew wording for "mounted on panel".

## Permissions
- Free to: read, typecheck, build, run dev, push `feat/*` branches.
- Ask before: installing packages, merging to `main` (that is production).
- Never commit `.env.local` or tokens.

## Gotchas
- Paths contain spaces: use `fileURLToPath`, never `new URL(...).pathname`.
- Vercel only ships committed files; generated images must be committed.
