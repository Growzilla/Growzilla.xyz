import SectionRule from '../ui/SectionRule'

const BLOCKS = [
  {
    lead: 'A lot of founders know content is important, and have no time to run it.',
    body: 'Growzilla works as a fractional content team inside the startup: accounts active, posts shipping, inbound steady.',
  },
  {
    lead: 'Many startups are deep in build mode.',
    body: 'They need a high-agency team to build the content engine before a full-time hire comes in.',
  },
  {
    lead: 'Hiring a CMO before the base is built can cost months.',
    body: 'Accounts set up. Content publishing. Creative ready to run as ads. When in-house hires join, they start from momentum, not from scratch.',
  },
] as const

export default function Problem() {
  return (
    <SectionRule id="problem" label="Inside the startup">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center font-display font-medium text-[32px] sm:text-[40px] leading-[1.06] tracking-[-0.02em] text-white/95">
          Build mode is real. Content still has to run.
        </h2>

        <div className="mt-12 space-y-0">
          {BLOCKS.map((block, i) => (
            <div
              key={block.lead}
              className={`py-8 ${i < BLOCKS.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
            >
              <p className="text-[17px] sm:text-[18px] leading-[1.5] text-white/80 font-medium tracking-[-0.01em]">
                {block.lead}
              </p>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-[1.65] text-white/50">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionRule>
  )
}