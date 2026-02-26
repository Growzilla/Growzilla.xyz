# Plan: Quiz Lead Magnet + Organic Dashboard for Growzilla

## Context

Growzilla sells a Shopify social media revenue attribution tool (SMDashboard). The goal is to build a **lead magnet quiz** that runs as a cold-traffic funnel from Meta ads targeting Shopify brands using creators/UGC. The quiz scares them with personalized "revenue leak" numbers, captures email+phone, then funnels them to a **playable demo dashboard** and Calendly booking.

Two existing codebases inform this:
- **LeadMagnetCreatorBrand** — old quiz for creators (zero friction pattern, but no email capture = bad lead magnet)
- **Growzilla SMDashboard** — 17 production-ready dashboard components with mock data we can reuse directly

---

## File Structure

### New files to create:

```
app/quiz/
  layout.tsx                          # Metadata only (SEO, title)
  page.tsx                            # 'use client' — renders QuizShell

app/organicdashboard/
  layout.tsx                          # Metadata only
  page.tsx                            # 'use client' — renders OrgDashboardShell

components/quiz/
  QuizShell.tsx                       # Master orchestrator: state, step routing, AnimatePresence
  QuizProgressBar.tsx                 # Animated neon progress bar (steps 1-6)
  QuizIntro.tsx                       # Step 0: hero, headline, trust line, Start CTA
  QuizStepStoreURL.tsx                # Q1: .myshopify.com text input
  QuizStepRevenue.tsx                 # Q2: monthly revenue (5 range options)
  QuizStepCreatorSpend.tsx            # Q3: creator/UGC spend (5 range options)
  QuizStepCreatorCount.tsx            # Q4: number of creators (4 options)
  QuizStepPlatforms.tsx               # Q5: platform multi-select (4 options)
  QuizStepTracking.tsx                # Q6: current tracking method (4 options)
  QuizResults.tsx                     # Results preview: score gauge, leak $, bar chart
  QuizEmailGate.tsx                   # Email + phone form (unlock full report)
  QuizResultsFull.tsx                 # Post-gate: full preview + 2 CTAs
  QuizLeakChart.tsx                   # Horizontal bar chart (leak breakdown)
  QuizOptionCard.tsx                  # Reusable single/multi-select option card

components/organicdashboard/
  OrgDashboardShell.tsx               # Master shell: demo toggle, smdashboard components, Calendly, CTA

types/quiz.ts                         # All quiz-specific TypeScript types
lib/quizCalculations.ts               # Pure functions: leak score + dollar estimate
```

**Total: 19 new files.** No existing files modified.

---

## Existing Files to Reuse (NOT modify)

| File | Used In | How |
|------|---------|-----|
| `components/smdashboard/OrgView.tsx` | organicdashboard | Import directly, pass MOCK_SM_DATA |
| `components/smdashboard/CreatorView.tsx` | organicdashboard | Import directly |
| `components/smdashboard/KPIRow.tsx` | organicdashboard | Import directly |
| `components/smdashboard/PostCard.tsx` | organicdashboard | Import directly |
| `components/smdashboard/PostModal.tsx` | organicdashboard | Import directly |
| `components/smdashboard/TemplateModal.tsx` | organicdashboard | Import directly |
| `components/smdashboard/RevenueByPlatformChart.tsx` | organicdashboard | Import directly |
| `components/smdashboard/TopPostsLeaderboard.tsx` | organicdashboard | Import directly |
| `components/smdashboard/CreatorComparisonChart.tsx` | organicdashboard | Import directly |
| `components/smdashboard/InsightCard.tsx` | organicdashboard | Import directly |
| `components/smdashboard/DateRangeToggle.tsx` | organicdashboard | Import directly |
| `components/smdashboard/PlatformTabs.tsx` | organicdashboard | Import directly |
| `components/smdashboard/CreatorSelector.tsx` | organicdashboard | Import directly |
| `components/smdashboard/UTMGenerator.tsx` | organicdashboard | Import directly |
| `components/smdashboard/SavedLinksSidebar.tsx` | organicdashboard | Import directly |
| `data/mockSMData.ts` | organicdashboard | Import MOCK_SM_DATA, MOCK_UTM_LINKS, helpers |
| `types/smdashboard.ts` | organicdashboard | Import Post, SMInsight, DateRange, Creator types |
| `app/checkout/en/page.tsx` | both pages | **Pattern reference** for App Router nav/footer |
| `styles/globals.css` | both pages | btn-zilla, card-zilla, text-glow, animations |
| `tailwind.config.js` | both pages | zilla-* colors, fonts, shadows |

