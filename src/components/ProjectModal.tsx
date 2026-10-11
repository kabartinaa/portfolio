import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { profile } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { GithubIcon } from './SocialIcons'
import ProjectVisual from './ProjectVisuals'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      {children}
    </section>
  )
}

/** Uses the native <dialog> element: focus trapping, Escape-to-close and inert background come built in. */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const { details, links } = project
  const hasLinks = Boolean(links.github || links.live)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()

    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (e.target === e.currentTarget) onClose()
      }}
      className="project-dialog w-[min(100%-1.5rem,52rem)] max-w-none overflow-hidden rounded-2xl bg-surface"
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-bg/70 text-ink backdrop-blur transition hover:bg-bg"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain">
          <ProjectVisual kind={project.visual} interactive aspect="aspect-[16/9] sm:aspect-[2/1]" />

          <div className="space-y-8 p-6 sm:p-9">
            <header>
              <p className="text-[13px] text-blue-soft">{project.categories.join(', ')}</p>
              <h2 id="project-dialog-title" className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{details.overview}</p>
            </header>

            <div className="grid gap-8 sm:grid-cols-2">
              <Block title="The problem">
                <p className="text-[15px] leading-relaxed text-muted">{details.problem}</p>
              </Block>
              <Block title="Solution and implementation">
                <p className="text-[15px] leading-relaxed text-muted">{details.solution}</p>
              </Block>
            </div>

            <Block title="Key features">
              <ul className="grid gap-2 text-[15px] text-muted sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-blue-soft" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="My technical contributions">
              <ul className="space-y-2 text-[15px] text-muted">
                {details.contributions.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-violet-soft" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Technologies used">
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="rounded-md border border-line bg-bg/60 px-2.5 py-1 text-[13px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            <div className="flex flex-wrap gap-3 border-t border-line pt-6">
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition hover:border-blue-soft"
                >
                  <GithubIcon className="size-4" />
                  GitHub repository
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {links.live && (
                <a
                  href={links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 text-sm font-medium text-white transition hover:brightness-110"
                >
                  Live Demo
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {!hasLinks && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition hover:border-blue-soft"
                >
                  <GithubIcon className="size-4" />
                  See my work on GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
