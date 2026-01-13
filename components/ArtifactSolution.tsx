import React, { useState, useEffect, useRef } from 'react';
import {
  BoltIcon,
  CpuChipIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  metric: string;
  metricLabel: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Install The Artifact',
    description: 'One-click installation. The Growzilla AI integrates seamlessly with your Shopify store.',
    icon: CpuChipIcon,
    metric: '< 2 min',
    metricLabel: 'setup time',
  },
  {
    id: 2,
    title: 'AI Scans Everything',
    description: 'Our artifact analyzes every visitor behavior pattern, click, scroll, and exit intent.',
    icon: BoltIcon,
    metric: '100%',
    metricLabel: 'traffic analyzed',
  },
  {
    id: 3,
    title: 'Leaks Identified',
    description: 'Growzilla pinpoints exactly where and why visitors leave without converting.',
    icon: ChartBarIcon,
    metric: '47',
    metricLabel: 'avg. leaks found',
  },
  {
    id: 4,
    title: 'Monster Growth',
    description: 'Implement fixes, watch conversions climb. The artifact keeps optimizing.',
    icon: SparklesIcon,
    metric: '35%',
    metricLabel: 'avg. lift',
  },
];

// Animated circuit pattern
const CircuitPattern: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path
        d="M10 10h80v80H10z"
        fill="none"
        stroke="#00FF66"
        strokeWidth="0.5"
      />
      <circle cx="10" cy="10" r="3" fill="#00FF66" />
      <circle cx="90" cy="10" r="3" fill="#00FF66" />
      <circle cx="10" cy="90" r="3" fill="#00FF66" />
      <circle cx="90" cy="90" r="3" fill="#00FF66" />
      <path
        d="M10 50h30 M60 50h30 M50 10v30 M50 60v30"
        stroke="#00FF66"
        strokeWidth="0.5"
      />
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

// Animated data flow visualization
const DataFlow: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-8 bg-gradient-to-b from-zilla-neon to-transparent rounded-full transition-opacity duration-500 ${
          isActive ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          left: `${5 + i * 5}%`,
          top: '-32px',
          animation: isActive ? `leak-drip ${2 + Math.random() * 2}s ease-in infinite` : 'none',
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

export const ArtifactSolution: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  // Auto-advance through steps
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-zilla-black" />
      <CircuitPattern />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 102, 0.08) 0%, transparent 60%)',
        }}
      />

      <DataFlow isActive={isVisible} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/10 border border-zilla-neon/30 text-zilla-neon text-sm font-medium mb-6">
            <CpuChipIcon className="w-4 h-4" />
            THE SOLUTION
          </div>

          <h2 className="heading-zilla mb-6">
            INSTALL THE{' '}
            <span className="text-shimmer">ARTIFACT</span>
          </h2>

          <p className="subheading-zilla mx-auto">
            A powerful AI system that lives in your store, constantly analyzing,
            learning, and optimizing. It doesn't sleep. It doesn't guess.
            <span className="text-zilla-neon font-semibold"> It hunts leaks.</span>
          </p>
        </div>

        {/* Main visualization */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Artifact visualization */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-zilla-neon/20 animate-counter-spin" />

              {/* Middle ring */}
              <div
                className="absolute inset-8 rounded-full border-2 border-zilla-neon/30"
                style={{ animation: 'spin 15s linear infinite' }}
              />

              {/* Inner ring with glow */}
              <div
                className="absolute inset-16 rounded-full border-2 border-zilla-neon/50 animate-glow-pulse"
              />

              {/* Central artifact core */}
              <div className="absolute inset-24 rounded-full bg-zilla-charcoal/50 border-2 border-zilla-neon flex items-center justify-center shadow-zilla-glow-xl">
                <div className="text-center">
                  <CpuChipIcon className="w-16 h-16 text-zilla-neon mx-auto mb-2" />
                  <div className="font-display text-xl text-zilla-neon tracking-wider">
                    GROWZILLA
                  </div>
                  <div className="text-xs text-gray-500 uppercase">AI ARTIFACT</div>
                </div>
              </div>

              {/* Orbiting data points */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 90}deg) translateY(-180px)`,
                    animation: `spin ${10 + i * 2}s linear infinite`,
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-zilla-neon shadow-zilla-glow" />
                </div>
              ))}

              {/* Step indicators around the circle */}
              {steps.map((step, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const radius = 200;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(i)}
                    className={`absolute w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeStep === i
                        ? 'bg-zilla-neon text-zilla-black scale-110 shadow-zilla-glow-lg'
                        : 'bg-zilla-charcoal text-gray-400 hover:bg-zilla-charcoal/80'
                    }`}
                    style={{
                      top: `calc(50% + ${y}px - 24px)`,
                      left: `calc(50% + ${x}px - 24px)`,
                    }}
                  >
                    <step.icon className="w-6 h-6" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Steps detail */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left card-zilla transition-all duration-300 ${
                  activeStep === index
                    ? 'border-zilla-neon/50 bg-zilla-neon/5 shadow-zilla-glow'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step number */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display text-lg transition-colors ${
                      activeStep === index
                        ? 'bg-zilla-neon text-zilla-black'
                        : 'bg-zilla-charcoal text-gray-500'
                    }`}
                  >
                    {step.id}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <div className="text-right">
                        <div
                          className={`font-display text-lg ${
                            activeStep === index ? 'text-zilla-neon' : 'text-gray-500'
                          }`}
                        >
                          {step.metric}
                        </div>
                        <div className="text-xs text-gray-500">{step.metricLabel}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{step.description}</p>

                    {/* Progress bar for active step */}
                    {activeStep === index && (
                      <div className="mt-3 h-1 bg-zilla-charcoal rounded-full overflow-hidden">
                        <div
                          className="h-full bg-zilla-neon rounded-full"
                          style={{
                            animation: 'border-flow 4s linear forwards',
                            width: '100%',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {[
                { icon: ShieldCheckIcon, label: 'GDPR Compliant' },
                { icon: BoltIcon, label: 'Real-time Analysis' },
                { icon: ArrowPathIcon, label: 'Auto-optimization' },
                { icon: ChartBarIcon, label: 'Deep Analytics' },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zilla-charcoal/30 border border-zilla-neon/10"
                >
                  <feature.icon className="w-4 h-4 text-zilla-neon" />
                  <span className="text-xs text-gray-400">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtifactSolution;
