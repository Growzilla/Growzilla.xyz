'use client'

import { useEffect } from 'react'
import SectionRule from '../ui/SectionRule'

const CASES = [
  {
    id: 'longsword',
    company: 'Longsword Digital',
    summary: '200K views · 24 hours',
    work: 'Sprint reels and hook testing for a digital agency. One reel, posted and measured within the first week.',
    results: ['200,000+ views in 24 hours', 'Traffic spike to site', 'Format locked for ongoing cadence'],
  },
  {
    id: 'ai-infra',
    company: 'AI Infrastructure Co.',
    summary: 'Zero content → weekly cadence',
    work: 'Founder-led reels and product demos. Batch-recorded in one session, shipped weekly.',
    results: ['Consistent posting within 2 weeks', 'Inbound DMs from target founders', '3 formats in rotation'],
  },
  {
    id: 'preseed',
    company: 'Pre-seed SaaS',
    summary: 'Content → investor meetings',
    work: 'Build-in-public Stories and Reels showing product progress and customer wins.',
    results: ['Weekly visibility cadence', 'Investor inbound from content', 'Clear narrative for the round'],
  },
] as const

export default function CaseStudies() {
  useEffect(() => {
    const root = document.getElementById('cases-accordion')
    if (!root) return

    const onToggle = (e: Event) => {
      const target = e.target as HTMLDetailsElement
      if (!target.open || target.tagName !== 'DETAILS') return
      root.querySelectorAll('details').forEach((d) => {
        if (d !== target) d.open = false
      })
    }

    root.addEventListener('toggle', onToggle, true)
    return () => root.removeEventListener('toggle', onToggle, true)
  }, [])

  return (
    <SectionRule id="cases" label="Case studies">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display font-medium text-[32px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] text-white/95">
          Results, not promises.
        </h2>
      </div>

      <div
        id="cases-accordion"
        className="mt-12 max-w-2xl mx-auto border border-white/[0.06] rounded-xl overflow-hidden divide-y divide-white/[0.06]"
      >
        {CASES.map((c) => (
          <details key={c.id} className="group bg-zilla-black">
            <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-5 cursor-pointer hover:bg-white/[0.02] transition-colors duration-150">
              <div className="text-left">
                <span className="font-display text-[16px] sm:text-[17px] text-white/95">{c.company}</span>
                <span className="block mt-0.5 font-mono text-[11px] text-white/40 tracking-[0.04em]">
                  {c.summary}
                </span>
              </div>
              <span className="font-mono text-[16px] text-white/25 group-open:rotate-45 transition-transform duration-200 shrink-0">
                +
              </span>
            </summary>

            <div className="landing-accordion-panel">
              <div className="landing-accordion-inner px-5 sm:px-6 pb-6">
                <p className="text-[14px] leading-[1.65] text-white/55">{c.work}</p>
                <ul className="mt-5 space-y-2">
                  {c.results.map((r) => (
                    <li key={r} className="text-[13px] text-white/65 flex gap-2">
                      <span className="text-zilla-neon/60 shrink-0">→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        ))}
      </div>
    </SectionRule>
  )
}