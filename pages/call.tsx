import React, { useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PrecallEligibleBanner from '../components/precall/PrecallEligibleBanner';
import PrecallHero from '../components/precall/PrecallHero';
import PrecallVideo from '../components/precall/PrecallVideo';
import PrecallAgenda from '../components/precall/PrecallAgenda';
import PrecallOffer from '../components/precall/PrecallOffer';
import PrecallFit from '../components/precall/PrecallFit';
import PrecallExpectations from '../components/precall/PrecallExpectations';
import PrecallCalendly from '../components/precall/PrecallCalendly';

function parseEligible(raw: string | string[] | undefined): boolean | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === '1' || v === 'true') return true;
  if (v === '0' || v === 'false') return false;
  return null;
}

/**
 * /call — destination after homepage fit check.
 * Video always uses local precall.mp4 (see PrecallVideo forceLocal).
 */
const CallPage: React.FC = () => {
  const router = useRouter();
  const eligible = useMemo(
    () => parseEligible(router.query.eligible),
    [router.query.eligible]
  );
  const showDefaultHero = eligible === null;

  return (
    <>
      <Head>
        <title>Fit call — 5–10 Qualified Meetings/Week | Growzilla</title>
        <meta
          name="description"
          content="You're eligible for a fit call. Watch how we book 5–10 qualified meetings every week on LinkedIn, then schedule a diagnosis."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Fit call — LinkedIn meetings engine | Growzilla" />
        <meta
          property="og:description"
          content="Watch how we book 5–10 qualified meetings a week, then book a fit call."
        />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white">
        <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-zilla-black/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <Image
                src="/growzillalogo.png"
                alt="Growzilla"
                width={28}
                height={28}
                className="rounded-sm"
              />
              <span className="text-sm font-medium text-white/90 hidden sm:inline">
                Growzilla
              </span>
            </a>
            <a
              href="#book"
              className="inline-flex items-center px-3.5 py-1.5 rounded-md border border-zilla-neon/40 bg-zilla-neon/10 text-zilla-neon text-xs sm:text-sm font-semibold hover:bg-zilla-neon/15 transition-colors"
            >
              Book the call →
            </a>
          </div>
        </header>

        <main>
          <PrecallEligibleBanner eligible={eligible} />
          {showDefaultHero && <PrecallHero />}
          {/* Always local precall.mp4 on /call */}
          <PrecallVideo forceLocal />
          <PrecallAgenda />
          <PrecallOffer />
          <PrecallFit />
          <PrecallExpectations />
          <PrecallCalendly />
        </main>

        <footer className="border-t border-white/[0.06] py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs text-white/35">
              5–10 qualified meetings / week · Growzilla · Fit call is diagnostic, not a pitch.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CallPage;
