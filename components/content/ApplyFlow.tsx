'use client'

/**
 * ApplyFlow — the /content conversion flow.
 *
 *   form  →  intro  →  quiz (3 quick questions)  →  booking (Calendly)
 *
 * The lead is CAPTURED on form submit (notify + email + Hermes fire immediately),
 * so we never lose them even if they bail before the quiz. The quiz is optional
 * ("lock it in"); finishing it sends an enrichment update and reveals the
 * booking page with their name + email pre-filled.
 */

import { useState } from 'react'
import LeadForm, { type CapturedLead } from '@/components/content/LeadForm'
import CalendlyEmbed from '@/components/content/CalendlyEmbed'

type Phase = 'form' | 'intro' | 'quiz' | 'booking'

const QUESTIONS = [
  {
    id: 'stage',
    q: 'What stage is your brand?',
    options: ['Just getting started', 'Got some traction', 'Established & scaling'],
  },
  {
    id: 'star',
    q: 'Who’s the star of the reels?',
    options: ['Me, the founder', 'The product', 'A mix of both'],
  },
  {
    id: 'timing',
    q: 'When do you want to start?',
    options: ['This week', 'Within a month', 'Just exploring'],
  },
] as const

const btnPrimary =
  'group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 ease-out hover:translate-y-[-1px]'
const btnGhost =
  'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md border border-white/[0.14] text-[14px] font-medium text-white/80 hover:text-white hover:border-white/[0.28] transition-all duration-150'

export default function ApplyFlow() {
  const [phase, setPhase] = useState<Phase>('form')
  const [lead, setLead] = useState<CapturedLead | null>(null)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  function onCaptured(l: CapturedLead) {
    setLead(l)
    setPhase('intro')
  }

  function pick(qid: string, opt: string) {
    const next = { ...answers, [qid]: opt }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      void sendQualified(next)
      setPhase('booking')
    }
  }

  /** Best-effort enrichment: send the quiz answers so the operator sees the qual. */
  async function sendQualified(finalAnswers: Record<string, string>) {
    if (!lead) return
    const summary = QUESTIONS.map((q) => `${q.q} → ${finalAnswers[q.id] || '—'}`).join('  |  ')
    try {
      await fetch('/api/content-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          brand: lead.brand,
          message: `[QUALIFIED] ${summary}${lead.message ? `  ||  note: ${lead.message}` : ''}`,
          source: 'content_studio_qualified',
          attribution: { answers: finalAnswers },
        }),
      })
    } catch {
      /* booking still shows even if this send fails */
    }
  }

  const firstName = lead?.name ? lead.name.split(/\s+/)[0] : ''

  if (phase === 'form') {
    return <LeadForm onCaptured={onCaptured} />
  }

  if (phase === 'intro') {
    return (
      <div className="rounded-2xl border border-zilla-neon/30 bg-white/[0.02] p-8 sm:p-10 text-center">
        <div className="text-zilla-neon text-[28px] leading-none" aria-hidden>
          ✓
        </div>
        <h3 className="mt-4 font-display text-[24px] font-medium text-white/95">
          You’re in{firstName ? `, ${firstName}` : ''}.
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-white/65 max-w-md mx-auto">
          Your spot is saved and we’ve got your details. Want to lock it in now? Three quick
          questions, then pick a time that works.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={() => setPhase('quiz')} className={btnPrimary}>
            Lock in my sprint
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
          </button>
          <button type="button" onClick={() => setPhase('booking')} className={btnGhost}>
            Skip to booking
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'quiz') {
    const q = QUESTIONS[step]
    return (
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-7" aria-hidden>
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                i <= step ? 'bg-zilla-neon' : 'bg-white/[0.1]'
              }`}
            />
          ))}
        </div>
        <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-white/40">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        <h3 className="mt-3 font-display text-[26px] sm:text-[30px] font-medium tracking-[-0.01em] text-white/95">
          {q.q}
        </h3>
        <div className="mt-7 space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => pick(q.id, opt)}
              className="group w-full text-left flex items-center justify-between gap-4 min-h-14 py-3.5 px-5 rounded-md border border-white/[0.12] text-[15px] text-white/85 hover:border-zilla-neon/50 hover:bg-white/[0.03] transition-all duration-150"
            >
              {opt}
              <span className="text-zilla-neon opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // booking
  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-zilla-neon text-[24px] leading-none" aria-hidden>
          ✓
        </div>
        <h3 className="mt-3 font-display text-[26px] sm:text-[30px] font-medium tracking-[-0.01em] text-white/95">
          Last step{firstName ? `, ${firstName}` : ''} — pick your time.
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-white/60 max-w-md mx-auto">
          Grab a slot and we’ll lock your brief on the call. Your details are already saved, so this
          is quick.
        </p>
      </div>
      <CalendlyEmbed prefill={lead ? { name: lead.name, email: lead.email } : undefined} />
    </div>
  )
}
