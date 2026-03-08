import React, { useEffect, useState, useRef } from 'react';

const faqs = [
  {
    question: 'What does Growzilla actually do?',
    answer:
      'Growzilla tracks which content drives Shopify sales. You create tagged tracking links for each piece of content (defining the hook, creator, content type, and CTA), and Growzilla shows you exactly which content converted into purchases via a Sankey attribution diagram.',
  },
  {
    question: 'How is this different from UTM tracking?',
    answer:
      'UTMs tell you the traffic source. Growzilla tells you the hook, the creator, the content format, and ties it directly to purchases — not just clicks. You see the full path: Channel → Creator → Content Type → Product → Revenue.',
  },
  {
    question: 'Does it work with TikTok, Instagram, and YouTube?',
    answer:
      'Yes. Growzilla works with any platform where you can paste a link. TikTok, Instagram, YouTube, Meta Ads, email campaigns, blog posts — if it has a URL, we can track it.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'A Shopify store and at least one creator or content campaign running. We connect to your Shopify store and start tracking as soon as you create your first link.',
  },
  {
    question: 'Is it really free?',
    answer:
      'Yes. The free plan is free forever — no credit card, no trial expiration. Paid plans unlock advanced features like unlimited creators, Sankey diagrams, and export capabilities when you\'re ready to scale.',
  },
  {
    question: 'How long does setup take?',
    answer:
      '2 minutes to connect your store. You see attribution data as soon as content with your tracking links gets clicks. Book a free install call and we\'ll set it up live with you.',
  },
];

const FAQ: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Common Questions
          </h2>
        </div>

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
                  <p className="mt-3 text-sm text-gray-400 leading-relaxed pr-8">{faq.answer}</p>
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
