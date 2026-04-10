import React, { useState, useEffect } from 'react';
import { PlatformIcon, type Platform } from './PlatformIcon';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface BrandBadgeProps {
  /** Store domain to fetch brand logo for */
  domain: string;
  /** Badge size in pixels (default 32) */
  size?: number;
  /** Fallback platform icon if logo fails to load */
  fallbackPlatform?: Platform;
  /** Optional className for the root element */
  className?: string;
}

// ─── Cache Helpers ──────────────────────────────────────────────────────────

const CACHE_PREFIX = 'growzilla_brand_';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachedLogo {
  url: string | null;
  cachedAt: number;
}

function getCachedLogo(domain: string): string | null | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${domain}`);
    if (!raw) return undefined;
    const cached: CachedLogo = JSON.parse(raw);
    if (Date.now() - cached.cachedAt > CACHE_TTL_MS) {
      localStorage.removeItem(`${CACHE_PREFIX}${domain}`);
      return undefined;
    }
    return cached.url;
  } catch {
    return undefined;
  }
}

function setCachedLogo(domain: string, url: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CachedLogo = { url, cachedAt: Date.now() };
    localStorage.setItem(`${CACHE_PREFIX}${domain}`, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — ignore
  }
}

// ─── Brand Badge Component ──────────────────────────────────────────────────

export function BrandBadge({
  domain,
  size = 32,
  fallbackPlatform,
  className,
}: BrandBadgeProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check cache first
    const cached = getCachedLogo(domain);
    if (cached !== undefined) {
      if (cached) {
        setLogoUrl(cached);
      } else {
        setError(true);
      }
      return;
    }

    // Fetch from API
    const controller = new AbortController();
    fetch(`/api/brand/${domain}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: { logo_url?: string }) => {
        if (data.logo_url) {
          setLogoUrl(data.logo_url);
          setCachedLogo(domain, data.logo_url);
        } else {
          setCachedLogo(domain, null);
          setError(true);
        }
      })
      .catch(() => {
        setCachedLogo(domain, null);
        setError(true);
      });

    return () => controller.abort();
  }, [domain]);

  // Show fallback while loading or on error
  const showFallback = !loaded || error;

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      {/* Always render fallback, hide when logo loaded */}
      {showFallback && fallbackPlatform && (
        <PlatformIcon platform={fallbackPlatform} size={size} />
      )}
      {showFallback && !fallbackPlatform && (
        <span
          className="rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-medium"
          style={{ width: size, height: size }}
        >
          {domain.charAt(0).toUpperCase()}
        </span>
      )}

      {/* Logo image — hidden until loaded */}
      {logoUrl && !error && (
        <img
          src={logoUrl}
          alt={`${domain} logo`}
          width={size}
          height={size}
          className={`rounded-full object-cover ${loaded ? '' : 'hidden'}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setCachedLogo(domain, null);
          }}
        />
      )}
    </span>
  );
}
