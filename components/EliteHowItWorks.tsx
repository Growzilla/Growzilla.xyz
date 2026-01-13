import React, { useEffect, useState, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Apply',
    description:
      'Submit your application with details about your ecommerce experience and goals. We review every application to ensure community quality.',
    detail: 'Application takes 5 minutes',
  },
  {
    number: '02',
    title: 'Review Call',
    description:
      'Book a strategy call to discuss your business, current challenges, and how AI systems could transform your operations.',
    detail: 'Personalized assessment',
  },
  {
    number: '03',
    title: 'Join',
    description:
      'Approved members get immediate access to the community, AI systems library, and direct connections with fellow builders.',
    detail: 'Instant activation',
  },
  {
    number: '04',
    title: 'Transform',
    description:
      'Deploy AI systems tailored to your business. Get support from the community. Watch your operations scale like never before.',
    detail: 'Ongoing support',
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
      id="how-it-works"
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
            How It Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Your Path to AI Leverage
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A streamlined process designed for serious operators. No fluff, no time wasted.
            Just a clear path to transformation.
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
                {/* Step card */}
                <div className="relative p-6 lg:p-8 rounded-2xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-colors duration-300 h-full">
                  {/* Number */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-zilla-neon/10 border border-zilla-neon/30 mb-6">
                    <span className="font-display text-2xl font-bold text-zilla-neon">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
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

        {/* Member Wins Teaser */}
        <div
          className={`mt-20 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Member Transformations
            </h3>
            <p className="mt-2 text-gray-400">
              Real results from real members
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Went from drowning in data to making decisions with complete confidence.', name: 'Member since Q3 2025', result: '3x revenue in 4 months' },
              { quote: 'My team of one now operates like a team of ten. The AI systems changed everything.', name: 'Member since Q2 2025', result: 'Scaled to 7 figures' },
              { quote: 'Finally competing with brands that have 50 employees. Level playing field.', name: 'Member since Q4 2025', result: '10x operational efficiency' },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-zilla-charcoal/30 border border-gray-800/50"
              >
                <p className="text-gray-300 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{testimonial.name}</span>
                  <span className="text-sm text-zilla-neon font-medium">{testimonial.result}</span>
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
