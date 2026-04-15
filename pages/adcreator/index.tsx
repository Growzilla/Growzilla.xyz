import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChatQuiz, type ChatQuizAnswer, type QuizQuestion } from '@/components/adcreator'

/**
 * /adcreator — public lead-magnet funnel landing page.
 *
 * Hero (Zilla glow) → 6-question chat quiz → POST /api/adcreator/start → /run/{jobId}.
 * Honeypot (`hp_company`) blocks the dumb half of bot traffic; real bots will
 * be filtered downstream by IP rate-limit on the backend.
 */

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'domain',
    prompt: 'What is your store domain?',
    placeholder: 'glow-nordic.com',
    type: 'url',
  },
  {
    id: 'product',
    prompt: 'What do you sell?',
    placeholder: 'Vitamin C serum for Nordic skin (max 80 chars)',
    type: 'text',
  },
  {
    id: 'market',
    prompt: 'Primary market?',
    options: ['SE', 'US', 'UK', 'DE', 'FR', 'Other'],
  },
  {
    id: 'spend',
    prompt: 'Monthly ad spend?',
    options: ['<$500', '$500–2k', '$2k–10k', '$10k+'],
  },
  {
    id: 'bottleneck',
    prompt: 'Biggest bottleneck?',
    options: ['Hooks', 'Creative', 'Scaling', 'Attribution'],
  },
  {
    id: 'email',
    prompt: 'Where should we send your report?',
    placeholder: 'founder@your-store.com',
    type: 'email',
  },
]

