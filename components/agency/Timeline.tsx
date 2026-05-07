'use client'

/**
 * /agency Timeline — 6 beats across time + a fork pull-quote.
 *
 * Mono uppercase markers, single line bodies, hairline rail between
 * markers (animates on first scroll-into-view). Fork at 60+ days
 * surfaces as a separate pull quote, no border, no icon.
 */

import { motion } from 'framer-motion'

type Beat = {
  marker: string
  body: string
}

const BEATS: Beat[] = [
  {
    marker: 'WEEK 1',
    body: 'First ad test live. We know the angle and where the site loses the click.',
  },
  {
    marker: 'DAY 14',
    body: 'Real signal on who your buyers are. The cohort starts to look like a person, not a guess.',
  },
  {
    marker: 'WEEK 3',
    body: 'We know the message and the product to push. The brief writes itself from here.',
  },
  {
    marker: 'WEEK 4',
    body: 'Strategy locked. Early conversions confirmed. The funnel is a system, not a hope.',
  },
  {
    marker: 'DAY 30–60',
    body: 'We scale what works. Budget moves to winners. Losers get killed without ceremony.',
  },
  {
    marker: 'DAY 60+',
    body: 'The engine is self-sufficient. $1 in, more than $1 out. Profits get reinvested. Creative production runs itself.',
  },
]

export default function Timeline() {
  return (
    <section
      id="timeline"
      aria-label="How we work across time"
      className="relative bg-zilla-black"
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon">
            ◆ HOW WE WORK
          </span>
          <h2 className="mt-3 text-[28px] md:text-[36px] font-medium leading-tight tracking-[-0.01em] text-white/95">
            Across time.
          </h2>
        </motion.div>

        {/* Beats — vertical on mobile, horizontal on md+ */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-4">
          {BEATS.map((beat, i) => (
            <div
              key={beat.marker}
              className="flex-1 flex md:flex-col items-start gap-4 md:gap-3 relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: i * 0.08,
                }}
                className="flex-shrink-0 md:flex-shrink md:w-full"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-zilla-neon">
                  {beat.marker}
                </div>
                <div className="hidden md:block mt-2 mb-3 h-px bg-white/10 w-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeOut',
                      delay: 0.2 + i * 0.08,
                    }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full w-full bg-white/15"
                  />
                </div>
                <p className="text-[14px] leading-relaxed text-white/85">
                  {beat.body}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Fork pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mt-16 max-w-2xl"
        >
          <p className="text-[16px] md:text-[17px] leading-relaxed text-white/80">
            <strong className="font-medium text-white/95">
              At 60+ days, your call.
            </strong>{' '}
            Walk away with a working system, the playbooks, and the skills to
            run it yourself. Or stay on as Maintainer and run it at the level
            only the serious do. We won&apos;t hold anyone hostage. We also
            won&apos;t pretend the deeper work doesn&apos;t matter.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
