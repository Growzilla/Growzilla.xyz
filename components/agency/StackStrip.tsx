'use client'

/**
 * /agency StackStrip — quiet logo row of the stack we run on.
 *
 * No software UI. No glow. Two opacity states: grayscale 60% at rest,
 * full color on hover. Bundled SVGs only — no runtime brandfetch.
 *
 * SVG sources land at /public/agency/stack/<slug>.svg. While files are
 * pending, render neutral placeholder rectangles so layout reads now.
 */

import Image from 'next/image'

type StackEntry = {
  name: string
  slug: string
}

const STACK: StackEntry[] = [
  { name: 'Meta', slug: 'meta' },
  { name: 'Instagram', slug: 'instagram' },
  { name: 'TikTok', slug: 'tiktok' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Klaviyo', slug: 'klaviyo' },
  { name: 'Gelato', slug: 'gelato' },
  { name: 'Judge.me', slug: 'judgeme' },
]

/**
 * Toggle once SVGs land in /public/agency/stack/. While `false`,
 * placeholders render so the layout is correct on first paint.
 */
const ASSETS_READY = false

function BrandPlaceholder({ name }: { name: string }) {
  return (
    <div className="h-5 w-20 flex items-center justify-center bg-white/[0.04] border border-white/[0.06] rounded-sm">
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
        {name}
      </span>
    </div>
  )
}

export default function StackStrip() {
  return (
    <section
      aria-label="Our stack"
      className="relative w-full bg-zilla-black py-16"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            Our stack
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {STACK.map((entry) => (
            <div
              key={entry.slug}
              className="opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200 ease-out"
              title={entry.name}
            >
              {ASSETS_READY ? (
                <Image
                  src={`/agency/stack/${entry.slug}.svg`}
                  alt={entry.name}
                  width={80}
                  height={20}
                  className="h-5 w-auto"
                />
              ) : (
                <BrandPlaceholder name={entry.name} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
