# Content Factory Landing — Session Handoff

**Last updated:** 2026-07-05  
**Route:** `/` (`pages/index.tsx`)  
**Theme:** Zilla — `#0A0A0B` background, `#00FF94` neon accent  
**Status:** Built locally, **mostly uncommitted** on `main` (see Git section)

Use this doc to close the session and resume without re-discovering context.

---

## What this is

Growzilla's **Content Factory** brochure landing — conversion-first flow for paid traffic and partnership inquiries. Not the SaaS dashboard (`/demo`, `/whop`). Not the agency landing (`/agency`).

**Positioning:** "The content engine behind successful startups." One reel a day. Meta / Instagram / TikTok. Build the engine before the CMO hire.

**Conversion arc (desire → math → offer → proof → trust → inbound proof → apply):**

1. Hook desire (hero + vision question)
2. Compare CMO vs engine (math)
3. Secondary offer (audit) + pricing
4. Prove views + shares (merged proof block)
5. Meet the team (trust)
6. Inbound DM mosaic (expected daily output) — **before form**
7. Apply (LeadForm)

---

## Page section order

| # | Component | Anchor | Purpose |
|---|-----------|--------|---------|
| 1 | `Hero` | `#top` | "You built the product" + cycling outcomes |
| 2 | `MillionViews` | `#question` | Vision / desire — "What if your company went viral?" |
| 3 | `CmoComparison` | `#compare` | CMO-at-day-zero vs engine-first (The Math) |
| 4 | `AuditTeaser` | — | Free 30-min audit → `/enterprise/book-call` |
| 5 | `Offers` | `#offers` | Sprint / Pilot / Retainer pricing |
| 6 | `CombinedProof` | `#proof` | 200K reel + volume stat + share proof (merged) |
| 7 | `MeetTeamSection` | `#team` | Team + org wireframe |
| 8 | `Inbound` | `#inbound` | DM mosaic — expected daily output |
| 9 | `Close` | `#apply` | LeadForm only |

**Removed from page:** `Mechanism` (Option A — math + proof carry the story). `Proof` + `ShareMechanism` wrappers superseded by `CombinedProof`.

**Nav links today:** Vision (`#question`), Proof (`#proof`), Partner (`#offers`). CTA → `#apply`.  
**Optional next:** add `#inbound` to nav for paid-traffic scrollers.

---

## Approved copy (do not drift without operator sign-off)

### Hero
- H1 line 1: `You built the product`
- H1 line 2: `We help you get [cycling word]` — cycles: attention, customers, investors, leads, visibility, momentum, authority, growth (2.2s interval)
- Eyebrow: `Growzilla Content Factory`
- Subhead: `The content engine behind successful startups.`
- Primary CTA: `Partner with us` → `#apply?plan=pilot`
- Secondary CTA: `See the numbers` → `#proof`

### MillionViews (`#question`)
- `What if your company went viral?`
- `Who would see it? What would happen?`
- `Who's the one person that could change everything if they saw your content?`
- Outcome chips: The right customers / investors / opportunities

### Mechanism
- `How we get you results`
- Sub: system for startups, consistent views, compounding inbound, viral-designed content
- Channels: `Instagram · Facebook · TikTok · one reel a day`

### Combined proof (`#proof`)
- Headline: `200K views. 24 hours. One reel.`
- Client: Longsword Digital
- Volume stat: `We regularly produce 200+ reels per week across our clients using our high-volume system`
- Share bridge: `Built to be shared — not just liked`
- Share sub: `High share rates drive cold reach. These reels prove the system scales.`
- Badge (green): `2–4× higher share-to-like ratio than typical startup content`
- Aggregate footer: `890k+ views • 97k+ shares across the reels we manage`
- Image: `/content/larp-views.jpg`