---

## Page 1: `/quiz` — Creator Revenue Leak Calculator

### Architecture

Single-page stepper — all steps render on `/quiz` URL, no route changes. `QuizShell.tsx` manages all state via `useState` and renders the active step inside `<AnimatePresence mode="wait">`.

### State Shape (`QuizShell.tsx`)

```typescript
step: number              // 0=intro, 1-6=questions, 7=results, 8=emailgate, 9=fullresults
direction: 1 | -1         // animation direction
storeUrl: string
revenueRange: string | null
creatorSpend: string | null
creatorCount: string | null
platforms: string[]        // multi-select
trackingMethod: string | null
email: string
phone: string
result: QuizResult | null  // calculated after Q6
```

### Step-by-Step Flow

| Step | Component | UX |
|------|-----------|-----|
| 0 | `QuizIntro` | Hero headline + trust line + "Start" CTA |
| 1 | `QuizStepStoreURL` | Text input with `@` prefix pattern (`.myshopify.com`) |
| 2 | `QuizStepRevenue` | 5 range cards (Under $50k → $1M+) |
| 3 | `QuizStepCreatorSpend` | 5 range cards ($0-$3k → $50k+) |
| 4 | `QuizStepCreatorCount` | 4 option cards (1-5 → 30+) |
| 5 | `QuizStepPlatforms` | 4 multi-select cards (IG Reels, TikTok, YT Shorts, Pinterest) |
| 6 | `QuizStepTracking` | 4 option cards (guesswork → not accurate) |
| 7 | `QuizResults` | Score gauge (SVG circle) + leak $ + bar chart + "Unlock Report" CTA |
| 8 | `QuizEmailGate` | Email + phone inputs + submit button |
| 9 | `QuizResultsFull` | Full personalized report + 2 CTA buttons |

### Progress Bar

Visible on steps 1-6 only. Formula: `(step / 6) * 100`. Animated via Framer Motion `scaleX` on a `bg-zilla-neon` bar over a `bg-white/5` track.

### Quiz Intro Copy

```
Headline: "Discover How Much Revenue Your Creators Are Quietly Leaking Every Month"
Sub: "Free 90-second Creator Revenue Leak Calculator for Shopify brands"
Trust: "Built by Growzilla — used by 100+ stores. No signup needed to start. No sales pitch."
CTA: "Calculate My Revenue Leak →"
```

### Each Question Step Pattern

Every question component receives `onNext(value)` and `onBack()` callbacks. Pattern:
- Back arrow (top-left, steps 2+)
- Question text (font-display, text-xl sm:text-2xl)
- Helper text if applicable (text-gray-500, text-sm)
- Option cards grid or input field
- Auto-advance on single-select (300ms delay after selection)
- "Next" button on multi-select (Q5) and text input (Q1)

### QuizOptionCard (Reusable)

Used by Q2-Q6. Props: `label`, `selected`, `onClick`, `multiSelect?`. Design:
- `rounded-xl border border-white/10 bg-zilla-charcoal/40 p-4 cursor-pointer`
- Selected: `border-zilla-neon/50 bg-zilla-neon/5` with neon ring
- Hover: `hover:border-white/20 hover:bg-zilla-charcoal/60`
- `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}`
- Multi-select: checkbox indicator (circle with checkmark)
- Single-select: radio indicator (filled dot)

### Revenue Leak Calculation (`lib/quizCalculations.ts`)

**Revenue midpoints:**
- Under $50k → $30,000
- $50k-$150k → $100,000
- $150k-$400k → $275,000
- $400k-$1M → $700,000
- $1M+ → $1,500,000