export default function AdcreatorLandingPage() {
  const router = useRouter()
  const [stage, setStage] = useState<'hero' | 'quiz'>('hero')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  // Honeypot — real users won't see or fill this.
  const [hpCompany, setHpCompany] = useState('')

  // Session id for funnel analytics — generated once per page load, persisted in
  // sessionStorage so step-level drop-off can be correlated. Fire-and-forget.
  const quizSessionId = useMemo(() => {
    if (typeof window === 'undefined') return ''
    try {
      const existing = window.sessionStorage.getItem('adcreator_quiz_session_id')
      if (existing) return existing
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
      window.sessionStorage.setItem('adcreator_quiz_session_id', id)
      return id
    } catch {
      return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    }
  }, [])

  // Fire an `adcreator_quiz_step` event per question. Fail-silent.
  function fireStepEvent(stepIndex: number, stepName: string, value?: string) {
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'adcreator_quiz_step',
        step: stepIndex,
        step_name: stepName,
        session_id: quizSessionId,
        value_length: value ? value.length : 0,
        ts: Date.now(),
      }),
      keepalive: true,
    }).catch(() => {
      /* broken analytics must not block UX */
    })
  }

  // Fire quiz_started once when the user enters the quiz stage.
  useEffect(() => {
    if (stage !== 'quiz') return
    fireStepEvent(-1, 'quiz_started')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  function onQuizAnswer(answer: ChatQuizAnswer, stepIndex: number) {
    fireStepEvent(stepIndex, answer.questionId, answer.value)
  }

  async function startJob(answers: ChatQuizAnswer[]) {
    fireStepEvent(answers.length, 'submit')
    if (hpCompany.trim().length > 0) {
      // Looks like a bot. Bounce silently to the success state — no error info.
      router.replace('/adcreator/run/honeypot-bounced')
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    const payload = answers.reduce<Record<string, string>>((acc, a) => {
      acc[a.questionId] = a.value
      return acc
    }, {})

    try {
      const r = await fetch('/api/adcreator/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'adcreator-landing' }),
      })
      if (!r.ok) {
        const detail = await r.text().catch(() => '')
        throw new Error(`start failed (${r.status}) ${detail}`)
      }
      const data = (await r.json()) as { jobId?: string }
      if (!data.jobId) throw new Error('start: no jobId returned')
      router.push(`/adcreator/run/${encodeURIComponent(data.jobId)}`)
    } catch (err) {
      console.error('[adcreator] start failed', err)
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const ogTitle = 'Adcreator — Your competitors winning ads. Your first 5 briefs. 3 minutes.'
  const ogDescription = 'We scrape the Meta Ad Library live. Tag 20–40 proven creatives. Hand you 5 briefs you can run tomorrow. Free.'
  const ogUrl = 'https://growzilla.xyz/adcreator'
  const ogImage = 'https://growzilla.xyz/og/adcreator.png'

  return (
    <>
      <Head>
        <title>Adcreator — 5 ready-to-run ad briefs in 3 minutes | Growzilla</title>
        <meta name="description" content={ogDescription} />
        <link rel="canonical" href={ogUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content="https://growzilla.xyz/og/adcreator-twitter.png" />
        <script
          type="application/ld+json"
          // schema.org SoftwareApplication for free SEO snippet
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Adcreator',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              description: ogDescription,
              url: ogUrl,
            }),
          }}
        />
      </Head>

      <main
        className="min-h-screen relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0,255,148,0.08) 0%, transparent 60%), #050608',
          color: 'rgba(255,255,255,0.95)',
          fontFamily: 'Inter, "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        {/* Hero */}
        {stage === 'hero' && (
          <section className="max-w-[1100px] mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center max-w-3xl mx-auto"
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
                Free · No credit card
              </span>

              <h1
                className="text-[40px] sm:text-[56px] font-semibold leading-[1.05] tracking-tight"
                style={{ letterSpacing: '-0.025em' }}
              >
                Your competitors&apos; winning ads.
                <br />
                <span style={{ color: '#00FF94' }}>Your first 5 briefs.</span> 3 minutes.
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                We scrape the Meta Ad Library live. Tag 20–40 proven creatives. Hand you{' '}
                <strong style={{ color: 'rgba(255,255,255,0.92)' }}>5 ad briefs you can run tomorrow.</strong> Free.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
                <PulseCTA onClick={() => setStage('quiz')}>Start — takes 3 minutes</PulseCTA>
                <a
                  href="#how"
                  className="text-[13px] underline-offset-4 hover:underline"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  How it works ↓
                </a>
              </div>

              <div
                className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px]"
                style={{ color: 'rgba(255,255,255,0.40)' }}
              >
                <span>Used by</span>
                <span style={{ color: 'rgba(255,255,255,0.78)' }}>Scandinavian Poster</span>
                <span style={{ color: 'rgba(255,255,255,0.78)' }}>ScentAndCo</span>
                <span style={{ color: 'rgba(255,255,255,0.78)' }}>Nuvoo</span>
              </div>
            </motion.div>

            {/* Expectation strip */}
            <div
              id="how"
              className="mt-16 grid gap-3 sm:grid-cols-4 max-w-4xl mx-auto"
            >
              {[
                { k: '3 min', v: 'End-to-end' },
                { k: 'Live', v: 'Meta Ad Library scrape' },
                { k: 'PDF', v: 'Download ready' },
                { k: 'Private', v: 'Your data stays yours' },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-md p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="text-[20px] font-semibold tracking-tight" style={{ color: '#00FF94', letterSpacing: '-0.01em' }}>
                    {item.k}
                  </div>
                  <div className="mt-1 text-[12px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quiz */}
        {stage === 'quiz' && (
          <section className="max-w-[860px] mx-auto px-4 pt-10 pb-20">
            <div
              className="rounded-xl overflow-hidden flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.02)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                height: 'min(640px, calc(100vh - 120px))',
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <button
                  type="button"
                  onClick={() => setStage('hero')}
                  className="text-[12px] hover:underline underline-offset-2"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                  disabled={submitting}
                >
                  ← Back
                </button>
                <span className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.40)', letterSpacing: '0.16em' }}>
                  Adcreator intake
                </span>
                <span className="w-12" />
              </div>
              <ChatQuiz
                greeting="Hi — let's build your competitor ad report. 6 quick questions, takes about 1 minute."
                questions={QUESTIONS}
                onComplete={startJob}
                onAnswer={onQuizAnswer}
              />
            </div>

            {/* Honeypot — visually hidden, real users won't fill */}
            <input
              type="text"
              name="hp_company"
              tabIndex={-1}
              autoComplete="off"
              value={hpCompany}
              onChange={(e) => setHpCompany(e.target.value)}
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none"
              style={{ left: '-10000px', top: 'auto', width: 1, height: 1 }}
            />

            {submitting && (
              <p className="mt-4 text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Spinning up your report…
              </p>
            )}
            {submitError && (
              <div
                className="mt-4 rounded-md p-3 text-[13px]"
                style={{
                  background: 'rgba(244,114,114,0.08)',
                  color: '#F87171',
                  boxShadow: 'inset 0 0 0 1px rgba(244,114,114,0.25)',
                }}
              >
                {submitError}
              </div>
            )}
          </section>
        )}
      </main>
    </>
  )
}

function PulseCTA({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      animate={{
        boxShadow: [
          '0 0 0 1px rgba(0,255,148,0.4), 0 0 24px rgba(0,255,148,0.20), 0 8px 24px rgba(0,0,0,0.4)',
          '0 0 0 1px rgba(0,255,148,0.7), 0 0 36px rgba(0,255,148,0.36), 0 8px 24px rgba(0,0,0,0.4)',
          '0 0 0 1px rgba(0,255,148,0.4), 0 0 24px rgba(0,255,148,0.20), 0 8px 24px rgba(0,0,0,0.4)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="rounded-md px-6 py-3 text-[15px] font-semibold text-black"
      style={{ background: '#00FF94' }}
    >
      {children}
    </motion.button>
  )
}
