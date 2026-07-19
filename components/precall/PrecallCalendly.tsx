import React, { useEffect } from 'react';

const CALENDLY_URL =
  'https://calendly.com/nourshibli01/30min?background_color=0a0a0b&text_color=ffffff&primary_color=00ff94';

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
            Book
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Book your strategy call
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto">
            30 minutes with Nour. We analyze your situation, find the bottlenecks, and decide
            if we can help — honestly.
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-zilla-surface overflow-hidden p-1 sm:p-2">
          <div
            className="calendly-inline-widget w-full"
            data-url={CALENDLY_URL}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

        <p className="mt-6 text-center text-xs text-white/35">
          No homework required. Show up having watched the video if you can.
        </p>
      </div>
    </section>
  );
};

export default PrecallCalendly;
