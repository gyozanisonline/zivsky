import type { Metadata } from "next"
import { displayFont, textFont } from "@/lib/fonts"
import { copy } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import "@/app/site.css"

export const shellMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: copy.name, template: `%s · ${copy.name}` },
  description: copy.siteDescription,
}

// The wall remembers how it was last looked at. Set before first paint, so the
// chosen mode never flashes the other one. Absent or unreadable means the default.
const RESTORE_MODES = `try{var m=JSON.parse(localStorage.getItem("ziv-modes")||"{}"),r=document.documentElement;
if(m.scale==="even")r.dataset.scale="even";if(m.names==="on")r.dataset.names="on"}catch(e){}`

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    // The script below dresses <html> before React arrives, so the mode attributes
    // differ from the server's markup on purpose.
    <html
      lang="en"
      dir="ltr"
      className={`${displayFont.variable} ${textFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_MODES }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
