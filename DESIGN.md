# DESIGN.md — Growzilla Design Registry

> **Read this first before generating any UI.**
> This file is the authoritative entry point. Pick a theme. Apply its tokens. Don't drift.

---

## Project identity

- **Product**: Growzilla — Shopify creator attribution + Meta ads visualization
- **Brand color**: `#00FF94` (electric green, Shopify DNA + Godzilla atomic breath)
- **Voice**: Founder-direct, specific, restrained. No corporate "we." No buzzwords.
- **Stack**: Next.js 14, Tailwind CSS, framer-motion, GSAP, TypeScript

---

## Two themes (no third — strict)

| Theme | Use for | Vibe | File |
|---|---|---|---|
| **`zilla`** (default) | Product UI, dashboards, landing pages, agency funnel | Premium-dark, electric green on near-black, technical | [`growzillaAssets/design/DESIGN-zilla.md`](../../growzillaAssets/design/DESIGN-zilla.md) |
| **`claude`** | Editorial / long-form / document pages: case studies, deck, founder essays, blog | Premium-light, warm cream + terracotta + serif, editorial calm | [`growzillaAssets/design/DESIGN-claude.md`](../../growzillaAssets/design/DESIGN-claude.md) |

**Default = `zilla`.** Page must explicitly opt into `claude` via `<html data-theme="claude">` or section-scoped `<div data-theme="claude">`.

---

## Theme decision rules

Pick `claude` if **all three** are true:
1. Page is content-led (long-form reading), not data-led (dashboard / interactive product)
2. Page benefits from generous serif typography and editorial pacing
3. The dark Zilla canvas would feel cold or wrong for the message

Pick `zilla` for everything else, including:
- Anything that embeds product UI (Sankey, charts, dashboards)
- Conversion-focused funnel pages (`/`, `/agency`, `/quiz/*`, `/pricing`)
- Any view where the live product needs to be the visual anchor

When in doubt, ship in `zilla`.

---

## Typography (both themes)

| Family | Use | Weights |
|---|---|---|
| Satoshi | Sans body + UI (zilla default) | 400, 500, 600 |
| Clash Display | Display + headers (zilla) | 500, 600, 700 |
| Source Serif 4 | Editorial body (claude default) | 400, 500, 600 |
| Instrument Serif | Editorial display (claude) | 400 |
| JetBrains Mono | Numbers, code, captions, labels | 400, 500 |

Tailwind utilities: `font-sans`, `font-display`, `font-serif`, `font-editorial`, `font-mono`.

Detail rationale + fallback chains: [`growzillaAssets/design/typography.md`](../../growzillaAssets/design/typography.md)

---

## Spacing scale (both themes)

4px base. Use Tailwind defaults: `1=4px, 2=8px, 3=12px, 4=16px, 5=20px, 6=24px, 8=32px, 10=40px, 12=48px, 14=56px, 16=64px, 20=80px, 24=96px, 28=112px, 32=128px`.

Section vertical rhythm:
- Mobile: `py-16` (64px) → `py-20` (80px)
- Desktop: `py-24` (96px) → `py-32` (128px) → `py-36` (144px)

Card padding: `p-5` (20px) → `p-6` (24px) → `p-8` (32px) → `p-10` (40px) for editorial.

---

## Animation budget (both themes)

| Element | Duration | Easing |
|---|---|---|
| Hover micro-interactions | 150ms | ease-out |
| Section reveals | 200ms | ease-out |
| Modal / accordion | 200ms | ease-out |
| Page transitions | 250ms | ease-out |
| Scroll-driven scrub | duration of clip | linear |

**Zero**: parallax, auto-rotating carousels, glitter, particle effects, decorative pulse animations. Glow only on `zilla` and only on the primary CTA hover.

---

## Component conventions (both themes)

| Element | Convention |
|---|---|
| Button (primary) | `h-11` to `h-12`, `rounded-md`, semibold text, accent bg, hover `translate-y-[-1px] + brightness-105` |
| Button (secondary) | Same height, `bg-white/[0.05]` (zilla) or `bg-claude-pampas` (claude), border |
| Input | `h-12`, `rounded-md`, 1px border, focus border = accent at 50% alpha |
| Card | `rounded-2xl`, 1px border (no shadow on zilla, subtle warm shadow on claude) |
| Modal | `rounded-xl`, backdrop-blur on zilla, opaque cream on claude |
| Section break | `border-t border-white/[0.06]` (zilla) or `border-t border-claude-pampas` (claude) |

---

## Never do

- Use both themes on a single page (themes are page-scoped)
- Add a third theme. If a use case doesn't fit `zilla` or `claude`, write a memo first
- Mix `zilla.*` and `claude.*` color tokens in the same component
- Use pure white `#FFFFFF` for text in zilla theme (use 95% white instead)
- Use pure black `#000000` for text in claude theme (use `claude.ink #1f1e1c`)
- Hardcode hex colors when a token exists
- Add font weights outside the registered set
- Add motion that exceeds the animation budget
- Skip the `font-` Tailwind utility — always tag typography explicitly

---

## When generating new UI

1. Identify the page's job — content-led or data-led
2. Pick the theme via the rules above
3. Read the theme-specific DESIGN-{theme}.md for tokens + components
4. Use Tailwind utilities only — no inline `style={...}` for colors
5. Validate against the "Never do" list before committing
6. Run `npx tsc --noEmit` and fix any new errors

---

## Voice & tone (copy-side)

- Concrete > abstract ("Send your store URL" beats "Get in touch")
- Founder voice over corporate ("I'll send you a Loom" beats "Our team will reach out")
- One claim per sentence
- Numbers with units, never alone (`£190k attributed` not `190`)
- No exclamation marks in product copy
- No emoji in body copy. Mono-emoji acceptable in nav badges only

---

## File map

- This file: `/DESIGN.md` (entry point)
- Zilla theme spec: `/growzillaAssets/design/DESIGN-zilla.md`
- Claude theme spec: `/growzillaAssets/design/DESIGN-claude.md`
- Typography: `/growzillaAssets/design/typography.md`
- Claude theme CSS: `/styles/themes/claude.css`
- Tailwind tokens: `/tailwind.config.js`
- Existing design reference (legacy): `/dev/growzillaAssets/patterns/premium-ui-design-system.md`
