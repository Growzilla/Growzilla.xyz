import { INBOUND_COPY, INBOUND_STAT } from '@/lib/content-factory/inbound-proof'
import InboundMosaic from './InboundMosaic'

export default function InboundProof() {
  const copy = INBOUND_COPY
  const stat = INBOUND_STAT

  return (
    <div className="w-full text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
        {copy.eyebrow}
      </p>

      <h3 className="mt-3 font-display font-medium leading-[1.08] tracking-[-0.03em] text-white/95 px-3 text-[26px] sm:text-[36px] md:text-[44px] lg:text-[52px] max-w-4xl mx-auto">
        {copy.headline}
      </h3>

      <p className="mt-4 text-[clamp(1rem,2.2vw,1.35rem)] leading-[1.4] tracking-[-0.02em] text-white/60 max-w-3xl mx-auto px-4">
        {copy.sub}
      </p>

      <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.5] tracking-[-0.02em] text-white/50 max-w-2xl mx-auto px-4">
        {copy.body}
      </p>

      <div className="mt-10 mx-auto max-w-3xl px-4">
        <p className="inline-flex items-center rounded-md border border-zilla-neon/30 bg-zilla-neon/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zilla-neon">
          Daily inbound volume
        </p>

        <div className="mt-5 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <span className="font-display font-medium text-[56px] sm:text-[72px] lg:text-[84px] leading-none tracking-[-0.04em] text-zilla-neon drop-shadow-[0_0_28px_rgba(0,255,148,0.35)]">
            {stat.value}
          </span>
          <span className="font-display font-medium text-[28px] sm:text-[34px] lg:text-[40px] leading-none tracking-[-0.03em] text-white/90">
            {stat.label}
          </span>
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-zilla-neon/75">
          {stat.suffix}
        </p>
      </div>

      <div className="mt-10 w-full px-2 sm:px-0">
        <InboundMosaic />
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/28 px-4">
        {copy.footnote}
      </p>

      <p className="mt-6 text-[14px] sm:text-[15px] text-white/38 px-4">
        {copy.bridge}
      </p>
    </div>
  )
}