import type { CSSProperties } from "react"
import { ScaleSwitch, ViewModes } from "@/components/view-modes"
import { copy, workHref } from "@/lib/i18n"
import { srcSet, type Work } from "@/lib/works"
import { works } from "@/lib/works"

// Works without a recorded height hang at a middling size rather than vanishing.
const FALLBACK_HEIGHT_CM = 60
// The most a centimetre can take on screen, and the narrowest piece (both set in site.css).
const MAX_PX_PER_CM = 4
const MIN_PIECE_PX = 128
const EAGER_COUNT = 6

// The switches are ours, for deciding how the wall hangs. They never ship:
// the visitor gets the decision (equal size, 64 apart, no names), not the controls.
const SHOW_SWITCHES = process.env.NODE_ENV !== "production"

/** One wall, in the order set in the catalogue. No groups, no sorting. */
export function Wall() {
  return (
    <main className="wall-page">
      <h1 className="visually-hidden">{copy.works}</h1>

      {SHOW_SWITCHES && (
        <div className="wall-bar">
          <ViewModes />
          <div className="scale">
            <p className="scale-note scale-note-true">{copy.scaleNote}</p>
            <p className="scale-note scale-note-even">{copy.evenNote}</p>
            <p className="scale-ruler">
              <span className="scale-bar" aria-hidden="true" />
              <span>{copy.scale}</span>
            </p>
          </div>
        </div>
      )}

      <ul className="wall">
        {works.map((work, index) => (
          <Piece key={work.id} work={work} eager={index < EAGER_COUNT} />
        ))}
      </ul>

      {/* Down here, after the works, where it reads as an offer and not as a control panel. */}
      <div className="wall-foot">
        <ScaleSwitch />
        <p className="scale-ruler">
          <span className="scale-bar" aria-hidden="true" />
          <span>{copy.scale}</span>
        </p>
      </div>
    </main>
  )
}

function Piece({ work, eager }: { work: Work; eager: boolean }) {
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
      <a className="piece-link" href={workHref(work.slug)}>
        <img
          className="piece-image"
          src={smallest.src}
          srcSet={srcSet(image.files)}
          sizes={`${widestPx}px`}
          width={smallest.width}
          height={smallest.height}
          alt={work.title.en}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ viewTransitionName: `work-${work.slug}` } as CSSProperties}
        />
        <span className="piece-label">
          <span className="piece-title">{work.title.en}</span>
        </span>
      </a>
    </li>
  )
}
