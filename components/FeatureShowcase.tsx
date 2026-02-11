import React from 'react';
import { motion } from 'framer-motion';
import {
  LinkIcon,
  CpuChipIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

/**
 * FeatureShowcase - "How It Works" 4-step process explanation
 * Revised: Clear mechanism explanation, not feature hype
 * Focus: Connect → Analyze → Recommend → Learn
 */
export const FeatureShowcase: React.FC = () => {
  const steps = [
    {
      icon: LinkIcon,
      step: '01',
      title: 'Connect Your Existing Tools',
      description: 'One-click connection to Shopify. API connections to Meta, Google, Klaviyo, and your other tools.',
      details: 'We don\'t replace your stack—we connect it.',
      bullets: [
        '90-second Shopify installation',
        'No developer required',
        'Your data stays in your tools',
      ],
      color: 'shopify'
    },
    {
      icon: CpuChipIcon,
      step: '02',
      title: 'Continuous Analysis Begins',
      description: 'Within 24 hours, Growzilla has analyzed your funnel, ad performance, product conversion, and customer segments.',
      details: 'This runs continuously. Not once—always.',
      bullets: [
        'Where traffic drops off',
        'Which campaigns drive profit',
        'Which products convert vs. just attract',
      ],
      color: 'electric'
    },
    {
      icon: ClipboardDocumentListIcon,
      step: '03',
      title: 'Ranked Recommendations',
      description: 'Every week, you receive a prioritized list of issues—ranked by expected revenue impact—with specific actions to take.',
      details: 'Not "your conversion is low." Exactly what\'s wrong and what to do.',
      bullets: [
        'Specific recommendations',
        'Expected outcome per fix',
        'Priority ranking by impact',
      ],
      color: 'gold'
    },
    {
      icon: ArrowPathIcon,
      step: '04',
      title: 'The System Learns',
      description: 'When you implement a recommendation, mark it complete. Growzilla tracks the outcome and future recommendations get smarter.',
      details: 'You\'re building a system that learns your business.',
      bullets: [
        'Track implementation results',
        'Calibrate to your business',
        'Recommendations improve over time',
      ],
      color: 'shopify'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-zilla-black via-zilla-surface to-zilla-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-zilla opacity-10" style={{ backgroundSize: '50px 50px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          id="how-it-works"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 scroll-mt-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">How It Actually Works</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Growzilla is an analytical layer that sits on top of your existing tools.
            It connects your data, identifies conversion friction, and generates prioritized recommendations.
          </p>
        </motion.div>

        {/* Step grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-full bg-zilla-charcoal rounded-2xl p-8 border border-zilla-muted hover:border-zilla-shopify/30 transition-all duration-300 overflow-hidden">
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step number + Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`inline-flex p-3 rounded-xl bg-zilla-${step.color}/10`}>
                        <Icon className={`w-6 h-6 text-zilla-${step.color}`} />
                      </div>
                      <span className={`text-sm font-mono text-zilla-${step.color} uppercase tracking-wider`}>
                        Step {step.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                      {step.description}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-4">
                      {step.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                          <span className={`w-1 h-1 rounded-full bg-zilla-${step.color}`} />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Details */}
                    <div className="pt-4 border-t border-zilla-muted/30">
                      <p className="text-sm text-gray-500 italic">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline to value */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-center text-lg font-medium text-gray-400 mb-8">Timeline to Value</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            <div className="flex flex-col items-center px-8 py-6">
              <div className="text-3xl font-bold text-zilla-shopify mb-1">Day 1</div>
              <div className="text-sm text-gray-400 text-center">90-second installation</div>
            </div>
            <div className="hidden md:block w-16 h-px bg-gradient-to-r from-zilla-shopify/50 to-zilla-electric/50" />
            <div className="flex flex-col items-center px-8 py-6">
              <div className="text-3xl font-bold text-zilla-electric mb-1">Week 1</div>
              <div className="text-sm text-gray-400 text-center">First ranked recommendations</div>
            </div>
            <div className="hidden md:block w-16 h-px bg-gradient-to-r from-zilla-electric/50 to-zilla-gold/50" />
            <div className="flex flex-col items-center px-8 py-6">
              <div className="text-3xl font-bold text-zilla-gold mb-1">Month 1</div>
              <div className="text-sm text-gray-400 text-center">Median 23% CVR improvement</div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            Results for operators who implement recommendations. Your results may vary based on traffic volume and baseline.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
