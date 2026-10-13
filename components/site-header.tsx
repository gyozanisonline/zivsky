import { hasAbout } from "@/lib/about"
import { aboutHref, copy, homeHref } from "@/lib/i18n"

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href={homeHref}>
        {copy.name}
      </a>
      <nav className="site-nav" aria-label={copy.navLabel}>
        <a href={homeHref}>{copy.works}</a>
        {hasAbout && <a href={aboutHref}>{copy.about}</a>}
        <a href="#contact">{copy.contact}</a>
      </nav>
    </header>
  )
}
