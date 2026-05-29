import React from 'react';

/**
 * Slot counter — renders the real number of founding-rate slots remaining.
 * Backed by `EMAIL_SLOTS_REMAINING` env var (decremented manually after each sale,
 * read server-side in pages/email.tsx via getStaticProps with revalidate=60).
 *
 * Honesty rule: if a slot count appears on the page, it MUST be the real number.
 * No JS timers, no per-visit fakery (Erik's reason #3 not-to-buy).
 */

interface Props {
  slotsRemaining: number;
  anchorPrice?: number;
  foundingPrice?: number;
}

const SlotCounter: React.FC<Props> = ({
  slotsRemaining,
  anchorPrice = 625,
  foundingPrice = 500,
}) => {
  if (slotsRemaining <= 0) {
    return (
      <div className="inline-flex items-center gap-2 text-xs font-mono text-white/48">
        <span className="w-2 h-2 rounded-full bg-white/24" />
        Founding rate filled — standard rate ${anchorPrice}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-xs font-mono">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-zilla-neon opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-zilla-neon" />
      </span>
      <span className="text-white/72">
        <span className="text-zilla-neon font-medium">{slotsRemaining}</span> of 5 founding slots
        left at{' '}
        <span className="line-through text-white/32">${anchorPrice}</span>{' '}
        <span className="text-white font-medium">${foundingPrice}</span>
      </span>
    </div>
  );
};

export default SlotCounter;
