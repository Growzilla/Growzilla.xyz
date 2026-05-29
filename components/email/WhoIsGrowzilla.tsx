import React from 'react';

/**
 * "Who is Growzilla?" — answers the question Erik couldn't find anywhere on the
 * page. Honest framing: small senior operation, named processes, written guarantee.
 * No fabricated headcount. Signal-density does the work of feeling bigger.
 */

const WhoIsGrowzilla: React.FC = () => (
  <section className="border-t border-white/[0.06]">
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-6">
        ◆ WHO IS GROWZILLA
      </div>
      <p className="text-lg text-white/80 leading-relaxed mb-5">
        A senior operator team running 30-day revenue sprints for Shopify brands. We do one
        thing — pull cash out of Klaviyo lists that have been left for dead — and we do it on a
        named process with a written guarantee.
      </p>
      <p className="text-white/64 leading-relaxed">
        Albert leads accounts. A copy chief reads every sequence aloud before it ships. A
        deliverability specialist runs the SPF/DKIM/DMARC audit. The math, the writing, the
        sending — all of it stays in-house. You talk to Albert. We talk to each other.
      </p>
    </div>
  </section>
);

export default WhoIsGrowzilla;
