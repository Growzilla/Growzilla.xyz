import React from 'react';
import Head from 'next/head';
import GrowzillaLayout from '../components/GrowzillaLayout';
import GrowzillaHero from '../components/GrowzillaHero';
import ExclusivityTeaser from '../components/ExclusivityTeaser';
import ProblemAgitation from '../components/ProblemAgitation';
import FeatureShowcase from '../components/FeatureShowcase';
import TestimonialCarousel from '../components/TestimonialCarousel';
import CompetitiveComparison from '../components/CompetitiveComparison';
import EnhancedCTA from '../components/EnhancedCTA';

const GrowzillaPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Growzilla | Unleash Monster Growth - Elite Shopify Analytics</title>
        <meta
          name="description"
          content="Join 180+ elite 7-8 figure Shopify merchants. Growzilla's AI detects revenue leaks, optimizes ad spend, unlocks explosive growth. 90-second install. $47M+ recovered."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://growzilla.xyz" />
        <meta property="og:title" content="Growzilla | Unleash Monster Growth on Your Shopify Store" />
        <meta
          property="og:description"
          content="Stop guessing why customers leave. Our AI artifact stomps out conversion leaks and unleashes explosive growth. Join 2,400+ brands in the herd."
        />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growzilla | Unleash Monster Growth" />
        <meta
          name="twitter:description"
          content="AI-powered conversion optimization for Shopify. Join 2,400+ brands crushing it."
        />
        <meta name="twitter:image" content="/twitter-image.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme color - Shopify green */}
        <meta name="theme-color" content="#00FF94" />

        {/* Preconnect to fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <GrowzillaLayout>
        {/*
          SECTION 1: CINEMATIC HERO
          - Godzilla silhouette with atomic breath glow (Shopify green)
          - Dual CTA: Install vs Waitlist
          - Target: 15-25% conversion
        */}
        <GrowzillaHero />

        {/*
          SECTION 2: EXCLUSIVITY TEASER
          - "Members Only" club vibe
          - Glassmorphism dashboard preview
          - Superhuman-inspired waitlist psychology
          - Social proof: 60K joined, 15K onboarded
        */}
        <ExclusivityTeaser />

        {/*
          SECTION 3: PROBLEM AGITATION
          - 3-card leak showcase with dripping animations
          - Research-backed pain points:
            * $237K/year wasted ad spend (murky GA4)
            * 1.8% mobile CVR vs 3.9% desktop
            * Blind optimization on guesswork
        */}
        <ProblemAgitation />

        {/*
          SECTION 4: FEATURE SHOWCASE
          - 4 modular cards with hover animations
          - Unique differentiators:
            * ICP Archetype AI (Growzilla exclusive)
            * Pareto 80/20 Optimization
            * Ad Targeting Prescriptions
            * Store Redesign AI
        */}
        <FeatureShowcase />

        {/*
          SECTION 5: SOCIAL PROOF CAROUSEL
          - Auto-rotating elite merchant testimonials
          - Quantifiable results ($340K recovered, +79% mobile CVR)
          - "Powered by Growzilla" badge teaser
          - Conversion lift: 84-270% near CTAs
        */}
        <TestimonialCarousel />

        {/*
          SECTION 6: COMPETITIVE COMPARISON
          - Feature matrix: Growzilla vs Triple Whale, Peel, Northbeam
          - Highlights unique capabilities (ICP AI, real-time alerts)
          - Pricing positioned at $499 (premium but below Northbeam)
        */}
        <CompetitiveComparison />

        {/*
          SECTION 7: ENHANCED CTA
          - Massive "CLAIM YOUR GROWZILLA ACCESS" headline
          - Dual conversion paths:
            * Primary: Install Now (immediate action)
            * Secondary: Join Waitlist (exclusivity play)
          - Trust signals: 30-day trial, no card, 90s install
          - Social proof stats: 180+ brands, $47M recovered, 35% CVR lift
        */}
        <EnhancedCTA />
      </GrowzillaLayout>
    </>
  );
};

export default GrowzillaPage;
