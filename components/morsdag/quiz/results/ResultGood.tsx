'use client';

import Link from 'next/link';

export default function ResultGood() {
  return (
    <div className="w-full">
      <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-morsdag-rose">
        <RoseCheck />
        Stark fit
      </div>
      <h1 className="font-display text-[32px] sm:text-[44px] leading-[1.05] text-white tracking-tight">
        Ni ser ut som en stark fit.
      </h1>
      <p className="mt-5 text-[15px] sm:text-base text-white/70 leading-relaxed max-w-xl">
        Baserat på era svar kan en Morsdag Launch vara relevant. Nästa steg är att boka en snabb
        genomgång så vi kan välja erbjudande, kanalplan och launch-timing.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="https://calendly.com/YOUR-LINK-HERE/morsdag-launch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-morsdag-rose text-morsdag-ink font-medium text-sm rounded-full px-6 py-3 hover:bg-morsdag-blush transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-morsdag-rose/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Boka genomgång
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        <Link
          href="/morsdag"
          className="text-sm text-white/55 hover:text-white transition-colors px-2 py-2"
        >
          Tillbaka till erbjudandet
        </Link>
      </div>
    </div>
  );
}

function RoseCheck() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-morsdag-rose/60 text-morsdag-rose"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
