import React from 'react';

interface GrowzillaLogoProps {
  variant?: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { icon: 32, text: 'text-xl', spacing: 'gap-2' },
  md: { icon: 40, text: 'text-2xl', spacing: 'gap-3' },
  lg: { icon: 56, text: 'text-3xl', spacing: 'gap-3' },
  xl: { icon: 72, text: 'text-4xl', spacing: 'gap-4' },
};

export const GrowzillaLogo: React.FC<GrowzillaLogoProps> = ({
  variant = 'full',
  size = 'md',
  animated = true,
  className = '',
}) => {
  const config = sizeConfig[size];

  // Kaiju-inspired icon - stylized monster footprint/claw with growth arrow
  const ZillaIcon = () => (
    <svg
      width={config.icon}
      height={config.icon}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? 'drop-shadow-zilla' : ''} transition-all duration-300`}
    >
      <defs>
        {/* Neon glow filter */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient for icon */}
        <linearGradient id="zillaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF66" />
          <stop offset="50%" stopColor="#39FF14" />
          <stop offset="100%" stopColor="#00E676" />
        </linearGradient>
        {/* Pulse animation gradient */}
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF66">
            <animate attributeName="stop-color" values="#00FF66;#39FF14;#00FF66" dur="2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#39FF14">
            <animate attributeName="stop-color" values="#39FF14;#00E676;#39FF14" dur="2s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>

      {/* Background glow circle */}
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="url(#zillaGradient)"
        strokeWidth="1"
        opacity="0.3"
        className={animated ? 'animate-pulse' : ''}
      />

      {/* Main monster claw/footprint shape */}
      <g filter={animated ? "url(#neonGlow)" : undefined}>
        {/* Central claw */}
        <path
          d="M32 12 L32 28 L38 34 L32 40 L32 52"
          stroke={animated ? "url(#pulseGradient)" : "url(#zillaGradient)"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Left claw */}
        <path
          d="M20 20 L26 32 L20 44"
          stroke={animated ? "url(#pulseGradient)" : "url(#zillaGradient)"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right claw */}
        <path
          d="M44 20 L38 32 L44 44"
          stroke={animated ? "url(#pulseGradient)" : "url(#zillaGradient)"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Growth arrow pointing up from center */}
        <path
          d="M32 8 L26 16 L30 16 L30 24 L34 24 L34 16 L38 16 Z"
          fill={animated ? "url(#pulseGradient)" : "url(#zillaGradient)"}
        />
        {/* Impact rings */}
        <circle
          cx="32"
          cy="52"
          r="6"
          fill="none"
          stroke="url(#zillaGradient)"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <circle
          cx="32"
          cy="52"
          r="10"
          fill="none"
          stroke="url(#zillaGradient)"
          strokeWidth="1"
          opacity="0.3"
        />
      </g>
    </svg>
  );

  const Wordmark = () => (
    <div className={`flex items-baseline ${config.text} font-display tracking-wider`}>
      <span className="text-white">GROW</span>
      <span className={`text-zilla-neon ${animated ? 'text-glow' : ''}`}>ZILLA</span>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <ZillaIcon />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <Wordmark />
      </div>
    );
  }

  // Full logo
  return (
    <div className={`inline-flex items-center ${config.spacing} ${className}`}>
      <ZillaIcon />
      <Wordmark />
    </div>
  );
};

export default GrowzillaLogo;
