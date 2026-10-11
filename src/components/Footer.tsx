import { ArrowUp } from 'lucide-react'
import { navItems, profile } from '../data/portfolio'
import { scrollToTop } from '../hooks/scrollToTop'
import { GithubIcon, LinkedinIcon } from './SocialIcons'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-ink">Designed and built by {profile.name}.</p>
          <p className="mt-1 text-sm text-faint">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="inline-flex min-h-8 items-center transition hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-ink"
          >
            <GithubIcon className="size-[18px]" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-ink"
          >
            <LinkedinIcon className="size-[18px]" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition hover:border-line-strong hover:text-ink"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
