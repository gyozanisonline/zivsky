"use client"

import { motion } from "framer-motion"
import { type Category, categories } from "@/lib/artworks"

interface CategoryNavProps {
  active: Category
  onChange: (category: Category) => void
}

export function CategoryNav({ active, onChange }: CategoryNavProps) {
  return (
    <nav
      aria-label="Gallery categories"
      className="flex items-center gap-8"
    >
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className="relative py-2 text-[13px] font-sans tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-500"
          style={{
            color:
              active === cat.value
                ? "var(--foreground)"
                : "var(--muted-foreground)",
          }}
          aria-pressed={active === cat.value}
        >
          <span>{cat.label}</span>
          {active === cat.value && (
            <motion.span
              layoutId="nav-underline"
              className="absolute left-0 right-0 -bottom-px h-px bg-foreground"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}
        </button>
      ))}
    </nav>
  )
}
