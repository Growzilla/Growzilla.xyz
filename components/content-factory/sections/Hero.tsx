import type { HeroWheelLogo } from '@/lib/brandfetch'
import HeroOutcomeCycle from '../ui/HeroOutcomeCycle'
import LogoWheel from '../ui/LogoWheel'

type Props = {
  logos: HeroWheelLogo[]
}

export default function Hero({ logos }: Props) {
  return (
    <section id="top" className="relative scroll-mt-20 pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 bg-zilla-black overflow-x-clip">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center landing-visible overflow-x-clip">
        <h1 className="font-display font-semibold text-[clamp(1.75rem,8vw,5.5rem)] leading-[1.02] tracking-[-0.035em] text-white/95 mx-auto max-w-full px-2">
          <span className="block text-center">You built the product</span>
          <span className="block text-center md:text-left mt-2 sm:mt-3 md:pl-14 lg:pl-[4.25rem]">
            We help you get{' '}
            <span className="inline-block w-[5.25em] sm:w-[5.75em] md:w-[6.25em] text-left">
              <HeroOutcomeCycle />
            </span>
          </span>
        </h1>

        <p className="mt-8 sm:mt-10 font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.28em] text-white/45">
          Growzilla Content Factory
        </p>

        <p className="mt-10 sm:mt-12 font-display font-medium text-[clamp(1.5rem,4.5vw,2.75rem)] leading-[1.12] tracking-[-0.02em] text-white/90">
          The content engine behind
          <br />
          successful startups.
        </p>

        <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <a
            href="#apply?plan=pilot"
            className="landing-btn-primary group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 h-14 sm:h-16 px-10 sm:px-14 rounded-lg text-[17px] sm:text-[18px]"
          >
            Partner with us
            <span className="text-[19px] transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#proof"
            className="landing-btn-secondary inline-flex w-full sm:w-auto items-center justify-center gap-2.5 h-12 sm:h-14 px-8 sm:px-10 rounded-lg text-[15px] sm:text-[16px]"
          >
            See the numbers
            <span className="text-white/35 text-[16px]">↓</span>
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-8 sm:mt-10 overflow-x-clip">
        <LogoWheel logos={logos} />
      </div>
    </section>
  )
}