| Reel | Views | Shares | In UI |
|------|-------|--------|-------|
| insights-01 | 306,000 | 44,000 | ✓ |
| insights-02 | 290,000 | 21,000 | ✓ |
| insights-03 | 120,000 | 19,000 | ✓ |
| insights-04 | 110,000 | 12,000 | ✗ dropped |

### Inbound
- Headline: `A regular Tuesday for our clients`
- Sub: `This is what a normal day looks like when the engine is running.`
- Body: `Website requests, access asks, partnership DMs — the kind of messages you expect when people actually see your content.`
- Footnote: `From accounts we manage · typical daily volume · not a spike`
- Bridge: `The engine is built to produce this consistently.`

### Meet the team
- Headline: `Meet the team` (largest headline in section)
- Trust copy: specialists across content, distribution, AI; ex-startup operators; systematized org at volume

**Org wireframe (grayscale — no neon except share section elsewhere):**

| Person | Role | Hub | Branches |
|--------|------|-----|----------|
| Albert Elmgart | Partner · Sweden | Partnership & delivery | Sales reps · Dev (📞✉️ icons) · Fulfillment · Content |
| Jayleen Ko | CMO · AI | Strategy & intelligence | Templates · Agents · Workflows (⚡) |

- Albert image: `/images/team/albert.png`
- Jayleen image: `/images/team/jayleen.jpeg`
- Jayleen socials: LinkedIn + Instagram (no TikTok yet)
- Albert LinkedIn: `https://linkedin.com/in/albert-elmgart`

### Close / Apply
- Headline: `Partner with us`
- Sub: review within 24 hours
- Plans via hash: `#apply?plan=sprint|pilot|retainer`
- Default plan: `pilot` ($1,500/mo)

### Offers
- Headline: `Want more views?` (neon on **views** — planned)
- Below pricing cards: Unsure CTA → quiz (planned: `/quiz/program`)
- Scroll nudge below Unsure: `See our results` + ↓ → `#proof` (keeps non-converters moving down-page)

| Plan | Price | Cadence |
|------|-------|---------|
| Ignition Sprint | $1,000 / 2 weeks | 1 reel/day |
| 3-Month Growth Pilot ★ | $1,500/mo | 1 reel/day |
| Growth Retainer | $2,000/mo | 1 reel/day+ |

### Audit teaser
- `Not ready to partner?`
- Free 30-minute content audit → `/enterprise/book-call`

### Head meta (still stale — optional fix)
- `<title>` still says `Attention Is All You Need`
- OG title says `Growzilla Content Factory` — align title/description if updating SEO

---

## File map

### Entry
- `pages/index.tsx` — section assembly + `getStaticProps` (Brandfetch logos/socials)

### Sections (`components/content-factory/sections/`)
| File | Notes |
|------|-------|
| `Hero.tsx` | Outcome cycle, LogoRail |
| `MillionViews.tsx` | Vision question |
| `CombinedProof.tsx` | 200K reel + volume stat + share proof (merged) |
| `Mechanism.tsx` | 3 benefit cards — **not on page** |
| `Proof.tsx` | Legacy — superseded by CombinedProof |
| `ShareMechanism.tsx` | Legacy wrapper — superseded by CombinedProof |
| `CmoComparison.tsx` | Path A vs Path B |
| `AuditTeaser.tsx` | Secondary offer |
| `Offers.tsx` | 3 pricing cards |
| `MeetTeamSection.tsx` | Thin wrapper → MeetTeam |
| `Inbound.tsx` | Thin wrapper → InboundProof |
| `Close.tsx` | LeadForm only (team/inbound extracted out) |

