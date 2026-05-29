import React from 'react';

/**
 * STRUCTURAL PLACEHOLDER — not rendered until the operator approves a real
 * anonymized Klaviyo Day-30 attribution screenshot.
 *
 * When ready:
 *   1. Drop a screenshot at /public/images/proof/klaviyo-day30-anonymized.png
 *   2. Uncomment the import + <ProofScreenshot /> usage in pages/email.tsx
 *   3. Update brandLabel + numbers below to match the real screenshot
 *
 * Per Erik (anxious-buyer audit): the single highest-leverage trust unit on the page.
 * Until this lights up, the founder block + Floor Guarantee carry the trust load.
 */

interface Props {
  imageSrc?: string;
  brandLabel?: string;
  listSize?: number;
  recoveredUsd?: number;
  feeUsd?: number;
  caption?: string;
}

const ProofScreenshot: React.FC<Props> = ({
  imageSrc = '/images/proof/klaviyo-day30-anonymized.png',
  brandLabel = 'Brand X — UK fragrance',
  listSize = 8200,
  recoveredUsd = 34100,
  feeUsd = 3410,
  caption = 'Real client, Q1 2026. Numbers verified by Klaviyo dashboard. Anonymized at the client\'s request — name shared in our discovery call.',
}) => (
  <section className="border-t border-white/[0.06] bg-zilla-dark">
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-xs tracking-[0.2em] text-zilla-neon font-mono mb-4">
        ◆ ONE WE'VE SHIPPED
      </div>
      <h2 className="font-display text-3xl md:text-4xl leading-tight mb-3">
        {brandLabel}
      </h2>
      <p className="text-white/64 mb-8">
        Dormant subscribers: <span className="text-white font-medium">{listSize.toLocaleString()}</span> ·
        Recovered in 30 days: <span className="text-zilla-neon font-medium">${recoveredUsd.toLocaleString()}</span> ·
        Our fee: <span className="text-white font-medium">${feeUsd.toLocaleString()}</span>
      </p>
      <div className="relative rounded-lg border border-white/[0.08] overflow-hidden bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={`Klaviyo Day-30 attribution screenshot — ${brandLabel}`}
          className="w-full h-auto"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="text-xs text-white/48 mt-4 leading-relaxed">{caption}</p>
    </div>
  </section>
);

export default ProofScreenshot;
