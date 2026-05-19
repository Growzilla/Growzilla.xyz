## §0 — Page job

This page exists to convert two audiences in one canvas. **Tier-A Shopify operators (£60k–£500k/mo)** book a 20-minute call. **Smaller brands (£15–60k/mo)** drop their domain into the lead magnet, walk away with a competitor-ads PDF in under 4 minutes, and enter the email cadence. Success = ≥3% of cold sessions trigger one of those two events, and the founder block plus pricing strip kill 90% of "is this real / what does it cost" objections before they form.

---

## §1 — Nav

- file: `components/agency/Nav.tsx` (EDIT)
- job: Anchor the brand. Surface the only two destinations that close: pricing and the call. Stay invisible until the user scrolls past the hero, then drop a hairline.
- layout: full-width, sticky, h-16. `max-w-6xl mx-auto px-6`. Wordmark left, links centered (desktop ≥md), CTA right. Mobile: wordmark left, hamburger right; mobile sheet slides full-height.
- typography: Wordmark 18px display 600. Links 13px sans 500. CTA 13px sans 600.
- color usage: Background transparent → `bg-zilla-black/85 backdrop-blur-md` after `scrollY > 80`. Wordmark "Growzill" cream `#F2F0EA`, trailing "a" in `#00FF94`. Hairline `border-b border-white/[0.06]` after scroll.
- motion: Background fade 200ms ease-out on scroll past 80px. Hamburger sheet 240ms ease-out.
- copy slots:
  - Wordmark: `Growzill` + `a` (last letter neon)
  - Links: `Work` · `Method` · `Pricing` · `Knowledge Base` · `About`
  - Right CTA: `Book a 20-min call →`
- failure mode pre-empted: A "fade-up-on-load" nav with glow chrome reads SaaS. Solved by static mount + transparent baseline + zero shadow. **Forbidden:** `rounded-full` on the CTA. Use `rounded-md`.

---

## §2 — Hero (Founder-Anchored, Two-CTA)

- file: `components/agency/Hero.tsx` (EDIT — already V2; promote to V3)
- job: In 8 seconds, make the visitor feel: (a) this is a real person, not an agency front; (b) the offering is concrete; (c) there are two paths forward — the call, or a free deliverable. The lead magnet button must be visually equal to the call button, because the operator's #1 conversion goal is captured leads.
- layout: centered single-column, `max-w-4xl mx-auto px-6 pt-32 pb-24`. Status pill → eyebrow → H1 → sub → two CTAs side-by-side → founder anchor row → trust glyphs.
- typography:
  - Status pill: mono 11px uppercase tracking-[0.16em] cream/65
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H1: display 600, `text-[44px] sm:text-[64px] lg:text-[84px] leading-[1.0] tracking-[-0.025em]` cream/95
  - Sub: sans 400, `text-[17px] sm:text-[18px] leading-[1.6]` cream/60, max-w-2xl
  - Trust: mono 11px uppercase tracking-[0.14em] cream/45
- color usage: Single subtle radial bg `bg-zilla-neon/[0.05] blur-[180px]` behind H1. Accent words `revenue.` in `#00FF94`. Status dot `#00FF94`. Primary CTA `bg-zilla-neon text-black`. Secondary CTA outline only. ~6% surface accent.
- motion: stagger fade-up `y: 12 → 0`, 500ms ease-out, delays 0 / 0.06 / 0.12 / 0.20 / 0.30 / 0.42 / 0.55. No looping. No pulse.
- copy slots (LOCKED):
  - Status pill: `● 2 of 6 slots filled · May 2026`
  - Eyebrow: `SHOPIFY GROWTH OPERATORS`
  - **H1: `We turn attention into revenue.`** (`revenue.` neon)
  - Sub: `Paid acquisition, creative production, and conversion — run weekly by one team for six Shopify brands at a time.`
  - Primary CTA: `Book a 20-min call →`
  - Secondary CTA: `Get my competitors' ads (free) →` (anchors to `#leadmagnet`)
  - Founder anchor row (single horizontal line under CTAs, mono 12px cream/55, dot-separated):
    `Run by Albert Elmgart · Sweden · @ascendergrey · linkedin.com/in/albert-elmgart`
    Each segment is a real link target. Photo 32×32 `rounded-md` left of the line.
  - Trust glyph row (3 items, mono 11px):
    `● Shopify Partner` · `◆ Tier-A retainers only` · `✦ Operator-led`
- failure mode pre-empted: Generic agency hero with stock photo + "We Help Brands Grow." Solved by the founder anchor row — three lookable links on the page kill the "is this person real" objection without forcing a click to /about. **Forbidden:** any chart, any dashboard frame, any `rounded-full` CTA, any glow shadow.

---

## §3 — Logo Row — Brands We've Worked With

