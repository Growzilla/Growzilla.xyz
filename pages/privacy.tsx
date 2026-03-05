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
          content="Growzilla Privacy Policy - How we collect, use, and protect your data when you use our Shopify app."
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
                Last updated: March 5, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8 text-gray-300">

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                  <p>
                    RolloutFactory Inc., operating as Growzilla (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;),
                    is a company incorporated in the State of Delaware, United States. This Privacy Policy explains
                    how we collect, use, disclose, and safeguard information when you install and use the Growzilla
                    application on Shopify (&ldquo;the App&rdquo;), visit our website at growzilla.xyz, or interact
                    with our services.
                  </p>
                  <p>
                    By installing the App or using our services, you acknowledge that you have read and understood
                    this Privacy Policy. If you do not agree with the terms described here, please do not install
                    the App or use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Our Role as Data Processor and Controller</h2>
                  <p>
                    When we process data on behalf of Shopify merchants through the App, we act as a
                    {' '}<strong className="text-white">data processor</strong>. The merchant remains the data
                    controller and is responsible for ensuring that their use of the App complies with applicable
                    data protection laws, including obtaining any necessary consent from their customers.
                  </p>
                  <p>
                    When we collect information directly from merchants for account management, billing, and
                    communications, we act as the <strong className="text-white">data controller</strong> for
                    that information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Information We Collect</h2>

                  <h3 className="text-xl font-medium text-white mb-2">3.1 Information Collected Through Shopify</h3>
                  <p>
                    When a merchant installs the App, we access certain store data through Shopify&apos;s APIs.
                    This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Store information:</strong> Store name, domain, contact email,
                      currency, and timezone
                    </li>
                    <li>
                      <strong className="text-white">Order data:</strong> Order details including order amounts,
                      products purchased, dates, discount codes used, and landing page URLs (used for UTM attribution)
                    </li>
                    <li>
                      <strong className="text-white">Product data:</strong> Product names, prices, inventory levels,
                      and variants
                    </li>
                    <li>
                      <strong className="text-white">Customer data:</strong> Customer names, email addresses, and
                      order history as associated with attributed orders
                    </li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">3.2 Information Provided by Merchants</h3>
                  <p>Merchants may directly provide us with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account credentials (email, password) for dashboard access</li>
                    <li>Organization and team member details</li>
                    <li>Creator and influencer roster information</li>
                    <li>Meta (Facebook) Ads system user access tokens for ad campaign data retrieval</li>
                    <li>Billing and payment information</li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">3.3 Information Collected from Third-Party Integrations</h3>
                  <p>
                    When a merchant connects their Meta Ads account, we collect campaign performance data
                    including ad spend, impressions, clicks, and conversion metrics. We do not access or store
                    Meta pixel data or personal data of ad viewers. Access tokens provided by merchants are
                    encrypted at rest.
                  </p>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">3.4 Automatically Collected Information</h3>
                  <p>When you access our website or dashboard, we may automatically collect:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address, browser type, and operating system</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Device identifiers and usage patterns</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Attribution and analytics:</strong> Matching orders to UTM
                      links to determine which creators, posts, and campaigns generated revenue
                    </li>
                    <li>
                      <strong className="text-white">Dashboard and reporting:</strong> Displaying sales performance,
                      creator metrics, funnel visualizations, and advertising analytics
                    </li>
                    <li>
                      <strong className="text-white">Service operation:</strong> Authenticating users, syncing
                      store data, processing Meta ad campaign data, and generating insights
                    </li>
                    <li>
                      <strong className="text-white">Service improvement:</strong> Analyzing usage patterns to
                      improve functionality and user experience
                    </li>
                    <li>
                      <strong className="text-white">Communication:</strong> Sending service updates, security
                      alerts, and support messages
                    </li>
                    <li>
                      <strong className="text-white">Legal compliance:</strong> Fulfilling legal obligations and
                      responding to lawful requests
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. How We Share Your Information</h2>
                  <p>We do not sell, rent, or trade personal information. We may share information in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Service providers:</strong> With third-party vendors who perform
                      services on our behalf, including cloud hosting (Render, Vercel), payment processing, and
                      analytics. These providers are contractually bound to use data only for the services they
                      provide to us.
                    </li>
                    <li>
                      <strong className="text-white">Shopify:</strong> As required by the Shopify platform for app
                      functionality, compliance, and mandatory data subject request webhooks
                    </li>
                    <li>
                      <strong className="text-white">Business transfers:</strong> In connection with any merger,
                      acquisition, or sale of company assets, with prior notice to affected users
                    </li>
                    <li>
                      <strong className="text-white">Legal requirements:</strong> When required by law, regulation,
                      legal process, or governmental request
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Data Storage and Security</h2>
                  <p>
                    Your data is stored on servers located in the United States, provided by Render (backend
                    infrastructure) and Vercel (frontend hosting). We implement industry-standard security
                    measures to protect your information, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of sensitive credentials at rest using Fernet symmetric encryption</li>
                    <li>HTTPS/TLS encryption for all data in transit</li>
                    <li>JWT-based authentication with bcrypt password hashing</li>
                    <li>Role-based access controls separating merchant and creator data</li>
                    <li>Regular security reviews of our infrastructure</li>
                  </ul>
                  <p className="mt-4">
                    No method of electronic storage or transmission is completely secure. While we strive to
                    protect your data, we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention</h2>
                  <p>
                    We retain merchant and store data for as long as the App remains installed and the merchant
                    account is active. Upon uninstallation of the App or account deletion:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Store data, order data, and attribution records are deleted within 30 days</li>
                    <li>Meta Ads access tokens are immediately revoked and deleted</li>
                    <li>Account credentials are permanently removed</li>
                    <li>Aggregated, anonymized analytics data may be retained for service improvement</li>
                  </ul>
                  <p className="mt-4">
                    We may retain certain data for longer periods where required by law or for legitimate
                    business purposes such as resolving disputes or enforcing our agreements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Your Rights Under GDPR</h2>
                  <p>
                    If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland,
                    you have rights under the General Data Protection Regulation (GDPR) and equivalent
                    legislation, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Right to access:</strong> Request a copy of the personal
                      data we hold about you
                    </li>
                    <li>
                      <strong className="text-white">Right to rectification:</strong> Request correction of
                      inaccurate or incomplete personal data
                    </li>
                    <li>
                      <strong className="text-white">Right to erasure:</strong> Request deletion of your personal
                      data, subject to legal retention obligations
                    </li>
                    <li>
                      <strong className="text-white">Right to restrict processing:</strong> Request that we limit
                      how we process your data in certain circumstances
                    </li>
                    <li>
                      <strong className="text-white">Right to data portability:</strong> Request your data in a
                      structured, machine-readable format for transfer to another service
                    </li>
                    <li>
                      <strong className="text-white">Right to object:</strong> Object to processing of your data
                      where we rely on legitimate interests as the legal basis
                    </li>
                    <li>
                      <strong className="text-white">Right to withdraw consent:</strong> Where processing is based
                      on consent, you may withdraw it at any time without affecting the lawfulness of prior
                      processing
                    </li>
                  </ul>
                  <p className="mt-4">
                    We process personal data under the following lawful bases: performance of a contract
                    (providing our services), legitimate interests (improving our services and fraud prevention),
                    and consent (where explicitly given).
                  </p>
                  <p className="mt-2">
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:privacy@growzilla.xyz" className="text-zilla-neon hover:underline">
                      privacy@growzilla.xyz
                    </a>
                    . We will respond within 30 days.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Your Rights Under CCPA</h2>
                  <p>
                    If you are a California resident, you have additional rights under the California Consumer
                    Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Right to know:</strong> Request disclosure of the categories
                      and specific pieces of personal information we have collected about you
                    </li>
                    <li>
                      <strong className="text-white">Right to delete:</strong> Request deletion of personal
                      information we have collected from you
                    </li>
                    <li>
                      <strong className="text-white">Right to opt out:</strong> Opt out of the sale of personal
                      information. We do not sell personal information.
                    </li>
                    <li>
                      <strong className="text-white">Right to non-discrimination:</strong> We will not discriminate
                      against you for exercising your CCPA rights
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
                  <p>
                    Our servers are located in the United States. If you access our services from outside the
                    United States, your information will be transferred to and processed in the United States,
                    which may have different data protection laws than your jurisdiction.
                  </p>
                  <p className="mt-4">
                    For transfers of personal data from the EEA, UK, or Switzerland, we rely on Standard
                    Contractual Clauses approved by the European Commission, or other legally recognized transfer
                    mechanisms, to ensure your data receives adequate protection.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Cookies and Tracking Technologies</h2>
                  <p>
                    We use cookies and similar technologies on our website and dashboard to maintain sessions,
                    remember preferences, and understand usage patterns.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Essential cookies:</strong> Required for authentication,
                      session management, and core functionality. These cannot be disabled.
                    </li>
                    <li>
                      <strong className="text-white">Analytics cookies:</strong> Help us understand how users
                      interact with our services. We use Microsoft Clarity for session analytics.
                    </li>
                  </ul>
                  <p className="mt-4">
                    You may control cookie preferences through your browser settings. Disabling certain cookies
                    may affect the functionality of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Shopify Data Subject Requests</h2>
                  <p>
                    We comply with Shopify&apos;s mandatory privacy compliance webhooks. When a merchant or
                    their customer submits a data subject request through Shopify, we process the following
                    request types:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-white">Customer data request:</strong> We provide all personal
                      data we hold for the specified customer
                    </li>
                    <li>
                      <strong className="text-white">Customer data erasure:</strong> We delete all personal
                      data associated with the specified customer
                    </li>
                    <li>
                      <strong className="text-white">Shop data erasure:</strong> Upon app uninstallation, we
                      delete all data associated with the merchant&apos;s store
                    </li>
                  </ul>
                  <p className="mt-4">
                    These requests are processed within the timeframes required by Shopify and applicable law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">13. Children&apos;s Privacy</h2>
                  <p>
                    Our services are designed for business use and are not intended for individuals under the
                    age of 18. We do not knowingly collect personal information from children. If we become
                    aware that we have collected personal data from a child, we will take prompt steps to
                    delete that information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">14. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices
                    or applicable law. We will notify merchants of material changes by email or through the
                    App at least 30 days before the changes take effect. The &ldquo;Last updated&rdquo; date
                    at the top of this page indicates when this policy was last revised.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">15. Contact Us</h2>
                  <p>
                    If you have questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us:
                  </p>
                  <div className="mt-4 p-6 bg-zilla-surface rounded-xl border border-gray-800 space-y-2">
                    <p className="font-medium text-white">RolloutFactory Inc. (Growzilla)</p>
                    <p>Privacy inquiries:{' '}
                      <a href="mailto:privacy@growzilla.xyz" className="text-zilla-neon hover:underline">
                        privacy@growzilla.xyz
                      </a>
                    </p>
                    <p>General support:{' '}
                      <a href="mailto:contact@growzilla.xyz" className="text-zilla-neon hover:underline">
                        contact@growzilla.xyz
                      </a>
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                      Registered in the State of Delaware, United States
                    </p>
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
