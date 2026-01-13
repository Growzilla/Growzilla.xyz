import React, { useState } from 'react';
import {
  UserGroupIcon,
  TrophyIcon,
  FireIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const DISCORD_URL = 'https://discord.gg/dFgyfdW8';

interface CohortMember {
  name: string;
  store: string;
  avatar: string;
  growth: string;
  rank: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: number;
  prize: string;
  status: 'active' | 'upcoming' | 'completed';
}

const leaderboardData: CohortMember[] = [
  { name: 'Sarah K.', store: 'LuxeBeauty Co', avatar: 'S', growth: '+312%', rank: 1 },
  { name: 'Marcus T.', store: 'UrbanFit Gear', avatar: 'M', growth: '+287%', rank: 2 },
  { name: 'Emily R.', store: 'PetParadise', avatar: 'E', growth: '+245%', rank: 3 },
  { name: 'James L.', store: 'TechGadgets', avatar: 'J', growth: '+198%', rank: 4 },
  { name: 'Nina P.', store: 'HomeVibes', avatar: 'N', growth: '+176%', rank: 5 },
];

const challenges: Challenge[] = [
  {
    id: '1',
    title: '30-Day Stomp Challenge',
    description: 'Fix one conversion leak every day for 30 days. Document your progress.',
    duration: '30 days',
    participants: 147,
    prize: '$5,000 + 1-Year Free',
    status: 'active',
  },
  {
    id: '2',
    title: 'Leak Hunt Friday',
    description: 'Weekly community store audit. Get your store reviewed by the herd.',
    duration: 'Every Friday',
    participants: 89,
    prize: 'Free Strategy Call',
    status: 'active',
  },
  {
    id: '3',
    title: 'Monster Mastermind',
    description: 'Monthly strategy sessions with 7-figure store owners.',
    duration: 'Monthly',
    participants: 24,
    prize: 'Exclusive Access',
    status: 'upcoming',
  },
];

const communityStats = [
  { label: 'Active Members', value: '2,400+', icon: UserGroupIcon },
  { label: 'Total Revenue Generated', value: '$127M+', icon: ArrowTrendingUpIcon },
  { label: 'Leaks Fixed', value: '47,000+', icon: FireIcon },
  { label: 'Avg. Member Growth', value: '+156%', icon: RocketLaunchIcon },
];

// Rank badge component
const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  const colors = {
    1: 'bg-gradient-to-br from-yellow-400 to-amber-500 text-yellow-900',
    2: 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800',
    3: 'bg-gradient-to-br from-amber-600 to-amber-700 text-amber-100',
  };

  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
        colors[rank as keyof typeof colors] || 'bg-zilla-charcoal text-gray-400'
      }`}
    >
      {rank}
    </div>
  );
};

export const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'challenges'>('leaderboard');

  return (
    <section id="community" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zilla-black via-zilla-dark to-zilla-black" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-zilla opacity-30" />

      {/* Accent glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zilla-neon/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zilla-neon/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zilla-neon/10 border border-zilla-neon/30 text-zilla-neon text-sm font-medium mb-6">
            <UserGroupIcon className="w-4 h-4" />
            JOIN THE MOVEMENT
          </div>

          <h2 className="heading-zilla mb-6">
            WELCOME TO{' '}
            <span className="text-shimmer">THE HERD</span>
          </h2>

          <p className="subheading-zilla mx-auto">
            You're not just getting software. You're joining an elite community of Shopify brands
            <span className="text-zilla-neon font-semibold"> crushing it together</span>. Weekly challenges,
            leaderboards, masterminds, and real accountability.
          </p>
        </div>

        {/* Community stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {communityStats.map((stat) => (
            <div
              key={stat.label}
              className="card-zilla text-center"
            >
              <stat.icon className="w-8 h-8 text-zilla-neon mx-auto mb-3" />
              <div className="font-display text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left column - Community features */}
          <div className="lg:col-span-2 space-y-6">
            {/* Discord CTA */}
            <div className="card-zilla border-zilla-neon/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#5865F2]/20">
                  <svg className="w-8 h-8 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">The Herd Discord</h3>
                  <p className="text-sm text-gray-400">24/7 support, wins, strategies</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Join 2,400+ store owners sharing wins, strategies, and holding each other accountable.
                This is where the real growth happens.
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-zilla w-full justify-center"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Join Discord (Free)
              </a>
            </div>

            {/* Community perks */}
            <div className="space-y-3">
              {[
                { icon: CalendarIcon, title: 'Weekly Store Reviews', desc: 'Get expert feedback on your store' },
                { icon: TrophyIcon, title: 'Monthly Challenges', desc: 'Compete for prizes and recognition' },
                { icon: CheckBadgeIcon, title: 'Exclusive Resources', desc: 'Templates, scripts, and frameworks' },
              ].map((perk) => (
                <div
                  key={perk.title}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zilla-charcoal/30 border border-zilla-neon/10 hover:border-zilla-neon/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-zilla-neon/10">
                    <perk.icon className="w-5 h-5 text-zilla-neon" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{perk.title}</h4>
                    <p className="text-sm text-gray-500">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Leaderboard & Challenges */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-zilla-neon text-zilla-black'
                    : 'bg-zilla-charcoal/50 text-gray-400 hover:text-white'
                }`}
              >
                <TrophyIcon className="w-5 h-5 inline mr-2" />
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === 'challenges'
                    ? 'bg-zilla-neon text-zilla-black'
                    : 'bg-zilla-charcoal/50 text-gray-400 hover:text-white'
                }`}
              >
                <FireIcon className="w-5 h-5 inline mr-2" />
                Challenges
              </button>
            </div>

            {/* Tab content */}
            {activeTab === 'leaderboard' ? (
              <div className="card-zilla">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl text-white">THIS MONTH'S TOP PERFORMERS</h3>
                  <span className="text-sm text-gray-500">Revenue Growth</span>
                </div>

                <div className="space-y-3">
                  {leaderboardData.map((member, index) => (
                    <div
                      key={member.name}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30'
                          : 'bg-zilla-charcoal/30 hover:bg-zilla-charcoal/50'
                      }`}
                    >
                      <RankBadge rank={member.rank} />

                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zilla-neon to-zilla-acid flex items-center justify-center text-zilla-black font-bold">
                        {member.avatar}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{member.name}</span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400">
                              ZILLA KING
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{member.store}</span>
                      </div>

                      <div className="text-right">
                        <div className="font-display text-xl text-zilla-neon">{member.growth}</div>
                        <div className="text-xs text-gray-500">this month</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                  <p className="text-sm text-gray-400 mb-3">
                    Want to see your name here? Join the herd and start competing.
                  </p>
                  <a href="#cta" className="btn-zilla-outline text-sm">
                    Start Your Journey
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`card-zilla ${
                      challenge.status === 'active'
                        ? 'border-zilla-neon/30'
                        : 'opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{challenge.title}</h4>
                          {challenge.status === 'active' && (
                            <span className="px-2 py-0.5 rounded text-xs bg-zilla-neon/20 text-zilla-neon animate-pulse">
                              LIVE
                            </span>
                          )}
                          {challenge.status === 'upcoming' && (
                            <span className="px-2 py-0.5 rounded text-xs bg-zilla-warning/20 text-zilla-warning">
                              SOON
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{challenge.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <CalendarIcon className="w-4 h-4" />
                        {challenge.duration}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <UserGroupIcon className="w-4 h-4" />
                        {challenge.participants} participants
                      </div>
                      <div className="flex items-center gap-1 text-zilla-neon">
                        <TrophyIcon className="w-4 h-4" />
                        {challenge.prize}
                      </div>
                    </div>

                    {challenge.status === 'active' && (
                      <button className="mt-4 w-full btn-zilla-outline text-sm">
                        Join Challenge
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityHub;
