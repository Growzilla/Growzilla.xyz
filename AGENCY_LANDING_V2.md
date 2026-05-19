# Growzilla Landing — V2 Plan
> First-principles rebuild. Supersedes `AGENCY_REVAMP_PLAN.md`.
> **This page will become the main page (`/`) once it lands.** Build accordingly.

---

## §0 — What this page must do

Four jobs. In order of weight.

1. **Convince a Tier-A Shopify brand that we can ship work their in-house team can't.** They're the £150k+/mo operator who has tried two agencies and got slide decks. They need to feel craft + capacity + ownership in the first 8 seconds.
2. **Convince a small brand (£15-60k/mo) that there's a free entry point.** They can't afford the retainer yet. They need to see ungated tools + a path that respects them.
3. **Make us feel larger than we are — defensibly.** Real captured numbers, real session activity, real client names. No vanity. No stock photography. No "trusted by 500+ brands."
4. **Pull craft-led talent (closers, devs, operators) without saying "we're hiring."** They self-select by reading the work, the founder voice, the vault. No careers page. No job listings. The work is the recruiter.

**Anti-jobs (what this page does not do):**
- Pitch software. The Shopify app exists at a sub-route. The landing is the agency.
- Show dashboards, Sankeys, app screenshots. **No software UI anywhere.**
- List 12 services. We pick three pillars and own them.
- Hyperbolize. No "10×", "transformative", "AI-powered". No corporate "we".

---

## §1 — Reference — longsword.vercel.app

Captured 2026-05-07. Screenshots at `/longsword-{hero,services,system,process,comparison}.jpg`. Strong patterns to adapt (not copy):

| Pattern | Adapt as |
|---|---|
| Centered single-column hero, no chart | ✅ Already in `Hero.tsx` (V2) |
| Two-color H1 — body + accent words | ✅ Cream + neon green for accent words |
| Eyebrow paragraph above every h2 (mono uppercase tracked accent) | ✅ House style for whole page |
| 3 trust pills under hero | ✅ Already in `Hero.tsx` (V2) |
| Cinematic motion piece, NOT a chart | ✅ Replaced w/ ops ticker (real session events). Future: Remotion typographic loop. |
| Pill CTAs (rounded-full), gold filled + outlined | ✅ Neon filled + outlined |
| Featured + 4 add-on card grid | ❌ Skip. We have 3 pillars not 5 services. |
| Interactive node diagram ("Every piece works together") | ✅ §6 of this plan — adapted |
| Brick-equalizer bar chart with `+150%` callout above | ✅ §7 of this plan |
| Comparison table with strikethrough on competitor side | ✅ §8 of this plan |
| Numbered process w/ giant outlined numerals | ✅ §11 of this plan |
| Final-CTA: tiny eyebrow + 2-color H1 + 2 pill CTAs | ✅ §13 |
| Wordmark with 2-color treatment | ✅ Nav rewrite §2 |
| Type: DM Sans body + geometric display | ⏭ We keep Satoshi/Clash. Same restraint. |
| Color: cream `#F0ECE0` body, gold `#C9A030`, no pure white | ⚠ We keep neon green. **But shift body text from `#FFFFFF` → `#F2F0EA` warm cream.** Hot take: it makes the whole page feel premium for free. |

---

## §2 — Section flow (top to bottom)

```
Nav
Hero (with status pill, eyebrow, 2-color H1, sub, CTAs, trust pills, ops ticker)
SlotsIndicator (2 of 6 visualized — scarcity made visual)
CaseHero (Scandinavian Poster)
HowItConnects (node diagram, paid ↔ creative ↔ CRO ↔ retention)
TheGrowzillaSystem (3-stage method, type-only)
ResultsBars (3 brick-equalizer cards w/ +X% callouts, captioned)
ComparisonTape (other agencies vs us, strikethrough)
LeadMagnets (3 editorial rows)
KnowledgeBaseTeaser (was "TheVaultTeaser" — rename to "Knowledge Base")
FounderNote (one paragraph, signature, optional portrait slot)
EngagementShape (01/02/03 process, giant outlined numerals)
FAQ
FinalCTA
Footer
```

**14 sections, all earning their slot.**

---

## §3 — House style (locks)

