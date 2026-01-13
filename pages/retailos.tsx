import React from 'react';
import { ArrowRightIcon, ShieldCheckIcon, CpuChipIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

const RetailOSPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-slate-300 mb-8">
              <span className="mr-2">🏭</span>
              From RolloutFactory — Applied AI Engineering
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              RetailOS
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-4 font-light">
              An AI-native operating system for the future of digital retail
            </p>
            
            <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              A foundational system layer designed to bridge the widening gap between ecommerce traffic and sales conversion through real-time customer insight, guided support, and dynamic sales orchestration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Request Early Access
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-all duration-200">
                Technical Specification
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
              Traditional ecommerce systems operate like static catalogs
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Customers browse, hesitate, bounce. Meanwhile, retail stores offer human interaction, adaptive guidance, and sales psychology. <span className="text-blue-400 font-semibold">RetailOS brings that to ecommerce—at scale, with intelligence.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Why RetailOS?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Four core capabilities that transform ecommerce into an intelligent sales channel
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-600/20 rounded-lg mr-4">
                  <CpuChipIcon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">AI-Powered Sales Agent</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Real-time, always-on digital salesperson that guides customers, answers questions, and drives conversion with intelligent conversation flows.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-emerald-600/20 rounded-lg mr-4">
                  <ChartBarIcon className="h-8 w-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Customer Insight Engine</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Observe patterns, segment behavior, and generate operational insight beyond basic analytics with advanced behavior modeling.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-600/20 rounded-lg mr-4">
                  <CogIcon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Dynamic Sales Playbooks</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Customize engagement strategies based on customer state, intent, and business rules with adaptive sales psychology.
              </p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-orange-600/20 rounded-lg mr-4">
                  <ShieldCheckIcon className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Integrates Into Your Stack</h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Works with your existing storefront, CRM, CDP, and CMS. Deploy once. Learn continuously. Zero disruption to current operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
              A New Interface for Selling
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              RetailOS doesn't just respond—it <span className="text-blue-400 font-bold">sells</span>. Through guided dialog, product education, urgency cues, objection handling, and context-aware upsells, it transforms ecommerce into an interactive sales channel.
            </p>
            <div className="inline-block bg-slate-800/50 border border-slate-700 rounded-lg px-8 py-6">
              <p className="text-2xl font-bold text-white">
                Think: <span className="text-blue-400">Shopify</span> + <span className="text-emerald-400">Salesforce</span> + <span className="text-purple-400">a top sales rep</span>, trained on your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Architecture Overview
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              RetailOS is modular and API-first. Built for enterprise-grade performance and reliability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <span className="text-blue-400 font-mono text-lg font-bold">CORE</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">retailOS-core</h3>
              <p className="text-slate-400 text-sm">Decision intelligence + orchestration layer</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600/20 rounded-full mb-4">
                <span className="text-emerald-400 font-mono text-lg font-bold">AGENT</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">retailOS-agent</h3>
              <p className="text-slate-400 text-sm">Conversational sales AI trained on product + customer embeddings</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-4">
                <span className="text-purple-400 font-mono text-lg font-bold">INSIGHTS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">retailOS-insights</h3>
              <p className="text-slate-400 text-sm">Behavior modeling + data compression for insight</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600/20 rounded-full mb-4">
                <span className="text-orange-400 font-mono text-lg font-bold">DASH</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">retailOS-dashboard</h3>
              <p className="text-slate-400 text-sm">Ops layer for performance monitoring and playbook management</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-slate-400 italic">
              Full technical specification and integration documentation available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* Deployment Scope */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white">
              Deployment Scope
            </h2>
            <p className="text-xl text-slate-400 mb-12">
              Built for high-velocity ecommerce operators across key verticals
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Beauty & Cosmetics</h3>
                <p className="text-slate-400 text-sm">Complex product education and personalization</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Fashion & Apparel</h3>
                <p className="text-slate-400 text-sm">Style guidance and fit recommendations</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Consumer Goods</h3>
                <p className="text-slate-400 text-sm">Feature comparison and value positioning</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Lifestyle + DTC</h3>
                <p className="text-slate-400 text-sm">Brand storytelling and community building</p>
              </div>
            </div>
            
            <p className="text-lg text-slate-300">
              We're currently working with <span className="text-blue-400 font-semibold">select partners</span> to tune the system.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Ecommerce?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Want to pilot RetailOS in your ecommerce stack? Join our early access program and work directly with our engineering team to deploy intelligence into your sales funnel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="mailto:contact@rolloutfactory.com" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              contact@rolloutfactory.com
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="https://rolloutfactory.com" 
              className="inline-flex items-center px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-all duration-200"
            >
              Visit RolloutFactory.com
            </a>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <h3 className="text-2xl font-bold text-white mb-6">Coming Soon: Technical Briefs</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300">"Why Ecommerce Needs a Sales Layer"</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300">"The RetailOS Architecture"</p>
              </div>
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300">"From Traffic to Transactions: AI in the Purchase Funnel"</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetailOSPage;
