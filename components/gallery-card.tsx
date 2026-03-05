"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Artwork } from "@/lib/artworks"

interface GalleryCardProps {
  artwork: Artwork
  index: number
  onClick: () => void
}

export function GalleryCard({ artwork, index, onClick }: GalleryCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, delay: index * 0.04 }}
      className="group cursor-pointer h-full relative overflow-hidden bg-neutral-100"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${artwork.title}`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick() }}
    >
      {/* Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-100" aria-hidden="true" />
      )}

      {/* Image — fills card */}
      <Image
        src={artwork.src}
        alt={artwork.title}
        width={Math.round(1200 * artwork.aspectRatio)}
        height={1200}
        className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 768px) 100vw, 520px"
      />

      {/* Hover overlay — title + year */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end px-4 pb-4 pointer-events-none">
        <div>
          <h3 className="font-serif text-[15px] text-white/90 italic leading-snug">
            {artwork.title}
          </h3>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-sans mt-0.5">
            {artwork.year}
            {artwork.medium ? ` — ${artwork.medium}` : ""}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
