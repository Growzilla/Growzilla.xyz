import SectionRule from '../ui/SectionRule'

const STATS = [
  { value: '200,000+', label: 'views' },
  { value: '24 hrs', label: 'from post' },
  { value: '1', label: 'reel' },
] as const

export default function Proof() {
  return (
    <SectionRule id="proof" label="Proof" className="bg-[#0A0A0A]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-medium text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.02em] text-white/95">
          200K views. 24 hours. One reel.
        </h2>
        <p className="mt-4 text-[15px] leading-[1.65] text-white/50">
          Longsword Digital. A single Growzilla-produced reel.
        </p>

        <div className="mt-12 mx-auto max-w-[320px] sm:max-w-[360px]">
          <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-[#0C0C0D] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/content/larp-views.jpg"
              alt="Views on a single reel, Longsword Digital"
              width={800}
              height={1477}
              className="w-full h-auto object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-[22px] sm:text-[28px] font-medium tracking-[-0.02em] text-zilla-neon">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionRule>
  )
}