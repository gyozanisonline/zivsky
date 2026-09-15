import { copy } from "@/lib/i18n"
import { CONTACT } from "@/lib/site"
import type { Lang } from "@/lib/works"

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = copy[lang]
  return (
    <footer className="site-footer" id="contact">
      <h2 className="footer-heading">{t.contact}</h2>
      <ul className="contact-list">
        <li>
          <span className="contact-label">{t.email}</span>
          <a href={`mailto:${CONTACT.email}`} dir="ltr">
            {CONTACT.email}
          </a>
        </li>
        <li>
          <span className="contact-label">{t.instagram}</span>
          <a href={CONTACT.instagram.url} dir="ltr" target="_blank" rel="noopener noreferrer">
            @{CONTACT.instagram.handle}
          </a>
        </li>
      </ul>
      <p className="colophon">
        © {new Date().getFullYear()} {t.name}
      </p>
    </footer>
  )
}
