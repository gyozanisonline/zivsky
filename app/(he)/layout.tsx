import { shellMetadata, SiteShell } from "@/components/site-shell"

export const metadata = shellMetadata("he")

export default function HebrewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell lang="he">{children}</SiteShell>
}
