import { Bellefair, Eagle_Lake, IBM_Plex_Sans } from "next/font/google"

// Eagle Lake is the signature: her name, nothing else.
export const nameFont = Eagle_Lake({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-name",
  display: "swap",
})

// Headings and work titles.
export const displayFont = Bellefair({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

// Details, labels, running text.
export const textFont = IBM_Plex_Sans({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap",
})
