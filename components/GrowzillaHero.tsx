import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

// Animated particles for the hero background
const Particle: React.FC<{ delay: number; left: string; size: number }> = ({ delay, left, size }) => (
  <div
    className="absolute bottom-0 rounded-full bg-zilla-neon/30"
    style={{
      left,
      width: size,
      height: size,
      animation: `rise ${3 + Math.random() * 2}s ease-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

// Dripping leak animation
const LeakDrip: React.FC<{ delay: number; left: string }> = ({ delay, left }) => (
  <div
    className="absolute top-0 w-1 bg-gradient-to-b from-red-500/80 via-red-400/60 to-transparent rounded-full"
    style={{
      left,
      height: '60px',
      animation: `drip ${2 + Math.random()}s ease-in infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

// Godzilla silhouette SVG
const GodzillaSilhouette: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 400 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="zillaBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FF66" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#39FF14" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#00E676" stopOpacity="0.1" />
      </linearGradient>
      <filter id="zillaGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Simplified monster silhouette */}
    <g filter="url(#zillaGlow)">
      {/* Body */}
      <path
        d="M200 50 L160 80 L140 130 L120 180 L100 250 L90 320 L100 400 L130 450 L170 480 L230 480 L270 450 L300 400 L310 320 L300 250 L280 180 L260 130 L240 80 Z"
        fill="url(#zillaBodyGradient)"
        stroke="#00FF66"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      {/* Spines */}
      <path
        d="M200 50 L195 20 L200 50 L210 15 L200 50 L220 25 L200 50"
        fill="none"
        stroke="#00FF66"
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      <path
        d="M180 100 L170 70 M200 90 L200 55 M220 100 L230 70"
        stroke="#00FF66"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      {/* Eyes - glowing */}
      <ellipse cx="170" cy="120" rx="12" ry="8" fill="#00FF66" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="230" cy="120" rx="12" ry="8" fill="#00FF66" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Arms */}
      <path
        d="M120 220 L80 260 L60 250 M280 220 L320 260 L340 250"
        stroke="#00FF66"
        strokeWidth="3"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      {/* Tail */}
      <path
        d="M130 450 L80 470 L30 460 L10 440"
        stroke="#00FF66"
        strokeWidth="3"
        strokeOpacity="0.3"
        strokeLinecap="round"
      />
    </g>
    {/* Energy pulses around the monster */}
    <circle cx="200" cy="250" r="150" fill="none" stroke="#00FF66" strokeWidth="1" opacity="0.2">
      <animate attributeName="r" values="150;200;150" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="200" cy="250" r="100" fill="none" stroke="#00FF66" strokeWidth="1" opacity="0.3">
      <animate attributeName="r" values="100;150;100" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export const GrowzillaHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-zilla-black" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-zilla opacity-40" />

      {/* Radial gradient glow from center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 255, 102, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Godzilla silhouette - positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <GodzillaSilhouette className="w-[600px] h-[750px] animate-float" />
      </div>

      {/* Floating energy orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-zilla-neon/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-zilla-neon/3 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Leak drips on the sides (before artifact) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        {mounted && [...Array(8)].map((_, i) => (
          <LeakDrip key={i} delay={i * 0.5} left={`${10 + i * 12}%`} />
        ))}
      </div>

      {/* Rising particles (after artifact - growth) */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {mounted && [...Array(12)].map((_, i) => (
          <Particle key={i} delay={i * 0.3} left={`${5 + i * 8}%`} size={4 + Math.random() * 8} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Social proof badge */}
        <div
          className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-zilla border-glow mb-8 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-sm text-gray-300">
            Used by <span className="text-zilla-neon font-semibold">200+</span> ecommerce operators
          </span>
          <span className="text-gray-500">·</span>
          <span className="text-sm text-gray-400">$500K-$30M revenue</span>
        </div>

        {/* Main headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="block text-white">Your Data Isn't the Problem.</span>
          <span className="block text-transparent bg-clip-text bg-zilla-gradient mt-2">
            Your Tools Don't Talk to Each Other.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Growzilla connects your Shopify store, ad platforms, and email tools into a single
          analytical layer. It identifies where you're losing revenue and tells you
          <span className="text-white font-medium"> specifically what to fix</span>—ranked by expected impact.
        </p>

        {/* Value props */}
        <div
          className={`flex flex-wrap justify-center gap-4 md:gap-8 mb-10 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { label: '90-second install', sublabel: 'No dev required' },
            { label: 'First analysis in 24 hours', sublabel: 'Ranked recommendations' },
            { label: 'Avg. 23% CVR improvement', sublabel: 'For operators who implement' },
          ].map((prop) => (
            <div
              key={prop.label}
              className="flex flex-col items-center px-4 py-3 rounded-lg bg-zilla-charcoal/30 border border-zilla-muted/30"
            >
              <span className="text-sm font-medium text-white">{prop.label}</span>
              <span className="text-xs text-gray-500">{prop.sublabel}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a href="#cta" className="btn-zilla group text-lg">
            Start 30-Day Trial
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="btn-zilla-outline group text-lg"
          >
            See How It Works
          </a>
        </div>

        {/* Trust signals */}
        <div
          className={`flex flex-wrap justify-center items-center gap-3 md:gap-6 text-sm text-gray-400 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-zilla-neon" />
            <span>No credit card required</span>
          </div>
          <span className="hidden md:inline text-gray-600">·</span>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-zilla-neon" />
            <span>Cancel anytime</span>
          </div>
          <span className="hidden md:inline text-gray-600">·</span>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-zilla-neon" />
            <span>GDPR compliant</span>
          </div>
        </div>

        {/* Integrations line */}
        <div
          className={`mt-8 text-xs text-gray-500 transition-all duration-700 delay-600 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Works with: Shopify · Klaviyo · Meta · Google · TikTok
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 text-gray-500 hover:text-zilla-neon transition-colors animate-bounce hidden sm:block"
        aria-label="Scroll to next section"
      >
        <ChevronDownIcon className="h-8 w-8" />
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zilla-black to-transparent pointer-events-none" />
    </section>
  );
};

export default GrowzillaHero;
