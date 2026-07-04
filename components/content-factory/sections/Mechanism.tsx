import SectionRule from '../ui/SectionRule'

const BENEFITS = [
  'A high-volume, targeted system that puts your content in front of the right eyeballs consistently.',
  'Generates inbound interest that builds over time instead of one-off spikes.',
  "Faster testing cycles so we double down on what actually works and cut what doesn't.",
] as const

export default function Mechanism() {
  return (
    <SectionRule id="mechanism" label="The mechanism" compact>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display font-medium text-[28px] sm:text-[36px] leading-[1.1] tracking-[-0.02em] text-white/95">
          How we get you results
        </h2>
        <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.65] text-white/50">
          A system built for startups. Consistent views. Inbound that compounds.
          Content designed to go viral.
        </p>
      </div>

      <div className="mt-12 sm:mt-14 grid md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {BENEFITS.map((benefit) => (
          <article
            key={benefit}
            className="rounded-xl border border-white/[0.08] bg-[#0C0C0D] p-6 sm:p-7 flex items-center"
          >
            <p className="text-[14px] sm:text-[15px] leading-[1.6] text-white/60 text-center w-full">
              {benefit}
            </p>
          </article>
        ))}
      </div>
    </SectionRule>
  )
}