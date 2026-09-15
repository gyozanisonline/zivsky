import type { MetadataRoute } from "next"
import { LANGS, pathFor } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import { works } from "@/lib/works"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...works.map((work) => `/works/${work.slug}`)]
  return paths.flatMap((path) =>
    LANGS.map((lang) => ({
      url: `${SITE_URL}${pathFor(lang, path)}`,
      alternates: {
        languages: Object.fromEntries(LANGS.map((alt) => [alt, `${SITE_URL}${pathFor(alt, path)}`])),
      },
    })),
  )
}
