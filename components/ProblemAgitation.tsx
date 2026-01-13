import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProblemAgitation - 3-card leak showcase dramatizing merchant pain points
 * Research-backed data:
 * - 7-8 figure merchants lose $237K+/year to murky GA4 data & channel misattribution
 * - Mobile converts at 1.8% vs desktop 3.9% (Shopify benchmarks 2025)
 * - Revenue leaks from poor tracking make optimization impossible
 *
 * Sources: ecommercefastlane.com/littledata-shopify-review, blendcommerce.com/shopify/ecommerce-conversion-rate-benchmarks
 */
export const ProblemAgitation: React.FC = () => {
  const leaks = [
    {
      icon: '💸',
      title: 'Wasted Ad Spend',
      stat: '-$237K/Year Lost',
      description: 'Murky GA4 data. Wrong channel attribution. Post-iOS 14 tracking holes.',
      details: 'Burning budget on guesswork. Core numbers are wrong.',
      color: 'danger',
      animation: 'leak-drip'
    },
    {
      icon: '🛒',
      title: 'Conversion Friction',
      stat: '1.8% Mobile CVR',
      description: 'Mobile converts at 1.8% vs desktop 3.9%. Hidden cart abandonment at 93%.',
      details: '70-80% of traffic is mobile. You\'re losing millions.',
      color: 'warning',
      animation: 'shake'
    },
    {
      icon: '📊',
      title: 'Blind Optimization',
      stat: 'Guesswork = Death',
      description: 'Optimizing ad spend on guesswork. Not ground truth.',
      details: 'Broken tracking = skewed reports = impossible decisions.',
      color: 'electric',
      animation: 'glitch'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-zilla-dark">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-zilla opacity-10" style={{ backgroundSize: '50px 50px' }} />

      {/* Radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-zilla-radial opacity-40" />

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
            <span className="text-white">Your Store is </span>
            <span className="text-zilla-danger">Bleeding Revenue</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            7-8 figure merchants are losing <span className="text-zilla-danger font-bold">$237K+/year</span> to these leaks
          </p>
        </motion.div>

        {/* 3-card leak showcase */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {leaks.map((leak, index) => (
            <motion.div
              key={leak.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-zilla-surface rounded-2xl p-8 border border-zilla-muted hover:border-zilla-shopify/40 transition-all duration-300">
                {/* Dripping animation overlay */}
                <div className="absolute top-0 left-0 right-0 h-full overflow-hidden rounded-2xl pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 bg-gradient-to-b from-zilla-${leak.color}/60 to-transparent rounded-full animate-${leak.animation}`}
                      style={{
                        left: `${20 + i * 30}%`,
                        height: '80px',
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s',
                        animationIterationCount: 'infinite'
                      }}
                    />
                  ))}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 group-hover:animate-shake">
                  {leak.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {leak.title}
                </h3>

                {/* Stat */}
                <div className={`text-3xl font-bold text-zilla-${leak.color} mb-4`}>
                  {leak.stat}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-3 leading-relaxed">
                  {leak.description}
                </p>

                {/* Details */}
                <p className="text-sm text-gray-500 italic">
                  {leak.details}
                </p>

                {/* Counter effect */}
                <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className={`text-8xl font-black text-zilla-${leak.color}`}>
                    {index + 1}
                  </div>
                </div>

                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-zilla-${leak.color}/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-400">
            Sound familiar? <span className="text-zilla-shopify font-semibold">Growzilla crushes these leaks instantly.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemAgitation;
