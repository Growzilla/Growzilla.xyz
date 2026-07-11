import SectionRule from '../ui/SectionRule'

export default function Process() {
  return (
    <SectionRule id="process" label="Partner">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-medium text-[28px] sm:text-[36px] leading-[1.12] tracking-[-0.02em] text-white/95">
          Tell us who. We&apos;ll build the content that gets you in front of them.
        </h2>

        <a
          href="/pilot"
          className="group inline-flex items-center justify-center gap-2.5 mt-10 h-14 px-9 rounded-lg bg-zilla-neon text-black text-[16px] font-semibold hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px] shadow-[0_0_32px_rgba(0,255,148,0.25)]"
        >
          Start the pilot
          <span className="text-[18px] transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </a>
      </div>
    </SectionRule>
  )
}