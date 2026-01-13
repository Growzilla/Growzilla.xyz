import React, { useState, useEffect } from 'react';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const DISCORD_URL = 'https://discord.gg/dFgyfdW8';

// Countdown component
const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target to end of current month
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const updateTimer = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-4 mb-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="w-16 h-16 rounded-xl bg-zilla-charcoal border border-zilla-neon/30 flex items-center justify-center mb-1">
            <span className="font-display text-2xl text-zilla-neon">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-gray-500 uppercase">{unit}</span>
        </div>
      ))}
    </div>
  );
};

// Testimonial mini-card
const MiniTestimonial: React.FC<{
  name: string;
  result: string;
  avatar: string;
}> = ({ name, result, avatar }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-zilla-charcoal/30 border border-zilla-neon/10">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zilla-neon to-zilla-acid flex items-center justify-center text-zilla-black font-bold">
      {avatar}
    </div>
    <div className="flex-1">
      <div className="text-sm font-medium text-white">{name}</div>
      <div className="text-xs text-zilla-neon">{result}</div>
    </div>
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="w-3 h-3 text-zilla-warning" />
      ))}
    </div>
  </div>
);

export const GrowzillaCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
  };

  return (
    <section id="cta" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zilla-black via-zilla-dark to-zilla-black" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-zilla opacity-30" />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 102, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-zilla-neon rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Urgency badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zilla-warning/10 border border-zilla-warning/30 text-zilla-warning text-sm font-medium animate-pulse">
            <SparklesIcon className="w-4 h-4" />
            January Cohort — Only 8 Spots Remaining
          </div>
        </div>

        {/* Main headline */}
        <div className="text-center mb-8">
          <h2 className="heading-zilla mb-6">
            READY TO{' '}
            <span className="text-shimmer">UNLEASH</span>
            <br />
            THE MONSTER?
          </h2>

          <p className="subheading-zilla mx-auto">
            Stop leaving money on the table. Join 2,400+ Shopify brands that have
            <span className="text-zilla-neon font-semibold"> crushed $127M+ in additional revenue</span>{' '}
            with Growzilla.
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-center text-sm text-gray-500 mb-4">Cohort closes in:</p>
          <CountdownTimer />
        </div>

        {/* CTA Card */}
        <div className="card-zilla border-zilla-neon/30 shadow-zilla-glow-lg p-8 mb-12">
          {!submitted ? (
            <>
              {/* Form */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-5 py-4 rounded-xl bg-zilla-charcoal border border-zilla-neon/20 text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:shadow-zilla-glow transition-all"
                  />
                  <button type="submit" className="btn-zilla group whitespace-nowrap">
                    Get Started
                    <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              {/* What you get */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: CheckCircleIcon, text: 'AI-powered leak detection' },
                  { icon: CheckCircleIcon, text: 'Full funnel analysis' },
                  { icon: CheckCircleIcon, text: 'Community access' },
                  { icon: CheckCircleIcon, text: '30-day results guarantee' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-gray-400">
                    <item.icon className="w-5 h-5 text-zilla-neon flex-shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <ShieldCheckIcon className="w-4 h-4 text-zilla-neon" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <ClockIcon className="w-4 h-4 text-zilla-neon" />
                  2-minute setup
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <CheckCircleIcon className="w-4 h-4 text-zilla-neon" />
                  Cancel anytime
                </div>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-zilla-neon/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-10 h-10 text-zilla-neon" />
              </div>
              <h3 className="font-display text-2xl text-white mb-2">WELCOME TO THE HERD!</h3>
              <p className="text-gray-400 mb-4">
                Check your email for next steps. The monster awaits.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-zilla-outline"
              >
                Join Discord While You Wait
              </a>
            </div>
          )}
        </div>

        {/* Mini testimonials */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <MiniTestimonial
            name="Sarah K."
            result="+312% revenue in 90 days"
            avatar="S"
          />
          <MiniTestimonial
            name="Marcus T."
            result="$0 to $500K/mo"
            avatar="M"
          />
          <MiniTestimonial
            name="Emily R."
            result="3.2x conversion lift"
            avatar="E"
          />
        </div>

        {/* Final stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: '$127M+', label: 'Revenue Generated' },
            { value: '2,400+', label: 'Active Members' },
            { value: '35%', label: 'Avg. Conversion Lift' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-zilla-neon text-glow mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowzillaCTA;
