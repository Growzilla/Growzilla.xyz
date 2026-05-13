'use client'

/**
 * Morsdag Problem — 3 pain cards. Number markers (01/02/03), no icons.
 * Hairline borders, rose hover. No shadows.
 */

import { motion } from 'framer-motion'

type Pain = { marker: string; title: string; body: string }

const PAINS: Pain[] = [
  {
    marker: '01',
    title: 'Ingen kampanjstruktur',
    body: 'Ett inlägg och en rabattkod räcker sällan när konkurrenterna trycker hårt.',
  },
  {
    marker: '02',
    title: 'För sent med creatives',
    body: 'Bra annonser, email och landningssida behöver paketeras snabbt.',
  },
  {
    marker: '03',
    title: 'För lite urgency',
    body: 'Utan deadline, shipping cutoff och retargeting försvinner köpen.',
  },
]

export default function Problem() {
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
            01 · Problemet
          </span>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-white max-w-3xl">
            De flesta brands väntar för länge.
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl text-lg leading-relaxed">
            Mors dag är en tydlig köpanledning. Kunder letar efter presenter,
            bundles, presentkort och sista-minuten-erbjudanden — men många
            butiker kommer igång för sent, postar något halvhjärtat och missar
            intäkten.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {PAINS.map((p, i) => (
            <motion.article
              key={p.marker}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: i * 0.08,
              }}
              className="group border border-white/8 bg-white/[0.02] rounded-lg p-6 transition-colors duration-150 hover:border-morsdag-rose/30"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-morsdag-rose">
                {p.marker}
              </span>
              <h3 className="mt-4 font-display text-xl text-white font-medium">
                {p.title}
              </h3>
              <p className="mt-3 text-white/65 leading-relaxed">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
