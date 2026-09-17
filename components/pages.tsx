import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { IndexView } from "@/components/index-view"
import { Wall } from "@/components/wall"
import { WorkView } from "@/components/work-view"
import { otherLang, pageHref, workHref } from "@/lib/i18n"
import { DEFAULT_LAYOUT, DEFAULT_SORT, type Layout, type Sort } from "@/lib/views"
import { getWork, works, type Lang } from "@/lib/works"

export type SlugParams = { params: Promise<{ slug: string }> }

export const workStaticParams = () => works.map((work) => ({ slug: work.slug }))

interface HomePageProps {
  lang: Lang
  sort?: Sort
  layout?: Layout
}

export function HomePage({ lang, sort = DEFAULT_SORT, layout = DEFAULT_LAYOUT }: HomePageProps) {
  return (
    <div className="page">
      <SiteHeader lang={lang} altHref={pageHref(otherLang(lang), layout, sort)} />
      {layout === "index" ? (
        <IndexView lang={lang} sort={sort} layout={layout} />
      ) : (
        <Wall lang={lang} sort={sort} layout={layout} />
      )}
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
