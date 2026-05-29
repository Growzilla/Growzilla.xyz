import React from 'react';

/**
 * Founder block for /email. Dual-voice trust unit:
 *   - Org-voice paragraph (third person — "Growzilla" framing Albert)
 *   - Albert-voice paragraph (first person — friendly, asset-to-org)
 * Footer line: "Backed by experts in deliverability, copy chiefing, and Shopify CRO."
 *
 * Photo: /public/images/team/albert.png — swap-in via prop if a better headshot lands.
 */

interface Props {
  photoSrc?: string;
  linkedInUrl?: string;
  whatsappHref?: string;
  emailAddress?: string;
}

const FounderBlock: React.FC<Props> = ({
  photoSrc = '/images/team/albert.png',
  linkedInUrl = 'https://www.linkedin.com/in/albert-elmgart/',
  whatsappHref = 'https://wa.me/46725597280?text=Hi%20Albert%20%E2%80%94%20saw%20growzilla.xyz%2Femail',
  emailAddress = 'hello@growzilla.xyz',
}) => (
  <section className="border-t border-white/[0.06]">
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-xs tracking-[0.2em] text-white/48 font-mono mb-8">
        ◆ WHO YOU'RE WORKING WITH
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-start">
        <div>
          <div className="relative w-[160px] h-[160px] overflow-hidden rounded-lg border border-white/[0.08] bg-zilla-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt="Albert Elmgart — Account Executive at Growzilla"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mt-4">
            <div className="font-display text-lg leading-tight">Albert Elmgart</div>
            <div className="text-xs text-white/64 font-mono mt-1">
              Account Executive · Shopify Growth Partner
            </div>
            <div className="flex items-center gap-3 mt-4 text-xs">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/64 hover:text-zilla-neon transition underline-offset-2 hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-white/24">·</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/64 hover:text-zilla-neon transition underline-offset-2 hover:underline"
              >
                WhatsApp
              </a>
              <span className="text-white/24">·</span>
              <a
                href={`mailto:${emailAddress}`}
                className="text-white/64 hover:text-zilla-neon transition underline-offset-2 hover:underline"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-white/80 leading-relaxed">
            <span className="text-white/48 text-xs font-mono tracking-wider mr-2">GROWZILLA →</span>
            Albert leads client kickoff and execution on every reactivation sprint we ship. He
            runs the floor-math calibration that anchors our quotes, reads every Klaviyo
            dashboard on Day 1, and is the operator you'll be on a call with.
          </p>
          <p className="text-white/80 leading-relaxed">
            <span className="text-zilla-neon text-xs font-mono tracking-wider mr-2">ALBERT →</span>
            I'll be the one reading your Klaviyo dashboard at 6am on Day 1. Every sequence we
            send, I've read aloud and rewritten before it reaches your subscribers. The 30-day
            window is a calendar I keep open until your numbers print. Reach out — I reply
            within a few hours.
          </p>
          <p className="text-xs text-white/48 italic">
            Backed by experts in deliverability, copy chiefing, and Shopify CRO.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FounderBlock;
