'use client'

/**
 * /agency CreativesShelf — horizontal strip of 6 ad-creative thumbnails
 * shipped for Scandinavian Poster. Mobile uses scroll-snap, desktop
 * fits the row inline.
 *
 * Sources: /public/agency/creatives/scandinavianposter/01.jpg .. 06.jpg
 * Files won't exist yet — render neutral placeholders so the layout
 * reads now. Swap to <Image> once files land.
 */

import { motion } from 'framer-motion'

const ASSETS_READY = false

const THUMBS = [1, 2, 3, 4, 5, 6] as const

function ThumbPlaceholder({ idx }: { idx: number }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-mono text-[11px] text-white/30">
        {String(idx).padStart(2, '0')}
      </span>
    </div>
  )
}

export default function CreativesShelf() {
  return (
    <section
      aria-label="Recent creative shipped"
      className="relative bg-zilla-black"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon">
            ◆ CREATIVE
          </span>
          <h2 className="mt-3 text-[26px] md:text-[32px] font-medium leading-tight text-white/95">
            What we ship — every week.
          </h2>
          <p className="mt-3 text-[15px] text-white/65 max-w-xl leading-relaxed">
            A sample of recent creative shipped for our partners. New batch
            every week.
          </p>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 -mx-6 px-6 md:mx-0 md:px-0">
          {THUMBS.map((idx, i) => {
            const slug = String(idx).padStart(2, '0')
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
                className="aspect-[4/5] w-[180px] flex-shrink-0 rounded-md border border-white/[0.08] overflow-hidden bg-[#0F0F10] snap-start hover:border-white/[0.16] hover:scale-[1.02] transition-all duration-200 ease-out"
              >
                {ASSETS_READY ? (
                  <img
                    src={`/agency/creatives/scandinavianposter/${slug}.jpg`}
                    alt={`Creative ${slug}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ThumbPlaceholder idx={idx} />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
