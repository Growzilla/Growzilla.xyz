import React, { useEffect, useState, useRef } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import gsap from 'gsap';

const DISCORD_URL = 'https://discord.gg/dFgyfdW8';

/**
 * Authentic Godzilla Silhouette with Mighty Roar Animation
 * Research-based design featuring:
 * - 3 rows of angular dorsal spines (MonsterVerse 2024 design)
 * - Powerful muscular stance
 * - Roar sequence: head down → mighty roar → freeze at peak
 */
const AuthenticGodzilla: React.FC<{ className?: string }> = ({ className }) => {
  const godzillaRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const dorsalSpinesRef = useRef<SVGGElement>(null);
  const energyRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!godzillaRef.current || !headRef.current || !dorsalSpinesRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Initial state: Head down, humble
    gsap.set(headRef.current, {
      rotation: -25,
      transformOrigin: '200px 180px' // Neck pivot point
    });
    gsap.set(dorsalSpinesRef.current, {
      opacity: 0.3
    });

    // Animation sequence: The Mighty Roar
    tl.to(headRef.current, {
      rotation: 15, // Tilt head UP in roar
      duration: 2,
      ease: 'power2.out',
    })
    .to(dorsalSpinesRef.current, {
      opacity: 1,
      filter: 'drop-shadow(0 0 20px rgba(0, 255, 148, 0.8))',
      duration: 2,
      ease: 'power2.out',
    }, '<') // Start at same time
    .to(godzillaRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    }, '-=0.5')
    .to(energyRef.current, {
      attr: { r: 250 },
      opacity: 0.4,
      duration: 1,
      ease: 'power2.out'
    }, '-=1.5')
    // Freeze at peak roar (timeline stops)
    .to({}, { duration: 0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      viewBox="0 0 400 550"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Shopify Green Gradient */}
        <linearGradient id="zillaBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF94" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#39FF14" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0.1" />
        </linearGradient>

        {/* Glow filter for atomic energy */}
        <filter id="atomicGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Energy pulse ring (intensifies during roar) */}
      <circle
        ref={energyRef}
        cx="200"
        cy="280"
        r="150"
        fill="none"
        stroke="#00FF94"
        strokeWidth="2"
        opacity="0.15"
      />

      <g ref={godzillaRef}>
        {/* Main body */}
        <g filter="url(#atomicGlow)">
          {/* Thick powerful legs */}
          <path
            d="M140 420 L120 480 L110 520 L130 530 L145 525 L155 490 L160 420"
            fill="url(#zillaBodyGradient)"
            stroke="#00FF94"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          <path
            d="M260 420 L280 480 L290 520 L270 530 L255 525 L245 490 L240 420"
            fill="url(#zillaBodyGradient)"
            stroke="#00FF94"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Muscular torso - 2024 evolved form */}
          <ellipse
            cx="200"
            cy="320"
            rx="85"
            ry="110"
            fill="url(#zillaBodyGradient)"
            stroke="#00FF94"
            strokeWidth="2.5"
            strokeOpacity="0.7"
          />

          {/* Chest (puffed out for roar) */}
          <ellipse
            cx="200"
            cy="240"
            rx="70"
            ry="60"
            fill="url(#zillaBodyGradient)"
            stroke="#00FF94"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Head group (animated - roars up) */}
          <g ref={headRef}>
            {/* Neck */}
            <path
              d="M200 200 Q195 170, 200 140"
              fill="none"
              stroke="#00FF94"
              strokeWidth="28"
              strokeOpacity="0.5"
            />

            {/* Head */}
            <ellipse
              cx="200"
              cy="115"
              rx="45"
              ry="35"
              fill="url(#zillaBodyGradient)"
              stroke="#00FF94"
              strokeWidth="2.5"
              strokeOpacity="0.7"
            />

            {/* Jaw (open for roar) */}
            <path
              d="M180 120 Q200 140, 220 120"
              fill="none"
              stroke="#00FF94"
              strokeWidth="3"
              strokeOpacity="0.8"
              strokeLinecap="round"
            />

            {/* Eyes - glowing during roar */}
            <ellipse cx="185" cy="110" rx="8" ry="6" fill="#00FF94" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="215" cy="110" rx="8" ry="6" fill="#00FF94" opacity="0.9">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Dorsal spines - 3 rows, angular/jagged (MonsterVerse design) */}
          <g ref={dorsalSpinesRef}>
            {/* Back row - tallest */}
            <path
              d="M200 200 L190 155 L200 165 L210 155 Z"
              fill="#00FF94"
              fillOpacity="0.7"
              stroke="#39FF14"
              strokeWidth="1.5"
            />
            <path
              d="M200 235 L188 180 L200 195 L212 180 Z"
              fill="#00FF94"
              fillOpacity="0.7"
              stroke="#39FF14"
              strokeWidth="1.5"
            />
            <path
              d="M200 275 L186 210 L200 230 L214 210 Z"
              fill="#00FF94"
              fillOpacity="0.8"
              stroke="#39FF14"
              strokeWidth="2"
            />
            <path
              d="M200 320 L184 250 L200 275 L216 250 Z"
              fill="#00FF94"
              fillOpacity="0.8"
              stroke="#39FF14"
              strokeWidth="2"
            />
            <path
              d="M200 365 L182 300 L200 325 L218 300 Z"
              fill="#00FF94"
              fillOpacity="0.7"
              stroke="#39FF14"
              strokeWidth="2"
            />

            {/* Side spines (smaller) */}
            <path
              d="M175 250 L168 230 L175 235 Z"
              fill="#00FF94"
              fillOpacity="0.5"
            />
            <path
              d="M225 250 L232 230 L225 235 Z"
              fill="#00FF94"
              fillOpacity="0.5"
            />
            <path
              d="M170 300 L162 275 L170 285 Z"
              fill="#00FF94"
              fillOpacity="0.5"
            />
            <path
              d="M230 300 L238 275 L230 285 Z"
              fill="#00FF94"
              fillOpacity="0.5"
            />
          </g>

          {/* Powerful arms */}
          <path
            d="M130 260 L85 310 L70 305"
            stroke="#00FF94"
            strokeWidth="16"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M270 260 L315 310 L330 305"
            stroke="#00FF94"
            strokeWidth="16"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />

          {/* Thick tail */}
          <path
            d="M180 430 Q140 460, 100 470 Q60 475, 30 465"
            stroke="#00FF94"
            strokeWidth="22"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Atomic breath energy hint */}
      <circle cx="200" cy="115" r="30" fill="#00FF94" opacity="0.05">
        <animate attributeName="r" values="30;50;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