### UI (`components/content-factory/ui/`)
| File | Notes |
|------|-------|
| `HeroOutcomeCycle.tsx` | Cycling neon words |
| `LogoWheel.tsx` | Platform logo arc wheel (Brandfetch CDN dark symbols) |
| `LogoRail.tsx` | Legacy marquee — superseded by LogoWheel |
| `MeetTeam.tsx` | Team headline + org columns data |
| `OrgColumn.tsx` / `OrgBox.tsx` / `OrgConnector.tsx` / `PersonCard.tsx` | Org wireframe |
| `InboundProof.tsx` | Inbound copy + mosaic |
| `InboundMosaic.tsx` | 10+9 row grid, fixed height |
| `ShareMechanismProof.tsx` | 3 phones, green share numbers |
| `SectionRule.tsx` | Shared section chrome |
| `SocialStrip.tsx` | Footer socials |

### Data (`lib/content-factory/`)
| File | Notes |
|------|-------|
| `share-proof.ts` | Frame paths, stats, VOLUME_STAT, COMBINED_PROOF_COPY |
| `inbound-proof.ts` | INBOUND_COPY, mosaic tile order (dupes spaced) |
| `socials.ts` | Growzilla social URLs for footer |

### Other touched
- `components/LeadForm.tsx` — form at `#apply`
- `components/content-factory/Nav.tsx` / `Footer.tsx`
- `lib/brandfetch.ts` — logo fetching
- `styles/landing.css` — landing-specific styles (word-cycle animation, etc.)

### Deleted (do not resurrect)
- `ShareProofGrid.tsx`
- `DmProofFrame.tsx`
- `InboundLane.tsx`

---

## Assets

### Processed (used in UI)
```
public/larpdms/processed/mosaic/inbound-01..19.webp   # DM crops for mosaic
public/larpdms/processed/postshares/insights-01..03.webp  # share proof (480px crops)
public/larpdms/processed/postshares/insights-04.webp      # on disk, not in UI
public/images/team/jayleen.jpeg
/content/larp-views.jpg   # Proof section reel screenshot
```

### Source (raw, not directly in UI)
```
public/larpdms/Larp dms/*.png              # original DM screenshots
public/larpdms/Larp dms/postshares/*.png   # original insights screenshots
```

### Mosaic processing rules (applied in session)
- Batch all `Larp dms/` screenshots; **exclude ayushaf junk**
- **Blur North Indian story zones** on community-handoff tiles
- Crop to vertical strips for dense 2-row mosaic
- **Duplicate DM types spaced far apart** in grid — order lives in `inbound-proof.ts`
- Groups: Anmol website (01,03,17), Gokul access (02,04), Aryan access (06,18,19), North community (07,08,09)

### Mosaic layout
- Row 1: 10 tiles | Row 2: 9 tiles
- Heights: `120px` / `150px` / `180px` (sm/md)
- Full-width max `72rem`, `object-cover object-top scale-[1.06]`

---

## Design rules for this page

- **Landing = full Zilla energy** — neon OK on hero, share mechanism, CTAs. Agency `/agency` guardrails do NOT apply here.
- **Org + inbound authority zones = grayscale** — no `#00FF94` except Share Mechanism section (green on share counts + badge).
- No software UI mockups in proof sections — real screenshots only.
- Typography: Satoshi display + mono eyebrows. Restrained motion (`landing.css` word-cycle).
- Read `DESIGN.md` + `design-system.txt` before new UI.

---

## Git state (as of 2026-07-05)

**Last Content Factory commit:** `71ce7c1` — `feat(home): launch Content Factory landing with conversion-first flow`

**Everything after that is local uncommitted work**, including:
- CRO restructure (section order, extracted MeetTeam/Inbound/Close)
- Hero outcome cycle
- Share mechanism + inbound mosaic
- Team org wireframe
- Audit teaser
- All `public/larpdms/` processed assets
- `lib/content-factory/*`

**Modified (tracked):** `pages/index.tsx`, Hero, Mechanism, Proof, Nav, Footer, LogoRail, LeadForm, brandfetch, landing.css

**Untracked (new):** All section/ui files listed above, `lib/content-factory/`, `public/larpdms/`, `public/images/team/jayleen.jpeg`

