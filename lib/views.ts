// Two ways to look at the works, and three ways to order them.
// Pressing the order you are already on reverses it.
export const LAYOUTS = ["wall", "index"] as const
export type Layout = (typeof LAYOUTS)[number]
export const DEFAULT_LAYOUT: Layout = "wall"

// Never name this segment "index": it collides with Next's own index.html and the build fails.
export const LAYOUT_SLUG: Record<Layout, string> = { wall: "", index: "/list" }

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
