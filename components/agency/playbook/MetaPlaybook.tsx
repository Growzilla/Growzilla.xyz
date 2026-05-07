'use client'

const TOC = [
  { id: 'setup', label: '01 · Setup' },
  { id: 'creative', label: '02 · Creative volume' },
  { id: 'hook-rate', label: '03 · Hook rate' },
  { id: 'scaling', label: '04 · Scaling rules' },
  { id: 'kill', label: '05 · Kill criteria' },
  { id: 'reporting', label: '06 · Reporting cadence' },
] as const

export default function MetaPlaybook() {
  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      {/* Eyebrow + headline */}
      <div className="mb-14">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-claude-terracotta mb-4">
          Paid ads · The recipe
        </div>
        <h1 className="font-serif text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.02em] text-claude-ink">
          The Meta playbook we run, post-Andromeda.
        </h1>
        <p className="mt-7 font-editorial text-[18px] leading-[1.7] text-claude-graphite">
          The 2024 Andromeda update collapsed half of what the agency world
          taught about Meta. Detailed audiences are dead. Manual placement is
          dead. Lookalikes do less than they used to. What still works is
          radically simpler: <em className="text-claude-ink">creative volume</em>
          , <em className="text-claude-ink">broad CBO</em>, and a feedback loop
          that kills losers fast. This is exactly how we run it.
        </p>
      </div>

      {/* Reading meta */}
      <div className="mb-14 flex items-center gap-5 text-[12px] font-mono tracking-wide uppercase text-claude-stone">
        <span>6-min read</span>
        <span className="w-1 h-1 rounded-full bg-claude-stone" />
        <span>Last revised May 2026</span>
      </div>

      {/* TOC */}
      <nav className="mb-14 pl-5 border-l border-claude-pampas">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-claude-stone mb-3">
          What&apos;s inside
        </div>
        <ol className="space-y-2">
          {TOC.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className="font-editorial text-[15px] text-claude-graphite hover:text-claude-terracotta transition-colors no-underline"
              >
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Sections */}
      <Section id="setup" eyebrow="01" title="Setup">
        <p>
          One CBO, one ad set, broad targeting. Country, age 18+, gender all,
          no detailed-targeting bloat. Pixel + Conversions API both firing,
          deduplicated by event_id. Aggregated Event Measurement priorities
          set: Purchase first, ATC second, ViewContent third. If a brand
          arrives without that, that&apos;s the first 90 minutes of the engagement.
        </p>
        <p>
          Naming convention is non-negotiable. Campaign:{' '}
          <code className="font-mono text-[13px] text-claude-terracotta">
            CBO_BROAD_PURCHASE_{`{country}`}
          </code>
          . Ad: <code className="font-mono text-[13px] text-claude-terracotta">
            {`{angle}_{format}_{cta}_{date}`}
          </code>
          . Without this, week 4 reporting becomes archaeology.
        </p>
      </Section>

      <Section id="creative" eyebrow="02" title="Creative volume">
        <p>
          The core variable in 2026 is creative count, not bid strategy. Five
          fresh creatives per week is the floor. Three hook patterns × two
          formats × two CTAs gives you twelve permutations from one shoot
          day — that&apos;s how the matrix gets fed.
        </p>
        <p>
          Hook patterns we test on rotation: problem-frame, social proof,
          founder-direct, before/after, listicle, contrarian. We do not write
          them in a doc — they get briefed against the previous week&apos;s
          hook-rate winners, then captured.
        </p>
      </Section>

      <PullQuote>
        Same £100k budget. Two creatives carried the month. We knew by day 4
        because the algorithm doesn&apos;t lie — it just makes you wait 72
        hours to listen.
      </PullQuote>

      <Section id="hook-rate" eyebrow="03" title="Hook rate">
        <p>
          Hook rate (3-second view ÷ impressions) is the most predictive early
          signal we have. Below 25% on a paid placement, the creative is not
          earning its CPM. Below 30% hold rate (15-sec ÷ 3-sec), the body of
          the ad is losing the audience. Both metrics are visible by day 2 of
          spend; we cull below thresholds before learning-phase exit.
        </p>
        <p>
          The 47%-hook-rate winner is not a luck event — it&apos;s the
          mathematical descendant of eight prior creatives that collectively
          taught us what your audience clicks past versus pauses on.
        </p>
      </Section>

      <Section id="scaling" eyebrow="04" title="Scaling rules">
        <p>
          Scaling is sequential, not heroic. After learning-phase exit (50
          purchases per ad set), if MER is at or above target, we double the
          ad set budget — once. Wait 72 hours. If MER holds, we duplicate the
          ad set into ASC at 50% of the original budget. Every duplication
          kills no more than 20% of the prior performance, on average. We
          plan for that decay.
        </p>
        <p>
          We never scale by &gt; 2× in 24h. The algorithm flags rapid budget
          changes as account volatility and re-enters learning. That decision
          costs you a week of efficiency for no upside.
        </p>
      </Section>

      <Section id="kill" eyebrow="05" title="Kill criteria">
        <p>
          A creative with hook rate &lt; 25% after 1,000 impressions is dead.
          A creative with CTR &lt; 0.8% after 5,000 impressions is dead. An
          ad set with 0 purchases at 3× CPA target is dead. We do not give
          ads &ldquo;another day to warm up&rdquo; — that&apos;s how budgets
          get burned on noise.
        </p>
      </Section>

      <Section id="reporting" eyebrow="06" title="Reporting cadence">
        <p>
          Daily: hook rate, hold rate, CTR per creative. Weekly: MER, blended
          CAC, contribution margin, attribution-gap delta (Meta-reported
          versus Sankey-attributed). Monthly: cohort retention by acquisition
          creative — which hook brought back the customer 60 days later.
        </p>
        <p>
          Every brand we partner with sees the same Sankey we do. The
          dashboard is not a deliverable; it&apos;s the table we both look at
          every Monday.
        </p>
      </Section>

      <hr className="my-16 border-claude-pampas" />

      <p className="font-editorial text-[16px] text-claude-stone leading-[1.65]">
        This is the playbook. The reason it works isn&apos;t the playbook —
        it&apos;s the discipline of running it without flinching for 90 days
        before deciding whether it works for your brand.
      </p>
    </article>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-claude-stone mb-3">
        {eyebrow}
      </div>
      <h2 className="font-serif text-[28px] sm:text-[36px] leading-[1.15] tracking-[-0.015em] text-claude-ink mb-6">
        {title}
      </h2>
      <div className="font-editorial text-[17px] sm:text-[18px] text-claude-graphite leading-[1.75] space-y-5">
        {children}
      </div>
    </section>
  )
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-14 pl-6 border-l-2 border-claude-terracotta">
      <p className="font-serif text-[24px] sm:text-[30px] italic leading-[1.35] text-claude-ink">
        &ldquo;{children}&rdquo;
      </p>
    </blockquote>
  )
}
