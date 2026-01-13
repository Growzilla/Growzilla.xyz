import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

/**
 * CompetitiveComparison - Feature matrix showing Growzilla superiority
 * Research-backed pricing data:
 * - Northbeam: $1,500 for 5K orders (littledata.io/alternatives/northbeam)
 * - Littledata: $349 for 5K orders
 * - Triple Whale: $1,000-$1,500+ range
 * - Peel: ~$300-400 range
 *
 * Growzilla positioned at $499 (premium but below Northbeam/Triple Whale)
 */
export const CompetitiveComparison: React.FC = () => {
  const competitors = [
    { name: 'Growzilla', highlight: true },
    { name: 'Triple Whale', highlight: false },
    { name: 'Peel', highlight: false },
    { name: 'Northbeam', highlight: false }
  ];

  const features = [
    {
      name: 'ICP Archetype AI',
      values: [true, false, false, false],
      tooltip: 'Automatically detect ideal customer profiles'
    },
    {
      name: 'Real-time Leak Alerts',
      values: [true, false, false, false],
      tooltip: 'Proactive notifications when revenue is bleeding'
    },
    {
      name: 'One-Click Install',
      values: [true, false, false, false],
      tooltip: '90-second setup vs weeks of implementation'
    },
    {
      name: 'Ad Targeting Prescriptions',
      values: [true, 'partial', false, 'partial'],
      tooltip: 'Copy-paste audience params for Meta/TikTok/Google'
    },
    {
      name: 'Store Redesign AI',
      values: [true, false, false, false],
      tooltip: 'UX friction detection + actionable fixes'
    },
    {
      name: 'Multi-touch Attribution',
      values: [true, true, true, true],
      tooltip: 'Standard attribution modeling'
    },
    {
      name: 'Dashboard Analytics',
      values: [true, true, true, true],
      tooltip: 'Basic reporting and visualization'
    },
    {
      name: 'Pricing (5K orders/mo)',
      values: ['$499', '$1,000+', '$349', '$1,500'],
      isPricing: true,
      tooltip: 'Monthly cost for 5,000 orders'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-zilla-surface via-zilla-dark to-zilla-black">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-zilla opacity-10" style={{ backgroundSize: '50px 50px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Why Growzilla </span>
            <span className="text-transparent bg-clip-text bg-zilla-gradient">Dominates</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The only platform with <span className="text-zilla-shopify font-semibold">proactive leak detection</span> + <span className="text-zilla-electric font-semibold">ICP AI</span>
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header row */}
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-zilla-muted/30">
                    <span className="text-gray-400 text-sm uppercase tracking-wide">Features</span>
                  </th>
                  {competitors.map((comp) => (
                    <th
                      key={comp.name}
                      className={`p-4 border-b ${
                        comp.highlight
                          ? 'border-zilla-shopify/50 bg-zilla-shopify/5'
                          : 'border-zilla-muted/30'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`font-bold ${comp.highlight ? 'text-zilla-shopify text-lg' : 'text-white'}`}>
                          {comp.name}
                        </div>
                        {comp.highlight && (
                          <div className="inline-block mt-2 px-3 py-1 rounded-full bg-zilla-gold/20 border border-zilla-gold/40">
                            <span className="text-xs font-semibold text-zilla-gold">Recommended</span>
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature rows */}
              <tbody>
                {features.map((feature, featureIndex) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: featureIndex * 0.05 }}
                    className="group hover:bg-zilla-surface/50 transition-colors"
                  >
                    {/* Feature name */}
                    <td className="p-4 border-b border-zilla-muted/20">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">{feature.name}</span>
                        {feature.tooltip && (
                          <div className="relative group/tooltip">
                            <div className="w-4 h-4 rounded-full bg-zilla-muted/40 flex items-center justify-center text-[10px] text-gray-500 cursor-help">
                              ?
                            </div>
                            <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-zilla-black border border-zilla-shopify/30 rounded-lg text-xs text-gray-400 opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity z-10">
                              {feature.tooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Competitor columns */}
                    {feature.values.map((value, colIndex) => {
                      const isHighlight = competitors[colIndex].highlight;

                      return (
                        <td
                          key={colIndex}
                          className={`p-4 text-center border-b ${
                            isHighlight
                              ? 'border-zilla-shopify/20 bg-zilla-shopify/3'
                              : 'border-zilla-muted/20'
                          }`}
                        >
                          {feature.isPricing ? (
                            <span className={`font-bold ${isHighlight ? 'text-zilla-shopify text-lg' : 'text-gray-300'}`}>
                              {value}
                            </span>
                          ) : value === true ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-zilla-shopify/20">
                              <CheckIcon className="w-4 h-4 text-zilla-shopify" />
                            </div>
                          ) : value === false ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800/40">
                              <XMarkIcon className="w-4 h-4 text-gray-600" />
                            </div>
                          ) : value === 'partial' ? (
                            <span className="text-gray-500 text-sm">Partial</span>
                          ) : null}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom note */}
          <div className="mt-8 p-6 rounded-xl bg-zilla-surface border border-zilla-shopify/20">
            <p className="text-sm text-gray-400 text-center">
              <span className="text-zilla-shopify font-semibold">Growzilla exclusive:</span> ICP Archetype AI + Real-time leak alerts.
              No competitor has this. <span className="text-zilla-electric">30-day free trial, no credit card required.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitiveComparison;
