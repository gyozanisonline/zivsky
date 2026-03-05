import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"
import type { Artwork } from "./artworks"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

interface SanityArtwork {
  _id: string
  title: string
  year?: string
  medium?: string
  dimensions?: string
  category: "paintings" | "bathroom" | "sketches"
  image: SanityImageSource
  aspectRatio?: number
  order?: number
}

const ARTWORKS_QUERY = `
  *[_type == "artwork"] | order(order asc, _createdAt asc) {
    _id,
    title,
    year,
    medium,
    dimensions,
    category,
    image,
    aspectRatio,
    order
  }
`

export async function getArtworks(): Promise<Artwork[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return []

  try {
    const data = await sanityClient.fetch<SanityArtwork[]>(ARTWORKS_QUERY)
    if (!data || data.length === 0) return []

    return data.map((item, index) => ({
      id: index + 1,
      title: item.title,
      year: item.year ?? "",
      medium: item.medium,
      dimensions: item.dimensions,
      category: item.category,
      src: urlFor(item.image).width(1200).quality(85).url(),
      aspectRatio: item.aspectRatio ?? 1,
    }))
  } catch (err) {
    console.error("[Sanity] Failed to fetch artworks:", err)
    return []
  }
}
