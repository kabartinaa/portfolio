import { ArrowUpRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { Project } from '../data/portfolio'
import { GithubIcon } from './SocialIcons'
import ProjectVisual from './ProjectVisuals'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project, trigger: HTMLElement) => void
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { links } = project

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-2xl hover:shadow-black/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <ProjectVisual kind={project.visual} className="border-b border-line" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[13px] text-blue-soft">{project.categories.join(', ')}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{project.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-md border border-line bg-bg/60 px-2 py-1 text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <button
            type="button"
            onClick={(e: MouseEvent<HTMLButtonElement>) => onOpen(project, e.currentTarget)}
            aria-haspopup="dialog"
            className="bg-brand inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-white transition hover:brightness-110"
          >
            View Details
            <span className="sr-only"> for {project.title}</span>
          </button>
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-blue-soft hover:bg-surface-2"
            >
              <GithubIcon className="size-4" />
              GitHub
              <span className="sr-only"> repository for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-blue-soft hover:bg-surface-2"
            >
              Live Demo
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
