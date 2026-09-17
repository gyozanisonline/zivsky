import { isDefaultSort, LAYOUT_SLUG, sortSlug, type Layout, type Sort } from "@/lib/views"
import type { Lang } from "@/lib/works"

export const LANGS: readonly Lang[] = ["en", "he"]

// The language served at "/". Must match the route folders: app/(en) serves "/", app/(he) serves "/he".
export const DEFAULT_LANG: Lang = "en"

export const dirOf = (lang: Lang) => (lang === "he" ? "rtl" : "ltr")
export const otherLang = (lang: Lang): Lang => (lang === "he" ? "en" : "he")

const prefix = (lang: Lang) => (lang === DEFAULT_LANG ? "" : `/${lang}`)
export const homeHref = (lang: Lang) => prefix(lang) || "/"
export const workHref = (lang: Lang, slug: string) => `${prefix(lang)}/works/${slug}`
export const pathFor = (lang: Lang, path: string) => `${prefix(lang)}${path}` || "/"
/** The wall at "/", the index at "/list", each order on its own page underneath. */
export const pageHref = (lang: Lang, layout: Layout, sort: Sort) => {
  const base = LAYOUT_SLUG[layout]
  if (isDefaultSort(sort)) return pathFor(lang, base)
  return pathFor(lang, `${base}/sort/${sortSlug(sort)}`)
}

export const copy = {
  he: {
    name: "זיו בלבירסקי",
    role: "ציירת",
    siteDescription: "ציורים ורישומים של זיו בלבירסקי",
    navLabel: "ניווט באתר",
    works: "עבודות",
    contact: "יצירת קשר",
    switchLabel: "English",
    scaleNote: "כל העבודות מוצגות בגודלן היחסי האמיתי",
    scale: "50 ס״מ",
    undated: "ללא תאריך",
    paintings: "ציורים",
    paper: "עבודות על נייר",
    sortBy: "סידור לפי",
    viewsLabel: "סידור העבודות",
    views: { medium: "טכניקה", year: "שנה", size: "גודל" },
    flipTo: "לחיצה נוספת:",
    layoutsLabel: "דרך הצפייה",
    layouts: { wall: "קיר", index: "רשימה" },
    order: {
      medium: ["ציורים תחילה", "עבודות על נייר תחילה"],
      year: ["החדש תחילה", "הישן תחילה"],
      size: ["הגדול תחילה", "הקטן תחילה"],
    },
    cm: "ס״מ",
    allWorks: "לכל העבודות",
    workNav: "מעבר בין עבודות",
    previous: "העבודה הקודמת",
    next: "העבודה הבאה",
    fromSeries: "מתוך הסדרה",
    email: "דוא״ל",
    instagram: "אינסטגרם",
  },
  en: {
    name: "Ziv Balbirsky",
    role: "Painter",
    siteDescription: "Paintings and drawings by Ziv Balbirsky",
    navLabel: "Site",
    works: "Works",
    contact: "Contact",
    switchLabel: "עברית",
    scaleNote: "Every work is shown at its true relative size",
    scale: "50 cm",
    undated: "Undated",
    paintings: "Paintings",
    paper: "Works on paper",
    sortBy: "Sort by",
    viewsLabel: "Arrange the works",
    views: { medium: "Medium", year: "Year", size: "Size" },
    flipTo: "Press again for",
    layoutsLabel: "How to look",
    layouts: { wall: "Wall", index: "Index" },
    order: {
      medium: ["paintings first", "works on paper first"],
      year: ["newest first", "oldest first"],
      size: ["largest first", "smallest first"],
    },
    cm: "cm",
    allWorks: "All works",
    workNav: "More works",
    previous: "Previous work",
    next: "Next work",
    fromSeries: "From the series",
    email: "Email",
    instagram: "Instagram",
  },
} as const
