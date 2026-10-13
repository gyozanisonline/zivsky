import { HomePage } from "@/components/pages"
import { homeMetadata } from "@/lib/metadata"

export const metadata = homeMetadata()

export default function Page() {
  return <HomePage />
}
