type Props = { size?: number }

export function PlatformLogoFallback({ domain, size = 56 }: { domain: string; size?: number }) {
  switch (domain) {
    case 'instagram.com':
      return <InstagramFallback size={size} />
    case 'facebook.com':
      return <FacebookFallback size={size} />
    case 'tiktok.com':
      return <TikTokFallback size={size} />
    case 'meta.com':
      return <MetaFallback size={size} />
    case 'capcut.com':
      return <CapCutFallback size={size} />
    default:
      return null
  }
}

function InstagramFallback({ size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FD5949" />
          <stop offset="50%" stopColor="#D6249F" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#ig)" />
      <circle cx="24" cy="24" r="9" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="35" cy="13" r="2.5" fill="white" />
    </svg>
  )
}

function FacebookFallback({ size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="20" fill="#1877F2" />
      <path
        d="M27 24h5.5l1-6H27v-3.5c0-1.7.5-2.9 3-2.9H33.5V6.1C32.6 6 31.2 6 29.6 6 25.8 6 23 8.4 23 13v4h-4.5v6H23v14.5h4V24z"
        fill="white"
      />
    </svg>
  )
}

function TikTokFallback({ size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M33.5 16.8a8.8 8.8 0 01-5.2-1.7V30a8 8 0 11-4.5-7.2v3.4a4.5 4.5 0 104.5-4.5V14h3.7c.7 2.8 2.8 4.9 5.5 5.5v-2.7z"
        fill="white"
      />
      <path
        d="M33.5 16.8a8.8 8.8 0 01-5.2-1.7V30a8 8 0 11-4.5-7.2v3.4a4.5 4.5 0 104.5-4.5V14h3.7c.7 2.8 2.8 4.9 5.5 5.5v-2.7z"
        fill="#25F4EE"
        opacity="0.55"
        transform="translate(-1.5,-1.5)"
      />
      <path
        d="M33.5 16.8a8.8 8.8 0 01-5.2-1.7V30a8 8 0 11-4.5-7.2v3.4a4.5 4.5 0 104.5-4.5V14h3.7c.7 2.8 2.8 4.9 5.5 5.5v-2.7z"
        fill="#FE2C55"
        opacity="0.55"
        transform="translate(1.5,1.5)"
      />
    </svg>
  )
}

function MetaFallback({ size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path
        d="M8 30c3.5-8 7.5-12 12-12 3 0 4.8 2 7.2 6.5C29.6 20 31.4 18 34.4 18c4.5 0 8.5 4 10 12-3.2-5.5-6.5-8-9.5-8-3 0-4.8 2-7.2 6.5C25.4 22 23.6 24 20.6 24c-4.5 0-8.5-4-10-12z"
        fill="#0081FB"
      />
      <path
        d="M8 30c3.5-8 7.5-12 12-12 3 0 4.8 2 7.2 6.5C29.6 20 31.4 18 34.4 18c4.5 0 8.5 4 10 12-3.2-5.5-6.5-8-9.5-8-3 0-4.8 2-7.2 6.5C25.4 22 23.6 24 20.6 24c-4.5 0-8.5-4-10-12z"
        fill="white"
        opacity="0.92"
      />
    </svg>
  )
}

function CapCutFallback({ size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#141414" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path d="M16 32L22 16l4 10 3-6 3 12H16z" fill="white" />
    </svg>
  )
}