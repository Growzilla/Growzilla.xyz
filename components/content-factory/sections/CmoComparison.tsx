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
      <div className="w-full text-center">
        <h2 className="font-display font-medium text-[clamp(1.125rem,2.6vw,2.125rem)] leading-[1.08] tracking-[-0.025em] text-white/95 max-w-xl sm:max-w-none mx-auto px-2 sm:px-0 sm:whitespace-nowrap w-full text-center">
          The most <span className="text-red-400">expensive</span> mistake early startups make
        </h2>
        <p className="mt-5 font-display font-medium text-[18px] sm:text-[22px] lg:text-[26px] leading-[1.15] tracking-[-0.02em] text-white/82 max-w-2xl mx-auto">
          Hiring a CMO before the engine is built.
        </p>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/45 max-w-2xl mx-auto">
          The team that scales from $1M to $100M ARR is rarely the one that builds from 0
          to 1. Different job. Different timing.
        </p>
      </div>

      <div className="mt-14 sm:mt-16 flex flex-col gap-5 sm:gap-6 max-w-2xl mx-auto">
        <article className="rounded-xl border border-red-500/35 bg-[#0A0A0A] p-7 sm:p-9 shadow-[inset_0_1px_0_rgba(255,77,77,0.12)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">
            Path A · The expensive mistake
          </p>
          <h3 className="mt-3 font-display text-[20px] sm:text-[22px] font-medium text-white/88">
            Hire experienced CMO at the start
          </h3>
          <ul className="mt-7 space-y-4">
            {CMO_EARLY.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.5] text-white/72">
                <span className="text-red-400 shrink-0 font-semibold text-[17px] leading-none mt-0.5" aria-hidden>
                  ×
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-zilla-neon/50 bg-zilla-neon/[0.07] p-8 sm:p-10 shadow-[0_0_0_1px_rgba(0,255,148,0.12),0_0_40px_rgba(0,255,148,0.1),0_16px_48px_rgba(0,0,0,0.4)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zilla-neon">
            Path B · The smarter move
          </p>
          <h3 className="mt-3 font-display text-[22px] sm:text-[24px] font-medium text-white/95">
            Build the engine first, then hire
          </h3>
          <ul className="mt-7 space-y-4">
            {ENGINE_FIRST.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] sm:text-[16px] leading-[1.45] text-white/80"
              >
                <span className="text-zilla-neon shrink-0 font-medium" aria-hidden>
                  →
                </span>
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SectionRule>
  )
}