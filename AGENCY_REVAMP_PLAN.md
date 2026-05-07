# /agency Premium Revamp — Build Plan

> Single source of truth for the `/agency` redesign. Ship sequence, file-level diffs, motion specs, copy doctrine. Read top to bottom.

---

## §1 — Taste North Star

**Thesis:** *Operator's atelier, not a SaaS pitch deck.* Magazine-grade type, ruthless restraint, motion that rewards scrolling. Anchor reference: **longsword.vercel.app** — large editorial type, single hero motion piece, generous negative space, mono-eyebrow micro-typography, monochrome plus one accent.

**We never:**
1. Show software UI (dashboards, Sankey, app screenshots) on `/agency`.
2. Use neon green on more than ~10% of any section's surface area.
3. Use a card-grid + icon + 3-step layout (the "ugly Mechanism" anti-pattern).
4. Use grey/white bars in charts — green at two opacities only.
5. Use more than one emoji per section, ever.

**We always:**
1. Let typography do the work; chrome is the failure mode.
2. Mono eyebrow (11–12px, 0.18em tracking, neon at 80% opacity) → display headline → editorial body.
3. Cite real captured-at timestamps on every metric.
4. Stagger motion at `delay 0.1 + i × 0.06`, easing `easeOut` or `[0.16, 1, 0.3, 1]`, durations 450–600ms.
5. Push the Scandinavian Poster work as the visual anchor of the whole page.

---

## §2 — Structure: The 5 Core Questions

Every section must answer exactly one of these. Sections that don't map are deleted.

| # | Question | Section name | File | Job |
|---|----------|-------------|------|-----|
| 1 | **Are you the real thing?** | `Hero` | `components/agency/Hero.tsx` | 3-second credibility — no Sankey, Remotion typographic loop instead |
| 1b | **How big are you?** | `ViewsCounter` | `components/agency/ViewsCounter.tsx` (NEW) | 30,000+ views shipped — frame larger |
| 2 | **What did you actually do?** | `CaseHero` (Scandinavian Poster) | `components/agency/CaseHero.tsx` (NEW, replaces `CasesStrip`) | The proof, single largest visual section |
| 3 | **How do you do it?** | `TheGauntlet` | `components/agency/TheGauntlet.tsx` (NEW, replaces `Mechanism` + absorbs `TheSystem`) | The named, mythologized method |
| 4 | **What do you give me before I pay?** | `LeadMagnets` + `TheVaultTeaser` | `components/agency/LeadMagnets.tsx`, `components/agency/TheVaultTeaser.tsx` (NEW) | Free-value entry points |
| 4b | **Who's behind this?** | `AboutTeaser` | `components/agency/AboutTeaser.tsx` (NEW) | Founder voice, links to `/agency/about` |
| 5 | **How do I get you?** | `ContactForm` | `components/agency/ContactForm.tsx` (NEW) | On-page contact, scarcity signal |

**Deletions (with reason):**
- `PaidAdsLab` — DELETE. Talks about "Andromeda CBO/ASC" — software language. Best ideas fold into `TheGauntlet` Stage 02.
- `ContentEngine` — DELETE. Card-row anti-pattern + "platform" language. Best ideas fold into `TheGauntlet` Stage 01.
- `PageLoadSpeed` — DELETE. The PSI proof relocates into `CaseHero` (it's already Joanna's data). Tools list deleted entirely (advertising tooling looks junior).
- `AISystems` — DELETE. "AI systems" is exactly the SaaS register we're killing. Best line ("we don't guess, we run the recipe") moves into `TheGauntlet` headline.
- `Pricing` — DELETE from landing. Pricing is a call conversation. Move to `/agency/pricing` route, linked from FAQ only.
- `HowWePay` — KEEP but compress. Folds into a single 3-line block inside `ContactForm` section.
- `LoomOffer` — DELETE. Replaced by `LeadMagnets` (the Sankey-Loom becomes one of three magnets, but the Sankey verbiage is killed; rename to "Funnel Teardown").
- `FAQ` — KEEP, edited. Strip every "install" / "Shopify app" line. 4 Qs not 6.
- `CompetitorAdsQuiz` — KEEP as the first card inside `LeadMagnets` only; the standalone section dies.

**Final landing flow (top to bottom):**
`Nav → Hero → ViewsCounter → CaseHero → TheGauntlet → LeadMagnets → TheVaultTeaser → AboutTeaser → FAQ → ContactForm → Footer`

10 sections. Down from 14, with the meat redistributed.

---

## §3 — Section-by-Section Spec

### 3.1 `Hero` — REWRITE

