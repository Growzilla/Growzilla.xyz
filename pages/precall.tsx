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
        <title>Precall — Founder Pipeline OS | Growzilla</title>
        <meta
          name="description"
          content="Watch the Founder Pipeline OS precall video, then book a strategy call. For funded B2B AI startups ready to turn founder content and outbound into conversations."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Precall — Founder Pipeline OS | Growzilla" />
        <meta
          property="og:description"
          content="Watch before your strategy call. Then book with our closer."
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
              className="inline-flex items-center px-3.5 py-1.5 rounded-md bg-zilla-neon text-zilla-black text-xs sm:text-sm font-semibold hover:bg-zilla-glow transition-colors"
            >
              Book the call →
            </a>
          </div>
        </header>

        <main>
          <PrecallHero />
          <PrecallVideo />
          <PrecallAgenda />
          <PrecallOffer />
          <PrecallFit />
          <PrecallExpectations />
          <PrecallCalendly />
        </main>

        <footer className="border-t border-white/[0.06] py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs text-white/35">
              Founder Pipeline OS · Growzilla · Strategy call is diagnostic, not a pitch.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrecallPage;
