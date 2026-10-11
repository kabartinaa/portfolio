import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AlertCircle, Check, Copy, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { contact, profile } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { GithubIcon, LinkedinIcon } from './SocialIcons'

type FormValues = { name: string; email: string; subject: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>
type Status = 'idle' | 'submitting' | 'success' | 'mailto' | 'error'

const empty: FormValues = { name: '', email: '', subject: '', message: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** When set (see README), messages are POSTed here. Otherwise the form falls back to mailto. */
const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim()

function validate(v: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!v.name.trim()) errors.name = 'Enter your name.'
  if (!v.email.trim()) errors.email = 'Enter your email address.'
  else if (!emailPattern.test(v.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.'
  if (!v.subject.trim()) errors.subject = 'Enter a subject.'
  if (!v.message.trim()) errors.message = 'Enter a message.'
  return errors
}

interface FieldProps {
  id: keyof FormValues
  label: string
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  multiline?: boolean
  autoComplete?: string
}

function Field({ id, label, value, error, onChange, type = 'text', multiline, autoComplete }: FieldProps) {
  const errorId = `${id}-error`
  const common = {
    id,
    name: id,
    value,
    onChange,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'aria-required': true,
    className: `w-full rounded-xl border bg-bg/70 px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-colors focus:border-blue-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft/50 ${
      error ? 'border-red-400/70' : 'border-line-strong'
    }`,
  }
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea {...common} rows={5} className={`${common.className} resize-y`} />
      ) : (
        <input {...common} type={type} />
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-red-300">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(empty)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)
  const mailtoHref = useRef('')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name as keyof FormValues]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (status !== 'idle' && status !== 'submitting') setStatus('idle')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      // Clipboard API can be blocked (insecure context); fall back to a temporary textarea.
      const ta = document.createElement('textarea')
      ta.value = profile.email
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field so keyboard and screen-reader users land on it.
      const first = Object.keys(found)[0]
      document.getElementById(first)?.focus()
      return
    }

    const honeypot = (e.currentTarget.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value
    if (honeypot) return // bots fill hidden fields; pretend nothing happened

    if (endpoint) {
      setStatus('submitting')
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error(`Request failed with ${res.status}`)
        setStatus('success')
        setValues(empty)
      } catch {
        setStatus('error')
      }
      return
    }

    const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
    mailtoHref.current = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
    setStatus('mailto')
    window.location.href = mailtoHref.current
  }

  const submitting = status === 'submitting'

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading id="contact-title" title={contact.heading}>
        {contact.text}
      </SectionHeading>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <Reveal>
          <ul className="space-y-3">
            <li className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-blue-soft">
                  <Mail className="size-5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-faint">Email</p>
                  <a href={`mailto:${profile.email}`} className="block truncate text-[15px] text-ink hover:text-blue-soft">
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm text-ink transition hover:border-blue-soft"
                >
                  {copied ? <Check className="size-4 text-emerald-400" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy'}
                  <span className="sr-only"> email address</span>
                </button>
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {copied ? 'Email address copied to clipboard.' : ''}
              </p>
            </li>

            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-blue-soft">
                  <LinkedinIcon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-faint">LinkedIn</span>
                  <span className="block truncate text-[15px] text-ink">linkedin.com/in/kabartinaa</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>

            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition hover:border-line-strong"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-blue-soft">
                  <GithubIcon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-faint">GitHub</span>
                  <span className="block truncate text-[15px] text-ink">github.com/kabartinaa</span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>

            <li className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-blue-soft">
                <MapPin className="size-5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-xs text-faint">Location</span>
                <span className="block text-[15px] text-ink">{profile.location}</span>
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact form"
            className="space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" value={values.name} error={errors.name} onChange={onChange} autoComplete="name" />
              <Field id="email" label="Email" type="email" value={values.email} error={errors.email} onChange={onChange} autoComplete="email" />
            </div>
            <Field id="subject" label="Subject" value={values.subject} error={errors.subject} onChange={onChange} />
            <Field id="message" label="Message" value={values.message} error={errors.message} onChange={onChange} multiline />

            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label>
                Leave this field empty
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="bg-brand inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {submitting ? 'Sending…' : 'Send Message'}
              </button>

              <div aria-live="polite" className="min-w-0 flex-1 text-sm">
                {status === 'success' && (
                  <p className="flex items-start gap-2 text-emerald-300">
                    <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    Message sent. Thank you for reaching out.
                  </p>
                )}
                {status === 'mailto' && (
                  <p className="text-muted">
                    Your email app should now open with this message ready to send. Nothing has been sent yet.{' '}
                    <a href={mailtoHref.current} className="text-blue-soft underline underline-offset-4">
                      Open it again
                    </a>
                    , or copy my email address and write to me directly.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="flex items-start gap-2 text-red-300">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span>
                      The message didn't send. Check your connection and try again, or email me at{' '}
                      <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                        {profile.email}
                      </a>
                      .
                    </span>
                  </p>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
