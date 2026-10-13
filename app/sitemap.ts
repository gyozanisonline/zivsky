import type { MetadataRoute } from "next"
import { hasAbout } from "@/lib/about"
import { SITE_URL } from "@/lib/site"
import { works } from "@/lib/works"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...(hasAbout ? ["/about"] : []), ...works.map((work) => `/works/${work.slug}`)]
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }))
}
