'use client'

/**
 * Morsdag Timeline — 4 editorial rows. NOT cards. NOT numbered circles.
 * Per S43 agency-revamp lessons: no icon cards, no pastel boxes, no arrows.
 *
 * Layout: hairline-separated rows. Left = day label (display) + mono index.
 * Middle = title. Right = body. Last row uses rose hairline.
 */

import { motion } from 'framer-motion'

type Step = { day: string; index: string; title: string; body: string }

const STEPS: Step[] = [
  {
    day: 'Dag 1',
    index: '01',
    title: 'Erbjudande & vinkel',
    body: 'Vi väljer produkt, offer, bundle, rabatt och kampanjbudskap.',
  },
  {
    day: 'Dag 2',
    index: '02',
    title: 'Creatives & assets',
    body: 'Vi bygger annonser, copy, emails/SMS och landningssida.',
  },
  {
    day: 'Dag 3',
    index: '03',
    title: 'Launch',
    body: 'Meta ads, email/SMS och Shopify-kampanjen går live.',
  },
  {
    day: 'Fram till 31 maj',
    index: '04',
    title: 'Optimering',
    body: 'Vi driver retargeting, urgency och sista-chansen tryck.',
  },
]

export default function Timeline() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-zilla-black border-t border-white/8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
            04 · Tidslinje
          </span>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-white max-w-3xl">
            Från idé till live kampanj på 72 timmar.
          </h2>
        </motion.div>

        <div className="mt-14">
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1
            return (
              <motion.div
                key={step.index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                  delay: i * 0.08,
                }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-7 md:py-8 border-t ${
                  isLast ? 'border-morsdag-rose/30' : 'border-white/8'
                } ${
                  i === STEPS.length - 1
                    ? 'border-b border-b-white/8'
                    : ''
                }`}
              >
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="font-display text-xl text-morsdag-ivory font-medium">
                    {step.day}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-morsdag-rose">
                    {step.index}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-lg sm:text-xl text-white font-medium">
                    {step.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-white/70 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
