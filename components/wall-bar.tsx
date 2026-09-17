import { copy, pageHref } from "@/lib/i18n"
import { LAYOUTS, VIEWS, type Layout, type Sort } from "@/lib/views"
import type { Lang } from "@/lib/works"

interface WallBarProps {
  lang: Lang
  layout: Layout
  sort: Sort
}

/** How to look (wall or index), how to order it, and what a centimetre is on this screen. */
export function WallBar({ lang, layout, sort }: WallBarProps) {
  const t = copy[lang]

  return (
    <div className="wall-bar">
      <div className="bar-controls">
        <nav className="layouts" aria-label={t.layoutsLabel}>
          {LAYOUTS.map((option) => (
            <a
              key={option}
              className="layout-link"
              href={pageHref(lang, option, sort)}
              aria-current={option === layout ? "page" : undefined}
            >
              {t.layouts[option]}
            </a>
          ))}
        </nav>

        <nav className="views" aria-label={t.viewsLabel}>
          <span className="views-label">{t.sortBy}</span>
          {VIEWS.map((view) => {
            const active = view === sort.view
            // The order you are on links to its own reverse; the others open their own first order.
            const target: Sort = { view, reversed: active ? !sort.reversed : false }
            const now = t.order[view][active && sort.reversed ? 1 : 0]
            const then = t.order[view][target.reversed ? 1 : 0]
            const label = active ? `${t.views[view]}, ${now}. ${t.flipTo} ${then}` : t.views[view]
            return (
              <a
                key={view}
                className="view-link"
                href={pageHref(lang, layout, target)}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                title={label}
              >
                {t.views[view]}
                {active && (
                  <span className="view-dir" aria-hidden="true">
                    {sort.reversed ? "↑" : "↓"}
                  </span>
                )}
              </a>
            )
          })}
        </nav>
      </div>

      {layout === "wall" && (
        <div className="scale">
          <p className="scale-note">{t.scaleNote}</p>
          <p className="scale-ruler">
            <span className="scale-bar" aria-hidden="true" />
            <span>{t.scale}</span>
          </p>
        </div>
      )}
    </div>
  )
}