- file: `components/agency/LogoRow.tsx` (NEW)
- job: Burn three real client names into the visitor's head before they've decided whether to keep reading. This is the social-proof anchor.
- layout: full-width strip, `py-12`, hairline-y. Six logo slots, equally spaced, single row on ≥md, two rows on mobile. `max-w-6xl mx-auto px-6`.
- typography: Mono eyebrow centered above the row, 11px uppercase tracking-[0.18em] cream/45.
- color usage: Logos render as inline SVG, `fill: rgba(242,240,234,0.55)` default, `fill: #F2F0EA` on hover. Zero color logos. Zero gradients.
- motion: Logos fade-in `opacity 0 → 0.55` on view, 600ms ease-out, no stagger. On hover: opacity 1, 150ms.
- copy slots:
  - Eyebrow: `WORK SHIPPED — 2024–2026`
  - Logos: `Scandinavian Poster` · `Casedus` · `Glow Nordic` · `StreetLayer` · `Nordic Laptops` · `[OPERATOR-FILL — 6th]`
- failure mode pre-empted: A row of 12 logos none of which are recognizable reads desperate. Six max, all real, marked `[OPERATOR-FILL]` if not earned. **Never invent a client.**

---

## §4 — ICP Mirror — "Are you this brand?"

- file: `components/agency/ICPMirror.tsx` (NEW)
- job: Make the visitor say "that's me" inside 3 seconds, OR self-disqualify and bounce. Both are wins. Wrong-fit leads cost the operator hours.
- layout: two-column on `≥md`, single on mobile. `py-24 max-w-5xl mx-auto px-6`. Left column = headline + sub. Right column = ICP checklist + disqualifier strip.
- typography:
  - H2: display 600, 40px–56px tracking -0.025em cream/95
  - ICP bullet text: 17px sans 500 cream/85, with a 16px `✓` glyph in `#3ECF8E` left of each
  - Disqualifier strip: mono 12px cream/45 leading-1.7
- color usage: Single accent on the `✓` glyphs. Disqualifier strip is fully muted.
- motion: List items stagger fade-up, `delay 0.1 + i × 0.06`, 500ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `WHO WE BUILD FOR`
  - H2: `Built for the Shopify operator who's already tried two agencies.`
  - Sub: `If three of these are true, we should talk. If two are true, the lead magnet below is enough for now.`
  - ICP bullets:
    - `✓ Doing £30k–£500k/mo on Shopify`
    - `✓ Running Meta ads — ROAS is flat or sliding`
    - `✓ Page speed is a known pain (or you've stopped checking)`
    - `✓ You've worked with one growth agency. They showed dashboards, not ship logs.`
  - Disqualifier strip (single block):
    `We don't work with: dropshippers · brands under £15k/mo · agencies reselling our work · stores outside Shopify · accounts with fewer than 30 active SKUs.`
- failure mode pre-empted: A "Who is this for" section with three vague archetypes. Solved by hard-numeric qualifiers + an honest disqualifier list. The disqualifier list is the trust play.

---

## §5 — Live Counter Strip — "Current Work, Loading"

- file: `components/agency/LiveCounters.tsx` (NEW)
- job: Show the agency in motion. Three big tabular-num counters that frame us as larger than we are — defensibly, with capture stamps.
- layout: full-width band, `py-20`, hairline-y. Three columns equal width on `≥md`, stacked mobile. `max-w-5xl mx-auto px-6`.
- typography:
  - Eyebrow above row: mono 11px uppercase tracking-[0.18em] `#3ECF8E`/80, centered
  - Counter number: display 600, `text-[56px] sm:text-[72px] lg:text-[88px]` tracking -0.03em cream/95 tabular-nums
  - Counter label: sans 500 14px cream/65
  - Capture caption: mono 11px cream/40
- color usage: All numbers cream. The unit suffix (`+`, `%`) in `#3ECF8E`. ~3% surface accent.
- motion: count-up 0 → target over 1.6s ease-out cubic, fires once on `useInView({ once: true, margin: '-80px' })`.
- copy slots (LOCKED — operator confirms numbers monthly):
  - Eyebrow: `LIVE · UPDATED WEEKLY`
  - Counter 1: number `[OPERATOR-FILL — count of ad creatives shipped]+` · label `Ad creatives shipped` · caption `since 2024 · captured [OPERATOR-FILL date]`
  - Counter 2: number `50,000+` · label `Views produced across client creative` · caption `Meta + TikTok · captured [OPERATOR-FILL date]`
  - Counter 3: number `[OPERATOR-FILL — count of theme audits / PSI tests run]` · label `Stores audited` · caption `since 2024 · captured [OPERATOR-FILL date]`
- failure mode pre-empted: Vanity numbers without provenance read fake. Every counter has a capture caption + month. **Honesty floor:** if a real number is below 100, render the real number. Never inflate. Number pulled from the meta-ads MCP `get_creative_performance` export, summed across active accounts.

---

## §6 — Lead Magnet — Competitor Ads PDF (PRIMARY CONVERSION GOAL)

