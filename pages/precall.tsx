import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import PrecallHero from '../components/precall/PrecallHero';
import PrecallVideo from '../components/precall/PrecallVideo';
import PrecallAgenda from '../components/precall/PrecallAgenda';
import PrecallOffer from '../components/precall/PrecallOffer';
import PrecallFit from '../components/precall/PrecallFit';
import PrecallExpectations from '../components/precall/PrecallExpectations';
import PrecallCalendly from '../components/precall/PrecallCalendly';

const PrecallPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Precall — 5–10 Qualified Meetings/Week on LinkedIn | Growzilla</title>
        <meta
          name="description"
          content="How to book 5–10 qualified meetings every week on LinkedIn without posting or prospecting yourself. Watch the system, then book a fit call."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Precall — 5–10 LinkedIn Meetings/Week | Growzilla" />
        <meta
          property="og:description"
          content="5–10 qualified meetings a week from LinkedIn. Watch the precall, then book a fit call."
        />
      </Head>

      <div className="min-h-screen bg-zilla-black text-white">
        {/* Sticky nav */}
        <header className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-zilla-black/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="/precall" className="flex items-center gap-2.5">
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
          <PrecallHero />
          {/* Prefer local recording; same asset as /call */}
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

export default PrecallPage;
