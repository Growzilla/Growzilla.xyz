'use client'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-zilla-black py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-white/95">
              Growzill
            </span>
            <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-zilla-neon">
              a
            </span>
            <span className="ml-3 text-[12px] text-white/40 font-mono">
              Shopify growth operators
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/45">
            <a href="#case-study" className="hover:text-white/85 transition-colors">
              Work
            </a>
            <a href="#offer" className="hover:text-white/85 transition-colors">
              Offer
            </a>
            <a
              href="/agency/vault"
              className="hover:text-white/85 transition-colors"
            >
              Knowledge Base
            </a>
            <a
              href="https://x.com/ascendergrey"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/85 transition-colors"
            >
              X
            </a>
            <a
              href="https://linkedin.com/in/albert-elmgart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/85 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:albert@growzilla.xyz"
              className="hover:text-white/85 transition-colors"
            >
              albert@growzilla.xyz
            </a>
          </div>
        </div>

        <div className="mt-6 text-[12px] text-white/55">
          Working with EU and US-based brands. Based in Asia.
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
          <div>
            © {new Date().getFullYear()} RolloutFactory Inc · Delaware
          </div>
          <div>Founded 2024</div>
        </div>
      </div>
    </footer>
  )
}
