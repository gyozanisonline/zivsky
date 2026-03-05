"use client"

/**
 * Sanity Studio — embedded at /studio
 * Loaded client-side only (Studio uses React.createContext which can't run on the server).
 */
import dynamic from "next/dynamic"
import config from "../../../sanity.config"

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
