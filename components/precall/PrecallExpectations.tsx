import React from 'react';

const CALL_IS = [
  'A diagnosis of your current GTM',
  'Bottleneck identification — content, distribution, outbound, sales',
  'A clear yes / no on whether we can help',
  'If yes: how the partnership would run',
];

const CALL_ISNT = [
  'A 30-minute product pitch',
  'Pressure to buy on the call',
  'Generic “growth tips” with no ownership',
];

const PrecallExpectations: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-zilla-neon/80 mb-3">
          The call
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
          What happens on the call
        </h2>
        <p className="text-sm text-white/50 mb-8 max-w-xl leading-relaxed">
          If this still feels relevant after the video, the meeting is about{' '}
          <span className="text-white/70">your company</span> — not a presentation.
        </p>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-medium tracking-wide uppercase text-white/40 mb-4">
              We will
            </h3>
            <ul className="space-y-3">
              {CALL_IS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                  <span className="text-zilla-neon shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium tracking-wide uppercase text-white/40 mb-4">
              We won&apos;t
            </h3>
            <ul className="space-y-3">
              {CALL_ISNT.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/45">
                  <span className="text-white/25 shrink-0 mt-0.5">×</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrecallExpectations;
