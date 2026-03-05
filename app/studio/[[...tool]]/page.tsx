/**
 * Sanity Studio — embedded at /studio
 * Only accessible to authorized Sanity users (Ziv's account).
 * Login is handled by Sanity's own auth.
 */
import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export const dynamic = "force-dynamic"

export default function StudioPage() {
  return <NextStudio config={config} />
}
