'use client';

import Link from 'next/link';

const ANGLES = [
  'Present till mamma under 500 kr',
  'Bundle med begränsad Mors dag-rabatt',
  'Sista chansen innan leveransdeadline',
  'Presentkort för sena köpare',
  'Kundfavoriter som mamma faktiskt använder',
];

export default function ResultBad() {
  return (
    <div className="w-full">
      <div className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-white/55">
        Inte just nu
      </div>
      <h1 className="font-display text-[32px] sm:text-[44px] leading-[1.05] text-white tracking-tight">
        Det här är troligen inte rätt kampanj just nu.
      </h1>
      <p className="mt-5 text-[15px] sm:text-base text-white/70 leading-relaxed max-w-xl">
        För att Morsdag Launch ska fungera behöver butiken redan ha efterfrågan, leveranskapacitet
        och budget för både setup och annonsering.
      </p>

      <h2 className="mt-12 text-[15px] sm:text-base text-white font-medium">
        Vill ni ändå göra något enkelt själva? Här är 5 snabba Mors dag-vinklar:
      </h2>

      <ol className="mt-6">
        {ANGLES.map((angle, i) => (
          <li
            key={angle}
            className="flex items-start gap-4 py-4 border-t border-white/[0.08] last:border-b"
          >
            <span className="flex-shrink-0 w-7 text-center font-mono text-xs uppercase tracking-wider text-morsdag-rose pt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-[15px] text-white/85 leading-snug">{angle}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10">
        <Link
          href="/morsdag"
          className="text-sm text-white/55 hover:text-white transition-colors"
        >
          Tillbaka till erbjudandet
        </Link>
      </div>
    </div>
  );
}
