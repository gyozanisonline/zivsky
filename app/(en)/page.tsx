import { HomePage } from "@/components/pages"
import { homeMetadata } from "@/lib/metadata"

export const metadata = homeMetadata("en")

export default function Page() {
  return <HomePage lang="en" />
}
