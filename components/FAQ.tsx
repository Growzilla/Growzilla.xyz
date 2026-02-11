import React, { useEffect, useState, useRef } from 'react';

const faqs = [
  {
    question: 'What exactly do you do?',
    answer:
      'We install clean attribution across your full funnel, identify where revenue is leaking, and build systems to fix it. Think of us as a revenue systems partner—we connect your tools, find the problems, and implement the solutions with you.',
  },
  {
    question: 'How is this different from an agency?',
    answer:
      'Agencies run campaigns. We build systems. We don\'t manage your ads or send you monthly slide decks. We scope tight, specific interventions—attribution fixes, funnel repairs, tracking infrastructure—and implement them. The systems stay with you.',
  },
  {
    question: 'What does the engagement look like?',
    answer:
      'Month-to-month. We start with a strategy call, then connect your tools and deliver a scoped analysis within 48 hours. From there, we build and implement together on a weekly cadence. No long-term contracts. Results or you leave.',
  },
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'Shopify stores with existing traffic and revenue—typically $500K to $30M annually. You need data for us to analyze. If you\'re earlier stage, we\'ll tell you honestly on the strategy call.',
  },
  {
    question: 'Do you replace our existing tools?',
    answer:
      'No. We connect them. Shopify, Meta, Google, Klaviyo, GA4—we unify the data from tools you already use into a single source of truth. No new software to learn.',
  },
];

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Common Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${150 + index * 80}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-5 rounded-xl bg-zilla-surface/50 border border-gray-800/50 hover:border-zilla-neon/20 transition-colors duration-200"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-medium text-white">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {openIndex === index && (
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
