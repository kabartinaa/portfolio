import type { ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionHeadingProps {
  id: string
  title: string
  children?: ReactNode
  /** Tailwind classes for the wrapper; defaults to a roomy bottom margin. */
  className?: string
}

export default function SectionHeading({ id, title, children, className = 'mb-12' }: SectionHeadingProps) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <h2 id={id} className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children ? <p className="mt-4 text-base leading-relaxed text-muted">{children}</p> : null}
    </Reveal>
  )
}
