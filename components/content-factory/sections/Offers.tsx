import SectionRule from '../ui/SectionRule'

type Plan = 'sprint' | 'pilot' | 'retainer'

const PLANS: {
  id: Plan
  name: string
  price: string
  period: string
  cadence: string
  for: string
  includes: string[]
  recommended?: boolean
}[] = [
  {
    id: 'sprint',
    name: 'Ignition Sprint',
    price: '$1,000',
    period: '2 weeks',
    cadence: '1 reel / day',
    for: 'First partnership sprint',
    includes: [
      'Daily posting cadence kicked off',
      'Batch record in one session',
      'Hook tests live in week one',
      'Handoff playbook for the team',
    ],
  },
  {
    id: 'pilot',
    name: '3-Month Growth Pilot',
    price: '$1,500',
    period: '/ month',
    cadence: '1 reel / day',
    for: 'Startups ready to move fast',
    recommended: true,
    includes: [
      'One reel per day, every day',
      'Instagram + Facebook batched · TikTok native',
      'Volume testing until hooks win',
      'Engine built before the CMO hire',
    ],
  },
  {
    id: 'retainer',
    name: 'Growth Retainer',
    price: '$2,000',
    period: '/ month',
    cadence: '1 reel / day+',
    for: 'Ongoing content partner',
    includes: [
      'Daily cadence maintained',
      'Priority turnaround on edits',
      'Paid scale on proven hooks',
      'Quarterly content + ads roadmap',
    ],
  },
]

export default function Offers() {
  return (
    <SectionRule id="offers" label="Partnerships">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display font-medium text-[32px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] text-white/95">
          Partner with the firm behind startup content.
        </h2>
        <p className="mt-4 text-[15px] text-white/50">
          Three ways to work together. We take a small number of startup partners at a time.
        </p>
      </div>

      <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-4 lg:gap-6">
        {PLANS.map((p) => (
          <article
            key={p.id}
            className={[
              'relative flex flex-col w-full max-w-[300px] aspect-square p-7 sm:p-8 rounded-xl transition-all duration-200',
              p.recommended
                ? 'pilot-card-glow border border-zilla-neon/45 bg-zilla-neon/[0.04] md:-translate-y-3 z-10'
                : 'border border-white/[0.08] bg-[#0C0C0D] hover:border-white/[0.14]',
            ].join(' ')}
          >
            {p.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-black bg-zilla-neon px-3 py-1 rounded-sm whitespace-nowrap">
                Preferred partner
              </span>
            )}

            <div className="flex-1 flex flex-col">
              <h3 className="font-display text-[16px] sm:text-[17px] font-medium text-white/95 leading-snug">
                {p.name}
              </h3>
              <p className="mt-1 text-[12px] text-white/45">{p.for}</p>

              <div className="mt-5">
                <span className="font-display text-[32px] sm:text-[36px] font-medium tracking-[-0.03em] text-white/95">
                  {p.price}
                </span>
                <span className="block mt-0.5 font-mono text-[11px] text-white/40">{p.period}</span>
                <span className="block mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-zilla-neon/60">
                  {p.cadence}
                </span>
              </div>

              <ul className="mt-5 space-y-2 flex-1">
                {p.includes.map((item) => (
                  <li key={item} className="text-[13px] leading-snug text-white/55 flex gap-2">
                    <span className="text-zilla-neon/50 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`#apply?plan=${p.id}`}
              className={
                p.recommended
                  ? 'group mt-5 flex items-center justify-center gap-2 h-11 rounded-md bg-zilla-neon text-black text-[13px] font-semibold hover:brightness-110 transition-all duration-150'
                  : 'group mt-5 flex items-center justify-center gap-2 h-11 rounded-md border border-white/[0.12] text-[13px] font-medium text-white/75 hover:text-white hover:border-white/[0.2] transition-all duration-150'
              }
            >
              {p.id === 'pilot' ? 'Partner on pilot' : 'Discuss partnership'}
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
            </a>
          </article>
        ))}
      </div>
    </SectionRule>
  )
}