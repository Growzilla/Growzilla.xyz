'use client'

/**
 * Morsdag Fit — two columns: passar / passar inte.
 * Left column = rose pill header + filled rose square markers.
 * Right column = neutral pill header + hollow dash markers.
 * Items on hairline-separated rows.
 */

import { motion } from 'framer-motion'

const PASSAR: string[] = [
  'Driver en Shopify-butik i Sverige',
  'Redan har produkter som säljer',
  'Kan hantera fler ordrar inför Mors dag',
  'Har ett erbjudande, bundle, presentkort eller produkt som passar som present',
  'Vill få kampanjen live snabbt utan att bygga allt själva',
  'Har budget för både setup och annonsering',
]

const PASSAR_INTE: string[] = [
  'Precis har startat och inte har några bevis på efterfrågan',
  'Inte kan leverera produkter i tid',
  'Inte har budget för annonsering eller kampanjuppsättning',
  'Säljer produkter som inte lämpar sig som Mors dag-presenter',
  'Vill ha lång strategiworkshop istället för snabb execution',
]

export default function Fit() {
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
            06 · Fit
          </span>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-white">
            Passar detta er?
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-14">
          {/* Left: passar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          >
            <span className="inline-block bg-morsdag-rose/15 border border-morsdag-rose/25 text-morsdag-rose text-xs uppercase tracking-wider px-3 py-1 rounded-full font-mono">
              Detta passar om ni
            </span>
            <ul className="mt-6">
              {PASSAR.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-4 py-4 ${
                    i > 0 ? 'border-t border-white/5' : ''
                  }`}
                >
                  <span
                    aria-hidden
                    className="mt-[7px] h-2 w-2 bg-morsdag-rose flex-shrink-0"
                  />
                  <span className="text-white/85 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: passar inte */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.13 }}
          >
            <span className="inline-block bg-white/5 border border-white/10 text-white/60 text-xs uppercase tracking-wider px-3 py-1 rounded-full font-mono">
              Detta passar inte om ni
            </span>
            <ul className="mt-6">
              {PASSAR_INTE.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-4 py-4 ${
                    i > 0 ? 'border-t border-white/5' : ''
                  }`}
                >
                  <span
                    aria-hidden
                    className="mt-[10px] h-px w-3 bg-white/30 flex-shrink-0"
                  />
                  <span className="text-white/55 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
