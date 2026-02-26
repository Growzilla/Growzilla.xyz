'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { WhopCheckoutEmbed } from '@whop/checkout/react'

const PLAN_ID = 'plan_uLT1RiGQFS0Yv'

const benefits = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    text: 'Live-dashboard med int\u00e4kt per post & per creator',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
      </svg>
    ),
    text: 'Branded UTM-generator (10 sekunder)',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    text: 'Creators ser sina provisioner och optimerar sj\u00e4lva',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    text: 'Du f\u00e5r full kontroll utan att mikromanagera',
  },
]

const faqs = [
  {
    q: 'Vad h\u00e4nder om jag inte ser n\u00e5gon int\u00e4kt eller f\u00f6rb\u00e4ttring efter 30 dagar?',
    a: 'Du f\u00e5r alla pengarna tillbaka. Vi s\u00e4tter en baseline dag ett. Efter 30 dagar kollar vi exakt vad varje post och creator drog in. Om inget tydligt v\u00e4rde \u2014 full \u00e5terbetalning. Inga fr\u00e5gor. Noll risk.',
  },
  {
    q: 'Hur fungerar int\u00e4ktsspårningen egentligen?',
    a: 'Vi anv\u00e4nder bara dina egna UTM-l\u00e4nkar (skapade p\u00e5 10 sekunder) + Shopifys orderdata. Varje klick och k\u00f6p kopplas direkt till r\u00e4tt post eller creator. Mycket tydligare \u00e4n Google Analytics eller Meta f\u00f6r creators.',
  },
  {
    q: 'Hur sv\u00e5rt \u00e4r det att installera och komma ig\u00e5ng?',
    a: '12\u201318 minuter. Jag s\u00e4tter upp allt \u00e5t dig p\u00e5 ett 15-minuters samtal. Skicka bara din .myshopify.com-l\u00e4nk. Ingen kod, ingen teknik. De flesta \u00e4r live samma dag.',
  },
  {
    q: 'Kan jag avsluta n\u00e4r som helst?',
    a: 'Ja. Inget avtal. Avsluta direkt fr\u00e5n ditt Whop-konto. Inga avgifter, aldrig inl\u00e5st.',
  },
  {
    q: '\u00c4r mina data och min kundinformation s\u00e4ker?',
    a: '100% s\u00e4kert. Enbart l\u00e4s\u00e5tkomst via Shopifys officiella system. Vi ser aldrig betalningar eller l\u00f6senord. Allt krypterat. Ta bort appen sj\u00e4lv n\u00e4r som helst.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden transition-colors duration-300 hover:border-zilla-neon/20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-medium text-white text-[15px] leading-snug">{q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
            open ? 'bg-zilla-neon/10 border-zilla-neon/30 rotate-45' : ''
          }`}
        >
          <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-400 text-[15px] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSE() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zilla-black text-white">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/growzilla-kaiju.png"
                alt="Growzilla"
                width={56}
                height={56}
                className="h-12 w-12 object-contain"
                priority
              />
              <span className="font-display text-xl font-bold tracking-tight text-zilla-neon">
                GROWZILLA
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-6">
              <Link href="/checkout/en" className="text-sm text-gray-400 hover:text-white transition-colors">
                English
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-zilla-neon transition-colors"
              aria-label="V\u00e4xla meny"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          <div
            className={`sm:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-16 pb-4' : 'max-h-0'
            }`}
          >
            <Link href="/checkout/en" className="text-sm text-gray-400 hover:text-white transition-colors text-center block py-2">
              English
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ── Hero + Checkout Embed ── */}
        <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Copy */}
              <div className="text-center lg:text-left lg:pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/[0.07] border border-zilla-neon/20 mb-8">
                  <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
                  <span className="text-sm text-zilla-neon font-medium">F&#246;r Shopify-butiker med creators</span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                  Se exakt int&#228;kt per post{' '}
                  <span className="text-zilla-neon text-glow">&amp; creator</span>{' '}
                  p&#229; Shopify
                </h1>

                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-3">
                  Growzilla &#228;r en enkel Shopify-app som visar exakt hur mycket varje post och varje creator drar in i f&#246;rs&#228;ljning.
                </p>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                  Jag s&#228;tter upp allt &#229;t dig p&#229; 15 minuter. Betala ingenting f&#246;rr&#228;n du ser att det funkar.{' '}
                  <span className="text-white font-medium">30 dagars garanti.</span>
                </p>

                {/* Benefits list */}
                <div className="space-y-4 mb-8">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-lg bg-zilla-neon/10 border border-zilla-neon/20 flex items-center justify-center text-zilla-neon mt-0.5">
                        {b.icon}
                      </div>
                      <span className="text-[15px] text-gray-300 leading-snug pt-1">{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                    S&#228;ker betalning
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Avsluta n&#228;r som helst
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                    30 dagars &#229;terbetalning
                  </span>
                </div>
              </div>

              {/* Right: Whop Checkout Embed */}
              <div className="w-full">
                <div className="rounded-2xl border border-white/[0.08] bg-zilla-dark/80 backdrop-blur-sm overflow-hidden shadow-[0_0_60px_rgba(0,255,148,0.06)]">
                  <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Slutf&#246;r ditt k&#246;p</span>
                    <span className="text-xs text-zilla-neon font-mono bg-zilla-neon/10 px-2.5 py-1 rounded-full">997 kr/m&#229;n</span>
                  </div>
                  <div className="min-h-[480px]">
                    <WhopCheckoutEmbed
                      planId={PLAN_ID}
                      theme="dark"
                      returnUrl="https://growzilla.xyz/checkout/se?success=true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Social proof strip ── */}
        <section className="py-12 border-y border-white/[0.04]">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            <div>
              <p className="text-2xl font-bold text-white font-mono">15 min</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Uppstartsamtal</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-zilla-neon font-mono">0 kr</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Tills du ser resultat</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div>
              <p className="text-2xl font-bold text-white font-mono">30 dagar</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Pengarna-tillbaka-garanti</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 sm:py-28 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-14">
              Vanliga fr&#229;gor
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-20 sm:py-28 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-8 sm:p-12 rounded-2xl border border-zilla-neon/10 bg-gradient-to-b from-zilla-neon/[0.04] to-transparent">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                Redo att se vad dina creators faktiskt drar in?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                B&#246;rja idag. Jag s&#228;tter upp allt &#229;t dig. Betala ingenting f&#246;rr&#228;n det funkar.
              </p>
              <a
                href="#top"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="btn-zilla text-lg px-10 py-5 rounded-xl"
              >
                G&#229; med nu &mdash; 997 kr f&#246;rsta m&#229;naden
              </a>
              <p className="mt-5 text-sm text-gray-500">30 dagars pengarna-tillbaka-garanti. Avsluta n&#228;r som helst.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative py-16 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image src="/images/growzilla-kaiju.png" alt="Growzilla" width={48} height={48} className="h-12 w-12 object-contain" />
                <span className="font-display text-xl font-bold tracking-tight text-zilla-neon">GROWZILLA</span>
              </Link>
              <p className="mt-5 text-gray-500 text-sm leading-relaxed max-w-sm">
                Int&#228;ktsspårning f&#246;r Shopify-butiker som jobbar med creators. Se exakt vad varje post drar in.
              </p>
              <div className="mt-6">
                <a href="mailto:contact@growzilla.xyz" className="text-sm text-zilla-neon hover:text-zilla-acid transition-colors">contact@growzilla.xyz</a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-5">Navigera</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">Hem</Link></li>
                <li><Link href="/smdashboard" className="text-gray-500 hover:text-white transition-colors text-sm">Dashboard</Link></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-5">Juridiskt</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">Integritetspolicy</Link></li>
                <li><Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">Anv&#228;ndarvillkor</Link></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold tracking-wider text-white uppercase mb-5">Kontakt</h3>
              <ul className="space-y-3">
                <li><a href="mailto:contact@growzilla.xyz" className="text-gray-500 hover:text-white transition-colors text-sm">contact@growzilla.xyz</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">&copy; 2026 Growzilla. Alla r&#228;ttigheter f&#246;rbeh&#229;llna.</p>
            <span className="text-xs text-gray-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zilla-neon animate-pulse" />
              Byggt f&#246;r Shopify-handlare
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
