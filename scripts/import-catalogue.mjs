// Turns Ziv's catalogue answers (exported from the claude.ai artifact database)
// into content/works.json, the single source of truth for the site.
//
// Usage: node scripts/import-catalogue.mjs <answers-dir> <manifest.json>
//   answers-dir   folder of w01.json ... w36.json, as saved by read_db
//   manifest.json id -> original file name, made when the zip was unpacked

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const OUT = path.join(ROOT, "content", "works.json")

// Ziv typed media in English; the Hebrew site needs her wording in Hebrew.
const MEDIUM_HE = new Map([
  ["oil on canvas", "שמן על בד"],
  ["oil on canvas mounted on panel", "שמן על בד מוצמד ללוח"],
  ["oil and acrylic on canvas", "שמן ואקריליק על בד"],
  ["colored pencils and graphite on paper", "צבעי עפרון וגרפיט על נייר"],
  ["gouache and pencil on paper", "גואש ועפרון על נייר"],
])

const SERIES_HE = new Map([["photo gallery", "גלריית תמונות"]])

// Plain misspellings only. Titles are hers: casing and wording stay as typed.
const SPELLING = [
  [/\bgoauche\b/gi, "gouache"],
  [/\bLillis\b/g, "Lilies"],
]

const clean = (value) => {
  const text = String(value ?? "").trim().replace(/\s+/g, " ")
  return SPELLING.reduce((acc, [pattern, fix]) => acc.replace(pattern, fix), text)
}

const sentenceCase = (text) => (text ? text[0].toUpperCase() + text.slice(1).toLowerCase() : "")

const toNumber = (value) => {
  const n = Number.parseFloat(String(value ?? "").replace(",", "."))
  return Number.isFinite(n) && n > 0 ? n : null
}

const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

function readAnswers(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => /^w\d+\.json$/.test(name))
    .sort()
    .map((name) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"))
      return { id: name.replace(/\.json$/, ""), ...(raw.data ?? raw) }
    })
}

function previousOrder() {
  if (!fs.existsSync(OUT)) return new Map()
  const existing = JSON.parse(fs.readFileSync(OUT, "utf8"))
  return new Map(existing.map((work) => [work.id, work.order]))
}

function main() {
  const [answersDir, manifestPath] = process.argv.slice(2)
  if (!answersDir || !manifestPath) {
    console.error("Usage: node scripts/import-catalogue.mjs <answers-dir> <manifest.json>")
    process.exit(1)
  }

  const sources = new Map(
    JSON.parse(fs.readFileSync(manifestPath, "utf8")).map((entry) => [entry.id, `${entry.file}.jpg`]),
  )
  const warnings = []
  const usedSlugs = new Set()

  const works = readAnswers(answersDir).map((answer) => {
    const titleEn = clean(answer.titleEn)
    const mediumEn = sentenceCase(clean(answer.medium))
    const mediumHe = MEDIUM_HE.get(mediumEn.toLowerCase()) ?? null
    const seriesEn = clean(answer.series)
    const year = toNumber(answer.year)

    let slug = slugify(titleEn) || answer.id
    if (usedSlugs.has(slug)) slug = `${slug}-${answer.id}`
    usedSlugs.add(slug)

    if (!sources.has(answer.id)) warnings.push(`${answer.id}: no source file in manifest`)
    if (!year) warnings.push(`${answer.id} (${titleEn}): no year`)
    if (!answer.confirmed) warnings.push(`${answer.id} (${titleEn}): not confirmed by Ziv`)
    if (mediumEn && !mediumHe) warnings.push(`${answer.id}: no Hebrew for medium "${mediumEn}"`)

    return {
      id: answer.id,
      slug,
      source: sources.get(answer.id) ?? null,
      title: { he: clean(answer.titleHe), en: titleEn },
      year,
      heightCm: toNumber(answer.heightCm),
      widthCm: toNumber(answer.widthCm),
      medium: { he: mediumHe, en: mediumEn || null },
      series: seriesEn ? { he: SERIES_HE.get(seriesEn.toLowerCase()) ?? null, en: seriesEn } : null,
      show: answer.show !== false,
      confirmed: Boolean(answer.confirmed),
    }
  })

  // Default order: newest first, undated works last. A hand-set order survives re-imports.
  const kept = previousOrder()
  const byYear = [...works].sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.id.localeCompare(b.id))
  const ordered = byYear.map((work, index) => ({ ...work, order: kept.get(work.id) ?? index + 1 }))
  ordered.sort((a, b) => a.order - b.order)

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, `${JSON.stringify(ordered, null, 2)}\n`)

  console.log(`Wrote ${ordered.length} works to ${path.relative(ROOT, OUT)}`)
  warnings.forEach((line) => console.log(`  ! ${line}`))
}

main()
