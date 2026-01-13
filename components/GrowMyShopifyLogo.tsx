import React from 'react';

interface GrowMyShopifyLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const GrowMyShopifyLogo: React.FC<GrowMyShopifyLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  const sizeClasses = {
    sm: { icon: 'h-7 w-7', text: 'text-lg', tagline: 'text-[10px]' },
    md: { icon: 'h-8 w-8', text: 'text-xl', tagline: 'text-xs' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl', tagline: 'text-sm' },
    xl: { icon: 'h-14 w-14', text: 'text-3xl', tagline: 'text-base' },
  };

  const iconSize = sizeClasses[size].icon;
  const textSize = sizeClasses[size].text;
  const taglineSize = sizeClasses[size].tagline;

  // Premium custom icon - Growth chart with ascending bars forming a crown
  const PremiumIcon = () => (
    <div className={`${iconSize} relative flex-shrink-0`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background glow effect */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="logoGradientDark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main shape - Abstract growth chart forming upward arrow */}
        <g filter="url(#logoGlow)">
          {/* Base platform */}
          <rect x="4" y="32" width="32" height="3" rx="1.5" fill="url(#logoGradientDark)" />

          {/* Rising bars with increasing height - growth visualization */}
          <rect x="6" y="24" width="5" height="8" rx="1" fill="url(#logoGradient)" opacity="0.6" />
          <rect x="13" y="18" width="5" height="14" rx="1" fill="url(#logoGradient)" opacity="0.75" />
          <rect x="20" y="12" width="5" height="20" rx="1" fill="url(#logoGradient)" opacity="0.9" />
          <rect x="27" y="6" width="5" height="26" rx="1" fill="url(#logoGradient)" />

          {/* Ascending arrow on top - representing breakthrough growth */}
          <path
            d="M32 4L36 10H33V16H31V10H28L32 4Z"
            fill="url(#logoGradient)"
          />

          {/* Sparkle accent - representing success */}
          <circle cx="36" cy="6" r="1.5" fill="#fbbf24" />
          <circle cx="34" cy="3" r="1" fill="#fbbf24" opacity="0.7" />
        </g>
      </svg>
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`flex items-center ${className}`}>
        <PremiumIcon />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <PremiumIcon />
        <div className="mt-2 text-center">
          <span className={`${textSize} font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight`}>
            Grow<span className="text-emerald-600">My</span>Shopify
          </span>
          {showTagline && (
            <div className={`${taglineSize} text-gray-500 font-medium tracking-wide uppercase mt-0.5`}>
              Scale to 7 Figures
            </div>
          )}
        </div>
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <PremiumIcon />
      <div className="flex flex-col">
        <span className={`${textSize} font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight leading-none`}>
          Grow<span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">My</span>Shopify
        </span>
        {showTagline && (
          <span className={`${taglineSize} text-gray-500 font-medium tracking-wider uppercase`}>
            Scale to 7 Figures
          </span>
        )}
      </div>
    </div>
  );
};

export default GrowMyShopifyLogo;
