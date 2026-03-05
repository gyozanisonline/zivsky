export type Category = "all" | "bathroom" | "paintings" | "sketches"

export interface Artwork {
  id: number
  title: string
  year: string
  medium?: string
  dimensions?: string
  category: "bathroom" | "paintings" | "sketches"
  src: string
  // Natural width/height ratio (width ÷ height)
  aspectRatio: number
}

export const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Paintings", value: "paintings" },
  { label: "Bathroom Series", value: "bathroom" },
  { label: "Sketches", value: "sketches" },
]

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Finger Bug",
    year: "",
    medium: "Oil on canvas",
    dimensions: "30 × 40 cm",
    category: "paintings",
    src: "/images/artwork-1.jpg",
    aspectRatio: 0.75,
  },
  {
    id: 2,
    title: "Painting Myself",
    year: "",
    medium: "Oil on canvas",
    dimensions: "40 × 50 cm",
    category: "paintings",
    src: "/images/artwork-2.jpg",
    aspectRatio: 0.8,
  },
  {
    id: 3,
    title: "Fallen Leaves",
    year: "2025",
    medium: "Oil and acrylic on canvas",
    dimensions: "80 × 60 cm",
    category: "paintings",
    src: "/images/artwork-3.jpg",
    aspectRatio: 1.33,
  },
  {
    id: 4,
    title: "Highway Blossom",
    year: "",
    medium: "Oil on canvas",
    dimensions: "120 × 90 cm",
    category: "paintings",
    src: "/images/artwork-4.jpg",
    aspectRatio: 1.33,
  },
  {
    id: 5,
    title: "Kitchen View",
    year: "2025",
    medium: "Acrylic and oil on canvas",
    dimensions: "60 × 80 cm",
    category: "paintings",
    src: "/images/artwork-5.jpg",
    aspectRatio: 0.75,
  },
  {
    id: 6,
    title: "Scrambled",
    year: "",
    medium: "Oil on canvas",
    dimensions: "40 × 50 cm",
    category: "paintings",
    src: "/images/artwork-6.jpg",
    aspectRatio: 0.8,
  },
  {
    id: 7,
    title: "Shower Stall",
    year: "",
    medium: "Oil on canvas",
    dimensions: "90 × 110 cm",
    category: "bathroom",
    src: "/images/artwork-7.jpg",
    aspectRatio: 0.82,
  },
  {
    id: 8,
    title: "Sidewalk Shadow",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "60 × 80 cm",
    category: "paintings",
    src: "/images/artwork-8.jpg",
    aspectRatio: 0.75,
  },
  {
    id: 9,
    title: "Untitled (Shutters)",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "100 × 120 cm",
    category: "paintings",
    src: "/images/artwork-9.jpg",
    aspectRatio: 0.83,
  },
  {
    id: 10,
    title: "Untitled (Feet)",
    year: "",
    medium: "Acrylic and oil on canvas",
    dimensions: "40 × 50 cm",
    category: "paintings",
    src: "/images/artwork-10.jpg",
    aspectRatio: 0.8,
  },
  {
    id: 11,
    title: "Untitled (Refidim)",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "80 × 60 cm",
    category: "paintings",
    src: "/images/artwork-11.jpg",
    aspectRatio: 1.33,
  },
  {
    id: 12,
    title: "Untitled (Robe)",
    year: "",
    medium: "Oil on canvas",
    dimensions: "40 × 50 cm",
    category: "bathroom",
    src: "/images/artwork-12.jpg",
    aspectRatio: 0.8,
  },
  {
    id: 13,
    title: "Windo",
    year: "",
    medium: "Acrylic and oil on canvas on wood",
    category: "paintings",
    src: "/images/artwork-13.jpg",
    aspectRatio: 1.0,
  },
  {
    id: 14,
    title: "Untitled (Building)",
    year: "2024",
    medium: "Oil and acrylic on canvas",
    dimensions: "50 × 70 cm",
    category: "paintings",
    src: "/images/artwork-14.jpg",
    aspectRatio: 0.71,
  },
  {
    id: 15,
    title: "Zohar",
    year: "",
    medium: "Colored pencil and graphite on paper",
    dimensions: "42 × 34 cm",
    category: "sketches",
    src: "/images/artwork-15.jpg",
    aspectRatio: 1.24,
  },
]
