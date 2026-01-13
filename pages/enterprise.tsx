import React from 'react';
import { ArrowRightIcon, ShieldCheckIcon, ChartBarIcon, BuildingOfficeIcon, RocketLaunchIcon, CheckIcon } from '@heroicons/react/24/outline';

const EnterprisePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm text-green-700 mb-8">
              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
              Enterprise Growth Solutions — GrowMyShopify
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Scale Your Brand<br />
              <span className="text-green-600">With Expert Partners</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              GrowMyShopify delivers enterprise-grade growth strategies for established Shopify brands. We focus on sustainable revenue growth, conversion optimization, and building brands that last.
            </p>

            <a
              href="/enterprise/book-call"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule a Strategy Call
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center text-gray-900">
            Why Enterprise Brands Choose Us
          </h2>

          <div className="space-y-8 mb-12">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-6 mt-3"></div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Proven track record scaling Shopify brands from 6 to 8 figures
              </p>
            </div>

            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-6 mt-3"></div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Data-driven strategies backed by real results, not guesswork
              </p>
            </div>

            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-6 mt-3"></div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Dedicated growth strategist who understands your business inside and out
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/enterprise/book-call"
              className="inline-flex items-center px-6 py-3 text-green-600 hover:text-green-700 font-semibold transition-colors border-b-2 border-green-600"
            >
              Start With a Free Consultation
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center text-gray-900">
            Challenges We Solve
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Plateaued Growth</h3>
              <p className="text-gray-600">Revenue growth has stalled despite increased ad spend and marketing efforts</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <RocketLaunchIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Scaling Challenges</h3>
              <p className="text-gray-600">What worked at $1M doesn't work at $5M—you need new strategies</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Brand Dilution</h3>
              <p className="text-gray-600">Aggressive discounting is hurting your brand and margins</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Operational Complexity</h3>
              <p className="text-gray-600">Managing growth across multiple channels and markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Our Enterprise Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive growth partnership tailored to your brand's unique challenges and opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">What We Deliver:</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-lg mr-4 mt-1">
                    <ChartBarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Full-Funnel Optimization</h4>
                    <p className="text-gray-600">From acquisition to retention, we optimize every touchpoint</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4 mt-1">
                    <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Scaling Strategies</h4>
                    <p className="text-gray-600">Proven playbooks to break through revenue ceilings</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-lg mr-4 mt-1">
                    <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Brand Development</h4>
                    <p className="text-gray-600">Build a brand that commands premium pricing and loyalty</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-orange-100 rounded-lg mr-4 mt-1">
                    <ShieldCheckIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Dedicated Partnership</h4>
                    <p className="text-gray-600">Your own growth strategist embedded in your business</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Enterprise Features:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Dedicated growth strategist</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Weekly strategy calls</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Custom analytics dashboard</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Priority Slack access</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Quarterly strategy workshops</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Performance guarantees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-green-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              A structured approach to sustainable growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Discovery</h3>
              <p className="text-gray-600 text-sm">Deep dive into your business, data, and growth blockers</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Strategy</h3>
              <p className="text-gray-600 text-sm">Custom growth roadmap with prioritized initiatives</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Execution</h3>
              <p className="text-gray-600 text-sm">Hands-on implementation and optimization</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Scale</h3>
              <p className="text-gray-600 text-sm">Double down on winners and expand what works</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-6">
              Ready to unlock your brand's <span className="text-green-600">full potential</span>?
            </p>
            <a
              href="/enterprise/book-call"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule Your Strategy Call
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Book a Call Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Let's Talk Growth
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We don't do generic sales demos. We run structured discovery calls to understand your business, challenges, and goals.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 mb-12">
            <h3 className="text-xl font-bold mb-6 text-gray-900">On the call, we'll cover:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Your current revenue and growth trajectory</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Key challenges blocking your next milestone</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Potential quick wins we identify</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Whether we're the right fit for each other</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/enterprise/book-call"
              className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start the Conversation
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Scale to the Next Level?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            GrowMyShopify partners with ambitious Shopify brands ready to break through revenue ceilings and build lasting businesses.
          </p>

          <a
            href="/enterprise/book-call"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book Your Strategy Call
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 GrowMyShopify. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="mailto:hello@growmyshopifybrand.com" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="https://discord.gg/dFgyfdW8" className="text-gray-400 hover:text-white transition-colors">Community</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterprisePage;
