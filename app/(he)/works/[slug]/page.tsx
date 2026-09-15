import type { Metadata } from "next"
import { WorkPage, workStaticParams, type SlugParams } from "@/components/pages"
import { workMetadata } from "@/lib/metadata"

export const dynamicParams = false
export const generateStaticParams = workStaticParams

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params
  return workMetadata("he", slug)
}

export default async function Page({ params }: SlugParams) {
  const { slug } = await params
  return <WorkPage lang="he" slug={slug} />
}
