import type { JobLocale, JobPosting } from '@/types/careers';

const JOBS: JobPosting[] = [
  {
    slug: 'creator-in-residence',
    location: 'Stockholm, Sweden',
    locales: ['en'],
    defaultLocale: 'en',
    continuous: true,
    active: true,
    content: {
      en: {
        title: 'Creator in Residence – Make AI founders go viral',
        summary:
          'On-site with funded AI startups. Film B-roll, hunt viral clips, make technical founders watchable.',
        meta: 'Stockholm, Sweden · On-site · Creative',
        intro:
          "We're a small team that goes on-site to AI startups and turns founders into scroll-stopping, actually entertaining content. We're looking for our first Creator in Residence in Stockholm. This is not a boring corporate job.",
        sections: [
          {
            heading: { en: "What you'll do" },
            list: {
              en: [
                'Go on-site with founders and film intentional B-roll that actually gets used.',
                'During interviews, hunt for 10-second and 30-second viral clips and ask the questions that make those moments land.',
                "Use hooks, humor, and energy so the content doesn't feel corporate or boring.",
                'Occasionally jump on client update calls.',
              ],
            },
            body: { en: '' },
          },
          {
            heading: { en: "We're looking for someone who" },
            list: {
              en: [
                'Has a strong "viral eye" — you know what performs on TikTok, Reels and Shorts.',
                'Naturally uses exaggerated hooks, jokes and engagement bait.',
                'Is magnetic on camera and comfortable looking straight into it.',
                'Can steer conversations toward clip-worthy moments while filming.',
                'Already posts their own video content (big advantage).',
                'Is charismatic and can build quick rapport with founders.',
                'Is reliable and actually shows up ready.',
              ],
            },
            body: { en: '' },
          },
          {
            heading: { en: 'Trial process' },
            body: {
              en: "We'll do 1–2 short on-site sessions together so you can show us your real energy and clipping instincts. If it clicks on both sides, we move forward together.",
            },
          },
          {
            heading: { en: 'What you get' },
            list: {
              en: [
                'Real portfolio work with funded AI startups.',
                'Direct exposure to the Stockholm startup scene.',
                'Flexible hours.',
                'The chance to help build something from the ground up with real creative freedom.',
              ],
            },
            body: { en: '' },
          },
        ],
        applyHeading: 'How to apply',
        applyNote:
          "Record a 60–90 second video on your phone introducing yourself and showing your energy. Tell us why this role excites you and give one example of content you saw recently that you would have made way better. Drop links to your Instagram, TikTok, LinkedIn or any videos you've made. We're reviewing fast and will set up trials this week/next week.",
      },
      sv: {
        title: '',
        summary: '',
        meta: '',
        intro: '',
        sections: [],
        applyHeading: '',
        applyNote: '',
      },
    },
    questions: [
      {
        id: 'why_excited',
        type: 'textarea',
        required: true,
        label: {
          en: 'Why does this role excite you?',
        },
        placeholder: {
          en: 'Tell us what draws you to this work...',
        },
      },
      {
        id: 'content_example',
        type: 'textarea',
        required: true,
        label: {
          en: 'One piece of content you saw recently that you would have made way better',
        },
        placeholder: {
          en: 'What was it, and what would you have done differently?',
        },
      },
      {
        id: 'instagram',
        type: 'url',
        label: { en: 'Instagram' },
        placeholder: { en: 'https://instagram.com/...' },
      },
      {
        id: 'tiktok',
        type: 'url',
        label: { en: 'TikTok' },
        placeholder: { en: 'https://tiktok.com/@...' },
      },
      {
        id: 'linkedin',
        type: 'url',
        label: { en: 'LinkedIn' },
        placeholder: { en: 'https://linkedin.com/in/...' },
      },
    ],
    uploads: {
      video: {
        required: true,
        maxMB: 100,
        accept: 'video/mp4,video/quicktime,video/webm',
        label: { en: 'Intro video (60–90 seconds)' },
        hint: {
          en: 'Record on your phone. Introduce yourself, show your energy, and explain why this role excites you.',
        },
      },
      resume: {
        required: false,
        maxMB: 5,
        accept: '.pdf,.doc,.docx,application/pdf',
        label: { en: 'Resume (optional)' },
      },
    },
  },
  {
    slug: 'b2b-closer',
    location: 'Sweden',
    locales: ['en', 'sv'],
    defaultLocale: 'sv',
    continuous: true,
    active: true,
    content: {
      en: {
        title: 'B2B Outbound Closer – Social Media for Funded AI Startups in Sweden',
        summary:
          '100% commission. Own the full pipeline — LinkedIn, X, discovery calls, close retainers with Swedish AI startups.',
        meta: 'Sweden · Remote · 100% Commission · Full Pipeline Ownership',
        intro:
          'Growzilla is hiring a high-agency B2B closer to sell social media management retainers to funded AI startups in Sweden. You work directly with the founder and own the entire sales process: reaching out to decision-makers via LinkedIn and X, booking and running discovery calls, and closing monthly retainers. We give you a vetted lead list — your job is to turn those leads into signed clients using modern, multi-channel outbound. Fully remote with complete schedule freedom. We only care about signed deals.',
        sections: [
          {
            heading: { en: 'What success looks like', sv: 'Så ser framgång ut' },
            body: {
              en: 'After the ramp period (most consistent people close their first deal in 30–60 days), you close at least 1 new client per month. We measure only on closed revenue.',
              sv: 'Efter ramp-perioden (de flesta som arbetar konsekvent stänger sin första affär inom 30–60 dagar) stänger du minst 1 ny kund per månad. Vi mäter enbart på stängd omsättning.',
            },
          },
          {
            heading: { en: 'Compensation (uncapped)', sv: 'Ersättning (oförändrad – taklös)' },
            list: {
              en: [
                '50% of deal value on close — average retainer €2,000/month (≈20,000 SEK) → you earn €1,000 per signed client upfront.',
                '20% recurring on the monthly retainer for the first 6 months the client stays (€400/month per active client).',
                'Equity opportunity in the US parent company for consistent performers.',
                'One good month with 2 closes + residuals from existing clients puts real money in your pocket — fast.',
              ],
              sv: [
                '50 % provision på affärens värde vid signering — genomsnittligt månadsavtal €2 000 (ca 20 000 SEK) → du tjänar €1 000 per signerad kund direkt.',
                '20 % återkommande provision på månadsavgiften de första 6 månaderna kunden är kvar (€400/månad per aktiv kund).',
                'Aktieoptioner i det amerikanska moderbolaget för de som levererar långsiktigt.',
                'En bra månad med 2 stängda affärer + residuals från befintliga kunder ger snabbt bra pengar.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'What we provide', sv: 'Vad vi erbjuder dig' },
            list: {
              en: [
                'Vetted lead list of Swedish funded AI startup founders & decision-makers.',
                'Full training on our offer, value proposition, discovery frameworks and objection handling.',
                'Messaging templates and guidance for LinkedIn and X outreach to startup founders.',
                'Optional weekly coaching calls with the founder (especially valuable in the first 90 days).',
                'Full ownership — no micromanagement, no required hours.',
              ],
              sv: [
                'Granskad leadlista med svenska finansierade AI-startups och deras beslutsfattare.',
                'Full onboarding på vårt erbjudande, värdeargument, discovery-ramverk och invändningshantering.',
                'Mallar och vägledning för effektiv LinkedIn- och X-outreach riktad mot startup-grundare.',
                'Möjlighet till veckovisa coachingsamtal med grundaren (särskilt värdefullt de första 90 dagarna).',
                'Fullt ägarskap – ingen micromanagement eller krav på fasta arbetstider.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'Responsibilities', sv: 'Dina ansvarsområden' },
            list: {
              en: [
                'Run multi-channel outbound (LinkedIn, X, strategic calls) to engage leads from the provided list.',
                'Book and run high-quality discovery calls with founders and decision-makers.',
                'Understand their social media goals and present tailored solutions.',
                'Close retainers and own the pipeline all the way to signed contract.',
                "Keep clean pipeline data and share what's working.",
              ],
              sv: [
                'Proaktiv multi-channel outreach (LinkedIn, X, strategiska samtal) mot leads från listan.',
                'Boka och genomföra högkvalitativa discovery calls med grundare och beslutsfattare.',
                'Förstå startupens mål med sociala medier och presentera skräddarsydda lösningar.',
                'Stänga avtal och äga pipelinen hela vägen till signerat kontrakt.',
                'Hålla pipelinen uppdaterad och dela vad som fungerar.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'You are a strong fit if you', sv: 'Du är en stark match om du' },
            list: {
              en: [
                'Have real B2B sales experience with a proven track record of closing deals.',
                'Are comfortable and effective doing outbound on LinkedIn and X to reach busy startup founders.',
                'Are fluent in Swedish at a professional/native level (C1/C2 or mother tongue) — non-negotiable.',
                'Have high personal agency and thrive with full ownership and zero hand-holding.',
                'Are coachable and want to get better every month.',
                'Are genuinely interested in the Swedish AI startup scene.',
              ],
              sv: [
                'Har gedigen erfarenhet av B2B-försäljning med bevisad track record av att stänga affärer.',
                'Är bekväm och effektiv med outbound via LinkedIn och X för att nå upptagna startup-grundare.',
                'Har flytande svenska på professionell/modersmålsnivå (C1/C2 eller bättre) — absolut krav.',
                'Har högt eget driv och trivs med fullt ägarskap utan någon som håller dig i handen.',
                'Är coachbar och vill utvecklas löpande.',
                'Är genuint intresserad av det svenska AI-startup-ekosystemet.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'This role is NOT for you if', sv: 'Detta är inte rollen för dig om du' },
            list: {
              en: [
                'Need any base salary, draw, or guaranteed income while ramping.',
                'Dislike proactive multi-channel outbound (LinkedIn + X + calls).',
                'Want daily management, check-ins, or structure to stay accountable.',
                'Are not fully fluent in Swedish for professional business conversations.',
              ],
              sv: [
                'Behöver grundlön, garantilön eller någon form av ekonomisk trygghet under uppstarten.',
                'Ogillar proaktiv multi-channel outbound (LinkedIn + X + samtal).',
                'Vill ha daglig ledning, check-ins eller mycket struktur för att prestera.',
                'Inte har flytande svenska för professionella affärssamtal.',
              ],
            },
            body: { en: '', sv: '' },
          },
        ],
        applyHeading: 'How to apply',
        applyNote:
          'Submit your CV and answer the screening questions below. We only move forward with candidates who clearly meet the bar on B2B closing experience and Swedish proficiency.',
      },
      sv: {
        title: 'B2B Outbound Closer – Sociala medier för finansierade AI-startups i Sverige',
        summary:
          '100 % provision. Äg hela pipelinen — LinkedIn, X, discovery calls, stäng avtal med svenska AI-startups.',
        meta: 'Sverige · Remote · 100 % provision · Fullt ägarskap över pipelinen',
        intro:
          'Growzilla söker en driven B2B-closer som vill sälja sociala medier-tjänster till finansierade AI-startups i Sverige. Du arbetar direkt med grundaren och äger hela försäljningsprocessen: du når ut till beslutsfattare via LinkedIn och X, bokar och genomför discovery calls samt stänger månadsavtal. Vi ger dig en granskad leadlista — ditt jobb är att omvandla leads till signerade kunder med modern, multi-channel outbound. Helt remote med full flexibilitet. Vi bryr oss bara om signerade affärer.',
        sections: [
          {
            heading: { en: 'What success looks like', sv: 'Så ser framgång ut' },
            body: {
              en: 'After the ramp period (most consistent people close their first deal in 30–60 days), you close at least 1 new client per month. We measure only on closed revenue.',
              sv: 'Efter ramp-perioden (de flesta som arbetar konsekvent stänger sin första affär inom 30–60 dagar) stänger du minst 1 ny kund per månad. Vi mäter enbart på stängd omsättning.',
            },
          },
          {
            heading: { en: 'Compensation (uncapped)', sv: 'Ersättning (oförändrad – taklös)' },
            list: {
              en: [
                '50% of deal value on close — average retainer €2,000/month (≈20,000 SEK) → you earn €1,000 per signed client upfront.',
                '20% recurring on the monthly retainer for the first 6 months the client stays (€400/month per active client).',
                'Equity opportunity in the US parent company for consistent performers.',
                'One good month with 2 closes + residuals from existing clients puts real money in your pocket — fast.',
              ],
              sv: [
                '50 % provision på affärens värde vid signering — genomsnittligt månadsavtal €2 000 (ca 20 000 SEK) → du tjänar €1 000 per signerad kund direkt.',
                '20 % återkommande provision på månadsavgiften de första 6 månaderna kunden är kvar (€400/månad per aktiv kund).',
                'Aktieoptioner i det amerikanska moderbolaget för de som levererar långsiktigt.',
                'En bra månad med 2 stängda affärer + residuals från befintliga kunder ger snabbt bra pengar.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'What we provide', sv: 'Vad vi erbjuder dig' },
            list: {
              en: [
                'Vetted lead list of Swedish funded AI startup founders & decision-makers.',
                'Full training on our offer, value proposition, discovery frameworks and objection handling.',
                'Messaging templates and guidance for LinkedIn and X outreach to startup founders.',
                'Optional weekly coaching calls with the founder (especially valuable in the first 90 days).',
                'Full ownership — no micromanagement, no required hours.',
              ],
              sv: [
                'Granskad leadlista med svenska finansierade AI-startups och deras beslutsfattare.',
                'Full onboarding på vårt erbjudande, värdeargument, discovery-ramverk och invändningshantering.',
                'Mallar och vägledning för effektiv LinkedIn- och X-outreach riktad mot startup-grundare.',
                'Möjlighet till veckovisa coachingsamtal med grundaren (särskilt värdefullt de första 90 dagarna).',
                'Fullt ägarskap – ingen micromanagement eller krav på fasta arbetstider.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'Responsibilities', sv: 'Dina ansvarsområden' },
            list: {
              en: [
                'Run multi-channel outbound (LinkedIn, X, strategic calls) to engage leads from the provided list.',
                'Book and run high-quality discovery calls with founders and decision-makers.',
                'Understand their social media goals and present tailored solutions.',
                'Close retainers and own the pipeline all the way to signed contract.',
                "Keep clean pipeline data and share what's working.",
              ],
              sv: [
                'Proaktiv multi-channel outreach (LinkedIn, X, strategiska samtal) mot leads från listan.',
                'Boka och genomföra högkvalitativa discovery calls med grundare och beslutsfattare.',
                'Förstå startupens mål med sociala medier och presentera skräddarsydda lösningar.',
                'Stänga avtal och äga pipelinen hela vägen till signerat kontrakt.',
                'Hålla pipelinen uppdaterad och dela vad som fungerar.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'You are a strong fit if you', sv: 'Du är en stark match om du' },
            list: {
              en: [
                'Have real B2B sales experience with a proven track record of closing deals.',
                'Are comfortable and effective doing outbound on LinkedIn and X to reach busy startup founders.',
                'Are fluent in Swedish at a professional/native level (C1/C2 or mother tongue) — non-negotiable.',
                'Have high personal agency and thrive with full ownership and zero hand-holding.',
                'Are coachable and want to get better every month.',
                'Are genuinely interested in the Swedish AI startup scene.',
              ],
              sv: [
                'Har gedigen erfarenhet av B2B-försäljning med bevisad track record av att stänga affärer.',
                'Är bekväm och effektiv med outbound via LinkedIn och X för att nå upptagna startup-grundare.',
                'Har flytande svenska på professionell/modersmålsnivå (C1/C2 eller bättre) — absolut krav.',
                'Har högt eget driv och trivs med fullt ägarskap utan någon som håller dig i handen.',
                'Är coachbar och vill utvecklas löpande.',
                'Är genuint intresserad av det svenska AI-startup-ekosystemet.',
              ],
            },
            body: { en: '', sv: '' },
          },
          {
            heading: { en: 'This role is NOT for you if', sv: 'Detta är inte rollen för dig om du' },
            list: {
              en: [
                'Need any base salary, draw, or guaranteed income while ramping.',
                'Dislike proactive multi-channel outbound (LinkedIn + X + calls).',
                'Want daily management, check-ins, or structure to stay accountable.',
                'Are not fully fluent in Swedish for professional business conversations.',
              ],
              sv: [
                'Behöver grundlön, garantilön eller någon form av ekonomisk trygghet under uppstarten.',
                'Ogillar proaktiv multi-channel outbound (LinkedIn + X + samtal).',
                'Vill ha daglig ledning, check-ins eller mycket struktur för att prestera.',
                'Inte har flytande svenska för professionella affärssamtal.',
              ],
            },
            body: { en: '', sv: '' },
          },
        ],
        applyHeading: 'Så ansöker du',
        applyNote:
          'Skicka in ditt CV och svara på screeningfrågorna nedan. Vi går bara vidare med kandidater som tydligt uppfyller kraven på B2B-stängarerfarenhet och svenska språkkunskaper.',
      },
    },
    questions: [
      {
        id: 'closing_track_record',
        type: 'textarea',
        required: true,
        label: {
          en: 'Describe your B2B closing track record — deals closed, average deal size, industries',
          sv: 'Beskriv din track record inom B2B-stängning — antal affärer, snittstorlek, branscher',
        },
        placeholder: {
          en: 'Be specific — numbers, industries, deal types...',
          sv: 'Var specifik — siffror, branscher, affärstyper...',
        },
      },
      {
        id: 'outreach_example',
        type: 'textarea',
        required: true,
        label: {
          en: 'Share a specific LinkedIn or X outreach that worked — what you sent, who responded, outcome',
          sv: 'Dela ett konkret exempel på LinkedIn- eller X-outreach som fungerade',
        },
        placeholder: {
          en: 'Paste the message or describe what you sent and what happened...',
          sv: 'Klistra in meddelandet eller beskriv vad du skickade och vad som hände...',
        },
      },
      {
        id: 'swedish_level',
        type: 'textarea',
        required: true,
        label: {
          en: 'Your Swedish level (C1/C2/native) and how you use Swedish in sales today',
          sv: 'Din svenska nivå (C1/C2/modersmål) och hur du använder svenska i försäljning idag',
        },
        placeholder: {
          en: 'e.g. Native Swedish speaker, run all discovery calls in Swedish...',
          sv: 't.ex. Modersmål svenska, kör alla discovery calls på svenska...',
        },
      },
      {
        id: 'why_commission',
        type: 'textarea',
        required: true,
        label: {
          en: 'Why does a fully autonomous, 100% commission role fit you?',
          sv: 'Varför passar en helt självständig 100%-provisionsroll dig?',
        },
        placeholder: {
          en: 'What about full ownership and uncapped commission motivates you?',
          sv: 'Vad motiverar dig med fullt ägarskap och taklös provision?',
        },
      },
      {
        id: 'linkedin_url',
        type: 'url',
        required: true,
        label: {
          en: 'LinkedIn profile URL',
          sv: 'LinkedIn-profil',
        },
        placeholder: {
          en: 'https://linkedin.com/in/...',
          sv: 'https://linkedin.com/in/...',
        },
      },
    ],
    uploads: {
      resume: {
        required: true,
        maxMB: 5,
        accept: '.pdf,.doc,.docx,application/pdf',
        label: {
          en: 'CV / Resume',
          sv: 'CV',
        },
        hint: {
          en: 'PDF preferred. Max 5 MB.',
          sv: 'PDF föredras. Max 5 MB.',
        },
      },
    },
  },
];

export function getAllJobs(): JobPosting[] {
  return JOBS.filter((j) => j.active);
}

export function getContinuousJobs(): JobPosting[] {
  return JOBS.filter((j) => j.active && j.continuous);
}

export function getJob(slug: string): JobPosting | undefined {
  return JOBS.find((j) => j.slug === slug && j.active);
}

export function getJobSlugs(): string[] {
  return JOBS.filter((j) => j.active).map((j) => j.slug);
}

export function resolveLocale(job: JobPosting, locale?: string): JobLocale {
  if (locale === 'en' || locale === 'sv') {
    if (job.locales.includes(locale)) return locale;
  }
  return job.defaultLocale;
}

export function getLocalizedContent(job: JobPosting, locale: JobLocale) {
  const content = job.content[locale] ?? job.content[job.defaultLocale];
  if (!content) {
    throw new Error(`Missing content for job ${job.slug}`);
  }
  return content;
}

export function getQuestionLabel(
  question: JobPosting['questions'][number],
  locale: JobLocale,
): string {
  return (
    question.label[locale] ??
    question.label.en ??
    question.label.sv ??
    question.id
  );
}