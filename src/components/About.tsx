import { Brain, Layers, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { about } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const icons: Record<string, LucideIcon> = { layers: Layers, brain: Brain, server: Server }

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <SectionHeading id="about-title" title={about.heading} className="mb-6" />
          <Reveal className="max-w-xl space-y-5 text-base leading-[1.75] text-muted sm:text-[17px]">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>

        <ul className="flex flex-col gap-4">
          {about.cards.map((card, i) => {
            const Icon = icons[card.icon]
            return (
              <li key={card.title}>
                <Reveal delay={i * 0.07}>
                  <div className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-blue-soft">
                      <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-ink">{card.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{card.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
