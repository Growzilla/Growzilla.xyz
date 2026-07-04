import SectionRule from '../ui/SectionRule'

const CMO_EARLY = [
  'Expensive from month one',
  'Contracts, payroll, employment overhead',
  'Month one is training. Founder bandwidth gone',
  'No leverage. They figure it out while you pay.',
  'Months burned before traction shows',
] as const

const ENGINE_FIRST = [
  'Lean method. Predictable cost.',
  'No hires. No HR. Fully handled.',
  'No direction needed. We deliver.',
  'Hooks, audience, and data already live.',
  'CMO walks into scale on a base that works.',
] as const

export default function CmoComparison() {
  return (
    <SectionRule id="compare" label="The math">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display font-medium text-[28px] sm:text-[36px] leading-[1.08] tracking-[-0.02em] text-white/95">
          Hire a CMO at day zero, or build the engine first?
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/50">
          The talent that takes startups from $1M to $100M ARR is rarely the team
          that gets you from 0 to 1. Different job. Different timing.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">
        <article className="rounded-xl border border-white/[0.08] bg-[#0C0C0D] p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            Path A
          </p>
          <h3 className="mt-3 font-display text-[20px] font-medium text-white/80">
            Hire experienced CMO at the start
          </h3>
          <ul className="mt-6 space-y-3">
            {CMO_EARLY.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-white/45">
                <span className="text-white/25 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-zilla-neon/30 bg-zilla-neon/[0.03] p-6 sm:p-8 md:-translate-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zilla-neon/70">
            Path B
          </p>
          <h3 className="mt-3 font-display text-[20px] font-medium text-white/95">
            Partner on the engine, then hire
          </h3>
          <ul className="mt-6 space-y-3">
            {ENGINE_FIRST.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-white/65">
                <span className="text-zilla-neon/60 shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SectionRule>
  )
}