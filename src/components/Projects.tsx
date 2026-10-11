import { useRef, useState } from 'react'
import { projects, projectsHeading } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const open = (project: Project, el: HTMLElement) => {
    trigger.current = el
    setSelected(project)
  }

  const close = () => {
    setSelected(null)
    // Return focus to the button that opened the dialog.
    requestAnimationFrame(() => trigger.current?.focus())
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading id="projects-title" title={projectsHeading} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.07} className="h-full">
            <ProjectCard project={project} onOpen={open} />
          </Reveal>
        ))}
      </div>

      {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
    </section>
  )
}
