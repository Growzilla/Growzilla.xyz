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

## Design System

**Read [`/DESIGN.md`](./DESIGN.md) FIRST before generating any UI.** It registers the two themes (`zilla` default, `claude` editorial), points to per-theme tokens, and lists the "never do" rules. Per-theme specs live in `/dev/growzillaAssets/design/DESIGN-{zilla,claude}.md`. Typography stack: `/dev/growzillaAssets/design/typography.md`.

### Legacy modes (still valid for Zilla theme)

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

## Agent Mistakes
<!-- Agents: append one-line lessons here when you encounter bugs or wrong assumptions. Never remove entries. -->
- Always run `npx tsc --noEmit` before committing — catches broken imports and wrong prop types
- Filters go OUTSIDE visualization panels, not inside them (confirmed Session 12)
- Funnel shape: connected trapezoids (each top = prev bottom), NOT tapering to a point
- Sankey: single "Traffic" entry bar, creators as sub-labels not separate column
- Document pages (deck, privacy) use EliteLayout + max-w-4xl — no animations, no glow
- Do NOT use App Router for pages that should be in Pages Router (most pages use Pages Router)
- Stop-gate `git status` check doesn't distinguish ownership. When multiple agents work in the same worktree in parallel on a shared branch (S46 2026-05-13: fe-growth + quiz + ads on `feat/morsdag-launch`), the gate fires "uncommitted changes" even after the owning agent has committed its surface — because untracked files from sibling agents and dev tooling (.claude/, .cmux/, .playwright-mcp/, tsconfig.tsbuildinfo) remain in the worktree. Resolution: commit your own files explicitly by path, never `git add -A`. Leave sibling agents' work for them. Per the gate's own instructions for unfixable cases, record here + status BLOCKED + exit. Long-term: gate needs an ownership-aware filter (e.g. domain-guard.sh regex applied to status output).

### Agency landing premium revamp lessons (Session 43, 2026-05-07)
The `/agency` route is **brand landing**, not SaaS landing. Different visual register, different copy register, different proof patterns. Mistakes captured below — never repeat:
- **No software UI on `/agency`.** No Sankey, no dashboard mockups, no faux-browser frames, no SVG attribution diagrams (`spend → attribution → revenue` connector lines is software UI in disguise). Hero proof = typographic motion (Remotion 6s loop), not a chart. Even `ScrollVideo` rendering an animated SVG of metrics counts as software UI here.
- **Bars are two opacities of `#00FF94`, never gray + neon.** `BarChart.tsx`'s `monochrome` mode (gray non-highlight + neon highlight) is wrong for the agency brand. Build/use `AllGreenBars` instead: before-bar `#00FF94 @ 0.22`, after-bar `#00FF94 @ 1.0`. Track fill `rgba(0,255,148,0.04)`. Forbidden: gray bars, white/[0.08] bars, gradient fills, glow shadows on bars.
- **Card-grid + icon + 3-step is the default ugly pattern.** The original `Mechanism` section earned the "ugly" call from the operator because it used a card row with icons. For premium agency sections (especially the named-method block), use editorial type-only treatment: mono stage marker → display headline → editorial body → hairline rule. NO icon cards. NO numbered circles in pastel boxes. NO arrow-between-steps decoration.
- **Editorial rows > cards for "lead magnets" / list sections.** Default instinct is rounded cards in a grid. Premium move is full-width editorial rows separated by hairlines, with a single neon CTA arrow per row.
- **Case detail pages stay zilla-black/neon, not `claude` cream.** `app/agency/cases/[slug]/page.tsx` defaulted to `data-theme="claude"` (cream/serif/editorial) — wrong for the agency brand brief ("clean black screen with text, black + green color scheme"). Cross-theme bleed is a smell; pick one.
- **Never ship aspirational placeholder numbers next to real captured data.** `CaseStudySlot.tsx` and `PageLoadSpeed.tsx` shipped PSI 28→89 (+217%) as placeholder while the real Joanna screenshots show 18→69 (+283%). When you see the captured number, flip the placeholder on first edit — don't leave both in the codebase.
- **Software-register copy is software register even when criticizing SaaS.** "Sankey from your store, not a Triple Whale dashboard you rent" reads SaaS even though it's anti-SaaS. Operator-language for `/agency` only: ship, kill, run, own, raise, cut, rewrite, the work, the brand, the call, the founder, the brief, the cohort, the account. Banned everywhere on `/agency`: platform, install, dashboard, integration, ingestion, pipeline, solution, leverage, synergy, seamless, holistic, end-to-end, scalable, robust, "AI systems", "post-Andromeda CBO", "Sankey".
- **Emoji on `/agency` = one per section max, functional anchor only.** Claude-Code style: ◆ ⚡ ✦ → ↳ ● used as eyebrow anchors. Never decoration. Never two in one section.
- **When memory contradicts the working tree, update memory on the spot.** [`agency_landing_paused.md`](../../.claude/projects/-home-god0fm0ney-dev-projects-Growzilla-xyz/memory/agency_landing_paused.md) said "do not start building" while the build was already on disk for 21 days. Note the contradiction in your status reply, AND edit the memory in the same turn.

**Agency-landing source of truth:** `/dev/projects/Growzilla.xyz/AGENCY_REVAMP_PLAN.md` — 15-section build plan. Read §15 OP-CONFIRMs before writing any code.

**Soft brand guardrail on `/agency` (added 2026-05-07 after brand-collision resolved with Benjamin Kolenović of growzillas.com):** less dino imagery, tasteful differentiation. No 🦖 emoji, no "atomic breath" copy, no scaled-monster visual metaphors on agency-facing collateral. The neon `#00FF94` brand color stays (the "atomic breath" reference in `tailwind.config.js` is internal-only token language, fine). SaaS landing (`/`) keeps full Zilla energy — the guardrail is `/agency`-specific.

## Git
- Identity: `AscenderGrey <albert.elmgart@gmail.com>`
- Remote: `Growzilla/Growzilla.xyz.git`
