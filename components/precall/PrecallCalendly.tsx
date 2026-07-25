import React, { useEffect } from 'react';

const CALENDLY_URL =
  'https://calendly.com/nourshibli01/30min?background_color=0a0a0b&text_color=ffffff&primary_color=00ff94';

const MICRO = [
  'Pick a slot you can actually keep',
  'Accept the invite when it hits your inbox',
  'If a partner needs to decide, book a time they can join',
];

const PrecallCalendly: React.FC = () => {
  useEffect(() => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section id="book" className="py-10 sm:py-14 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-zilla-neon/80 mb-3">
            Fit call
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            If this feels like the missing piece, let&apos;s talk
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            30 minutes. Simple frame: what you&apos;re doing now, what you want from LinkedIn,
            and whether we can help you toward 5–10 qualified meetings a week — honestly.
            Not a pitch. Diagnosis first.
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-white/[0.08] bg-zilla-surface p-4 sm:p-5">
          <p className="text-xs font-medium tracking-wide uppercase text-white/40 mb-3">
            When you book
          </p>
          <ul className="grid sm:grid-cols-3 gap-3">
            {MICRO.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-zilla-neon shrink-0 mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-zilla-surface overflow-hidden p-1 sm:p-2">
          <div
            className="calendly-inline-widget w-full"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

        <p className="mt-6 text-center text-xs text-white/35 max-w-lg mx-auto leading-relaxed">
          Prefer not to book yet? Re-watch the system section. If you&apos;re ready, grab a
          time — we&apos;ll tell you straight if it&apos;s a fit.
        </p>
      </div>
    </section>
  );
};

export default PrecallCalendly;
