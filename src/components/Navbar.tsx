import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { navItems, profile, resumeUrl } from '../data/portfolio'
import type { SectionId } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'

const sectionIds = navItems.map((item) => item.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active: SectionId = useActiveSection(sectionIds)

  // Close the mobile menu with Escape and when the viewport grows to desktop size.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const media = window.matchMedia('(min-width: 1024px)')
    const onChange = () => media.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    media.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      media.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-line bg-bg/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          className="text-lg font-semibold tracking-tight text-ink"
          aria-label={`${profile.name}, back to top`}
        >
          {profile.logo}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative inline-flex rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-line-strong bg-surface-2"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={resumeUrl}
            download
            className="bg-brand hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 sm:inline-flex"
          >
            <Download className="size-4" aria-hidden="true" />
            Download Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-line-strong lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5 pt-1 sm:px-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`flex min-h-12 items-center rounded-xl px-4 text-base transition-colors ${
                      active === item.id
                        ? 'bg-surface-2 text-ink'
                        : 'text-muted hover:bg-surface hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={resumeUrl}
                  download
                  onClick={() => setOpen(false)}
                  className="bg-brand flex min-h-12 items-center justify-center gap-2 rounded-xl text-base font-medium text-white"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