- file: `components/agency/LeadMagnetForm.tsx` (NEW) + reuses existing `pages/api/adcreator/start.ts` flow
- job: Capture a qualified lead with the highest-value free deliverable on the page. This section is the operator's #1 conversion goal — it gets the most pixels, the most contrast, and a direct anchor link from the hero.
- layout: full-bleed dark band, `py-28`, hairline-y. `max-w-6xl mx-auto px-6`. Two-column on `≥md`, stacked mobile. Left = pitch. Right = inline form.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600, 40–56px tracking -0.025em cream/95
  - Pitch sub: 17px sans 500 cream/65 leading-1.6
  - Bullet list: 15px sans 500 cream/85, `◆` glyph in `#3ECF8E`
  - Form labels: mono 11px uppercase tracking-[0.16em] cream/55
  - Inputs: 14px sans 500 cream/95, `h-12 rounded-md bg-white/[0.04] border border-white/[0.10]`, focus border `#3ECF8E`/40
  - Submit button: 14px sans 600 black, `h-12 px-7 rounded-md bg-zilla-neon`
- color usage: Card background `#131316`, hairline border `rgba(255,255,255,0.06)`. Submit button neon. Focus ring neon. Otherwise grayscale.
- motion: Form field reveal stagger `delay 0.1 + i × 0.06`, 500ms ease-out. Submit button hover `translate-y: -1px`, 150ms. Success state: form replaced by 3-line confirmation card, fade-cross 300ms.
- copy slots (LOCKED):
  - Eyebrow: `FREE · NO SIGNUP WALL`
  - H2: `See every ad your top 3 competitors ran in the last 30 days.`
  - Pitch sub: `Drop your domain. Answer four questions. Walk away with a 5-page PDF: top hooks, top angles, top creators — plus your first five Meta ads, scripted from their winning angles.`
  - Bullets:
    - `◆ Every active ad from your top 3 competitors`
    - `◆ Hooks ranked by spend`
    - `◆ Five ad scripts you can hand to your editor tonight`
    - `◆ Delivered as a PDF + emailed to you in under 4 minutes`
  - Form fields (in order):
    1. `Your store URL` — text, accepts `.com` `.co` `.shop` `.store`. **No `.myshopify.com` field.** Placeholder: `e.g. yourstore.com`
    2. `Your name` — text. Placeholder: `Jane`
    3. `Your email` — email. Placeholder: `jane@yourstore.com`
    4. `Monthly revenue band` — chip selector, four options: `< £15k` / `£15–60k` / `£60–150k` / `£150k+`
    5. Honeypot field `website` — visually hidden, must be empty
  - Submit button: `Generate my report →`
  - Below button, mono 11px cream/45: `~4 minutes · No signup wall · Yours to keep`
  - Success state (3 lines, after submit):
    `Pulling competitor ads now.` /
    `You'll see them stream in on the next screen, then we email the PDF.` /
    `Want a free 30-min teardown of your store too? — Book the call →` (calendly link)
- backend: POST → existing `/api/adcreator/start` with `{ domain, name, email, revenueBand, source: 'agency_lead_magnet' }`. On 202, route to `/agency/adcreator/run/[jobId]`. The reveal page already exists; add a Calendly embed below the streamed results.
- failure mode pre-empted: Lead magnets that ask for too much, gate the deliverable, or feel spammy. Solved with: 4 fields max, instant delivery, no email-confirm wall, the value lives in the PDF (not a follow-up email). **Forbidden:** any `.myshopify.com` field, any reCAPTCHA, any phone field.

---

## §7 — The Offer — What You Get In The First 5 Days

- file: `components/agency/FirstFiveDays.tsx` (NEW)
- job: Compress the entire engagement into a 6-step ship log. Make the cadence feel inevitable. Speak to operators who've heard "we'll start with strategy" and want to see something deployed by Friday.
- layout: single column, `max-w-3xl mx-auto py-28 px-6`. Six rows. Each row: mono number on the left (24px), bold step name + dash + body on the right.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600, 40–56px cream/95
  - Step number: mono 24px tabular-nums `#3ECF8E`/85
  - Step name: sans 600 18px cream/95
  - Step body: 15px sans 500 cream/65 leading-1.65
- color usage: ~5% surface accent (just the step numbers + the closing-line accent word).
- motion: Each row fade-up `delay 0.1 + i × 0.08`, 500ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `THE FIRST 5 DAYS`
  - H2: `What you get the moment you sign.`
  - Step rows:
    - `01 · Tracking installed.` UTM short links, Meta CAPI, pixel verification on your live theme. Day 1.
    - `02 · Audit shipped.` Page speed, funnel leaks, theme bloat, checkout friction. Kill list arrives end of Day 2.
    - `03 · Five creatives produced.` Scripted from your competitors' winning angles. Edited. Ready to launch. Day 3–4.
    - `04 · v1 launches Day 5.` First signal collected, hooks scored, kills marked.
    - `05 · v2 launches Day 8.` Winners scaled, losers cut, new angles entered.
    - `06 · Weekly optimization, indefinitely.` Daily hook-rate review, weekly creative drop, monthly funnel rebuild.
  - Closing line (under last step): `We call it the day your ads generate predictable purchases at your target CAC. Then we hold the line.` (`hold the line.` accent.)
- failure mode pre-empted: A "process" section with vague timeline and consultant language. Solved by absolute date markers (Day 1, Day 2, Day 5, Day 8) and a deliverable per day.

---

## §8 — Pricing — Visible, Ballpark, Real

