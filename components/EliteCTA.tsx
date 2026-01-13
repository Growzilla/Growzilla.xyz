import React, { useEffect, useState, useRef } from 'react';

const EliteCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        {/* Intense green glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-zilla-neon/8 blur-[150px]" />
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
              Limited Spots Available
            </span>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Ready to Crush Leaks{' '}
              <span className="text-zilla-neon">and Scale BIG?</span>
            </h2>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Stop bleeding revenue to inefficiency. Stop watching competitors scale while you grind.
              Book a review call to see exactly how AI systems can transform your ecommerce operations.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Personalized AI systems assessment',
                'Identify your biggest leverage opportunities',
                'Clear roadmap to implementation',
                'No obligation, no hard sell',
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

            <div className="mt-10 p-6 rounded-xl bg-zilla-charcoal/30 border border-gray-800/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-zilla-neon/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">Why application-based?</h4>
                  <p className="text-sm text-gray-400">
                    We maintain a curated community of serious operators. This ensures meaningful connections,
                    relevant conversations, and shared breakthroughs that actually apply to your situation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500">
                Questions? Reach out directly:{' '}
                <a href="mailto:contact@growzilla.xyz" className="text-zilla-neon hover:underline">
                  contact@growzilla.xyz
                </a>
              </p>
            </div>
          </div>

          {/* Right - Calendly Widget */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Glow effect behind widget */}
            <div className="absolute -inset-4 bg-zilla-neon/5 rounded-2xl blur-xl" />

            {/* Widget container */}
            <div className="relative bg-zilla-surface/80 backdrop-blur-sm rounded-2xl border border-zilla-neon/10 overflow-hidden">
              <div className="p-6 border-b border-gray-800/50">
                <h3 className="text-lg font-semibold text-white">Book Your Review Call</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Select a time that works for you
                </p>
              </div>

              {/* Calendly inline widget */}
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/albert-elmgart/ecommerce-ai-systems-review"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteCTA;
