import { HomePage } from "@/components/pages"
import { homeMetadata } from "@/lib/metadata"

export const metadata = homeMetadata("he")

export default function Page() {
  return <HomePage lang="he" layout="index" />
}
