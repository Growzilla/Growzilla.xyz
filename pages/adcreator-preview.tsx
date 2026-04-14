import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import {
  ChatQuiz,
  PhaseChecklist,
  LiveTerminal,
  AdCard,
  BriefCard,
  BrandSnapshot,
  CompetitorCard,
  type PhaseItem,
  type TerminalLine,
} from '@/components/adcreator'
import { AngleBadge, LongevityBadge, StickyPDFButton, ANGLE_PALETTE } from '@/components/ui'

/**
 * /adcreator-preview — visual smoke test for the 10 adcreator components.
 *
 * Renders every component with mock data so we can verify layouts at
 * 375 / 768 / 1280 viewports before wiring the real flow.
 */

const MOCK_QUESTIONS = [
  { id: 'domain', prompt: 'What domain should I research?', placeholder: 'e.g. glow-nordic.com', type: 'url' as const },
  { id: 'product', prompt: "What's the hero product?", placeholder: 'Vitamin C serum', type: 'text' as const },
  { id: 'market', prompt: 'Which market are you targeting?', options: ['Sweden', 'United States', 'Germany', 'United Kingdom'] },
  { id: 'goal', prompt: 'Primary goal for this batch?', options: ['Acquisition', 'Retargeting', 'Brand awareness'] },
  { id: 'budget', prompt: "What's your test budget?", placeholder: '$500', type: 'text' as const },
  { id: 'tone', prompt: 'Preferred tone?', options: ['Direct', 'Playful', 'Premium', 'Educational'] },
]

const MOCK_PHASES: PhaseItem[] = [
  { id: 'p1', label: 'Brand intake', status: 'complete' },
  { id: 'p2', label: 'Discover competitors', status: 'complete', detail: 'Found 7 brands in market' },
  { id: 'p3', label: 'Scrape Meta Ad Library', status: 'running', detail: 'Loading page 4 / 12…' },
  { id: 'p4', label: 'Tag ads (DeepSeek)', status: 'pending' },
  { id: 'p5', label: 'Generate 5 briefs', status: 'pending' },
  { id: 'p6', label: 'Render PDF', status: 'pending' },
]

const MOCK_TERMINAL: TerminalLine[] = [
  { id: 'l1', ts: '12:42:01', text: '$ adcreator-scraper start --domain=glow-nordic.com', level: 'info' },
  { id: 'l2', ts: '12:42:02', text: 'puppeteer launch headless=true', level: 'ok' },
  { id: 'l3', ts: '12:42:04', text: 'navigating to facebook.com/ads/library?q=glow-nordic', level: 'info' },
  { id: 'l4', ts: '12:42:09', text: 'collected 38 ad cards from page 1', level: 'ok' },
  { id: 'l5', ts: '12:42:14', text: 'collected 41 ad cards from page 2', level: 'ok' },
  { id: 'l6', ts: '12:42:19', text: 'WARN: rate-limit cooldown 1.5s', level: 'warn' },
  { id: 'l7', ts: '12:42:21', text: 'collected 36 ad cards from page 3', level: 'ok' },
]

const MOCK_ADS = [
  { id: 'A-C1-1', hook: 'The 3-step morning routine that cleared my skin in 6 weeks. No filter, no edits.', angle: 'Education', longevityFlag: 'PROVEN' as const, daysActive: 64, competitorName: 'Lumi Skincare' },
  { id: 'A-C1-2', hook: 'I almost gave up on serums. Then I tried this Swedish brand my sister swears by.', angle: 'SocialProof' as const, longevityFlag: 'SCALING' as const, daysActive: 142, competitorName: 'Lumi Skincare' },
  { id: 'A-C2-3', hook: '40% off this weekend only. Free shipping over 500 SEK.', angle: 'Discount', longevityFlag: 'FRESH' as const, daysActive: 4, competitorName: 'Nordic Glow' },
  { id: 'A-C2-4', hook: 'Made for Nordic skin. Tested in Stockholm winters. Gentle enough for daily use.', angle: 'Lifestyle' as const, longevityFlag: 'ACTIVE' as const, daysActive: 22, competitorName: 'Nordic Glow' },
  { id: 'A-C3-5', hook: 'Why I switched from a $90 cream to this $34 alternative.', angle: 'Curiosity', longevityFlag: 'PROVEN' as const, daysActive: 88, competitorName: 'Pure Routine' },
  { id: 'A-C3-6', hook: 'Mother\'s Day is May 12. She deserves more than chocolate.', angle: 'Gift', longevityFlag: 'FRESH' as const, daysActive: 3, competitorName: 'Pure Routine' },
]

