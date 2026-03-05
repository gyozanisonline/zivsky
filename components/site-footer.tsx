export function SiteFooter() {
  return (
    <footer className="mt-32 lg:mt-48 pb-12 pt-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="h-px bg-border mb-12" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-serif text-sm text-foreground/60 italic">Ziv Balbirsky</span>
            <a
              href="mailto:ziv.balbirsky@gmail.com"
              className="text-[12px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-500 font-sans"
            >
              ziv.balbirsky@gmail.com
            </a>
          </div>
          <a
            href="https://www.instagram.com/ziv_balbirsky/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-500"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
