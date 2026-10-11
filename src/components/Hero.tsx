import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { availability, hero, resumeUrl } from '../data/portfolio'
import EditorPanel from './EditorPanel'
import RotatingText from './RotatingText'

/** Keeps hyphenated words such as "real-world" on one line instead of splitting at the hyphen. */
function noBreakHyphens(text: string): ReactNode[] {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid min-h-svh max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {availability.open && (
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm text-muted">
              <span className="size-2 animate-pulse-dot rounded-full bg-emerald-400" aria-hidden="true" />
              {availability.label}
            </p>
          )}

          <p className="text-xs font-medium tracking-[0.18em] text-blue-soft sm:text-[13px]">{hero.eyebrow}</p>

          <h1 id="hero-title" className="mt-5">
            <span className="block text-xl font-medium text-muted sm:text-2xl">{hero.greeting}</span>
            <span className="mt-3 block text-balance text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-5xl xl:text-[3.4rem]">
              {noBreakHyphens(hero.headline)}
            </span>
          </h1>

          <RotatingText items={hero.rotating} className="mt-5 text-xl font-medium sm:text-2xl" />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="bg-brand inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-white transition hover:brightness-110"
            >
              Explore My Projects
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition hover:border-blue-soft hover:bg-surface"
            >
              Let's Connect
            </a>
            <a
              href={resumeUrl}
              download
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-3 text-[15px] font-medium text-muted underline-offset-4 transition hover:text-ink hover:underline"
            >
              <Download className="size-4" aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </motion.div>

        <EditorPanel />
      </div>
    </section>
  )
}
