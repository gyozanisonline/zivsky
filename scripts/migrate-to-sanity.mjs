/**
 * One-off migration script: uploads existing artworks to Sanity.
 *
 * Usage:
 *   node scripts/migrate-to-sanity.mjs
 *
 * Prerequisites:
 *   - .env.local must contain NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN
 *   - Images must exist in public/images/
 *
 * Run only once. Safe to re-run — it skips artworks that already exist by title.
 */

import { createClient } from "@sanity/client"
import { createReadStream, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { readFileSync } from "fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

// Load .env.local manually (no dotenv dependency needed)
function loadEnv() {
  const envPath = resolve(ROOT, ".env.local")
  if (!existsSync(envPath)) {
    console.error("❌ .env.local not found. Copy .env.example and fill in your values.")
    process.exit(1)
  }
  const lines = readFileSync(envPath, "utf-8").split("\n")
  for (const line of lines) {
    const [key, ...rest] = line.split("=")
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim()
  }
}

loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
})

const artworks = [
  { id: 1, title: "Finger Bug", year: "", medium: "Oil on canvas", dimensions: "30 × 40 cm", category: "paintings", src: "/images/artwork-1.jpg", aspectRatio: 0.75, order: 1 },
  { id: 2, title: "Painting Myself", year: "", medium: "Oil on canvas", dimensions: "40 × 50 cm", category: "paintings", src: "/images/artwork-2.jpg", aspectRatio: 0.8, order: 2 },
  { id: 3, title: "Fallen Leaves", year: "2025", medium: "Oil and acrylic on canvas", dimensions: "80 × 60 cm", category: "paintings", src: "/images/artwork-3.jpg", aspectRatio: 1.33, order: 3 },
  { id: 4, title: "Highway Blossom", year: "", medium: "Oil on canvas", dimensions: "120 × 90 cm", category: "paintings", src: "/images/artwork-4.jpg", aspectRatio: 1.33, order: 4 },
  { id: 5, title: "Kitchen View", year: "2025", medium: "Acrylic and oil on canvas", dimensions: "60 × 80 cm", category: "paintings", src: "/images/artwork-5.jpg", aspectRatio: 0.75, order: 5 },
  { id: 6, title: "Scrambled", year: "", medium: "Oil on canvas", dimensions: "40 × 50 cm", category: "paintings", src: "/images/artwork-6.jpg", aspectRatio: 0.8, order: 6 },
  { id: 7, title: "Shower Stall", year: "", medium: "Oil on canvas", dimensions: "90 × 110 cm", category: "bathroom", src: "/images/artwork-7.jpg", aspectRatio: 0.82, order: 7 },
  { id: 8, title: "Sidewalk Shadow", year: "2024", medium: "Oil on canvas", dimensions: "60 × 80 cm", category: "paintings", src: "/images/artwork-8.jpg", aspectRatio: 0.75, order: 8 },
  { id: 9, title: "Untitled (Shutters)", year: "2025", medium: "Oil on canvas", dimensions: "100 × 120 cm", category: "paintings", src: "/images/artwork-9.jpg", aspectRatio: 0.83, order: 9 },
  { id: 10, title: "Untitled (Feet)", year: "", medium: "Acrylic and oil on canvas", dimensions: "40 × 50 cm", category: "paintings", src: "/images/artwork-10.jpg", aspectRatio: 0.8, order: 10 },
  { id: 11, title: "Untitled (Refidim)", year: "2023", medium: "Oil on canvas", dimensions: "80 × 60 cm", category: "paintings", src: "/images/artwork-11.jpg", aspectRatio: 1.33, order: 11 },
  { id: 12, title: "Untitled (Robe)", year: "", medium: "Oil on canvas", dimensions: "40 × 50 cm", category: "bathroom", src: "/images/artwork-12.jpg", aspectRatio: 0.8, order: 12 },
  { id: 13, title: "Windo", year: "", medium: "Acrylic and oil on canvas on wood", category: "paintings", src: "/images/artwork-13.jpg", aspectRatio: 1.0, order: 13 },
  { id: 14, title: "Untitled (Building)", year: "2024", medium: "Oil and acrylic on canvas", dimensions: "50 × 70 cm", category: "paintings", src: "/images/artwork-14.jpg", aspectRatio: 0.71, order: 14 },
  { id: 15, title: "Zohar", year: "", medium: "Colored pencil and graphite on paper", dimensions: "42 × 34 cm", category: "sketches", src: "/images/artwork-15.jpg", aspectRatio: 1.24, order: 15 },
]

async function uploadImage(localPath) {
  const fullPath = resolve(ROOT, "public", localPath.replace(/^\//, ""))
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠️  Image not found: ${fullPath}`)
    return null
  }
  const asset = await client.assets.upload("image", createReadStream(fullPath), {
    filename: localPath.split("/").pop(),
  })
  return asset
}

async function migrate() {
  console.log(`\n🚀 Starting migration to Sanity project: ${projectId}\n`)

  // Check for existing documents to avoid duplicates
  const existing = await client.fetch(`*[_type == "artwork"].title`)
  const existingTitles = new Set(existing)

  for (const artwork of artworks) {
    if (existingTitles.has(artwork.title)) {
      console.log(`  ⏭️  Skipping "${artwork.title}" (already exists)`)
      continue
    }

    console.log(`  📤 Uploading "${artwork.title}"...`)

    const imageAsset = await uploadImage(artwork.src)
    if (!imageAsset) {
      console.warn(`  ⚠️  Skipping "${artwork.title}" — image upload failed`)
      continue
    }

    await client.create({
      _type: "artwork",
      title: artwork.title,
      year: artwork.year || undefined,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      category: artwork.category,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAsset._id },
      },
      aspectRatio: artwork.aspectRatio,
      order: artwork.order,
    })

    console.log(`  ✅ "${artwork.title}" created`)
  }

  console.log("\n✨ Migration complete!\n")
}

migrate().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})
