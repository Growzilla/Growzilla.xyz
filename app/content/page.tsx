'use client'

/**
 * /content — Growzilla Content Studio offer page.
 *
 * Offer: "The Content Sprint" — 14 reels in 14 days, done-for-you, $250.
 * We script -> you film fast -> we edit -> we schedule + post.
 * Founder-led + product brands. Built in Sweden, running globally.
 *
 * Structure follows the LP/funnel architecture in the marketing corpus:
 * problem -> offer/value-stack -> mechanism (how it works) -> proof (case study)
 * -> price + risk reversal -> continuity -> objections (FAQ) -> CTA.
 *
 * Visual register matches /agency: zilla-black + neon, type-led, two opacities
 * of green, operator copy, one functional eyebrow per section.
 *
 * --- OPERATOR KNOBS (edit these, they are flagged operator-judgment) ---
 *  BOOK_URL    : reuse of the existing Calendly. Swap for a content-specific link if you want.
 *  SPRINT_SLOTS: scarcity count shown on the page. Set to the real number you can take.
 *  The "200K views / 24h" case study NEEDS a real screenshot dropped into the PROOF SLOT
 *  below, or the number softened. Unsourced stats get discounted by brand owners.
 */

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import ApplyFlow from '@/components/content/ApplyFlow'

const SPRINT_PRICE = '$250'
const SPRINT_SLOTS = 4 // [OP] scarcity — set to the real number of sprints you can run this cohort

/* ----------------------------- shared bits ----------------------------- */

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function PrimaryCTA({
  label = 'Claim your sprint',
  className = '',
}: {
  label?: string
  className?: string
}) {
  return (
    <a
      href="#apply"
      className={`group inline-flex items-center gap-2 h-12 px-7 rounded-md bg-zilla-neon text-black text-[14px] font-semibold tracking-[0.01em] hover:brightness-105 transition-all duration-150 ease-out hover:translate-y-[-1px] ${className}`}
    >
      {label}
      <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
    </a>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] font-mono uppercase tracking-[0.16em] text-zilla-neon/80">
      {children}
    </p>
  )
}

/* -------------------------------- nav ---------------------------------- */

const NAV_LINKS = [
  { href: '#offer', label: 'The Sprint' },
  { href: '#how', label: 'How it works' },
  { href: '#case-study', label: 'Case study' },
] as const

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-zilla-black/85 backdrop-blur-md border-b border-white/[0.06]">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-0.5 group shrink-0" aria-label="Growzilla — home">
          <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-white/95">
            Growzill
          </span>
          <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-zilla-neon">
            a
          </span>
          <span className="ml-2 hidden sm:inline text-[11px] font-mono uppercase tracking-[0.14em] text-white/35">
            Content Studio
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-white/60 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <PrimaryCTA label="Claim your sprint" className="h-9 px-4 text-[13px]" />
      </nav>
    </header>
  )
}

/* ------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative pt-32 sm:pt-36 lg:pt-44 pb-20 sm:pb-24 lg:pb-28 overflow-hidden bg-zilla-black">
      {/* faint neon wash behind the headline — tasteful, low opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 h-[420px] w-[820px] rounded-full blur-[120px] opacity-[0.10]"
        style={{ background: 'radial-gradient(closest-side, #00FF94, transparent)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center"
      >
        <Eyebrow>Content Studio · Built in Sweden, running globally</Eyebrow>

        <h1 className="mt-6 font-display font-medium text-[44px] sm:text-[62px] lg:text-[78px] leading-[1.02] tracking-[-0.025em] text-white/95 max-w-[16ch] mx-auto">
          We make your content. You get the views.
        </h1>

        <p className="mt-8 text-[16px] sm:text-[18px] leading-[1.6] text-white/65 max-w-2xl mx-auto">
          A content studio for founder-led and product brands. One reel a day, for two weeks. We
          script it, you film it in minutes, we edit, schedule, and post. All you do is show up.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <PrimaryCTA label={`Claim your sprint · ${SPRINT_PRICE}`} />
          <a
            href="#case-study"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/[0.14] text-[14px] font-medium text-white/85 hover:text-white hover:border-zilla-neon/40 transition-all duration-150 ease-out"
          >
            See the case study
            <span className="text-zilla-neon transition-transform duration-150 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>

        <p className="mt-7 text-[13px] text-white/45 font-mono">
          200K views in 24 hours on a single reel. We know how to get watched.
        </p>
      </motion.div>
    </section>
  )
}

/* ----------------------------- proof band ------------------------------ */

