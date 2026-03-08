import React, { useEffect, useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full bg-zilla-neon/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-zilla-neon/3 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy + Form */}
          <div
            className={`transition-all duration-1000 delay-100 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-charcoal/50 border border-zilla-neon/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
              <span className="text-sm text-gray-300">Shopify Content Attribution</span>
            </div>

            {/* Headline */}
            <h1 className="font-display">
              <span
                className={`block text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight transition-all duration-700 delay-200 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                See Which Content
              </span>
              <span
                className={`block text-4xl sm:text-5xl md:text-6xl font-bold text-zilla-neon leading-[1.1] tracking-tight mt-1 transition-all duration-700 delay-400 ${
                  mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                Actually Converts.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg transition-all duration-700 delay-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Growzilla shows Shopify brands exactly which creator content, UGC, and ads drive real sales — not vanity metrics. One dashboard. Full attribution.
            </p>

            {/* Lead Capture Form */}
            <div
              className={`mt-8 max-w-md transition-all duration-700 delay-700 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <LeadCaptureForm variant="hero" />
            </div>
          </div>

          {/* Right — Dashboard Preview Placeholder */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute -inset-4 bg-zilla-neon/5 rounded-2xl blur-xl" />

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

              {/* Dashboard screenshot */}
              <div className="relative aspect-[16/10] bg-zilla-charcoal/30">
                <img
                  src="/images/screenshot-attribution.png"
                  alt="Growzilla attribution dashboard showing Sankey diagram and cone funnel"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
