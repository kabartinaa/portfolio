import {
  Bug,
  Brain,
  Code2,
  Database,
  KeyRound,
  Layers,
  Plug,
  Rocket,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  siCplusplus,
  siCss,
  siCursor,
  siEclipseide,
  siExpress,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siIntellijidea,
  siJavascript,
  siJsonwebtokens,
  siKalilinux,
  siMongodb,
  siMysql,
  siN8n,
  siNodedotjs,
  siOpenjdk,
  siPostman,
  siPython,
  siReact,
  siVmware,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

const brandIcons: Record<string, SimpleIcon> = {
  java: siOpenjdk,
  python: siPython,
  cpp: siCplusplus,
  javascript: siJavascript,
  html5: siHtml5,
  css: siCss,
  react: siReact,
  nodejs: siNodedotjs,
  express: siExpress,
  flask: siFlask,
  mongodb: siMongodb,
  mysql: siMysql,
  jwt: siJsonwebtokens,
  git: siGit,
  github: siGithub,
  postman: siPostman,
  intellij: siIntellijidea,
  eclipse: siEclipseide,
  vmware: siVmware,
  kali: siKalilinux,
  n8n: siN8n,
  cursor: siCursor,
}

const genericIcons: Record<string, LucideIcon> = {
  sql: Database,
  mern: Layers,
  fullstack: Layers,
  api: Plug,
  debug: Bug,
  deploy: Rocket,
  ml: Brain,
  reverse: ScanSearch,
  crypto: KeyRound,
  security: ShieldCheck,
  vscode: Code2,
}

interface TechIconProps {
  name?: string
  className?: string
}

/** Brand glyphs come from simple-icons; concepts and unavailable brands use Lucide. */
export default function TechIcon({ name, className = 'size-4' }: TechIconProps) {
  const brand = name ? brandIcons[name] : undefined
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <path d={brand.path} />
      </svg>
    )
  }
  const Generic = (name && genericIcons[name]) || Code2
  return <Generic className={className} aria-hidden="true" strokeWidth={1.75} />
}
