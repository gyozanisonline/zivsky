import { about } from "@/lib/about"
import { copy } from "@/lib/i18n"

/** Her photo, what she writes about the work, and the CV as a gallery prints it. */
export function AboutView() {
  const { portrait, portraitAlt, statement, cv } = about

  return (
    <main className="about">
      <h1 className="about-heading">{copy.about}</h1>

      <div className="about-body">
        {portrait && (
          <figure className="about-portrait">
            <img
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt={portraitAlt ?? copy.name}
              sizes="(max-width: 900px) 100vw, 360px"
            />
          </figure>
        )}

        <div className="about-text">
          {statement.map((paragraph) => (
            <p className="about-paragraph" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}

          {cv.map((group) => (
            <section className="cv-group" key={group.heading}>
              <h2 className="cv-heading">{group.heading}</h2>
              <ul className="cv-list">
                {group.entries.map((entry) => (
                  <li className="cv-entry" key={`${entry.year ?? ""}${entry.text}`}>
                    <span className="cv-year">{entry.year ?? ""}</span>
                    <span className="cv-text">{entry.text}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
