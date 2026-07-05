import {
  SHARE_MECHANISM_COPY,
  SHARE_PROOF_AGGREGATE,
  SHARE_PROOF_FRAMES,
} from '@/lib/content-factory/share-proof'

function ShareCard({ src, alt, views, shares }: { src: string; alt: string; views: string; shares: string }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="landing-proof-phone w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] overflow-hidden aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={480}
          height={600}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="mt-6 sm:mt-7 text-center">
        <p className="landing-proof-stat-value text-[32px] sm:text-[40px] lg:text-[48px] leading-none">
          {shares}
        </p>
        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-zilla-neon/70">
          shares
        </p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.06em] text-white/30">
          {views} views
        </p>
      </figcaption>
    </figure>
  )
}

type Props = {
  showHeader?: boolean
}

export default function ShareMechanismProof({ showHeader = true }: Props) {
  const { views, shares, suffix } = SHARE_PROOF_AGGREGATE
  const copy = SHARE_MECHANISM_COPY

  return (
    <div className="w-full text-center">
      {showHeader && (
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {copy.eyebrow}
          </p>

          <p className="mt-4 inline-flex items-center rounded-md border border-zilla-neon/25 bg-zilla-neon/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-zilla-neon/90">
            {copy.badge}
          </p>

          <h4 className="mt-5 font-display font-medium text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.1] tracking-[-0.03em] text-white/95 px-4">
            {copy.title}
          </h4>

          <p className="mt-4 text-[16px] sm:text-[17px] leading-[1.55] text-white/50 max-w-xl mx-auto px-4">
            {copy.sub}
          </p>
        </>
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10 lg:gap-14 max-w-5xl mx-auto px-4 items-end ${
          showHeader ? 'mt-10' : 'mt-0'
        }`}
      >
        {SHARE_PROOF_FRAMES.map((frame) => (
          <ShareCard
            key={frame.id}
            src={frame.src}
            alt={frame.alt}
            views={frame.views}
            shares={frame.shares}
          />
        ))}
      </div>

      <div className="mt-16 sm:mt-20 pt-12 sm:pt-14 border-t border-white/[0.06] max-w-2xl mx-auto px-4">
        <p className="font-display text-[28px] sm:text-[36px] lg:text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-white/95">
          <span className="text-white/55">{views}</span>
          <span className="text-white/25 font-normal mx-2 sm:mx-3">views</span>
          <span className="text-white/20 font-normal hidden sm:inline">·</span>
          <span className="landing-proof-stat-value block sm:inline mt-2 sm:mt-0 sm:ml-3">
            {shares}
          </span>
          <span className="text-zilla-neon/70 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.12em] block sm:inline sm:ml-2 mt-1 sm:mt-0">
            shares
          </span>
        </p>
        <p className="mt-3 text-[14px] sm:text-[15px] text-white/38">{suffix}</p>
      </div>
    </div>
  )
}