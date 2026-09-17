import { WallBar } from "@/components/wall-bar"
import { arrange } from "@/lib/arrange"
import { copy, workHref } from "@/lib/i18n"
import type { Layout, Sort } from "@/lib/views"
import { sizeLabel, type Lang, type Work } from "@/lib/works"

/** The register: every work as a line of words, the way a catalogue lists them. */
export function IndexView({ lang, sort, layout }: { lang: Lang; sort: Sort; layout: Layout }) {
  const t = copy[lang]
  const groups = arrange(sort, lang)

  return (
    <main className="index-page">
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
            <ul className="index">
              {group.works.map((work) => (
                <Line key={work.id} work={work} lang={lang} />
              ))}
            </ul>
          </section>
        )
      })}
    </main>
  )
}

function Line({ work, lang }: { work: Work; lang: Lang }) {
  const t = copy[lang]
  const size = sizeLabel(work)
  return (
    <li>
      <a className="index-row" href={workHref(lang, work.slug)}>
        <span className="index-title">{work.title[lang]}</span>
        <span className="index-year">{work.year ?? ""}</span>
        <span className="index-medium">{work.medium[lang] ?? work.medium.en}</span>
        <span className="index-size">{size ? `${size} ${t.cm}` : ""}</span>
      </a>
    </li>
  )
}
