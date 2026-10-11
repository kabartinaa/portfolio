import { Brain, Code2, Database, Layers, Terminal, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skillCategories, skillsHeading } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'

const categoryIcons: Record<string, LucideIcon> = {
  code: Code2,
  layers: Layers,
  database: Database,
  wrench: Wrench,
  brain: Brain,
  terminal: Terminal,
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading id="skills-title" title={skillsHeading} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => {
          const Icon = categoryIcons[category.icon]
          return (
            <Reveal key={category.title} delay={(i % 3) * 0.06}>
              <section
                aria-label={category.title}
                className="h-full rounded-2xl border border-line bg-surface p-5 sm:p-6"
              >
                <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                  <Icon className="size-[18px] text-blue-soft" aria-hidden="true" strokeWidth={1.75} />
                  {category.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="group inline-flex items-center gap-2 rounded-lg border border-line bg-bg/60 px-2.5 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-ink"
                    >
                      <TechIcon
                        name={skill.icon}
                        className="size-4 text-faint transition-colors group-hover:text-blue-soft"
                      />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
