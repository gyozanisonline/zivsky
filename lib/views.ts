// Ways to arrange the wall. Pressing the option you are already on reverses it.
export const VIEWS = ["medium", "year", "size"] as const
export type View = (typeof VIEWS)[number]

export interface Sort {
  view: View
  reversed: boolean
}

export const DEFAULT_SORT: Sort = { view: "medium", reversed: false }

export const SORTS: Sort[] = VIEWS.flatMap((view) => [
  { view, reversed: false },
  { view, reversed: true },
])

export const sortSlug = ({ view, reversed }: Sort): string => (reversed ? `${view}-reversed` : view)

export const isDefaultSort = (sort: Sort): boolean =>
  sort.view === DEFAULT_SORT.view && sort.reversed === DEFAULT_SORT.reversed

export const parseSort = (slug: string): Sort | null => SORTS.find((sort) => sortSlug(sort) === slug) ?? null
