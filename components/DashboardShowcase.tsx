import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const SHOPIFY_OAUTH_URL = 'https://admin.shopify.com/?organization_id=188510280&no_redirect=true&redirect=/oauth/redirect_from_developer_dashboard?client_id%3D66b3c54575c0a7c7ff730a88faf84417';

const dashboardImages = [
  {
    src: '/images/Dashboard/DashboardRetailOS.png',
    title: 'Dashboard',
    description: 'Real-time overview of your store performance, conversions, and AI agent activity.',
  },
  {
    src: '/images/Dashboard/InsightsRetailOS.png',
    title: 'Insights',
    description: 'Deep analytics showing customer behavior patterns, objections, and conversion opportunities.',
  },
  {
    src: '/images/Dashboard/CustomersRetailOS.png',
    title: 'Customers',
    description: 'Customer segmentation, lifetime value tracking, and personalized engagement history.',
  },
  {
    src: '/images/Dashboard/ProductsRetailOS.png',
    title: 'Products',
    description: 'Product performance metrics, bundle recommendations, and inventory insights.',
  },
  {
    src: '/images/Dashboard/GrowthRetailOS.png',
    title: 'Growth',
    description: 'Revenue trends, AOV improvements, and predictive analytics for scaling your store.',
  },
];

export const DashboardShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % dashboardImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + dashboardImages.length) % dashboardImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="dashboard" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            See Your Store Through AI Eyes
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time intelligence that shows you exactly what's happening in your store — conversations, conversions, and opportunities.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
          {dashboardImages.map((image, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => goToImage(index)}
            >
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
              {currentIndex === index && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-600 rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden relative mb-8">
          <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="aspect-video bg-gray-100">
              <img
                src={dashboardImages[currentIndex].src}
                alt={dashboardImages[currentIndex].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{dashboardImages[currentIndex].title}</h3>
              <p className="text-sm text-gray-600">{dashboardImages[currentIndex].description}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg border border-gray-200 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg border border-gray-200 transition-colors"
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-700" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {dashboardImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-green-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to ${dashboardImages[index].title}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={SHOPIFY_OAUTH_URL}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Start Your Free Trial
            <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <p className="mt-3 text-sm text-gray-500">No credit card required • Install in 2 minutes</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;

