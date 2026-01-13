import React, { useState } from 'react';
import { ArrowRightIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const EnterpriseBookCallPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    platform: '',
    monthlySales: '',
    challenges: '',
    hosting: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store form data locally (in a real app, this would go to a backend)
    localStorage.setItem('enterpriseQuestionnaire', JSON.stringify(formData));
    
    // Always redirect to calendar page
    router.push('/enterprise/calendar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 mb-6">
            <BuildingOfficeIcon className="h-4 w-4 mr-2" />
            Enterprise AI Pilot Program
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Start Your Enterprise AI Pilot
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Before we schedule, we'd like to understand your current setup and challenges. This takes less than 2 minutes. There are no wrong answers — we use this to tailor the conversation.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block text-lg font-semibold text-gray-900 mb-3">
                What platform is your store built on? *
              </label>
              <select
                id="platform"
                name="platform"
                required
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              >
                <option value="">Select your platform</option>
                <option value="shopify">Shopify</option>
                <option value="custom">Custom Stack</option>
                <option value="magento">Magento</option>
                <option value="woocommerce">WooCommerce</option>
                <option value="salesforce">Salesforce Commerce Cloud</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Monthly Sales Volume */}
            <div>
              <label htmlFor="monthlySales" className="block text-lg font-semibold text-gray-900 mb-3">
                What is your average monthly sales volume? *
              </label>
              <select
                id="monthlySales"
                name="monthlySales"
                required
                value={formData.monthlySales}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              >
                <option value="">Select your sales volume</option>
                <option value="<100k">Less than $100k</option>
                <option value="100k-1M">$100k - $1M</option>
                <option value="1M-10M">$1M - $10M</option>
                <option value="10M+">$10M+</option>
              </select>
            </div>

            {/* Challenges */}
            <div>
              <label htmlFor="challenges" className="block text-lg font-semibold text-gray-900 mb-3">
                What's your biggest challenge with conversions or customer retention? *
              </label>
              <textarea
                id="challenges"
                name="challenges"
                required
                rows={5}
                value={formData.challenges}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg resize-none"
                placeholder="Describe your main challenges with customer conversion, retention, or engagement..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Be as specific as possible. This helps us understand how RetailOS can best serve your needs.
              </p>
            </div>

            {/* Hosting */}
            <div>
              <label htmlFor="hosting" className="block text-lg font-semibold text-gray-900 mb-3">
                Where is your store hosted or managed? *
              </label>
              <select
                id="hosting"
                name="hosting"
                required
                value={formData.hosting}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
              >
                <option value="">Select hosting environment</option>
                <option value="shopify">Shopify</option>
                <option value="magento">Magento</option>
                <option value="headless">Headless Commerce</option>
                <option value="in-house">In-house Infrastructure</option>
                <option value="aws">AWS</option>
                <option value="azure">Microsoft Azure</option>
                <option value="gcp">Google Cloud Platform</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit and Continue
                    <ArrowRightIcon className="ml-3 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold mr-3">1</span>
                  We'll review your responses and confirm you're a good fit
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold mr-3">2</span>
                  You'll be directed to book a 30-minute pilot strategy call
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold mr-3">3</span>
                  We'll discuss your specific use case and pilot program structure
                </p>
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

export default EnterpriseBookCallPage;
