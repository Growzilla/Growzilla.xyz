import React from 'react';
import Head from 'next/head';

/* ═══════════════════════════════════════════════════════════════
   ADS V1 — Simple 3-line Swedish ads, centered, clean
   Original format: Callout → Meat → CTA
   ═══════════════════════════════════════════════════════════════ */

const ADS = [
  {
    id: 'v1-01',
    angle: 'Guessing what works',
    line1: 'Driver du ett beauty brand på Shopify och gissar vad som funkar?',
    line2: 'Vi visar exakt vilket content som driver köp — inte klick, köp.',
    line3: 'Se dina siffror nu',
  },
  {
    id: 'v1-02',
    angle: 'Posting without knowing',
    line1: 'Driver du ett växande skönhetsvarumärke på Shopify som postar utan att veta vad som säljer?',
    line2: 'Vi kopplar varje content-piece till riktig försäljning — i realtid.',
    line3: 'Testa gratis',
  },
  {
    id: 'v1-03',
    angle: 'Paying creators no ROI',
    line1: 'Driver du ett Shopify-brand och betalar creators utan att veta vad du får tillbaka?',
    line2: 'Vi visar exakt vilken creator som driver intäkter — och vilken som kostar.',
    line3: 'Se din data',
  },
  {
    id: 'v1-04',
    angle: 'Creators not converting',
    line1: 'Driver du ett DTC-brand inom beauty och dina creators konverterar inte?',
    line2: 'Skapa AI UGC direkt från din produktkatalog — utan att boka en enda creator.',
    line3: 'Börja generera',
  },
  {
    id: 'v1-05',
    angle: 'Content not converting',
    line1: 'Driver du ett skincare brand på Shopify där contentet inte säljer?',
    line2: 'Vi skapar och testar vinnande hooks automatiskt tills vi hittar det som konverterar.',
    line3: 'Testa gratis i 48h',
  },
  {
    id: 'v1-06',
    angle: 'Not enough content',
    line1: 'Driver du ett ecom brand inom beauty och hinner inte skapa tillräckligt med content?',
    line2: 'Generera 10 AI-videos från din produktkatalog på minuter — direkt i Shopify.',
    line3: 'Kom igång',
  },
  {
    id: 'v1-07',
    angle: "Which creator works",
    line1: 'Driver du ett beauty brand på Shopify med flera creators — utan att veta vem som faktiskt säljer?',
    line2: 'Vi visar exakt vilken creator, vilket content och vilken kanal som driver intäkter.',
    line3: 'Se din attribution',
  },
  {
    id: 'v1-08',
    angle: 'Expensive UGC',
    line1: 'Driver du ett Shopify-brand och betalar 3000+ kr per UGC-video?',
    line2: 'Skapa AI UGC från dina egna produktbilder — samma kvalitet, bråkdelen av kostnaden.',
    line3: 'Testa gratis',
  },
  {
    id: 'v1-09',
    angle: 'No clear strategy',
    line1: 'Driver du ett växande beauty brand på Shopify utan tydlig content-strategi?',
    line2: 'Vi bygger din AI-driven content-maskin: skapa, testa, se vad som säljer — allt i Shopify.',
    line3: 'Boka en demo',
  },
  {
    id: 'v1-10',
    angle: 'No time',
    line1: 'Driver du ett skönhetsvarumärke på Shopify och har inte tid att skapa content?',
    line2: 'Vi genererar UGC, testar hooks och visar vad som konverterar — automatiskt.',
    line3: 'Kom igång på 5 min',
  },
];

const INTEGRATIONS = [
  { src: '/images/meta-logo.png', alt: 'Meta', invert: true },
  { src: '/images/TikTok_logo.svg', alt: 'TikTok', invert: true },
  { src: '/images/google_ads-logo.jpeg', alt: 'Google Ads', invert: true },
  { src: '/images/shopify_logo.png', alt: 'Shopify', invert: false },
];

function AdCard({ ad }: { ad: typeof ADS[number] }) {
  return (
    <div
      id={ad.id}
      style={{
        width: 1080,
        height: 1080,
        background: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 96px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* Line 1: Callout */}
      <p style={{
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
        marginBottom: 32,
        maxWidth: 880,
      }}>
        {ad.line1}
      </p>

      {/* Line 2: Meat */}
      <p style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: 24,
        fontWeight: 400,
        lineHeight: 1.45,
        marginBottom: 48,
        maxWidth: 780,
      }}>
        {ad.line2}
      </p>

      {/* Line 3: CTA */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '16px 40px',
        background: '#00FF94',
        borderRadius: 8,
      }}>
        <span style={{ color: '#0A0A0A', fontSize: 18, fontWeight: 600 }}>
          {ad.line3}
        </span>
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Trust bar — bottom */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00B67A" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}>Trustpilot ★★★★★</span>
        </div>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {INTEGRATIONS.map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              style={{
                height: 18,
                width: 'auto',
                maxWidth: 64,
                objectFit: 'contain',
                opacity: 0.35,
                ...(logo.invert ? { filter: 'invert(1) hue-rotate(180deg)' } : {}),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Ads1Page() {
  return (
    <>
      <Head>
        <title>Meta Ads v1 — Simple 3-Line | Growzilla</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body, #__next {
            background: #0A0A0A;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #fff;
          }
        `}</style>
      </Head>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{
            color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            V1 — Simple 3-Line Format
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: 8 }}>
            10 Angles <span style={{ color: '#00FF94' }}>×</span> Centered Copy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14 }}>
            Clean 3-line ads: callout → meat → CTA. Screenshot each 1080×1080 card.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, alignItems: 'center' }}>
          {ADS.map((ad, i) => (
            <div key={ad.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{
                  color: '#00FF94', fontSize: 12, fontWeight: 700,
                  background: 'rgba(0,255,148,0.08)', padding: '4px 12px', borderRadius: 4,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500 }}>
                  {ad.angle}
                </span>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden', width: 540, height: 540 }}>
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 1080, height: 1080 }}>
                  <AdCard ad={ad} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
