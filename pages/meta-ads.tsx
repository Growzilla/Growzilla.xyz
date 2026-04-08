import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

/* ═══════════════════════════════════════════════════════════════
   META-ADS — Brandfetch-powered ad creative (no-time angle)
   1080×1350 (4:5 Meta feed ratio) · Screenshot target
   ═══════════════════════════════════════════════════════════════ */

interface BrandLogos {
  meta: string | null;
  shopify: string | null;
  tiktok: string | null;
  google: string | null;
}

/* ─── Brandfetch API helper ─── */
async function fetchBrandLogo(domain: string, apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.logos || !Array.isArray(data.logos)) return null;

    // Prefer icon type (square, works in circles), then symbol, then any
    const priorityTypes = ['icon', 'symbol', 'logo'];
    for (const type of priorityTypes) {
      const match = data.logos.find((l: any) => l.type === type);
      if (match?.formats?.length) {
        const png = match.formats.find((f: any) => f.format === 'png');
        if (png?.src) return png.src;
        const svg = match.formats.find((f: any) => f.format === 'svg');
        if (svg?.src) return svg.src;
      }
    }
    // Fallback: any logo with any format
    for (const logo of data.logos) {
      if (logo.formats?.length) {
        const fmt = logo.formats.find((f: any) => f.src);
        if (fmt?.src) return fmt.src;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const apiKey = process.env.BRANDFETCH_CLIENT_ID ?? '';
  const domains = ['meta.com', 'shopify.com', 'tiktok.com', 'google.com'];

  const results = await Promise.allSettled(
    domains.map(d => fetchBrandLogo(d, apiKey))
  );

  const [meta, shopify, tiktok, google] = results.map(r =>
    r.status === 'fulfilled' ? r.value : null
  );

  return {
    props: { logos: { meta, shopify, tiktok, google } },
    revalidate: 86400,
  };
};

/* ─── Fallback inline SVG logos (from ads3.tsx) ─── */
function MetaLogoFallback({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#0668E1" />
      <path d="M25.2 10.8c-1.44 0-2.64.84-3.96 2.64l-1.08 1.56-1.08-1.56c-1.32-1.8-2.52-2.64-3.96-2.64-2.76 0-4.92 3.48-4.92 8.04 0 3.12 1.44 5.16 3.6 5.16 1.44 0 2.4-.72 3.84-2.88l1.56-2.4 1.56 2.4c1.32 2.04 2.4 2.88 3.84 2.88 2.16 0 3.6-2.04 3.6-5.16 0-4.56-2.16-8.04-4.92-8.04h-.08zm-10.08 10.8c-.96 0-1.56-.96-1.56-2.76 0-2.88 1.08-5.52 2.52-5.52.72 0 1.44.6 2.4 1.92l.6.84-1.44 2.16c-1.44 2.16-1.92 2.64-2.52 3.12v.24zm5.76 0v-.24c-.6-.48-1.08-.96-2.52-3.12l-1.44-2.16.6-.84c.96-1.32 1.68-1.92 2.4-1.92 1.44 0 2.52 2.64 2.52 5.52 0 1.8-.6 2.76-1.56 2.76z" fill="white"/>
    </svg>
  );
}

function ShopifyLogoFallback({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#96BF48" />
      <path d="M23.4 10.2c-.06 0-.12.06-.18.06-.06 0-.6.12-.6.12s-.42-.42-.48-.48c-.06-.06-.18-.06-.24-.06l-.18.06c-.06.12-.18.36-.3.6-.36-.18-.78-.36-1.2-.36h-.06c-.36-.42-.78-.6-1.14-.6-2.82.06-4.14 3.54-4.56 5.34l-1.86.6c-.54.18-.54.18-.6.72-.06.36-1.5 11.52-1.5 11.52L22.2 30l5.76-1.26s-3.96-18-3.96-18.12c-.06-.24-.18-.36-.6-.42zm-2.1.9c-.18.06-.42.12-.66.18v-.12c0-.54-.06-1.02-.18-1.38.48.06.78.6.84 1.32zm-1.38-1.14c.12.36.18.84.18 1.5v.06l-1.38.42c.24-1.02.72-1.56 1.2-1.98zm-.6-.42c.06 0 .18.06.24.12-.54.48-1.14 1.2-1.38 2.94l-1.08.36c.3-1.32 1.02-3.42 2.22-3.42z" fill="white"/>
    </svg>
  );
}

function TikTokLogoFallback({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" fill="#010101" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <path d="M24.6 14.4c-1.26 0-2.4-.48-3.24-1.32-.72-.72-1.2-1.68-1.32-2.76h-2.52v11.76c0 1.44-1.14 2.64-2.58 2.64s-2.58-1.2-2.58-2.64c0-1.44 1.14-2.64 2.58-2.64.24 0 .48.06.72.12v-2.64c-.24-.06-.48-.06-.72-.06-2.88 0-5.22 2.34-5.22 5.22s2.34 5.22 5.22 5.22 5.22-2.34 5.22-5.22v-6c1.08.78 2.4 1.26 3.84 1.26v-2.64c-.12 0-.24-.06-.36-.06z" fill="white"/>
      <path d="M24.6 14.4c-1.26 0-2.4-.48-3.24-1.32-.72-.72-1.2-1.68-1.32-2.76h-2.52v11.76c0 1.44-1.14 2.64-2.58 2.64s-2.58-1.2-2.58-2.64c0-1.44 1.14-2.64 2.58-2.64.24 0 .48.06.72.12v-2.64c-.24-.06-.48-.06-.72-.06-2.88 0-5.22 2.34-5.22 5.22s2.34 5.22 5.22 5.22 5.22-2.34 5.22-5.22v-6c1.08.78 2.4 1.26 3.84 1.26v-2.64c-.12 0-.24-.06-.36-.06z" fill="#25F4EE" opacity="0.4" transform="translate(-1, -1)"/>
      <path d="M24.6 14.4c-1.26 0-2.4-.48-3.24-1.32-.72-.72-1.2-1.68-1.32-2.76h-2.52v11.76c0 1.44-1.14 2.64-2.58 2.64s-2.58-1.2-2.58-2.64c0-1.44 1.14-2.64 2.58-2.64.24 0 .48.06.72.12v-2.64c-.24-.06-.48-.06-.72-.06-2.88 0-5.22 2.34-5.22 5.22s2.34 5.22 5.22 5.22 5.22-2.34 5.22-5.22v-6c1.08.78 2.4 1.26 3.84 1.26v-2.64c-.12 0-.24-.06-.36-.06z" fill="#FE2C55" opacity="0.4" transform="translate(1, 1)"/>
    </svg>
  );
}

function GoogleAdsLogoFallback({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#4285F4" />
      <path d="M10.8 24.6l4.8-8.4 2.4 4.2-4.8 8.4c-1.2.6-2.76.12-3.36-1.08-.6-1.2-.12-2.76 1.08-3.36l-.12.24z" fill="#FBBC04"/>
      <path d="M15.6 16.2l4.8-8.4c1.2-.6 2.76-.12 3.36 1.08.6 1.2.12 2.76-1.08 3.36l-4.8 8.4-2.28-4.44z" fill="#34A853"/>
      <circle cx="25.2" cy="24" r="2.4" fill="#EA4335"/>
    </svg>
  );
}

/* ─── Platform logo: Brandfetch URL or fallback SVG ─── */
function PlatformLogo({
  url,
  fallback,
  size = 40,
  rounded = true,
}: {
  url: string | null;
  fallback: React.ReactNode;
  size?: number;
  rounded?: boolean;
}) {
  if (!url) return <>{fallback}</>;
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: rounded ? '50%' : 8,
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        style={{ width: size * 0.85, height: size * 0.85, objectFit: 'contain' }}
      />
    </div>
  );
}

