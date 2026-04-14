import React, { useState } from 'react';
import { LinkIcon, CheckIcon } from '@heroicons/react/24/outline';

/**
 * <ShareWidget>
 * =============
 * Card placed above the dual CTA on /adcreator/report/[jobId]. Drives virality:
 * Twitter / LinkedIn / copy-link. Click events tracked via POST /api/events.
 *
 * Standalone — fe-growth wires it into the report page once that page lands.
 *
 * Reports are public URLs by default (jobId is an opaque hash, used as share token).
 * If we later choose to auth-gate reports, drop `BASE_URL` into a server-rendered
 * prop and gate the share copy strings.
 */

const BASE_URL = 'https://growzilla.xyz';

export interface ShareWidgetProps {
  jobId: string;
  brandName?: string;
  /** Override the share URL if reports ever move under a different path. */
  shareUrl?: string;
  className?: string;
}

const TWITTER_COPY =
  'Just ran my store through @growzillaxyz /adcreator — it scraped the Meta Ad Library live and handed me 5 ad briefs in 3 minutes. Free. Try it: growzilla.xyz/adcreator';

const LINKEDIN_COPY =
  'I just ran my store through Growzilla\'s free /adcreator tool. It pulled live Meta Ad Library data on my competitors and shipped 5 ready-to-test ad briefs in 3 minutes. Worth a look if you run paid social: growzilla.xyz/adcreator';

const ShareWidget: React.FC<ShareWidgetProps> = ({
  jobId,
  brandName,
  shareUrl,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const link = shareUrl || `${BASE_URL}/adcreator/report/${encodeURIComponent(jobId)}`;

  const track = (platform: 'twitter' | 'linkedin' | 'copy') => {
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Send both keys: existing handler reads `event`; be-api spec asks for `event_name`.
      body: JSON.stringify({
        event: 'adcreator_share_click',
        event_name: 'adcreator_share_click',
        properties: { platform, jobId, brandName },
        platform,
        jobId,
        brandName,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      /* fire-and-forget */
    });
  };

  const onCopy = async () => {
    track('copy');
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — silent. UI just doesn't flip.
    }
  };

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(TWITTER_COPY)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    `${BASE_URL}/adcreator`,
  )}&summary=${encodeURIComponent(LINKEDIN_COPY)}`;

  return (
    <section
      className={`rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 ${className}`}
      aria-label="Share your competitive intel"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Share your competitive intel
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-md">
            Show the brands you respect what you just pulled. Each share helps us run
            more reports for free.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={twitterHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('twitter')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-white/10 text-sm text-gray-200 hover:text-white hover:border-zilla-neon/40 transition-colors"
        >
          <TwitterGlyph />
          <span>Share on X</span>
        </a>

        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('linkedin')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-white/10 text-sm text-gray-200 hover:text-white hover:border-zilla-neon/40 transition-colors"
        >
          <LinkedInGlyph />
          <span>Share on LinkedIn</span>
        </a>

        <button
          type="button"
          onClick={onCopy}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md border text-sm transition-colors ${
            copied
              ? 'border-zilla-neon/40 bg-zilla-neon/10 text-zilla-neon'
              : 'border-white/10 text-gray-200 hover:text-white hover:border-zilla-neon/40'
          }`}
          aria-live="polite"
        >
          {copied ? <CheckIcon className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          <span>{copied ? 'Copied' : 'Copy link'}</span>
        </button>
      </div>

      {/* Visible link (non-interactive) so users see what they're sharing. */}
      <p className="mt-3 text-[11px] text-gray-500 font-mono truncate" title={link}>
        {link}
      </p>
    </section>
  );
};

const TwitterGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const LinkedInGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);

export default ShareWidget;
