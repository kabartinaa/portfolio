import { experience, experienceHeading } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading id="experience-title" title={experienceHeading} />

      <ol className="relative ml-2 border-l border-line-strong sm:ml-3">
        {experience.map((item, i) => (
          <li key={item.organization} className="relative pb-10 pl-7 last:pb-0 sm:pl-10">
            <span
              className="absolute -left-[7px] top-7 size-3 rounded-full border-2 border-bg bg-blue ring-4 ring-blue/15"
              aria-hidden="true"
            />
            <Reveal delay={i * 0.05}>
              <article className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
                <header className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.role}</h3>
                    <p className="mt-0.5 text-[15px] text-blue-soft">{item.organization}</p>
                  </div>
                  <p className="shrink-0 font-mono text-[13px] text-faint sm:pt-1">{item.period}</p>
                </header>

                <p className="mt-4 border-l-2 border-violet/60 pl-3.5 text-[15px] leading-relaxed text-ink/90">
                  {item.focus}
                </p>

                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies and focus areas">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line bg-bg/60 px-2.5 py-1 text-[13px] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
