'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { EmailQuizData, GrowthStrategy } from '@/lib/email/types';
import { trackEmailBookCall } from '@/lib/email/pixel';

interface Props {
  data: EmailQuizData;
  floorUsd: number;
}

const STRATEGY_FRAMES: Record<GrowthStrategy, { line: string; sub: string }> = {
  'paid-ads': {
    line: 'Paid ads return 1.5–3× over 60–90 days.',
    sub: 'Reactivation returns 20–40× in 30 days from a list you already own. Run them together — but reactivation pays for the ads.',
  },
  'organic-social': {
    line: 'Content compounds slowly.',
    sub: 'Reactivation prints cash this month and funds the content runway.',
  },
  'influencers': {
    line: 'Influencer CAC is climbing.',
    sub: 'Reactivation has zero acquisition cost — they already bought once.',
  },
  'seo': {
    line: 'SEO is a 6–18 month bet.',
    sub: 'Reactivation pays in 30 days. Stack them — don\'t pick.',
  },
  'reactivation': {
    line: 'Good. You already know.',
    sub: 'The only question is whether your current sequence is leaving 60–80% on the table. Let\'s check.',
  },
  'multiple': {
    line: 'Most brands stack 3+ channels and starve the one with the highest 30-day ROI.',
    sub: 'Reactivation is almost always that one.',
  },
};

function fmtUsd(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function ResultGood({ data, floorUsd }: Props) {
  const strategy = data.growthStrategy ?? 'multiple';
  const frame = STRATEGY_FRAMES[strategy];
  const calendlyUrl = 'https://calendly.com/albert-elmgart/ecommerce-ai-systems-review';
  const waMsg = encodeURIComponent(
    `Hi Albert — I just took the audit on growzilla.xyz/email. My floor came back at ${fmtUsd(
      floorUsd,
    )}. ${data.contact.brand}, list of ${(data.listSize ?? 0).toLocaleString()}, AOV ${fmtUsd(data.aov ?? 0)}. Want to chat before I commit.`,
  );
  const waHref = `https://wa.me/46725597280?text=${waMsg}`;

  // Fire lead-magnet send on mount (fire-and-forget; user sees CTAs either way)
  useEffect(() => {
    void fetch('/api/email/lead-magnet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contact: data.contact,
        listSize: data.listSize,
        aov: data.aov,
        temp: data.temp,
      }),
    }).catch(() => {});
  }, [data]);

  return (
    <div className="w-full">
      <div className="mb-4 text-[11px] font-mono uppercase tracking-[0.22em] text-zilla-neon">
        ◆ YOUR FLOOR · {data.contact.brand.toUpperCase()}
      </div>
      <h1 className="font-display text-[32px] sm:text-[44px] leading-[1.05] text-white tracking-tight mb-3">
        {fmtUsd(floorUsd)} sitting on your list,
        <br />
        <span className="text-zilla-neon">recoverable in 30 days.</span>
      </h1>
      <p className="text-white/64 leading-relaxed mb-8 max-w-xl">
        Anchored to Klaviyo's 2025 lower-bound reactivation rate applied to your {(data.listSize ?? 0).toLocaleString()} dormant subscribers and {fmtUsd(data.aov ?? 0)} AOV. Real result usually higher.
      </p>

      <div className="bg-zilla-surface border border-zilla-neon/30 rounded-lg p-6 mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/48 mb-2">
          You said: {STRATEGY_LABEL[strategy]}
        </div>
        <p className="text-white/85 leading-relaxed mb-2">{frame.line}</p>
        <p className="text-sm text-white/64 leading-relaxed">{frame.sub}</p>
      </div>

      <div className="bg-gradient-to-br from-zilla-surface to-zilla-charcoal border border-zilla-neon/30 rounded-lg p-6 mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-zilla-neon mb-2">
          ◆ THE FLOOR GUARANTEE
        </div>
        <p className="text-white/85 leading-relaxed text-sm">
          $500 setup + 10% of recovered revenue. If 30 days end and Klaviyo-attributed revenue
          hasn't hit <span className="text-zilla-neon font-medium">{fmtUsd(floorUsd)}</span>, we
          keep building until it does. No new invoice.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Link
          href="/email/buy"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-zilla-neon text-zilla-black font-semibold px-6 py-4 rounded-md hover:bg-zilla-glow transition-all duration-200"
        >
          Lock my slot — $500 →
        </Link>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEmailBookCall()}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.12] text-white font-medium px-6 py-4 rounded-md hover:border-zilla-neon/40 hover:bg-white/[0.06] transition"
        >
          Book a 15-min call
        </a>
      </div>

      <div className="text-center">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-white/64 hover:text-zilla-neon transition"
        >
          or message Albert on WhatsApp →
        </a>
      </div>

      <p className="text-xs text-white/48 mt-8 text-center">
        We just emailed your audit to <span className="text-white">{data.contact.email}</span>.
      </p>
    </div>
  );
}

const STRATEGY_LABEL: Record<GrowthStrategy, string> = {
  'paid-ads': 'Paid ads',
  'organic-social': 'Organic social / content',
  'influencers': 'Influencers / UGC',
  'seo': 'SEO',
  'reactivation': 'Email reactivation',
  'multiple': 'Multiple / not sure',
};
