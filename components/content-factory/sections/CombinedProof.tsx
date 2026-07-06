import SectionRule from '../ui/SectionRule'
import ShareMechanismProof from '../ui/ShareMechanismProof'
import {
  COMBINED_PROOF_COPY,
  SHARE_MECHANISM_COPY,
  VOLUME_STAT,
} from '@/lib/content-factory/share-proof'

const STATS = [
  { value: '200,000+', label: 'views' },
  { value: '24 hrs', label: 'from post' },
  { value: '1', label: 'reel' },
] as const

export default function CombinedProof() {
  const copy = COMBINED_PROOF_COPY

  return (
    <SectionRule id="proof" label="Proof" className="bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto text-center px-2">
        <h2 className="font-display font-medium text-[32px] sm:text-[42px] leading-[1.06] tracking-[-0.02em] text-white/95">
          {copy.proofHeadline}
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-white/45">{copy.proofSub}</p>

        <div className="mt-16 sm:mt-20 mx-auto max-w-[340px] sm:max-w-[380px]">
          <div className="landing-proof-reel overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/content/larp-views.jpg"
              alt="Views on a single reel, Longsword Digital"
              width={800}
              height={1477}
              className="w-full h-auto object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-14 sm:mt-16 grid grid-cols-3 gap-2 sm:gap-5 max-w-lg mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="landing-proof-stat p-2 sm:p-4">
              <div className="landing-proof-stat-value text-[18px] sm:text-[30px] lg:text-[34px] leading-none">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/38">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-16 sm:mt-20 max-w-2xl mx-auto text-center text-[13px] sm:text-[15px] leading-[1.65] text-white/40 px-3 sm:px-4">
        {VOLUME_STAT}
      </p>

      <div className="mt-20 sm:mt-24 pt-20 sm:pt-24 border-t border-white/[0.06] max-w-5xl mx-auto text-center px-2">
        <p className="inline-flex items-center rounded-md border border-zilla-neon/30 bg-zilla-neon/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zilla-neon">
          {SHARE_MECHANISM_COPY.badge}
        </p>

        <h3 className="mt-6 font-display font-medium text-[24px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-[-0.03em] text-white/95 px-4">
          {copy.shareBridge}
        </h3>

        <p className="mt-5 text-[16px] sm:text-[17px] leading-[1.55] text-white/45 max-w-xl mx-auto px-4">
          {copy.shareSub}
        </p>

        <div className="mt-14 sm:mt-16">
          <ShareMechanismProof showHeader={false} />
        </div>
      </div>
    </SectionRule>
  )
}