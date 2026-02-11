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
        <div className="absolute top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full bg-zilla-neon/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-zilla-neon/3 blur-[120px]" />
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
              <span className="text-sm text-gray-300">Revenue Systems & Attribution for Ecommerce</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display">
              <span
                className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-200 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                We Install Revenue Visibility.
              </span>
              <span
                className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zilla-neon leading-tight tracking-tight mt-3 transition-all duration-700 delay-400 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                Then Build the Systems to Scale It.
              </span>
            </h1>

            {/* Subheadline */}
            <div
              className={`mt-8 space-y-4 transition-all duration-700 delay-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl font-light">
                We go into your business, set up clean tracking across the full funnel, identify exactly where revenue is leaking, and build the systems to fix it.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                Not a dashboard. Not a report. Hands-on systems work for Shopify operators doing $500K–$30M.
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
                Book a Strategy Call
              </a>
              <a
                href="#how-it-works"
                className="btn-zilla-outline text-center text-lg px-8 py-4"
              >
                See How We Work
              </a>
              <a
                href="/tools/brand-intelligence"
                className="text-center text-lg px-8 py-4 text-zilla-neon hover:text-white transition-colors font-medium"
              >
                Free Brand Analysis →
              </a>
            </div>

            {/* Trust chips */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-3 transition-all duration-700 delay-900 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {['Shopify Focused', 'Attribution & Funnel Analysis', 'Systems That Scale'].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-charcoal/40 border border-gray-800/50 text-sm text-gray-400"
                >
                  <svg className="w-3.5 h-3.5 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Product Preview */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Glow effect behind preview */}
            <div className="absolute -inset-4 bg-zilla-neon/5 rounded-2xl blur-xl" />

            {/* Dashboard preview container */}
            <div className="relative bg-zilla-surface/80 backdrop-blur-sm rounded-2xl border border-zilla-neon/10 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                  <div className="w-3 h-3 rounded-full bg-gray-700" />
                </div>
                <div className="flex-1 ml-3">
                  <div className="bg-zilla-charcoal/60 rounded-md px-3 py-1.5 text-xs text-gray-500 font-mono max-w-xs">
                    growzilla.xyz/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="p-6 space-y-4">
                {/* Top stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Attributed Revenue', value: '$142,380', change: '+12.4%' },
                    { label: 'Funnel Leakage', value: '3 found', change: 'Action needed' },
                    { label: 'ROAS (true)', value: '4.2x', change: '+0.8x' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-zilla-charcoal/40 rounded-lg p-3 border border-gray-800/30">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</p>
                      <p className="text-lg font-semibold text-white mt-1 font-mono">{stat.value}</p>
                      <p className="text-xs text-zilla-neon mt-0.5">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="bg-zilla-charcoal/40 rounded-lg p-4 border border-gray-800/30">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Revenue by Channel (attributed)</p>
                    <p className="text-xs text-gray-600">Last 30 days</p>
                  </div>
                  {/* Simplified bar chart */}
                  <div className="space-y-2">
                    {[
                      { channel: 'Meta Ads', width: '78%', value: '$68.2K' },
                      { channel: 'Google', width: '52%', value: '$45.1K' },
                      { channel: 'Klaviyo', width: '34%', value: '$22.8K' },
                      { channel: 'Organic', width: '18%', value: '$6.3K' },
                    ].map((bar) => (
                      <div key={bar.channel} className="flex items-center gap-3">
                        <span className="text-[11px] text-gray-500 w-16 flex-shrink-0">{bar.channel}</span>
                        <div className="flex-1 bg-zilla-black/50 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-zilla-neon/60 to-zilla-neon rounded-full"
                            style={{ width: bar.width }}
                          />
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono w-14 text-right">{bar.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert row */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-amber-300">Revenue Leak Detected</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Cart→Checkout drop-off up 23% on mobile. Estimated $4,200/mo impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteHero;