- **File:** `components/agency/Hero.tsx`
- **Status:** REWRITE (kill Sankey block entirely)
- **Job:** 3-second "this is the real thing" — operator energy, not SaaS energy
- **Layout:** Full bleed. `pt-32 pb-24`, `max-w-7xl mx-auto px-5 sm:px-8`. **Single column** (no two-column with chart). Headline left-aligned, max-w-4xl. Remotion piece below the fold of the headline, full-width inside the container, `aspect-[16/7]`.
- **Type stack:** Eyebrow mono 12px, 0.18em, neon/80. Headline display 56–80px, `font-semibold`, tracking `-0.025em`, leading 1.02. Sub-line 17px white/60, max-w-xl.
- **Color usage:** Neon only on: status dot (top), headline accent word `ship.`, primary CTA. ~6% surface.
- **Motion:** Headline + eyebrow stagger in (`y 12 → 0`, 500ms). Remotion piece starts on mount (autoplay loop). No hover decoration on the CTA — only `translate-y-[-1px]`.
- **Emoji use:** zero in Hero.
- **Copy slots:**
  - Eyebrow: `OPERATORS · NOT A PLATFORM`
  - Headline: `We ship the work most agencies talk about.` (operator can override)
  - Sub: `Paid acquisition, conversion, and creative — run by one team for one Tier-A brand per category. {operator-fills proof line}`
  - CTA primary: `See the work →` (anchors to #case)
  - CTA secondary: `Or talk to the founder ↓` (anchors to #contact)
  - Trust strip below: `Shopify Partner · Forest City Hackathons · RolloutFactory Inc.`
- **Failure mode pre-empted:** *Looking like a SaaS landing.* Achieved by killing the Sankey + dashboard-frame chrome and centering on a typographic Remotion piece.

### 3.2 `ViewsCounter` — NEW

- **File:** `components/agency/ViewsCounter.tsx`
- **Status:** NEW
- **Job:** Frame Growzilla as larger than it is, defensibly.
- **Layout:** Full-width band, `py-32 sm:py-40`, `bg-zilla-black`, top + bottom hairline border-white/[0.06]. Centered, max-w-3xl.
- **Type stack:** Eyebrow `VIEWS PRODUCED · ALL CLIENT CREATIVE` mono 11px white/40 → giant counter display 96–120px tracking -0.03em → mono 12px white/40 sub.
- **Color usage:** Counter number white/95, the `+` glyph in neon. ~3% surface.
- **Motion:** Count-up from 0 → 30,000 over 1.6s, `easeOut`, fires once on `useInView`. Use `motion.span` with rAF interpolation.
- **Emoji:** zero.
- **Copy slots:**
  - Eyebrow: `VIEWS PRODUCED`
  - Number: `30,000+` (prop-overrideable, default 30000)
  - Sub: `Across all client creative · {operator-fills period e.g. "since 2024"}`
- **Failure mode pre-empted:** *Looking like a dishonest startup vanity-metric.* Solved with the precise sub-line and an operator comment in code: `// claim covers cumulative views across all shipped client creative — confirm number monthly`.

### 3.3 `CaseHero` — NEW (replaces `CasesStrip`)

- **File:** `components/agency/CaseHero.tsx` (delete `components/agency/CasesStrip.tsx` and `components/agency/CaseStudySlot.tsx`)
- **Status:** NEW
- **Job:** The proof. Single largest visual section. Earns the rest of the page.
- **Layout:** `py-28 sm:py-36`, max-w-7xl. Eyebrow `CASES · 2026`. Headline `Scandinavian Poster.` Big two-column layout: **left** = wordmark + brand meta + 90-day arc summary copy; **right** = the all-green PSI bars + four Lighthouse rings. Below the fold of the section, an editorial 3-line summary and a `Read the full case →` link to `/agency/cases/scandinavian-poster`.
- **Type stack:** Headline display 60–80px tracking -0.025em. Section sub 18px white/65 max-w-xl.
- **Color usage:** Neon on: PSI "After" bar, +283% delta, the case CTA arrow, the wordmark accent dot. ~9% surface (the most of any section — earned by being the proof).
- **Motion:** Wordmark + meta stagger in. Bars animate (see §6). Lighthouse rings draw arcs in 900ms `easeOut`, neon path stroke `dasharray` reveal.
- **Emoji:** **one** functional anchor — `◆` next to "REAL DATA" badge, nothing else.
- **Copy slots:**
  - Eyebrow: `◆ CASE · 01 · 2026`
  - Headline: `Scandinavian Poster.`
  - Meta line: `Custom posters · Sweden · 90 days, sessions 25–39`
  - Summary paragraph: `Same Shopify theme, same product catalog. Just the critical path rebuilt. Mobile Lighthouse moved 18 → 69 over 90 days, captured May 5 2026 on Moto G Power, slow 4G, headless Chromium 146.` (operator can override but this is shippable)
  - CTA: `Read the full case →` to `/agency/cases/scandinavian-poster`
- **Failure mode pre-empted:** *Looking like one of five interchangeable case tiles.* Solved by giving the whole section to one brand and removing the placeholder grid.

### 3.4 `TheGauntlet` — NEW (replaces `Mechanism` + absorbs `TheSystem`)

- **File:** `components/agency/TheGauntlet.tsx` (delete `Mechanism.tsx`, `TheSystem.tsx`, `ScrollVideo.tsx`)
- **Status:** NEW
- **Job:** Mythologize the method. "THE GAUNTLET" reads as proprietary, named, version-stamped — not as a 3-step process diagram.
- **Layout:** Single column, max-w-3xl mx-auto, `py-32 sm:py-40`. **Pure typography. No cards. No icons. No process numbers in pastel circles.** The three stages are rendered as three editorial paragraph blocks separated by hairline rules and a left-aligned mono stage marker (`STAGE 01 · BREAK` etc.). Right gutter optional: `v9.4` version stamp in mono.
- **Type stack:** Eyebrow `◆ THE METHOD`. Headline display 56–72px: `THE GAUNTLET.` Sub 17px white/65 max-w-xl: `What we run every brand through. {operator-fills tagline}`. Stage markers mono 11px 0.2em tracking white/45. Stage headlines display 28–32px. Stage bodies editorial 16px white/60 leading-1.7.
- **Color usage:** Neon only on: the proprietary version stamp `v9.4`, the underline of the word `THE GAUNTLET`, and the single outcome metric per stage. ~4% surface.
- **Motion:** Each stage paragraph fades up with `y 16 → 0` at `delay i × 0.12`. The neon underline beneath `THE GAUNTLET` draws across in 700ms `easeOut` on view.
- **Emoji:** **one** — `◆` in eyebrow only.
- **Copy slots — locked:**

  > **Eyebrow:** `◆ THE METHOD · v9.4`
  >
  > **Headline:** `THE GAUNTLET.` *(neon underline travels under it on scroll-in)*
  >
  > **Sub:** `Six brands at a time, max. We don't take more. Every account runs the same gauntlet — break, build, scale.`
  >
  > **STAGE 01 · BREAK** · `Audit + kill. {operator-fills 2 sentences}.` — outcome metric: `~14 days` (mono, neon)
  >
  > **STAGE 02 · BUILD** · `Creative volume + critical-path rebuild. {operator-fills}.` — outcome metric: `30+ ad-ready clips / wk` (neon)
  >
  > **STAGE 03 · SCALE** · `Daily hook-rate review. Kill anything below 30% hold. Five fresh hooks a week. We feed the algorithm; it picks the winners.` — outcome metric: `2 creatives carry the month` (neon)

  Closing line under all three stages: `Runs 6 brands at a time, max.`
- **Failure mode pre-empted:** *The current "Mechanism" ugly pattern* — generic 3-step icon cards. Forbidden in this section's CSS by literally having no card components, no `<svg>` icon imports, no numbered circles.

### 3.5 `LeadMagnets` — NEW (replaces `CompetitorAdsQuiz` + `LoomOffer`)

- **File:** `components/agency/LeadMagnets.tsx` (delete the two it replaces)
- **Status:** NEW
- **Job:** Surface the strongest top-of-funnel asset. Free, premium-looking, no signup wall language.
- **Layout:** `py-28`. Eyebrow `FREE FOR OPERATORS.` Headline `Take what we'd charge for.` Below: 3 magnet rows, equal weight, full-width, hairline-separated. Each row: glyph (24px) + title + one-line value-prop + time-to-value chip + CTA arrow. **Not cards.** Editorial list rows.
- **Type stack:** Row title display 24px. Body 14px white/60. Time chip mono 11px white/40.
- **Color usage:** Neon on: CTA arrow per row only. ~3% surface.
- **Motion:** Rows stagger in `y 12 → 0` at `delay i × 0.08`.
- **Emoji:** **one per row, functional** — `◆` (Competitor Pull), `⚡` (Hook Mine), `✦` (PSI Audit).
- **Magnets (locked):**
  1. **◆ Competitor Ads Pull** — `We pull every ad your top 3 competitors ran in the last 30 days. You read it tonight.` · `~4 min` · `→ /agency/vault/competitor-ads`
  2. **⚡ Hook Mine** — `100 hooks ranked by spend, scraped from the brands beating you.` · `~6 min` · `→ /agency/vault/hook-mine`
  3. **✦ PSI Audit** — `Mobile-speed audit + the fix order, prioritized. Free.` · `~3 min` · `→ /agency/vault/psi-audit`
- **Failure mode pre-empted:** *Looking like a "lead magnet shelf" from a 2018 Russell Brunson page.* Solved by editorial-row treatment, single accent per row, no hyperbolic copy.

### 3.6 `TheVaultTeaser` — NEW

- **File:** `components/agency/TheVaultTeaser.tsx`
- **Status:** NEW
- **Job:** Tease the free-value hub at `/agency/vault`. One paragraph, one link.
- **Layout:** Compact band, `py-20`, max-w-3xl mx-auto, centered. Hairline borders top/bottom.
- **Type stack:** Eyebrow `THE VAULT`. Display 32px headline. Editorial 16px body. Mono link.
- **Color usage:** Neon on `→` arrow only.
- **Motion:** Single fade-up reveal.
- **Emoji:** zero.
- **Copy:**
  - Eyebrow: `THE VAULT`
  - Headline: `Everything we'd charge for. Free, while we have the bandwidth to write it.`
  - Body: `Breakdowns, playbooks, the tools we use on client work. Ungated.`
  - Link: `Open the Vault →` to `/agency/vault`
- **Failure mode pre-empted:** *"Resources" tab energy.* Solved with the proprietary name + scarcity ("while we have the bandwidth").

### 3.7 `AboutTeaser` — NEW

- **File:** `components/agency/AboutTeaser.tsx`
- **Status:** NEW
- **Job:** The human under the work — one short paragraph, link to full essay at `/agency/about`.
- **Layout:** Two-column, `py-28`. Left: founder photo slot (placeholder for now), 1:1 aspect, max-w-sm. Right: 2-paragraph essay teaser + signature.
- **Type stack:** Eyebrow `WHO`. Display 32–40px headline. Editorial 17px body, leading-1.75.
- **Color usage:** Neon only on the `Read more →` arrow.
- **Motion:** Photo + copy stagger in.
- **Emoji:** zero.
- **Copy slots:**
  - Eyebrow: `WHO`
  - Headline: `One operator. Six brands at a time.`
  - Body para 1 (default, operator-overrideable): `I'm Albert. I've shipped paid + creative + CRO for Shopify brands since 2024. Growzilla is the system I built because every agency I worked with showed me ROAS but couldn't show me what each dollar did.`
  - Body para 2: `{operator-fills second paragraph — why this taste, why this team, why now}`
  - Signature: `— Albert Elmgart, Sweden`
  - Link: `Read the full essay →` to `/agency/about`
- **Failure mode pre-empted:** *Generic "Meet the team" page with stock illustrations.* Solved by first-person voice + single-photo + essay-link pattern.

### 3.8 `ContactForm` — NEW (compresses `HowWePay` into a 3-line callout above)

- **File:** `components/agency/ContactForm.tsx`
- **Status:** NEW
- **Job:** Final on-page contact. Premium minimal. Backed by an API route.
- **Layout:** `py-32`, max-w-md mx-auto. Above the form: 3-line callout summarizing the deal (compressed `HowWePay`):
  > `Base + 10% incremental. One client per niche per market. 90-day minimum.`
- Below callout: the form. Below form: scarcity line + Calendly fallback link.
- **Type stack:** Eyebrow `THE CALL`. Headline display 36–44px: `Tell me where you're stuck.` Form fields h-12 inputs, no floating labels, placeholders only, mono 13px placeholder color white/35.
- **Fields (in order):**
  1. Name (text, required)
  2. Email (email, required)
  3. Brand URL (text, required)
  4. Monthly revenue band (select: `<£15k` / `£15–60k` / `£60–150k` / `£150–300k` / `£300k+`, required)
  5. `Where you're stuck` (textarea, 3 rows, optional but nudged)
  6. Honeypot field `website` (visually hidden, must be empty)
  7. Submit button: `Send → ` neon
- **Color usage:** Neon on submit button + focus ring `#00FF94/40` only.
- **Motion:** Form fields fade up, submit button has `translate-y-[-1px]` on hover. Success state replaces form with editorial paragraph.
- **Emoji:** zero.
- **Copy slots:**
  - Scarcity line above form: `3 Tier-A slots open · Q3 2026`
  - Submit: `Send →`
  - Success: `Got it. We read every one. Reply within 24h, weekdays.`
  - Below form: `Or book direct →` (small mono link to existing Calendly)
- **API target:** `pages/api/agency-contact.ts` (NEW) — write to existing `pages/api/leads.ts` flow with `source: 'agency_contact'` field, OR Airtable. **`[OP-CONFIRM]` which backend.**
- **Failure mode pre-empted:** *reCAPTCHA / floating-label / multi-step form garbage.* Solved by single-screen flat form, honeypot only, neon focus ring as the only chrome.

### 3.9 `FAQ` — EDIT

- **File:** `components/agency/FAQ.tsx`
- **Status:** EDIT (not rewrite)
- **Job:** Pre-empt the four objections that close calls. Strip software language from every answer.
- **Edits required:**
  - **DELETE Q1** (`Do I need to install something?`) — entire question is software-language. Replaces with: `What do we own at the end?` → `Your ad account, your pixel, your audiences, every creative, every theme fix. We never co-own anything.`
  - **EDIT Q2** (`Whose ad account…`) — replace `request Partner access via Meta Business Manager` with `we run on yours; you grant access, you keep ownership.`
  - **KEEP Q3** as-is.
  - **EDIT Q4** (`Can I cancel?`) — strip `attribution + creative iteration mature` → `the work needs 90 days to compound. Below that, the data is noise.`
  - **KEEP Q5**.
  - **DELETE Q6** (replaced by ContactForm flow).
  - Result: 4 questions. Headline: `Four questions we get most.`
- **Color, layout, motion:** unchanged.

### 3.10 `Footer` — EDIT

- **File:** `components/agency/Footer.tsx`
- **Status:** EDIT
- **Edits:** Rename `Software` link → `The App` (or `Self-serve`); add link `The Vault → /agency/vault`; add link `About → /agency/about`; rename `Demo` → keep; keep LinkedIn + email. Strip the "Software" word everywhere.

### 3.11 `Nav` — EDIT

- **File:** `components/agency/Nav.tsx`
- **Status:** EDIT
- **Edits:** Replace `Paid Ads` mega-menu with simpler links: `Cases · The Gauntlet · The Vault · About`. Drop the platform-playbook dropdown from the landing nav (still accessible from /agency/vault). CTA stays as `Book a call`.

---

## §4 — THE GAUNTLET (the named method)

**Definition (≤14 words):**
> *Three-stage operator gauntlet. Six brands at a time, max. Break, Build, Scale.*

**Three stages (verb + noun + outcome metric):**
1. **BREAK** · the audit — `~14 days to first kill`
2. **BUILD** · creative volume + critical-path rebuild — `30+ ad-ready clips / wk`
3. **SCALE** · daily hook-rate review, kill below 30% hold — `2 creatives carry the month`

**Visual treatment (typography only, forbidden patterns explicit):**
- ✅ Mono stage markers, display stage headlines, editorial bodies, hairline rules between stages
- ✅ Single neon underline traveling beneath the section title
- ✅ Outcome metric in neon mono on the right edge of each stage row
- ❌ NO icon cards
- ❌ NO process diagrams
- ❌ NO numbered circles in pastel boxes
- ❌ NO arrow-between-steps decoration
- ❌ NO `bg-zilla-surface` cards on the stage rows (use bare hairlines)

**Single proprietary-feel detail:** Version stamp `v9.4` in the eyebrow, plus the capacity stat `Runs 6 brands at a time, max.` as the closing line. Internal codename optional in `/agency/about`: `internal name: GZL-G9`.

**`[OP-CONFIRM]`:** Final algorithm name. Default = `THE GAUNTLET`. Alternates: `BLACKBOX` / `COLDFRONT` / `NORTHSTAR-9` / `OPERATOR ENGINE` / `THE REVENUE LATTICE`.

---

## §5 — Remotion Composition Spec

- **File:** `remotion/AgencyHero.tsx`
- **Mount:** Inside `Hero.tsx`, full-width below the headline block. Lazy-loaded via `next/dynamic` with `ssr: false`. Falls back to a static SVG composition (no spinner) if Remotion bundle 404s.
- **Dimensions:** `1600 × 700` (16:7). FPS `30`. Duration `180 frames` (6s loop). Background `#0A0A0B`.
- **Storyboard (5 keyframes):**
  | Frame | Visual |
  |-------|--------|
  | 0–30 | Black field. Mono eyebrow `THE WORK · LAST 30 DAYS` types in top-left |
  | 30–80 | Six verbs ticker-cycle vertically center-stage at 96px display, one verb every 8 frames: `SHIPPED · KILLED · SCALED · REWROTE · RAISED · CUT`. Each verb fades to white/95 then dims to white/15 as next replaces. |
  | 80–110 | All six verbs collapse into a stack on the left, white/30. Right side reveals: `30,000+ VIEWS` in display 64px, neon `+` |
  | 110–150 | Neon underline (1px, 240px wide) travels left-to-right across the bottom third over 40 frames |
  | 150–180 | Underline parks under the words `THE WORK`. Frame 180 = frame 0, seamless loop |
- **Performance budget:** ≤80kb gzipped, no images, no fonts loaded inline (uses already-loaded display + mono).
- **Failure mode pre-empted:** Looks like a software demo. Solved by ZERO UI elements — pure type on black.

---

## §6 — Bar Chart System (all-green)

- **File:** `components/agency/AllGreenBars.tsx` (NEW). Edit `components/agency/BarChart.tsx` to remove the `monochrome` gating (or leave that file unused once replaced).
- **Props:**
  ```ts
  type AllGreenBarsProps = {
    data: { label: string; value: number }[]
    unit?: string
    height?: number
    /** Optional: highlight the last bar's value-label slightly brighter; bar fill stays full neon */
    spotlightLast?: boolean
    ariaLabel: string
  }
  ```
- **Color rules (locked):**
  - **Bar fill:** `#00FF94` at `opacity: 1.0` for all bars by default
  - **"Before" pattern (when used as a 2-bar before/after, e.g. PSI block):** before-bar `#00FF94` at `opacity: 0.22`, after-bar `#00FF94` at `opacity: 1.0`
  - **Track / baseline:** `rgba(0,255,148,0.04)` for fill, `rgba(255,255,255,0.06)` for the 1px baseline
  - **Number labels:** mono tabular-nums, before label `white/55`, after label `#00FF94`. X-axis labels mono 11px `white/45`.
- **Forbidden:** grey bars, white/[0.08] bars, gradient fills, animated-pulse, glow shadows on bars.
- **Animation:** width or height 0 → final, 900ms `easeOut`, after-bar delayed 200ms behind before-bar. Stagger `delay 0.1 + i × 0.06` for multi-bar charts.
- **Used by:** `CaseHero` PSI 18→69 block; any future metric block. **Not used inside `TheGauntlet`** (Gauntlet is type-only by spec).

---

## §7 — Views Counter Spec

- **File:** `components/agency/ViewsCounter.tsx`
- **Props:**
  ```ts
  type ViewsCounterProps = {
    target?: number      // default 30000
    period?: string      // default "since 2024"
    label?: string       // default "Views produced"
  }
  ```
- **Anchor copy:**
  - Eyebrow: `VIEWS PRODUCED`
  - Display number: count-up 0 → `target`, animate over 1.6s easeOut, fires once on `useInView({ once: true, margin: '-80px' })`
  - Format: `30,000+` (operator-overrideable to `30k+`). The `+` glyph rendered as a separate `<span>` in `text-zilla-neon`.
- **Typography:** display 96–120px, tracking -0.03em, weight 600, white/95.
- **Sub-line:** mono 11px white/40 — `Across all client creative · {period}`
- **Placement:** between `Hero` and `CaseHero`. Full-width, dark band, `py-32`. Hairline borders top/bottom.
- **Defensibility comment in code (mandatory):**
  ```tsx
  // Claim covers cumulative views across all shipped client creative
  // since project start. Confirm number monthly. Source: meta-ads MCP
  // export `get_creative_performance` summed across active accounts.
  ```

---

## §8 — Lead Magnets Shelf

(See §3.5 above for layout/motion/copy.) The shelf is the strongest TOFU asset on the page. Each magnet has a dedicated route under `/agency/vault/[slug]`:

| Slug | Surface | Wired to |
|------|---------|----------|
| `competitor-ads` | Form: paste competitor domain → email teardown | Existing `/adcreator?domain=…&source=agency_vault` flow |
| `hook-mine` | Form: paste your domain → ranked hook list | NEW — wires to `pages/api/leads.ts` with `source: 'hook_mine'`, queue to operator inbox |
| `psi-audit` | Form: paste store URL + email → PDF audit | NEW — wires to `pages/api/leads.ts` with `source: 'psi_audit'`, manual delivery |

---

## §9 — The Vault (free-value hub route)

- **Routes:**
  - `app/agency/vault/page.tsx` (NEW) — index
  - `app/agency/vault/[slug]/page.tsx` (NEW) — dynamic per-piece
  - `app/agency/vault/layout.tsx` (NEW) — metadata
- **Hub job:** Editorial publication index. Not a blog. Magazine-grade list view.
- **Naming:** `THE VAULT` (default). `[OP-CONFIRM]` alternates: `THE LAB` / `OPERATOR NOTES` / `FIELD NOTES` / `THE BRIEFING ROOM` / `THE PLAYBOOK`.
- **Index layout:** `max-w-3xl mx-auto py-32`. Eyebrow `THE VAULT`. Headline: `Everything we'd charge for. Free, while we have the bandwidth to write it.` Below: editorial list, one row per piece — `mono date · display title · one-line dek · → arrow`. Hairline separators. No card chrome.
- **Per-piece page shell:** Re-use the case-detail typographic shell — `max-w-2xl mx-auto py-28`, black bg, neon accents, mono eyebrows, display headlines, editorial body. Sections `01–06` operator-fillable.
- **Piece types:**
  - `magnet` — gated form at top, free preview below
  - `breakdown` — free read, no gate
  - `playbook` — free read, longer form
- **Top of hub line:** `Everything we'd charge for. Free, while we have the bandwidth to write it.`

---

## §10 — About Section

- **Routes:**
  - `components/agency/AboutTeaser.tsx` (NEW) — landing teaser, see §3.7
  - `app/agency/about/page.tsx` (NEW) — full essay route
  - `app/agency/about/layout.tsx` (NEW) — metadata
- **Full route layout:** `max-w-2xl mx-auto py-28`, black bg. Founder photo slot at top (`/agency/about/founder.jpg` placeholder). Operator-essay slot 1,200–1,800 words. Three "what we believe" tenets at bottom as numbered editorial paragraphs (no cards).
- **Tone:** First-person operator voice. NOT third-person marketing.
- **Tenets (default, operator-overrideable):**
  1. *Pricing is for software. Operators charge a base + take a cut of what they raise.*
  2. *Six brands at a time, max. Past that, taste collapses.*
  3. *We don't sell dashboards. We sell weekly fixes deployed to your live store.*

---

## §11 — Contact Form

(See §3.8 for layout/copy.)

**Backend route:** `pages/api/agency-contact.ts` (NEW)
- Method: `POST`
- Body: `{ name, email, brandUrl, revenueBand, stuck, website }`
- Honeypot: if `website` non-empty, return 200 silently.
- Writes to: existing leads table (whatever `pages/api/leads.ts` writes to) with `source: 'agency_contact'`. **`[OP-CONFIRM]`: confirm Airtable vs Postgres target.**
- Returns: `{ ok: true }` on success, `{ ok: false, error: '…' }` on failure.

**Anti-spam:** Honeypot only. No reCAPTCHA. No Cloudflare Turnstile. No SMS verification.

**Above form:** scarcity line `3 Tier-A slots open · Q3 2026` (operator updates monthly — `[OP-CONFIRM]`).

**Below form:** small mono link `Or book direct →` to existing Calendly.

---

## §12 — Copy Doctrine

| BANNED (delete on sight) | PREFERRED (use these) |
|--------------------------|----------------------|
| platform | the work |
| install | run |
| dashboard | the brief |
| integration | ship |
| ingestion | kill |
| pipeline | own |
| solution | rewrite |
| leverage | raise |
| synergy | cut |
| seamless | the call |
| holistic | the founder |
| end-to-end | the brand |
| scalable | the account |
| robust | the cohort |
| AI systems | hooks |
| post-Andromeda CBO | spend |
| Sankey | the work |

**Apply retroactively** across every section's copy slot in §3. The biggest scrub-targets:
- `FAQ` → "Do I need to install something?" must die
- `HowWePay` → "Sankey from your store" must die
- `AISystems` → entire framing dies (section deleted anyway)
- `PaidAdsLab` → "post-Andromeda CBO" dies (section deleted anyway)
- `Footer` → "Software" link renamed

---

## §13 — File-Level Diff Summary

| File | Action | One-line reason |
|------|--------|-----------------|
| `app/agency/page.tsx` | EDIT | Update import list to new section names + flow order |
| `components/agency/Hero.tsx` | REWRITE | Kill Sankey block, mount Remotion piece |
| `components/agency/Nav.tsx` | EDIT | Drop Paid Ads mega-menu, simpler links |
| `components/agency/CasesStrip.tsx` | DELETE | Replaced by `CaseHero.tsx` |
| `components/agency/CaseStudySlot.tsx` | DELETE | Unused after `CaseHero.tsx` lands |
| `components/agency/CaseHero.tsx` | NEW | Single-brand proof section (Scandinavian Poster) |
| `components/agency/ViewsCounter.tsx` | NEW | 30,000+ count-up |
| `components/agency/Mechanism.tsx` | DELETE | Replaced by `TheGauntlet.tsx` |
| `components/agency/TheSystem.tsx` | DELETE | Folded into `TheGauntlet.tsx` |
| `components/agency/ScrollVideo.tsx` | DELETE | No more scroll-video; Remotion piece is autoplay |
| `components/agency/TheGauntlet.tsx` | NEW | Named method, type-only treatment |
| `components/agency/PaidAdsLab.tsx` | DELETE | Best ideas folded into `TheGauntlet` Stage 03 |
| `components/agency/ContentEngine.tsx` | DELETE | Best ideas folded into `TheGauntlet` Stage 02 |
| `components/agency/PageLoadSpeed.tsx` | DELETE | PSI proof relocated into `CaseHero`; tools list killed |
| `components/agency/AISystems.tsx` | DELETE | "AI systems" register killed entirely |
| `components/agency/Pricing.tsx` | DELETE from landing | Move to `/agency/pricing` later (out of scope of this plan) |
| `components/agency/HowWePay.tsx` | DELETE | Compressed to a 3-line callout above ContactForm |
| `components/agency/CompetitorAdsQuiz.tsx` | DELETE | Folded into `LeadMagnets.tsx` row 1 |
| `components/agency/LoomOffer.tsx` | DELETE | Replaced by `LeadMagnets.tsx` |
| `components/agency/LeadMagnets.tsx` | NEW | 3-row magnet shelf |
| `components/agency/TheVaultTeaser.tsx` | NEW | Hub teaser |
| `components/agency/AboutTeaser.tsx` | NEW | Founder block |
| `components/agency/ContactForm.tsx` | NEW | On-page contact + scarcity |
| `components/agency/FAQ.tsx` | EDIT | Strip 2 questions, edit 2, keep 2 |
| `components/agency/Footer.tsx` | EDIT | Rename `Software`, add Vault + About links |
| `components/agency/AllGreenBars.tsx` | NEW | All-green bar primitive |
| `components/agency/BarChart.tsx` | DELETE | Replaced by `AllGreenBars.tsx` |
| `components/agency/PlatformIcons.tsx` | KEEP | Still used by per-platform playbook routes |
| `components/agency/playbook/*` | KEEP | Out of scope of this plan |
| `app/agency/cases/[slug]/page.tsx` | KEEP | Out of scope (already scaffolded; PSI numbers should be flipped to 18→69 in a follow-up) |
| `app/agency/about/page.tsx` | NEW | Full essay route |
| `app/agency/about/layout.tsx` | NEW | Metadata |
| `app/agency/vault/page.tsx` | NEW | Vault index |
| `app/agency/vault/[slug]/page.tsx` | NEW | Vault per-piece |
| `app/agency/vault/layout.tsx` | NEW | Metadata |
| `pages/api/agency-contact.ts` | NEW | Contact form backend |
| `remotion/AgencyHero.tsx` | NEW | 6s typographic loop |
| `remotion/Root.tsx` | NEW or EDIT | Register `AgencyHero` composition |
| `package.json` | EDIT | Add `remotion` + `@remotion/player` deps if not present |
| `tailwind.config.js` | NO CHANGE | All tokens already present (`zilla-neon`, `zilla-surface`, `zilla-black`) |
| `public/agency/cases/scandinavian-poster/` | NEW dir | Operator drops `wordmark.svg`, `psi-before.png`, `psi-after.png` |
| `public/agency/about/founder.jpg` | NEW asset slot | Operator drops photo |

---

## §14 — Ship Order

Numbered. Execute in order. Each step is one PR-sized chunk.

1. **Add Remotion deps** — `package.json`, install `remotion` + `@remotion/player`. Create `remotion/Root.tsx` registry.
2. **Build `AllGreenBars.tsx`** — new bar primitive. Reference inside dev only first; nothing on page yet.
3. **Build `ViewsCounter.tsx`** — count-up anchor; mount nowhere yet.
4. **Build `CaseHero.tsx`** — using `AllGreenBars` for the PSI 18 → 69 block + Lighthouse rings. Mount nowhere yet.
5. **Build `TheGauntlet.tsx`** — type-only treatment; Mount nowhere yet.
6. **Build `LeadMagnets.tsx` + `TheVaultTeaser.tsx`** — list rows + teaser. Mount nowhere yet.
7. **Build `ContactForm.tsx` + `pages/api/agency-contact.ts`** — form + endpoint. Test end-to-end with curl.
8. **Build `AboutTeaser.tsx`** — landing teaser only.
9. **Build `remotion/AgencyHero.tsx` composition** — render to 6s 1600×700 mp4 once for visual sign-off, then mount via `@remotion/player`.
10. **REWRITE `Hero.tsx`** — drop Sankey, mount Remotion player.
11. **EDIT `Nav.tsx`** — strip Paid Ads dropdown.
12. **EDIT `FAQ.tsx`** — strip + edit questions per §3.9.
13. **EDIT `Footer.tsx`** — rename Software, add Vault + About links.
14. **REWRITE `app/agency/page.tsx`** — new flow order: `Nav → Hero → ViewsCounter → CaseHero → TheGauntlet → LeadMagnets → TheVaultTeaser → AboutTeaser → FAQ → ContactForm → Footer`.
15. **DELETE replaced files** in one cleanup commit: `Mechanism.tsx`, `TheSystem.tsx`, `ScrollVideo.tsx`, `PaidAdsLab.tsx`, `ContentEngine.tsx`, `PageLoadSpeed.tsx`, `AISystems.tsx`, `Pricing.tsx`, `HowWePay.tsx`, `CompetitorAdsQuiz.tsx`, `LoomOffer.tsx`, `CasesStrip.tsx`, `CaseStudySlot.tsx`, `BarChart.tsx`.
16. **Build `/agency/about` route + page** — full essay scaffolding.
17. **Build `/agency/vault` index + per-slug** — editorial list + per-piece shell.
18. **Verify** — `npx tsc --noEmit`, `npm run build`, walk page in dev. Confirm no orphaned imports.

---

## §15 — Open Operator Decisions

| # | Decision | Recommended default |
|---|----------|--------------------|
| 1 | Final algorithm name | **`THE GAUNTLET`** (alternates: BLACKBOX / COLDFRONT / NORTHSTAR-9 / OPERATOR ENGINE / THE REVENUE LATTICE) |
| 2 | Final hub name | **`THE VAULT`** (alternates: THE LAB / OPERATOR NOTES / FIELD NOTES / THE BRIEFING ROOM / THE PLAYBOOK) |
| 3 | About: route only, or section + route? | **Section teaser on landing + full route at `/agency/about`** |
| 4 | Contact form backend target | **Reuse existing `pages/api/leads.ts` flow with `source: 'agency_contact'`** (alt: dedicated Airtable base) |
| 5 | Defensibility of `30,000+` views claim | **Confirm cumulative client-creative views from meta-ads MCP `get_creative_performance` before launch.** Drop to `10,000+` if the real number is below 30k — never inflate. |
| 6 | Pricing on landing or moved to `/agency/pricing`? | **Moved off landing** — pricing is a call conversation. Build `/agency/pricing` later if needed. |

---

*End of plan.*