| Token | Value | Where used |
|---|---|---|
| Body text | `#F2F0EA` (warm cream — NOT pure white) | All body, all headlines |
| Body bg | `#0A0A0B` | Page bg |
| Accent | `#00FF94` | ≤10% per section, only on: CTA fill, eyebrow, single H1 phrase, single metric, status dot, one CTA arrow |
| Eyebrow | `font-mono text-[11px] uppercase tracking-[0.18em-0.22em] text-zilla-neon/80` | Above every h2 |
| H1 / display | `font-display font-semibold tracking-[-0.025em]`, two-color (cream + accent words) | Hero + final CTA |
| H2 | `font-display font-semibold text-[40px-64px] tracking-[-0.025em]` | Section heads |
| Body p | `text-[16-18px] leading-[1.6-1.7] text-white/60` | All paragraphs |
| CTAs | `rounded-full h-12 px-6-7` — primary neon-filled, secondary outline | Every CTA |
| Hairlines | `border-white/[0.06]` | Section breaks, list rows, comparison table |
| Motion | 500-700ms `easeOut`, stagger `delay 0.1 + i × 0.06-0.12` | Everywhere |
| Forbidden | gradient-on-text · pulse · glitch · particle · shadow-glow on cards · gray bars · pure white · multi-accent | — |

**Single emoji rule:** ≤1 per section, functional anchor only. Allowed glyphs: `◆ ⚡ ✦ ● → ↳ ↓`.

---

## §4 — Nav

`components/agency/Nav.tsx` — EDIT.

- Wordmark: **`Growzilla`** with the trailing `a` in neon (`Growzill`+`a` two-color).
- Centered links (desktop): `Cases` · `The System` · `Knowledge Base` · `About`
- Right: `Book a call →` pill (neon)
- Mobile: hamburger → full-screen sheet

No mega-menu. No platform dropdown. Nothing that hints at SaaS.

---

## §5 — Hero (DONE — V2 already shipped)

`components/agency/Hero.tsx` — already rewritten 2026-05-07.

- Status pill: `● 2 of 6 slots filled · Q3 2026`
- Eyebrow: `OPERATORS · NOT A PLATFORM`
- H1: `We ship the work most agencies talk about.` (`ship the work` in neon)
- Sub: 2 sentences, operator-direct
- Primary CTA: `Book a 20-min call →` (neon pill, → Calendly)
- Secondary: `See the work ↓` (outlined pill)
- Trust pills: `● Shopify Partner · ◆ Tier-A retainers only · ✦ Operator-led`
- Ops ticker: 6 real session events from MANIFEST, marquee-scrolling

---

## §6 — SlotsIndicator (NEW)

`components/agency/SlotsIndicator.tsx`

- **Job:** make scarcity visible. Six small parking-lot squares — 2 filled (neon), 4 hollow (white/[0.06] outline). Compact band. Hairline border top + bottom.
- **Eyebrow:** `CAPACITY · MAY 2026`
- **Headline (small, display 28-36px):** `Six brands at a time. We don't take more.`
- **Sub mono:** `2 of 6 active · 4 slots open · next intake closes when full`
- **No animation** beyond fade-in on view. The restraint sells the seriousness.

---

## §7 — CaseHero (DONE — keep, mount)

`components/agency/CaseHero.tsx` — already built.

- Scandinavian Poster · PSI 18 → 69 · +283% delta · 4 Lighthouse rings
- AllGreenBars (two-opacity neon — already correct)
- Capture stamp: `May 5, 2026 · Moto G Power · slow 4G · headless Chromium 146`
- Link: `Read the full case →` to `/agency/cases/scandinavian-poster`

**Operator decisions before mount:**
- Confirm a11y / best / SEO real captured numbers (current defaults: 92 / 92 / 100)
- Optionally drop wordmark SVG at `/public/agency/cases/scandinavian-poster/wordmark.svg`

---

## §8 — HowItConnects (NEW)

`components/agency/HowItConnects.tsx`

- **Job:** frame the offering as a SYSTEM, not three services on a shelf. Longsword's strongest move.
- **Eyebrow:** `HOW IT WORKS TOGETHER`
- **H2:** `One operator team. Four loops.`
- **Visual:** Four labeled nodes connected by hairline arcs (PAID ↔ CREATIVE ↔ CRO ↔ RETENTION). Hover each to glow neon + reveal a one-line proof. Built as inline SVG, no library.
  - PAID — eyebrow `ACQUISITION` — proof: "30+ ad creatives shipped per week"
  - CREATIVE — eyebrow `PRODUCTION` — proof: "Hooks, scripts, edits — in-house"
  - CRO — eyebrow `CONVERSION` — proof: "Theme + checkout rebuild on Day 1"
  - RETENTION — eyebrow `LIFECYCLE` — proof: "Klaviyo flows, OTOs, audience ladder"
- **Forbidden:** card grid, icon tiles, generic "service" badges.

---

## §9 — TheGrowzillaSystem (DONE — keep, mount)

Already built. Type-only treatment, three stages, neon underline. Keep as-is.

---

## §10 — ResultsBars (NEW)

