'use client'

/**
 * Content Studio lead form. Primary capture on /content.
 * POSTs to /api/content-lead, which alerts the operator (WhatsApp + email)
 * and best-effort drops the lead into Hermes's CRM.
 *
 * Three real fields (name, email, brand) to keep friction low + one optional
 * note. Honeypot field `nickname` is visually hidden.
 */

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export type CapturedLead = { name: string; email: string; brand: string; message: string }

type LeadFormProps = {
  /** When provided, the form hands the captured lead up instead of showing its
   *  own success panel — used to drive the qualify → booking flow. */
  onCaptured?: (lead: CapturedLead) => void
}

const SOURCE = 'content_studio'

export default function LeadForm({ onCaptured }: LeadFormProps = {}) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      brand: String(data.get('brand') || ''),
      message: String(data.get('message') || ''),
      nickname: String(data.get('nickname') || ''), // honeypot
      source: SOURCE,
      attribution:
        typeof window !== 'undefined'
          ? { path: window.location.pathname + window.location.search, ref: document.referrer }
          : {},
    }

    try {
      const res = await fetch('/api/content-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'request_failed')
      }
      if (onCaptured) {
        onCaptured({
          name: payload.name,
          email: payload.email,
          brand: payload.brand,
          message: payload.message,
        })
        form.reset()
        return
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error && err.message === 'email_invalid'
          ? 'That email doesn’t look right. Mind checking it?'
          : 'Something went wrong. Email albert@growzilla.xyz and we’ll sort it.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-zilla-neon/30 bg-white/[0.02] p-8 sm:p-10 text-center">
        <div className="text-zilla-neon text-[28px] leading-none" aria-hidden>
          ✓
        </div>
        <h3 className="mt-4 font-display text-[24px] font-medium text-white/95">You’re in.</h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-white/65 max-w-md mx-auto">
          Got it. We’ll be in touch within a day to lock your brief and get the first reel moving.
          Want to skip the wait? Grab a time below.
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full h-12 rounded-md bg-white/[0.03] border border-white/[0.1] px-4 text-[15px] text-white/95 placeholder:text-white/35 outline-none focus:border-zilla-neon/50 focus:bg-white/[0.04] transition-colors duration-150'

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* honeypot — visually hidden, off-screen, not tabbable */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label>
          Nickname
          <input type="text" name="nickname" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-[12px] font-mono uppercase tracking-[0.12em] text-white/45 mb-2">
            Your name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Jane Founder" className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-[12px] font-mono uppercase tracking-[0.12em] text-white/45 mb-2">
            Email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="jane@brand.com" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-brand" className="block text-[12px] font-mono uppercase tracking-[0.12em] text-white/45 mb-2">
          Brand or website
        </label>
        <input id="cf-brand" name="brand" type="text" required placeholder="yourbrand.com" className={inputCls} />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-[12px] font-mono uppercase tracking-[0.12em] text-white/45 mb-2">
          What do you want to show off? <span className="text-white/25">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={3}
          placeholder="The product, the founder story, a launch — whatever you want eyes on."
          className="w-full rounded-md bg-white/[0.03] border border-white/[0.1] px-4 py-3 text-[15px] text-white/95 placeholder:text-white/35 outline-none focus:border-zilla-neon/50 focus:bg-white/[0.04] transition-colors duration-150 resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-[14px] text-[#FF6B81]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group w-full inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 ease-out hover:translate-y-[-1px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {status === 'submitting' ? 'Sending…' : 'Claim your sprint · $250'}
        {status !== 'submitting' && (
          <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
        )}
      </button>

      <p className="text-center text-[12px] text-white/40">
        No spam. We reply within a day. 14 reels in 14 days, or you don’t pay.
      </p>
    </form>
  )
}
