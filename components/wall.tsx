import type { CSSProperties } from "react"
import { copy, workHref } from "@/lib/i18n"
import { srcSet, works, type Lang, type Work } from "@/lib/works"

// Works without a recorded height hang at a middling size rather than vanishing.
const FALLBACK_HEIGHT_CM = 60

export function Wall({ lang }: { lang: Lang }) {
  const t = copy[lang]
  return (
    <main className="wall-page">
      <h1 className="visually-hidden">{t.works}</h1>
      <div className="scale">
        <p className="scale-note">{t.scaleNote}</p>
        <p className="scale-ruler">
          <span className="scale-bar" aria-hidden="true" />
          <span>{t.scale}</span>
        </p>
      </div>
      <ul className="wall">
        {works.map((work, index) => (
          <Piece key={work.id} work={work} lang={lang} eager={index < 6} />
        ))}
      </ul>
    </main>
  )
}

function Piece({ work, lang, eager }: { work: Work; lang: Lang; eager: boolean }) {
  const { image } = work
  const [smallest] = image.files
  const hang = {
    "--h": work.heightCm ?? FALLBACK_HEIGHT_CM,
    "--ratio": (image.width / image.height).toFixed(4),
    "--tone": image.color,
  } as CSSProperties

  return (
    <li className="piece" style={hang}>
      <a className="piece-link" href={workHref(lang, work.slug)}>
        <img
          className="piece-image"
          src={smallest.src}
          srcSet={srcSet(image.files)}
          sizes="(max-width: 640px) 70vw, 32vw"
          width={smallest.width}
          height={smallest.height}
          alt={work.title[lang]}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ viewTransitionName: `work-${work.slug}` } as CSSProperties}
        />
        <span className="piece-label">
          <span className="piece-title">{work.title[lang]}</span>
          <span className="piece-year">{work.year ?? ""}</span>
        </span>
      </a>
    </li>
  )
}
