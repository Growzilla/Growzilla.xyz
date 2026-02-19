# Brand Scroll (Logo Marquee) - Complete Replication Guide

This document explains exactly how the infinite-scrolling brand logo strip works at the top of the landing page, so you can replicate it on any site.

---

## Overview

The component is called `LogoMarquee`. It displays a horizontal strip of brand logos that scroll continuously from right to left in an infinite seamless loop. It sits inside a white bar with a "Trusted by innovative teams" label above the logos.

**Tech stack:** React (Next.js), Tailwind CSS, vanilla CSS `@keyframes` animation.

---

## How It Works (The Core Trick)

The seamless infinite scroll uses a classic CSS technique with 3 parts:

### 1. Duplicate the Logo Array

The logos array (12 items) is **duplicated** using `.concat(logos)` so there are 24 logo cards rendered in a single row. This means the first half and second half are identical.

### 2. CSS translateX(-50%) Animation

A CSS `@keyframes` animation moves the entire row from `translateX(0)` to `translateX(-50%)`. Since the content is doubled, moving it 50% to the left means you've scrolled exactly past the first set of logos. At that point, the second set (which is identical) is now in the exact starting position, and the animation loops back to `translateX(0)` seamlessly.

### 3. Overflow Hidden

The parent container has `overflow: hidden` so you only see the visible window of logos, not the full doubled row.

**Result:** A perfectly smooth, infinite, seamless scrolling strip with no JavaScript needed for the animation itself.

---

## Full Component Code

```tsx
import React from 'react';

const logos = [
  { src: '/images/posthog_logo.png', alt: 'PostHog' },
  { src: '/images/stripe_logo.png', alt: 'Stripe' },
  { src: '/images/supabase_logo_try.png', alt: 'Supabase' },
  { src: '/images/vercel_logo.png', alt: 'Vercel' },
  { src: '/images/shopify_logo.png', alt: 'Shopify' },
  { src: '/images/openai_logo.png', alt: 'OpenAI' },
  { src: '/images/microsoft_logo.png', alt: 'Microsoft' },
  { src: '/images/Amazon_Web_Services_Logo.png', alt: 'AWS' },
  { src: '/images/clerky_logo.png', alt: 'Clerky' },
  { src: '/images/woo_logo.webp', alt: 'WooCommerce' },
  { src: '/images/amazon_logo.png', alt: 'Amazon' },
  { src: '/images/deepseek_logo.png', alt: 'DeepSeek' },
];

export const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full py-6 sm:py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center text-xs uppercase tracking-wide text-gray-500 mb-3 sm:mb-4">
          Trusted by innovative teams
        </div>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-8 sm:gap-12 animate-[scroll_25.5s_linear_infinite] will-change-transform">
            {logos.concat(logos).map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center h-12 sm:h-14 px-3 sm:px-4 bg-white rounded-lg flex-shrink-0 shadow-sm relative overflow-hidden"
              >
                {/* White background layer to cover transparent areas */}
                <div className="absolute inset-0 bg-white rounded-lg"></div>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition relative z-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LogoMarquee;
```

---

## How Image Sizing Works (Making All Logos Look Consistent)

The logos are different dimensions and formats (PNG, WebP), but they all appear uniform because of these CSS rules working together:

| Class | What It Does |
|---|---|
| `h-10 sm:h-12` | Fixes the image height to 40px (48px on larger screens). This is the key constraint that normalizes all logos to the same visual height. |
| `w-auto` | Width adjusts automatically based on the image's aspect ratio. Wider logos get more horizontal space, taller logos get less. |
| `object-contain` | Ensures the entire logo fits within the height constraint without cropping or distortion. |
| `flex-shrink-0` | Prevents the flex container from squishing logos to fit. Each logo card keeps its natural width. |

**The container card** also helps:
- `h-12 sm:h-14` on the card gives a fixed-height wrapper (slightly taller than the image for padding).
- `px-3 sm:px-4` adds horizontal padding so logos don't touch the card edges.
- `flex items-center justify-center` centers the logo both vertically and horizontally within the card.