const MOCK_BRIEFS = [
  { number: 1, angle: 'SocialProof', hypothesis: 'Sister recommendation framing outperforms generic UGC because it carries pre-existing trust.', primaryText: 'My sister has tried every serum on the market.\n\nThis is the only one she rebuys.\n\n6 weeks in and my skin has never looked clearer.', headline: 'Sister-approved (and dermatologist-tested)', description: 'Made in Sweden. Free shipping over 500 SEK.', cta: 'Shop Now', visualConcept: 'Two women (sisters) in matching robes, candid bathroom mirror selfie, soft natural light.', productionNote: 'Cast real siblings — synthetic faces feel off in this format.', inspiredBy: ['A-C1-2', 'A-C3-5'] },
  { number: 2, angle: 'Education', hypothesis: 'A specific number ("3 steps", "6 weeks") creates concrete expectations and reduces purchase anxiety.', primaryText: 'The 3 steps that actually work:\n\n1. Cleanse with cold water\n2. Vitamin C serum (this one)\n3. SPF every morning, even in winter\n\nGive it 6 weeks.', headline: 'A 3-step routine that takes 90 seconds', description: 'Built for Nordic climates. Vegan. Cruelty-free.', cta: 'Learn More', visualConcept: 'Top-down shot of the 3 products on linen, hand reaching in mid-frame.', inspiredBy: ['A-C1-1', 'A-C2-4'] },
  { number: 3, angle: 'Gift', hypothesis: 'Holiday-anchored urgency works in May 8-12 window when intent is high but indecision is highest.', primaryText: 'Mother\'s Day is May 12.\n\nShe doesn\'t want chocolate.\n\nGet her something she\'ll actually use every morning.', headline: 'A gift she\'ll thank you for in 6 weeks', description: 'Free gift wrap. Express shipping available.', cta: 'Shop Gifts', visualConcept: 'Wrapped product on a wooden tray, daughter handing it to mother, soft window light.', inspiredBy: ['A-C3-6'] },
  { number: 4, angle: 'Discount', hypothesis: 'Specific timeframe ("this weekend only") + threshold ("500 SEK") drives both urgency and AOV.', primaryText: 'Weekend only.\n\n40% off everything.\nFree shipping over 500 SEK.\n\nDoesn\'t come back until July.', headline: '40% off — ends Sunday at midnight', description: 'Use code GLOW40 at checkout.', cta: 'Shop Sale', visualConcept: 'Bold typography over product photo, countdown timer overlay, brand colors only.', productionNote: 'Run only Fri-Sun. Pause Monday morning.', inspiredBy: ['A-C2-3'] },
  { number: 5, angle: 'Curiosity', hypothesis: 'Comparison framing ("$90 vs $34") triggers price-anchoring and curiosity click.', primaryText: 'Why I stopped buying $90 serums:\n\nThe Swedish brand that does it for $34 (and somehow works better).', headline: 'The $34 swap that replaced my $90 serum', description: 'Same active ingredients. Half the markup.', cta: 'See Why', visualConcept: 'Side-by-side product comparison, hand reaching for the cheaper one with subtle smile.', inspiredBy: ['A-C3-5', 'A-C1-1'] },
] as const

const MOCK_COMPETITORS = [
  { name: 'Lumi Skincare', url: 'https://lumiskincare.se', activeAdCount: 38, distribution: { FRESH: 6, ACTIVE: 12, PROVEN: 14, SCALING: 6 } },
  { name: 'Nordic Glow', url: 'https://nordicglow.com', activeAdCount: 22, distribution: { FRESH: 9, ACTIVE: 8, PROVEN: 4, SCALING: 1 } },
  { name: 'Pure Routine', url: 'https://pureroutine.eu', activeAdCount: 51, distribution: { FRESH: 4, ACTIVE: 14, PROVEN: 22, SCALING: 11 } },
]

