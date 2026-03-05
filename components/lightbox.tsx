"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { Artwork } from "@/lib/artworks"

interface LightboxProps {
  artwork: Artwork | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ artwork, onClose, onPrev, onNext }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [artwork, handleKeyDown])

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing: ${artwork.title}`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 text-[#999] hover:text-[#fff] transition-colors duration-300"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={1} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-[#666] hover:text-[#fff] transition-colors duration-300"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-[#666] hover:text-[#fff] transition-colors duration-300"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1} />
          </button>

          {/* Image + Info */}
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-6 max-w-[90vw] max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-auto max-h-[70vh]">
              <Image
                src={artwork.src}
                alt={artwork.title}
                width={1200}
                height={
                  artwork.aspectRatio < 1
                    ? 1600
                    : artwork.aspectRatio >= 1.2
                      ? 800
                      : 1200
                }
                className="max-h-[70vh] w-auto object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Metadata + contact */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="text-center">
                <h2 className="font-serif text-lg text-[#e8e8e8] font-normal italic">
                  {artwork.title}
                </h2>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#777] mt-1 font-sans">
                  {artwork.year}
                  {artwork.medium ? ` — ${artwork.medium}` : ""}
                  {artwork.dimensions ? ` · ${artwork.dimensions}` : ""}
                </p>
              </div>

              {/* Contact button — opens email client directly */}
              <a
                href={`mailto:ziv.balbirsky@gmail.com?subject=${encodeURIComponent(`Inquiry about "${artwork.title}"`)}`}
                onClick={(e) => e.stopPropagation()}
                className="px-6 py-2 text-[11px] tracking-[0.2em] uppercase font-sans border border-[#8C8A5E]/60 text-[#8C8A5E] hover:bg-[#8C8A5E] hover:text-white transition-all duration-300"
              >
                Inquire about this work
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
