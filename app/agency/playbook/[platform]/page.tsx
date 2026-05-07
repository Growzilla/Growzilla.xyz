'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { ALL_PLATFORMS, PLATFORM_LABELS, PlatformIcon, type Platform } from '@/components/agency/PlatformIcons'
import MetaPlaybook from '@/components/agency/playbook/MetaPlaybook'
import PlaybookStub from '@/components/agency/playbook/PlaybookStub'
import PlaybookCTA from '@/components/agency/playbook/PlaybookCTA'

type Params = { platform: string }

export default function PlaybookPage({ params }: { params: Promise<Params> }) {
  const { platform } = use(params)
  if (!ALL_PLATFORMS.includes(platform as Platform)) notFound()
  const p = platform as Platform

  return (
    <main
      data-theme="claude"
      className="min-h-screen bg-claude-cream text-claude-graphite"
    >
      <PlaybookHeader platform={p} />
      {p === 'meta' ? <MetaPlaybook /> : <PlaybookStub platform={p} />}
      <PlaybookCTA />
    </main>
  )
}

function PlaybookHeader({ platform }: { platform: Platform }) {
  return (
    <header className="sticky top-0 z-50 bg-claude-cream/85 backdrop-blur-md border-b border-claude-pampas">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <a
          href="/agency"
          className="inline-flex items-center gap-2 text-[13px] font-sans text-claude-stone hover:text-claude-ink transition-colors"
        >
          <span>←</span>
          <span>Back to Growzilla</span>
        </a>
        <div className="flex items-center gap-2">
          <PlatformIcon platform={platform} className="w-4 h-4 text-claude-stone" />
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-claude-stone">
            {PLATFORM_LABELS[platform]} playbook
          </span>
        </div>
      </div>
    </header>
  )
}
