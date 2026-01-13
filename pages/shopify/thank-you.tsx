import React from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const ShopifyThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            You're In!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Welcome to the GrowMyShopify community. You're now part of an exclusive group of ambitious Shopify entrepreneurs.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>

          <div className="space-y-6 text-left">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
                <p className="text-gray-600 text-sm">Check your inbox for a confirmation email with next steps and exclusive growth insights.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Strategy Call</h3>
                <p className="text-gray-600 text-sm">We'll reach out to schedule your free growth strategy session within 24-48 hours.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Growth Roadmap</h3>
                <p className="text-gray-600 text-sm">Get your personalized action plan with prioritized strategies for your Shopify brand.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Reminder */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Get</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
              <span>Free growth strategy session</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
              <span>Exclusive community access</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
              <span>Priority growth insights</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-4">
          <a
            href="https://discord.gg/dFgyfdW8"
            className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Join Our Community
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>

          <div className="text-center">
            <a
              href="/"
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            You're joining other ambitious Shopify entrepreneurs committed to scaling their brands.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm text-gray-600 ml-3">Join hundreds of successful brands</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopifyThankYouPage;
