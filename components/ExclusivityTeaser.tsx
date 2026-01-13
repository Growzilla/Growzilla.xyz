import React from 'react';
import { LockClosedIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

/**
 * ExclusivityTeaser - Creates elite club feel inspired by Superhuman's waitlist strategy
 * Research: Superhuman's 180K waitlist drove viral demand through exclusivity
 * Conversion impact: Scarcity + status signaling increases perceived value
 */
export const ExclusivityTeaser: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-zilla-black via-zilla-dark to-zilla-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-zilla opacity-20" style={{ backgroundSize: '50px 50px' }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-zilla-radial-intense opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Lock + Crown Icon */}
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <LockClosedIcon className="w-12 h-12 text-zilla-shopify drop-shadow-zilla" />
              <SparklesIcon className="w-5 h-5 text-zilla-gold absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">MEMBERS </span>
            <span className="text-transparent bg-clip-text bg-zilla-gradient">ONLY</span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Growzilla isn't for everyone. Join{' '}
            <span className="text-zilla-shopify font-semibold">180+ elite merchants</span>
            {' '}who've unlocked{' '}
            <span className="text-zilla-electric font-semibold">$47M+ in hidden revenue</span>.
          </p>

          {/* Glassmorphism preview card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-2xl mx-auto mb-8"
          >
            {/* Glass card */}
            <div
              className="relative rounded-2xl p-8 border border-zilla-shopify/20 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              }}
            >
              {/* Blurred dashboard preview */}
              <div className="aspect-video bg-zilla-charcoal rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 blur-sm opacity-60">
                  {/* Fake dashboard elements */}
                  <div className="p-6 space-y-4">
                    <div className="h-3 bg-zilla-shopify/40 rounded w-1/3" />
                    <div className="h-2 bg-gray-600/40 rounded w-2/3" />
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="h-20 bg-zilla-surface/60 rounded-lg" />
                      <div className="h-20 bg-zilla-surface/60 rounded-lg" />
                      <div className="h-20 bg-zilla-surface/60 rounded-lg" />
                    </div>
                    <div className="h-32 bg-zilla-surface/60 rounded-lg mt-4" />
                  </div>
                </div>

                {/* Lock overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-zilla-black/40">
                  <div className="text-center">
                    <LockClosedIcon className="w-16 h-16 text-zilla-shopify/80 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 font-medium">Premium Dashboard Access</p>
                  </div>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="mt-6 flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-zilla-shopify">60,000</div>
                  <div className="text-sm text-gray-400">Joined Waitlist</div>
                </div>
                <div className="w-px h-12 bg-zilla-shopify/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-zilla-electric">15,000</div>
                  <div className="text-sm text-gray-400">Onboarded</div>
                </div>
              </div>
            </div>

            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-zilla-shopify/10 blur-3xl -z-10 scale-95" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#waitlist"
              className="inline-flex items-center gap-3 px-8 py-4 bg-zilla-shopify text-zilla-black font-bold text-lg rounded-xl hover:bg-zilla-acid hover:shadow-zilla-glow-lg transition-all duration-300 transform hover:scale-105"
            >
              <SparklesIcon className="w-5 h-5" />
              Join the Waitlist — Limited Access
            </a>

            <p className="mt-4 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-zilla-shopify animate-pulse mr-2" />
              Next cohort opens Jan 15 • Only 8 spots remaining
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExclusivityTeaser;
