"use client"

import { useEffect } from "react"

/** Arrow keys walk the works, Escape goes back to the wall. */
export function WorkKeys({ previous, next, close }: { previous: string; next: string; close: string }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const target =
        event.key === "Escape" ? close : event.key === "ArrowLeft" ? previous : event.key === "ArrowRight" ? next : null
      if (!target) return
      event.preventDefault()
      window.location.assign(target)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [previous, next, close])

  return null
}