- file: `components/agency/PricingStrip.tsx` (NEW)
- job: Kill the "what does it cost" objection on the landing page. The operator demanded this be visible. Three real tiers, ballpark prices, owned-by-you guarantee.
- layout: three columns equal width on `≥md`, stacked mobile. `max-w-5xl mx-auto py-28 px-6`. Each column = 1px hairline-bordered card, `rounded-lg`, `p-7`. Recommended tier gets a single mono badge in the top-right corner.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600, 40–56px cream/95
  - Tier name: sans 600 18px cream/95
  - Tier price: display 600 36–44px cream/95 tabular-nums
  - Price suffix (`/mo`, `+ 10% of incremental`): mono 13px cream/55
  - Tier body: 14px sans 500 cream/65 leading-1.65
  - Recommended badge: mono 10px uppercase tracking-[0.16em] `#3ECF8E`/85
- color usage: Recommended tier gets a 1px `border-zilla-neon/40` instead of `border-white/[0.06]`. ~5% surface accent.
- motion: Cards stagger fade-up `delay 0.1 + i × 0.08`, 500ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `WHAT IT COSTS`
  - H2: `Three engagements. One operator team.`
  - **Tier 1 — Audit Only**
    - Price: `£1,500` · suffix `one-time`
    - Body: `Two-week store + ad audit. Walk away with the kill list and a 90-day plan. No retainer, no commitment.`
    - CTA: `Book the audit →` (outline button, rounded-md, h-11)
  - **Tier 2 — Growth Retainer** ← RECOMMENDED badge
    - Price: `£3,500` · suffix `/mo + 10% of incremental revenue`
    - Body: `Full operator team. Five-day spin-up. Weekly creative drop, daily hook-rate review, monthly funnel rebuild. 90-day minimum.`
    - CTA: `Book a 20-min call →` (neon button, rounded-md, h-11)
  - **Tier 3 — Performance Only**
    - Price: `£0` · suffix `/mo + 18% of incremental revenue`
    - Body: `For brands already running £200k+/mo. We earn when you earn. 90-day minimum, same operator team.`
    - CTA: `Apply for performance tier →` (outline button, rounded-md, h-11)
  - Footer line under the three tiers, mono 12px cream/55, centered:
    `You own everything we make. Ad accounts, audiences, theme code, creatives, copy. We never co-own. Ever.`
- failure mode pre-empted: "Contact us for pricing" reads as "we'll size you up." Solved by visible numbers + a clear ownership clause underneath.

---

## §9 — How It Works — Onboarding (Tactical, Not Fluffy)

- file: `components/agency/Onboarding.tsx` (NEW)
- job: Show how easy it is to start. Three things on the operator's end. No `.myshopify.com` URL field — collaborator invite only.
- layout: single column, `max-w-3xl mx-auto py-28 px-6`. Three rows. Each row: GIANT outline numeral on the left (display 96–140px, stroke 1px cream/[0.10], no fill), step content on the right.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600, 40–56px cream/95
  - Outline numeral: display 96–140px, `text-transparent`, `-webkit-text-stroke: 1px rgba(242,240,234,0.10)`
  - Step name: sans 600 22px cream/95
  - Step body: 15px sans 500 cream/65 leading-1.65
- color usage: ~3% surface accent (closing mono line only).
- motion: Each row fade-up `delay 0.1 + i × 0.10`, 600ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `ONBOARDING`
  - H2: `Three things on your end. That's it.`
  - Step 01 · `Add us as a Shopify collaborator.` Settings → Plan → Manage Permissions → invite `albert@growzilla.xyz`. We never need your password. We never log in as you.
  - Step 02 · `Grant Meta access.` Business Settings → Partners → assign your ad account, pixel, and page to RolloutFactory Inc. Takes 90 seconds. We work in your account, never ours.
  - Step 03 · `Send us the brief.` 15-minute Loom or a call. Tell us what's broken. We do the rest.
  - Closing mono line: `First test running by Day 5. Always.`
- failure mode pre-empted: Asking for a Shopify URL up front feels like "we want your store to add ourselves." Solved by collaborator-invite framing + explicit "we never log in as you."

---

## §10 — Comparison Tape — Other Agencies vs. Us

- file: `components/agency/ComparisonTape.tsx` (NEW)
- job: The single highest-trust pattern on this page. Specific enough that a competing agency would feel called out. The struck-through left column is the trust play.
- layout: two columns, equal width, `max-w-5xl mx-auto py-28 px-6`. Five rows. Each row: hairline-y, `py-5`. Left column = struck-through cream/40. Right column = check + cream/85.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600, 40–56px cream/95
  - Column header (top of each column, sticky-style): mono 11px uppercase tracking-[0.18em] cream/45 left, `#3ECF8E`/85 right
  - Row text: 15px sans 500
  - Glyphs: `✗` cream/40 left, `✓` `#3ECF8E` right, both 14px
