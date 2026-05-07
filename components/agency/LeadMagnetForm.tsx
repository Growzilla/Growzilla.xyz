'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

/**
 * Primary conversion goal on the page.
 * Four-field form. No `.myshopify.com` field. Honeypot only.
 * POSTs to /api/agency-lead — capture is the priority.
 *
 * Spec: AGENCY_LANDING_V3.md §6.
 */

const REVENUE_BANDS = ['< £15k', '£15–60k', '£60–150k', '£150k+'] as const
type RevenueBand = (typeof REVENUE_BANDS)[number]

const BULLETS = [
  'Every active ad from your top 3 competitors',
  'Hooks ranked by spend',
  'Five ad scripts you can hand to your editor tonight',
  'Delivered as PDF — emailed in under 4 minutes',
]

export default function LeadMagnetForm() {
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [band, setBand] = useState<RevenueBand>('£15–60k')
  const [website, setWebsite] = useState('') // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting || success) return
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch('/api/agency-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domain.trim(),
          name: name.trim(),
          email: email.trim(),
          revenueBand: band,
          website, // honeypot — must be empty
          source: 'agency_lead_magnet',
        }),
      })
      if (!res.ok && res.status !== 202) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Something went wrong. Try again.')
      }
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="leadmagnet"
      className="relative w-full bg-zilla-black py-24 sm:py-28 lg:py-32 border-t border-b border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left — pitch */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-zilla-neon/80 mb-6">
              Free · No signup wall
            </div>
            <h2 className="font-display font-semibold text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.025em] text-white/95 max-w-[18ch]">
              See every ad your top 3 competitors ran in the last{' '}
              <span className="text-zilla-neon">30 days.</span>
            </h2>
            <p className="mt-7 text-[16px] sm:text-[17px] leading-[1.6] text-white/60 max-w-xl">
              Drop your domain. Answer four questions. Walk away with a 5-page
              PDF: top hooks, top angles, top creators — plus your first five
              Meta ads, scripted from their winning angles.
            </p>
            <ul className="mt-8 space-y-3">
              {BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[15px] text-white/85"
                >
                  <span
                    aria-hidden="true"
                    className="text-zilla-neon mt-0.5 text-[14px] leading-none"
                  >
                    ◆
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-lg border border-white/[0.08] bg-zilla-surface/80 p-6 sm:p-8">
              {success ? (
                <SuccessCard domain={domain} />
              ) : (
                <form onSubmit={onSubmit} noValidate>
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
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <Field
                    label="Your store URL"
                    htmlFor="ld-domain"
                    helper="e.g. yourstore.com"
                  >
                    <input
                      id="ld-domain"
                      type="text"
                      required
                      placeholder="yourstore.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Your name" htmlFor="ld-name">
                    <input
                      id="ld-name"
                      type="text"
                      required
                      placeholder="Jane"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Your email" htmlFor="ld-email">
                    <input
                      id="ld-email"
                      type="email"
                      required
                      placeholder="jane@yourstore.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Monthly revenue" htmlFor="ld-band">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {REVENUE_BANDS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBand(b)}
                          aria-pressed={band === b}
                          className={`h-11 rounded-md text-[13px] font-medium transition-colors ${
                            band === b
                              ? 'bg-zilla-neon/15 text-zilla-neon border border-zilla-neon/40'
                              : 'bg-white/[0.03] text-white/65 border border-white/[0.08] hover:border-white/[0.18]'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {error && (
                    <p
                      role="alert"
                      className="mt-4 text-[13px] text-red-400/90 font-medium"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-7 w-full h-12 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      'Sending…'
                    ) : (
                      <>
                        Generate my report
                        <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                          →
                        </span>
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                    ~4 min · No signup wall · Yours to keep
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const inputClass =
  'w-full h-12 px-4 rounded-md bg-white/[0.04] border border-white/[0.10] text-[14px] text-white placeholder-white/30 outline-none focus:border-zilla-neon/40 transition-colors'

function Field({
  label,
  htmlFor,
  helper,
  children,
}: {
  label: string
  htmlFor: string
  helper?: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-5 first:mt-0">
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 mb-2"
      >
        {label}
      </label>
      {children}
      {helper && (
        <p className="mt-1.5 text-[11px] text-white/35 font-mono">{helper}</p>
      )}
    </div>
  )
}

function SuccessCard({ domain }: { domain: string }) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex w-12 h-12 rounded-md bg-zilla-neon/10 border border-zilla-neon/30 items-center justify-center mb-5">
        <span className="text-zilla-neon text-[18px]" aria-hidden="true">
          ✓
        </span>
      </div>
      <h3 className="font-display font-semibold text-[22px] text-white/95 mb-3">
        Got it.
      </h3>
      <p className="text-[15px] leading-[1.6] text-white/65 max-w-sm mx-auto">
        We&rsquo;re pulling competitor ads on{' '}
        <span className="text-white/90 font-medium">
          {domain || 'your store'}
        </span>{' '}
        now. The PDF lands in your inbox within 4 minutes.
      </p>
      <a
        href="https://calendly.com/albert-growzilla/growzilla-install"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 mt-7 font-mono text-[12px] uppercase tracking-[0.16em] text-white/85 hover:text-zilla-neon transition-colors"
      >
        Want a free 30-min teardown too? Book the call
        <span className="text-zilla-neon transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  )
}
