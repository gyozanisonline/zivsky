/** The site is English only (Yoel, 2026-10-13). Hebrew was removed, data keeps both titles. */
export const homeHref = "/"
export const aboutHref = "/about"
export const workHref = (slug: string) => `/works/${slug}`

export const copy = {
  name: "Ziv Balbirsky",
  siteDescription: "Paintings and drawings by Ziv Balbirsky",
  navLabel: "Site",
  works: "Works",
  about: "About",
  contact: "Contact",
  scaleNote: "Every work is shown at its true relative size",
  evenNote: "Every work is shown at the same size",
  scale: "50 cm",
  modesLabel: "How to look",
  trueSize: "True size",
  evenSize: "Equal size",
  namesOn: "Names on",
  namesOff: "Names off",
  spacing: "Spacing",
  cm: "cm",
  allWorks: "All works",
  previous: "Previous work",
  next: "Next work",
  fromSeries: "From the series",
  email: "Email",
  instagram: "Instagram",
} as const
