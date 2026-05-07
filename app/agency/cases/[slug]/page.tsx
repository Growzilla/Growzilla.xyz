'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import PlaybookCTA from '@/components/agency/playbook/PlaybookCTA'

type Params = { slug: string }

const CASES: Record<
  string,
  {
    brand: string
    collection: string
    monogram: string
    canonical: boolean
  }
> = {
  'scandinavian-poster': {
    brand: 'Scandinavian Poster',
    collection: 'Custom posters · Sweden',
    monogram: 'SP',
    canonical: true,
  },
}

export default function CasePage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params)
  const data = CASES[slug]
  if (!data) notFound()

  return (
    <main
      data-theme="claude"
      className="min-h-screen bg-claude-cream text-claude-graphite"
    >
      <CaseHeader brand={data.brand} collection={data.collection} />
      {data.canonical ? <CanonicalCase brand={data.brand} monogram={data.monogram} /> : null}
      <PlaybookCTA />
    </main>
  )
}

function CaseHeader({ brand, collection }: { brand: string; collection: string }) {
  return (
    <header className="sticky top-0 z-50 bg-claude-cream/85 backdrop-blur-md border-b border-claude-pampas">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <a
          href="/agency"
          className="inline-flex items-center gap-2 text-[13px] font-sans text-claude-stone hover:text-claude-ink transition-colors no-underline"
        >
          <span>←</span>
          <span>Back to Growzilla</span>
        </a>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-claude-stone">
            Case · {brand}
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-claude-cloudy">
            · {collection}
          </span>
        </div>
      </div>
    </header>
  )
}

function CanonicalCase({ brand, monogram }: { brand: string; monogram: string }) {
  // Operator-fillable scaffolding. All copy slots are intentionally placeholder
  // until Joanna's day-90 reveal lands. Edit this file directly when ready.
  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="mb-14">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-claude-terracotta mb-4">
          Case study · scaffolding
        </div>
        <h1 className="font-serif text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.02em] text-claude-ink">
          {brand} —
          <br />
          <span className="text-claude-stone">case study landing soon.</span>
        </h1>
        <p className="mt-7 font-editorial text-[18px] leading-[1.7] text-claude-graphite">
          Day-90 reveal incoming. PSI 28 → 89 mobile is already locked. The
          ad-spend curve, blended-MER lift, and CVR delta land the week of
          the public publish. Operator fills this page directly when the
          numbers are clean.
        </p>
      </div>

      {/* Real, citable PSI bar */}
      <div className="rounded-2xl bg-claude-pampas/60 border border-claude-pampas p-10 mb-14">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-claude-stone">
            Lighthouse mobile · real
          </span>
          <span className="font-mono text-[11px] text-claude-terracotta">+217%</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-claude-cloudy mb-2">
              Before
            </div>
            <div className="font-serif text-[56px] tabular-nums leading-none text-claude-stone">
              28
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-claude-stone mb-2">
              After · 90 days
            </div>
            <div className="font-serif text-[56px] tabular-nums leading-none text-claude-terracotta">
              89
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder structural sections for operator to fill */}
      <PlaceholderSection eyebrow="01" title="The brief">
        Replace with the real story. Where {brand} was at month 0, what they
        had tried, why they reached out, what they were skeptical of.
      </PlaceholderSection>

      <PlaceholderSection eyebrow="02" title="The audit">
        What the first 14 days exposed. The 3–5 highest-impact fixes we
        identified, in priority order. The ones we shipped versus the ones
        we punted.
      </PlaceholderSection>

      <PlaceholderSection eyebrow="03" title="The first ad set">
        Which hook landed first. Hook rate, hold rate, CTR. What the cohort
        looked like in week 2.
      </PlaceholderSection>

      <PlaceholderSection eyebrow="04" title="The 90-day arc">
        Replace with the live curve: spend, MER, CVR, AOV, repeat rate.
        Quote-pull from {brand} founder optional but high-leverage.
      </PlaceholderSection>

      <PlaceholderSection eyebrow="05" title="What broke">
        The week something went wrong. Premium signals over polished
        narratives — readers trust this section more than any other.
      </PlaceholderSection>

      <PlaceholderSection eyebrow="06" title="What's next">
        The next 90 days, plainly. What&apos;s unproven. What we&apos;re
        about to test. What we&apos;re scared of.
      </PlaceholderSection>

      <hr className="my-16 border-claude-pampas" />

      <div className="flex items-center gap-5 text-[12px] font-mono uppercase tracking-wide text-claude-cloudy">
        <span>{monogram}</span>
        <span className="w-1 h-1 rounded-full bg-claude-cloudy" />
        <span>Drafted · awaiting day-90 numbers</span>
      </div>
    </article>
  )
}

function PlaceholderSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-14">
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-claude-stone mb-3">
        {eyebrow}
      </div>
      <h2 className="font-serif text-[28px] sm:text-[32px] leading-[1.15] tracking-[-0.015em] text-claude-ink mb-5">
        {title}
      </h2>
      <p className="font-editorial text-[16px] leading-[1.7] text-claude-cloudy italic">
        {children}
      </p>
    </section>
  )
}
