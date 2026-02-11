import React, { useEffect, useState, useRef } from 'react';

const ProofSection: React.FC = () => {
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
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[600px] rounded-full bg-zilla-neon/3 blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            Proof of Execution
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            What We&apos;ve Built
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Real systems. Shipped and running.
          </p>
        </div>

        {/* Proof Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CreatorBrands.xyz */}
          <div
            className={`group relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300 overflow-hidden h-full">
              {/* Screenshot area */}
              <div className="relative aspect-[16/10] bg-zilla-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zilla-charcoal to-zilla-graphite" />
                {/* Browser chrome mockup */}
                <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2 bg-zilla-black/50">
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <span className="ml-2 text-[10px] text-gray-600 font-mono">creatorbrands.xyz</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-white">CreatorBrands.xyz</p>
                    <p className="text-xs text-gray-500 mt-1">AI Product Launch Assistant</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">CreatorBrands.xyz</h3>
                  <a
                    href="https://creatorbrands.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-zilla-neon hover:underline"
                  >
                    Live demo
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  AI-powered product launch assistant built for creators. Analyzes creator profiles and generates tailored product launch recommendations. Built, tested, and running with real users.
                </p>
              </div>
            </div>
          </div>

          {/* Internal Tools */}
          <div
            className={`group relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="relative rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300 overflow-hidden h-full">
              {/* Screenshot area — internal tools */}
              <div className="relative aspect-[16/10] bg-zilla-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zilla-charcoal to-zilla-graphite" />
                <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-3 py-2 bg-zilla-black/50">
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <div className="w-2 h-2 rounded-full bg-gray-700" />
                  <span className="ml-2 text-[10px] text-gray-600 font-mono">internal dashboard</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-white">Attribution Dashboard</p>
                    <p className="text-xs text-gray-500 mt-1">Revenue visibility tooling</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Internal Revenue Systems</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Custom attribution dashboards, funnel analysis tools, and automated reporting systems. The same infrastructure we deploy for clients—built in-house, battle-tested.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial / review placeholder */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-500 text-sm">
            Client case studies and references available on request.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
