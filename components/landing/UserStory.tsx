import React, { useEffect, useState, useRef } from 'react';

const UserStory: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-2xl bg-zilla-surface/50 border border-gray-800/50 p-8 lg:p-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Green left accent */}
          <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-zilla-neon/40" />

          {/* Corner badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-zilla-charcoal/80 border border-gray-700/50">
            <span className="text-[11px] text-gray-400 font-medium tracking-wide">Generalized User Story</span>
          </div>

          {/* Brand name */}
          <div className="flex items-center gap-3 mb-6">
            {/* Placeholder for brand logo */}
            <div className="w-10 h-10 rounded-lg bg-zilla-charcoal border border-gray-700/50 flex items-center justify-center">
              <span className="text-sm font-bold text-zilla-neon">N</span>
            </div>
            <div>
              <p className="text-white font-semibold">NuloSkincare</p>
              <p className="text-xs text-gray-500">DTC Skincare — Shopify Plus</p>
            </div>
          </div>

          {/* Story */}
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              NuloSkincare was spending <span className="text-white font-medium">$18,000/mo</span> on organic creator-led content and UGC across TikTok and Instagram. 12 creators, 40+ posts per month. Revenue was growing — but they had <span className="text-white font-medium">no idea which content actually converted</span>.
            </p>
            <p>
              They installed Growzilla. Within the first week, they could see exactly which creators and which hooks drove purchases — and which ones were burning budget.
            </p>
            <p className="text-gray-400">
              Removed 6 underperforming creators. Doubled ad spend on the 3 winners. Started iterating on the hooks that actually resonated.
            </p>
          </div>

          {/* Results */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'ROAS', value: '+142%', sub: 'Return on ad spend' },
              { label: 'Blended CAC', value: '-38%', sub: 'Cost per customer' },
              { label: 'Creator Revenue', value: '+67%', sub: 'In 60 days' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-zilla-black/50 border border-gray-800/30">
                <p className="text-2xl sm:text-3xl font-bold text-zilla-neon font-mono">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Closing line */}
          <p className="mt-6 text-gray-400 text-sm">
            They now know which content wins, iterate on proven hooks, and revenue keeps climbing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserStory;
