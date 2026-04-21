import { Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { navItems } from '../data/site-content'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bg/80 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="/#hero" className="flex items-center gap-2 font-heading text-lg font-extrabold text-white">
          <Sparkles size={18} className="text-accent" />
          Nexa Studio
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={`/${item.href}`} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="btn-secondary px-3 py-2 md:hidden"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>
      {isOpen ? (
        <nav className="section-shell grid gap-1 border-t border-white/10 py-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`/${item.href}`}
              className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell flex flex-col gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Nexa Studio. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/#hero" className="hover:text-white">
            Privacy
          </a>
          <a href="/#hero" className="hover:text-white">
            Terms
          </a>
          <a href="/#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