// Animated particles for the hero background
const Particle: React.FC<{ delay: number; left: string; size: number }> = ({ delay, left, size }) => (
  <div
    className="absolute bottom-0 rounded-full bg-zilla-shopify/30"
    style={{
      left,
      width: size,
      height: size,
      animation: `rise ${3 + Math.random() * 2}s ease-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

export const GrowzillaHeroWithRoar: React.FC = () => {
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

      {/* Radial gradient glow from center - Shopify green */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 255, 148, 0.10) 0%, transparent 60%)',
        }}
      />

      {/* AUTHENTIC GODZILLA - With mighty roar animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-35 pointer-events-none">
        <AuthenticGodzilla className="w-[700px] h-[850px]" />
      </div>

      {/* Floating energy orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-zilla-shopify/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-zilla-shopify/3 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Rising particles (growth energy) */}
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
                className="w-8 h-8 rounded-full bg-gradient-to-br from-zilla-shopify/80 to-zilla-acid/60 border-2 border-zilla-black flex items-center justify-center text-zilla-black text-xs font-bold"
              >
                {letter}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-300">
            <span className="text-zilla-shopify font-semibold">180+</span> elite brands
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
          Stop guessing why customers leave. AI instantly detects revenue leaks,
          <span className="text-zilla-shopify font-semibold"> crushes bottlenecks</span>, and
          unleashes explosive growth. Join 180+ elite 7-8 figure merchants dominating Shopify.
        </p>

        {/* Value props */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-10 transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { icon: '🔍', text: 'ICP Archetype AI' },
            { icon: '⚡', text: '90-Second Install' },
            { icon: '💰', text: '$47M+ Recovered' },
          ].map((prop) => (
            <div
              key={prop.text}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zilla-charcoal/50 border border-zilla-shopify/20"
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
            Install Growzilla — Crush Leaks
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
            Join The Elite
          </a>
        </div>

        {/* Trust signals */}
        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="badge-zilla">
            <span className="w-2 h-2 rounded-full bg-zilla-shopify animate-pulse" />
            30-day free trial
          </div>
          <div className="badge-zilla bg-zilla-warning/10 text-zilla-warning border-zilla-warning/30">
            <span className="w-2 h-2 rounded-full bg-zilla-warning animate-pulse" />
            No credit card required
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 text-gray-500 hover:text-zilla-shopify transition-colors animate-bounce hidden sm:block"
        aria-label="Scroll to next section"
      >
        <ChevronDownIcon className="h-8 w-8" />
      </button>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zilla-black to-transparent pointer-events-none" />
    </section>
  );
};

export default GrowzillaHeroWithRoar;
