import React, { useEffect, useState } from 'react';
import { ClockIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface CountdownBannerProps {
  targetDate?: string;
  theme?: 'blue' | 'green';
}

const getTimeLeft = (target: Date) => {
  const diff = target.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);
  return { days, hours, minutes, seconds };
};

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ targetDate, theme = 'green' }) => {
  // Set target to end of current month for urgency
  const now = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const target = targetDate ? new Date(targetDate) : endOfMonth;

  const [left, setLeft] = useState(getTimeLeft(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Urgency message */}
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <SparklesIcon className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-medium">
              <span className="text-amber-400 font-bold">Only 5 spots left</span>
              {' '}for January growth cohort
            </span>
          </div>

          {/* Countdown timer */}
          {mounted && (
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-1 font-mono text-sm">
                <span className="bg-white/10 px-2 py-1 rounded text-green-400 font-bold">
                  {pad(left.days)}d
                </span>
                <span className="text-gray-500">:</span>
                <span className="bg-white/10 px-2 py-1 rounded text-green-400 font-bold">
                  {pad(left.hours)}h
                </span>
                <span className="text-gray-500">:</span>
                <span className="bg-white/10 px-2 py-1 rounded text-green-400 font-bold">
                  {pad(left.minutes)}m
                </span>
                <span className="text-gray-500">:</span>
                <span className="bg-white/10 px-2 py-1 rounded text-green-400 font-bold">
                  {pad(left.seconds)}s
                </span>
              </div>
            </div>
          )}

          {/* CTA */}
          <a
            href="#calendly"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Claim Your Spot
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