const PROOF_STATS = [
  { n: '200K', l: 'views' },
  { n: '24h', l: 'after posting' },
  { n: '1', l: 'reel' },
] as const

function ProofBand() {
  return (
    <section className="border-t border-white/[0.06] bg-zilla-black py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal className="grid grid-cols-3 gap-4 sm:gap-8">
          {PROOF_STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display font-semibold text-[40px] sm:text-[64px] lg:text-[76px] leading-none tracking-[-0.03em] text-zilla-neon">
                {s.n}
              </div>
              <div className="mt-2 text-[12px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-white/45">
                {s.l}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-[15px] sm:text-[16px] leading-[1.6] text-white/60 max-w-2xl mx-auto">
            One reel. One day. 200,000 views and a wave of new traffic straight to the site. That is
            the whole point of what we do.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------ problem -------------------------------- */

function Problem() {
  return (
    <section className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>The honest part</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.06] tracking-[-0.02em] text-white/95">
            You already know reels work. Doing them every day is the problem.
          </h2>
          <div className="mt-8 space-y-5 text-[16px] sm:text-[17px] leading-[1.7] text-white/65">
            <p>
              Scripting, filming, editing, captioning, scheduling, posting. Every single day. It is a
              full-time job most founders never have the hours for.
            </p>
            <p>
              So the posting gets sporadic. The quality slips. The account goes quiet. And the views
              never come.
            </p>
            <p className="text-white/85">
              Views don’t come from posting once in a while. They come from showing up daily with
              content built to get watched. That is the part we run for you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- offer --------------------------------- */

const INCLUDES = [
  { t: '14 reels, one a day for two weeks', d: 'A full feed of content, delivered daily without you lifting a finger.' },
  { t: 'Every reel scripted', d: 'Word-for-word scripts and hooks built to earn the watch, not just fill a slot.' },
  { t: 'Pro editing on each one', d: 'Cuts, captions, sound, pacing. Built to stop the scroll and hold it.' },
  { t: 'Scheduled and posted for you', d: 'We publish on your accounts, every day. You never touch a scheduler.' },
  { t: 'A hook and angle plan for your brand', d: 'The angles we’re testing and why, mapped to what your audience actually responds to.' },
  { t: 'A read at the end of the sprint', d: 'What worked, what got watched, and what to double down on next.' },
]

function Offer() {
  return (
    <section id="offer" className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>The offer</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[34px] sm:text-[48px] lg:text-[58px] leading-[1.04] tracking-[-0.02em] text-white/95">
            The Content Sprint. <span className="text-zilla-neon">14 reels in 14 days.</span>
          </h2>
          <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.6] text-white/65 max-w-2xl">
            One flat price. We run the whole thing, start to finish.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* value stack */}
          <Reveal className="space-y-0">
            <ul className="divide-y divide-white/[0.06]">
              {INCLUDES.map((it) => (
                <li key={it.t} className="flex gap-4 py-5">
                  <span className="mt-1 text-zilla-neon shrink-0" aria-hidden>
                    ✓
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-white/95">{it.t}</p>
                    <p className="mt-1 text-[14px] leading-[1.6] text-white/55">{it.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] leading-[1.7] text-white/50">
              A freelance editor alone runs $75 to $150 a reel. That is $1,000+ before anyone writes a
              script or posts a thing. The Sprint is all of it, for one price.
            </p>
          </Reveal>

          {/* price box */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl border border-zilla-neon/25 bg-white/[0.02] p-8 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.06] blur-xl"
                style={{ background: 'radial-gradient(closest-side, #00FF94, transparent)' }}
              />
              <div className="relative">
                <p className="text-[12px] font-mono uppercase tracking-[0.14em] text-white/45">
                  The Content Sprint
                </p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display font-semibold text-[64px] sm:text-[76px] leading-none tracking-[-0.03em] text-white/95">
                    {SPRINT_PRICE}
                  </span>
                  <span className="text-[14px] text-white/50">for the full 2 weeks</span>
                </div>

                <ul className="mt-8 space-y-3 text-[14px] text-white/70">
                  {[
                    '14 reels, scripted, edited, posted',
                    'One a day, on your accounts',
                    'You film. We do everything else.',
                  ].map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <span className="text-zilla-neon" aria-hidden>
                        ✓
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <PrimaryCTA label="Claim your sprint" className="w-full justify-center" />
                </div>

                <div className="mt-6 space-y-2.5 text-[13px]">
                  <p className="flex items-center gap-2 text-white/75">
                    <span className="text-zilla-neon" aria-hidden>
                      ●
                    </span>
                    14 reels in 14 days, or you don’t pay.
                  </p>
                  <p className="flex items-center gap-2 text-white/55">
                    <span className="text-zilla-neon/70" aria-hidden>
                      ●
                    </span>
                    Only {SPRINT_SLOTS} sprints open this cohort.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- how it works ----------------------------- */

const STEPS = [
  { k: '01', t: 'We script', d: 'You get a shot list and a word-for-word script for all 14 reels, built around hooks that earn the watch.' },
  { k: '02', t: 'You film', d: 'Grab your phone. About twenty minutes of filming covers the whole sprint. No gear, no studio, no editing.' },
  { k: '03', t: 'We edit', d: 'Cuts, captions, sound, pacing. Every reel built to stop the scroll and keep people watching to the end.' },
  { k: '04', t: 'We post', d: 'We schedule and publish on your accounts, one a day, so you never have to think about it.' },
]

function HowItWorks() {
  return (
    <section id="how" className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-white/95">
            Four steps. Twenty minutes of your time.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {STEPS.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 py-8">
                <div className="font-mono text-[13px] text-zilla-neon/80 tracking-[0.1em] sm:w-20 shrink-0">
                  {s.k}
                </div>
                <div className="sm:flex-1">
                  <h3 className="font-display text-[22px] sm:text-[26px] font-medium tracking-[-0.01em] text-white/95">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-[15px] sm:text-[16px] leading-[1.6] text-white/60 max-w-2xl">
                    {s.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- who it's for ---------------------------- */

const AUDIENCE = [
  { t: 'Founder-led brands', d: 'You’re the face. We turn you into a daily presence without it eating your week.' },
  { t: 'Product brands', d: 'You want the product seen. We build reels that show it off and make people want it.' },
  { t: 'Swedish and global', d: 'We’re a Swedish studio working with brands worldwide. Nordic brands, you’re home.' },
]

function WhoItsFor() {
  return (
    <section className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-[-0.02em] text-white/95">
            Built for founders and product brands.
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.06} className="bg-zilla-black">
              <div className="h-full p-7 sm:p-8">
                <h3 className="font-display text-[20px] font-medium text-white/95">{a.t}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-white/60">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- case study ------------------------------ */

function CaseStudy() {
  return (
    <section id="case-study" className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>The case study</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[36px] sm:text-[54px] lg:text-[64px] leading-[1.02] tracking-[-0.025em] text-white/95">
            200K views. 24 hours. One reel.
          </h2>
          <div className="mt-8 space-y-5 text-[16px] sm:text-[17px] leading-[1.7] text-white/65 max-w-2xl">
            <p>
              We posted a single reel. Inside 24 hours it crossed 200,000 views and sent a wave of new
              traffic straight to the site.
            </p>
            <p className="text-white/85">
              That is the whole point of what we do. We know how to get views, and we know how to turn
              those views into people landing on your page.
            </p>
          </div>
        </Reveal>

        {/* PROOF SLOT — drop the real analytics screenshot here as an <img>.
            Until then, this renders the headline numbers type-led (on-brand).
            Replace the block below with:
            <img src="/content/case-200k.png" alt="200K views in 24 hours" className="rounded-xl border border-white/[0.08]" /> */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12">
            <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
              {[
                { n: '200,000+', l: 'views' },
                { n: '24 hrs', l: 'from posting' },
                { n: '1', l: 'reel' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-semibold text-[28px] sm:text-[48px] leading-none tracking-[-0.03em] text-zilla-neon">
                    {s.n}
                  </div>
                  <div className="mt-2 text-[11px] sm:text-[13px] font-mono uppercase tracking-[0.14em] text-white/45">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-[13px] text-white/40 font-mono">
              Result from a single Growzilla-produced reel.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex justify-center">
            <PrimaryCTA label="I want results like this" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------- after the sprint -------------------------- */

function AfterSprint() {
  return (
    <section className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>After the sprint</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[30px] sm:text-[42px] lg:text-[48px] leading-[1.06] tracking-[-0.02em] text-white/95">
            Most brands don’t stop at 14.
          </h2>
          <p className="mt-7 text-[16px] sm:text-[17px] leading-[1.7] text-white/65">
            Two weeks in, you’ll have a feed full of reels, real numbers, and a clear picture of what
            is working. If you want to keep the cameras rolling, we’ll talk about what month two looks
            like. No pressure, no lock-in. The Sprint stands on its own.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------- FAQ ---------------------------------- */

const FAQS = [
  {
    q: 'Do I have to be on camera?',
    a: 'Founder-led works best, but no. We can build the sprint around product footage, b-roll, your team, or voiceover. If you want to show the product instead of your face, we plan around the product.',
  },
  {
    q: 'I’m not in Sweden. Does that matter?',
    a: 'Not at all. We’re a Swedish studio but we work with brands worldwide. Nordic brands get an edge from us being local, but the playbook travels anywhere.',
  },
  {
    q: 'What do I need to record with?',
    a: 'Your phone. We send you the exact shot list and script. About twenty minutes of filming covers the whole two-week sprint. No gear, no studio.',
  },
  {
    q: 'What if I don’t like a reel?',
    a: 'Tell us and we revise it. Nothing has to go live without your sign-off if you want approval on each one.',
  },
  {
    q: 'Where do the reels get posted?',
    a: 'Instagram Reels, TikTok, and YouTube Shorts, wherever your audience is. We schedule and publish on your accounts so you never touch it.',
  },
  {
    q: 'How fast can we start?',
    a: 'Once you book the call and we lock your brief, your first reel can be live within days.',
  },
]

function FAQ() {
  return (
    <section className="border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-6 font-display font-medium text-[30px] sm:text-[42px] leading-[1.06] tracking-[-0.02em] text-white/95">
            The things founders ask first.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="py-6">
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-white/95">{f.q}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.7] text-white/60">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------- apply / final CTA ------------------------- */

function ApplySection() {
  return (
    <section
      id="apply"
      className="relative border-t border-white/[0.06] bg-zilla-black py-24 sm:py-28 lg:py-32 overflow-hidden scroll-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[360px] w-[760px] rounded-full blur-[120px] opacity-[0.08]"
        style={{ background: 'radial-gradient(closest-side, #00FF94, transparent)' }}
      />
      <div className="relative max-w-2xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Claim your sprint</Eyebrow>
            <h2 className="mt-6 font-display font-medium text-[36px] sm:text-[50px] lg:text-[58px] leading-[1.03] tracking-[-0.025em] text-white/95">
              Ready to get watched?
            </h2>
            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.6] text-white/65 max-w-xl mx-auto">
              Drop your details. We’ll come back within a day to lock your brief and script your
              first reel. {SPRINT_PRICE} for 14 reels in 14 days.
            </p>
            <p className="mt-4 text-[13px] text-white/40 font-mono">
              Only {SPRINT_SLOTS} sprints open this cohort.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <ApplyFlow />
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- footer -------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-zilla-black py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-white/95">
              Growzill
            </span>
            <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-zilla-neon">
              a
            </span>
            <span className="ml-3 text-[12px] text-white/40 font-mono">Content Studio</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/45">
            <a href="#offer" className="hover:text-white/85 transition-colors">
              The Sprint
            </a>
            <a href="#case-study" className="hover:text-white/85 transition-colors">
              Case study
            </a>
            <a href="#how" className="hover:text-white/85 transition-colors">
              How it works
            </a>
            <a href="#apply" className="hover:text-white/85 transition-colors">
              Book a call
            </a>
            <a href="mailto:albert@growzilla.xyz" className="hover:text-white/85 transition-colors">
              albert@growzilla.xyz
            </a>
          </div>
        </div>

        <div className="mt-6 text-[12px] text-white/55">
          Built in Sweden. Working with brands worldwide.
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
          <div>© {new Date().getFullYear()} RolloutFactory Inc · Delaware</div>
          <div>Growzilla Content Studio</div>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------- page --------------------------------- */

export default function ContentStudioPage() {
  return (
    <main className="min-h-screen bg-zilla-black text-white selection:bg-zilla-neon/30 selection:text-white">
      <Nav />
      <Hero />
      <ProofBand />
      <Problem />
      <Offer />
      <HowItWorks />
      <WhoItsFor />
      <CaseStudy />
      <AfterSprint />
      <FAQ />
      <ApplySection />
      <Footer />
    </main>
  )
}
