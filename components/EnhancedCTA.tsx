import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

/**
 * EnhancedCTA - Clear, calm conversion section
 * Revised: Removed aggressive language, fake scarcity
 * Focus: Value clarity, risk reduction, simple next steps
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">See If Growzilla Is Right</span>
            <br />
            <span className="text-transparent bg-clip-text bg-zilla-gradient">
              For Your Business
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Start with a 30-day trial. See your first analysis within 24 hours.
            <br className="hidden md:block" />
            No credit card required. Cancel anytime.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {/* Primary CTA */}
          <a
            href="#trial"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-zilla-shopify text-zilla-black font-bold text-lg rounded-xl hover:bg-zilla-acid hover:shadow-zilla-glow-lg transition-all duration-300"
          >
            <span>Start 30-Day Trial</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#schedule"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-zilla-muted text-gray-300 font-medium text-lg rounded-xl hover:border-zilla-shopify/50 hover:text-white transition-all duration-300"
          >
            <CalendarIcon className="w-5 h-5" />
            <span>Schedule a 15-Minute Walkthrough</span>
          </a>
        </motion.div>

        {/* Trust signals row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10"
        >
          {[
            '30-day trial',
            'No credit card',
            'Month-to-month',
            'Cancel anytime',
            'GDPR compliant',
          ].map((item, index) => (
            <div key={item} className="flex items-center gap-2 text-gray-400">
              <CheckCircleIcon className="w-4 h-4 text-zilla-shopify" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </motion.div>

        {/* Results stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-gray-500 mb-6">Results from operators using Growzilla:</p>
          <div className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-12 px-8 py-6 rounded-2xl bg-zilla-surface/50 border border-zilla-muted/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-zilla-shopify mb-1">23%</div>
              <div className="text-xs text-gray-500">Median CVR<br />improvement</div>
            </div>

            <div className="w-px h-12 bg-zilla-muted/30" />

            <div className="text-center">
              <div className="text-3xl font-bold text-zilla-electric mb-1">3 weeks</div>
              <div className="text-xs text-gray-500">Median payback<br />period</div>
            </div>

            <div className="w-px h-12 bg-zilla-muted/30" />

            <div className="text-center">
              <div className="text-3xl font-bold text-zilla-gold mb-1">200+</div>
              <div className="text-xs text-gray-500">Active<br />operators</div>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 max-w-lg mx-auto">
            Results vary based on traffic volume and current baseline. We'll give you a realistic estimate during onboarding.
          </p>
        </motion.div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 text-gray-500 text-sm"
        >
          <p>Works with: Shopify · Klaviyo · Meta · Google · TikTok</p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 pt-8 border-t border-zilla-muted/20 max-w-md mx-auto"
        >
          <p className="text-sm text-gray-500 mb-2">Questions before you start?</p>
          <p className="text-sm text-gray-400">
            Email us at <a href="mailto:hello@growzilla.xyz" className="text-zilla-shopify hover:underline">hello@growzilla.xyz</a>
            <br />
            <span className="text-gray-600">We typically respond within 4 hours (CET)</span>
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zilla-black to-transparent pointer-events-none" />
    </section>
  );
};

export default EnhancedCTA;
