'use client'

import { useEffect, useState } from 'react'
import LeadForm from '@/components/LeadForm'
import SectionRule from '../ui/SectionRule'

const PLAN_LABELS: Record<string, string> = {
  sprint: 'Ignition Sprint · $1,000',
  pilot: '3-Month Pilot · $1,500/mo',
  retainer: 'Growth Retainer · $2,000/mo',
}

function planFromHash(): string {
  if (typeof window === 'undefined') return 'pilot'
  const hash = window.location.hash
  const q = hash.includes('?') ? hash.split('?')[1] : ''
  const params = new URLSearchParams(q)
  return params.get('plan') || 'pilot'
}

export default function Apply() {
  const [plan, setPlan] = useState('pilot')

  useEffect(() => {
    setPlan(planFromHash())
    const onHash = () => setPlan(planFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const planLabel = PLAN_LABELS[plan] || PLAN_LABELS.pilot

  return (
    <SectionRule id="apply" className="bg-[#0A0A0A]">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display font-medium text-[32px] sm:text-[36px] leading-[1.08] tracking-[-0.02em] text-white/95">
          Partner with us
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-white/50">
          Tell us about the startup. We review every partnership inquiry within 24 hours.
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-zilla-neon/20 bg-zilla-neon/[0.04] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/65">
          <span className="text-zilla-neon/80">{planLabel}</span>
        </p>
      </div>

      <div className="mt-10 max-w-md mx-auto">
        <LeadForm
          key={plan}
          source="content_factory"
          defaultPlan={plan}
          heading=""
          subheading=""
          storeLabel="Company / startup"
          storeRequired
          hideEyebrow
          compact
          submitLabel="Request partnership"
        />
      </div>
    </SectionRule>
  )
}