**Tracking quality weight (60% of score):**
- "We don't — it's guesswork" → 0.0 (full leak)
- "Manual spreadsheets" → 0.25
- "GA / Meta dashboard" → 0.50
- "Some tracking but not accurate" → 0.20

**Platform complexity weight (20% of score):**
- Single platform → 0.70
- 2 platforms → 0.85
- 3+ platforms → 1.0

**Creator scale weight (10% of score):**
- 1-5 → 0.4
- 6-15 → 0.6
- 16-30 → 0.8
- 30+ → 1.0

**Spend ratio weight (10% of score):**
- `min(creatorSpendMidpoint / revenueMidpoint * 5, 1.0)`

**Final formula:**
```
rawScore = (1 - trackingQuality) * 60
         + platformComplexity * 20
         + creatorScale * 10
         + spendRatio * 10

score = clamp(Math.round(rawScore), 0, 100)
leakRate = 0.08 + (score / 100) * 0.22    // 8% to 30%
leakEstimate = Math.round(revenueMidpoint * leakRate / 12)  // monthly
```

**Output range:** $200/mo (small store, good tracking) to $37,500/mo (large store, no tracking). Sweet spot for most targets: **$8k-$35k/mo** as spec requires.

**Leak breakdown (4 bars in QuizLeakChart):**
1. "Attribution Gap" — proportional to (1 - trackingQuality) share of leakEstimate
2. "Platform Blind Spots" — proportional to platformComplexity share
3. "Creator Scale Loss" — proportional to creatorScale share
4. "Unoptimized Spend" — proportional to spendRatio share

### Personalized Copy Engine

After calculation, `QuizResults` displays dynamic headline based on inputs:

- If platforms include TikTok but not Instagram: *"You're focusing ~{X}% of creator effort on TikTok, yet most brands in your revenue range see 65%+ of attributed sales from Instagram-style content."*
- If tracking = guesswork: *"Right now, you have zero visibility into which posts drive real sales. That's not unusual — but it means {$XX,XXX} in creator-driven revenue is going completely unattributed every month."*
- If creator count > 15 + no tracking: *"Managing {N}+ creators with no attribution is like running Meta ads with no pixel. You're spending ${spend} monthly with no idea what's working."*

### Results Screen (Step 7)

Layout:
- Large score gauge (SVG circle, animated stroke-dashoffset, 1.8s)
- Score number counting up (Framer Motion useMotionValue)
- Bucket label + color (Low=green, Moderate=amber, High=orange, Critical=red)
- Leak estimate in large font-mono (`$XX,XXX/mo`)
- QuizLeakChart (4 horizontal bars, staggered animation)
- Personalized copy paragraph
- CTA: "Unlock Your Full Revenue Report →"

### Email Gate (Step 8)

- Headline: "Where should we send your personalized report?"
- Email input (required, validated)
- Phone input (required)
- Submit button: "Send My Report"
- Privacy line: "We'll never share your info. No spam, ever."
- On submit: `localStorage.setItem('growzilla_quiz_lead', JSON.stringify({...}))` + `console.log`
- Advances to step 9

### Full Results (Step 9)

- Full personalized headline + score + leak breakdown
- Mini dashboard preview (reuse QuizLeakChart + KPI-style stat cards showing their numbers)
- Two CTA buttons:
  1. "Play Around with the Live Dashboard →" → opens `/organicdashboard?storeUrl={url}&source=quiz` in new tab
  2. "Book a 15-Min Custom Demo Call →" → opens `/organicdashboard?storeUrl={url}&source=quiz&scrollTo=calendly` in new tab

### Nav/Footer Pattern

Follow exact pattern from `app/checkout/en/page.tsx`:
- Inline fixed nav: logo + "GROWZILLA" + single CTA button
- Minimal footer: logo, copyright, privacy link
- Background: `bg-zilla-black` + `bg-grid-zilla` overlay + `bg-zilla-radial` overlay

### Framer Motion Transitions

Step transitions in QuizShell:
```typescript
const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } }),
}
```
Wrapped in `<AnimatePresence mode="wait" custom={direction}>` with `key={step}`.

---

## Page 2: `/organicdashboard` — Interactive Demo Dashboard

### Architecture

