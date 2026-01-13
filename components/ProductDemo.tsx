import React from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

const ProductDemo: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See RetailOS in Action
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Watch how RetailOS transforms raw visitor data into actionable insights that boost your conversion rate.
          </p>
        </div>
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
          <div className="absolute inset-0 bg-[url('/images/Dashboard/DashboardRetailOS.png')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <PlayCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
              <p className="text-white/80 text-sm sm:text-base font-medium">
                Demo Coming Soon
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/60 text-xs sm:text-sm">
            <span>2 min watch</span>
            <span>No audio required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
