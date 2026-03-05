import { PortfolioPage } from "@/components/portfolio-page"
import { getArtworks } from "@/lib/sanity"
import { artworks as legacyArtworks } from "@/lib/artworks"

export default async function Page() {
  const sanityArtworks = await getArtworks()
  // Fall back to hardcoded artworks until Sanity is populated
  const artworks = sanityArtworks.length > 0 ? sanityArtworks : legacyArtworks
  return <PortfolioPage artworks={artworks} />
}
