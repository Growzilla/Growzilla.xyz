import React, { useEffect, useState, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Tag Your Content',
    description:
      'Create tracking links in Growzilla. Define your hook, content type, creator, and CTA. Get a custom link in seconds.',
    example: {
      label: 'Hook #103',
      text: '"All my friends started asking about my skincare routine after I used [product]"',
    },
    screenshotLabel: 'Link creation UI',
    screenshot: null,
  },
  {
    number: '02',
    title: 'Paste & Publish',
    description:
      'Give the link to your creator or paste it in your content. Works with TikTok, Instagram, YouTube, Meta Ads — any platform.',
    example: null,
    screenshotLabel: 'Content with tracking link',
    screenshot: null,
  },
  {
    number: '03',
    title: 'See What Converts',
    description:
      'Growzilla reads your Shopify store data and shows exactly which content drove sales. Full Sankey diagram: Channel → Creator → Content Type → Product → Revenue.',
    example: null,
    screenshotLabel: 'Attribution Sankey view',
    screenshot: '/images/screenshot-attribution.png',
  },
];

const HowItWorks: React.FC = () => {
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
    <section id="how-it-works" ref={ref} className="relative py-20 lg:py-28 overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Three Steps to Content Attribution
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Create your campaign. Tag your content. See which hooks, creators, and formats actually drive revenue.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Copy side */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zilla-neon/10 border border-zilla-neon/30 flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-zilla-neon">{step.number}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">{step.description}</p>

                {step.example && (
                  <div className="p-4 rounded-lg bg-zilla-black/60 border border-gray-800/50 font-mono">
                    <p className="text-xs text-zilla-neon mb-1">{step.example.label}</p>
                    <p className="text-sm text-gray-300 italic">{step.example.text}</p>
                  </div>
                )}
              </div>

              {/* Screenshot placeholder side */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative rounded-xl bg-zilla-surface/50 border border-gray-800/50 overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-800/30">
                    <div className="w-2 h-2 rounded-full bg-gray-700" />
                    <div className="w-2 h-2 rounded-full bg-gray-700" />
                    <div className="w-2 h-2 rounded-full bg-gray-700" />
                  </div>

                  {/* Screenshot or placeholder */}
                  <div className="aspect-[16/10] flex items-center justify-center bg-zilla-charcoal/20">
                    {step.screenshot ? (
                      <img
                        src={step.screenshot}
                        alt={step.screenshotLabel}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="border-2 border-dashed border-gray-700/60 rounded-lg m-4 flex-1 h-[calc(100%-32px)] flex flex-col items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-[11px] text-gray-600 font-mono">{step.screenshotLabel}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
