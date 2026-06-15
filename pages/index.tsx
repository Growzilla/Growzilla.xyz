import React from 'react';
import Head from 'next/head';
import { Bebas_Neue, DM_Sans, Syne } from 'next/font/google';

import Navbar from '../components/reactivation/Navbar';
import Hero from '../components/reactivation/Hero';
import Problem from '../components/reactivation/Problem';
import About from '../components/reactivation/About';
import StatsBand from '../components/reactivation/StatsBand';
import SocialProof from '../components/reactivation/SocialProof';
import TheOffer from '../components/reactivation/TheOffer';
import Contact from '../components/reactivation/Contact';
import FAQ from '../components/reactivation/FAQ';
import HowItWorks from '../components/reactivation/HowItWorks';
import LateCTA from '../components/reactivation/LateCTA';
import Footer from '../components/reactivation/Footer';

// Fonts wired as CSS variables the reactivation components reference:
//   --font-syne        → display headlines (Bebas Neue)
//   --font-geist-sans  → body copy (DM Sans)
//   --font-syne-brand  → nav wordmark (Syne)
const bebasNeue = Bebas_Neue({ variable: '--font-syne', subsets: ['latin'], weight: '400', display: 'swap' });
const dmSans = DM_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
const syne = Syne({ variable: '--font-syne-brand', subsets: ['latin'], weight: ['700', '800'], display: 'swap' });

/**
 * Growzilla homepage — email-reactivation agency landing (ported from Darian's
 * build). The previous Shopify-attribution homepage now lives at /attribution.
 *
 * All section components live in components/reactivation/ and read their colors,
 * fonts and animations from the scoped `.reactivation-home` wrapper + the font
 * CSS variables applied here. The Contact form posts to /api/lead-notify.
 */
const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Growzilla — Email Reactivation Agency</title>
        <meta
          name="description"
          content="We reactivate dormant email subscribers and turn cold lists into revenue. Get your free audit today."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla — Email Reactivation Agency" />
        <meta
          property="og:description"
          content="We reactivate dormant email subscribers and turn cold lists into revenue. Get your free audit today."
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growzilla — Email Reactivation Agency" />
        <meta
          name="twitter:description"
          content="We reactivate dormant email subscribers and turn cold lists into revenue. Get your free audit today."
        />

        <meta name="theme-color" content="#080808" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${bebasNeue.variable} ${dmSans.variable} ${syne.variable} reactivation-home`}
        style={{ fontFamily: 'var(--font-geist-sans)', background: '#080808', color: '#ededed' }}
      >
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <About />
          <div className="md:hidden">
            <StatsBand />
          </div>
          <SocialProof />
          <TheOffer />
          <Contact />
          <FAQ />
          <HowItWorks />
          <LateCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
