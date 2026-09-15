import { copy, homeHref, otherLang } from "@/lib/i18n"
import type { Lang } from "@/lib/works"

interface SiteHeaderProps {
  lang: Lang
  /** The same page in the other language. */
  altHref: string
}

export function SiteHeader({ lang, altHref }: SiteHeaderProps) {
  const t = copy[lang]
  const other = otherLang(lang)
  return (
    <header className="site-header">
      <a className="wordmark" href={homeHref(lang)}>
        <span className="wordmark-name">{t.name}</span>
        <span className="wordmark-role">{t.role}</span>
      </a>
      <nav className="site-nav" aria-label={t.navLabel}>
        <a href={homeHref(lang)}>{t.works}</a>
        <a href="#contact">{t.contact}</a>
        <a href={altHref} lang={other} hrefLang={other}>
          {t.switchLabel}
        </a>
      </nav>
    </header>
  )
}
