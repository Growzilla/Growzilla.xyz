import React, { useEffect, useState, useRef } from 'react';

const BookInstall: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="book-call" ref={ref} className="relative py-20 lg:py-28 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Copy */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
              Free Install Call
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Book Your Free Install
            </h2>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              15 minutes. We&apos;ll connect Growzilla to your Shopify store live on the call.
              You&apos;ll see your first attribution data before we hang up.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Live store connection on the call',
                'See your first content attribution data',
                'We handle all the setup — you just watch',
                'No commitment. No pitch.',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-zilla-neon/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-sm text-gray-500">
                Prefer to self-serve? Fill in the form above and we&apos;ll send you install instructions.
              </p>
              <p className="text-sm text-gray-500">
                Questions?{' '}
                <a href="mailto:contact@growzilla.xyz" className="text-zilla-neon hover:underline">
                  contact@growzilla.xyz
                </a>
              </p>
            </div>
          </div>

          {/* Right - Calendly Widget */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute -inset-4 bg-zilla-neon/5 rounded-2xl blur-xl" />

            <div className="relative bg-zilla-surface/80 backdrop-blur-sm rounded-2xl border border-zilla-neon/10 overflow-hidden">
              <div className="p-6 border-b border-gray-800/50">
                <h3 className="text-lg font-semibold text-white">Book Your Free Install Call</h3>
                <p className="text-sm text-gray-400 mt-1">
                  15 minutes. Live setup. See data instantly.
                </p>
              </div>

              {/* Calendly inline widget */}
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/albert-elmgart/ecommerce-ai-systems-review"
                style={{ minWidth: '320px', height: '650px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookInstall;
