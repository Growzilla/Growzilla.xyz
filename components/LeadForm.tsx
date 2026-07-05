'use client'

import { useEffect, useState } from 'react'

/**
 * Generic lead form → POSTs to /api/lead-notify, which pings the operator on
 * WhatsApp (CallMeBot) + emails a backup (Resend).
 *
 * Reusable: drop <LeadForm /> anywhere. Pass `source` to tag where the lead
 * came from. Soft-fail — a network error shows a retry message, never a crash.
 */

type Props = {
  source?: string
  heading?: string
  subheading?: string
  defaultPlan?: string
  storeLabel?: string
  storeRequired?: boolean
  hideEyebrow?: boolean
  compact?: boolean
  wide?: boolean
  submitLabel?: string
}

const inputClass =
  'w-full h-12 px-4 rounded-md bg-white/[0.04] border border-white/[0.10] text-[14px] text-white placeholder-white/30 outline-none focus:border-zilla-neon/40 transition-colors'

function captureAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  for (const k of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'gclid',
  ]) {
    const v = p.get(k)
    if (v) out[k] = v
  }
  out.landing_path = window.location.pathname
  return out
}

export default function LeadForm({
  source = 'lead_form',
  heading = 'Tell us about your store',
  subheading = 'Drop your details and we’ll be in touch. Fast response.',
  defaultPlan,
  storeLabel = 'Store URL',
  storeRequired = false,
  hideEyebrow = false,
  compact = false,
  wide = false,
  submitLabel,
}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [store, setStore] = useState('')
  const [site, setSite] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [attribution, setAttribution] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAttribution(captureAttribution())
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || success) return
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/lead-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          store: store.trim(),
          message: message.trim(),
          website, // honeypot — must be empty
          source,
          attribution: {
            ...attribution,
            ...(defaultPlan ? { plan: defaultPlan } : {}),
            ...(site.trim() ? { website: site.trim() } : {}),
          },
        }),
      })
      if (!res.ok && res.status !== 202) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          body?.error === 'email_invalid'
            ? 'That email doesn’t look right.'
            : body?.error === 'name_required'
              ? 'Please add your name.'
              : 'Something went wrong. Try again.',
        )
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-lg border border-white/[0.08] bg-zilla-surface/80 p-8 text-center">
        <div className="inline-flex w-12 h-12 rounded-md bg-zilla-neon/10 border border-zilla-neon/30 items-center justify-center mb-5">
          <span className="text-zilla-neon text-[18px]" aria-hidden="true">
            ✓
          </span>
        </div>
        <h3 className="font-display font-semibold text-[22px] text-white/95 mb-3">
          Got it.
        </h3>
        <p className="text-[15px] leading-[1.6] text-white/65 max-w-sm mx-auto">
          Thanks, {name || 'there'}. We&apos;ve got your details and will review
          the partnership inquiry within 24 hours.
        </p>
      </div>
    )
  }

  const showHeader = !compact && !wide && (heading || subheading)
  const isTight = compact && !wide

  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-zilla-surface/80 ${
        wide ? 'p-8 sm:p-10' : isTight ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
    >
      {!hideEyebrow && !isTight && !wide && (
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-zilla-neon/80 mb-4">
          Get in touch
        </div>
      )}
      {showHeader && heading && (
        <h2 className="font-display font-semibold text-[26px] sm:text-[30px] leading-[1.1] tracking-[-0.02em] text-white/95">
          {heading}
        </h2>
      )}
      {showHeader && subheading && (
        <p className="mt-3 text-[15px] leading-[1.6] text-white/60">{subheading}</p>
      )}

      <form
        onSubmit={onSubmit}
        noValidate
        className={[
          showHeader ? 'mt-7' : 'mt-0',
          wide ? 'grid sm:grid-cols-2 gap-x-6' : '',
        ].join(' ')}
      >
        {/* Honeypot — visually hidden */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-10000px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor="lf-website">Website</label>
          <input
            id="lf-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <Field label="Your name" htmlFor="lf-name" className={wide ? 'sm:col-span-1' : undefined}>
          <input
            id="lf-name"
            type="text"
            required
            placeholder="Jane"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field label="Your email" htmlFor="lf-email" className={wide ? 'sm:col-span-1' : undefined}>
          <input
            id="lf-email"
            type="email"
            required
            placeholder="jane@yourstore.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </Field>

        {!isTight && (
          <Field label="Phone / WhatsApp" htmlFor="lf-phone" helper="Optional">
            <input
              id="lf-phone"
              type="tel"
              placeholder="+46 70 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </Field>
        )}

        <Field
          label={storeLabel}
          htmlFor="lf-store"
          helper={storeRequired ? undefined : 'Optional'}
          className={wide ? 'sm:col-span-1' : undefined}
        >
          <input
            id="lf-store"
            type="text"
            required={storeRequired}
            placeholder={storeRequired ? 'Acme AI' : 'yourstore.com'}
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className={inputClass}
          />
        </Field>

        {storeRequired && (
          <Field
            label="Website"
            htmlFor="lf-site"
            helper="Optional"
            className={wide ? 'sm:col-span-1' : undefined}
          >
            <input
              id="lf-site"
              type="text"
              placeholder="acme.ai"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className={inputClass}
            />
          </Field>
        )}

        <Field
          label={isTight ? 'About your startup' : 'Anything we should know?'}
          htmlFor="lf-message"
          helper="Optional"
          className={wide ? 'sm:col-span-2' : undefined}
        >
          <textarea
            id="lf-message"
            rows={wide ? 4 : isTight ? 2 : 3}
            placeholder={isTight ? 'One line is enough…' : 'A line or two about what you need…'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} h-auto py-3 resize-y`}
          />
        </Field>

        {error && (
          <p
            role="alert"
            className={`mt-4 text-[13px] text-red-400/90 font-medium ${wide ? 'sm:col-span-2' : ''}`}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`landing-btn-primary group mt-7 w-full h-12 sm:h-14 rounded-lg text-[15px] sm:text-[16px] tracking-[0.01em] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:filter-none flex items-center justify-center gap-2 ${
            wide ? 'sm:col-span-2' : ''
          }`}
        >
          {submitting ? (
            'Sending…'
          ) : (
            <>
              {submitLabel ?? (isTight ? 'Apply' : 'Send')}
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                →
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  helper,
  className,
  children,
}: {
  label: string
  htmlFor: string
  helper?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`mt-5 first:mt-0 ${className ?? ''}`}>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 mb-2"
      >
        {label}
        {helper && <span className="ml-2 text-white/30 normal-case">· {helper}</span>}
      </label>
      {children}
    </div>
  )
}
