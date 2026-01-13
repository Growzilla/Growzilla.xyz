import React, { useEffect, useState } from 'react';

const EliteHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow from center-left */}
        <div className="absolute top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full bg-zilla-neon/5 blur-[150px]" />
        {/* Secondary glow */}
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-zilla-neon/3 blur-[120px]" />
        {/* Data flow lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-zilla-neon/40 to-transparent"
              style={{
                top: `${15 + i * 12}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 0.3}s`,
                opacity: 0.15 + (i % 3) * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-charcoal/50 border border-zilla-neon/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
              <span className="text-sm text-gray-300">Application-based access</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display">
              <span
                className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight transition-all duration-700 delay-200 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                Crush leaks.
              </span>
              <span
                className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zilla-neon leading-tight tracking-tight mt-2 transition-all duration-700 delay-400 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                Scale BIG
              </span>
            </h1>

            {/* Subheadline / Body Copy */}
            <div
              className={`mt-8 space-y-6 transition-all duration-700 delay-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl font-light">
                A new era is here in ecommerce. One-man and small teams are scaling faster than ever,
                keeping pace with and beating corporate giants.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                Traditional growth hits a ceiling. Hiring more people creates more complexity.
                The old playbook plateaus while costs keep climbing. Meanwhile, AI-powered
                operators are moving 10x faster with leaner teams.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                At Growzilla, we have cracked the AI code to make this leverage accessible.
                We are the exclusive community where experienced ecommerce builders plug into
                AI systems that think, decide, and execute like entire teams.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mt-10 transition-all duration-700 delay-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="#book-call"
                className="btn-zilla text-center text-lg px-8 py-4"
              >
                Book Your Review Call
              </a>
              <a
                href="/apply"
                className="btn-zilla-outline text-center text-lg px-8 py-4"
              >
                Apply to Join
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className={`mt-12 flex flex-wrap items-center gap-8 transition-all duration-700 delay-900 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zilla-charcoal border border-zilla-neon/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Vetted Members</p>
                  <p className="text-xs text-gray-500">Application required</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zilla-charcoal border border-zilla-neon/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">AI-Powered</p>
                  <p className="text-xs text-gray-500">Systems that scale</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendly Widget */}
          <div
            id="book-call"
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Glow effect behind widget */}
            <div className="absolute -inset-4 bg-zilla-neon/5 rounded-2xl blur-xl" />

            {/* Widget container */}
            <div className="relative bg-zilla-surface/80 backdrop-blur-sm rounded-2xl border border-zilla-neon/10 overflow-hidden">
              <div className="p-6 border-b border-gray-800/50">
                <h3 className="text-lg font-semibold text-white">Ecommerce AI Systems Review</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Discover how AI can transform your operations
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

export default EliteHero;
