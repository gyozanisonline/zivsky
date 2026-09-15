import type { Metadata } from "next"
import { displayFont, textFont } from "@/lib/fonts"
import { copy, dirOf } from "@/lib/i18n"
import { SITE_URL } from "@/lib/site"
import type { Lang } from "@/lib/works"
import "@/app/site.css"

export const shellMetadata = (lang: Lang): Metadata => ({
  metadataBase: new URL(SITE_URL),
  title: { default: copy[lang].name, template: `%s · ${copy[lang].name}` },
  description: copy[lang].siteDescription,
})

// Each language is its own root layout, so <html lang dir> is right from the first byte.
export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} dir={dirOf(lang)} className={`${displayFont.variable} ${textFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