`OrgDashboardShell.tsx` is structurally identical to `pages/smdashboard.tsx` but:
1. Lives in App Router (`'use client'`)
2. No `UserLayout` wrapper — uses inline nav/footer (checkout pattern)
3. Adds demo/my-store toggle at top
4. Adds Calendly section + $97 CTA at bottom
5. Reads `?storeUrl=` and `?scrollTo=calendly` from URL params

### State (mirrors smdashboard.tsx exactly)

```typescript
loading: boolean
dataMode: 'demo' | 'mystore'
dateRange: DateRange            // '7d' | '30d' | '90d'
activePlatform: string          // 'all' | 'instagram' | 'tiktok' | 'youtube'
selectedCreatorId: string | null
selectedPost: Post | null
templateInsight: SMInsight | null
showGenerator: boolean
showSidebar: boolean
```

### Component Composition

```
OrgDashboardShell
├── Inline fixed nav (logo + "Back to Growzilla" link)
├── Demo banner (green pulse dot + "Demo Mode" or "Preview for {storeUrl}")
├── Demo/MyStore toggle (DemoToggle — pill switch)
├── Title "Creator Revenue Hub" + controls row
│   ├── "+ Create Link" button
│   ├── "Saved Links" button
│   ├── CreatorSelector (from smdashboard)
│   └── DateRangeToggle (from smdashboard)
├── PlatformTabs (from smdashboard)
├── OrgView OR CreatorView (from smdashboard, conditional)
├── Calendly section (dark-themed, id="calendly")
│   ├── Heading: "Book Your Free Setup Call"
│   ├── Sub: "15 minutes. We set it all up for you."
│   └── Calendly inline widget with dark params (?background_color=111111&text_color=ffffff&primary_color=00ff94)
├── CTA section
│   ├── "Start today for $97 first month" → links to /checkout/en
│   └── "Cancel anytime. 30-day money-back guarantee."
├── Modals (from smdashboard): PostModal, TemplateModal, UTMGenerator, SavedLinksSidebar
└── Inline footer (matching checkout page)
```

### Data Flow from Quiz

On mount, `OrgDashboardShell` reads URL params via `useSearchParams()` (wrapped in `<Suspense>`):
- `storeUrl` → display in demo banner, pre-fill "My Store" mode label
- `scrollTo=calendly` → `useEffect` scrolls to `#calendly` section on mount

Both modes show `MOCK_SM_DATA` (no real backend). The toggle is cosmetic only — "My Store" mode changes the banner text to indicate data is loading/coming soon.

### DemoToggle Component

Simple pill toggle with two segments: "Demo Data" | "My Store". Uses `motion.div` with `layoutId` for the sliding indicator. Same visual pattern as DateRangeToggle.

### Calendly Dark Theme

Instead of importing `CalendlyBlock.tsx` (which has light theme), build Calendly inline directly in `OrgDashboardShell`:
- Load script in `useEffect` (same dedup check as CalendlyBlock)
- Widget `data-url` appends `?background_color=111111&text_color=ffffff&primary_color=00ff94`
- Wrapper: `card-zilla overflow-hidden p-0` with `border-t border-zilla-neon/10`
- Height: 600px mobile, 700px desktop
- Calendly URL: `https://calendly.com/albert-elmgart/black-friday-ai-audit-unlock-hidden-conversions`

### $97 CTA Section

Below Calendly, matching checkout page's final CTA section:
```
<section className="py-20 px-4">
  <div className="max-w-2xl mx-auto text-center">
    <div className="p-8 sm:p-12 rounded-2xl border border-zilla-neon/10 bg-gradient-to-b from-zilla-neon/[0.04] to-transparent">
      <h2>Ready to see what your creators actually bring in?</h2>
      <p>Start today. We set it all up. Pay nothing until it works.</p>
      <Link href="/checkout/en" className="btn-zilla text-lg px-10 py-5 rounded-xl">
        Start now — $97 first month
      </Link>
      <p>30-day money-back guarantee. Cancel anytime.</p>
    </div>
  </div>
</section>
```

---

## Types (`types/quiz.ts`)

