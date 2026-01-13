import React, { useEffect, useState, useRef } from 'react';

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Move 10x Faster',
    description: 'AI systems handle analysis, reporting, and execution while you focus on strategy. What took weeks now takes hours.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Beat Conglomerates',
    description: 'Access the same AI capabilities that billion-dollar companies use. Level the playing field without the enterprise budget.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Data-Backed Moves',
    description: 'Stop guessing. Every decision backed by real-time data analysis. Know exactly what is working and why.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Shared AI Breakthroughs',
    description: 'When one member discovers a winning AI workflow, everyone benefits. Collective intelligence accelerates everyone.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Automated Operations',
    description: 'Inventory, customer service, marketing optimization all run on autopilot. Your business scales while you sleep.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Exponential ROI',
    description: 'Members report transformative results. Revenue that seemed impossible becomes the new baseline.',
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
      id="community"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        {/* Green glow for solution section */}
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
            The Solution
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Plug Into AI Leverage With{' '}
            <span className="text-zilla-neon">Growzilla</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are an exclusive community of experienced ecommerce builders who use AI as entire teams.
            Data-driven decisions, automated operations, and collaborative scaling that members describe as
            their &ldquo;holy hell&rdquo; growth moment. This is how you democratize what the giants have.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group relative p-6 lg:p-8 rounded-2xl bg-zilla-surface/50 border border-zilla-neon/10 hover:border-zilla-neon/30 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-500" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center text-zilla-neon mb-5 group-hover:scale-110 group-hover:shadow-zilla-glow transition-all duration-300">
                  {benefit.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transformation callout */}
        <div
          className={`mt-20 relative rounded-2xl border border-zilla-neon/20 bg-gradient-to-br from-zilla-surface/80 to-zilla-charcoal/50 p-8 lg:p-12 overflow-hidden transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-zilla-neon/10 rounded-full blur-[100px]" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                Your Transformer Moment
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Every member has a story about the moment everything changed. When the AI systems clicked into place
                and suddenly operations that consumed their weeks now ran autonomously. When decisions that felt like
                gambles became data-backed certainties. When competing with giants felt achievable.
              </p>
              <p className="text-gray-300">
                This is not incremental improvement. This is a fundamental shift in what is possible for
                your ecommerce business.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zilla-black/50 border border-gray-800/50">
                <div className="w-12 h-12 rounded-full bg-zilla-neon/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-zilla-neon">1</span>
                </div>
                <div>
                  <p className="font-medium text-white">Apply for Access</p>
                  <p className="text-sm text-gray-500">Vetted membership ensures quality</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zilla-black/50 border border-gray-800/50">
                <div className="w-12 h-12 rounded-full bg-zilla-neon/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-zilla-neon">2</span>
                </div>
                <div>
                  <p className="font-medium text-white">Join the Community</p>
                  <p className="text-sm text-gray-500">Connect with elite builders</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zilla-black/50 border border-gray-800/50">
                <div className="w-12 h-12 rounded-full bg-zilla-neon/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-xl text-zilla-neon">3</span>
                </div>
                <div>
                  <p className="font-medium text-white">Deploy AI Systems</p>
                  <p className="text-sm text-gray-500">Transform your operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteSolution;
