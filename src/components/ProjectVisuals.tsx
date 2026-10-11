import { useId, useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import type { ProjectVisualKey } from '../data/portfolio'

/* ------------------------------------------------------------------ */
/* Room designer: original vs redesigned, with an optional slider      */
/* ------------------------------------------------------------------ */

function RoomBefore() {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
    >
      <rect width="400" height="170" fill="#161d31" />
      <rect y="170" width="400" height="80" fill="#10162a" />
      <rect y="165" width="400" height="5" fill="#1f2845" />
      {/* bare window */}
      <rect x="40" y="36" width="90" height="84" rx="3" fill="#1c2744" stroke="#2a3659" strokeWidth="2" />
      <path d="M85 36v84M40 78h90" stroke="#2a3659" strokeWidth="2" />
      {/* a single plain chair */}
      <rect x="252" y="98" width="8" height="48" rx="2" fill="#2a3659" />
      <rect x="252" y="140" width="56" height="8" rx="2" fill="#2a3659" />
      <rect x="256" y="148" width="5" height="28" fill="#232d4b" />
      <rect x="299" y="148" width="5" height="28" fill="#232d4b" />
    </svg>
  )
}

function RoomAfter() {
  const glow = useId()
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="170" fill="#26275e" />
      <rect y="170" width="400" height="80" fill="#181f40" />
      <rect y="165" width="400" height="5" fill="#343b7c" />
      {/* window + curtains */}
      <rect x="40" y="36" width="90" height="84" rx="3" fill="#3a4a8f" stroke="#5a6bb8" strokeWidth="2" />
      <path d="M85 36v84M40 78h90" stroke="#5a6bb8" strokeWidth="2" />
      <rect x="28" y="30" width="22" height="100" rx="4" fill="#7c4dff" opacity="0.85" />
      <rect x="120" y="30" width="22" height="100" rx="4" fill="#7c4dff" opacity="0.85" />
      {/* wall art above the sofa */}
      <rect x="236" y="34" width="52" height="62" rx="3" fill="#1a1c45" stroke="#7aa7ff" strokeWidth="1.5" />
      <circle cx="262" cy="56" r="11" fill="#7c4dff" />
      <path d="M244 86l14-15 9 10 9-8 7 13z" fill="#2f6bff" />
      {/* rug */}
      <ellipse cx="262" cy="214" rx="124" ry="22" fill="#2f6bff" opacity="0.35" />
      <ellipse cx="262" cy="214" rx="100" ry="16" fill="none" stroke="#7aa7ff" strokeOpacity="0.5" />
      {/* sofa */}
      <rect x="182" y="98" width="156" height="36" rx="12" fill="#5a6fe6" />
      <rect x="170" y="118" width="180" height="52" rx="12" fill="#4a5fd6" />
      <rect x="190" y="122" width="72" height="34" rx="8" fill="#6b7ff0" />
      <rect x="266" y="122" width="72" height="34" rx="8" fill="#6b7ff0" />
      <rect x="176" y="166" width="6" height="10" rx="2" fill="#2a3659" />
      <rect x="338" y="166" width="6" height="10" rx="2" fill="#2a3659" />
      {/* floor lamp */}
      <circle cx="152" cy="100" r="46" fill={`url(#${glow})`} />
      <rect x="150.5" y="108" width="3" height="68" fill="#aab6e8" />
      <ellipse cx="152" cy="177" rx="14" ry="3.5" fill="#aab6e8" />
      <path d="M136 108l8-22h16l8 22z" fill="#ffd9a0" />
      {/* plant */}
      <ellipse cx="373" cy="130" rx="8" ry="22" fill="#34d399" opacity="0.9" />
      <ellipse cx="361" cy="140" rx="7" ry="18" fill="#10b981" transform="rotate(-25 361 140)" />
      <ellipse cx="385" cy="140" rx="7" ry="18" fill="#10b981" transform="rotate(25 385 140)" />
      <path d="M359 152h28l-4 26h-20z" fill="#c2794d" />
    </svg>
  )
}

function Pill({ children, side, inset = false }: { children: string; side: 'left' | 'right'; inset?: boolean }) {
  return (
    <span
      className={`absolute top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur ${
        side === 'left' ? 'left-3' : inset ? 'right-16' : 'right-3'
      }`}
    >
      {children}
    </span>
  )
}

