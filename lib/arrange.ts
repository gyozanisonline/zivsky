import { copy } from "@/lib/i18n"
import { DEFAULT_SORT, type Sort } from "@/lib/views"
import { works, type Lang, type Work } from "@/lib/works"

export interface WallGroup {
  key: string
  heading: string | null
  works: readonly Work[]
}

const area = (work: Work) => (work.heightCm ?? 0) * (work.widthCm ?? 0)
const isOnPaper = (work: Work) => /\bon paper\b/i.test(work.medium.en ?? "")
const byLargest = (a: Work, b: Work) => area(b) - area(a)

// Newest year first, undated last.
function yearsOf(list: readonly Work[]): (number | null)[] {
  return [...new Set(list.map((work) => work.year))].sort(
    (a, b) => (b ?? Number.NEGATIVE_INFINITY) - (a ?? Number.NEGATIVE_INFINITY),
  )
}

// Biggest work first, so a run never opens on a tiny piece.
// A series hangs together, placed where its largest member would be.
function largestFirst(list: readonly Work[]): Work[] {
  const units = new Map<string, Work[]>()
  list.forEach((work) => {
    const key = work.series ? `series-${work.series.en}` : work.id
    units.set(key, [...(units.get(key) ?? []), work])
  })
  return [...units.values()]
    .map((members) => [...members].sort(byLargest))
    .sort((a, b) => byLargest(a[0], b[0]))
    .flat()
}

const newestThenLargest = (list: readonly Work[]): Work[] =>
  yearsOf(list).flatMap((year) => largestFirst(list.filter((work) => work.year === year)))

function groupsFor(view: Sort["view"], lang: Lang): WallGroup[] {
  const t = copy[lang]

  if (view === "year") {
    return yearsOf(works).map((year) => ({
      key: `year-${year ?? "undated"}`,
      heading: year ? String(year) : t.undated,
      works: largestFirst(works.filter((work) => work.year === year)),
    }))
  }

  if (view === "size") {
    const sorted = [...works].sort((a, b) => byLargest(a, b) || (b.year ?? 0) - (a.year ?? 0))
    return [{ key: "size", heading: null, works: sorted }]
  }

  return [
    { key: "paintings", heading: t.paintings, works: newestThenLargest(works.filter((work) => !isOnPaper(work))) },
    { key: "paper", heading: t.paper, works: newestThenLargest(works.filter(isOnPaper)) },
  ].filter((group) => group.works.length > 0)
}

// Reversed turns the whole wall around: last group first, last work first.
export function arrange(sort: Sort, lang: Lang): WallGroup[] {
  const groups = groupsFor(sort.view, lang)
  if (!sort.reversed) return groups
  return [...groups].reverse().map((group) => ({ ...group, works: [...group.works].reverse() }))
}

// Previous / next on a work page walk the default wall.
export const hangOrder: readonly Work[] = arrange(DEFAULT_SORT, "en").flatMap((group) => group.works)