**White background overlay:** A `div` with `absolute inset-0 bg-white` sits behind each logo (below `z-10`) to ensure transparent PNG backgrounds render against white, not against whatever is behind the marquee.

---

## The CSS Animation Breakdown

```css
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

Applied via Tailwind's arbitrary animation syntax:

```
animate-[scroll_25.5s_linear_infinite]
```

This breaks down to:
- `scroll` - name of the keyframe
- `25.5s` - full cycle duration (adjustable; longer = slower scroll)
- `linear` - constant speed (no easing/acceleration)
- `infinite` - loops forever

`will-change-transform` tells the browser to GPU-accelerate the transform, making the animation buttery smooth.

---

## Image Files You Need to Copy

Copy the entire `public/images/` folder. The specific logo files used are:

```
public/images/
  posthog_logo.png
  stripe_logo.png
  supabase_logo_try.png
  vercel_logo.png
  shopify_logo.png
  openai_logo.png
  microsoft_logo.png
  Amazon_Web_Services_Logo.png
  clerky_logo.png
  woo_logo.webp
  amazon_logo.png
  deepseek_logo.png
```

**Important:** The `src` paths in the code reference `/images/filename.ext` which maps to the `public/images/` directory in Next.js. If you're using a different framework, adjust the paths to wherever your static assets are served from.

---

## How to Replicate on Another Site

### Step 1: Copy the image files
Copy all 12 logo files listed above into your project's public/static assets folder.

### Step 2: Add the component
Copy the full component code above. Update the `src` paths in the `logos` array to match your asset directory structure.

### Step 3: Tailwind CSS requirement
This component uses Tailwind CSS classes. If your target site uses Tailwind, it works as-is. If not, here are the equivalent plain CSS styles you would need:

```css
/* Container */
.marquee-wrapper {
  width: 100%;
  padding: 1.5rem 0; /* py-6 */
  background: white;
}

.marquee-inner {
  max-width: 72rem; /* max-w-6xl */
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
}

/* Label */
.marquee-label {
  text-align: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

/* Scroll track */
.marquee-track {
  position: relative;
  overflow: hidden;
}

/* Scrolling row */
.marquee-row {
  display: flex;
  align-items: center;
  gap: 2rem; /* gap-8 */
  animation: scroll 25.5s linear infinite;
  will-change: transform;
}

/* Logo card */
.logo-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem; /* h-12 */
  padding: 0 0.75rem;
  background: white;
  border-radius: 0.5rem;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

/* White background overlay */
.logo-card-bg {
  position: absolute;
  inset: 0;
  background: white;
  border-radius: 0.5rem;
}

/* Logo image */
.logo-img {
  height: 2.5rem; /* h-10 */
  width: auto;
  object-fit: contain;
  opacity: 0.7;
  transition: opacity 0.2s;
  position: relative;
  z-index: 10;
}

.logo-img:hover {
  opacity: 1;
}

/* The animation */
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### Step 4: Swap logos
Replace the logo entries in the `logos` array with your own brand logos. The sizing system (`h-10 w-auto object-contain`) will automatically normalize them regardless of their original dimensions.

### Step 5: Adjust speed
Change `25.5s` in the animation to control scroll speed. More logos = increase duration to keep similar speed per logo. Fewer logos = decrease duration.

---

## Quick Reference

| Setting | Value | How to Change |
|---|---|---|
| Scroll speed | `25.5s` | Change in `animate-[scroll_25.5s_...]` |
| Logo height | `h-10` / `h-12` on sm+ | Change the `h-` classes on `<img>` |
| Gap between logos | `gap-8` / `gap-12` on sm+ | Change the `gap-` class on the row |
| Logo opacity | `opacity-70` | Change the `opacity-` class on `<img>` |
| Hover opacity | `hover:opacity-100` | Change the `hover:opacity-` class |
| Card height | `h-12` / `h-14` on sm+ | Change the `h-` classes on the card div |
