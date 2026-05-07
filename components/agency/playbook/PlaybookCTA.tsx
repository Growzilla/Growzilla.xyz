'use client'

/**
 * Hybrid section — switches back to Zilla theme for the conversion CTA at the
 * end of every editorial article. Pattern documented in DESIGN-claude.md §11.
 */
export default function PlaybookCTA() {
  return (
    <section
      data-theme="zilla"
      className="bg-zilla-black text-white"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <span className="inline-block text-[12px] font-mono tracking-[0.18em] uppercase text-zilla-neon/80 mb-5">
          Ready?
        </span>
        <h2 className="font-display text-[32px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] font-semibold">
          See if this fits your store.
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] text-white/55 leading-relaxed max-w-xl mx-auto">
          20 minutes. No deck. We&apos;ll pull your store, walk the funnel,
          and tell you whether we&apos;re the right team — or who is.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://calendly.com/albert-growzilla/growzilla-install"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-zilla-neon text-black text-[15px] font-semibold hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px]"
          >
            Book a 20-min call
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="/agency"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 text-[15px] font-medium text-white/75 hover:text-white transition-colors"
          >
            Or back to Growzilla
          </a>
        </div>
      </div>
    </section>
  )
}
