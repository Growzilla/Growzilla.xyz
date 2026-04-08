import React, { useState } from 'react';
import Head from 'next/head';

/* ═══════════════════════════════════════════════════════════════
   AD DATA — Each ad has:
   - image headline (2-3 lines, centered on the 1080x1080 creative)
   - type: 'hook' | 'before-after' | 'equation'
   - primaryText: long-form copy for Meta Ads Manager text field
   ═══════════════════════════════════════════════════════════════ */

interface Ad {
  id: string;
  angle: string;
  type: 'hook' | 'before-after' | 'equation';
  headline: string[];
  beforeAfter?: { before: string[]; after: string[] };
  equation?: { without: string; with: string; resultWithout: string; resultWith: string };
  primaryText: string;
}

const ADS: Ad[] = [
  {
    id: 'angle-01-guessing',
    angle: 'Guessing what works',
    type: 'hook',
    headline: [
      'Du gissar vilket content',
      'som säljer. Vi visar det.',
    ],
    primaryText: `Driver du ett beauty brand på Shopify och gissar vad som funkar i din marknadsföring?

De flesta Shopify-brands postar content utan att veta vad som faktiskt driver köp. Man tittar på likes, räckvidd och klick — men ingen av de siffrorna visar vad som genererar intäkter.

Growzilla kopplar varje content-piece direkt till försäljning. Du ser exakt:

- Vilket content som driver köp (inte bara klick)
- Vilken creator som genererar mest intäkter
- Vilken plattform som ger bäst ROI
- Var du slösar pengar utan att veta om det

Funkar med Meta Ads, TikTok, Instagram och Google Ads.

Bygg direkt i Shopify — ingen kod, ingen setup.

Testa gratis i 60 sekunder med vår content-kalkylator.`,
  },
  {
    id: 'angle-02-posting-blind',
    angle: 'Posting without knowing',
    type: 'hook',
    headline: [
      'Ditt content kostar pengar.',
      'Vet du vad det ger tillbaka?',
    ],
    primaryText: `Driver du ett växande skönhetsvarumärke på Shopify som postar content utan att veta vad som säljer?

Så här ser det ut för de flesta:

1. Du betalar creators eller skapar content internt
2. Du postar på Instagram, TikTok, YouTube
3. Du tittar på likes och räckvidd
4. Du har ingen aning om vad som faktiskt driver köp

Problemet: Meta Ads Manager visar inte vilken creator eller vilket content som genererar intäkter. Du ser klick — inte köp.

Growzilla fixar det. Vi kopplar varje content-piece till riktig försäljning i realtid, direkt i Shopify.

Resultat: du slutar gissa och börjar skala det som funkar.

Testa gratis — ta vår 60-sekunders kalkylator och se hur mycket du förlorar varje månad.`,
  },
  {
    id: 'angle-03-creator-roi',
    angle: 'Paying creators no ROI',
    type: 'before-after',
    headline: [
      'Dina creators kostar tusenlappar.',
      'Vet du vilken som säljer?',
    ],
    beforeAfter: {
      before: ['Betalar creators', 'Ingen attribution', 'Gissar ROI', 'Skalar i blindo'],
      after: ['Ser exakt vem som säljer', 'Varje köp kopplat till creator', 'Vet din faktiska ROI', 'Skalar det som funkar'],
    },
    primaryText: `Driver du ett Shopify-brand och betalar creators utan att veta vad du får tillbaka?

Du lägger 5 000, 10 000, kanske 30 000 kr per månad på creators. Men kan du svara på:

- Vilken creator som faktiskt driver köp?
- Vilken plattform som ger bäst avkastning?
- Vilka content-pieces som konverterar — och vilka som bara kostar?

Om svaret är nej betalar du i blindo. Och det gör de flesta beauty brands på Shopify.

Growzilla visar exakt vilken creator som driver intäkter — per content-piece, per plattform, per kampanj.

Ingen gissning. Bara data.

Installera direkt i Shopify. Funkar med Meta Ads, TikTok, Instagram, YouTube och Google Ads.

Ta vår gratis content-kalkylator och se hur mycket du faktiskt förlorar.`,
  },
  {
    id: 'angle-04-creators-dont-convert',
    angle: 'Creators not converting',
    type: 'hook',
    headline: [
      'Dina creators postar.',
      'Men ingenting säljer.',
    ],
    primaryText: `Driver du ett DTC-brand inom beauty och dina creators konverterar inte?

Du har bra content. Snygga bilder. Proffsiga reels. Men försäljningen rör sig inte.

Problemet är sällan contentet — det är att du inte vet VILKET content som funkar. Utan attribution gissar du vilken creator, vilken hook och vilken plattform som driver intäkter.

Growzilla löser det på två sätt:

1. Vi visar exakt vilken creator och vilket content som driver köp — inte klick, köp.
2. Vi genererar AI UGC direkt från din produktkatalog — utan att boka en enda creator.

Skapa 10 AI-videos på minuter. Testa hooks automatiskt. Se vad som konverterar.

Bygg din content-maskin direkt i Shopify.

Börja med vår gratis kalkylator — 60 sekunder.`,
  },
  {
    id: 'angle-05-content-not-converting',
    angle: 'Content not converting',
    type: 'before-after',
    headline: [
      'Bra content. Inga köp.',
      'Problemet är inte contentet.',
    ],
    beforeAfter: {
      before: ['Postar regelbundet', 'Fina likes och kommentarer', 'Ingen vet vad som säljer', 'Samma strategi varje månad'],
      after: ['Varje post kopplad till köp', 'Ser exakt vad som konverterar', 'Skalar vinnande content', 'Testar nya hooks automatiskt'],
    },
    primaryText: `Driver du ett skincare brand på Shopify där contentet inte säljer?

Du postar regelbundet. Bilderna är snygga. Engagement ser bra ut. Men omsättningen rör sig inte.

Det beror inte på att ditt content är dåligt. Det beror på att du inte vet vilket content som driver köp — och vilket som bara genererar likes.

Growzilla visar exakt vilken content-piece som leder till försäljning. Varje klick, varje kundresa, varje köp — kopplat till rätt content.

Vi skapar och testar också vinnande hooks automatiskt tills vi hittar det som konverterar. AI UGC direkt från din produktkatalog.

Funkar med Meta Ads, Instagram, TikTok och Google Ads.

Testa gratis i 48h — ingen risk, avsluta när du vill.`,
  },
  {
    id: 'angle-06-scale-content',
    angle: 'Not enough content',
    type: 'hook',
    headline: [
      '3 000 kr per UGC-video.',
      '10 AI-videos på 5 minuter.',
    ],
    primaryText: `Driver du ett ecom brand inom beauty och hinner inte skapa tillräckligt med content?

Content är dyrt. En UGC-video kostar 3 000-8 000 kr. En creator-deal tar veckor att boka. Och du behöver minst 10-20 nya creatives per månad för att testa och skala.

Growzilla genererar AI UGC direkt från din produktkatalog i Shopify.

Så här funkar det:
1. Välj produkt från din Shopify-katalog
2. AI genererar 10+ video-varianter
3. Testa olika hooks och CTAs automatiskt
4. Se exakt vad som konverterar till köp

Samma kvalitet. Bråkdelen av kostnaden. Ingen creator att boka.

Funkar med Meta Ads, TikTok, Instagram, YouTube.

Kom igång gratis — generera dina första AI-videos på under 5 minuter.`,
  },
  {
    id: 'angle-07-which-creator',
    angle: "Don't know which creator works",
    type: 'equation',
    headline: [
      '5 creators. 50 000 kr/mån.',
      'Vilken säljer mest?',
    ],
    equation: {
      without: 'Shopify + Creators',
      with: 'Shopify + Creators + Growzilla',
      resultWithout: 'Ingen aning vem som säljer',
      resultWith: 'Exakt attribution per creator',
    },
    primaryText: `Driver du ett beauty brand på Shopify med flera creators — utan att veta vem som faktiskt säljer?

Du betalar 3-5 creators. Sammanlagt kanske 30 000-100 000 kr per månad. Men du har ingen aning om:

- Vem som faktiskt driver köp
- Vilken plattform som ger bäst avkastning per creator
- Vilka content-pieces som konverterar vs. bara kostar

Meta Ads Manager visar inte detta. Google Analytics visar inte detta. Shopify admin visar inte detta.

Growzilla visar det. Vi bygger fullständig attribution per creator, per content-piece, per kanal — visualiserat i Sankey-diagram som ingen annan har.

Se exakt var pengarna går och vad de ger tillbaka.

Installera direkt i Shopify. Ingen kod, inget krångel.

Börja med vår gratis kalkylator — se hur mycket du förlorar per creator.`,
  },
  {
    id: 'angle-08-expensive-ugc',
    angle: 'Expensive UGC',
    type: 'hook',
    headline: [
      'UGC kostar dig 3 000 kr/video.',
      'Vårt kostar ingenting.',
    ],
    primaryText: `Driver du ett Shopify-brand och betalar 3 000+ kr per UGC-video?

En genomsnittlig beauty brand på Shopify lägger 15 000-50 000 kr per månad på UGC-content. Och hälften av det konverterar inte ens.

Det finns ett bättre sätt:

Growzilla genererar AI UGC från dina egna produktbilder — samma kvalitet, bråkdelen av kostnaden.

- Välj produkt direkt i Shopify
- AI skapar 10+ video-varianter på minuter
- Testa hooks automatiskt
- Se exakt vad som konverterar till köp

Du behöver fortfarande creators för varumärkesbyggande. Men för performance-content — det som ska testa, iterera och skala — behöver du AI UGC.

Funkar med Meta Ads, TikTok, Instagram och YouTube.

Testa gratis. Generera dina första videos på under 5 minuter.`,
  },
  {
    id: 'angle-09-no-strategy',
    angle: 'No clear strategy',
    type: 'hook',
    headline: [
      'Du postar content.',
      'Men du har ingen strategi.',
    ],
    primaryText: `Driver du ett växande beauty brand på Shopify utan tydlig content-strategi?

Så här ser det ut: du skapar content varje vecka. Du postar på Instagram och TikTok. Ibland boostar du det med Meta Ads. Men du har ingen aning om:

- Vilken typ av content som driver köp
- Vilka hooks som konverterar
- Vilka creators som ger avkastning
- Var pengarna faktiskt går

Growzilla bygger din AI-drivna content-strategi direkt i Shopify:

1. Se exakt vilket content som driver försäljning (attribution)
2. Generera AI UGC från din produktkatalog (content)
3. Testa hooks och format automatiskt (optimering)

Allt i en plattform. Allt i Shopify.

Funkar med Meta Ads, TikTok, Instagram, YouTube och Google Ads.

Boka en gratis 15-min genomgång — vi visar exakt var du förlorar pengar.`,
  },
  {
    id: 'angle-10-no-time',
    angle: 'No time',
    type: 'hook',
    headline: [
      'Du har inte tid att skapa content.',
      'Det behöver du inte heller.',
    ],
    primaryText: `Driver du ett skönhetsvarumärke på Shopify och har inte tid att skapa content?

Du driver varumärket, sköter lager, svarar kunder, hanterar returer — och ska dessutom skapa content varje vecka?

De flesta beauty brands fastnar här. Content kräver tid, pengar och planering. Och utan data vet du inte ens om det ger något.

Growzilla löser båda problemen:

1. Vi genererar AI UGC direkt från din produktkatalog — inga creators, inga shootar, inga deadlines
2. Vi visar exakt vad som konverterar — sluta skapa content i blindo

Resultat: mer content, bättre resultat, mindre jobb.

10 AI-videos genererade på under 5 minuter. Automatisk testning. Attribution på varje content-piece.

Funkar med Meta Ads, TikTok, Instagram, YouTube och Google Ads.

Kom igång på 5 min — börja med vår gratis kalkylator.`,
  },
];