- color usage: ~6% surface accent (right-column glyphs + right-column header).
- motion: Rows stagger fade-up `delay 0.1 + i × 0.06`, 500ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `WHY GROWZILLA`
  - H2: `We're not a vendor. We operate.`
  - Column headers: `OTHER AGENCIES` / `GROWZILLA`
  - Rows:
    | OTHER AGENCIES | GROWZILLA |
    |---|---|
    | ~~Hand off to juniors after the pitch~~ | Same operator runs your account week to week. |
    | ~~Show ROAS dashboards. Never ship a theme fix.~~ | We deploy to your live theme. Friday by Friday. |
    | ~~Six-month contracts. Vague pricing.~~ | 90-day minimum. Pricing visible on this page. Cancel any cycle after. |
    | ~~Thirty retainers. You get thirty minutes.~~ | Six brands at a time. We choose. |
    | ~~Hide the playbook.~~ | Knowledge base is public. Read everything we know — free. |
  - Closing line below the table, centered, mono 12px cream/55:
    `Most agencies hand you a deck and disappear. We see it differently.`
- failure mode pre-empted: Generic "us vs them" copy. Solved by row #4 ("six brands at a time, we choose") signaling scarcity, and row #5 (public knowledge base) signaling confidence.

---

## §11 — Case Study — Scandinavian Poster

- file: `components/agency/CaseHero.tsx` (DONE — already V2-built. Verify capture stamp, mount.)
- job: One brand, big section, real captured numbers. Earns the rest of the page.
- layout: full-bleed dark band, `py-32 max-w-6xl mx-auto px-6`. Two-column on `≥md`. Left = wordmark + meta + 3 paragraphs of editorial body. Right = AllGreenBars `PSI 18 → 69` + 4 Lighthouse rings.
- typography: per existing `CaseHero.tsx`. H2 display 600 60–80px tracking -0.025em cream/95.
- color usage: ~9% surface accent (most of any section — earned by being the proof).
- motion: per existing component. Bars draw 900ms ease-out, rings stroke-dasharray reveal 900ms.
- copy slots (LOCKED):
  - Eyebrow: `◆ CASE · 01 · 2026`
  - Headline: `Scandinavian Poster.`
  - Meta line: `Custom posters · Sweden · 90 days, sessions 25–39`
  - Body paragraph: `Same Shopify theme. Same product catalog. We rebuilt the critical path — fonts, render-blocking JS, hero images, the load-time floor — over 90 days. Mobile Lighthouse moved 18 → 69.`
  - Capture stamp: `Captured May 5 2026 · Moto G Power · slow 4G · headless Chromium 146`
  - CTA: `Read the full case →` to `/agency/cases/scandinavian-poster`
- failure mode pre-empted: A grid of placeholder case tiles. Solved by giving the entire section to one real brand with one captured screenshot pair.

---

## §12 — Knowledge Base Teaser — "Fixes to most of your problems"

- file: `components/agency/KnowledgeBaseTeaser.tsx` (NEW; replaces `TheVaultTeaser.tsx`)
- job: Tease the hub. The operator named this section. Frame the writing as "fixes" — practical, deliverable, free.
- layout: compact band, `py-20 max-w-3xl mx-auto px-6`, hairline-y, centered.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] cream/45
  - H2: display 600 32–40px tracking -0.02em cream/95
  - Body: 16px sans 500 cream/65
  - Recent-post lines: mono 13px cream/55, hover cream/85
- color usage: Single neon arrow on the CTA + recent-post arrows. ~3% surface.
- motion: Single fade-up reveal 600ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `KNOWLEDGE BASE`
  - H2: `Fixes to most of your problems. Free.`
  - Body: `Every audit checklist, every hook framework, every Shopify theme fix we've shipped — written up and published. We don't gate it. If you can run it yourself, run it.`
  - Three most-recent post titles (mono lines, with date stamps):
    - `[OPERATOR-FILL DATE] · [OPERATOR-FILL TITLE] →`
    - `[OPERATOR-FILL DATE] · [OPERATOR-FILL TITLE] →`
    - `[OPERATOR-FILL DATE] · [OPERATOR-FILL TITLE] →`
  - Hub CTA: `Open the knowledge base →` to `/agency/vault`
- failure mode pre-empted: A "Resources" tab with three blog teasers. Solved by the framing word "fixes" + ungated promise + visible recency dates.

---

## §13 — Founder Block — Verifiable, Lookable

- file: `components/agency/FounderBlock.tsx` (NEW)
- job: The trust anchor of the page. Three lookable links the visitor can click to verify the operator is a real human running a real US-incorporated company.
- layout: centered, `max-w-2xl mx-auto py-28 px-6`. Founder photo top (1:1, 96×96, `rounded-md` not `rounded-full`), 2 paragraphs of first-person voice, signature block, 3 lookable inline links.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600 32–40px cream/95
  - Body: 17px sans 500 cream/75 leading-1.75 (slightly heavier than other body — this is a person speaking)
  - Signature: italic 16px serif (Source Serif 4) cream/85
  - Lookable links: mono 12px cream/55, underlined on hover
