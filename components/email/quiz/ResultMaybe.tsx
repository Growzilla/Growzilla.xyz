'use client';

import { useEffect } from 'react';
import type { EmailQuizData } from '@/lib/email/types';
import { trackEmailBookCall } from '@/lib/email/pixel';

interface Props {
  data: EmailQuizData;
  floorUsd: number;
}

function fmtUsd(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function ResultMaybe({ data, floorUsd }: Props) {
  const calendlyUrl = 'https://calendly.com/albert-elmgart/ecommerce-ai-systems-review';
  const waMsg = encodeURIComponent(
    `Hi Albert — I just took the audit on growzilla.xyz/email. My numbers came back borderline. ${data.contact.brand}, list ${(data.listSize ?? 0).toLocaleString()}, AOV ${fmtUsd(data.aov ?? 0)}. Wanted to talk through it.`,
  );
  const waHref = `https://wa.me/46725597280?text=${waMsg}`;

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
      <h1 className="font-display text-[28px] sm:text-[40px] leading-[1.08] text-white tracking-tight mb-3">
        {fmtUsd(floorUsd)} on the table —
        <br />
        <span className="text-white/72">but your numbers are borderline.</span>
      </h1>
      <p className="text-white/64 leading-relaxed mb-8 max-w-xl">
        Your list size or AOV is on the edge of where this sprint pays off. We don't push people
        into something the math doesn't justify. Let's talk before money moves.
      </p>

      <div className="bg-zilla-surface border border-white/[0.08] rounded-lg p-6 mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/48 mb-3">
          ◆ WHAT WE'D ACTUALLY DO
        </div>
        <ul className="text-sm text-white/72 leading-relaxed space-y-2">
          <li>· Walk through your Klaviyo together on a 15-min call</li>
          <li>· Tell you straight whether this sprint or the Reactivation Vault is the right fit</li>
          <li>· If neither, we say so — and you keep the audit PDF we just sent.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEmailBookCall()}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-zilla-neon text-zilla-black font-semibold px-6 py-4 rounded-md hover:bg-zilla-glow transition-all duration-200"
        >
          Book a 15-min call →
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] border border-white/[0.12] text-white font-medium px-6 py-4 rounded-md hover:border-zilla-neon/40 hover:bg-white/[0.06] transition"
        >
          WhatsApp Albert
        </a>
      </div>

      <p className="text-xs text-white/48 mt-8 text-center">
        Your audit PDF just hit <span className="text-white">{data.contact.email}</span>.
      </p>
    </div>
  );
}
