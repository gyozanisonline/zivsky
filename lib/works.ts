import worksData from "@/content/works.json"
import imagesData from "@/content/images.json"

export type Lang = "he" | "en"

export interface ImageFile {
  src: string
  width: number
  height: number
}

export interface WorkImage {
  width: number
  height: number
  color: string
  files: ImageFile[]
  share: ImageFile
}

export interface Work {
  id: string
  slug: string
  title: { he: string; en: string }
  year: number | null
  heightCm: number | null
  widthCm: number | null
  medium: { he: string | null; en: string | null }
  series: { he: string | null; en: string } | null
  show: boolean
  confirmed: boolean
  order: number
  image: WorkImage
}

type CatalogueEntry = Omit<Work, "image"> & { source: string | null }

const catalogue = worksData as unknown as CatalogueEntry[]
const images = imagesData as unknown as Record<string, WorkImage>

// Every shown work must have generated images; failing the build beats a blank frame.
export const works: readonly Work[] = catalogue
  .filter((entry) => entry.show)
  .map(({ source: _source, ...entry }) => {
    const image = images[entry.id]
    if (!image) throw new Error(`No images for ${entry.id}. Run: npm run images`)
    return { ...entry, image }
  })
  .sort((a, b) => a.order - b.order)

export const getWork = (slug: string): Work | undefined => works.find((work) => work.slug === slug)

export const srcSet = (files: ImageFile[]): string => files.map((file) => `${file.src} ${file.width}w`).join(", ")

const formatCm = (value: number): string => (Number.isInteger(value) ? String(value) : value.toFixed(1))

// Height first, the way galleries write it.
export const sizeLabel = (work: Work): string | null =>
  work.heightCm && work.widthCm ? `${formatCm(work.heightCm)} × ${formatCm(work.widthCm)}` : null
