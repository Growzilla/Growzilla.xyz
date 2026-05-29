'use client';

import { useEffect } from 'react';
import type { EmailQuizData } from '@/lib/email/types';

interface Props {
  data: EmailQuizData;
}

export default function ResultBad({ data }: Props) {
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
      <div className="mb-4 text-[11px] font-mono uppercase tracking-[0.22em] text-white/48">
        ◆ HONEST READ
      </div>
      <h1 className="font-display text-[28px] sm:text-[40px] leading-[1.08] text-white tracking-tight mb-3">
        Your list isn't ready yet —
        <br />
        <span className="text-white/72">and we'd rather tell you than sell you.</span>
      </h1>
      <p className="text-white/64 leading-relaxed mb-8 max-w-xl">
        The sprint pays off at 1,500+ dormant subscribers and $40+ AOV. If you're not there yet,
        the math doesn't justify the work. Come back when you are — we'll be here.
      </p>

      <div className="bg-zilla-surface border border-white/[0.08] rounded-lg p-6 mb-8">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-zilla-neon mb-3">
          ◆ WHAT TO DO IN THE MEANTIME
        </div>
        <ul className="text-sm text-white/72 leading-relaxed space-y-3">
          <li>
            <strong className="text-white">1.</strong> Check your inbox — we sent you a 1-page
            audit with the floor math and 5 deliverability checks you can run today.
          </li>
          <li>
            <strong className="text-white">2.</strong> Keep collecting emails. Aim for 1,500
            dormant + $40 AOV — that's the floor where the math starts paying.
          </li>
          <li>
            <strong className="text-white">3.</strong> Come back when you're there. The Floor
            Guarantee will still be standing.
          </li>
        </ul>
      </div>

      <p className="text-xs text-white/48 mt-8 text-center">
        Your audit PDF just hit <span className="text-white">{data.contact.email}</span>.
      </p>
    </div>
  );
}
