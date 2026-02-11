import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const EliteTeam: React.FC = () => {
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
      id="team"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full bg-zilla-neon/3 blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            Who We Are
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            The Team
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Small team. Direct access. We work with you personally.
          </p>
        </div>

        {/* Team Members — 2-col featured layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Albert — Lead */}
          <div
            className={`group relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative p-8 rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300 h-full">
              {/* Photo */}
              <div className="relative w-full aspect-[4/3] rounded-xl bg-zilla-charcoal mb-6 overflow-hidden">
                <Image
                  src="/images/team/albert.png"
                  alt="Albert Elmgart"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-1">Albert Elmgart</h3>
              <p className="text-sm text-zilla-neon mb-4">Revenue Systems & Attribution</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Works directly with operators to understand how their business runs, where signal is lost, and where leverage can be created. Focused on translating real workflows into structured, high-impact systems.
              </p>
            </div>
          </div>

          {/* Shaoxuan — Engineering */}
          <div
            className={`group relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="relative p-8 rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-all duration-300 h-full">
              {/* Photo */}
              <div className="relative w-full aspect-[4/3] rounded-xl bg-zilla-charcoal mb-6 overflow-hidden">
                <Image
                  src="/images/team/frank.png"
                  alt="Frank Yin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-zilla-neon/0 group-hover:bg-zilla-neon/5 transition-colors duration-300" />
              </div>

              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-semibold text-white">Frank Yin</h3>
                <a
                  href="https://ohao.tech/@qervas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-zilla-neon transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-zilla-neon mb-4">Systems & Engineering</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Master&apos;s in AI. Focused on model logic and production-grade system architecture. Built and shipped multiple applied AI systems for ecommerce environments.
              </p>
            </div>
          </div>
        </div>

        {/* Supporting line */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Supported by a network of domain specialists across data, ecommerce, and growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EliteTeam;
