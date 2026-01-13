import React, { useState, useEffect, useRef } from 'react';
import { ExclamationTriangleIcon, CurrencyDollarIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface LeakItem {
  id: string;
  label: string;
  percentage: number;
  lostRevenue: string;
  description: string;
}

const leakData: LeakItem[] = [
  {
    id: 'checkout',
    label: 'Checkout Abandonment',
    percentage: 68,
    lostRevenue: '$23,400',
    description: 'Visitors add to cart but never complete purchase',
  },
  {
    id: 'bounce',
    label: 'Product Page Bounce',
    percentage: 45,
    lostRevenue: '$18,200',
    description: 'High-intent visitors leaving without exploring',
  },
  {
    id: 'mobile',
    label: 'Mobile Drop-off',
    percentage: 52,
    lostRevenue: '$15,800',
    description: 'Mobile users struggling with poor UX',
  },
  {
    id: 'navigation',
    label: 'Navigation Confusion',
    percentage: 34,
    lostRevenue: '$12,100',
    description: 'Users can\'t find what they\'re looking for',
  },
];

// Animated money drip visualization
const MoneyDrip: React.FC<{ delay: number }> = ({ delay }) => (
  <div
    className="absolute text-zilla-danger text-2xl"
    style={{
      left: `${20 + Math.random() * 60}%`,
      animation: `drip 3s ease-in infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    $
  </div>
);

// Leak meter component
const LeakMeter: React.FC<{ percentage: number; isVisible: boolean }> = ({ percentage, isVisible }) => (
  <div className="relative h-2 w-full bg-zilla-charcoal rounded-full overflow-hidden">
    <div
      className="absolute inset-y-0 left-0 bg-gradient-to-r from-zilla-danger to-red-400 rounded-full transition-all duration-1000 ease-out"
      style={{
        width: isVisible ? `${percentage}%` : '0%',
        boxShadow: '0 0 10px rgba(255, 68, 68, 0.5)',
      }}
    />
    {/* Pulse effect on the end */}
    <div
      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-zilla-danger rounded-full transition-all duration-1000"
      style={{
        left: isVisible ? `calc(${percentage}% - 6px)` : '-6px',
        boxShadow: '0 0 15px rgba(255, 68, 68, 0.8)',
      }}
    />
  </div>
);

export const LeakVisualization: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLeak, setHoveredLeak] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalLost = leakData.reduce((acc, leak) => {
    const num = parseInt(leak.lostRevenue.replace(/[$,]/g, ''));
    return acc + num;
  }, 0);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zilla-black via-zilla-dark to-zilla-black" />

      {/* Animated money drips in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <MoneyDrip key={i} delay={i * 0.4} />
        ))}
      </div>

      {/* Red warning glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 68, 68, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-danger/10 border border-zilla-danger/30 text-zilla-danger text-sm font-medium mb-6">
            <ExclamationTriangleIcon className="w-4 h-4" />
            REVENUE EMERGENCY
          </div>

          <h2 className="heading-zilla mb-6">
            YOUR STORE IS{' '}
            <span className="text-zilla-danger" style={{ textShadow: '0 0 30px rgba(255, 68, 68, 0.5)' }}>
              BLEEDING
            </span>{' '}
            MONEY
          </h2>

          <p className="subheading-zilla mx-auto">
            Every day, thousands of potential customers visit your store and leave without buying.
            <span className="text-white font-semibold"> Not because they don't want your product</span>—
            because invisible leaks in your funnel are pushing them away.
          </p>
        </div>

        {/* Main visualization */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Leak funnel visualization */}
          <div className="relative">
            {/* Funnel shape */}
            <div className="relative bg-zilla-charcoal/30 rounded-2xl p-8 border border-zilla-danger/20">
              {/* Top - Full traffic */}
              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Monthly Traffic</div>
                <div className="text-4xl font-display text-white">50,000</div>
                <div className="text-gray-400">visitors</div>
              </div>

              {/* Funnel visual */}
              <div className="relative h-64 flex items-center justify-center">
                <svg viewBox="0 0 300 250" className="w-full h-full">
                  <defs>
                    <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00FF66" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FF4444" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  {/* Funnel outline */}
                  <path
                    d="M50 30 L250 30 L200 220 L100 220 Z"
                    fill="url(#funnelGradient)"
                    stroke="#FF4444"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                  />
                  {/* Leak holes */}
                  {[
                    { cx: 75, cy: 80, r: 8 },
                    { cx: 225, cy: 100, r: 10 },
                    { cx: 85, cy: 140, r: 6 },
                    { cx: 215, cy: 160, r: 9 },
                  ].map((hole, i) => (
                    <g key={i}>
                      <circle
                        cx={hole.cx}
                        cy={hole.cy}
                        r={hole.r}
                        fill="#FF4444"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.6;0.9;0.6"
                          dur={`${1 + i * 0.3}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* Drip from hole */}
                      <path
                        d={`M${hole.cx} ${hole.cy + hole.r} Q${hole.cx} ${hole.cy + 30} ${hole.cx + (i % 2 ? 20 : -20)} ${hole.cy + 50}`}
                        stroke="#FF4444"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 4"
                        opacity="0.5"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;8"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  ))}
                </svg>

                {/* Money dripping labels */}
                <div className="absolute -left-4 top-1/4 text-zilla-danger text-sm font-mono animate-pulse">
                  -$23K
                </div>
                <div className="absolute -right-4 top-1/3 text-zilla-danger text-sm font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
                  -$18K
                </div>
                <div className="absolute -left-4 top-2/3 text-zilla-danger text-sm font-mono animate-pulse" style={{ animationDelay: '1s' }}>
                  -$15K
                </div>
              </div>

              {/* Bottom - Conversions */}
              <div className="text-center mt-6">
                <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Actual Conversions</div>
                <div className="text-4xl font-display text-zilla-danger">847</div>
                <div className="text-gray-400">orders (1.7% CR)</div>
              </div>

              {/* Total lost revenue */}
              <div className="mt-8 p-4 bg-zilla-danger/10 rounded-xl border border-zilla-danger/30 text-center">
                <div className="text-sm text-zilla-danger uppercase tracking-wider mb-1">Total Monthly Revenue Lost</div>
                <div
                  className="text-3xl font-display text-zilla-danger"
                  style={{ textShadow: '0 0 20px rgba(255, 68, 68, 0.5)' }}
                >
                  ${totalLost.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Leak breakdown cards */}
          <div className="space-y-4">
            {leakData.map((leak, index) => (
              <div
                key={leak.id}
                className={`card-zilla cursor-pointer transition-all duration-300 ${
                  hoveredLeak === leak.id
                    ? 'border-zilla-danger/50 bg-zilla-danger/5'
                    : ''
                }`}
                onMouseEnter={() => setHoveredLeak(leak.id)}
                onMouseLeave={() => setHoveredLeak(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zilla-danger/10">
                      <ArrowTrendingDownIcon className="w-5 h-5 text-zilla-danger" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{leak.label}</h3>
                      <p className="text-sm text-gray-500">{leak.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-display text-zilla-danger">{leak.lostRevenue}</div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                </div>

                {/* Leak meter */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Leak severity</span>
                    <span className="text-zilla-danger font-mono">{leak.percentage}%</span>
                  </div>
                  <LeakMeter percentage={leak.percentage} isVisible={isVisible} />
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-zilla-danger/20 to-zilla-charcoal/50 border border-zilla-danger/30">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-zilla-danger/20 animate-pulse">
                  <CurrencyDollarIcon className="w-6 h-6 text-zilla-danger" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">This is fixable.</p>
                  <p className="text-sm text-gray-400">Growzilla identifies exactly where you're leaking and fixes it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeakVisualization;
