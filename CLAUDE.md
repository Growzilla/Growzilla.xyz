# Growzilla.xyz — Next.js Dashboard

## What this is
Growzilla's frontend dashboard. Shopify creator attribution + Meta ads visualization. Deployed on Vercel.

## Stack
- Next.js 14 (Pages Router + App Router hybrid)
- Tailwind CSS + Framer Motion + GSAP
- TypeScript

## Structure
```
pages/          — Pages Router routes (main site, /demo, /deck, /admin, /login)
app/            — App Router routes (/quiz, /whop, /checkout, /organicdashboard)
components/     — React components
  demo/         — Demo dashboard (mock data, single-viewport)
  deck/         — Partnership deck components
  admin/        — Admin panel components
  whop/         — Real dashboard charts (ConeFunnel, SankeyDiagram)
hooks/          — React hooks
lib/            — API client, utils
types/          — TypeScript types
public/         — Static assets
styles/         — Global CSS
```

## Key patterns
- API routes: `pages/api/` (Pages Router)
- Backend calls: `lib/api-client.ts` → `ECOMDASH_API_URL`
- Brand color: `#00FF94` (green)
- Layout: `EliteLayout` for document-style pages (deck, privacy)

## Design System (TWO MODES — apply automatically)

### Mode 1: Landing Pages (/, /pricing, /enterprise, /growzilla)
Full Zilla design — glow, animations, gradients, neon green. Use existing tailwind.config.js tokens freely.

### Mode 2: Dashboard/App UI (/demo, /admin, /whop, all data views) — LINEAR STYLE
Premium clean. Every dashboard component MUST follow these rules:
- **Backgrounds**: `#0A0A0B` → `#151518` → `#1A1A1A`. Max 3 elevation levels. No glassmorphism.
- **Borders**: `rgba(255,255,255,0.08)`. No shadows on cards — use 1px border instead.
- **Text**: primary 95% white, secondary 72%, tertiary 48%. Never pure #FFFFFF.
- **Accent**: `#00FF94` sparingly. Max 10% of any screen. Everything else is grayscale.
- **Typography**: Satoshi. 400/500/600 weights only. 13px body, 12px labels, 16px section headers.
- **Spacing**: 4px base grid. Generous whitespace. Card padding 16-20px. Section gaps 24-32px.
- **Radius**: `rounded-md` buttons, `rounded-lg` cards, `rounded-xl` modals. No `rounded-full` on containers.
- **Motion**: 150ms interactions, 200ms transitions. `ease-out` only. No glow, no pulse, no bounce.
- **Layout**: Left-aligned. Max 1200px data views. No centered heroes in dashboards.
- **NEVER in dashboards**: neon glow, gradients, particle effects, multiple accent colors, decorative animations.
- **Self-check**: "Would this look at home in Linear?" If no, simplify.
- **Full reference**: `/dev/growzillaAssets/patterns/premium-ui-design-system.md`

### Mode 3: Document Pages (/deck, /privacy, proposals)
EliteLayout + max-w-4xl, natural scroll, numbered sections. No animations, no glow.

## Commands
- `npm run dev` — local dev server (port 3000)
- `npm run build` — production build
- Deploys automatically on push to main via Vercel

## Do NOT
- Create new pages without checking if a similar page exists
- Use App Router for pages that should be in Pages Router (most pages use Pages Router)
- Hardcode backend URLs — use env var `ECOMDASH_API_URL`
- Add animations to document-style pages (deck, privacy)

## Git
- Identity: `AscenderGrey <albert.elmgart@gmail.com>`
- Remote: `Growzilla/Growzilla.xyz.git`
