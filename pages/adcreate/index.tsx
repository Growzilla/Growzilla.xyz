import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * /adcreate — waitlist stub for the production tier (turn briefs into creatives).
 * Single email field → POST /api/leads with source=adcreate.
 * Reuses the existing leads endpoint so we don't add a new pipe just for this.
 */

type SubmitState = { kind: 'idle' } | { kind: 'submitting' } | { kind: 'ok' } | { kind: 'error'; message: string }

export default function AdcreateWaitlistPage() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>({ kind: 'idle' })

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setState({ kind: 'submitting' })
    try {
      // /api/leads validates a .myshopify.com store_url, so pass a placeholder
      // that satisfies the validator. The lead source distinguishes intent.
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          store_url: 'waitlist.myshopify.com',
          source: 'adcreate',
        }),
      })
      if (!res.ok) {
        const detail = await res.text().catch(() => '')
        throw new Error(`Submission failed (${res.status}) ${detail}`)
      }
      setState({ kind: 'ok' })
      setEmail('')
    } catch (err) {
      setState({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <>
      <Head>
        <title>Adcreate · Coming soon | Growzilla</title>
        <meta name="description" content="Production tier — turn your Adcreator briefs into ready-to-ship creatives. Join the waitlist." />
        <meta property="og:title" content="Adcreate — Production tier coming soon" />
        <meta property="og:description" content="Turn ad briefs into ready-to-ship creatives. Join the waitlist." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz/adcreate" />
      </Head>

      <main
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0,255,148,0.06) 0%, transparent 60%), #050608',
          color: 'rgba(255,255,255,0.95)',
          fontFamily: 'Inter, "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md text-center"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(0,255,148,0.06)',
              color: 'rgba(0,255,148,0.85)',
              boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.20)',
              letterSpacing: '0.16em',
            }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#00FF94' }} />
            Coming soon
          </span>

          <h1 className="text-[32px] font-semibold tracking-tight leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Briefs in. <span style={{ color: '#00FF94' }}>Creatives out.</span>
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
            We&apos;ll script, shoot, and ship the assets. Reels, Stories, and statics — ready for Meta Ads Manager.
            Join the waitlist for early access.
          </p>

          {state.kind === 'ok' ? (
            <div
              className="mt-8 rounded-lg p-5 text-center"
              style={{
                background: 'rgba(0,255,148,0.06)',
                boxShadow: 'inset 0 0 0 1px rgba(0,255,148,0.25)',
              }}
            >
              <div className="text-[14px] font-semibold" style={{ color: '#00FF94' }}>
                You&apos;re on the list.
              </div>
              <p className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                We&apos;ll email you the moment Adcreate opens.
              </p>
              <Link
                href="/adcreator"
                className="mt-4 inline-block text-[12px] font-semibold underline-offset-2 hover:underline"
                style={{ color: 'rgba(0,255,148,0.85)' }}
              >
                Run another ad report →
              </Link>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mt-8 flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@your-store.com"
                className="flex-1 rounded-md px-3 py-2.5 text-[14px] bg-transparent outline-none"
                style={{
                  color: 'rgba(255,255,255,0.95)',
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
                }}
              />
              <button
                type="submit"
                disabled={state.kind === 'submitting'}
                className="rounded-md px-5 py-2.5 text-[13px] font-semibold text-black disabled:opacity-50"
                style={{ background: '#00FF94' }}
              >
                {state.kind === 'submitting' ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>
          )}

          {state.kind === 'error' && (
            <div
              className="mt-3 rounded-md p-3 text-[12px] text-left"
              style={{
                background: 'rgba(244,114,114,0.08)',
                color: '#F87171',
                boxShadow: 'inset 0 0 0 1px rgba(244,114,114,0.25)',
              }}
            >
              {state.message}
            </div>
          )}

          <Link
            href="/adcreator"
            className="block mt-8 text-[12px]"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            ← Back to Adcreator
          </Link>
        </motion.section>
      </main>
    </>
  )
}
