import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import EliteLayout from '../components/EliteLayout';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Growzilla</title>
        <meta
          name="description"
          content="Growzilla Privacy Policy - How we collect, use, and protect your personal information."
        />
      </Head>

      <EliteLayout>
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-zilla-neon transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-gray-400">
                Last updated: January 1, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8 text-gray-300">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p>
                    Growzilla (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you visit our website growzilla.xyz and use our services.
                  </p>
                  <p>
                    Please read this privacy policy carefully. If you do not agree with the terms of this
                    privacy policy, please do not access the site or use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-medium text-white mb-2">Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Register for an account or apply for membership</li>
                    <li>Subscribe to our newsletter or communications</li>
                    <li>Fill out a contact form or application</li>
                    <li>Book a consultation call via our scheduling system</li>
                    <li>Participate in our community forums or discussions</li>
                  </ul>
                  <p className="mt-4">This information may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name and email address</li>
                    <li>Company name and business information</li>
                    <li>Phone number</li>
                    <li>Billing and payment information</li>
                    <li>Business metrics you choose to share</li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">Automatically Collected Information</h3>
                  <p>
                    When you access our website, we may automatically collect certain information about your
                    device and usage, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Clickstream data and usage patterns</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process applications and manage memberships</li>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Send administrative information, updates, and marketing communications</li>
                    <li>Respond to inquiries and provide customer support</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Detect and prevent fraud or unauthorized access</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Sharing of Information</h2>
                  <p>We may share your information in the following situations:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Service Providers:</strong> With third-party vendors who
                      perform services on our behalf (payment processing, email delivery, analytics)
                    </li>
                    <li>
                      <strong className="text-white">Business Transfers:</strong> In connection with any merger,
                      acquisition, or sale of company assets
                    </li>
                    <li>
                      <strong className="text-white">Legal Requirements:</strong> When required by law or to
                      respond to legal process
                    </li>
                    <li>
                      <strong className="text-white">Protection of Rights:</strong> To protect our rights,
                      privacy, safety, or property
                    </li>
                  </ul>
                  <p className="mt-4">
                    We do not sell, rent, or trade your personal information to third parties for their
                    marketing purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes for
                    which it was collected, including to satisfy legal, accounting, or reporting requirements.
                    When determining retention periods, we consider the nature and sensitivity of the data,
                    the potential risk of harm from unauthorized use, and applicable legal requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights (GDPR)</h2>
                  <p>
                    If you are a resident of the European Economic Area (EEA), you have certain data
                    protection rights under the General Data Protection Regulation (GDPR):
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Right to Access:</strong> Request copies of your personal data
                    </li>
                    <li>
                      <strong className="text-white">Right to Rectification:</strong> Request correction of
                      inaccurate or incomplete data
                    </li>
                    <li>
                      <strong className="text-white">Right to Erasure:</strong> Request deletion of your personal
                      data under certain conditions
                    </li>
                    <li>
                      <strong className="text-white">Right to Restrict Processing:</strong> Request limitation of
                      how we process your data
                    </li>
                    <li>
                      <strong className="text-white">Right to Data Portability:</strong> Request transfer of your
                      data to another organization
                    </li>
                    <li>
                      <strong className="text-white">Right to Object:</strong> Object to processing of your data
                      for certain purposes
                    </li>
                  </ul>
                  <p className="mt-4">
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:contact@growzilla.xyz" className="text-zilla-neon hover:underline">
                      contact@growzilla.xyz
                    </a>
                    .
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to collect and track information about
                    your browsing activities. You can instruct your browser to refuse all cookies or indicate
                    when a cookie is being sent. However, some features of our service may not function
                    properly without cookies.
                  </p>
                  <p className="mt-4">We use the following types of cookies:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Essential Cookies:</strong> Required for basic site
                      functionality
                    </li>
                    <li>
                      <strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors
                      interact with our website
                    </li>
                    <li>
                      <strong className="text-white">Marketing Cookies:</strong> Used to track visitors across
                      websites to display relevant advertisements
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational security measures to protect your
                    personal information against unauthorized access, alteration, disclosure, or destruction.
                    However, no method of transmission over the Internet or electronic storage is 100% secure,
                    and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries other than your country
                    of residence. These countries may have data protection laws different from your country.
                    We take steps to ensure that your information receives adequate protection in accordance
                    with this privacy policy and applicable law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Children&apos;s Privacy</h2>
                  <p>
                    Our services are not intended for individuals under the age of 18. We do not knowingly
                    collect personal information from children. If we become aware that we have collected
                    personal information from a child without parental consent, we will take steps to delete
                    that information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any changes by
                    posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised
                    to review this policy periodically for any changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                  <p>
                    If you have questions or concerns about this Privacy Policy or our data practices, please
                    contact us at:
                  </p>
                  <div className="mt-4 p-6 bg-zilla-surface rounded-xl border border-gray-800">
                    <p className="font-medium text-white">Growzilla</p>
                    <p>Email: <a href="mailto:contact@growzilla.xyz" className="text-zilla-neon hover:underline">contact@growzilla.xyz</a></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </EliteLayout>
    </>
  );
};

export default PrivacyPage;
