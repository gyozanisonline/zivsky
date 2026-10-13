"use client"

import { useEffect, useState } from "react"
import { copy } from "@/lib/i18n"

type Scale = "true" | "even"
type Names = "on" | "off"

interface Modes {
  scale: Scale
  names: Names
}

const DEFAULT_MODES: Modes = { scale: "true", names: "off" }
const STORE = "ziv-modes"

/** Two switches while the hanging is being decided: real scale or equal frames, names or no names. */
export function ViewModes() {
  const [modes, setModes] = useState<Modes>(DEFAULT_MODES)

  // The inline script in the shell has already dressed <html>; read it back so the
  // switches say what the wall is actually doing.
  useEffect(() => {
    const root = document.documentElement
    setModes({
      scale: root.dataset.scale === "even" ? "even" : "true",
      names: root.dataset.names === "on" ? "on" : "off",
    })
  }, [])

  const apply = (next: Modes) => {
    const root = document.documentElement
    root.dataset.scale = next.scale
    root.dataset.names = next.names
    setModes(next)
    try {
      localStorage.setItem(STORE, JSON.stringify(next))
    } catch {
      // A browser that refuses storage still gets the switch, just not the memory of it.
    }
  }

  return (
    <div className="modes" role="group" aria-label={copy.modesLabel}>
      <button
        type="button"
        className="mode-link"
        aria-pressed={modes.scale === "even"}
        onClick={() => apply({ ...modes, scale: modes.scale === "even" ? "true" : "even" })}
      >
        {modes.scale === "even" ? copy.trueSize : copy.evenSize}
      </button>
      <button
        type="button"
        className="mode-link"
        aria-pressed={modes.names === "on"}
        onClick={() => apply({ ...modes, names: modes.names === "on" ? "off" : "on" })}
      >
        {modes.names === "on" ? copy.namesOff : copy.namesOn}
      </button>
    </div>
  )
}
