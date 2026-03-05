"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CategoryNav } from "@/components/category-nav"
import { MasonryGallery } from "@/components/masonry-gallery"
import { SiteFooter } from "@/components/site-footer"
import { type Category, artworks } from "@/lib/artworks"

export function PortfolioPage() {
  const [active, setActive] = useState<Category>("all")

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="relative z-10 pt-8 lg:pt-12 pb-6 px-6 md:px-16 lg:px-24">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif font-normal text-[28px] md:text-[36px] tracking-[0.02em] text-foreground"
        >
          Ziv Balbirsky
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-[12px] tracking-[0.25em] uppercase text-muted-foreground mt-2 font-sans"
        >
          Selected Works
        </motion.p>
      </header>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-30 sticky top-0 bg-background/80 backdrop-blur-md"
      >
        <div className="px-6 md:px-16 lg:px-24 py-5 border-b border-border/50">
          <CategoryNav active={active} onChange={setActive} />
        </div>
      </motion.div>

      {/* Gallery — full bleed, no max-width constraint */}
      <main className="relative z-10 px-6 md:px-16 lg:px-24 pt-12 lg:pt-16">
        <MasonryGallery artworks={artworks} activeCategory={active} />
      </main>

      <SiteFooter />
    </div>
  )
}
