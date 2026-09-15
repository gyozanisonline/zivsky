import type { Metadata } from "next"
import { copy, pathFor } from "@/lib/i18n"
import { getWork, sizeLabel, works, type Lang } from "@/lib/works"

const LOCALE: Record<Lang, string> = { he: "he_IL", en: "en_US" }

function alternates(lang: Lang, path: string): Metadata["alternates"] {
  return {
    canonical: pathFor(lang, path),
    languages: { he: pathFor("he", path), en: pathFor("en", path), "x-default": pathFor("he", path) },
  }
}

export function homeMetadata(lang: Lang): Metadata {
  const t = copy[lang]
  const cover = works[0]?.image.share
  return {
    title: { absolute: `${t.name} · ${t.role}` },
    description: t.siteDescription,
    alternates: alternates(lang, ""),
    openGraph: {
      title: t.name,
      description: t.siteDescription,
      siteName: t.name,
      locale: LOCALE[lang],
      type: "website",
      images: cover ? [{ url: cover.src, width: cover.width, height: cover.height }] : [],
    },
  }
}

export function workMetadata(lang: Lang, slug: string): Metadata {
  const work = getWork(slug)
  if (!work) return {}
  const t = copy[lang]
  const size = sizeLabel(work)
  const description = [work.medium[lang] ?? work.medium.en, size && `${size} ${t.cm}`, work.year]
    .filter(Boolean)
    .join(", ")
  const { share } = work.image
  return {
    title: work.title[lang],
    description,
    alternates: alternates(lang, `/works/${slug}`),
    openGraph: {
      title: `${work.title[lang]} · ${t.name}`,
      description,
      siteName: t.name,
      locale: LOCALE[lang],
      type: "article",
      images: [{ url: share.src, width: share.width, height: share.height, alt: work.title[lang] }],
    },
  }
}
