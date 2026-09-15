import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Wall } from "@/components/wall"
import { WorkView } from "@/components/work-view"
import { homeHref, otherLang, workHref } from "@/lib/i18n"
import { getWork, works, type Lang } from "@/lib/works"

export type SlugParams = { params: Promise<{ slug: string }> }

export const workStaticParams = () => works.map((work) => ({ slug: work.slug }))

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <div className="page">
      <SiteHeader lang={lang} altHref={homeHref(otherLang(lang))} />
      <Wall lang={lang} />
      <SiteFooter lang={lang} />
    </div>
  )
}

export function WorkPage({ lang, slug }: { lang: Lang; slug: string }) {
  const work = getWork(slug)
  if (!work) notFound()
  return (
    <div className="page">
      <SiteHeader lang={lang} altHref={workHref(otherLang(lang), slug)} />
      <WorkView work={work} lang={lang} />
      <SiteFooter lang={lang} />
    </div>
  )
}
