import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';

const TOTAL_SLIDES = 6;

// Shadow for dashboard screenshots — soft glow like Lebesgue
const imgShadow = '0 24px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3)';
const imgShadowFront = '0 32px 100px rgba(0,0,0,0.65), 0 12px 32px rgba(0,0,0,0.4)';

const SLIDES = [
  {
    title: 'Your Content\nFormula, Visualized',
    desc: 'See exactly which channels, content types, and products drive revenue — in one visual flow. The Sankey diagram no other Shopify app has.',
    images: [
      { src: '/app-slides/sankeydiagram.png', alt: 'Sankey attribution flow', style: { top: '18%', right: '-14%', width: '92%', borderRadius: 14, boxShadow: imgShadow } as React.CSSProperties },
    ],
  },
  {
    title: 'Know Which\nCreators Sell',
    desc: 'Every creator ranked by attributed revenue. Sparklines, commission rates, and conversion — stop guessing who delivers results.',
    images: [
      { src: '/app-slides/growzillaCreatorOverview.png', alt: 'Creator overview', style: { top: '15%', right: '-14%', width: '92%', borderRadius: 14, boxShadow: imgShadow } as React.CSSProperties },
    ],
  },
  {
    title: 'Deep-Dive\nAny Creator',
    desc: 'Click into any creator to see per-post revenue, platform breakdown, and content performance. Every dollar tracked to the post that earned it.',
    images: [
      { src: '/app-slides/growzillaCreatorOverview.png', alt: 'Creator overview', style: { top: '10%', right: '6%', width: '60%', borderRadius: 14, boxShadow: imgShadow, opacity: 0.35, filter: 'blur(1.5px)' } as React.CSSProperties },
      { src: '/app-slides/growzillaCreatorIndividual.png', alt: 'Creator deep-dive', style: { top: '22%', right: '-14%', width: '78%', borderRadius: 14, boxShadow: imgShadowFront } as React.CSSProperties },
    ],
  },
  {
    title: 'One Link.\nRevenue Tracked.',
    desc: 'Pick a product from your store, assign it to a creator, and get a tracked link. Every sale that follows is attributed automatically.',
    images: [
      { src: '/app-slides/link1.png', alt: 'Tracking links overview', style: { top: '8%', right: '8%', width: '58%', borderRadius: 14, boxShadow: imgShadow, opacity: 0.4, filter: 'blur(1px)' } as React.CSSProperties },
      { src: '/app-slides/link2.png', alt: 'Product picker', style: { top: '25%', right: '-14%', width: '75%', borderRadius: 14, boxShadow: imgShadowFront } as React.CSSProperties },
    ],
  },
  {
    title: 'Full-Funnel\nAttribution',
    desc: 'Conversion funnel and Sankey diagram side by side. Filter by channel, creator, content type, and product. See where revenue comes from — and where it drops off.',
    images: [
      { src: '/app-slides/screenshotattribution.png', alt: 'Full attribution view', style: { top: '15%', right: '-16%', width: '95%', borderRadius: 14, boxShadow: imgShadow } as React.CSSProperties },
    ],
  },
  {
    title: 'All Platforms.\nOne Dashboard.',
    desc: 'TikTok, Instagram, YouTube — every creator\'s revenue, every platform\'s contribution, every metric that matters. Period comparisons included.',
    images: [
      { src: '/app-slides/growzilla_overview.png', alt: 'Overview dashboard', style: { top: '15%', right: '-14%', width: '92%', borderRadius: 14, boxShadow: imgShadow } as React.CSSProperties },
    ],
  },
];

export default function AppSlides() {
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

  // Keyboard nav
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

  // Right-click advances
  useEffect(() => {
    const handler = (e: MouseEvent) => { e.preventDefault(); next(); };
    window.addEventListener('contextmenu', handler);
    return () => window.removeEventListener('contextmenu', handler);
  }, [next]);

  // Click advances (except on interactive elements)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      next();
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [next]);

  // Touch/swipe
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) next();
      else prev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [next, prev]);

  // Slide transition style
  const slideStyle = (i: number): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    opacity: current === i ? 1 : 0,
    transform: current === i ? 'none' : current > i ? 'translateX(-60px)' : 'translateX(60px)',
    transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
    pointerEvents: current === i ? 'all' : 'none',
  });

  return (
    <>
      <Head>
        <title>Growzilla — App Screenshots</title>
        <meta name="description" content="Growzilla: Find your winning content formula. Shopify app screenshots." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
          /* Hide Next.js dev indicators for clean screenshots */
          [data-next-mark] { display: none !important; }
          nextjs-portal { display: none !important; }
          @media (max-width: 768px) {
            .slide-text { padding: 60px 24px 40px 24px !important; width: 100% !important; }
            .slide-title { font-size: 32px !important; }
            .slide-desc { font-size: 14px !important; }
            .slide-images { display: none !important; }
            .slide-dots { display: none !important; }
            .slide-counter { right: 20px !important; bottom: 16px !important; }
          }
        `}</style>
      </Head>

      <div style={{ position: 'fixed', inset: 0, background: '#0A0A0A' }}>

        {/* Green ambient glow — top right corner, matching Lebesgue's teal glow */}
        <div style={{
          position: 'fixed',
          top: -300,
          right: -100,
          width: 1000,
          height: 1000,
          background: 'radial-gradient(ellipse at center, rgba(0,255,148,0.06) 0%, rgba(0,255,148,0.02) 35%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        {/* Secondary glow — bottom right, subtle */}
        <div style={{
          position: 'fixed',
          bottom: -400,
          right: -200,
          width: 800,
          height: 800,
          background: 'radial-gradient(ellipse at center, rgba(0,255,148,0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Progress bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, height: 2,
          background: '#00FF94',
          width: `${((current + 1) / TOTAL_SLIDES) * 100}%`,
          transition: 'width 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 200,
        }} />

        {/* Slide counter */}
        <div className="slide-counter" style={{
          position: 'fixed', bottom: 36, right: 48,
          fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.2)',
          zIndex: 200, fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em',
        }}>
          {current + 1} / {TOTAL_SLIDES}
        </div>

        {/* Dot navigation */}
        <div className="slide-dots" style={{
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

        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <div key={i} style={slideStyle(i)}>

            {/* Left: Text */}
            <div className="slide-text" style={{
              position: 'relative',
              width: '42%',
              padding: '0 0 0 96px',
              zIndex: 10,
            }}>
              <h2
                className="slide-title"
                style={{
                  color: '#00FF94',
                  fontSize: 'clamp(36px, 4.5vw, 56px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: 24,
                  whiteSpace: 'pre-line',
                }}
              >
                {slide.title}
              </h2>
              <p
                className="slide-desc"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 1.65,
                  maxWidth: 440,
                }}
              >
                {slide.desc}
              </p>
            </div>

            {/* Right: Images */}
            <div className="slide-images" style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '62%',
              height: '100%',
            }}>
              {slide.images.map((img, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={j}
                  src={img.src}
                  alt={img.alt}
                  style={{
                    position: 'absolute',
                    ...img.style,
                    objectFit: 'contain',
                    transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