- color usage: ~3% surface accent (eyebrow only).
- motion: Photo + body stagger fade-up `delay 0 / 0.06 / 0.12`, 600ms ease-out.
- copy slots (LOCKED):
  - Eyebrow: `WHO YOU TALK TO`
  - H2: `One operator. Six brands.`
  - Body paragraph 1:
    `I'm Albert. I've shipped Shopify growth work since 2024. I built Growzilla because every agency I worked with showed me ROAS but couldn't show me what each ad dollar actually did. Now I run six brands at a time with one operator team — and we ship to your live store every week.`
  - Body paragraph 2:
    `If you want proof I exist before you book a call: my X is @ascendergrey, my LinkedIn is below, my company is RolloutFactory Inc. (Delaware, EIN on file). I read every email myself.`
  - Signature: `— Albert Elmgart · Sweden`
  - Three lookable inline links (one row, mono dot-separated):
    `X: @ascendergrey · LinkedIn: linkedin.com/in/[OPERATOR-FILL] · Company: RolloutFactory Inc · Delaware Division of Corporations file [OPERATOR-FILL filing #]`
  - Single quiet line at the bottom of the block, mono 11px cream/35:
    `Operators interested in joining the work read the knowledge base.`
- failure mode pre-empted: A generic "About" card with a stock headshot. Solved by real photo (operator-supplied), real X handle, real LinkedIn URL, real Delaware filing reference. **The quiet bottom line is the only talent signal on the page** — no jobs, no listings, no careers tab.

---

## §14 — Final CTA — Confidence Stack

- file: `components/agency/FinalCTA.tsx` (NEW)
- job: One last fork. The call, or the lead magnet. Equal-weight CTAs.
- layout: full-width hairline-y band, `py-32 max-w-4xl mx-auto px-6`, centered.
- typography:
  - Eyebrow: mono 11px uppercase tracking-[0.22em] `#3ECF8E`/80
  - H2: display 600 56–80px tracking -0.025em cream/95, two-color
  - Sub: 17px sans 500 cream/65 max-w-xl mx-auto
  - Closing mono line: 12px cream/45
- color usage: Accent words `already happening.` in `#00FF94`. Primary CTA neon-filled. Secondary outline. ~7% surface accent.
- motion: H2 fade-up 600ms ease-out, CTAs fade-up `delay 0.18`, closing line fade `delay 0.32`.
- copy slots (LOCKED):
  - Eyebrow: `READY WHEN YOU ARE`
  - H2: `Your next quarter is already happening.` (`already happening.` in neon)
  - Sub: `Two slots open this quarter. Pick one path.`
  - Primary CTA: `Book a 20-min call →` (rounded-md, neon)
  - Secondary CTA: `Get the competitor PDF first →` (rounded-md, outline, anchors `#leadmagnet`)
  - Closing line: `I reply within 24 hours, weekdays. — Albert`
- failure mode pre-empted: A vague "Let's chat" closer. Solved by two-CTA fork that respects the visitor's readiness state, plus the founder name in the closing line.

---

## §15 — Footer — Minimal

- file: `components/agency/Footer.tsx` (EDIT)
- job: Wayfinding + legal. Nothing else.
- layout: full-width, `py-12`. Hairline top. `max-w-6xl mx-auto px-6`. Three columns on `≥md`, stacked mobile. Wordmark + tagline left · link columns center · email + socials right. Bottom strip below all columns, full-width.
- typography:
  - Wordmark: 18px display 600
  - Tagline: 13px sans 500 cream/55
  - Link columns: 13px sans 500 cream/65, `hover:cream/95`
  - Email link: mono 13px cream/65
  - Social icons: 16px monochrome cream/55
  - Bottom strip: mono 11px cream/35
- color usage: zero accent. Pure grayscale + cream.
- motion: none.
- copy slots (LOCKED):
  - Wordmark: `Growzill` + `a` (last letter neon)
  - Tagline: `Shopify growth operators · Six brands at a time.`
  - Link column 1 — `Work` / `Method` / `Pricing` / `Knowledge Base` / `About`
  - Link column 2 — `Cases` / `Competitor PDF` / `Audit Tier` / `Performance Tier`
  - Link column 3 — `Privacy` / `Terms` / `Cookies` / `RolloutFactory Inc · Delaware`
  - Right column: `albert@growzilla.xyz` · X icon `@ascendergrey` · LinkedIn icon
  - Bottom strip: `© 2026 RolloutFactory Inc · Delaware · Operating from Sweden`
- failure mode pre-empted: Newsletter signup + "Join 12,000 operators" lie. Killed both. **No email-list capture in the footer.** The lead magnet does that work.

---

## §16 — Component build order

