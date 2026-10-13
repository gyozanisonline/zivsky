import { shellMetadata, SiteShell } from "@/components/site-shell"

export const metadata = shellMetadata

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell>{children}</SiteShell>
}
