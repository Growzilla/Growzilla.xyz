/** Ground-up LinkedIn sales engine landing copy */

export const ENGINE = {
  brand: 'Growzilla',
  legal: 'RolloutFactory Inc.',
  cta: 'Check fit & book →',
  ctaHref: '/call',
  secondary: 'See the system',
  secondaryHref: '#system',

  hero: {
    eyebrow: 'LinkedIn sales engine · B2B SaaS',
    sub: 'Book 5–10 qualified meetings with ideal buyers every week — without living in outreach.',
    trust: ['No long contracts', 'Results in 30 days', 'Risk-free guarantee'],
  },

  connect: {
    eyebrow: 'How it starts',
    title: 'Connect LinkedIn once. We run the motion.',
    body: 'Secure access to your founder profile — and optionally the company page. Content, engagement, and booking run as one system.',
    from: 'Your LinkedIn',
    to: 'Growzilla engine',
    outcomes: ['Content that builds trust', 'Warm outreach to ICP', 'Calls on your calendar'],
  },

  reality: {
    eyebrow: 'The reality',
    title: 'You already know how to build. Getting out is the hard part.',
    cards: [
      {
        title: 'Empty calendar',
        body: 'Product is real. Pipeline of buyers who already trust you is not.',
        tone: 'mute' as const,
      },
      {
        title: 'Founder as SDR',
        body: 'Prospecting eats the week. Closing and product get the leftovers.',
        tone: 'electric' as const,
      },
      {
        title: 'Tools, no execution',
        body: 'Sequencers are cheap. Consistent content plus real conversations is rare.',
        tone: 'neon' as const,
      },
    ],
  },

  outcome: {
    eyebrow: 'The outcome',
    title: 'Your calendar fills with buyers. You close.',
    items: [
      '5–10 booked ICP meetings every week as the system compounds',
      'WhatsApp the moment a meeting is set',
      'Content that compounds on founder profile + company page',
      'Path to 20+ clients without hiring a full sales org early',
    ],
  },

  system: {
    eyebrow: 'The system',
    title: 'Four steps. One engine.',
    steps: [
      {
        n: '01',
        title: 'Connect',
        body: 'LinkedIn access, ICP freeze, Calendly. Assessment in days — not weeks.',
        color: 'electric' as const,
      },
      {
        n: '02',
        title: 'Publish',
        body: 'Founder-led posts that create visibility so outreach lands warm.',
        color: 'electric' as const,
      },
      {
        n: '03',
        title: 'Engage',
        body: 'Human conversations with decision-makers. No blast spam.',
        color: 'neon' as const,
      },
      {
        n: '04',
        title: 'Book',
        body: 'Meetings on your calendar. Instant WhatsApp when they confirm.',
        color: 'neon' as const,
      },
    ],
  },

  journey: {
    eyebrow: 'First 30 days',
    title: 'Results compound. Every week makes the next easier.',
    weeks: [
      { label: 'Week 1', title: 'Assess & setup', body: 'ICP, access, baseline content.', color: 'electric' as const },
      { label: 'Week 2', title: 'Engine live', body: 'Posts live. First outreach.', color: 'electric' as const },
      { label: 'Week 3', title: 'Conversations', body: 'Replies stack. Messaging tightens.', color: 'neon' as const },
      { label: 'Week 4', title: 'Meetings weekly', body: '5+ qualified calls in motion.', color: 'neon' as const },
    ],
  },

  proof: {
    eyebrow: 'Profile maturity',
    title: 'Presence gets meetings. Silence gets ignored.',
    caption: 'Illustrative of how trust compounds — results vary by ICP and consistency.',
    before: {
      metric: '~10%',
      label: 'Connection acceptance',
      points: ['Quiet profile', 'No consistent posts', 'Cold outreach ignored'],
    },
    after: {
      metric: '90%+',
      label: 'Connection acceptance',
      points: ['Strong personal brand', 'High-signal posts', 'Warm conversations daily'],
    },
  },

  pricing: {
    eyebrow: 'Investment',
    title: 'One engine. Clear price. Real guarantee.',
    product: 'LinkedIn sales engine · done for you',
    price: 500,
    period: '/ month',
    included: [
      'Full content system + outreach',
      '5–10 qualified meetings / week target',
      'WhatsApp real-time notifications',
      'Founder + company LinkedIn managed',
    ],
    footnote: '$500 to start · $500 end deposit after first results · until 20 clients',
    guaranteeTitle: 'Minimum 5 booked client calls in month 1.',
    guaranteeBody:
      'If we miss, we keep working until you hit it. End deposit only after results.',
  },

  freedom: {
    eyebrow: 'What you get back',
    title: 'Time for the work only you can do.',
    items: [
      { title: 'Close buyers', body: 'Show up to people who already raised their hand.' },
      { title: 'Hire right', body: 'Don’t use founder hours as a permanent SDR.' },
      { title: 'Ship product', body: 'Leave LinkedIn ops to the engine.' },
      { title: 'Be seen', body: 'Investors and dream customers find you first.' },
    ],
  },

  team: {
    eyebrow: 'Operations',
    title: 'The people behind the pipeline.',
    members: [
      {
        name: 'Albert Elmgart',
        role: 'Partner',
        quote: 'Systems that scale. Clear ownership on every partnership.',
        image: '/images/team/albert.png' as string | null,
        linkedin: 'https://linkedin.com/in/albert-elmgart' as string | null,
      },
      {
        name: 'Account Executive',
        role: 'Client fit & pipeline',
        quote: 'Exact program fit for your stage — then keep the calendar full.',
        image: null as string | null,
        linkedin: null as string | null,
      },
      {
        name: 'Jayleen Ko',
        role: 'CMO · AI',
        quote: 'Strategy, testing, and scale. Always on behind every account.',
        image: '/images/team/jayleen.jpeg' as string | null,
        linkedin: 'https://www.linkedin.com/in/jayleen-ko-6412b3418/' as string | null,
      },
    ],
  },

  clients: ['Agentflow', 'Longsword Digital'],

  close: {
    eyebrow: 'Next step',
    title: 'Not another agency.',
    sub: 'Your LinkedIn — as a predictable revenue machine.',
    note: 'Takes 15 minutes. Honest yes or no.',
  },

  footer: {
    tagline: 'Built for B2B SaaS founders who want predictable pipeline without the chaos.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/albert-elmgart/' },
      { label: 'X', href: 'https://x.com/ascendergrey' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Content Factory', href: '/content' },
    ],
  },
} as const;
