import React from 'react';
import { ArrowRightIcon, ChevronDownIcon, ShieldCheckIcon, ChartBarIcon, UserGroupIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const scrollToNext = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 mb-8">
              <span className="mr-2">🤖</span>
              RetailOS — AI-Powered Sales Agent
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              What if every visitor had a<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                personal AI sales expert?
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              RetailOS gives your store a superintelligent AI agent that greets and guides each visitor — with one goal: increasing AOV, LTV, and reducing abandoned carts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href="/book-call"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Book a Strategy Call
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="/shopify"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                Join Shopify Waitlist
              </a>
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

      {/* The Pain Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-gray-900">
            The Silent Killer of Ecommerce
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-red-500 text-4xl mb-4">📉</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Abandoned carts are everywhere</h3>
              <p className="text-gray-600">Most customers leave without buying — not because of price, but because they're confused, lost, or unsupported.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="text-orange-500 text-4xl mb-4">💔</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Loyalty is dropping</h3>
              <p className="text-gray-600">LTV is shrinking. Customers forget you. And you forget them. The connection is lost.</p>
            </div>
          </div>
          
          <button 
            onClick={scrollToNext}
            className="inline-flex items-center px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            See how RetailOS fixes this
            <ChevronDownIcon className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Enter RetailOS Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Enter RetailOS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This is not live chat. This is not a dumb bot. This is your new top-performing salesperson.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Imagine an AI sales agent that:</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4 mt-1">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Greets every customer on your site</h4>
                    <p className="text-gray-600">Personal, branded interactions from the moment they arrive</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-lg mr-4 mt-1">
                    <ChartBarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Understands your catalog</h4>
                    <p className="text-gray-600">Deep product knowledge and intelligent recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-lg mr-4 mt-1">
                    <CpuChipIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Remembers returning customers</h4>
                    <p className="text-gray-600">Builds relationships and personalizes every interaction</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-orange-100 rounded-lg mr-4 mt-1">
                    <ShieldCheckIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Learns your tone and adapts</h4>
                    <p className="text-gray-600">Matches your brand voice and sales approach perfectly</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full mr-3"></div>
                  <span className="font-semibold text-gray-900">AI Sales Agent</span>
                </div>
                <p className="text-gray-600 mb-4">"Hi! I noticed you're looking at our premium collection. Based on your browsing, I think you'd love our bestselling jacket. Would you like to see how it compares to what you were just viewing?"</p>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Show me</button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">Not now</button>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">Real-time, intelligent conversations that convert</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Scale Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-gray-900">
            Built for Scale
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-2xl mb-4">🛍️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Shopify Ready</h3>
              <p className="text-sm text-gray-600">Works out of the box</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-2xl mb-4">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Stacks</h3>
              <p className="text-sm text-gray-600">Integrates fully</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-2xl mb-4">⏰</div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Operation</h3>
              <p className="text-sm text-gray-600">Never sleeps, always sells</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-2xl mb-4">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Learning</h3>
              <p className="text-sm text-gray-600">From interactions, not clicks</p>
            </div>
          </div>
          
          <a 
            href="/book-call"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book a Demo
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Real Data Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                Real Data, Not Clicks
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Heatmaps and click tracking only tell you where people gave up. RetailOS gives you real qualitative data.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">What customers asked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">What confused them</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">What they liked and disliked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">What stopped them from buying</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 italic">
                It's like user research at scale, every day.
              </p>
              
              <a 
                href="/book-call"
                className="inline-flex items-center px-6 py-3 text-blue-600 hover:text-blue-700 font-semibold transition-colors border-b-2 border-blue-600"
              >
                Talk to Sales
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Insights</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600">"Do you have this in a size medium?"</p>
                  <span className="text-xs text-gray-400">Asked 47 times today</span>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                  <p className="text-sm text-gray-600">"I'm confused about the return policy"</p>
                  <span className="text-xs text-gray-400">Conversion blocker - 23 instances</span>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-gray-600">"This is exactly what I was looking for!"</p>
                  <span className="text-xs text-gray-400">Led to purchase - 12 times</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI That Gets Smarter Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
            AI That Gets Smarter
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Every interaction makes your agent better. It learns your brand voice, pricing strategy, objections, and goals.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Adaptive Learning</h3>
              <p className="text-gray-600">Fine-tune behavior from a simple internal dashboard. You can train it, or let it learn naturally.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Brand Alignment</h3>
              <p className="text-gray-600">Learns your unique voice, tone, and sales approach to maintain perfect brand consistency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guardrails + Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
            Guardrails + Trust
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Never Guesses</h3>
              <p className="text-gray-600 text-sm">Hardcoded guardrails prevent hallucination and ensure accuracy</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fully Auditable</h3>
              <p className="text-gray-600 text-sm">Every interaction is logged and reviewable for quality control</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Safety by Design</h3>
              <p className="text-gray-600 text-sm">AI safety built in from the ground up, not as an afterthought</p>
            </div>
          </div>
          
          <a 
            href="https://discord.gg/dFgyfdW8"
            className="inline-flex items-center px-6 py-3 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            Join the AI ECOM CABAL Discord
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're running a custom stack or using Shopify, we've got you covered.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Enterprise Retailers */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Retailers</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Own your stack? Running a custom-built store?</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">We'll work directly with your team to integrate RetailOS</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">You control the agent, the data, and the stack</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">
                  Contact: <a href="mailto:contact@rolloutfactory.com" className="text-blue-600 hover:text-blue-700 font-medium">contact@rolloutfactory.com</a>
                </p>
              </div>
              
              <a 
                href="/book-call"
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Talk to Us
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
            
            {/* Shopify Stores */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Shopify Stores</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Running on Shopify? Scaling DTC?</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">RetailOS will soon launch as a Shopify App</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Install it, and instantly get a branded AI agent + dashboard</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
                  <span className="text-gray-700">Customize behavior, track conversion lift, edit responses</span>
                </div>
              </div>
              
              <a 
                href="/shopify"
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200"
              >
                Join Waitlist
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the Movement
          </h2>
          <p className="text-xl mb-8 opacity-90">
            AI is changing ecommerce forever. We're building in public, and we're not doing it alone.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-4">AI ECOM CABAL</h3>
            <p className="text-lg opacity-90 mb-6">
              Where indie founders, ecommerce operators, and AI weirdos hang out, ask dumb questions, and help each other scale smarter.
            </p>
            <a 
              href="https://discord.gg/dFgyfdW8"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join the Discord
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2024 RolloutFactory. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="mailto:contact@rolloutfactory.com" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="https://discord.gg/dFgyfdW8" className="text-gray-400 hover:text-white transition-colors">Community</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
