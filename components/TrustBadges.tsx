import React from 'react';
import { ShieldCheckIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

const TrustBadges: React.FC = () => {
  return (
    <section className="py-8 sm:py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {/* Badge 1 */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
              <ShieldCheckIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Complimentary Call</div>
              <div className="text-xs text-gray-400">No obligation</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-700"></div>

          {/* Badge 2 */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
              <LockClosedIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Confidential Process</div>
              <div className="text-xs text-gray-400">NDA available</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-700"></div>

          {/* Badge 3 */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
              <CheckBadgeIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Shopify Specialists</div>
              <div className="text-xs text-gray-400">Deep expertise</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-700"></div>

          {/* Badge 4 */}
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">$50M+ Unlocked</div>
              <div className="text-xs text-gray-400">For client brands</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