```typescript
export type RevenueRange = 'under_50k' | '50k_150k' | '150k_400k' | '400k_1m' | 'over_1m'
export type SpendRange = 'zero_3k' | '3k_8k' | '8k_20k' | '20k_50k' | 'over_50k'
export type CreatorCount = '1_5' | '6_15' | '16_30' | '30_plus'
export type QuizPlatform = 'instagram_reels' | 'tiktok' | 'youtube_shorts' | 'pinterest_other'
export type TrackingMethod = 'guesswork' | 'spreadsheets' | 'ga_meta' | 'not_accurate'

export interface QuizAnswers {
  storeUrl: string
  revenueRange: RevenueRange
  creatorSpend: SpendRange
  creatorCount: CreatorCount
  platforms: QuizPlatform[]
  trackingMethod: TrackingMethod
}

export interface LeakBreakdown {
  attributionGap: number
  platformBlindSpots: number
  creatorScaleLoss: number
  unoptimizedSpend: number
}

export interface QuizResult {
  score: number                           // 0-100
  leakEstimate: number                    // $/month
  breakdown: LeakBreakdown
  bucket: 'low' | 'moderate' | 'high' | 'critical'
  headline: string                        // personalized copy
  insight: string                         // personalized paragraph
}

export interface QuizState {
  step: number
  direction: 1 | -1
  answers: Partial<QuizAnswers>
  email: string
  phone: string
  result: QuizResult | null
}

export interface QuizLeadPayload {
  storeUrl: string
  email: string
  phone: string
  score: number
  leakEstimate: number
  revenueRange: RevenueRange
  platforms: QuizPlatform[]
  trackingMethod: TrackingMethod
  submittedAt: string
}
```

---

## Responsive Strategy

Both pages are mobile-first (Meta ad traffic = mostly mobile).

**Quiz:** Max-width `max-w-lg mx-auto` for all steps. Option grids: `grid-cols-1 sm:grid-cols-2`. Full-width CTA buttons on mobile. Touch targets: `min-h-[52px]` on all option cards.

**Dashboard:** Inherits smdashboard responsive behavior. Controls stack vertically on mobile. KPIs: 2-col mobile → 5-col desktop. Post grid: 2-col mobile → 4-col desktop.

---

## Implementation Order

1. `types/quiz.ts` — type definitions
2. `lib/quizCalculations.ts` — pure calculation functions
3. `components/quiz/QuizOptionCard.tsx` — reusable option card
4. `components/quiz/QuizProgressBar.tsx` — progress bar
5. `components/quiz/QuizIntro.tsx` — intro hero
6. `components/quiz/QuizStepStoreURL.tsx` through `QuizStepTracking.tsx` — 6 question steps
7. `components/quiz/QuizLeakChart.tsx` — leak breakdown chart
8. `components/quiz/QuizResults.tsx` — results preview
9. `components/quiz/QuizEmailGate.tsx` — email/phone form
10. `components/quiz/QuizResultsFull.tsx` — full results + CTAs
11. `components/quiz/QuizShell.tsx` — master orchestrator
12. `app/quiz/layout.tsx` + `app/quiz/page.tsx` — page entry
13. `components/organicdashboard/OrgDashboardShell.tsx` — dashboard shell
14. `app/organicdashboard/layout.tsx` + `app/organicdashboard/page.tsx` — page entry

---

## Verification

1. `cd /home/ghostking/projects/Growzilla.xyz && npx next build` — confirm no TypeScript/build errors
2. `npx next dev` → visit `http://localhost:3000/quiz` — walk through all 10 steps
3. Verify progress bar animates correctly steps 1-6
4. Verify score calculation produces $8k-$35k range for typical inputs
5. Verify email gate saves to localStorage (`growzilla_quiz_lead` key)
6. Click "Play Dashboard" CTA → verify `/organicdashboard?storeUrl=...` opens
7. Visit `/organicdashboard` directly — verify all smdashboard components render
8. Click around: creator selector, platform tabs, post cards, modals
9. Scroll to Calendly — verify dark-themed widget loads
10. Verify $97 CTA links to `/checkout/en`
11. Test on mobile viewport (375px) — verify touch targets, stacking, readability