/* ─── Integration logos ─── */
const INTEGRATIONS = [
  { src: '/images/meta-logo.png', alt: 'Meta', invert: true },
  { src: '/images/TikTok_logo.svg', alt: 'TikTok', invert: true },
  { src: '/images/google_ads-logo.jpeg', alt: 'Google Ads', invert: true },
  { src: '/images/shopify_logo.png', alt: 'Shopify', invert: false },
];

/* ═══════════════════════════════════════════════
   TRUST BAR — Bottom of every ad creative
   Appointwise style: logos + Trustpilot in a row
   ═══════════════════════════════════════════════ */
function TrustBar() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
    }}>
      {/* Trustpilot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00B67A" />
        </svg>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500 }}>Trustpilot</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>★★★★★</span>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)' }} />

      {/* Integration logos */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {INTEGRATIONS.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            style={{
              height: 20,
              width: 'auto',
              maxWidth: 72,
              objectFit: 'contain',
              opacity: 0.4,
              ...(logo.invert ? { filter: 'invert(1) hue-rotate(180deg)' } : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   AD CARD — 1080x1080 creative
   Appointwise style: dark bg, centered headline,
   product visual with green glow, trust bar bottom
   ═══════════════════════════════════════════════ */
function AdCard({ ad }: { ad: Ad }) {
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
        justifyContent: 'space-between',
        padding: '80px 80px 56px 80px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Headline (centered, large, 2-3 lines) ── */}
      <div style={{ textAlign: 'center', maxWidth: 860, zIndex: 2 }}>
        {ad.headline.map((line, i) => (
          <p key={i} style={{
            color: '#FFFFFF',
            fontSize: 46,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            marginBottom: i < ad.headline.length - 1 ? 4 : 0,
          }}>
            {line}
          </p>
        ))}
      </div>

      {/* ── Middle Visual ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}>
        {ad.type === 'hook' && (
          <div style={{ position: 'relative' }}>
            {/* Green glow under card */}
            <div style={{
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 400,
              height: 120,
              background: 'radial-gradient(ellipse, rgba(0,255,148,0.15) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }} />
            {/* Product card */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '32px 48px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              position: 'relative',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/growzilla-kaiju.png" alt="Growzilla" style={{ height: 36, width: 36, objectFit: 'contain' }} />
              <div>
                <p style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 600, marginBottom: 2 }}>
                  Growzilla for Shopify
                </p>
                <p style={{ color: '#00FF94', fontSize: 14, fontWeight: 500 }}>
                  Creator Attribution + AI UGC
                </p>
              </div>
            </div>
          </div>
        )}

        {ad.type === 'before-after' && ad.beforeAfter && (
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Before card */}
            <div style={{
              width: 380,
              padding: '32px 28px',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.02)',
            }}>
              <p style={{
                color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: 24, textAlign: 'center',
              }}>Utan Growzilla</p>
              {ad.beforeAfter.before.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: i < ad.beforeAfter!.before.length - 1 ? 16 : 0,
                }}>
                  <span style={{ color: '#ff4444', fontSize: 18 }}>✕</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            {/* After card */}
            <div style={{
              width: 380,
              padding: '32px 28px',
              border: '1px solid rgba(0,255,148,0.15)',
              borderRadius: 16,
              background: 'rgba(0,255,148,0.03)',
            }}>
              <p style={{
                color: '#00FF94', fontSize: 13, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: 24, textAlign: 'center',
              }}>Med Growzilla</p>
              {ad.beforeAfter.after.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: i < ad.beforeAfter!.after.length - 1 ? 16 : 0,
                }}>
                  <span style={{ color: '#00FF94', fontSize: 18 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {ad.type === 'equation' && ad.equation && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
            {/* Without */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                padding: '14px 28px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: 500 }}>
                  {ad.equation.without}
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 24, fontWeight: 300 }}>=</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: 500 }}>
                {ad.equation.resultWithout}
              </span>
            </div>
            {/* With */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                padding: '14px 28px',
                background: 'rgba(0,255,148,0.04)',
                border: '1px solid rgba(0,255,148,0.15)',
                borderRadius: 12,
              }}>
                <span style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 600 }}>
                  {ad.equation.with}
                </span>
              </div>
              <span style={{ color: '#00FF94', fontSize: 24, fontWeight: 300 }}>=</span>
              <span style={{ color: '#00FF94', fontSize: 18, fontWeight: 600 }}>
                {ad.equation.resultWith}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Trust Bar (bottom) ── */}
      <TrustBar />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE — All 10 ads: creative + primary text
   ═══════════════════════════════════════════════ */