| # | File | Action | Status | Est. work |
|---|---|---|---|---|
| 1 | `components/agency/Hero.tsx` | EDIT (V2 → V3 polish: confirm copy lock, founder anchor row, two-CTA) | ⚠ V2 LIVE — needs founder anchor row | 30 min |
| 2 | `components/agency/Nav.tsx` | EDIT (wordmark two-color, link order, sticky-on-scroll) | TODO | 30 min |
| 3 | `components/agency/LogoRow.tsx` | NEW | TODO | 45 min |
| 4 | `components/agency/ICPMirror.tsx` | NEW | TODO | 30 min |
| 5 | `components/agency/LiveCounters.tsx` | NEW | TODO | 45 min |
| 6 | `components/agency/LeadMagnetForm.tsx` | NEW (highest priority) | TODO | 90 min |
| 7 | `components/agency/FirstFiveDays.tsx` | NEW | TODO | 45 min |
| 8 | `components/agency/PricingStrip.tsx` | NEW | TODO | 45 min |
| 9 | `components/agency/Onboarding.tsx` | NEW | TODO | 30 min |
| 10 | `components/agency/ComparisonTape.tsx` | NEW | TODO | 30 min |
| 11 | `components/agency/CaseHero.tsx` | DONE (V2) — verify mounts | ✅ DONE | — |
| 12 | `components/agency/KnowledgeBaseTeaser.tsx` | NEW (replaces `TheVaultTeaser.tsx`) | TODO | 20 min |
| 13 | `components/agency/FounderBlock.tsx` | NEW | TODO | 30 min |
| 14 | `components/agency/FinalCTA.tsx` | NEW | TODO | 20 min |
| 15 | `components/agency/Footer.tsx` | EDIT | TODO | 20 min |
| 16 | `components/agency/AllGreenBars.tsx` | DONE (V2) | ✅ DONE | — |
| 17 | `components/agency/BarChart.tsx` | DONE (V2 — all-green fix) | ✅ DONE | — |
| 18 | `app/agency/page.tsx` | REWRITE (mount V3 flow per §0–§15) | TODO | 20 min |
| 19 | `pages/api/agency-contact.ts` | NEW (lead-magnet relay → existing adcreator/start) | TODO | 30 min |
| 20 | Cleanup commit — DELETE replaced components | DELETE | TODO | 10 min |
| 21 | `npx tsc --noEmit` + `npm run build` | VERIFY | TODO | 10 min |
| 22 | `/agency` → `/` swap (Phase 2, after 1 week of click data) | DEFERRED | DEFERRED | 60 min |

**Total active work: ~9 hours across 2–3 sessions.**

---

## §17 — File-level diff table

| File | Action | One-line reason |
|---|---|---|
| `components/agency/Nav.tsx` | EDIT | Wordmark two-color, simplified links, sticky-on-scroll hairline |
| `components/agency/Hero.tsx` | EDIT (V2 already) | Add founder anchor row, confirm two-CTA, lock V3 copy |
| `components/agency/LogoRow.tsx` | NEW | Six real client logos in greyscale-on-hover |
| `components/agency/ICPMirror.tsx` | NEW | "Are you this brand?" qualifier + hard disqualifier list |
| `components/agency/LiveCounters.tsx` | NEW | Three captured-stamped vanity counters with provenance |
| `components/agency/LeadMagnetForm.tsx` | NEW | Primary conversion goal — competitor ads PDF capture |
| `components/agency/FirstFiveDays.tsx` | NEW | Six-step ship log with absolute date markers |
| `components/agency/PricingStrip.tsx` | NEW | Three visible price tiers + ownership clause |
| `components/agency/Onboarding.tsx` | NEW | "Three things on your end" — collaborator + Meta + brief |
| `components/agency/ComparisonTape.tsx` | NEW | Five-row strikethrough comparison vs other agencies |
| `components/agency/CaseHero.tsx` | DONE (V2) | Single case study — Scandinavian Poster PSI 18 → 69 |
| `components/agency/AllGreenBars.tsx` | DONE (V2) | Two-opacity neon bar primitive |
| `components/agency/BarChart.tsx` | DONE (V2 — all-green fix shipped) | Removed gray bars; legacy callers inherit all-green |
| `components/agency/KnowledgeBaseTeaser.tsx` | NEW (replaces `TheVaultTeaser.tsx`) | "Fixes to most of your problems" framing |
| `components/agency/FounderBlock.tsx` | NEW | Real founder photo + 3 lookable verification links |
| `components/agency/FinalCTA.tsx` | NEW | Two-CTA fork — call or lead magnet |
| `components/agency/Footer.tsx` | EDIT | Minimal three-column wayfinding, no newsletter |
| `components/agency/TheGrowzillaSystem.tsx` | KEEP (V2) | Optional — may fold into FirstFiveDays. Decide before mount. |
| `components/agency/ViewsCounter.tsx` | DEPRECATE | Replaced by LiveCounters (3 numbers, not 1) |
| `components/agency/LeadMagnets.tsx` | DEPRECATE | Replaced by LeadMagnetForm (single high-priority magnet, not three rows) |
| `components/agency/TheVaultTeaser.tsx` | DELETE after KnowledgeBaseTeaser ships | Renamed |
| `components/agency/CasesStrip.tsx` | DELETE | Replaced by single-case CaseHero |
| `components/agency/CaseStudySlot.tsx` | DELETE | Unused after CaseHero |
| `components/agency/Mechanism.tsx` | DELETE | Card-grid anti-pattern |
| `components/agency/TheSystem.tsx` | DELETE | Folded into FirstFiveDays |
| `components/agency/ScrollVideo.tsx` | DELETE | No more scroll-video |
| `components/agency/PaidAdsLab.tsx` | DELETE | Software-register copy |
| `components/agency/ContentEngine.tsx` | DELETE | Card-row anti-pattern |
| `components/agency/PageLoadSpeed.tsx` | DELETE | PSI proof relocates into CaseHero |
| `components/agency/AISystems.tsx` | DELETE | Banned register |
| `components/agency/Pricing.tsx` | DELETE | Replaced by PricingStrip |
| `components/agency/HowWePay.tsx` | DELETE | Folded into PricingStrip footer line |
| `components/agency/CompetitorAdsQuiz.tsx` | DELETE | Replaced by LeadMagnetForm |
| `components/agency/LoomOffer.tsx` | DELETE | Replaced by LeadMagnetForm |
| `app/agency/page.tsx` | REWRITE | New flow: Nav → Hero → LogoRow → ICPMirror → LiveCounters → LeadMagnetForm → FirstFiveDays → PricingStrip → Onboarding → ComparisonTape → CaseHero → KnowledgeBaseTeaser → FounderBlock → FinalCTA → Footer |
| `pages/api/agency-contact.ts` | NEW | Lead magnet form → existing `/api/adcreator/start` with `source: 'agency_lead_magnet'` |
| `public/agency/founder.jpg` | NEW asset slot | Real founder photo (operator drops) |
| `public/agency/logos/*.svg` | NEW asset dir | Six real client wordmarks (operator drops, monochrome SVG) |

