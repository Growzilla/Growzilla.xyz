import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * ICPQualification - Clear "who this is for" section
 * Revised: Replaced fake exclusivity with honest ICP qualification
 * Focus: Help visitors self-qualify, reduce bad-fit signups
 */
export const ExclusivityTeaser: React.FC = () => {
  const isFor = [
    'Established ecommerce businesses ($500K-$10M revenue)',
    'Operators already using Shopify + ad platforms + email tools',
    'Decision-makers who want recommendations, not more dashboards',
    'Teams without dedicated data analysts',
    'People who will actually implement the recommendations',
  ];

  const notFor = [
    'Brand new stores without meaningful traffic',
    'Operators who prefer building their own dashboards',
    'Businesses needing enterprise compliance (SOC2, custom SLAs)',
    'Anyone looking for a "set it and forget it" solution',
    'Platforms other than Shopify (for now)',
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-zilla-dark">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-zilla opacity-10" style={{ backgroundSize: '50px 50px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Is Growzilla Right For You?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We're not for everyone. Here's how to know if we're a fit.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Is For column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zilla-surface rounded-2xl p-8 border border-zilla-shopify/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-zilla-shopify/10 flex items-center justify-center">
                <CheckIcon className="w-5 h-5 text-zilla-shopify" />
              </div>
              <h3 className="text-xl font-semibold text-white">Growzilla works best for</h3>
            </div>

            <ul className="space-y-4">
              {isFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-zilla-shopify mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not For column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zilla-surface rounded-2xl p-8 border border-zilla-muted/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Growzilla is not for</h3>
            </div>

            <ul className="space-y-4">
              {notFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XMarkIcon className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 text-sm text-gray-500 max-w-xl mx-auto"
        >
          If you're not sure, start a trial. We'll tell you during onboarding if we don't think it's a fit.
        </motion.p>
      </div>
    </section>
  );
};

export default ExclusivityTeaser;
