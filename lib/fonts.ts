import { Bellefair, IBM_Plex_Sans_Hebrew } from "next/font/google"

// Placeholder pairing until Ziv names the font she liked. Both families carry
// Hebrew and Latin, so the two languages read as one voice.
export const displayFont = Bellefair({
  weight: "400",
  subsets: ["hebrew", "latin"],
  variable: "--font-display",
  display: "swap",
})

export const textFont = IBM_Plex_Sans_Hebrew({
  weight: ["400", "500"],
  subsets: ["hebrew", "latin"],
  variable: "--font-text",
  display: "swap",
})
