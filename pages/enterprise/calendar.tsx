import React, { useEffect } from 'react';
import { CheckCircleIcon, ShieldCheckIcon, ChartBarIcon, CpuChipIcon } from '@heroicons/react/24/outline';

const EnterpriseCalendarPage = () => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            You're a Great Fit
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Based on your responses, we believe RetailOS can add real value to your operations. Please book a pilot strategy call below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Benefits */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We'll Cover</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4 mt-1">
                    <CpuChipIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Technical Architecture</h3>
                    <p className="text-gray-600 text-sm">Review your current retail architecture and integration requirements</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-lg mr-4 mt-1">
                    <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Compliance & Risk</h3>
                    <p className="text-gray-600 text-sm">Discuss key risk factors and compliance requirements (GDPR, etc.)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-lg mr-4 mt-1">
                    <span className="text-purple-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pilot Program</h3>
                    <p className="text-gray-600 text-sm">Structure pilot program timeline and success metrics</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-orange-100 rounded-lg mr-4 mt-1">
                    <ChartBarIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ROI Benchmarks</h3>
                    <p className="text-gray-600 text-sm">Set expected ROI benchmarks and measurement criteria</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assurance Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Commitment</h3>
              <p className="text-gray-700 text-sm mb-4">
                All pilots are designed to be low-risk, compliance-friendly, and measurable from day one.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
                  <span>No long-term commitments</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
                  <span>Full data control</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 mr-2" />
                  <span>Measurable results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendly */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Book Your Pilot Strategy Call
              </h2>
              
              {/* Calendly Embed */}
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/albert-elmgart/ai-strategy-call"
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
              
              {/* Fallback for when Calendly doesn't load */}
              <noscript>
                <div className="bg-gray-100 p-12 rounded-xl text-center">
                  <p className="text-gray-600 mb-4">
                    Please enable JavaScript to book your call, or contact us directly:
                  </p>
                  <a 
                    href="mailto:contact@rolloutfactory.com"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    contact@rolloutfactory.com
                  </a>
                </div>
              </noscript>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Enterprise Retail?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join forward-thinking retailers who are already leveraging AI to increase revenue and improve customer experience.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Measurable ROI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a 
            href="/enterprise"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Back to Enterprise Overview
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseCalendarPage;
