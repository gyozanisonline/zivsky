import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Wall } from "@/components/wall"
import { WorkView } from "@/components/work-view"
import { otherLang, sortHref, workHref } from "@/lib/i18n"
import { DEFAULT_SORT, type Sort } from "@/lib/views"
import { getWork, works, type Lang } from "@/lib/works"

export type SlugParams = { params: Promise<{ slug: string }> }

export const workStaticParams = () => works.map((work) => ({ slug: work.slug }))

export function HomePage({ lang, sort = DEFAULT_SORT }: { lang: Lang; sort?: Sort }) {
  return (
    <div className="page">
      <SiteHeader lang={lang} altHref={sortHref(otherLang(lang), sort)} />
      <Wall lang={lang} sort={sort} />
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
