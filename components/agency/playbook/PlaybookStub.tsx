'use client'

import { PLATFORM_LABELS, PLATFORM_TAGLINES, PlatformIcon, type Platform } from '@/components/agency/PlatformIcons'

export default function PlaybookStub({ platform }: { platform: Platform }) {
  return (
    <article className="max-w-2xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
      <div className="rounded-2xl bg-claude-pampas/60 border border-claude-pampas p-10 sm:p-14 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-claude-cream border border-claude-pampas mb-6">
          <PlatformIcon platform={platform} className="w-5 h-5 text-claude-stone" />
        </div>

        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-claude-terracotta mb-4">
          Article landing soon
        </div>

        <h1 className="font-serif text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.015em] text-claude-ink mb-5">
          The {PLATFORM_LABELS[platform]} playbook
          <br />
          is being written.
        </h1>

        <p className="font-editorial text-[17px] text-claude-graphite leading-[1.65] max-w-md mx-auto">
          {PLATFORM_TAGLINES[platform]}. Currently in client-only rotation.
          Public version drops once we&apos;ve published the next case.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/agency/playbook/meta"
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-claude-cream border border-claude-pampas text-[14px] font-sans font-medium text-claude-ink hover:bg-claude-fog transition-colors no-underline"
          >
            Read the Meta playbook →
          </a>
          <a
            href="/agency"
            className="inline-flex items-center justify-center gap-2 h-11 px-5 text-[14px] font-sans text-claude-stone hover:text-claude-ink transition-colors no-underline"
          >
            ← Back to Growzilla
          </a>
        </div>
      </div>
    </article>
  )
}
