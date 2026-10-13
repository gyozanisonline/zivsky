import { Eagle_Lake, IBM_Plex_Sans } from "next/font/google"

// Eagle Lake carries the headlines only: her name, the work titles, section headings.
// Everything else (details, labels, running text) is the plain sans.
export const displayFont = Eagle_Lake({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const textFont = IBM_Plex_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
})
