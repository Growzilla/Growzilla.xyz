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

export default function Close() {
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
      <div className="w-full text-center">
        <h3 className="font-display font-medium text-[28px] sm:text-[36px] leading-[1.1] tracking-[-0.02em] text-white/95">
          Partner with us
        </h3>
        <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.6] text-white/50 max-w-xl mx-auto">
          Tell us about the startup. We review every partnership inquiry within 24 hours.
        </p>
        <p className="mt-6 inline-flex items-center gap-2 rounded-md border border-zilla-neon/20 bg-zilla-neon/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/65">
          <span className="text-zilla-neon/80">{planLabel}</span>
        </p>
      </div>

      <div className="mt-12 sm:mt-16 w-full max-w-3xl mx-auto">
        <LeadForm
          key={plan}
          source="content_factory"
          defaultPlan={plan}
          heading=""
          subheading=""
          storeLabel="Company / startup"
          storeRequired
          hideEyebrow
          wide
          submitLabel="Request partnership"
        />
      </div>
    </SectionRule>
  )
}