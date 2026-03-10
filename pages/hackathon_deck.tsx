import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const BF = '1idEnrhL1OP0Mw2qbvS';

const LOGOS = {
  claudeIcon: `https://cdn.brandfetch.io/idW5s392j1/w/338/h/338/theme/dark/icon.png?c=${BF}`,
  shopifySymbol: `https://cdn.brandfetch.io/idAgPm7IvG/theme/dark/symbol.svg?c=${BF}`,
};

const TOTAL_SLIDES = 8;

export default function HackathonDeck() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (n: number) => {
      if (isAnimating || n < 0 || n >= TOTAL_SLIDES || n === current) return;
      setIsAnimating(true);
      setCurrent(n);
      setTimeout(() => setIsAnimating(false), 450);
    },
    [current, isAnimating]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        next();
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  useEffect(() => {
    const handler = (e: MouseEvent) => { e.preventDefault(); next(); };
    window.addEventListener('contextmenu', handler);
    return () => window.removeEventListener('contextmenu', handler);
  }, [next]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      next();
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [next]);

  // Statement slides (centered) — slides 0, 1, 6
  const s = (i: number): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '80px 96px',
    opacity: current === i ? 1 : 0,
    transform: current === i ? 'none' : current > i ? 'translateX(-50px)' : 'translateX(50px)',
    transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
    pointerEvents: current === i ? 'all' : 'none',
  });

  // Info slides (top-anchored) — all slides use this
  // Slide 0 uses 180px top (logos first, then title below)
  // Slides 1-7 use 288px top (aligns with where "Claude Code" text sits on slide 0)
  const si = (i: number): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: `${i === 0 ? 180 : 288}px 96px 80px 96px`,
    opacity: current === i ? 1 : 0,
    transform: current === i ? 'none' : current > i ? 'translateX(-50px)' : 'translateX(50px)',
    transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
    pointerEvents: current === i ? 'all' : 'none',
  });

  const label: React.CSSProperties = {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 12,
  };

  const heading: React.CSSProperties = {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: 48,
  };

  return (
    <>
      <Head>
        <title>Claude Code × Shopify Hackathon</title>
        <meta name="description" content="March 28, 2026. Forest City, Malaysia." />
        <meta property="og:title" content="Claude Code × Shopify Hackathon" />
        <meta property="og:description" content="4 hours. Build the most unreasonably smart Shopify app." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body, #__next {
            height: 100%;
            overflow: hidden;
            background: #0A0A0A;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
      </Head>

      <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A' }}>

        {/* Progress */}
        <div style={{
          position: 'fixed', top: 0, left: 0, height: 2,
          background: '#00FF94',
          width: `${((current + 1) / TOTAL_SLIDES) * 100}%`,
          transition: 'width 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 200,
        }} />

        {/* Counter */}
        <div style={{
          position: 'fixed', bottom: 36, right: 48,
          fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.2)',
          zIndex: 200, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em',
        }}>
          {current + 1} / {TOTAL_SLIDES}
        </div>

        {/* Dots */}
        <div style={{
          position: 'fixed', left: 48, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 8, zIndex: 200,
        }}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              style={{
                width: 6, height: i === current ? 20 : 6, borderRadius: 3,
                background: i === current ? '#00FF94' : 'rgba(255,255,255,0.1)',
                border: 'none', padding: 0,
                transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* ===== 1: TITLE ===== */}
        <div style={si(0)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 72 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGOS.claudeIcon} alt="Claude" crossOrigin="anonymous" style={{ height: 36, width: 36, borderRadius: 8 }} />
            <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 20, fontWeight: 300 }}>×</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGOS.shopifySymbol} alt="Shopify" crossOrigin="anonymous" style={{ height: 36, width: 'auto' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(52px, 6.5vw, 84px)',
            fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.04em', color: '#FFFFFF',
          }}>
            Claude Code<br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>×</span> Shopify<br />
            Hackathon<span style={{ color: '#00FF94' }}>.</span>
          </h1>

          <div style={{ marginTop: 56, display: 'flex', gap: 40 }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: 500 }}>28 March 2026</span>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, fontWeight: 500 }}>Forest City, Malaysia</span>
          </div>
        </div>

        {/* ===== 2: ONE-LINER ===== */}
        <div style={si(1)}>
          <p style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.025em',
            color: '#FFFFFF', maxWidth: 1000,
          }}>
            4 hours to build the most{' '}
            <span style={{ color: '#00FF94' }}>unreasonably smart</span>{' '}
            Shopify app using Claude Code.
          </p>

          <div style={{ marginTop: 56, display: 'flex', gap: 64 }}>
            {[['80+', 'builders'], ['$3,000', 'in prizes'], ['4 hrs', 'to ship']].map(([val, lb]) => (
              <div key={lb}>
                <p style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{val}</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 500, marginTop: 2 }}>{lb}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 3: WHAT YOU GET ===== */}
        <div style={si(2)}>
          <p style={label}>What participants get</p>
          <p style={heading}>Everything handled. Just build.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px 40px' }}>
            {[
              ['Pre-built starter repo', 'OAuth, data sync, GraphQL. Fork and build in 5 minutes.'],
              ['Full Shopify API access', 'Connected test store with real data flowing through it.'],
              ['Claude Code indexed docs', 'Every permission, every query, every endpoint ready.'],
              ['No Shopify experience needed', 'The repo handles all platform complexity for you.'],
              ['Teams of 2 to 4', 'Solo builders welcome. Form teams on the day.'],
              ['Food, coffee, energy drinks', 'Fuel provided for 4 hours of focused building.'],
            ].map(([t, d]) => (
              <div key={t}>
                <p style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{t}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 400, lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 4: EXAMPLE BUILDS ===== */}
        <div style={si(3)}>
          <p style={label}>Example builds</p>
          <p style={heading}>The right Shopify app creates millions in value.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              ['AI Store Clerk', 'Branded AI assistant that converts browsers to buyers'],
              ['Smart Inventory', 'Predictive stock management that eliminates dead inventory'],
              ['ICP Builder', 'Automatic ideal customer profiles from real store data'],
              ['Real-Time Analytics', 'Insights invisible inside Shopify admin'],
              ['Creator Tools', 'Find and scale creator partnerships programmatically'],
              ['AI UGC Engine', 'Generate ad creative and product content at scale'],
            ].map(([t, d]) => (
              <div key={t} style={{ padding: 28, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <p style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{t}</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 400, lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, marginTop: 32 }}>
            Build it here. Launch on the Shopify App Store. Start earning.
          </p>
        </div>

        {/* ===== 5: PRIZES ===== */}
        <div style={si(4)}>
          <p style={label}>Prizes</p>

          <div style={{ display: 'flex', gap: 24, marginBottom: 48 }}>
            {[
              { place: '1st', amount: '$2,000', hl: true },
              { place: '2nd', amount: '$750', hl: false },
              { place: '3rd', amount: '$250', hl: false },
            ].map((p) => (
              <div key={p.place} style={{
                flex: 1, padding: '36px 32px',
                border: p.hl ? '1px solid rgba(0,255,148,0.15)' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 2,
                background: p.hl ? 'rgba(0,255,148,0.02)' : 'transparent',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: 500, marginBottom: 16 }}>{p.place} Place</p>
                <p style={{ color: p.hl ? '#00FF94' : '#FFFFFF', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>{p.amount}</p>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 8 }}>BTC or USDC</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, lineHeight: 1.7 }}>
            Claude Code API credits for all participants.
            <br />
            Winners pitch their app to Shopify Partner Program.
          </p>
        </div>

        {/* ===== 6: JUDGES ===== */}
        <div style={si(5)}>
          <p style={label}>Judge Panel</p>
          <p style={heading}>Judged by people who build.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16 }}>
            {[
              ['AI Policy & Research', 'Alliance for the Future'],
              ['Developer Relations', 'Shopify'],
              ['AI Research', 'DeepMind'],
              ['Venture Partner', 'Singapore VC'],
            ].map(([role, org]) => (
              <div key={role} style={{ padding: 28, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <p style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{role}</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 400 }}>{org}</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12, marginTop: 32 }}>
            Panel being assembled. Confirmations in progress.
          </p>
        </div>

        {/* ===== 7: SOCIAL PROOF ===== */}
        <div style={si(6)}>
          <p style={{
            color: '#FFFFFF',
            fontSize: 'clamp(72px, 12vw, 140px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95,
          }}>
            400<span style={{ color: '#00FF94' }}>+</span>
          </p>

          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: 400, marginTop: 20, maxWidth: 600, lineHeight: 1.6 }}>
            Attended the Claude Code Community event at Forest City, Malaysia.
          </p>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 20, fontWeight: 600, marginTop: 48, letterSpacing: '-0.01em' }}>
            This is the next one.
          </p>
        </div>

        {/* ===== 8: CONTACT ===== */}
        <div style={si(7)}>
          <p style={label}>Interested in joining</p>

          <p style={{
            color: '#FFFFFF', fontSize: 40, fontWeight: 700,
            letterSpacing: '-0.03em', marginBottom: 56,
          }}>
            Let&apos;s make it happen.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 64px', marginBottom: 64 }}>
            {([
              ['Name', 'Albert Elmgart', ''],
              ['Email', 'albert@growzilla.xyz', 'mailto:albert@growzilla.xyz'],
              ['WhatsApp', '+46 72 559 7280', 'https://wa.me/46725597280'],
              ['LinkedIn', 'linkedin.com/in/albert-elmgart', 'https://www.linkedin.com/in/albert-elmgart/'],
            ] as const).map(([lb, val, href]) => (
              <div key={lb}>
                <p style={{
                  color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4,
                }}>{lb}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: '#00FF94', fontSize: 17, fontWeight: 500, textDecoration: 'none' }}>
                    {val}
                  </a>
                ) : (
                  <p style={{ color: '#FFFFFF', fontSize: 17, fontWeight: 600 }}>{val}</p>
                )}
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <Image src="/images/growzilla-kaiju.png" alt="Growzilla" width={24} height={24} style={{ objectFit: 'contain' }} />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>
              GROWZILLA.XYZ
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