---

## §18 — `[OPERATOR-FILL]` slots

The operator (Albert) must supply these values before the page goes live. **Never invent a value to fill a slot.** Group by section.

**Hero (§2):**
- LinkedIn URL slug — full URL or username (e.g., `linkedin.com/in/albert-elmgart`)
- Founder photo at `/public/agency/founder.jpg` — real, recent, well-lit, 1:1 crop, ≥256px

**Logo Row (§3):**
- Six client logo SVGs at `/public/agency/logos/` (monochrome, transparent bg). If only five exist, drop to five.
- Confirm each client has consented to being listed publicly. **Do not list anyone who hasn't.**

**Live Counters (§5):**
- Real count of ad creatives shipped since 2024 (pull from meta-ads MCP `get_creative_performance`)
- Real total views produced across client creative (Meta + TikTok exports)
- Real count of stores audited since 2024 (count of audit reports in `/dev/growzillaAssets/perf/runs/`)
- Capture date for each (e.g., `captured 2026-05-07`)

**Knowledge Base Teaser (§12):**
- Three most-recent post slugs + titles + dates
- (If only one or two exist, render only those — never invent a post)

**Founder Block (§13):**
- LinkedIn URL slug
- Delaware Division of Corporations filing number for RolloutFactory Inc
- Confirm `albert.elmgart@proton.me` vs `albert@growzilla.xyz` is the public address

**Pricing (§8):**
- Confirm `£3,500/mo + 10% incremental` is the actual current ballpark (operator may flex by ±20%)
- Confirm performance-tier `18% of incremental` is the offer, not `15%` or `20%`
- Confirm audit price `£1,500` (vs `£1,000` or `£2,500`)

**Capacity Strip / Hero Status Pill:**
- Real count of slots filled this quarter (e.g., `2 of 6`). Update monthly.
- Real quarter label (e.g., `May 2026`, `Q3 2026`)

---

## §19 — Verification checklist

Run through these 12 yes/no items before deploying. If any answer is N, fix and re-verify.

1. ☐ Founder's real first + last name + photo + 3 lookable links are above the fold (in Hero or Founder Block) — Y/N
2. ☐ Pricing is visible on the landing page with real numbers (Audit / Growth / Performance) — Y/N
3. ☐ The lead magnet section (§6) is the single most prominent conversion point on the page — equal or greater visual weight than the Hero — Y/N
4. ☐ Every chart bar is one accent color at two opacities — zero gray bars anywhere — Y/N
5. ☐ The string `.myshopify.com` appears nowhere in the codebase under `/components/agency/` or in the lead-magnet form fields — Y/N
6. ☐ Every metric in §5 + §11 has a real captured-at date or is marked `[OPERATOR-FILL]` — Y/N
7. ☐ The comparison table in §10 has 5 specific rows that would make a competitor agency feel called out — Y/N
8. ☐ The "we don't work with" disclosure exists in §4 and lists at least 4 disqualifiers — Y/N
9. ☐ The page reads like Supabase / Linear (hairlines, mono captions, restraint) and not like a 2018 ClickFunnels page — Y/N
10. ☐ Run `grep -rEi "(leverage|synergy|seamless|holistic|end-to-end|scalable|robust|transformative|innovative|cutting-edge|AI-powered|unleash|unlock|empower|revolutionize|streamline|next-level|game-changer|world-class|industry-leading|best-in-class)" components/agency/ app/agency/` — must return zero hits — Y/N
11. ☐ Zero `rounded-full` on any button or input under `/components/agency/` — Y/N
12. ☐ All three CTAs across the page (Hero primary, Lead Magnet, Pricing recommended-tier, Final CTA) point to either Calendly or `#leadmagnet` — no dead links — Y/N

When all 12 are Y, the page is ready to swap to `/`.
