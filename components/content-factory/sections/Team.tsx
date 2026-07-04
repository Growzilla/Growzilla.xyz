import SectionRule from '../ui/SectionRule'

export default function Team() {
  return (
    <SectionRule id="team" label="Partner">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-medium text-[28px] sm:text-[36px] leading-[1.08] tracking-[-0.02em] text-white/95">
          Albert Elmgart
        </h2>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zilla-neon/70">
          Partner · Sweden Region
        </p>
        <p className="mt-6 text-[16px] sm:text-[17px] leading-[1.75] text-white/55">
          Ex-founder. Used to be deep in build mode. Now only posting content.
        </p>
        <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.65] text-white/45 max-w-md mx-auto">
          Let&apos;s grab a coffee in Stockholm. Always down to hear about new
          startups and see if we could partner with you.
        </p>
        <a
          href="https://linkedin.com/in/albert-elmgart"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-[14px] text-zilla-neon/75 hover:text-zilla-neon transition-colors duration-150"
        >
          Connect on LinkedIn
          <span>→</span>
        </a>
      </div>
    </SectionRule>
  )
}