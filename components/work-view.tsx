import type { CSSProperties } from "react"
import { copy, homeHref, otherLang, workHref } from "@/lib/i18n"
import { sizeLabel, srcSet, works, type Lang, type Work } from "@/lib/works"

export function WorkView({ work, lang }: { work: Work; lang: Lang }) {
  const t = copy[lang]
  const other = otherLang(lang)
  const index = works.findIndex((entry) => entry.id === work.id)
  const previous = works[(index - 1 + works.length) % works.length]
  const next = works[(index + 1) % works.length]
  const size = sizeLabel(work)
  const { image } = work
  const middle = image.files[1] ?? image.files[0]

  const details = [
    work.year ? String(work.year) : null,
    work.medium[lang] ?? work.medium.en,
    size ? `${size} ${t.cm}` : null,
  ].filter((line): line is string => Boolean(line))

  return (
    <main className="work">
      <figure className="work-figure">
        <img
          className="work-image"
          src={middle.src}
          srcSet={srcSet(image.files)}
          sizes="(max-width: 900px) 100vw, 66vw"
          width={image.width}
          height={image.height}
          alt={work.title[lang]}
          fetchPriority="high"
          style={{ "--tone": image.color, viewTransitionName: `work-${work.slug}` } as CSSProperties}
        />
      </figure>

      <div className="work-label">
        <h1 className="work-title">{work.title[lang]}</h1>
        <p className="work-title-alt" lang={other} dir="auto">
          {work.title[other]}
        </p>
        <div className="work-details">
          {details.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {work.series && (
            <p className="work-series">
              {t.fromSeries} {work.series[lang] ?? work.series.en}
            </p>
          )}
        </div>
        <nav className="work-nav" aria-label={t.workNav}>
          <a href={workHref(lang, previous.slug)}>{t.previous}</a>
          <a href={workHref(lang, next.slug)}>{t.next}</a>
        </nav>
        <a className="work-back" href={homeHref(lang)}>
          {t.allWorks}
        </a>
      </div>
    </main>
  )
}
