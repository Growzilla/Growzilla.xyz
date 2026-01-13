import React, { useState } from 'react';
import { TrophyIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Award {
  id: string;
  name: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  threshold: string;
  description: string;
  perks: string[];
  members: number;
  icon: string;
}

const awards: Award[] = [
  {
    id: 'bronze',
    name: 'BRONZE ZILLA',
    tier: 'bronze',
    threshold: '$100K/mo',
    description: 'First major milestone. You\'ve proven the concept works.',
    perks: [
      'Bronze Zilla badge',
      'Community recognition',
      'Exclusive merch pack',
      'Monthly strategy call',
    ],
    members: 847,
    icon: '🦎',
  },
  {
    id: 'silver',
    name: 'SILVER ZILLA',
    tier: 'silver',
    threshold: '$250K/mo',
    description: 'Scaling with confidence. Your systems are dialed in.',
    perks: [
      'Silver Zilla badge',
      'Priority support access',
      'Quarterly mastermind invite',
      'Custom optimization audit',
    ],
    members: 312,
    icon: '🐊',
  },
  {
    id: 'gold',
    name: 'GOLD ZILLA',
    tier: 'gold',
    threshold: '$500K/mo',
    description: 'Elite status. You\'re in the top 1% of Shopify brands.',
    perks: [
      'Gold Zilla badge',
      'Direct founder access',
      'Annual retreat invitation',
      'Case study feature',
    ],
    members: 89,
    icon: '🐉',
  },
  {
    id: 'diamond',
    name: 'DIAMOND ZILLA',
    tier: 'diamond',
    threshold: '$1M+/mo',
    description: 'Legendary. You\'re building an empire.',
    perks: [
      'Diamond Zilla badge',
      'Lifetime Growzilla access',
      'Keynote speaker opportunities',
      'Equity partnership options',
    ],
    members: 24,
    icon: '👑',
  },
];

const tierColors = {
  bronze: {
    bg: 'from-amber-700/20 to-amber-900/20',
    border: 'border-amber-600/50',
    text: 'text-amber-400',
    glow: '0 0 30px rgba(217, 119, 6, 0.3)',
    gradient: 'from-amber-600 to-amber-800',
  },
  silver: {
    bg: 'from-gray-400/20 to-gray-600/20',
    border: 'border-gray-400/50',
    text: 'text-gray-300',
    glow: '0 0 30px rgba(156, 163, 175, 0.3)',
    gradient: 'from-gray-300 to-gray-500',
  },
  gold: {
    bg: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    glow: '0 0 40px rgba(234, 179, 8, 0.4)',
    gradient: 'from-yellow-400 to-amber-500',
  },
  diamond: {
    bg: 'from-cyan-400/20 to-purple-500/20',
    border: 'border-cyan-400/50',
    text: 'text-cyan-300',
    glow: '0 0 50px rgba(34, 211, 238, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)',
    gradient: 'from-cyan-400 via-purple-400 to-pink-400',
  },
};

// Award badge component
const AwardBadge: React.FC<{ tier: Award['tier']; size?: 'sm' | 'md' | 'lg' }> = ({
  tier,
  size = 'md',
}) => {
  const colors = tierColors[tier];
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center relative`}
      style={{ boxShadow: colors.glow }}
    >
      {/* Inner glow */}
      <div className="absolute inset-1 rounded-full bg-zilla-black/50" />
      <TrophyIcon className={`relative ${size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'} ${colors.text}`} />
    </div>
  );
};

// Recent winners ticker
const RecentWinners: React.FC = () => {
  const winners = [
    { name: 'StyleHaven', tier: 'gold', date: '2 days ago' },
    { name: 'FitLife Co', tier: 'silver', date: '3 days ago' },
    { name: 'PetPals', tier: 'bronze', date: '5 days ago' },
    { name: 'TechNest', tier: 'diamond', date: '1 week ago' },
    { name: 'BeautyBox', tier: 'gold', date: '1 week ago' },
  ];

  return (
    <div className="overflow-hidden relative">
      <div className="flex animate-scroll gap-8">
        {[...winners, ...winners].map((winner, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-zilla-charcoal/50 border border-zilla-neon/10 whitespace-nowrap"
          >
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tierColors[winner.tier as keyof typeof tierColors].gradient}`} />
            <span className="text-white font-medium">{winner.name}</span>
            <span className={`text-sm ${tierColors[winner.tier as keyof typeof tierColors].text}`}>
              {winner.tier.toUpperCase()}
            </span>
            <span className="text-gray-500 text-sm">{winner.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ZillaScaleAwards: React.FC = () => {
  const [selectedAward, setSelectedAward] = useState<string>('gold');

  const currentAward = awards.find((a) => a.id === selectedAward) || awards[2];
  const colors = tierColors[currentAward.tier];

  return (
    <section id="awards" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-zilla-black" />

      {/* Dynamic glow based on selected tier */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${
            currentAward.tier === 'diamond'
              ? 'rgba(34, 211, 238, 0.1)'
              : currentAward.tier === 'gold'
              ? 'rgba(234, 179, 8, 0.1)'
              : currentAward.tier === 'silver'
              ? 'rgba(156, 163, 175, 0.1)'
              : 'rgba(217, 119, 6, 0.1)'
          } 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/10 border border-zilla-neon/30 text-zilla-neon text-sm font-medium mb-6">
            <TrophyIcon className="w-4 h-4" />
            ACHIEVEMENT SYSTEM
          </div>

          <h2 className="heading-zilla mb-6">
            <span className="text-shimmer">ZILLA SCALE</span>{' '}
            AWARDS
          </h2>

          <p className="subheading-zilla mx-auto">
            Recognition for brands crushing it with Growzilla. Hit the milestones,
            <span className="text-zilla-neon font-semibold"> earn your place in the herd hierarchy</span>.
            Real results. Real rewards.
          </p>
        </div>

        {/* Recent winners ticker */}
        <div className="mb-12">
          <div className="text-sm text-gray-500 uppercase tracking-wider mb-3 text-center">
            Recent Award Winners
          </div>
          <RecentWinners />
        </div>

        {/* Award tiers selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {awards.map((award) => {
            const awardColors = tierColors[award.tier];
            const isSelected = selectedAward === award.id;

            return (
              <button
                key={award.id}
                onClick={() => setSelectedAward(award.id)}
                className={`relative p-1 rounded-2xl transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  boxShadow: isSelected ? awardColors.glow : 'none',
                }}
              >
                <div
                  className={`px-6 py-4 rounded-xl bg-gradient-to-br ${awardColors.bg} border ${awardColors.border} backdrop-blur-sm`}
                >
                  <div className="text-2xl mb-1">{award.icon}</div>
                  <div className={`font-display text-sm ${awardColors.text}`}>{award.tier.toUpperCase()}</div>
                  <div className="text-xs text-gray-500">{award.threshold}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected award details */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Award visualization */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Glow rings */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  boxShadow: colors.glow,
                  transform: 'scale(1.5)',
                }}
              />

              <AwardBadge tier={currentAward.tier} size="lg" />

              {/* Sparkles */}
              {currentAward.tier === 'diamond' && (
                <>
                  <SparklesIcon className="absolute -top-4 -right-4 w-8 h-8 text-cyan-400 animate-pulse" />
                  <SparklesIcon className="absolute -bottom-2 -left-6 w-6 h-6 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </>
              )}
            </div>

            <div className="mt-8 text-center">
              <h3 className={`font-display text-4xl ${colors.text} mb-2`}>
                {currentAward.name}
              </h3>
              <div className="text-2xl text-white font-bold mb-2">{currentAward.threshold}</div>
              <p className="text-gray-400 max-w-md">{currentAward.description}</p>
            </div>

            {/* Member count */}
            <div className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-charcoal/50 border border-zilla-neon/10">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${colors.gradient} border-2 border-zilla-black`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">
                <span className={`font-semibold ${colors.text}`}>{currentAward.members}</span> members at this level
              </span>
            </div>
          </div>

          {/* Award perks */}
          <div>
            <h4 className="font-display text-xl text-white mb-6 flex items-center gap-2">
              <StarIcon className={`w-6 h-6 ${colors.text}`} />
              AWARD PERKS
            </h4>

            <div className="space-y-4">
              {currentAward.perks.map((perk, index) => (
                <div
                  key={perk}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border} transition-all duration-300`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <CheckCircleIcon className={`w-6 h-6 ${colors.text} flex-shrink-0`} />
                  <span className="text-white">{perk}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#cta"
                className="btn-zilla w-full justify-center group"
              >
                Start Your Journey to {currentAward.name}
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-sm text-gray-500 mt-3">
                Average time to {currentAward.tier}: {
                  currentAward.tier === 'bronze' ? '3-6 months' :
                  currentAward.tier === 'silver' ? '6-12 months' :
                  currentAward.tier === 'gold' ? '12-18 months' :
                  '18-24 months'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZillaScaleAwards;
