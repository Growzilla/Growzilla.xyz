import React from 'react';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import GrowMyShopifyLogo from '../components/GrowMyShopifyLogo';

const DISCORD_URL = 'https://discord.gg/dFgyfdW8';

const PricingPage = () => {
  return (
    <Layout theme="green">
      <div className="min-h-screen bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <GrowMyShopifyLogo variant="horizontal" size="lg" className="mb-6 mx-auto" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Growth Plans That Scale With You</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From audit to execution. Choose the level of support your brand needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Growth Audit */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth Audit</h3>
              <p className="text-gray-600 mb-6">One-time deep dive into your store</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$497</span>
                <span className="text-gray-600"> one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Complete store analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Conversion optimization report</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Prioritized action plan</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">60-min strategy call</span>
                </li>
              </ul>
              <a
                href="#calendly"
                className="block w-full text-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Book Your Audit
              </a>
            </div>

            {/* Growth Partner - Featured */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-600 rounded-2xl p-8 shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth Partner</h3>
              <p className="text-gray-600 mb-6">Ongoing optimization & strategy</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$1,497</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in Growth Audit</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Weekly strategy calls</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Ongoing conversion optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Growth tracking dashboard</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Priority Slack support</span>
                </li>
              </ul>
              <a
                href="#calendly"
                className="block w-full text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                Apply Now
              </a>
            </div>

            {/* Scale Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Scale</h3>
              <p className="text-gray-600 mb-6">For 7-figure brands</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Everything in Growth Partner</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated growth strategist</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Full-funnel optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom reporting & analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Quarterly strategy workshops</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Performance guarantees</span>
                </li>
              </ul>
              <a
                href="/enterprise"
                className="block w-full text-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free consultation?</h3>
                <p className="text-gray-600">Yes! We offer a free 20-minute growth call to understand your business and see if we're a good fit.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What results can I expect?</h3>
                <p className="text-gray-600">Our clients typically see 20-50% improvements in conversion rates and significant revenue growth within 60-90 days.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if it doesn't work for me?</h3>
                <p className="text-gray-600">We offer a satisfaction guarantee on our Growth Audit. If you don't find value in the recommendations, we'll refund your investment.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you work with stores of any size?</h3>
                <p className="text-gray-600">We work with Shopify brands doing $10K to $5M+ per month. Our strategies scale with your business.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to accelerate your growth?</h2>
            <p className="text-lg text-gray-600 mb-6">Join successful Shopify brands scaling with GrowMyShopify</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#calendly"
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Book Free Growth Call
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
