import type { BrandLogo } from '@/lib/brandfetch'
import LogoRail from '../ui/LogoRail'

type Props = {
  logos: BrandLogo[]
}

export default function Hero({ logos }: Props) {
  return (
    <section id="top" className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 bg-zilla-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center landing-visible">
        <h1 className="font-display font-semibold text-[clamp(2.75rem,11vw,6.5rem)] leading-[0.92] tracking-[-0.035em] text-white/95">
          <span className="text-zilla-neon">Attention</span> is all you{' '}
          <span className="text-zilla-neon">need</span>
        </h1>

        <p className="mt-8 sm:mt-10 font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.28em] text-white/45">
          Growzilla Content Factory
        </p>

        <p className="mt-10 sm:mt-12 max-w-4xl mx-auto font-display font-medium text-[clamp(1.5rem,4.5vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-white/90">
          We build the content engine behind
          <br />
          successful startups.
        </p>

        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-lg sm:max-w-none mx-auto">
          <a
            href="#apply?plan=pilot"
            className="group inline-flex items-center justify-center gap-2.5 h-14 sm:h-[3.75rem] px-9 sm:px-10 rounded-lg bg-zilla-neon text-black text-[16px] sm:text-[17px] font-semibold hover:brightness-105 transition-all duration-150 hover:translate-y-[-1px] shadow-[0_0_32px_rgba(0,255,148,0.25)]"
          >
            Partner with us
            <span className="text-[18px] transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#proof"
            className="inline-flex items-center justify-center gap-2.5 h-14 sm:h-[3.75rem] px-9 sm:px-10 rounded-lg border-2 border-white/[0.18] text-[16px] sm:text-[17px] font-medium text-white/85 hover:text-white hover:border-white/[0.35] hover:bg-white/[0.04] transition-all duration-150"
          >
            See the numbers
            <span className="text-zilla-neon text-[18px]">↓</span>
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-4">
        <LogoRail logos={logos} />
      </div>
    </section>
  )
}