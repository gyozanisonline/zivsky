"use client"

import { useEffect } from "react"

interface WorkKeysProps {
  previous: string
  next: string
  close: string
}

/** Arrow keys walk the works, Escape returns to the wall, the way a viewer behaves. */
export function WorkKeys({ previous, next, close }: WorkKeysProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const rtl = document.dir === "rtl"
      const target =
        event.key === "Escape"
          ? close
          : event.key === "ArrowLeft"
            ? (rtl ? next : previous)
            : event.key === "ArrowRight"
              ? (rtl ? previous : next)
              : null
      if (!target) return
      event.preventDefault()
      window.location.assign(target)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [previous, next, close])

  return null
}
