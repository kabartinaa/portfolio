import { motion, useReducedMotion } from 'framer-motion'
import { availability, hero } from '../data/portfolio'

type Token = { t: string; c?: string }
type Line = Token[]

const kw = 'text-violet-soft'
const str = 'text-blue-soft'
const num = 'text-cyan-300'
const key = 'text-ink'
const dim = 'text-faint'

const q = (items: string[]): Token[] =>
  items.flatMap((item, i) => [
    { t: `"${item}"`, c: str },
    ...(i < items.length - 1 ? [{ t: ', ', c: dim }] : []),
  ])

function buildLines(): Line[] {
  const e = hero.editor
  return [
    [{ t: 'import type', c: kw }, { t: ' { Engineer } ', c: key }, { t: 'from', c: kw }, { t: ' "./types"', c: str }, { t: ';', c: dim }],
    [],
    [{ t: 'export const', c: kw }, { t: ' kabartinaa', c: 'text-cyan-300' }, { t: ': Engineer = {', c: dim }],
    [{ t: '  role', c: key }, { t: ': ', c: dim }, { t: `"${e.role}"`, c: str }, { t: ',', c: dim }],
    [{ t: '  focus', c: key }, { t: ': [', c: dim }, ...q(e.focus), { t: '],', c: dim }],
    [{ t: '  stack', c: key }, { t: ': [', c: dim }, ...q(e.stack), { t: '],', c: dim }],
    [{ t: '  internships', c: key }, { t: ': ', c: dim }, { t: String(e.internships), c: num }, { t: ',', c: dim }],
    [{ t: '  education', c: key }, { t: ': ', c: dim }, { t: `"${e.education}"`, c: str }, { t: ',', c: dim }],
    [{ t: '  interests', c: key }, { t: ': [', c: dim }, ...q(e.interests), { t: '],', c: dim }],
    [{ t: '  openToWork', c: key }, { t: ': ', c: dim }, { t: String(availability.open), c: num }, { t: ',', c: dim }],
    [{ t: '};', c: dim }],
  ]
}

const lines = buildLines()

/** The hero's one orchestrated moment: the profile "types in" line by line, once. */
export default function EditorPanel() {
  const reduce = useReducedMotion()

  return (
    <figure className="relative" aria-label="Profile summary shown as TypeScript code">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-blue/25 to-violet/25 opacity-60 blur-3xl"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line bg-surface-2/60 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </div>
          <span className="font-mono text-xs text-muted">kabartinaa.ts</span>
        </div>

        <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-7 sm:p-5 sm:text-[13.5px]">
          <code>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                className="flex whitespace-pre"
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.11, duration: 0.3, ease: 'easeOut' }}
              >
                <span className="mr-4 w-5 shrink-0 select-none text-right text-line-strong" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  {line.map((tok, j) => (
                    <span key={j} className={tok.c}>
                      {tok.t}
                    </span>
                  ))}
                  {i === lines.length - 1 && (
                    <span
                      className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-caret bg-blue-soft"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </code>
        </pre>
      </div>
    </figure>
  )
}
