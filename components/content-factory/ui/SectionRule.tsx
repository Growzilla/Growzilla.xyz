import type { ReactNode } from 'react'

export default function SectionRule({
  id,
  label,
  children,
  className = '',
  compact = false,
}: {
  id?: string
  label?: string
  children: ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <section id={id} className={`border-t border-white/[0.06] ${className}`}>
      <div
        className={`max-w-6xl mx-auto px-5 sm:px-8 ${
          compact ? 'py-20 sm:py-24' : 'py-24 sm:py-28 lg:py-32'
        }`}
      >
        {label && (
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zilla-neon/80 mb-6">
            {label}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}