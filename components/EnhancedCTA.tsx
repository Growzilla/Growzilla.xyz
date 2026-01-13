import React from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon, SparklesIcon, BoltIcon } from '@heroicons/react/24/solid';

/**
 * EnhancedCTA - Dual conversion path section (Install vs Waitlist)
 * Research: A/B testing variants - direct install vs waitlist exclusivity
 * Target: 15-25% hero CTA conversion (vs industry median 6.6%)
 * Removes friction: 30-day free trial, no credit card (Peel's strategy)
 */
export const EnhancedCTA: React.FC = () => {
  return (
    <section id="cta" className="relative py-32 overflow-hidden bg-gradient-to-b from-zilla-black via-zilla-dark to-zilla-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-zilla opacity-15" style={{ backgroundSize: '50px 50px' }} />

      {/* Massive radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl bg-zilla-radial-intense opacity-70" />

      {/* Energy pulses */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-zilla-shopify/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-zilla-electric/8 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            <span className="text-white block mb-2">CLAIM YOUR</span>
            <span className="text-transparent bg-clip-text bg-zilla-gradient text-shimmer">
              GROWZILLA ACCESS
            </span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the elite or watch your competitors <span className="text-zilla-danger font-bold">crush you</span>
          </p>
        </motion.div>

        {/* Dual CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 justify-center mb-12"
        >
          {/* Primary CTA - Install Now */}
          <a
            href="#install"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-6 bg-zilla-shopify text-zilla-black font-black text-xl rounded-2xl hover:bg-zilla-acid hover:shadow-zilla-glow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] animate-text-shimmer opacity-30" />

            <RocketLaunchIcon className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">Install Growzilla — Crush Leaks</span>
            <BoltIcon className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform" />
          </a>

          {/* Secondary CTA - Waitlist */}
          <a
            href="#waitlist"
            className="group inline-flex items-center justify-center gap-3 px-10 py-6 bg-transparent border-2 border-zilla-shopify text-zilla-shopify font-bold text-xl rounded-2xl hover:bg-zilla-shopify/10 hover:shadow-zilla-glow-lg transition-all duration-300 transform hover:scale-105"
          >
            <SparklesIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Join Waitlist — Private Beta</span>
          </a>
        </motion.div>

        {/* Trust signals row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-8"
        >
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 rounded-full bg-zilla-shopify animate-pulse" />
            <span className="text-lg">30-day free trial</span>
          </div>

          <div className="hidden md:block w-px h-6 bg-zilla-muted" />

          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 rounded-full bg-zilla-electric animate-pulse" />
            <span className="text-lg">No credit card required</span>
          </div>

          <div className="hidden md:block w-px h-6 bg-zilla-muted" />

          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-2 h-2 rounded-full bg-zilla-gold animate-pulse" />
            <span className="text-lg">90-second installation</span>
          </div>
        </motion.div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-6 rounded-2xl bg-zilla-surface/50 border border-zilla-shopify/20 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-zilla-shopify mb-1">180+</div>
            <div className="text-sm text-gray-400">Elite Brands</div>
          </div>

          <div className="w-px h-12 bg-zilla-muted/50" />

          <div className="text-center">
            <div className="text-4xl font-bold text-zilla-electric mb-1">$47M+</div>
            <div className="text-sm text-gray-400">Revenue Recovered</div>
          </div>

          <div className="w-px h-12 bg-zilla-muted/50" />

          <div className="text-center">
            <div className="text-4xl font-bold text-zilla-gold mb-1">35%</div>
            <div className="text-sm text-gray-400">Avg CVR Lift</div>
          </div>

          <div className="w-px h-12 bg-zilla-muted/50" />

          <div className="text-center">
            <div className="text-4xl font-bold text-zilla-warning mb-1">4.9★</div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
        </motion.div>

        {/* Urgency note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-gray-500 text-sm"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-zilla-warning animate-pulse mr-2" />
          Next cohort opens January 15, 2026 • Only 8 spots remaining
        </motion.p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zilla-black to-transparent pointer-events-none" />
    </section>
  );
};

export default EnhancedCTA;
