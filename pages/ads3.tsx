import React from 'react';
import Head from 'next/head';

/* ═══════════════════════════════════════════════════════════════
   ADS3 — 20 creatives: 10 pure comparison + 10 hybrid (hook+comparison)
   Based on 10firstads doc. wetracked.io visual style.
   1080×1350 (4:5 Meta feed ratio)
   ═══════════════════════════════════════════════════════════════ */

interface AdAngle {
  id: string;
  angle: string;
  hook: string;
  innan: string[];
  efter: string[];
  bottomLine: string;
  cta: string;
  primaryText: string;
}

const ANGLES: AdAngle[] = [
  {
    id: 'no-time',
    angle: 'Ingen tid',
    hook: 'Driver du ett beauty brand på Shopify och har inte tid att skapa content?',
    innan: ['Skapar content själv', 'Ingen tid kvar', 'Gissar vad som funkar'],
    efter: ['AI genererar 10 videos på 5 min', 'Full attribution', 'Fokus på att bygga'],
    bottomLine: 'Growzilla sköter contentet. Du bygger varumärket.',
    cta: 'Kom igång gratis',
    primaryText: `Driver du ett skönhetsvarumärke på Shopify och har inte tid att skapa content?

Du driver varumärket, sköter lager, svarar kunder, hanterar returer och ska dessutom skapa content varje vecka.

De flesta beauty brands fastnar här. Content kräver tid, pengar och planering. Utan data vet du inte ens vad som faktiskt säljer.

Growzilla löser båda problemen:

Vi genererar AI UGC direkt från din produktkatalog. Inga influencers, inga shootar, inga deadlines
Vi visar exakt vad som konverterar. Sluta skapa content i blindo

Resultat: mer content, bättre resultat, mindre jobb.

10 AI-videos på under 5 minuter. Automatisk testning. Attribution på varje content-piece.

Fungerar med Meta Ads, TikTok, Instagram, YouTube och Google Ads.

Kom igång på 5 min. Testa vår gratis kalkylator.`,
  },
  {
    id: 'expensive-ugc',
    angle: 'Dyrt UGC',
    hook: 'Betalar du 3 000+ kr per UGC-video för ditt Shopify-brand?',
    innan: ['3 000 kr per UGC-video', 'Hälften konverterar inte', 'Veckor att boka creators'],
    efter: ['10 AI-videos på minuter', 'Bråkdel av kostnaden', 'Inga bokningar'],
    bottomLine: 'AI UGC direkt från din produktkatalog i Shopify.',
    cta: 'Testa gratis',
    primaryText: `Driver du ett Shopify-brand och betalar 3 000+ kr per UGC-video?

Ett genomsnittligt beauty brand lägger 15 000–50 000 kr per månad på UGC. Och hälften konverterar inte ens.

Det finns ett bättre sätt:

Growzilla genererar AI UGC från dina egna produktbilder till en bråkdel av kostnaden.

Välj produkt direkt i Shopify
AI skapar 10+ videovarianter på minuter
Testa hooks automatiskt
Se exakt vad som driver köp

Du behöver fortfarande influencers för varumärkesbyggande. Men för content som ska testas, itereras och skalas räcker AI UGC långt.

Fungerar med Meta Ads, TikTok, Instagram och YouTube.

Testa gratis. Generera dina första videos på under 5 minuter.`,
  },
  {
    id: 'creators-no-roi',
    angle: 'Creators utan ROI',
    hook: 'Betalar du creators utan att veta vad du får tillbaka?',
    innan: ['Betalar creators i blindo', 'Ingen aning vem som säljer', 'Tittar på likes'],
    efter: ['Exakt attribution per creator', 'Ser vad som driver köp', 'Skalar vinnarna'],
    bottomLine: 'Se exakt vilken creator som driver intäkter.',
    cta: 'Se dina siffror',
    primaryText: `Driver du ett Shopify-brand och betalar influencers utan att veta vad du får tillbaka?

Du lägger 5 000, 10 000, kanske 30 000 kr per månad. Men kan du svara på:

Vilken influencer som faktiskt driver köp?
Vilken plattform som ger bäst avkastning?
Vilket content som konverterar och vilket som bara kostar?

Om svaret är nej lägger du pengar i blindo. Och det gör de flesta beauty brands.

Growzilla visar exakt vilken influencer som driver intäkter per content, per plattform och per kampanj.

Ingen gissning. Bara data.

Installera direkt i Shopify. Fungerar med Meta Ads, TikTok, Instagram, YouTube och Google Ads.

Testa vår gratis kalkylator och räkna på vad du faktiskt förlorar.`,
  },
  {
    id: 'competitors',
    angle: 'Konkurrenter',
    hook: 'Dina konkurrenter vet exakt vad som säljer. Du gissar fortfarande.',
    innan: ['Gissar vilka influencers som funkar', 'Tittar på likes', 'Skalar magkänsla'],
    efter: ['Full attribution per creator', 'Ser exakt vad som konverterar', 'Skalar vinnarna'],
    bottomLine: 'Samma typ av data. Bråkdel av priset.',
    cta: 'Se dina siffror nu',
    primaryText: `Medan du gissar vilka influencers som konverterar vet dina konkurrenter exakt.

De bästa beauty brands på Shopify har redan attribution. De ser vilken influencer, vilken plattform och vilket content som driver varje krona.

Du tittar fortfarande på likes.

Growzilla ger dig samma typ av data, till en bråkdel av priset.

Full attribution per influencer och content
Tydlig visualisering av hur intäkterna flödar
AI UGC så du kan testa 10x fler varianter

Dina konkurrenter skalar vinnarna. Du gissar fortfarande.

Sluta gissa. Se dina siffror nu.`,
  },
  {
    id: 'free-audit',
    angle: 'Gratis granskning',
    hook: 'Vill du veta var ditt beauty brand förlorar pengar på content?',
    innan: ['Vet inte var pengarna läcker', 'Content utan attribution', 'Betalar utan ROI'],
    efter: ['60 sekunders genomgång', 'Ser exakt var du förlorar', 'Vet vad du ska ändra'],
    bottomLine: 'Gratis kalkylator. Ingen registrering.',
    cta: 'Ta kalkylatorn nu',
    primaryText: `Vill du veta exakt var ditt beauty brand förlorar pengar på content som inte konverterar?

Vi erbjuder en gratis 60-sekunders genomgång.

Du svarar på 5 snabba frågor om ditt brand, dina influencers och din setup. Vi visar:

Hur mycket du förlorar varje månad på content utan attribution
Vilka influencers som sannolikt kostar mer än de ger
Vad du kan göra direkt för att öka ROI

Ingen registrering. Ingen säljpitch. Bara data.

Ta kalkylatorn nu. 60 sekunder.`,
  },
  {
    id: 'ai-ugc-machine',
    angle: 'AI UGC-maskin',
    hook: 'Tänk om du kunde skapa 10 UGC-videos på 5 minuter utan en enda creator?',
    innan: ['Bokar influencers', '3 000 kr/video', 'Väntar veckor', '3 creatives/mån'],
    efter: ['Välj produkt i Shopify', 'AI genererar videos', 'Testar hooks automatiskt', '20+/mån'],
    bottomLine: 'Din AI UGC-maskin direkt i Shopify.',
    cta: 'Kom igång gratis',
    primaryText: `Tänk om du kunde skapa 10 UGC-videos från din produktkatalog på 5 minuter utan att boka en enda influencer?

Growzilla bygger din AI UGC-maskin direkt i Shopify:

Välj produkt
AI genererar videovarianter med olika hooks
Vi testar dem automatiskt
Du ser exakt vad som driver köp

Ingen bokning. Ingen väntetid. Ingen kostnad på 3 000 kr per video.

Perfekt för beauty brands som behöver testa fler creatives men saknar tid eller budget.

Fungerar med Meta Ads, TikTok, Instagram och YouTube.

Kom igång gratis. Din första AI-video på under 5 minuter.`,
  },
  {
    id: 'scale-content',
    angle: 'Skala content',
    hook: 'Meta kräver 20 creatives i månaden. Du gör 3.',
    innan: ['UGC dyrt', 'Influencers tar tid', 'Aldrig testar tillräckligt', 'Skalar det du har'],
    efter: ['10+ AI-videos på minuter', 'Automatisk hook-testning', 'Skalar det som säljer'],
    bottomLine: 'Du behöver inte fler influencers. Du behöver fler varianter.',
    cta: 'Börja skala',
    primaryText: `Meta-algoritmerna kräver 20–30 creatives per månad för att hitta vinnare. Du gör kanske 3–5.

Det är inte ditt fel. UGC är dyrt, influencers tar tid och du har inget content team.

Men det betyder att du aldrig testar tillräckligt många hooks, vinklar och format. Du skalar det du har istället för det som faktiskt säljer.

Growzilla löser flaskhalsen:

Generera 10+ AI UGC-videos på minuter
Testa hooks automatiskt
Se exakt vad som konverterar
Skala vinnarna. Pausa förlorarna

Du behöver inte fler influencers. Du behöver fler varianter.

Fungerar med Meta Ads, TikTok, Instagram och YouTube.

Börja skala. Testa gratis.`,
  },
  {
    id: 'triple-whale-price',
    angle: 'Triple Whale-priset',
    hook: 'Betalar du $179/mån för Triple Whale? Eller tyckt att det är för dyrt?',
    innan: ['$179/mån', 'Byggt för stora brands', 'Betalar för funktioner du inte behöver'],
    efter: ['Attribution + AI UGC', 'Byggt för växande brands', 'Bråkdel av priset'],
    bottomLine: 'Det som spelar roll. Utan det som inte gör det.',
    cta: 'Jämför själv',
    primaryText: `Betalar du $179+ per månad för Triple Whale?

Eller har du tittat på det men tyckt att det är för dyrt?

Triple Whale är bra. Men byggt för brands med hög omsättning. Ligger du under det betalar du för funktioner du inte behöver.

Growzilla ger dig det som faktiskt spelar roll:

Attribution på influencer-nivå
Tydlig bild av hur intäkterna flödar
AI UGC direkt i Shopify

Allt till en bråkdel av priset. Byggt för växande Shopify brands.

Testa gratis och jämför själv.`,
  },
  {
    id: 'founder-burnout',
    angle: 'Grundar-utbrändhet',
    hook: 'Du är VD, marknadschef, content creator och kundtjänst samtidigt?',
    innan: ['Gör allt själv', 'Content som kanske säljer', 'Creators som kanske konverterar'],
    efter: ['AI skapar content åt dig', 'Attribution visar vad som funkar', 'Fokuserar på rätt saker'],
    bottomLine: 'Sluta göra allt. Börja göra rätt.',
    cta: 'Kom igång',
    primaryText: `Du startade ett beauty brand för att du älskar produkten.

Nu tillbringar du 80% av din tid på:

Skapa content som kanske säljer
Svara kunder på DMs
Sitta i Meta Ads Manager utan att förstå vad som händer
Boka influencers som kanske konverterar

Growzilla tar bort gissningen:

AI skapar content åt dig. 10 videos på 5 minuter
Attribution visar exakt vad som driver köp
Hooks testas automatiskt

Du behöver inte göra allt. Du behöver göra rätt saker.

Kom igång på 5 minuter direkt i Shopify.`,
  },
  {
    id: 'chatbot',
    angle: 'Chatbot',
    hook: 'Hur många köp missar du när din butik inte kan svara kunder?',
    innan: ['Kunder lämnar utan svar', 'Missade köp dygnet runt', 'Begränsad kundtjänst'],
    efter: ['AI-säljare 24/7', 'Rekommenderar rätt produkter', 'Driver köp automatiskt'],
    bottomLine: 'En AI-säljare i din Shopify-butik. Utan lön.',
    cta: 'Boka demo',
    primaryText: `Tänk om du hade en säljare i din Shopify-butik som:

Svarar kunder direkt, dygnet runt
Rekommenderar rätt produkter baserat på behov
Aldrig tar semester eller blir sjuk

Det är exakt vad vår AI-chatbot gör.

Installera direkt i Shopify. Den lär sig dina produkter, svarar på frågor och guidar kunder till köp.

Perfekt för brands med:

Komplexa produkter
Internationella kunder
Begränsad kundtjänst

Boka en demo så visar vi hur det fungerar i din butik.`,
  },
];

