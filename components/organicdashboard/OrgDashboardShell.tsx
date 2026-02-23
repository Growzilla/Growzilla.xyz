'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MOCK_SM_DATA, MOCK_UTM_LINKS } from '@/data/mockSMData'
import type { Post, SMInsight, DateRange } from '@/types/smdashboard'

import DateRangeToggle from '@/components/smdashboard/DateRangeToggle'
import PlatformTabs from '@/components/smdashboard/PlatformTabs'
import CreatorSelector from '@/components/smdashboard/CreatorSelector'
import OrgView from '@/components/smdashboard/OrgView'
import CreatorView from '@/components/smdashboard/CreatorView'
import PostModal from '@/components/smdashboard/PostModal'
import TemplateModal from '@/components/smdashboard/TemplateModal'
import UTMGenerator from '@/components/smdashboard/UTMGenerator'
import SavedLinksSidebar from '@/components/smdashboard/SavedLinksSidebar'

function DashboardContent() {
  const searchParams = useSearchParams()
  const storeUrl = searchParams?.get('storeUrl') || ''
  const scrollTo = searchParams?.get('scrollTo') || null

  const [loading, setLoading] = useState(true)
  const [dataMode, setDataMode] = useState<'demo' | 'mystore'>('demo')
  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const [activePlatform, setActivePlatform] = useState('all')
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [templateInsight, setTemplateInsight] = useState<SMInsight | null>(null)
  const [showGenerator, setShowGenerator] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  // Scroll to calendly if param present
  useEffect(() => {
    if (!loading && scrollTo === 'calendly') {
      setTimeout(() => {
        document.getElementById('calendly')?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }, [loading, scrollTo])

  // Load Calendly widget script
  useEffect(() => {
    if (document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const data = MOCK_SM_DATA
  const selectedCreator = selectedCreatorId
    ? data.creators.find((c) => c.id === selectedCreatorId) ?? null
    : null

  const handlePostClick = useCallback((post: Post) => setSelectedPost(post), [])
  const handleViewPost = useCallback(
    (postId: string) => {
      const post = data.posts.find((p) => p.id === postId)
      if (post) setSelectedPost(post)
    },
    [data.posts]
  )
  const handleSelectCreator = useCallback((creatorId: string) => {
    setSelectedCreatorId(creatorId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  const handleCreateTemplate = useCallback((insight: SMInsight) => setTemplateInsight(insight), [])

  return (
    <div className="min-h-screen bg-zilla-black">
      {/* Background layers */}
      <div className="fixed inset-0 bg-grid-zilla opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-zilla-radial pointer-events-none" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-zilla-neon flex items-center justify-center">
              <span className="text-zilla-black font-bold text-xs">G</span>
            </div>
            <span className="font-display font-bold text-white text-sm tracking-wide group-hover:text-zilla-neon transition-colors">
              GROWZILLA
            </span>
          </Link>
          <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">
            &larr; Back to Growzilla
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Demo banner */}
            <div className="rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 px-4 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                {dataMode === 'demo' ? (
                  <>
                    <span className="text-zilla-neon font-medium">Demo Mode</span>{' '}
                    — Explore with sample data. Real dashboards use your Shopify data.
                  </>
                ) : (
                  <>
                    <span className="text-zilla-neon font-medium">Preview for {storeUrl || 'your store'}</span>{' '}
                    — Connect your store to see real attribution data.
                  </>
                )}
              </p>
            </div>

            {/* Demo / My Store toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-zilla-surface border border-white/[0.06] w-fit">
              {(['demo', 'mystore'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDataMode(mode)}
                  className={`relative px-4 py-2 text-xs font-mono rounded-md transition-all ${
                    dataMode === mode
                      ? 'bg-zilla-neon text-zilla-black shadow-lg font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode === 'demo' ? 'Demo Data' : 'My Store'}
                </button>
              ))}
            </div>

            {/* Title + Controls */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Creator Revenue Hub
                </h1>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <button
                    onClick={() => setShowGenerator(true)}
                    className="px-3 py-1.5 rounded-lg bg-zilla-neon text-zilla-black text-sm font-semibold hover:bg-zilla-glow transition-colors"
                  >
                    + Create Link
                  </button>
                  <button
                    onClick={() => setShowSidebar(true)}
                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-gray-300 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Saved Links
                  </button>
                  <CreatorSelector
                    creators={data.creators}
                    selectedCreatorId={selectedCreatorId}
                    onChange={setSelectedCreatorId}
                  />
                  <DateRangeToggle value={dateRange} onChange={setDateRange} />
                </div>
              </div>
              <PlatformTabs value={activePlatform} onChange={setActivePlatform} />
            </div>

            {/* View content */}
            {selectedCreator ? (
              <CreatorView
                creator={selectedCreator}
                data={data}
                activePlatform={activePlatform}
                onPostClick={handlePostClick}
                onCreateTemplate={handleCreateTemplate}
                onViewPost={handleViewPost}
              />
            ) : (
              <OrgView
                data={data}
                activePlatform={activePlatform}
                onPostClick={handlePostClick}
                onSelectCreator={handleSelectCreator}
                onCreateTemplate={handleCreateTemplate}
                onViewPost={handleViewPost}
              />
            )}

            {/* Calendly Section */}
            <section id="calendly" className="card-zilla overflow-hidden p-0 border-t border-zilla-neon/10">
              <div className="p-6 sm:p-8 text-center">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  Book Your Free Setup Call
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  15 minutes. We set it all up for you.
                </p>
              </div>
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/albert-elmgart/black-friday-ai-audit-unlock-hidden-conversions?background_color=111111&text_color=ffffff&primary_color=00ff94"
                style={{ minWidth: '280px', height: '600px' }}
              />
            </section>

            {/* $97 CTA Section */}
            <section className="py-20 px-4">
              <div className="max-w-2xl mx-auto text-center">
                <div className="p-8 sm:p-12 rounded-2xl border border-zilla-neon/10 bg-gradient-to-b from-zilla-neon/[0.04] to-transparent">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                    Ready to see what your creators actually bring in?
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Start today. We set it all up. Pay nothing until it works.
                  </p>
                  <Link
                    href="/checkout/en"
                    className="btn-zilla text-lg px-10 py-5 rounded-xl inline-block"
                  >
                    Start now — $97 first month
                  </Link>
                  <p className="text-xs text-gray-600 mt-4">
                    30-day money-back guarantee. Cancel anytime.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </main>

      {/* UTM Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowGenerator(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-lg rounded-2xl border border-white/10 bg-[#0A0A0B] p-6 shadow-2xl"
            >
              <UTMGenerator
                demo
                onLinkSaved={() => setShowGenerator(false)}
                onClose={() => setShowGenerator(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Saved Links Sidebar */}
      <SavedLinksSidebar
        open={showSidebar}
        onClose={() => setShowSidebar(false)}
        onCreateNew={() => {
          setShowSidebar(false)
          setShowGenerator(true)
        }}
        links={MOCK_UTM_LINKS}
        loading={false}
      />

      {/* Post Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      {/* Template Modal */}
      {templateInsight && (
        <TemplateModal insight={templateInsight} onClose={() => setTemplateInsight(null)} />
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zilla-neon flex items-center justify-center">
              <span className="text-zilla-black font-bold text-[8px]">G</span>
            </div>
            <span className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Growzilla</span>
          </div>
          <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  )
}

export default function OrgDashboardShell() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zilla-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-zilla-neon border-t-transparent animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