**Do NOT `git add -A`** — sibling tooling dirs (`.claude/`, `.cmux/`, `.playwright-mcp/`) will pollute commits. Stage by path:

```bash
git add pages/index.tsx components/content-factory/ lib/content-factory/ \
  public/larpdms/processed/ public/images/team/jayleen.jpeg \
  components/LeadForm.tsx lib/brandfetch.ts styles/landing.css
```

---

## How to resume

### 1. Dev server
```bash
cd /home/god0fm0ney/dev/projects/Growzilla.xyz
npm run dev   # port 3000 (check for existing instance on 3001)
```

### 2. Typecheck before commit
```bash
npx tsc --noEmit
npm run build
```

### 3. Visual smoke (recommended before paid traffic)
Scroll full page at **1280px** and **390px**. Verify:
- Hero word cycle ticks
- `#apply?plan=pilot` pre-selects plan in Close
- Inbound mosaic loads all 19 tiles
- Share section shows 3 phones with correct share counts
- Audit link hits `/enterprise/book-call`
- LeadForm submits (POST `/api/lead-notify`)

### 4. Tell the agent
> "Resume Content Factory work. Read `contentfactory.md` first."

---

## Open items / not done

| Item | Priority | Notes |
|------|----------|-------|
| Commit + push to Vercel | High | Stage by path (see Git section) |
| Update `<Head>` title/description | Low | Still references old "Attention Is All You Need" / "0 to 1" |
| Nav `#inbound` link | Low | For paid-traffic proof jump |
| Jayleen TikTok | Low | Only LinkedIn + Instagram added |
| Full Playwright smoke post-reorder | Medium | Informal screenshots only so far |
| `insights-04` in UI | N/A | Intentionally dropped (4th reel) |
| `pages/godzilla.tsx` | Unknown | Untracked — separate experiment? |

---

## Session decisions (why things are the way they are)

1. **Inbound before form** — proof of DMs right before apply, not after.
2. **Team before inbound** — trust (who runs this) then expected output (what it produces daily).
3. **Math before offer** — CMO comparison frames the decision before pricing.
4. **Proof after offer** — merged 200K + share block follows pricing; volume stat anchors scale.
5. **Mechanism removed** — math + merged proof carry the how-it-works story without a separate section.
6. **Share section gets neon** — share counts are the hero metric; org/inbound stay authority-gray.
7. **3 share reels not 4** — insights-04 lowest views; top 3 cleaner composition.
8. **Dupes in mosaic spaced** — same DM type appearing adjacent reads as fake; tile order in `inbound-proof.ts` fixes this.
9. **Share stats corrected manually** — initial parse was wrong (257/55/42/29); operator gave real numbers (44k/21k/19k/12k).
10. **Inbound tone shift** — mundane "regular Tuesday" register; mosaic demoted (smaller height + opacity).

---

## Errors hit & fixes (don't repeat)

| Issue | Fix |
|-------|-----|
| Sharp composite with multiple overlays failed | Sequential composite per layer |
| Playwright not installed | `npx playwright install chromium` |
| Dev server port conflict | Check 3000 vs 3001 |
| Share ring overlays misaligned | Removed rings; caption stats under images |
| `grok plugin details neon-4a74a93b` fails | Use `grok plugin details neon` |

---

## Related routes (not this page)

- `/agency` — separate brand landing (editorial black+green, no software UI)
- `/enterprise/book-call` — audit CTA destination
- `/godzilla` — untracked experimental page
- `/content` — content-studio offer page (older work)

---

## Quick architecture

```
pages/index.tsx
  └── getStaticProps → brandfetch logos + socials
  └── Nav / Footer
  └── main sections (see order table)
        └── Close → LeadForm → POST /api/lead-notify
```

**LeadForm:** `source` prop tags lead origin; hash `?plan=` drives default plan in Close.

---

*End of handoff. Update this file when section order, copy, or assets change.*