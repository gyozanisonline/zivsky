import type { CSSProperties } from "react"
import { WorkKeys } from "@/components/work-keys"
import { hangOrder } from "@/lib/arrange"
import { copy, homeHref, otherLang, workHref } from "@/lib/i18n"
import { sizeLabel, srcSet, type Lang, type Work } from "@/lib/works"

const Chevron = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
    <path d="M10.5 2 4.5 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.25" />
  </svg>
)

const Cross = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="currentColor" strokeWidth="1.25" />
  </svg>
)

export function WorkView({ work, lang }: { work: Work; lang: Lang }) {
  const t = copy[lang]
  const other = otherLang(lang)
  const index = hangOrder.findIndex((entry) => entry.id === work.id)
  const previous = hangOrder[(index - 1 + hangOrder.length) % hangOrder.length]
  const next = hangOrder[(index + 1) % hangOrder.length]
  const size = sizeLabel(work)
  const { image } = work
  const middle = image.files[1] ?? image.files[0]

  const previousHref = workHref(lang, previous.slug)
  const nextHref = workHref(lang, next.slug)
  const closeHref = homeHref(lang)

  const details = [
    work.year ? String(work.year) : null,
    work.medium[lang] ?? work.medium.en,
    size ? `${size} ${t.cm}` : null,
  ].filter((line): line is string => Boolean(line))

  return (
    <main className="work">
      <a className="work-close" href={closeHref} aria-label={t.allWorks} title={t.allWorks}>
        <Cross />
      </a>

      <figure className="work-figure">
        <a className="work-arrow work-arrow-prev" href={previousHref} aria-label={t.previous} title={t.previous}>
          <Chevron />
        </a>
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
        <a className="work-arrow work-arrow-next" href={nextHref} aria-label={t.next} title={t.next}>
          <Chevron />
        </a>
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
      </div>

      <WorkKeys previous={previousHref} next={nextHref} close={closeHref} />
    </main>
  )
}