export default function AdcreatorPreviewPage() {
  // Live elapsed timer for PhaseChecklist demo
  const [elapsedMs, setElapsedMs] = useState(126_000)
  useEffect(() => {
    const t = setInterval(() => setElapsedMs((ms) => ms + 1000), 1000)
    return () => clearInterval(t)
  }, [])

  // Streaming terminal demo
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(MOCK_TERMINAL)
  useEffect(() => {
    const queue = [
      'collected 29 ad cards from page 4',
      'collected 33 ad cards from page 5',
      'classify_competitor=lumiskincare confidence=0.92',
      'classify_competitor=nordicglow confidence=0.88',
      'rate-limit cooldown 1.5s',
      'page 6 / 12 complete',
    ]
    let i = 0
    const t = setInterval(() => {
      if (i >= queue.length) return
      setTerminalLines((prev) => [
        ...prev,
        { id: `dyn-${i}`, ts: fmtClock(), text: queue[i], level: queue[i].includes('rate-limit') ? 'warn' : 'ok' },
      ])
      i += 1
    }, 1800)
    return () => clearInterval(t)
  }, [])

  const allAngles = useMemo(() => Object.keys(ANGLE_PALETTE), [])

  return (
    <>
      <Head>
        <title>Adcreator components preview</title>
        <meta name="robots" content="noindex" />
      </Head>

      <StickyPDFButton jobId="job-mock-001" onClick={(id) => console.log('pdf', id)} />

      <main
        className="min-h-screen pb-32"
        style={{
          background: '#08090A',
          color: 'rgba(255,255,255,0.95)',
          fontFamily: 'Inter, "SF Pro Display", -apple-system, system-ui, sans-serif',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-10 space-y-12">
          <header>
            <h1 className="text-[32px] font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Adcreator components preview
            </h1>
            <p className="mt-1 text-[14px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Visual smoke test for the 10 components shipped 2026-04-15. Resize the viewport to 375 / 768 / 1280 to verify layouts.
            </p>
          </header>

          <Section title="1 · BrandSnapshot">
            <BrandSnapshot
              domain="glow-nordic.com"
              name="Glow Nordic"
              logoUrl="https://cdn.brandfetch.io/glow-nordic.com/icon"
              productSummary="Skincare brand for Nordic skin types. Vitamin C serum, retinol night cream, mineral SPF."
              marketIso="SE"
              generatedAt={new Date().toISOString()}
            />
          </Section>

          <Section title="2 · ChatQuiz" hint="single-column chat with 3-dot typing indicator + auto-scroll">
            <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)', height: 520 }}>
              <ChatQuiz
                greeting="Hi — let's build your competitor ad report. 6 quick questions, takes ~1 minute."
                questions={MOCK_QUESTIONS}
                onComplete={(answers) => console.log('quiz answers:', answers)}
              />
            </div>
          </Section>

          <Section title="3 · PhaseChecklist + 4 · LiveTerminal" hint="side-by-side run view">
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <LiveTerminal lines={terminalLines} height={360} />
              <PhaseChecklist
                items={MOCK_PHASES}
                elapsedMs={elapsedMs}
                estimatedRemainingMs={Math.max(0, 4 * 60_000 - (elapsedMs - 126_000))}
              />
            </div>
          </Section>

          <Section title="5 · AdCard" hint="grid auto-fit minmax(280px, 1fr) — try resizing">
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              {MOCK_ADS.map((ad) => (
                <AdCard
                  key={ad.id}
                  id={ad.id}
                  hook={ad.hook}
                  angle={ad.angle}
                  longevityFlag={ad.longevityFlag}
                  daysActive={ad.daysActive}
                  competitorName={ad.competitorName}
                  metaAdLibraryUrl="https://www.facebook.com/ads/library/"
                  ratio={ad.id.endsWith('3') ? '16:9' : '4:5'}
                />
              ))}
            </div>
          </Section>

          <Section title="6 · BriefCard" hint="hover an inspired-by tag to see matching AdCard above glow">
            <div className="grid gap-4 md:grid-cols-2">
              {MOCK_BRIEFS.map((b) => (
                <BriefCard key={b.number} {...b} inspiredBy={[...b.inspiredBy]} />
              ))}
            </div>
          </Section>

          <Section title="7 · CompetitorCard" hint="stacked longevity bar, flex segments">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_COMPETITORS.map((c) => (
                <CompetitorCard
                  key={c.name}
                  name={c.name}
                  url={c.url}
                  activeAdCount={c.activeAdCount}
                  distribution={c.distribution}
                  metaAdLibraryUrl="https://www.facebook.com/ads/library/"
                />
              ))}
            </div>
          </Section>

          <Section title="8 · AngleBadge palette">
            <div className="flex flex-wrap gap-2">
              {allAngles.map((a) => (
                <AngleBadge key={a} angle={a} size="md" />
              ))}
              <AngleBadge angle="Unknown" size="md" />
            </div>
          </Section>

          <Section title="9 · LongevityBadge states">
            <div className="flex flex-wrap gap-2">
              <LongevityBadge flag="FRESH" days={2} size="md" />
              <LongevityBadge flag="ACTIVE" days={18} size="md" />
              <LongevityBadge flag="PROVEN" days={64} size="md" />
              <LongevityBadge flag="SCALING" days={142} size="md" />
              <LongevityBadge flag="FRESH" size="md" />
            </div>
          </Section>

          <Section title="10 · StickyPDFButton" hint="rendered top-right via portal — see corner">
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              The button pulses every 4s. Click to log to console.
            </p>
          </Section>
        </div>
      </main>
    </>
  )
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section>
      <header className="mb-3 flex items-baseline gap-3">
        <h2 className="text-[16px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.95)' }}>
          {title}
        </h2>
        {hint && (
          <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.40)' }}>
            {hint}
          </span>
        )}
      </header>
      {children}
    </section>
  )
}

function fmtClock(): string {
  const d = new Date()
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':')
}
