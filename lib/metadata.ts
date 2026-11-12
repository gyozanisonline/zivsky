import { about } from "@/lib/about"
import type { Metadata } from "next"
import { copy } from "@/lib/i18n"
import { getWork, sizeLabel, works } from "@/lib/works"

export function homeMetadata(): Metadata {
  const cover = works[0]?.image.share
  return {
    title: { absolute: copy.name },
    description: copy.siteDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title: copy.name,
      description: copy.siteDescription,
      siteName: copy.name,
      locale: "en_US",
      type: "website",
      images: cover ? [{ url: cover.src, width: cover.width, height: cover.height }] : [],
    },
  }
}

export function aboutMetadata(): Metadata {
  return {
    title: copy.about,
    // Her own first paragraph says who she is better than any summary of it.
    description: about.statement[0] ?? `${copy.about} ${copy.name}`,
    alternates: { canonical: "/about" },
    ...(about.portrait && {
      openGraph: {
        images: [{ url: about.portrait.src, width: about.portrait.width, height: about.portrait.height }],
      },
    }),
  }
}

export function workMetadata(slug: string): Metadata {
  const work = getWork(slug)
  if (!work) return {}
  const size = sizeLabel(work)
  const description = [work.medium.en, size && `${size} ${copy.cm}`, work.year].filter(Boolean).join(", ")
  const { share } = work.image
  return {
    title: work.title.en,
    description,
    alternates: { canonical: `/works/${slug}` },
    openGraph: {
      title: `${work.title.en} · ${copy.name}`,
      description,
      siteName: copy.name,
      locale: "en_US",
      type: "article",
      images: [{ url: share.src, width: share.width, height: share.height, alt: work.title.en }],
    },
  }
}