export default function AdsPage() {
  const [expandedPrimary, setExpandedPrimary] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Meta Ad Creatives | Growzilla</title>
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
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            Meta Ad Creatives — Swedish / Beauty / Shopify
          </p>
          <h1 style={{
            fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em',
            color: '#FFFFFF', marginBottom: 8,
          }}>
            10 Angles <span style={{ color: '#00FF94' }}>×</span> Click Test
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.6 }}>
            Each ad = 1080×1080 image creative + long-form primary text for Meta Ads Manager.
            <br />
            Screenshot the card, paste the primary text into the ad.
          </p>
        </div>

        {/* Ads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {ADS.map((ad, i) => (
            <div key={ad.id}>
              {/* Label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
              }}>
                <span style={{
                  color: '#00FF94', fontSize: 12, fontWeight: 700,
                  background: 'rgba(0,255,148,0.08)', padding: '4px 12px', borderRadius: 4,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500 }}>
                  {ad.angle}
                </span>
                <span style={{
                  color: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 500,
                  background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 4,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {ad.type}
                </span>
              </div>

              {/* Two-column: Creative + Primary Text */}
              <div style={{ display: 'flex', gap: 32 }}>
                {/* Creative (scaled down to 540px) */}
                <div style={{
                  border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8,
                  overflow: 'hidden', flexShrink: 0,
                  width: 540, height: 540,
                }}>
                  <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 1080, height: 1080 }}>
                    <AdCard ad={ad} />
                  </div>
                </div>

                {/* Primary Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
                  }}>
                    Primary Text (paste into Meta Ads Manager)
                  </p>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8,
                      padding: 24,
                      maxHeight: expandedPrimary === i ? 'none' : 400,
                      overflow: 'hidden',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    onClick={() => setExpandedPrimary(expandedPrimary === i ? null : i)}
                  >
                    <pre style={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: 13,
                      lineHeight: 1.7,
                      fontFamily: "'Inter', sans-serif",
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      {ad.primaryText}
                    </pre>
                    {expandedPrimary !== i && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: 80,
                        background: 'linear-gradient(transparent, rgba(10,10,10,0.95))',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        paddingBottom: 12,
                      }}>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>Click to expand</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
