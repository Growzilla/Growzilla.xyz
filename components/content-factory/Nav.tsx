export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-zilla-black/80 backdrop-blur-sm border-b border-white/[0.06]">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-0.5 shrink-0" aria-label="Growzilla home">
          <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-white/95">
            Growzill
          </span>
          <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-zilla-neon">
            a
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          <a href="#question" className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-150">
            Vision
          </a>
          <a href="#proof" className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-150">
            Proof
          </a>
          <a href="#compare" className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-150">
            Compare
          </a>
          <a href="#offers" className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-150">
            Partner
          </a>
        </div>

        <a
          href="#apply"
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md bg-zilla-neon text-black text-[13px] font-semibold hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px]"
        >
          Partner
          <span aria-hidden>→</span>
        </a>
      </nav>
    </header>
  )
}