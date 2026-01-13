import React from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

/**
 * FeatureShowcase - Modular cards highlighting unique Growzilla differentiators
 * Based on research: Triple Whale lacks ICP detection, Peel lacks real-time alerts
 * Competitive gaps exploited: No competitor offers proactive leak detection + ICP AI
 */
export const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: MagnifyingGlassIcon,
      iconBg: 'bg-zilla-shopify/10',
      iconColor: 'text-zilla-shopify',
      title: 'ICP Archetype Detection',
      description: 'AI identifies your perfect customer profile automatically.',
      benefit: 'Stop wasting ad $ on wrong audiences',
      roi: '+47% ROAS improvement',
      stat: 'Unique to Growzilla'
    },
    {
      icon: ChartBarIcon,
      iconBg: 'bg-zilla-electric/10',
      iconColor: 'text-zilla-electric',
      title: 'Pareto 80/20 Optimization',
      description: 'Auto-surfaces the 20% of products driving 80% of revenue.',
      benefit: 'Focus where it matters most',
      roi: '3.2x faster optimization',
      stat: 'Real-time alerts'
    },
    {
      icon: CursorArrowRaysIcon,
      iconBg: 'bg-zilla-gold/10',
      iconColor: 'text-zilla-gold',
      title: 'Ad Targeting Prescriptions',
      description: 'Get exact audience params to feed Meta/TikTok/Google.',
      benefit: 'No more guesswork campaigns',
      roi: '-58% wasted spend',
      stat: 'Copy-paste ready'
    },
    {
      icon: PaintBrushIcon,
      iconBg: 'bg-zilla-danger/10',
      iconColor: 'text-zilla-danger',
      title: 'Store Redesign Recommendations',
      description: 'AI detects UX friction and conversion killers.',
      benefit: 'Get actionable fixes instantly',
      roi: '+15-30% CVR lift',
      stat: 'Proven templates'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-zilla-black via-zilla-surface to-zilla-black">
      {/* Background effects */}
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
            <span className="text-white">Powered by AI </span>
            <span className="text-transparent bg-clip-text bg-zilla-gradient">That Never Sleeps</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Features Triple Whale, Peel & Northbeam <span className="text-zilla-danger font-semibold">don't have</span>
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative"
              >
                <div className="relative h-full bg-zilla-charcoal rounded-2xl p-8 border border-zilla-muted hover:border-zilla-shopify/50 transition-all duration-300 overflow-hidden">
                  {/* Animated background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zilla-shopify/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl ${feature.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefit */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zilla-surface border border-zilla-shopify/20 mb-4">
                      <span className="text-sm text-zilla-shopify font-medium">
                        ✓ {feature.benefit}
                      </span>
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center justify-between pt-6 border-t border-zilla-muted/30">
                      <div>
                        <div className="text-2xl font-bold text-zilla-shopify">
                          {feature.roi}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          Average Impact
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex px-3 py-1 rounded-full bg-zilla-gold/10 border border-zilla-gold/30">
                          <span className="text-xs font-semibold text-zilla-gold">
                            {feature.stat}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 ${feature.iconBg} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300 -z-10`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-6 rounded-2xl bg-zilla-surface border border-zilla-shopify/20">
            <div>
              <div className="text-4xl font-bold text-zilla-shopify">90s</div>
              <div className="text-sm text-gray-400">Installation Time</div>
            </div>
            <div className="w-px h-12 bg-zilla-muted" />
            <div>
              <div className="text-4xl font-bold text-zilla-electric">5min</div>
              <div className="text-sm text-gray-400">First Insights</div>
            </div>
            <div className="w-px h-12 bg-zilla-muted" />
            <div>
              <div className="text-4xl font-bold text-zilla-gold">24/7</div>
              <div className="text-sm text-gray-400">AI Monitoring</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
