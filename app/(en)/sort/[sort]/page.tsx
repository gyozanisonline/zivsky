import { notFound } from "next/navigation"
import { HomePage } from "@/components/pages"
import { homeMetadata } from "@/lib/metadata"
import { parseSort, SORTS, sortSlug } from "@/lib/views"

export const dynamicParams = false
export const metadata = homeMetadata("en")
export const generateStaticParams = () => SORTS.map((sort) => ({ sort: sortSlug(sort) }))

export default async function Page({ params }: { params: Promise<{ sort: string }> }) {
  const sort = parseSort((await params).sort)
  if (!sort) notFound()
  return <HomePage lang="en" sort={sort} />
}
