import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const DISCORD_URL = 'https://discord.gg/dFgyfdW8';

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
          <div className="flex -space-x-2">
            {['S', 'M', 'K'].map((letter, i) => (
              <div
                key={letter}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-zilla-neon/80 to-zilla-acid/60 border-2 border-zilla-black flex items-center justify-center text-zilla-black text-xs font-bold"
              >
                {letter}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-300">
            <span className="text-zilla-neon font-semibold">200+</span> brands in the herd
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-zilla-warning" />
            ))}
          </div>
        </div>

        {/* Main headline */}
        <h1
          className={`heading-zilla mb-6 transition-all duration-700 delay-100 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="block text-white">UNLEASH</span>
          <span className="block text-shimmer">GROWZILLA</span>
          <span className="block text-white">ON YOUR STORE</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`subheading-zilla mx-auto mb-8 transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Stop guessing why customers leave. Our AI artifact analyzes your traffic data,
          <span className="text-zilla-neon font-semibold"> stomps out conversion leaks</span>, and
          unleashes explosive growth. Join the herd crushing it on Shopify.
        </p>

        {/* Value props */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { icon: '🔍', text: 'AI-Powered Leak Detection' },
            { icon: '📊', text: 'Behavioral Data Analysis' },
            { icon: '🚀', text: '35% Avg. Conversion Lift' },
          ].map((prop) => (
            <div
              key={prop.text}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zilla-charcoal/50 border border-zilla-neon/20"
            >
              <span>{prop.icon}</span>
              <span className="text-sm text-gray-300">{prop.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-400 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a href="#cta" className="btn-zilla group text-lg">
            Install The Artifact
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-zilla-outline group text-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join The Herd
          </a>
        </div>

        {/* Trust signals */}
        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="badge-zilla">
            <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
            Next cohort: Jan 15
          </div>
          <div className="badge-zilla bg-zilla-warning/10 text-zilla-warning border-zilla-warning/30">
            <span className="w-2 h-2 rounded-full bg-zilla-warning animate-pulse" />
            Only 8 spots left
          </div>
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
