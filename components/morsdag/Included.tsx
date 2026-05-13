'use client'

/**
 * Morsdag Included — 6-card grid with letter marks (A–F) instead of icons.
 * Anchor target for "Se vad som ingår" CTA via id="ingar".
 */

import { motion } from 'framer-motion'

type Item = { mark: string; title: string; body: string }

const ITEMS: Item[] = [
  {
    mark: 'A',
    title: 'Kampanjstrategi',
    body: 'Vi väljer vinkel, erbjudande, bundle, rabattkod eller presentkort baserat på vad som har störst chans att sälja.',
  },
  {
    mark: 'B',
    title: 'Creatives för Meta',
    body: 'Flera annonsvinklar för Instagram och Facebook: produkt, emotion, urgency och retargeting.',
  },
  {
    mark: 'C',
    title: 'Email + SMS',
    body: 'Launch, reminder och last-chance utskick till befintliga kunder.',
  },
  {
    mark: 'D',
    title: 'Shopify setup',
    body: 'Banner, kampanjsektion, rabattkod och enkel landningssida/produktsida optimerad för Mors dag.',
  },
  {
    mark: 'E',
    title: 'Meta annonsering',
    body: 'Kampanjstruktur, målgrupper, retargeting och optimering fram till Mors dag.',
  },
  {
    mark: 'F',
    title: 'Final push',
    body: 'Sista chansen-vinklar, deadline, shipping cutoff och urgency inför 31 maj.',
  },
]

export default function Included() {
  return (
    <section
      id="ingar"
      className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-zilla-black border-t border-white/8 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-morsdag-rose">
            03 · Det här ingår
          </span>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-white">
            Det här ingår
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.mark}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: i * 0.06,
              }}
              className="relative border border-white/8 bg-white/[0.02] rounded-lg p-6 transition-colors duration-150 hover:border-morsdag-rose/30"
            >
              <span className="absolute top-4 right-5 font-mono text-[24px] text-morsdag-rose/60 leading-none select-none">
                {item.mark}
              </span>
              <h3 className="font-display text-xl text-white font-medium pr-8">
                {item.title}
              </h3>
              <p className="mt-3 text-white/65 leading-relaxed">{item.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
