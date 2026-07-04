import SectionRule from '../ui/SectionRule'

const POINTS = [
  'Pre-seed and seed startups with product live but zero content cadence.',
  'Founding teams still in build mode. No bandwidth for hooks, edits, or daily posting.',
  'Startups ready to move fast on organic before burning paid budget blind.',
] as const

export default function ZeroToOne() {
  return (
    <SectionRule id="zero-to-one" label="0 → 1">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-medium text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.06] tracking-[-0.02em] text-white/95">
          We take startups from 0 to 1 on content and media buying.
        </h2>

        <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.65] text-white/55">
          Not the agency that scales a Series B brand. The fractional engine that
          gets a startup posting, testing, and learning what pulls, before a CMO
          or paid lead ever walks in the door.
        </p>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-zilla-neon/75">
          Startups ready to move fast
        </p>

        <ul className="mt-12 text-left space-y-0 border border-white/[0.06] rounded-xl overflow-hidden divide-y divide-white/[0.06]">
          {POINTS.map((line) => (
            <li
              key={line}
              className="px-5 sm:px-6 py-5 text-[15px] leading-[1.6] text-white/55 bg-zilla-black"
            >
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[15px] leading-[1.65] text-white/45">
          Cadence is non-negotiable:{' '}
          <span className="text-white/75">one reel per day</span> across the
          channels that matter, tested until a hook wins, then scaled.
        </p>
      </div>
    </SectionRule>
  )
}