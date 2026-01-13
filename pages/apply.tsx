import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import EliteLayout from '../components/EliteLayout';

const ApplyPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    experience: '',
    goals: '',
    referral: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>Apply to Join | Growzilla</title>
        <meta
          name="description"
          content="Apply to join the exclusive Growzilla community. Vetted membership ensures quality connections and meaningful transformation."
        />
      </Head>

      <EliteLayout>
        <section className="relative min-h-screen pt-32 pb-24 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-zilla-neon/5 blur-[150px]" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {isSubmitted ? (
              /* Success State */
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-zilla-neon/20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-zilla-neon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                  Application Received
                </h1>
                <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto">
                  Thank you for your interest in Growzilla. We review every application personally
                  and will be in touch within 48 hours.
                </p>
                <Link href="/" className="btn-zilla-outline">
                  Return Home
                </Link>
              </div>
            ) : (
              /* Form */
              <>
                <div className="text-center mb-12">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-zilla-neon/10 border border-zilla-neon/20 text-zilla-neon text-sm font-medium mb-6">
                    Application-Based Access
                  </span>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Apply to Join Growzilla
                  </h1>
                  <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
                    We maintain a curated community of serious ecommerce operators. Tell us about your
                    business and goals to be considered for membership.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {/* Company & Revenue */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Company / Brand Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
                        placeholder="Your brand"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="revenue"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Annual Revenue *
                      </label>
                      <select
                        id="revenue"
                        name="revenue"
                        required
                        value={formData.revenue}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
                      >
                        <option value="">Select range</option>
                        <option value="under-100k">Under $100K</option>
                        <option value="100k-500k">$100K - $500K</option>
                        <option value="500k-1m">$500K - $1M</option>
                        <option value="1m-5m">$1M - $5M</option>
                        <option value="5m-10m">$5M - $10M</option>
                        <option value="10m+">$10M+</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Years in Ecommerce *
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
                    >
                      <option value="">Select experience</option>
                      <option value="1-2">1-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>

                  {/* Goals */}
                  <div>
                    <label
                      htmlFor="goals"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      What are your primary goals for joining Growzilla? *
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      required
                      rows={4}
                      value={formData.goals}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors resize-none"
                      placeholder="Tell us about your current challenges and what you hope to achieve with AI systems..."
                    />
                  </div>

                  {/* Referral */}
                  <div>
                    <label
                      htmlFor="referral"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      id="referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zilla-surface border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
                      placeholder="Referral, social media, search, etc."
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-zilla text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 text-center">
                    By applying, you agree to our{' '}
                    <Link href="/terms" className="text-zilla-neon hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-zilla-neon hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              </>
            )}
          </div>
        </section>
      </EliteLayout>
    </>
  );
};

export default ApplyPage;
