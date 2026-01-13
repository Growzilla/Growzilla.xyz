import React from 'react';
import { ArrowRightIcon, ChevronDownIcon, ChartBarIcon, UserGroupIcon, RocketLaunchIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import CountdownBanner from '../components/CountdownBanner';
import LogoMarquee from '../components/LogoMarquee';
import CalendlyBlock from '../components/CalendlyBlock';

const ShopifyPage = () => {
  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <Layout theme="green">
      <CountdownBanner theme="green" />
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-sm text-green-700 mb-8">
              <RocketLaunchIcon className="h-4 w-4 mr-2" />
              Shopify Growth Experts — GrowMyShopify
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Unlock Your Shopify Store's<br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Full Revenue Potential
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              We help Shopify brands scale with proven growth strategies, conversion optimization, and expert guidance. From $10K to $1M+ months.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="#calendly"
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Book Free Growth Call
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/dFgyfdW8"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                Join the Community
              </a>
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
              Free strategy session — Limited spots each month
            </div>
          </div>
        </div>

        <button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors animate-bounce"
        >
          <ChevronDownIcon className="h-8 w-8" />
        </button>
      </section>

      <LogoMarquee />

      {/* Built for Shopify Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-gray-900">
            Built for Shopify Brands
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Data-Driven</h3>
              <p className="text-gray-600">Every recommendation backed by real data and proven results</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RocketLaunchIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast Results</h3>
              <p className="text-gray-600">See measurable improvements within weeks, not months</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Team</h3>
              <p className="text-gray-600">Strategists who've scaled dozens of Shopify brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="py-24 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              What We Help You Achieve
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Our Growth Framework:</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-lg mr-4 mt-1">
                    <ChartBarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Conversion Optimization</h4>
                    <p className="text-gray-600">Identify and fix the leaks in your funnel to maximize every visitor</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4 mt-1">
                    <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Revenue Acceleration</h4>
                    <p className="text-gray-600">Strategic initiatives to increase AOV, LTV, and overall revenue</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-lg mr-4 mt-1">
                    <UserGroupIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customer Retention</h4>
                    <p className="text-gray-600">Build loyalty programs and retention strategies that drive repeat purchases</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-green-600 mb-2">20-50%</div>
                <p className="text-gray-600">Average conversion rate improvement</p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">60-90</div>
                    <p className="text-sm text-gray-600">Days to measurable ROI</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">2-4x</div>
                    <p className="text-sm text-gray-600">Typical LTV improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Common Problems We Solve
            </h2>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center">
                <XMarkIcon className="h-6 w-6 text-red-500 mr-4" />
                <span className="text-gray-700">Low conversion rates</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-gray-700 font-medium">Data-driven optimization</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center">
                <XMarkIcon className="h-6 w-6 text-red-500 mr-4" />
                <span className="text-gray-700">High cart abandonment</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-gray-700 font-medium">Checkout optimization strategies</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center">
                <XMarkIcon className="h-6 w-6 text-red-500 mr-4" />
                <span className="text-gray-700">One-time buyers</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-gray-700 font-medium">Retention & loyalty programs</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center">
                <XMarkIcon className="h-6 w-6 text-red-500 mr-4" />
                <span className="text-gray-700">Plateaued growth</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-gray-700 font-medium">Scaling strategies that work</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center">
                <XMarkIcon className="h-6 w-6 text-red-500 mr-4" />
                <span className="text-gray-700">No clear growth roadmap</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-gray-700 font-medium">Prioritized action plans</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="#calendly"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Your Growth Roadmap
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <CalendlyBlock theme="green" />

      {/* Community Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the Shopify Growth Community
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with other ambitious Shopify entrepreneurs, share wins, get feedback, and learn from experts who've been there.
          </p>

          <a
            href="https://discord.gg/dFgyfdW8"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Join the Discord
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ShopifyPage;
