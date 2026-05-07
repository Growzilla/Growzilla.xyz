'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

type QA = { q: string; a: string }

const FAQS: QA[] = [
  {
    q: 'Do I need to install something?',
    a: 'Yes — a custom Growzilla Shopify app, on day 1. Takes 30 seconds. Attribution is forward-only, so we install before any spend or content goes live. Otherwise month 1 numbers are unprovable.',
  },
  {
    q: 'Whose ad account do you run on?',
    a: 'Yours. We request Partner access via Meta Business Manager. You own the account, the pixel, the audiences, and every creative we produce — forever. We never co-own anything.',
  },
  {
    q: 'What happens if you miss the target?',
    a: 'Month 2 base is free. You keep every asset already produced — creatives, audit, theme fixes deployed. You decide whether to continue at full price or walk. No questions, no clawback.',
  },
  {
    q: 'Can I cancel?',
    a: 'After the 90-day minimum, yes — 30-day notice. We don&apos;t lock anyone in beyond that window. The point of the minimum is to let attribution + creative iteration mature; below 90 days the data is just noise.',
  },
  {
    q: 'Is this exclusive in my category?',
    a: 'Yes. We take one client per niche per market. If your direct competitor signs first, we&apos;ll tell you on the call and refer you to a partner we trust who handles your category.',
  },
  {
    q: 'How fast do we start?',
    a: 'Reply to the proposal email with &ldquo;let&rsquo;s do it.&rdquo; Contract sent within 1 hour. Kickoff call within 3 business days. First creatives in market by end of week 2.',
  },
]

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <span className="inline-block text-[12px] font-mono tracking-[0.18em] uppercase text-zilla-neon/80 mb-5">
            FAQ
          </span>
          <h2 className="font-display text-[32px] sm:text-[44px] leading-[1.08] tracking-[-0.02em] font-semibold">
            Six questions we get most.
          </h2>
        </motion.div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {FAQS.map((qa, i) => (
            <motion.div
              key={qa.q}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.04 }}
            >
              <FAQItem
                qa={qa}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  qa,
  isOpen,
  onToggle,
}: {
  qa: QA
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-[16px] sm:text-[17px] font-display font-medium text-white/85 group-hover:text-white transition-colors">
          {qa.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-white/[0.1] flex items-center justify-center text-white/55 transition-transform duration-200 ${
            isOpen ? 'rotate-45 border-zilla-neon/50 text-zilla-neon' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-6 pr-12 text-[15px] text-white/60 leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: qa.a }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
