import aboutData from "@/content/about.json"

export interface CvEntry {
  year: string | null
  text: string
}

export interface CvGroup {
  heading: string
  entries: CvEntry[]
}

export interface About {
  /** A committed file under /public, with its real pixel size so nothing shifts on load. */
  portrait: { src: string; width: number; height: number } | null
  portraitAlt: string | null
  statement: string[]
  cv: CvGroup[]
}

export const about = aboutData as About

/** Until Ziv sends the CV and a photo, there is no About page and nothing links to one. */
export const hasAbout: boolean = Boolean(about.portrait) || about.statement.length > 0 || about.cv.length > 0
