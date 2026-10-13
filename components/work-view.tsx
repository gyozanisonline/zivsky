import type { CSSProperties } from "react"
import { WorkKeys } from "@/components/work-keys"
import { copy, homeHref, workHref } from "@/lib/i18n"
import { sizeLabel, srcSet, works, type Work } from "@/lib/works"

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

/** The viewer: the painting large, its label beside it, and the names that the wall leaves out. */
export function WorkView({ work }: { work: Work }) {
  const index = works.findIndex((entry) => entry.id === work.id)
  const previous = works[(index - 1 + works.length) % works.length]
  const next = works[(index + 1) % works.length]
  const size = sizeLabel(work)
  const { image } = work
  const middle = image.files[1] ?? image.files[0]

  const previousHref = workHref(previous.slug)
  const nextHref = workHref(next.slug)

  const details = [
    work.year ? String(work.year) : null,
    work.medium.en,
    size ? `${size} ${copy.cm}` : null,
  ].filter((line): line is string => Boolean(line))

  return (
    <main className="work">
      <a className="work-close" href={homeHref} aria-label={copy.allWorks} title={copy.allWorks}>
        <Cross />
      </a>

      <figure className="work-figure">
        <a className="work-arrow work-arrow-prev" href={previousHref} aria-label={copy.previous} title={copy.previous}>
          <Chevron />
        </a>
        <img
          className="work-image"
          src={middle.src}
          srcSet={srcSet(image.files)}
          sizes="(max-width: 900px) 100vw, 66vw"
          width={image.width}
          height={image.height}
          alt={work.title.en}
          fetchPriority="high"
          style={{ "--tone": image.color, viewTransitionName: `work-${work.slug}` } as CSSProperties}
        />
        <a className="work-arrow work-arrow-next" href={nextHref} aria-label={copy.next} title={copy.next}>
          <Chevron />
        </a>
      </figure>

      <div className="work-label">
        <h1 className="work-title">{work.title.en}</h1>
        <div className="work-details">
          {details.map((line) => (
            <p key={line}>{line}</p>
          ))}
          {work.series && <p className="work-series">{`${copy.fromSeries} ${work.series.en}`}</p>}
        </div>
      </div>

      <WorkKeys previous={previousHref} next={nextHref} close={homeHref} />
    </main>
  )
}
