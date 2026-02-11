import React, { useEffect, useState, useRef } from 'react';

const capabilities = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Install Clean Attribution',
    description: 'We connect your tools and set up proper tracking across the full funnel. One source of truth for every dollar spent and earned.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Identify Revenue Constraints',
    description: 'Continuous analysis to find exactly where revenue is leaking or stuck. Not a one-time audit—ongoing visibility.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    title: 'Build Systems to Fix It',
    description: 'Not just a report. We scope and build structured interventions—tracking fixes, funnel repairs, attribution corrections.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Scale What Works',
    description: 'Systems that compound. As your business grows, the infrastructure grows with it. No rebuilding from scratch at each stage.',
  },
];

const EliteSolution: React.FC = () => {
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
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden scroll-mt-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[800px] h-[800px] rounded-full bg-zilla-neon/5 blur-[200px]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] rounded-full bg-zilla-neon/3 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            How We Work
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Revenue Systems.{' '}
            <span className="text-zilla-neon">Built With You.</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We install proper attribution, find where revenue is constrained, and build the systems to fix it.
            Not an agency. Not a SaaS tool. A systems partner that works alongside you.
          </p>
        </div>

        {/* Capabilities Grid — 2x2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={cap.title}
              className={`group relative p-6 lg:p-8 rounded-2xl bg-zilla-surface/50 border border-zilla-neon/10 hover:border-zilla-neon/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-500" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center text-zilla-neon mb-5 group-hover:scale-110 group-hover:shadow-zilla-glow transition-all duration-300">
                  {cap.icon}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Process callout */}
        <div
          className={`mt-20 relative rounded-2xl border border-zilla-neon/20 bg-gradient-to-br from-zilla-surface/80 to-zilla-charcoal/50 p-8 lg:p-12 overflow-hidden transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-zilla-neon/10 rounded-full blur-[100px]" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                What This Looks Like in Practice
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                We start with a strategy call to understand your business—your stack, your constraints, where signal is getting lost.
                If there&apos;s a fit, we connect your tools, run our analysis, and deliver a scoped plan within 48 hours.
              </p>
              <p className="text-gray-300">
                From there, we build and implement with you. Month-to-month. Results or you leave.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { num: '1', title: 'Strategy Call', desc: 'Review your setup, tracking gaps, and revenue constraints' },
                { num: '2', title: 'Connect & Analyze', desc: 'We connect your tools and run full-funnel analysis' },
                { num: '3', title: 'Build & Implement', desc: 'Scoped systems work—not a report, working infrastructure' },
              ].map((step) => (
                <div key={step.num} className="flex items-center gap-4 p-4 rounded-xl bg-zilla-black/50 border border-gray-800/50">
                  <div className="w-12 h-12 rounded-full bg-zilla-neon/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl text-zilla-neon">{step.num}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteSolution;