`components/agency/ResultsBars.tsx`

- **Job:** the longsword brick-equalizer move, adapted to neon. Three side-by-side blocks, each with:
  - Big `+X%` callout in neon display (72-96px)
  - One-line label (`Increase in mobile PSI`)
  - Brick-equalizer bar built from ~14 stacked rectangles (filled neon + hollow neon-at-0.08 above the value)
  - Mono caption below: `90 days · Scandinavian Poster · captured May 2026`
- **Three blocks (only real data):**
  1. `+283%` Mobile PSI · Scandinavian Poster · 90d
  2. `[OP-CONFIRM]` ROAS or CTR delta from Joanna's Phase 2 — drop in once Day 5 cohort reads
  3. `[OP-CONFIRM]` AOV or LTV delta from Jay (Scent & Co) once retainer numbers land
- **Important:** if a block has no real number yet, render `—` and a `[OP] pending` mono tag. **Never fake.**

---

## §11 — ComparisonTape (NEW)

`components/agency/ComparisonTape.tsx`

- **Job:** the highest-trust pattern from longsword. Two columns, four rows. Strikethrough on competitor side, check on ours.
- **Eyebrow:** `WHY GROWZILLA`
- **H2:** `We're not a vendor. We're an operator.`
- **Rows (locked):**
  | Other agencies | Growzilla |
  |---|---|
  | ✗ ~~Hand off the work to juniors after the pitch~~ | ✓ Same operators run your account week to week |
  | ✗ ~~Show ROAS dashboards, never ship a theme fix~~ | ✓ We deploy to your live theme. Friday by Friday. |
  | ✗ ~~6-month contracts, vague pricing~~ | ✓ 90-day minimum, base + 10% incremental. Stop any cycle. |
  | ✗ ~~Run 30 brands, give yours 30 minutes~~ | ✓ Six brands at a time. We pick. |
- **Closing line below table:** `Most agencies hand you a finished slide deck and disappear. We see it differently.`

---

## §12 — LeadMagnets (DONE — keep)

Already built. Three editorial rows. Mount as-is.

---

## §13 — KnowledgeBaseTeaser (RENAME of TheVaultTeaser)

`components/agency/KnowledgeBaseTeaser.tsx` (or rename existing `TheVaultTeaser.tsx`)

- Same compact band, but copy shifts to "knowledge base" framing per operator instruction.
- **Eyebrow:** `KNOWLEDGE BASE`
- **Headline:** `Everything we'd charge for. Free, while we have the bandwidth to write it.`
- **CTA:** `Open the knowledge base →` to `/agency/vault`

---

## §14 — FounderNote (NEW — replaces AboutTeaser plan)

`components/agency/FounderNote.tsx`

- **Job:** humanize. Bring the operator into the room. Speaks to BOTH clients (this person will run my account) AND talent (I want to work with this person).
- **Eyebrow:** `WHO YOU TALK TO`
- **Layout:** centered, max-w-2xl. Optional portrait slot above (1:1 aspect, 80×80px, rounded-full, hairline border). Two paragraphs of editorial body. Signature + location.
- **Copy (default, operator-overrideable):**
  > Most agency landing pages use stock photos and the word "we" 40 times. I'm Albert. I built Growzilla because every Shopify agency I worked with showed me ROAS but couldn't show me what each ad dollar actually did.
  >
  > I run six brands at a time with one team. We don't pitch growth — we ship it. If you've already heard a slide deck from someone else and you're tired, send me your store URL.
  >
  > — *Albert Elmgart · Sweden*
- **CTA:** small mono link `Read the full essay →` to `/agency/about`
- **Subtle talent signal:** in the footer of this section, a single mono line in 11px white/35: `Operators interested in joining the work read the knowledge base.` — no jobs page, no listings, but the door is visible.

---

## §15 — EngagementShape (NEW — replaces "process" thinking)

`components/agency/EngagementShape.tsx`

- **Job:** what's it like to actually work with us, week to week. Longsword's `01 / 02 / 03` move adapted.
- **Eyebrow:** `ENGAGEMENT SHAPE`
- **H2:** `What the first 90 days look like.`
- **Layout:** three large rows. Each row: GIANT outlined numeral on the left (display 240px+ tracking -0.04em, stroke 1px white/[0.10], no fill), step content on the right (eyebrow `WEEK 01-02` mono + h3 + sub-line + 2-3 sentences).
- **Steps:**
  1. **Week 01–02 — `Open the books.`** — *We learn your account before we touch it.* / We pull every campaign, every flow, every theme file. Map what's working and what's noise. End of week 2: a kill list and a calendar.
  2. **Week 03–06 — `Ship.`** — *Daily, not weekly.* / Theme rebuild on critical paths. 30+ ad creatives shipped. Five fresh hooks a week. Hook-rate review every morning.
  3. **Week 07–12 — `Compound.`** — *Two creatives carry the month.* / The cohort reads in week 4-6. We ride the winners, kill below 30% hold, and start the next angle batch.