/* ─── Inline SVG logos — clean, colored, pop on dark bg ─── */
function MetaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#0668E1" />
      <path d="M25.2 10.8c-1.44 0-2.64.84-3.96 2.64l-1.08 1.56-1.08-1.56c-1.32-1.8-2.52-2.64-3.96-2.64-2.76 0-4.92 3.48-4.92 8.04 0 3.12 1.44 5.16 3.6 5.16 1.44 0 2.4-.72 3.84-2.88l1.56-2.4 1.56 2.4c1.32 2.04 2.4 2.88 3.84 2.88 2.16 0 3.6-2.04 3.6-5.16 0-4.56-2.16-8.04-4.92-8.04h-.08zm-10.08 10.8c-.96 0-1.56-.96-1.56-2.76 0-2.88 1.08-5.52 2.52-5.52.72 0 1.44.6 2.4 1.92l.6.84-1.44 2.16c-1.44 2.16-1.92 2.64-2.52 3.12v.24zm5.76 0v-.24c-.6-.48-1.08-.96-2.52-3.12l-1.44-2.16.6-.84c.96-1.32 1.68-1.92 2.4-1.92 1.44 0 2.52 2.64 2.52 5.52 0 1.8-.6 2.76-1.56 2.76z" fill="white"/>
    </svg>
  );
}

function ShopifyLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#96BF48" />
      <path d="M23.4 10.2c-.06 0-.12.06-.18.06-.06 0-.6.12-.6.12s-.42-.42-.48-.48c-.06-.06-.18-.06-.24-.06l-.18.06c-.06.12-.18.36-.3.6-.36-.18-.78-.36-1.2-.36h-.06c-.36-.42-.78-.6-1.14-.6-2.82.06-4.14 3.54-4.56 5.34l-1.86.6c-.54.18-.54.18-.6.72-.06.36-1.5 11.52-1.5 11.52L22.2 30l5.76-1.26s-3.96-18-3.96-18.12c-.06-.24-.18-.36-.6-.42zm-2.1.9c-.18.06-.42.12-.66.18v-.12c0-.54-.06-1.02-.18-1.38.48.06.78.6.84 1.32zm-1.38-1.14c.12.36.18.84.18 1.5v.06l-1.38.42c.24-1.02.72-1.56 1.2-1.98zm-.6-.42c.06 0 .18.06.24.12-.54.48-1.14 1.2-1.38 2.94l-1.08.36c.3-1.32 1.02-3.42 2.22-3.42z" fill="white"/>
    </svg>
  );
}

function TikTokLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" fill="#010101" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      <path d="M24.6 14.4c-1.26 0-2.4-.48-3.24-1.32-.72-.72-1.2-1.68-1.32-2.76h-2.52v11.76c0 1.44-1.14 2.64-2.58 2.64s-2.58-1.2-2.58-2.64c0-1.44 1.14-2.64 2.58-2.64.24 0 .48.06.72.12v-2.64c-.24-.06-.48-.06-.72-.06-2.88 0-5.22 2.34-5.22 5.22s2.34 5.22 5.22 5.22 5.22-2.34 5.22-5.22v-6c1.08.78 2.4 1.26 3.84 1.26v-2.64c-.12 0-.24-.06-.36-.06z" fill="white"/>
      <path d="M24.6 14.4c-1.26 0-2.4-.48-3.24-1.32-.72-.72-1.2-1.68-1.32-2.76h-2.52v11.76c0 1.44-1.14 2.64-2.58 2.64s-2.58-1.2-2.58-2.64c0-1.44 1.14-2.64 2.58-2.64.24 0 .48.06.72.12v-2.64c-.24-.06-.48-.06-.72-.06-2.88 0-5.22 2.34-5.22 5.22s2.34 5.22 5.22 5.22 5.22-2.34 5.22-5.22v-6c1.08.78 2.4 1.26 3.84 1.26v-2.64c-.12 0-.24-.06-.36-.06z" fill="#25F4EE" opacity="0.4" transform="translate(-1, -1)"/>
      <path d="M24.6 14.4c-1.26 0-2.4-.48-3.24-1.32-.72-.72-1.2-1.68-1.32-2.76h-2.52v11.76c0 1.44-1.14 2.64-2.58 2.64s-2.58-1.2-2.58-2.64c0-1.44 1.14-2.64 2.58-2.64.24 0 .48.06.72.12v-2.64c-.24-.06-.48-.06-.72-.06-2.88 0-5.22 2.34-5.22 5.22s2.34 5.22 5.22 5.22 5.22-2.34 5.22-5.22v-6c1.08.78 2.4 1.26 3.84 1.26v-2.64c-.12 0-.24-.06-.36-.06z" fill="#FE2C55" opacity="0.4" transform="translate(1, 1)"/>
    </svg>
  );
}

function GoogleAdsLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#4285F4" />
      <path d="M10.8 24.6l4.8-8.4 2.4 4.2-4.8 8.4c-1.2.6-2.76.12-3.36-1.08-.6-1.2-.12-2.76 1.08-3.36l-.12.24z" fill="#FBBC04"/>
      <path d="M15.6 16.2l4.8-8.4c1.2-.6 2.76-.12 3.36 1.08.6 1.2.12 2.76-1.08 3.36l-4.8 8.4-2.28-4.44z" fill="#34A853"/>
      <circle cx="25.2" cy="24" r="2.4" fill="#EA4335"/>
    </svg>
  );
}

function GrowzillaIcon({ size = 32 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/growzilla-kaiju.png" alt="Growzilla" style={{ height: size, width: size, objectFit: 'contain' }} />
  );
}

/* ─── Trust bar — bigger icons, colored, pop on black ─── */
function TrustBar({ size = 'normal' }: { size?: 'normal' | 'large' }) {
  const s = size === 'large' ? 40 : 32;
  const gap = size === 'large' ? 16 : 12;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap }}>
      <MetaLogo size={s} />
      <ShopifyLogo size={s} />
      <TikTokLogo size={s} />
      <GoogleAdsLogo size={s} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GROWZILLA BRAND BADGE — consistent brand anchor on every ad
   ═══════════════════════════════════════════════════════════════ */
