import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  QuizResult,
  RevenueRange,
  SpendRange,
  CreatorCount,
  QuizPlatform,
  TrackingMethod,
  QuizAnswers,
  QuizLeadPayload,
} from '@/types/quiz';
import { calculateQuizResult, BUCKET_COLORS, BUCKET_LABELS } from '@/lib/quizCalculations';
import QuizOptionCard from '@/components/quiz/QuizOptionCard';
import QuizLeakChart from '@/components/quiz/QuizLeakChart';
import Link from 'next/link';

/* ═══════════════════════════════════════════════
   ANGLE → OG META + INTRO HEADLINE MAP
   ═══════════════════════════════════════════════ */
const ANGLE_META: Record<string, { ogTitle: string; ogDesc: string; introHeadline: string }> = {
  'no-time': {
    ogTitle: 'Se exakt var ditt content läcker intäkter',
    ogDesc: 'Du hinner inte skapa content OCH veta vad som funkar. Den här kalkylatorn visar exakt hur mycket du förlorar — på 60 sekunder. Byggt för Shopify beauty brands.',
    introHeadline: 'Hur mycket förlorar du på content du inte hinner skapa?',
  },
  'expensive-ugc': {
    ogTitle: 'Sluta betala 3 000 kr per UGC-video',
    ogDesc: 'Skapa 10 AI-videos på 5 minuter istället. Se hur mycket du förlorar på dyrt content som inte konverterar — gratis 60-sekunders kalkylator.',
    introHeadline: 'Hur mycket slösar du på dyrt UGC som inte konverterar?',
  },
  'creators-no-roi': {
    ogTitle: 'Se vilken creator som faktiskt säljer — och vilken som bara kostar',
    ogDesc: 'De flesta beauty brands betalar creators utan att veta vad de får tillbaka. Den här kalkylatorn visar exakt var pengarna går. 60 sekunder, gratis.',
    introHeadline: 'Hur mycket förlorar du på creators som inte konverterar?',
  },
  'competitors': {
    ogTitle: 'Dina konkurrenter har redan attribution. Du inte.',
    ogDesc: 'De ser exakt vad som säljer. Du gissar. Se hur mycket det kostar dig — gratis 60-sekunders kalkylator för Shopify beauty brands.',
    introHeadline: 'Hur mycket tappar du mot konkurrenter som har attribution?',
  },
  'free-audit': {
    ogTitle: 'Gratis content-granskning — se var du läcker pengar',
    ogDesc: '5 frågor. 60 sekunder. Du får en personlig rapport som visar exakt var ditt content förlorar intäkter. Ingen registrering, ingen säljpitch.',
    introHeadline: 'Vi granskar ditt content — se exakt var du läcker intäkter',
  },
  'ai-ugc-machine': {
    ogTitle: 'Generera AI UGC direkt från din Shopify-katalog',
    ogDesc: 'Välj produkt. Få 10 videos. Testa hooks automatiskt. Se vad som konverterar. Börja med vår gratis kalkylator — 60 sekunder.',
    introHeadline: 'Hur mycket snabbare kan du växa med AI-genererat content?',
  },
  'scale-content': {
    ogTitle: 'Du behöver 20 creatives/mån. Du gör 3.',
    ogDesc: 'Algoritmerna kräver volym du inte har. Se exakt hur mycket intäkter du missar — gratis 60-sekunders kalkylator för Shopify beauty brands.',
    introHeadline: 'Hur mycket intäkter missar du genom att inte skala content?',
  },
  'triple-whale-price': {
    ogTitle: 'Full creator attribution — utan att betala $179/mån',
    ogDesc: 'Samma data som Triple Whale till en bråkdel av priset. Plus AI UGC som de inte har. Se vad du förlorar — gratis kalkylator.',
    introHeadline: 'Hur mycket betalar du egentligen för attribution?',
  },
  'founder-burnout': {
    ogTitle: 'Du gör allt själv. Här är vad det kostar dig.',
    ogDesc: 'VD, marknadschef, content creator OCH kundtjänst? Se exakt hur mycket intäkter du tappar utan rätt verktyg — gratis 60-sekunders kalkylator.',
    introHeadline: 'Hur mycket tid slösar du på content som inte ger resultat?',
  },
  'chatbot': {
    ogTitle: 'Din butik säljer bara när du är vaken',
    ogDesc: 'En AI-säljare svarar kunder dygnet runt, rekommenderar produkter och driver köp. Se hur mycket du missar — gratis kalkylator.',
    introHeadline: 'Hur mycket försäljning missar du utanför kontorstid?',
  },
};

