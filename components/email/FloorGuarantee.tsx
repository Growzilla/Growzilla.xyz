import React from 'react';

/**
 * The Floor Guarantee — risk-reversal box. Verbatim wording locked with operator
 * (per growzillaAssets/offers/whop-product-copy.md). This is the strongest copy
 * on the page: "we keep building until it hits the floor."
 */

const FloorGuarantee: React.FC = () => (
  <section className="border-t border-white/[0.06] bg-zilla-dark">
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs tracking-[0.2em] text-zilla-neon font-mono mb-4">
        ◆ THE FLOOR GUARANTEE
      </div>
      <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
        If the floor doesn't hit in 30 days,
        <br />
        <span className="text-zilla-neon">we keep building until it does.</span>
      </h2>
      <p className="text-lg text-white/72 leading-relaxed mb-6">
        $500 setup. 10% of recovered revenue. That's the entire pricing.
      </p>
      <div className="border-l-2 border-zilla-neon pl-6 py-2 mb-6">
        <p className="text-white/85 leading-relaxed">
          We quote a floor based on Klaviyo's lower-end 2025 benchmark applied to your specific
          AOV and dormant list. If 30 days end and Klaviyo-attributed revenue from our sequences
          hasn't hit that floor,{' '}
          <span className="text-white font-medium">we don't disappear. We keep building</span> —
          new offers, new sequences, new sends — until it does.{' '}
          <span className="text-white font-medium">No new invoice. We finish the job.</span>
        </p>
      </div>
      <p className="text-xs text-white/48 leading-relaxed">
        The 10% fee bills only against revenue Klaviyo attributes to our sequences during the
        30-day window, net of your prior 30-day baseline. We lock the baseline on Day 0.
      </p>
    </div>
  </section>
);

export default FloorGuarantee;
