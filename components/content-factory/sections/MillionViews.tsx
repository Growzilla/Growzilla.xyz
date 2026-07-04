import SectionRule from '../ui/SectionRule'

const OUTCOMES = [
  'The right customers',
  'The right investors',
  'The right opportunities',
] as const

export default function MillionViews() {
  return (
    <SectionRule id="question" label="What if">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display font-medium text-[clamp(2rem,6vw,3.5rem)] leading-[1.06] tracking-[-0.03em] text-white/95">
          What if your company went viral?
        </h2>

        <p className="mt-8 sm:mt-10 font-display font-medium text-[22px] sm:text-[28px] leading-[1.3] tracking-[-0.02em] text-white/75">
          Who would see it? What would happen?
        </p>

        <p className="mt-6 sm:mt-8 font-display font-medium text-[18px] sm:text-[22px] leading-[1.4] tracking-[-0.01em] text-white/55">
          Who&apos;s the one person that could change everything if they saw your
          content?
        </p>

        <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8">
          {OUTCOMES.map((item) => (
            <span
              key={item}
              className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.12em] text-zilla-neon/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </SectionRule>
  )
}