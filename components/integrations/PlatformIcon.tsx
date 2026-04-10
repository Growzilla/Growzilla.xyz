import React from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'meta_ads' | 'google_ads';

export interface PlatformIconProps {
  /** Which platform icon to render */
  platform: Platform;
  /** Icon size in pixels (default 40) */
  size?: number;
  /** Optional className for the root svg */
  className?: string;
}

// ─── Brand Colors ───────────────────────────────────────────────────────────

export const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: '#E4405F',
  tiktok: '#000000',
  youtube: '#FF0000',
  meta_ads: '#0866FF',
  google_ads: '#4285F4',
};

// ─── SVG Paths ──────────────────────────────────────────────────────────────

function InstagramIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E4405F" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="#E4405F" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="#E4405F" />
    </svg>
  );
}

function TikTokIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M16.6 5.82A4.28 4.28 0 0 1 15.56 3h-3.1v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.13 2.56 5.48 5.7 5.48 3.15 0 5.69-2.55 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.86-1.48z"
        fill="currentColor"
      />
    </svg>
  );
}

function YouTubeIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.67 31.67 0 0 0 0 12a31.67 31.67 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.67 31.67 0 0 0 24 12a31.67 31.67 0 0 0-.5-5.81z"
        fill="#FF0000"
      />
      <path d="M9.75 15.02l6.25-3.02-6.25-3.02v6.04z" fill="white" />
    </svg>
  );
}

function MetaAdsIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54V9.85c0-2.52 1.49-3.93 3.78-3.93 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33v7A10.02 10.02 0 0 0 22 12.06c0-5.54-4.5-10.02-10-10.02z"
        fill="#0866FF"
      />
    </svg>
  );
}

function GoogleAdsIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3.29 16.59l5.4-9.36 3.46 2-5.4 9.36z" fill="#FBBC04" />
      <path d="M15.31 7.23l5.4 9.36-3.46 2-5.4-9.36z" fill="#4285F4" />
      <circle cx="5.29" cy="18.59" r="2.8" fill="#34A853" />
    </svg>
  );
}

// ─── Platform Icon Component ────────────────────────────────────────────────

const ICON_MAP: Record<Platform, React.FC<{ size: number; className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  meta_ads: MetaAdsIcon,
  google_ads: GoogleAdsIcon,
};

export function PlatformIcon({ platform, size = 40, className }: PlatformIconProps) {
  const IconComponent = ICON_MAP[platform];
  if (!IconComponent) return null;
  return <IconComponent size={size} className={className} />;
}
