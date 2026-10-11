import { CalendarDays, GraduationCap } from 'lucide-react'
import { education, educationHeading } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading id="education-title" title={educationHeading} />

      <Reveal>
        <article className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-surface-2 text-blue-soft">
              <GraduationCap className="size-7" aria-hidden="true" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-ink">{education.institution}</h3>
              <p className="mt-1 text-base text-muted">{education.degree}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-faint">
                <CalendarDays className="size-4" aria-hidden="true" />
                <span className="font-mono">{education.period}</span>
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h4 className="text-sm font-semibold text-ink">Relevant coursework</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <li
                  key={course}
                  className="rounded-lg border border-line bg-bg/60 px-3 py-1.5 text-sm text-muted"
                >
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>
    </section>
  )
}