const DEFAULT_META = {
  ogTitle: 'Se exakt var ditt content läcker intäkter',
  ogDesc: 'Gratis 60-sekunders kalkylator för Shopify beauty brands. Svara på 5 frågor — få en personlig rapport som visar var pengarna försvinner.',
  introHeadline: 'Hur mycket intäkter läcker ditt content varje månad?',
};

/* ═══════════════════════════════════════════════
   SWEDISH TRANSLATIONS
   ═══════════════════════════════════════════════ */
const SE = {
  badge: 'Gratis 60-sekunders kalkylator',
  introSub: 'Gratis content-kalkylator för Shopify beauty brands',
  introCta: 'Beräkna min intäktsläcka',
  introTrust: 'Byggd av Growzilla — ingen registrering, ingen säljpitch.',
  back: 'Tillbaka',
  next: 'Nästa',
  // Steps
  storeUrlTitle: 'Vad är din Shopify-butiks URL?',
  storeUrlSub: 'Vi använder den för att anpassa dina resultat.',
  storeUrlPlaceholder: 'dinbutik.myshopify.com',
  storeUrlError: 'Ange din butiks-URL',
  revenueTitle: 'Vad är din månatliga omsättning?',
  revenueOptions: [
    { value: 'under_50k' as RevenueRange, label: 'Under 500 000 kr/mån' },
    { value: '50k_150k' as RevenueRange, label: '500 000 – 1,5 mkr/mån' },
    { value: '150k_400k' as RevenueRange, label: '1,5 – 4 mkr/mån' },
    { value: '400k_1m' as RevenueRange, label: '4 – 10 mkr/mån' },
    { value: 'over_1m' as RevenueRange, label: '10 mkr+/mån' },
  ],
  spendTitle: 'Hur mycket lägger du på creators / UGC per månad?',
  spendOptions: [
    { value: 'zero_3k' as SpendRange, label: '0 – 30 000 kr/mån' },
    { value: '3k_8k' as SpendRange, label: '30 000 – 80 000 kr/mån' },
    { value: '8k_20k' as SpendRange, label: '80 000 – 200 000 kr/mån' },
    { value: '20k_50k' as SpendRange, label: '200 000 – 500 000 kr/mån' },
    { value: 'over_50k' as SpendRange, label: '500 000+ kr/mån' },
  ],
  countTitle: 'Hur många creators jobbar du med?',
  countOptions: [
    { value: '1_5' as CreatorCount, label: '1 – 5 creators' },
    { value: '6_15' as CreatorCount, label: '6 – 15 creators' },
    { value: '16_30' as CreatorCount, label: '16 – 30 creators' },
    { value: '30_plus' as CreatorCount, label: '30+ creators' },
  ],
  platformsTitle: 'Vilka plattformar postar dina creators på?',
  platformsSub: 'Välj alla som stämmer',
  platformOptions: [
    { value: 'instagram_reels' as QuizPlatform, label: 'Instagram Reels' },
    { value: 'tiktok' as QuizPlatform, label: 'TikTok' },
    { value: 'youtube_shorts' as QuizPlatform, label: 'YouTube Shorts' },
    { value: 'pinterest_other' as QuizPlatform, label: 'Pinterest / Annat' },
  ],
  trackingTitle: 'Hur spårar du idag vilken content som driver köp?',
  trackingOptions: [
    { value: 'guesswork' as TrackingMethod, label: 'Det gör vi inte — vi gissar' },
    { value: 'spreadsheets' as TrackingMethod, label: 'Manuella spreadsheets' },
    { value: 'ga_meta' as TrackingMethod, label: 'Google Analytics / Meta-dashboarden' },
    { value: 'not_accurate' as TrackingMethod, label: 'Vi har spårning men den stämmer inte' },
  ],
  // Results
  resultsLeakLabel: 'Uppskattad månatlig intäktsläcka',
  resultsUnlockCta: 'Lås upp din fullständiga rapport',
  // Email gate
  emailTitle: 'Vart ska vi skicka din rapport?',
  emailSub: 'Få din fullständiga analys med konkreta rekommendationer.',
  emailPlaceholder: 'du@foretag.se',
  phonePlaceholder: '+46 70 123 4567',
  phoneOptional: 'Valfritt — få en sammanfattning på WhatsApp',
  emailCta: 'Skicka min rapport',
  emailPrivacy: 'Vi delar aldrig din info. Inget spam, aldrig.',
  emailError: 'Ange en giltig e-postadress',
  // Full results
  fullTitle: 'Din fullständiga intäktsrapport',
  annualImpact: 'Årlig påverkan',
  leakRate: 'Läckagegrad',
  leakBreakdown: 'Intäktsläcka per kategori',
  ctaDashboard: 'Utforska live-dashboarden',
  ctaBook: 'Boka en gratis 15-min genomgång',
  // Install CTA (final step)
  ctaInstall: 'Installera Growzilla på din Shopify-butik',
  ctaInstallSub: 'Gratis att komma igång. Se vilken content som driver försäljning.',
  ctaNotShopify: 'Inte Shopify? Boka ett samtal',
};

