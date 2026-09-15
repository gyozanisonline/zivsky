import type { Lang } from "@/lib/works"

export const LANGS: readonly Lang[] = ["he", "en"]

// The language served at "/". Flip this to open the site in English.
export const DEFAULT_LANG: Lang = "he"

export const dirOf = (lang: Lang) => (lang === "he" ? "rtl" : "ltr")
export const otherLang = (lang: Lang): Lang => (lang === "he" ? "en" : "he")

const prefix = (lang: Lang) => (lang === DEFAULT_LANG ? "" : `/${lang}`)
export const homeHref = (lang: Lang) => prefix(lang) || "/"
export const workHref = (lang: Lang, slug: string) => `${prefix(lang)}/works/${slug}`
export const pathFor = (lang: Lang, path: string) => `${prefix(lang)}${path}` || "/"

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