function BrandBadge({ size = 'normal' }: { size?: 'normal' | 'small' }) {
  const h = size === 'small' ? 24 : 30;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: size === 'small' ? '6px 12px' : '8px 16px',
      background: 'rgba(0,255,148,0.06)',
      border: '1px solid rgba(0,255,148,0.15)',
      borderRadius: 8,
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/growzilla-kaiju.png" alt="Growzilla" style={{ height: h, width: h, objectFit: 'contain' }} />
      <span style={{
        color: '#00FF94',
        fontSize: size === 'small' ? 12 : 14,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      }}>
        Growzilla
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPARISON CARD — wetracked style, taller, logos inside
   ═══════════════════════════════════════════════════════════════ */
function ComparisonAd({ ad }: { ad: AdAngle }) {
  return (
    <div
      id={`comp-${ad.id}`}
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
      <BrandBadge size="small" />

      {/* ── Comparison Cards — fill the frame ── */}
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
            {ad.innan.map((item, i) => (
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
          {/* Platform logos in Innan card */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            marginTop: 'auto', paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ opacity: 0.35 }}><MetaLogo size={28} /></div>
            <div style={{ opacity: 0.35 }}><ShopifyLogo size={28} /></div>
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
            {ad.efter.map((item, i) => (
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
          {/* Growzilla + Shopify at bottom */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginTop: 'auto', paddingTop: 28, borderTop: '1px solid rgba(0,255,148,0.08)',
          }}>
            <GrowzillaIcon size={30} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: 500 }}>+</span>
            <ShopifyLogo size={30} />
          </div>
        </div>
      </div>

      {/* ── Bottom: CTA + Trust ── */}
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
            {ad.cta} →
          </span>
        </div>
        <TrustBar size="large" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HYBRID AD — Hook + Comparison + Bottom line + CTA
   ═══════════════════════════════════════════════════════════════ */
function HybridAd({ ad }: { ad: AdAngle }) {
  return (
    <div
      id={`hybrid-${ad.id}`}
      style={{
        width: 1080,
        height: 1350,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '44px 48px 40px',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── Hook text ── */}
      <div style={{ textAlign: 'center', maxWidth: 880 }}>
        <p style={{
          color: 'rgba(255,255,255,0.95)',
          fontSize: 36,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.025em',
        }}>
          {ad.hook}
        </p>
      </div>

      {/* ── Comparison Cards — taller, full width ── */}
      <div style={{ display: 'flex', gap: 20, width: '100%' }}>
        {/* INNAN */}
        <div style={{
          flex: 1,
          minHeight: 580,
          padding: '32px 32px 28px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 15,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 32,
            textAlign: 'center',
          }}>Innan</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, flex: 1 }}>
            {ad.innan.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ color: '#ff4444', fontSize: 24, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>✕</span>
                <span style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ opacity: 0.35 }}><MetaLogo size={26} /></div>
            <div style={{ opacity: 0.35 }}><ShopifyLogo size={26} /></div>
          </div>
        </div>

        {/* EFTER */}
        <div style={{
          flex: 1,
          minHeight: 580,
          padding: '32px 32px 28px',
          border: '1px solid rgba(0,255,148,0.15)',
          borderRadius: 14,
          background: 'rgba(0,255,148,0.03)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <p style={{
            color: '#00FF94',
            fontSize: 15,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 32,
            textAlign: 'center',
          }}>Efter</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, flex: 1 }}>
            {ad.efter.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ color: '#00FF94', fontSize: 24, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: 22,
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(0,255,148,0.08)',
          }}>
            <GrowzillaIcon size={28} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 15, fontWeight: 500 }}>+</span>
            <ShopifyLogo size={28} />
          </div>
        </div>
      </div>

      {/* ── Bottom: value prop + CTA + trust ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 18,
          fontWeight: 500,
          textAlign: 'center',
          lineHeight: 1.4,
          maxWidth: 700,
        }}>
          {ad.bottomLine}
        </p>
        <div style={{
          padding: '14px 44px',
          background: '#00FF94',
          borderRadius: 12,
        }}>
          <span style={{
            color: '#0A0A0A',
            fontSize: 18,
            fontWeight: 700,
          }}>
            {ad.cta} →
          </span>
        </div>
        <TrustBar size="large" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE — 20 ads: first 10 comparison, last 10 hybrid
   ═══════════════════════════════════════════════════════════════ */
export default function Ads3Page() {
  return (
    <>
      <Head>
        <title>Meta Ads v3 — Final Creatives | Growzilla</title>
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
            V3 — Final Creatives · 1080×1350 · Swedish / Beauty / Shopify
          </p>
          <h1 style={{
            fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em',
            color: '#FFFFFF', marginBottom: 8,
          }}>
            10 Angles <span style={{ color: '#00FF94' }}>×</span> 2 Formats
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.6 }}>
            First 10 = pure comparison (wetracked style). Last 10 = hybrid (hook + comparison + CTA).
            <br />
            All 1080×1350 (4:5 Meta feed). Screenshot each card at full size.
          </p>
        </div>

        {/* ─── Section 1: Pure Comparison ─── */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{
            fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
            marginBottom: 32, textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Format A — Pure Comparison
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {ANGLES.map((ad, i) => (
              <div key={ad.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{
                    color: '#00FF94', fontSize: 12, fontWeight: 700,
                    background: 'rgba(0,255,148,0.08)', padding: '4px 12px', borderRadius: 4,
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
                  }}>comparison</span>
                </div>
                <div style={{ display: 'flex', gap: 32 }}>
                  {/* Creative scaled to fit */}
                  <div style={{
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8,
                    overflow: 'hidden', flexShrink: 0,
                    width: 432, height: 540,
                  }}>
                    <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: 1080, height: 1350 }}>
                      <ComparisonAd ad={ad} />
                    </div>
                  </div>
                  {/* Primary text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
                    }}>Primary Text</p>
                    <div style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8, padding: 24, maxHeight: 500, overflow: 'auto',
                    }}>
                      <pre style={{
                        color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.7,
                        fontFamily: "'Inter', sans-serif", whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                      }}>{ad.primaryText}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Section 2: Hybrid ─── */}
        <div>
          <h2 style={{
            fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
            marginBottom: 32, textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Format B — Hybrid (Hook + Comparison)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {ANGLES.map((ad, i) => (
              <div key={`hybrid-${ad.id}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{
                    color: '#00FF94', fontSize: 12, fontWeight: 700,
                    background: 'rgba(0,255,148,0.08)', padding: '4px 12px', borderRadius: 4,
                  }}>
                    {String(i + 11).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 500 }}>
                    {ad.angle}
                  </span>
                  <span style={{
                    color: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 500,
                    background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 4,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>hybrid</span>
                </div>
                <div style={{ display: 'flex', gap: 32 }}>
                  <div style={{
                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8,
                    overflow: 'hidden', flexShrink: 0,
                    width: 432, height: 540,
                  }}>
                    <div style={{ transform: 'scale(0.4)', transformOrigin: 'top left', width: 1080, height: 1350 }}>
                      <HybridAd ad={ad} />
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
                    }}>Primary Text</p>
                    <div style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 8, padding: 24, maxHeight: 500, overflow: 'auto',
                    }}>
                      <pre style={{
                        color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.7,
                        fontFamily: "'Inter', sans-serif", whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                      }}>{ad.primaryText}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
