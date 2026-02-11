import React, { useEffect, useState, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Strategy Call',
    description:
      'We review your current setup, tracking gaps, and revenue constraints. You walk away with clarity—whether you work with us or not.',
    detail: '30-minute call',
  },
  {
    number: '02',
    title: 'Connect Your Stack',
    description:
      'We connect your Shopify, ad platforms, email tools, and analytics into a unified view. Takes 15 minutes with your permission.',
    detail: 'One-click integrations',
  },
  {
    number: '03',
    title: 'Diagnose & Scope',
    description:
      'Within 48 hours: a clear map of where revenue is leaking and a scoped plan to fix it. Prioritized by expected impact.',
    detail: 'Delivered in 48 hours',
  },
  {
    number: '04',
    title: 'Build & Implement',
    description:
      'We build the systems with you. Not a report—working infrastructure that scales. Ongoing partnership, month-to-month.',
    detail: 'Ongoing partnership',
  },
];

const EliteHowItWorks: React.FC = () => {
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            The Process
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            From Call to Results in 2 Weeks
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We move fast. No 6-month onboarding, no endless discovery phases.
            You see your first analysis within 48 hours of connecting your tools.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zilla-neon/30 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="relative p-6 lg:p-8 rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-colors duration-300 h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-zilla-neon/10 border border-zilla-neon/30 mb-6">
                    <span className="font-display text-2xl font-bold text-zilla-neon">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <span className="text-xs text-zilla-neon/70 uppercase tracking-wider font-medium">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteHowItWorks;
