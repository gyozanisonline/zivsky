import type { CSSProperties } from "react"
import { WallBar } from "@/components/wall-bar"
import { arrange } from "@/lib/arrange"
import { copy, workHref } from "@/lib/i18n"
import type { Layout, Sort } from "@/lib/views"
import { srcSet, type Lang, type Work } from "@/lib/works"

// Works without a recorded height hang at a middling size rather than vanishing.
const FALLBACK_HEIGHT_CM = 60
// The most a centimetre can take on screen, and the narrowest piece (both set in site.css).
const MAX_PX_PER_CM = 4
const MIN_PIECE_PX = 128
const EAGER_COUNT = 6

export function Wall({ lang, sort, layout }: { lang: Lang; sort: Sort; layout: Layout }) {
  const t = copy[lang]
  const groups = arrange(sort, lang)
  const eagerIds = new Set(
    groups
      .flatMap((group) => group.works)
      .slice(0, EAGER_COUNT)
      .map((work) => work.id),
  )

  return (
    <main className="wall-page">
      <h1 className="visually-hidden">{t.works}</h1>
      <WallBar lang={lang} layout={layout} sort={sort} />
      {groups.map((group) => {
        const headingId = `group-${group.key}`
        return (
          <section className="wall-group" key={group.key} aria-labelledby={group.heading ? headingId : undefined}>
            {group.heading && (
              <h2 className="group-heading" id={headingId}>
                {group.heading}
              </h2>
            )}
            <ul className="wall">
              {group.works.map((work) => (
                <Piece key={work.id} work={work} lang={lang} eager={eagerIds.has(work.id)} />
              ))}
            </ul>
          </section>
        )
      })}
    </main>
  )
}

function Piece({ work, lang, eager }: { work: Work; lang: Lang; eager: boolean }) {
  const { image } = work
  const [smallest] = image.files
  const heightCm = work.heightCm ?? FALLBACK_HEIGHT_CM
  const ratio = image.width / image.height
  // Tell the browser the real on-screen width, so it fetches the small file, not the 2400px one.
  const widestPx = Math.ceil(Math.max(MIN_PIECE_PX, heightCm * MAX_PX_PER_CM * ratio))
  const hang = {
    "--h": heightCm,
    "--ratio": ratio.toFixed(4),
    "--tone": image.color,
  } as CSSProperties

  return (
    <li className="piece" style={hang}>
      <a className="piece-link" href={workHref(lang, work.slug)}>
        <img
          className="piece-image"
          src={smallest.src}
          srcSet={srcSet(image.files)}
          sizes={`${widestPx}px`}
          width={smallest.width}
          height={smallest.height}
          alt={work.title[lang]}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ viewTransitionName: `work-${work.slug}` } as CSSProperties}
        />
        <span className="piece-label">
          <span className="piece-title">{work.title[lang]}</span>
        </span>
      </a>
    </li>
  )
}