/* Animation variants */
const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.2 } }),
};

/* Back button */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {SE.back}
    </button>
  );
}

/* Progress bar */
function ProgressBar({ step }: { step: number }) {
  const progress = Math.min(step / 6, 1);
  return (
    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className="h-full bg-zilla-neon rounded-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function QuizSE() {
  const router = useRouter();
  const angle = (router.query.angle as string) || '';
  const meta = ANGLE_META[angle] || DEFAULT_META;

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Answers
  const [storeUrl, setStoreUrl] = useState('');
  const [revenueRange, setRevenueRange] = useState<RevenueRange | null>(null);
  const [creatorSpend, setCreatorSpend] = useState<SpendRange | null>(null);
  const [creatorCount, setCreatorCount] = useState<CreatorCount | null>(null);
  const [platforms, setPlatforms] = useState<QuizPlatform[]>([]);
  const [trackingMethod, setTrackingMethod] = useState<TrackingMethod | null>(null);

  // Lead
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');

  // Result
  const [result, setResult] = useState<QuizResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

  const goTo = useCallback((s: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setStep(s);
  }, []);

  // Animate score
  useEffect(() => {
    if (!result || step !== 7) return;
    const duration = 1800;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * result!.score));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [result, step]);

  function handleTrackingNext(value: TrackingMethod) {
    setTrackingMethod(value);
    const answers: QuizAnswers = {
      storeUrl,
      revenueRange: revenueRange!,
      creatorSpend: creatorSpend!,
      creatorCount: creatorCount!,
      platforms,
      trackingMethod: value,
    };
    setResult(calculateQuizResult(answers));
    goTo(7);
  }

  function handleEmailSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError(SE.emailError);
      return;
    }
    setEmailError('');
    const payload: QuizLeadPayload = {
      storeUrl,
      email: trimmed,
      phone: phone.trim(),
      score: result!.score,
      leakEstimate: result!.leakEstimate,
      revenueRange: revenueRange!,
      platforms,
      trackingMethod: trackingMethod!,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem('growzilla_quiz_lead', JSON.stringify({ ...payload, angle, lang: 'se' }));
    console.log('Quiz lead (SE):', payload);
    goTo(9);
  }

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center px-4 py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-zilla-neon animate-pulse" />
              <span className="text-xs font-mono text-zilla-neon tracking-wide uppercase">{SE.badge}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-xl mb-6">
              {meta.introHeadline.includes('läcker') ? (
                <>
                  {meta.introHeadline.split('läcker')[0]}
                  <span className="text-zilla-neon text-glow">läcker</span>
                  {meta.introHeadline.split('läcker')[1]}
                </>
              ) : meta.introHeadline}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-md mb-10">{SE.introSub}</p>
            <motion.button onClick={() => goTo(1)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-zilla text-base sm:text-lg px-10 py-4 rounded-xl">
              {SE.introCta} &rarr;
            </motion.button>
            <p className="text-xs text-gray-500 mt-6 max-w-sm">{SE.introTrust}</p>
          </motion.div>
        );

      case 1:
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(0, -1)} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{SE.storeUrlTitle}</h2>
            <p className="text-sm text-gray-500 mb-8">{SE.storeUrlSub}</p>
            <input type="text" value={storeUrl} onChange={(e) => setStoreUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { const v = storeUrl.trim().toLowerCase(); if (v) { setStoreUrl(v); goTo(2); } } }}
              placeholder={SE.storeUrlPlaceholder}
              className="w-full rounded-xl border border-white/10 bg-zilla-charcoal/40 px-4 py-4 text-white placeholder:text-gray-600 focus:border-zilla-neon/50 focus:outline-none focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
              autoFocus />
            <motion.button onClick={() => { const v = storeUrl.trim().toLowerCase(); if (v) { setStoreUrl(v); goTo(2); } }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn-zilla w-full mt-6 py-4 rounded-xl text-base">
              {SE.next} &rarr;
            </motion.button>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(1, -1)} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">{SE.revenueTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SE.revenueOptions.map((opt) => (
                <QuizOptionCard key={opt.value} label={opt.label} selected={revenueRange === opt.value}
                  onClick={() => { setRevenueRange(opt.value); setTimeout(() => goTo(3), 300); }} />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(2, -1)} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">{SE.spendTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SE.spendOptions.map((opt) => (
                <QuizOptionCard key={opt.value} label={opt.label} selected={creatorSpend === opt.value}
                  onClick={() => { setCreatorSpend(opt.value); setTimeout(() => goTo(4), 300); }} />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(3, -1)} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">{SE.countTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SE.countOptions.map((opt) => (
                <QuizOptionCard key={opt.value} label={opt.label} selected={creatorCount === opt.value}
                  onClick={() => { setCreatorCount(opt.value); setTimeout(() => goTo(5), 300); }} />
              ))}
            </div>
          </div>
        );

      case 5: {
        const [sel, setSel] = useState<QuizPlatform[]>(platforms);
        const toggle = (p: QuizPlatform) => setSel((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(4, -1)} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{SE.platformsTitle}</h2>
            <p className="text-sm text-gray-500 mb-8">{SE.platformsSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SE.platformOptions.map((opt) => (
                <QuizOptionCard key={opt.value} label={opt.label} selected={sel.includes(opt.value)}
                  onClick={() => toggle(opt.value)} multiSelect />
              ))}
            </div>
            <motion.button onClick={() => { if (sel.length > 0) { setPlatforms(sel); goTo(6); } }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={sel.length === 0}
              className="btn-zilla w-full mt-6 py-4 rounded-xl text-base disabled:opacity-40 disabled:cursor-not-allowed">
              {SE.next} &rarr;
            </motion.button>
          </div>
        );
      }

      case 6:
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(5, -1)} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-8">{SE.trackingTitle}</h2>
            <div className="grid grid-cols-1 gap-3">
              {SE.trackingOptions.map((opt) => (
                <QuizOptionCard key={opt.value} label={opt.label} selected={trackingMethod === opt.value}
                  onClick={() => { setTimeout(() => handleTrackingNext(opt.value), 300); }} />
              ))}
            </div>
          </div>
        );

      case 7: {
        if (!result) return null;
        const bucketColor = BUCKET_COLORS[result.bucket];
        const bucketLabel = BUCKET_LABELS[result.bucket];
        const radius = 70;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference * (1 - result.score / 100);
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex flex-col items-center">
              <div className="relative mb-6">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <motion.circle cx="90" cy="90" r={radius} fill="none" stroke={bucketColor} strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    transform="rotate(-90 90 90)" style={{ filter: `drop-shadow(0 0 8px ${bucketColor}40)` }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-4xl font-bold text-white">{displayScore}</span>
                  <span className="text-xs text-gray-500">/ 100</span>
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold mb-4"
                style={{ backgroundColor: `${bucketColor}15`, color: bucketColor }}>{bucketLabel}</span>
              <p className="text-gray-400 text-sm mb-1">{SE.resultsLeakLabel}</p>
              <p className="font-mono text-3xl sm:text-4xl font-bold text-white mb-8">
                ${result.leakEstimate.toLocaleString()}<span className="text-lg text-gray-500">/mån</span>
              </p>
              <div className="w-full card-zilla p-6 mb-8">
                <QuizLeakChart breakdown={result.breakdown} leakEstimate={result.leakEstimate} />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed text-center mb-10">{result.headline}</p>
              <motion.button onClick={() => goTo(8)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-zilla w-full py-4 rounded-xl text-base">
                {SE.resultsUnlockCta} &rarr;
              </motion.button>
            </motion.div>
          </div>
        );
      }

      case 8:
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <BackBtn onClick={() => goTo(7, -1)} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">{SE.emailTitle}</h2>
              <p className="text-sm text-gray-500 mb-8">{SE.emailSub}</p>
              <div className="space-y-4">
                <div>
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder={SE.emailPlaceholder}
                    className="w-full rounded-xl border border-white/10 bg-zilla-charcoal/40 px-4 py-4 text-white placeholder:text-gray-600 focus:border-zilla-neon/50 focus:outline-none focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
                    autoFocus />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                </div>
                <div>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                    placeholder={SE.phonePlaceholder}
                    className="w-full rounded-xl border border-white/10 bg-zilla-charcoal/40 px-4 py-4 text-white placeholder:text-gray-600 focus:border-zilla-neon/50 focus:outline-none focus:ring-1 focus:ring-zilla-neon/30 transition-colors" />
                  <p className="text-xs text-gray-600 mt-1">{SE.phoneOptional}</p>
                </div>
              </div>
              <motion.button onClick={handleEmailSubmit} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="btn-zilla w-full mt-6 py-4 rounded-xl text-base">
                {SE.emailCta} &rarr;
              </motion.button>
              <p className="text-xs text-gray-600 text-center mt-4">{SE.emailPrivacy}</p>
            </motion.div>
          </div>
        );

      case 9: {
        if (!result) return null;
        const bucketColor = BUCKET_COLORS[result.bucket];
        const bucketLabel = BUCKET_LABELS[result.bucket];
        return (
          <div className="w-full max-w-lg mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6"
                style={{ backgroundColor: `${bucketColor}15`, color: bucketColor }}>
                Risk Score: {result.score}/100 — {bucketLabel}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-2">{SE.fullTitle}</h2>
              <p className="font-mono text-3xl font-bold text-zilla-neon mb-8">
                ${result.leakEstimate.toLocaleString()}<span className="text-lg text-gray-500">/mån</span>
              </p>
              <div className="card-zilla p-6 mb-6 w-full">
                <p className="text-sm text-gray-300 leading-relaxed">{result.insight}</p>
              </div>
              <div className="card-zilla p-6 mb-6 w-full">
                <h3 className="text-sm font-medium text-white mb-4">{SE.leakBreakdown}</h3>
                <QuizLeakChart breakdown={result.breakdown} leakEstimate={result.leakEstimate} />
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mb-8">
                <div className="card-zilla p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">{SE.annualImpact}</p>
                  <p className="font-mono text-lg font-bold text-white">${(result.leakEstimate * 12).toLocaleString()}</p>
                </div>
                <div className="card-zilla p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">{SE.leakRate}</p>
                  <p className="font-mono text-lg font-bold" style={{ color: bucketColor }}>
                    {(0.08 + (result.score / 100) * 0.22).toFixed(0)}%
                  </p>
                </div>
              </div>
              {/* Shopify Install CTA */}
              <div className="w-full space-y-4">
                <motion.a
                  href="https://admin.shopify.com/?organization_id=188510280&no_redirect=true&redirect=/oauth/redirect_from_developer_dashboard?client_id%3D105493379cce87ef972e01a90be856b4"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="btn-zilla w-full py-5 rounded-xl text-base sm:text-lg text-center block font-semibold">
                  {SE.ctaInstall} &rarr;
                </motion.a>
                <p className="text-sm text-gray-400 text-center">{SE.ctaInstallSub}</p>

                <div className="pt-4 border-t border-white/[0.06]">
                  <motion.a
                    href="https://calendly.com/albert-growzilla/growzilla-demo"
                    target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-sm text-center block text-gray-400 hover:text-white transition-colors">
                    {SE.ctaNotShopify} &rarr;
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        );
      }

      default:
        return null;
    }
  }

  return (
    <>
      <Head>
        <title>{meta.ogTitle}</title>
        <meta name="description" content={meta.ogDesc} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://growzilla.xyz/quiz/se${angle ? `?angle=${angle}` : ''}`} />
        <meta property="og:image" content="https://growzilla.xyz/images/growzilla-kaiju.png" />
        <meta property="og:locale" content="sv_SE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.ogTitle} />
        <meta name="twitter:description" content={meta.ogDesc} />
      </Head>

      <div className="min-h-screen bg-zilla-black">
        <div className="fixed inset-0 bg-grid-zilla opacity-30 pointer-events-none" />
        <div className="fixed inset-0 bg-zilla-radial pointer-events-none" />

        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-zilla-neon flex items-center justify-center">
                <span className="text-zilla-black font-bold text-xs">G</span>
              </div>
              <span className="font-display font-bold text-white text-sm tracking-wide group-hover:text-zilla-neon transition-colors">
                GROWZILLA
              </span>
            </Link>
          </div>
        </nav>

        {/* Progress */}
        {step >= 1 && step <= 6 && (
          <div className="sticky top-[53px] z-40 bg-black/80 backdrop-blur-sm px-4 py-2">
            <div className="max-w-lg mx-auto"><ProgressBar step={step} /></div>
          </div>
        )}

        {/* Content */}
        <main className="relative z-10 max-w-5xl mx-auto py-8 sm:py-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={variants} initial="enter" animate="center" exit="exit">
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/[0.06] py-8 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-zilla-neon flex items-center justify-center">
                <span className="text-zilla-black font-bold text-[8px]">G</span>
              </div>
              <span className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Growzilla</span>
            </div>
            <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Integritetspolicy</a>
          </div>
        </footer>
      </div>
    </>
  );
}