function RoomVisual({ interactive }: { interactive: boolean }) {
  const [split, setSplit] = useState(36)

  return (
    <div className="absolute inset-0 overflow-hidden has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-blue-soft">
      <RoomBefore />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
        <RoomAfter />
      </div>

      <Pill side="left">Original</Pill>
      <Pill side="right" inset={interactive}>Redesigned</Pill>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/80"
        style={{ left: `${split}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 inline-flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-bg/80 text-white backdrop-blur">
          <ChevronsLeftRight className="size-4" />
        </span>
      </div>

      {interactive && (
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Compare the original and redesigned room"
          aria-valuetext={`${split}% original, ${100 - split}% redesigned`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Subscription tracker: renewals dashboard                            */
/* ------------------------------------------------------------------ */

function SubscriptionVisual() {
  const rows = [
    { name: 'Music streaming', meta: 'Monthly', when: 'Tomorrow', initial: 'M', tone: '#7c4dff', hot: true },
    { name: 'Cloud storage', meta: 'Yearly', when: 'In 9 days', initial: 'C', tone: '#2f6bff', hot: false },
    { name: 'Design tools', meta: 'Monthly', when: 'In 21 days', initial: 'D', tone: '#4f8cff', hot: false },
  ]
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      <rect x="28" y="16" width="344" height="216" rx="12" fill="#0d1424" stroke="#222d4c" />
      <text x="44" y="45" fill="#e6ebf7" fontSize="13" fontWeight="600">
        Upcoming renewals
      </text>
      <rect x="270" y="31" width="86" height="22" rx="11" fill="#2f6bff" fillOpacity="0.16" stroke="#2f6bff" strokeOpacity="0.45" />
      <text x="313" y="45.5" fill="#7aa7ff" fontSize="10" textAnchor="middle">
        Reminders on
      </text>

      {rows.map((r, i) => {
        const y = 64 + i * 44
        return (
          <g key={r.name}>
            <rect x="40" y={y} width="320" height="38" rx="8" fill="#111a2e" stroke={r.hot ? '#7c4dff' : '#1c2640'} strokeOpacity={r.hot ? 0.7 : 1} />
            <circle cx="60" cy={y + 19} r="11" fill={r.tone} fillOpacity="0.9" />
            <text x="60" y={y + 23} fill="#fff" fontSize="11" fontWeight="600" textAnchor="middle">
              {r.initial}
            </text>
            <text x="80" y={y + 16} fill="#e6ebf7" fontSize="11.5" fontWeight="500">
              {r.name}
            </text>
            <text x="80" y={y + 29} fill="#7b86a1" fontSize="9.5">
              {r.meta}
            </text>
            <text x="348" y={y + 23} fill={r.hot ? '#b9a3ff' : '#98a2bc'} fontSize="10.5" fontWeight={r.hot ? 600 : 400} textAnchor="end">
              {r.when}
            </text>
            {r.hot && (
              <g transform={`translate(${284} ${y + 12}) scale(0.6)`} fill="none" stroke="#b9a3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </g>
            )}
          </g>
        )
      })}

      <rect x="40" y="196" width="320" height="26" rx="8" fill="none" stroke="#2a3659" strokeDasharray="4 4" />
      <text x="200" y="213" fill="#7b86a1" fontSize="10.5" textAnchor="middle">
        + Add subscription
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Cryptography detection: analysis pipeline                           */
/* ------------------------------------------------------------------ */

function CryptoVisual() {
  const stages = ['Firmware', 'Disassembly', 'Features', 'Classifier']
  const code = [
    ['0x4a10', 'ldr', 'r3, [r0, #4]'],
    ['0x4a14', 'eor', 'r3, r3, r2'],
    ['0x4a18', 'ror', 'r2, r2, #8'],
    ['0x4a1c', 'and', 'r1, r3, #0xff'],
    ['0x4a20', 'ldr', 'r1, [r4, r1]'],
    ['0x4a24', 'eor', 'r2, r2, r1'],
    ['0x4a28', 'subs', 'r5, r5, #1'],
    ['0x4a2c', 'bne', '0x4a10'],
  ]
  return (
    <svg viewBox="0 0 400 250" className="absolute inset-0 size-full font-sans" aria-hidden="true">
      {stages.map((s, i) => {
        const x = 12 + i * 100
        return (
          <g key={s}>
            <rect x={x} y="16" width="76" height="30" rx="7" fill="#111a2e" stroke={i === 3 ? '#7c4dff' : '#222d4c'} />
            <text x={x + 38} y="35" fill="#e6ebf7" fontSize="9.5" fontWeight="500" textAnchor="middle">
              {s}
            </text>
            {i < 3 && <path d={`M${x + 80} 31h16m-4-3.5l4 3.5-4 3.5`} fill="none" stroke="#4a577d" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        )
      })}

      <rect x="12" y="60" width="226" height="172" rx="10" fill="#0d1424" stroke="#222d4c" />
      <text x="24" y="78" fill="#7b86a1" fontSize="9">
        disassembly
      </text>
      <rect x="18" y="100" width="214" height="46" rx="4" fill="#7c4dff" fillOpacity="0.17" />
      <rect x="18" y="100" width="2" height="46" fill="#7c4dff" />
      <text x="226" y="94" fill="#b9a3ff" fontSize="8.5" textAnchor="end">
        repeated opcode pattern
      </text>
      {code.map(([addr, op, args], i) => (
        <text key={addr} x="26" y={96 + i * 15 + 8} fontSize="9.5" fontFamily="var(--font-mono)">
          <tspan fill="#5d6a8f">{addr}</tspan>
          <tspan fill="#b9a3ff" dx="8">{op}</tspan>
          <tspan fill="#c9d2ea" dx="6">{args}</tspan>
        </text>
      ))}

      <rect x="250" y="60" width="138" height="172" rx="10" fill="#0d1424" stroke="#222d4c" />
      <text x="262" y="78" fill="#7b86a1" fontSize="9">
        classification
      </text>
      <rect x="262" y="90" width="114" height="46" rx="8" fill="#111a2e" stroke="#1c2640" />
      <circle cx="274" cy="106" r="3.5" fill="#34d399" />
      <text x="283" y="109" fill="#e6ebf7" fontSize="9.5" fontWeight="500">Known configuration</text>
      <text x="274" y="124" fill="#7b86a1" fontSize="8.5">matches a trained class</text>
      <rect x="262" y="146" width="114" height="46" rx="8" fill="#111a2e" stroke="#7c4dff" strokeOpacity="0.6" />
      <circle cx="274" cy="162" r="3.5" fill="#b9a3ff" />
      <text x="283" y="165" fill="#e6ebf7" fontSize="9.5" fontWeight="500">Unfamiliar pattern</text>
      <text x="274" y="180" fill="#7b86a1" fontSize="8.5">flagged for review</text>
      <text x="262" y="218" fill="#7b86a1" fontSize="8.5">16 configurations in scope</text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Wrapper                                                             */
/* ------------------------------------------------------------------ */

interface ProjectVisualProps {
  kind: ProjectVisualKey
  /** Enables the draggable before/after slider (used in the detail dialog). */
  interactive?: boolean
  /** Tailwind aspect-ratio class; the detail dialog uses a shorter crop. */
  aspect?: string
  className?: string
}

export default function ProjectVisual({
  kind,
  interactive = false,
  aspect = 'aspect-[8/5]',
  className = '',
}: ProjectVisualProps) {
  const label: Record<ProjectVisualKey, string> = {
    room: 'Illustration of a room before and after an AI redesign',
    subscription: 'Illustration of a subscription dashboard listing upcoming renewals',
    crypto: 'Illustration of a firmware analysis pipeline with disassembly and classification results',
  }
  return (
    <div
      role={interactive ? undefined : 'img'}
      aria-label={interactive ? undefined : label[kind]}
      className={`relative ${aspect} w-full overflow-hidden bg-gradient-to-br from-surface-2 to-bg ${className}`}
    >
      {kind === 'room' && <RoomVisual interactive={interactive} />}
      {kind === 'subscription' && <SubscriptionVisual />}
      {kind === 'crypto' && <CryptoVisual />}
    </div>
  )
}
