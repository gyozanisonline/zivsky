import type { Metadata } from "next"
import { displayFont, nameFont, textFont } from "@/lib/fonts"
import { copy } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import "@/app/site.css"

export const shellMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: copy.name, template: `%s · ${copy.name}` },
  description: copy.siteDescription,
}

// The wall remembers how it was last looked at. Set before first paint, so the
// chosen mode never flashes the other one. Absent or unreadable means the default:
// equal size, 64 apart, no names.
const RESTORE_MODES = process.env.NODE_ENV === "production" ? "" : `try{var m=JSON.parse(localStorage.getItem("ziv-modes")||"{}"),r=document.documentElement;
if(m.scale==="true")r.dataset.scale="true";if(m.names==="on")r.dataset.names="on";
if(typeof m.gap==="number")r.style.setProperty("--wall-gap",m.gap+"px")}catch(e){}`

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    // The script below dresses <html> before React arrives, so the mode attributes
    // differ from the server's markup on purpose.
    <html
      lang="en"
      dir="ltr"
      className={`${nameFont.variable} ${displayFont.variable} ${textFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {RESTORE_MODES && <script dangerouslySetInnerHTML={{ __html: RESTORE_MODES }} />}
      </head>
      <body>{children}</body>
    </html>
  )
}
