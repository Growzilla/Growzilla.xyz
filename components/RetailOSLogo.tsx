import React from 'react';
import { CogIcon } from '@heroicons/react/24/solid';

interface RetailOSLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RetailOSLogo: React.FC<RetailOSLogoProps> = ({ 
  variant = 'horizontal', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: { icon: 'h-5 w-5', text: 'text-lg' },
    md: { icon: 'h-6 w-6', text: 'text-xl' },
    lg: { icon: 'h-8 w-8', text: 'text-2xl' },
  };

  const iconSize = sizeClasses[size].icon;
  const textSize = sizeClasses[size].text;

  if (variant === 'icon-only') {
    return (
      <div className={`flex items-center ${className}`}>
        <CogIcon className={`${iconSize} text-green-600`} />
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <CogIcon className={`${iconSize} text-green-600 mb-1`} />
        <span className={`${textSize} font-bold text-gray-900`}>RetailOS</span>
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CogIcon className={`${iconSize} text-green-600`} />
      <span className={`${textSize} font-bold text-gray-900`}>RetailOS</span>
    </div>
  );
};

export default RetailOSLogo;

