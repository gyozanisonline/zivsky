"use client"

import { useMemo, useState, useCallback, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GalleryCard } from "@/components/gallery-card"
import { Lightbox } from "@/components/lightbox"
import type { Artwork, Category } from "@/lib/artworks"

interface MasonryGalleryProps {
  artworks: Artwork[]
  activeCategory: Category
}

// Base card height ~68vh ≈ 520px on a 1080p screen — card width scales with image ratio
const BASE_HEIGHT = 520

function getCardStyle(index: number, aspectRatio: number) {
  const isOffset = index % 2 === 1
  const isFeatured = index % 5 === 0
  const scale = isFeatured ? 1.15 : 1
  const width = Math.round(BASE_HEIGHT * aspectRatio * scale)
  const height = isFeatured ? "100%" : isOffset ? "72%" : "88%"
  return {
    width: `${width}px`,
    height,
    alignSelf: isOffset ? "flex-end" : "flex-start",
  } as React.CSSProperties
}

export function MasonryGallery({ artworks, activeCategory }: MasonryGalleryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const filtered = useMemo(
    () => activeCategory === "all" ? artworks : artworks.filter((a) => a.category === activeCategory),
    [artworks, activeCategory]
  )

  const handlePrev = useCallback(() => {
    setExpandedIndex((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  }, [filtered.length])

  const handleNext = useCallback(() => {
    setExpandedIndex((i) => i !== null ? (i + 1) % filtered.length : null)
  }, [filtered.length])

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    drag.current = { active: true, startX: e.clientX, scrollLeft: scrollRef.current.scrollLeft }
    scrollRef.current.style.cursor = "grabbing"
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active || !scrollRef.current) return
    scrollRef.current.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX)
  }

  const onMouseUp = () => {
    drag.current.active = false
    if (scrollRef.current) scrollRef.current.style.cursor = "grab"
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-screen -ml-6 md:-ml-16 lg:-ml-24"
      >
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-x-auto overflow-y-hidden flex flex-row items-stretch gap-5 pl-6 md:pl-16 lg:pl-24 pr-12 select-none"
          style={{ height: "68vh", cursor: "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((artwork, i) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, scale: 0.97 }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.04 },
                  x: { duration: 0.5, delay: i * 0.04 },
                  layout: { type: "spring", stiffness: 200, damping: 28 },
                }}
                style={getCardStyle(i, artwork.aspectRatio)}
                className="flex-shrink-0"
              >
                <GalleryCard artwork={artwork} index={i} onClick={() => setExpandedIndex(i)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <Lightbox
        artwork={expandedIndex !== null ? filtered[expandedIndex] : null}
        onClose={() => setExpandedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  )
}
