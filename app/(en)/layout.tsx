import { shellMetadata, SiteShell } from "@/components/site-shell"

export const metadata = shellMetadata("en")

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="en">{children}</SiteShell>
}
