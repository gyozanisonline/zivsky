// Makes web-size images of every work from Ziv's original files, and records
// each work's real proportions and main color in content/images.json.
// The originals stay outside the repo; only the generated files are committed.
//
// Usage: node scripts/build-images.mjs [originals-dir] [--force]

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DEFAULT_ORIGINALS = path.resolve(ROOT, "..", "Artwork originals 2026")
const WORKS = path.join(ROOT, "content", "works.json")
const OUT_DIR = path.join(ROOT, "public", "works")
const OUT_JSON = path.join(ROOT, "content", "images.json")

// Sizes are the long edge, so a 150x30 strip and a wide canvas get equally sharp files.
const LONG_EDGES = [800, 1600, 2400]
const SHARE_LONG_EDGE = 1600

const hex = ({ r, g, b }) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`

function fitLongEdge(width, height, longEdge) {
  const scale = Math.min(1, longEdge / Math.max(width, height))
  return { width: Math.round(width * scale), height: Math.round(height * scale) }
}

async function writeIfMissing(file, force, produce) {
  if (!force && fs.existsSync(file)) return
  await produce(file)
}

async function buildWork(work, originalsDir, force) {
  const input = path.join(originalsDir, work.source)
  if (!fs.existsSync(input)) throw new Error(`Missing original for ${work.id}: ${work.source}`)

  const meta = await sharp(input).rotate().metadata()
  const upright = meta.orientation >= 5 ? { width: meta.height, height: meta.width } : meta
  const { dominant } = await sharp(input).rotate().resize(64, 64, { fit: "inside" }).stats()

  const files = []
  for (const longEdge of LONG_EDGES) {
    const size = fitLongEdge(upright.width, upright.height, longEdge)
    const name = `${work.slug}-${longEdge}.avif`
    await writeIfMissing(path.join(OUT_DIR, name), force, (file) =>
      sharp(input).rotate().resize(size.width, size.height).avif({ quality: 58, effort: 5 }).toFile(file),
    )
    files.push({ src: `/works/${name}`, ...size })
  }

  const shareSize = fitLongEdge(upright.width, upright.height, SHARE_LONG_EDGE)
  const shareName = `${work.slug}-share.jpg`
  await writeIfMissing(path.join(OUT_DIR, shareName), force, (file) =>
    sharp(input).rotate().resize(shareSize.width, shareSize.height).jpeg({ quality: 82, mozjpeg: true }).toFile(file),
  )

  return {
    width: upright.width,
    height: upright.height,
    color: hex(dominant),
    files,
    share: { src: `/works/${shareName}`, ...shareSize },
  }
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes("--force")
  const originalsDir = path.resolve(args.find((arg) => !arg.startsWith("--")) ?? DEFAULT_ORIGINALS)

  const works = JSON.parse(fs.readFileSync(WORKS, "utf8"))
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const images = {}
  for (const work of works) {
    images[work.id] = await buildWork(work, originalsDir, force)
    process.stdout.write(`  ${work.id} ${work.slug}\n`)
  }

  // Drop generated files that no longer belong to any work (renamed slugs).
  const expected = new Set(
    Object.values(images).flatMap((img) => [...img.files.map((f) => path.basename(f.src)), path.basename(img.share.src)]),
  )
  const stale = fs.readdirSync(OUT_DIR).filter((name) => !expected.has(name))
  stale.forEach((name) => fs.rmSync(path.join(OUT_DIR, name)))

  fs.writeFileSync(OUT_JSON, `${JSON.stringify(images, null, 2)}\n`)
  console.log(`Wrote ${Object.keys(images).length} works to ${path.relative(ROOT, OUT_JSON)}${stale.length ? `, removed ${stale.length} stale files` : ""}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
