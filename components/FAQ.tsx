import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What happens on a diagnostic call?',
    answer: 'A focused 20-minute conversation where we learn about your brand, your current challenges, and where you want to go. We identify 2-3 immediate areas of concern and explain our diagnostic process. No sales pressure—just a clear conversation.',
  },
  {
    question: 'How do you identify bottlenecks?',
    answer: 'We use proprietary methods to examine your traffic patterns, conversion flows, and customer journey. We look at where visitors drop off, what causes friction, and which parts of your funnel underperform. The result is a clear picture of where revenue is being lost.',
  },
  {
    question: 'What size brands do you work with?',
    answer: 'We work with Shopify brands doing $10K to $1M+ per month. Whether you are trying to break through a plateau or scale to the next level, our approach is tailored to your specific situation and growth stage.',
  },
  {
    question: 'How is this different from agencies or consultants?',
    answer: 'Most consultants offer opinions. We offer diagnosis backed by data. Every recommendation we make is grounded in evidence from your store, not generic best practices. We focus on sustainable improvements—not quick fixes that create new problems.',
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Many clients see measurable improvements within 2-4 weeks of implementing our recommendations. More significant strategic changes typically show results within 60-90 days. The timeline depends on the complexity of the bottlenecks we identify.',
  },
  {
    question: 'Can I implement independently after the audit?',
    answer: 'Absolutely. We provide a clear, prioritized roadmap that your team can execute without us. For brands that want ongoing support, we offer continued partnership—but it is never required.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Common Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            What you should know before we talk.
          </p>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-green-200 transition-colors duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
