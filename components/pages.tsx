import { notFound } from "next/navigation"
import { AboutView } from "@/components/about-view"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Wall } from "@/components/wall"
import { WorkView } from "@/components/work-view"
import { hasAbout } from "@/lib/about"
import { getWork, works } from "@/lib/works"

export type SlugParams = { params: Promise<{ slug: string }> }

export const workStaticParams = () => works.map((work) => ({ slug: work.slug }))

export function HomePage() {
  return (
    <div className="page">
      <SiteHeader />
      <Wall />
      <SiteFooter />
    </div>
  )
}

export function AboutPage() {
  if (!hasAbout) notFound()
  return (
    <div className="page">
      <SiteHeader />
      <AboutView />
      <SiteFooter />
    </div>
  )
}

export function WorkPage({ slug }: { slug: string }) {
  const work = getWork(slug)
  if (!work) notFound()
  return (
    <div className="page">
      <SiteHeader />
      <WorkView work={work} />
      <SiteFooter />
    </div>
  )
}