/* ─── Brand badge ─── */
function BrandBadge() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 20px',
      background: 'rgba(0,255,148,0.06)',
      border: '1px solid rgba(0,255,148,0.15)',
      borderRadius: 10,
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/growzilla-kaiju.png"
        alt="Growzilla"
        style={{ height: 34, width: 34, objectFit: 'contain' }}
      />
      <span style={{
        color: '#00FF94',
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      }}>
        Growzilla
      </span>
    </div>
  );
}

/* ─── Trust bar ─── */
function TrustBar({ logos }: { logos: BrandLogos }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <PlatformLogo url={logos.meta} fallback={<MetaLogoFallback size={40} />} size={40} />
      <PlatformLogo url={logos.shopify} fallback={<ShopifyLogoFallback size={40} />} size={40} />
      <PlatformLogo url={logos.tiktok} fallback={<TikTokLogoFallback size={40} />} size={40} />
      <PlatformLogo url={logos.google} fallback={<GoogleAdsLogoFallback size={40} />} size={40} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   THE AD — "no-time" angle, pure comparison, 1080×1350
   ═══════════════════════════════════════════════════════════════ */
function NoTimeAd({ logos }: { logos: BrandLogos }) {
  const innan = [
    'Skapar content manuellt varje vecka',
    'Ingen aning vad som konverterar',
    '3 000+ kr per UGC-video',
    'Gissar vilka hooks som funkar',
    '0 attribution på content',
  ];

  const efter = [
    '10 AI-videos på 5 minuter',
    'Full attribution per content-piece',
    'Automatisk hook-testning',
    'Bråkdel av kostnaden',
    'Data visar exakt vad som säljer',
  ];

  return (
    <div
      id="meta-ad-no-time"
      style={{
        width: 1080,
        height: 1350,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 48px 40px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Brand badge top-center */}
      <BrandBadge />

      {/* Comparison cards */}
      <div style={{ display: 'flex', gap: 20, width: '100%' }}>
        {/* INNAN card */}
        <div style={{
          flex: 1,
          minHeight: 750,
          padding: '40px 36px 36px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 16,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 40,
            textAlign: 'center',
          }}>
            Innan
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
            {innan.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ color: '#ff4444', fontSize: 26, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>✕</span>
                <span style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}>{item}</span>
              </div>
            ))}
          </div>
          {/* Dimmed platform logos */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            marginTop: 'auto', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ opacity: 0.35 }}>
              <PlatformLogo url={logos.meta} fallback={<MetaLogoFallback size={28} />} size={28} />
            </div>
            <div style={{ opacity: 0.35 }}>
              <PlatformLogo url={logos.shopify} fallback={<ShopifyLogoFallback size={28} />} size={28} />
            </div>
          </div>
        </div>

        {/* EFTER card */}
        <div style={{
          flex: 1,
          minHeight: 750,
          padding: '40px 36px 36px',
          border: '1px solid rgba(0,255,148,0.15)',
          borderRadius: 16,
          background: 'rgba(0,255,148,0.03)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{
            color: '#00FF94',
            fontSize: 16,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 40,
            textAlign: 'center',
          }}>
            Efter
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
            {efter.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ color: '#00FF94', fontSize: 26, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}>{item}</span>
              </div>
            ))}
          </div>
          {/* Growzilla + Shopify bright */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginTop: 'auto', paddingTop: 28, borderTop: '1px solid rgba(0,255,148,0.08)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/growzilla-kaiju.png" alt="Growzilla" style={{ height: 30, width: 30, objectFit: 'contain' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: 500 }}>+</span>
            <PlatformLogo url={logos.shopify} fallback={<ShopifyLogoFallback size={30} />} size={30} />
          </div>
        </div>
      </div>

      {/* Bottom: CTA + Trust bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{
          padding: '16px 48px',
          background: '#00FF94',
          borderRadius: 12,
        }}>
          <span style={{
            color: '#0A0A0A',
            fontSize: 20,
            fontWeight: 700,
          }}>
            Kom igång gratis →
          </span>
        </div>
        <TrustBar logos={logos} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function MetaAdsPage({ logos }: { logos: BrandLogos }) {
  return (
    <>
      <Head>
        <title>Meta Ads — no-time | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body, #__next {
            background: #050505;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #fff;
          }
        `}</style>
      </Head>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            Angle 01 — no-time · 1080×1350 · Swedish / Beauty / Shopify
          </p>
          <h1 style={{
            fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em',
            color: '#FFFFFF', marginBottom: 8,
          }}>
            Ingen tid att skapa content
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.6 }}>
            Pure comparison format · Brandfetch-powered platform logos
            <br />
            Screenshot the card below at 1080×1350 for Meta Ads Manager.
          </p>
        </div>

        {/* The ad creative */}
        <div style={{
          display: 'flex', gap: 32,
        }}>
          <div style={{
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            overflow: 'hidden',
            flexShrink: 0,
            width: 432,
            height: 540,
          }}>
            <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: 1080, height: 1350 }}>
              <NoTimeAd logos={logos} />
            </div>
          </div>

          {/* Primary text for Meta Ads Manager */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
            }}>Primary Text</p>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 8,
              padding: 20,
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 14,
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}>
{`Driver du ett skönhetsvarumärke på Shopify och har inte tid att skapa content?

Du driver varumärket, sköter lager, svarar kunder, hanterar returer och ska dessutom skapa content varje vecka.

De flesta beauty brands fastnar här. Content kräver tid, pengar och planering. Utan data vet du inte ens vad som faktiskt säljer.

Growzilla löser båda problemen:

Vi genererar AI UGC direkt från din produktkatalog. Inga influencers, inga shootar, inga deadlines
Vi visar exakt vad som konverterar. Sluta skapa content i blindo

Resultat: mer content, bättre resultat, mindre jobb.

10 AI-videos på under 5 minuter. Automatisk testning. Attribution på varje content-piece.

Fungerar med Meta Ads, TikTok, Instagram, YouTube och Google Ads.

Kom igång på 5 min. Testa vår gratis kalkylator.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
