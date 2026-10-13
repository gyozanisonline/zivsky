import { copy } from "@/lib/i18n"
import { CONTACT } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <h2 className="footer-heading">{copy.contact}</h2>
      <ul className="contact-list">
        <li>
          <span className="contact-label">{copy.email}</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </li>
        <li>
          <span className="contact-label">{copy.instagram}</span>
          <a href={CONTACT.instagram.url} target="_blank" rel="noopener noreferrer">
            @{CONTACT.instagram.handle}
          </a>
        </li>
      </ul>
      <p className="colophon">
        © {new Date().getFullYear()} {copy.name}
      </p>
    </footer>
  )
}