- **Closing line below:** `90-day minimum. We never run a brand below it — the data is noise.`

---

## §16 — FAQ

EDIT existing `FAQ.tsx`. 4 questions. All operator-language.

1. **What do we own at the end?** → Your ad account, your pixel, your audiences, every creative, every theme fix. We never co-own anything.
2. **Whose ad account do you run on?** → Yours. You grant access, you keep ownership. We never run a brand from our own ad account.
3. **What's the floor and what's the ceiling?** → £15k/mo retainer minimum, base + 10% of incremental revenue above the trailing 90-day baseline. No agency fee. No setup fee.
4. **Can I cancel?** → After the 90-day minimum, any cycle. Below 90 days, the data is noise — we'd both be guessing.

---

## §17 — FinalCTA (NEW)

`components/agency/FinalCTA.tsx`

- **Eyebrow:** `READY WHEN YOU ARE`
- **H2 (two-color, longsword pattern):** `Your next quarter is *already happening.*` (`already happening.` in neon)
- **Sub:** `Two slots open this quarter. Send your store URL — we read every one within 24h.`
- **CTAs:** `Book a 20-min call →` (neon pill) · `Send me your store →` (outlined pill, mailto)

---

## §18 — Footer

EDIT existing. Minimal.
- Wordmark `Growzilla` (with `a` in neon)
- Copyright `© 2026 RolloutFactory Inc · Delaware · Sweden`
- Links: `Cases · System · Knowledge Base · About · Privacy`
- Email: `albert@growzilla.xyz`

---

## §19 — Build order (fresh, ignore prior plan's order)

1. ✅ DONE — `Hero.tsx` rewrite (Sankey killed)
2. ✅ DONE — `BarChart.tsx` all-green fix
3. **NEXT** — switch body text from pure white to warm cream (`#F2F0EA`) globally on `/agency`
4. Build `SlotsIndicator.tsx` — small, ~30 min
5. Build `HowItConnects.tsx` — node diagram, ~90 min
6. Build `ResultsBars.tsx` — brick equalizer, ~60 min (use real data only)
7. Build `ComparisonTape.tsx` — strikethrough table, ~30 min
8. Build `FounderNote.tsx` — ~20 min (operator copy)
9. Build `EngagementShape.tsx` — giant numerals + 3 rows, ~45 min
10. Build `FinalCTA.tsx` — ~20 min
11. EDIT `Nav.tsx` — wordmark two-color + simplified links
12. EDIT `FAQ.tsx` — 4 questions per §16
13. EDIT `Footer.tsx` — minimal
14. RENAME `TheVaultTeaser.tsx` → keep file but copy edits to "Knowledge Base"
15. REWRITE `app/agency/page.tsx` — new flow per §2
16. CLEANUP commit — delete old components: `Mechanism.tsx`, `TheSystem.tsx`, `ScrollVideo.tsx`, `PaidAdsLab.tsx`, `ContentEngine.tsx`, `PageLoadSpeed.tsx`, `AISystems.tsx`, `Pricing.tsx`, `HowWePay.tsx`, `CompetitorAdsQuiz.tsx`, `LoomOffer.tsx`, `CasesStrip.tsx`, `CaseStudySlot.tsx`
17. **PHASE 2 (separate session)** — make `/agency` the main page: move `app/agency/page.tsx` → `pages/index.tsx` (or new app router root), redirect old `/` to existing landing under `/saas` until ready

---

## §20 — Open operator decisions

1. **Body text shift to warm cream `#F2F0EA`** — recommend yes (free premium gain). Approve?
2. **`+X%` numbers for ResultsBars block 2 + 3** — needs real captured data from Joanna Phase 2 + Jay onboarding. Until those land, ship only block 1 (PSI).
3. **Founder portrait slot** — drop a photo at `/public/agency/founder.jpg`? Optional — section works without.
4. **Wordmark accent letter** — `Growzill[a]` with the `a` in neon (recommended) vs the whole word in neon vs no accent.
5. **Talent signal placement** — single mono line at the bottom of FounderNote (current plan), or as a subtle Footer link `Operate with us →`? Current plan keeps it editorial; Footer link is more discoverable.
6. **Phase 2 timing** — when to swap `/agency` → main `/`. Recommend: only after all V2 sections land + 1 week of click data.

---

*End of V2 plan. Source of truth from 2026-05-07 forward.*
