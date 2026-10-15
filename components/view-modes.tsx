"use client"

import { useEffect, useState } from "react"
import { copy } from "@/lib/i18n"

type Scale = "true" | "even"
type Names = "on" | "off"

interface Modes {
  scale: Scale
  names: Names
  /** The space between works, in px. null means the wall's own 64. */
  gap: number | null
}

const DEFAULT_MODES: Modes = { scale: "even", names: "off", gap: null }
const DEFAULT_GAP = 64
const STORE = "ziv-modes"

/** The one switch the visitor gets, under the wall: the works at their real size. */
export function ScaleSwitch() {
  const [scale, setScale] = useState<Scale>("even")

  useEffect(() => {
    setScale(document.documentElement.dataset.scale === "true" ? "true" : "even")
  }, [])

  const flip = () => {
    const next: Scale = scale === "true" ? "even" : "true"
    const root = document.documentElement
    root.dataset.scale = next
    setScale(next)
    try {
      const stored = JSON.parse(localStorage.getItem(STORE) || "{}")
      localStorage.setItem(STORE, JSON.stringify({ ...stored, scale: next }))
    } catch {
      // The switch still works without the memory of it.
    }
  }

  return (
    <button type="button" className="scale-switch" aria-pressed={scale === "true"} onClick={flip}>
      {scale === "true" ? copy.seeEqualSize : copy.seeTrueSize}
    </button>
  )
}

/** The switches while the hanging is being decided: real scale or equal frames, names or none, how close. */
export function ViewModes() {
  const [modes, setModes] = useState<Modes>(DEFAULT_MODES)

  // The inline script in the shell has already dressed <html>; read it back so the
  // switches say what the wall is actually doing.
  useEffect(() => {
    const root = document.documentElement
    const gap = root.style.getPropertyValue("--wall-gap")
    setModes({
      scale: root.dataset.scale === "true" ? "true" : "even",
      names: root.dataset.names === "on" ? "on" : "off",
      gap: gap ? Number.parseInt(gap, 10) : null,
    })
  }, [])

  const apply = (next: Modes) => {
    const root = document.documentElement
    root.dataset.scale = next.scale
    root.dataset.names = next.names
    if (next.gap === null) root.style.removeProperty("--wall-gap")
    else root.style.setProperty("--wall-gap", `${next.gap}px`)
    setModes(next)
    try {
      localStorage.setItem(STORE, JSON.stringify(next))
    } catch {
      // A browser that refuses storage still gets the switches, just not the memory of them.
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
      <label className="gap-control">
        <span>{copy.spacing}</span>
        <input
          id="wall-gap"
          type="range"
          min={0}
          max={96}
          step={4}
          value={modes.gap ?? DEFAULT_GAP}
          onChange={(event) => apply({ ...modes, gap: Number(event.target.value) })}
        />
        <span className="gap-value">{modes.gap ?? DEFAULT_GAP}</span>
      </label>
    </div>
  )
}
