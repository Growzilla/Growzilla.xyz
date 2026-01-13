import React, { useState } from 'react';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const ShopifyJoinPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeUrl: '',
    monthlySales: '',
    earlyAccess: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store form data locally (in a real app, this would go to a backend)
    localStorage.setItem('growthWaitlistData', JSON.stringify(formData));

    // Redirect to thank you page
    router.push('/shopify/thank-you');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 text-sm text-green-700 mb-6">
            Join GrowMyShopify
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Get Your Free<br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Growth Strategy Session
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Join our community of ambitious Shopify brands. Get priority access to growth strategies, exclusive content, and expert guidance.
          </p>

          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center">
              <span className="text-yellow-800 font-medium">Limited spots available each month</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            {/* Store URL */}
            <div>
              <label htmlFor="storeUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Shopify Store URL *
              </label>
              <input
                type="url"
                id="storeUrl"
                name="storeUrl"
                required
                value={formData.storeUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="https://yourstore.myshopify.com"
              />
            </div>

            {/* Monthly Sales Volume */}
            <div>
              <label htmlFor="monthlySales" className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Revenue *
              </label>
              <select
                id="monthlySales"
                name="monthlySales"
                required
                value={formData.monthlySales}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select your monthly revenue range</option>
                <option value="<10k">Less than $10k</option>
                <option value="10k-50k">$10k - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-500k">$100k - $500k</option>
                <option value="500k-1M">$500k - $1M</option>
                <option value="1M+">$1M+</option>
              </select>
            </div>

            {/* Early Access Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="earlyAccess"
                  name="earlyAccess"
                  type="checkbox"
                  checked={formData.earlyAccess}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="earlyAccess" className="text-gray-700">
                  I'm interested in priority access to new growth strategies and exclusive content
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Free growth strategy session</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Access to our expert team</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Exclusive community access</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Priority growth insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a
            href="/shopify"
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            ← Back to GrowMyShopify
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopifyJoinPage;
