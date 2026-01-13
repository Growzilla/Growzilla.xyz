import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import EliteLayout from '../components/EliteLayout';

const TermsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms of Service | Growzilla</title>
        <meta
          name="description"
          content="Growzilla Terms of Service - Membership terms, payments, refunds, and community conduct."
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
                Terms of Service
              </h1>
              <p className="text-gray-400">
                Last updated: January 1, 2026
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="space-y-8 text-gray-300">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                  <p>
                    By accessing or using Growzilla services, including our website at growzilla.xyz, community
                    platform, AI systems, and any related services (collectively, the &ldquo;Service&rdquo;), you agree to
                    be bound by these Terms of Service (&ldquo;Terms&rdquo;).
                  </p>
                  <p>
                    If you disagree with any part of these terms, you may not access or use the Service. These
                    Terms apply to all visitors, users, and members of the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                  <p>
                    Growzilla is an exclusive community and platform that provides:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access to AI-powered ecommerce optimization systems</li>
                    <li>Community membership with other vetted ecommerce operators</li>
                    <li>Educational resources, frameworks, and playbooks</li>
                    <li>Strategy consultations and review calls</li>
                    <li>Networking opportunities with industry peers</li>
                  </ul>
                  <p className="mt-4">
                    Membership is application-based and subject to approval at our discretion.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Membership and Account</h2>
                  <h3 className="text-xl font-medium text-white mb-2">3.1 Application and Approval</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All prospective members must submit an application for review</li>
                    <li>Approval is at our sole discretion and is not guaranteed</li>
                    <li>We may request additional information or a call before approval</li>
                    <li>We reserve the right to decline applications without providing a reason</li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">3.2 Account Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must notify us immediately of unauthorized access</li>
                    <li>You may not share your account credentials with others</li>
                    <li>You are responsible for all activities under your account</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Membership Fees and Payments</h2>
                  <h3 className="text-xl font-medium text-white mb-2">4.1 Subscription Terms</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Membership fees are billed according to your selected plan</li>
                    <li>All fees are stated in USD unless otherwise specified</li>
                    <li>Subscriptions automatically renew unless cancelled</li>
                    <li>You authorize us to charge your payment method on file</li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">4.2 Refund Policy</h3>
                  <p>
                    Due to the nature of our digital services and immediate access to community resources:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Membership fees are generally non-refundable after access is granted</li>
                    <li>You may cancel your subscription at any time to prevent future charges</li>
                    <li>Cancellation takes effect at the end of your current billing period</li>
                    <li>We may offer refunds at our discretion for exceptional circumstances</li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">4.3 Price Changes</h3>
                  <p>
                    We reserve the right to modify pricing with 30 days notice. Existing members will be
                    notified before any price changes affect their subscription.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Community Conduct</h2>
                  <p>
                    As a member of the Growzilla community, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Treat all members with respect and professionalism</li>
                    <li>Share knowledge generously and constructively</li>
                    <li>Keep confidential information shared by other members private</li>
                    <li>Not engage in spam, self-promotion, or unsolicited solicitation</li>
                    <li>Not share or resell community content or AI systems</li>
                  </ul>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">Prohibited Conduct</h3>
                  <p>You agree NOT to:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Harass, bully, or intimidate other members</li>
                    <li>Share hateful, discriminatory, or offensive content</li>
                    <li>Misrepresent your identity or business information</li>
                    <li>Share proprietary AI systems or content outside the community</li>
                    <li>Attempt to recruit or poach from within the community</li>
                    <li>Engage in any illegal activities or promote illegal conduct</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
                  <h3 className="text-xl font-medium text-white mb-2">6.1 Our Property</h3>
                  <p>
                    The Service, including all content, features, AI systems, frameworks, and functionality,
                    is owned by Growzilla and protected by intellectual property laws. You may not copy,
                    modify, distribute, or create derivative works without our express permission.
                  </p>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">6.2 Your Content</h3>
                  <p>
                    You retain ownership of content you create and share within the community. By posting
                    content, you grant us a license to use, display, and distribute it within the Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Disclaimers and Limitations</h2>
                  <h3 className="text-xl font-medium text-white mb-2">7.1 No Guarantee of Results</h3>
                  <p>
                    While our AI systems and community resources are designed to help improve your business,
                    we make no guarantees regarding specific results. Success depends on many factors
                    including your implementation, market conditions, and business fundamentals.
                  </p>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">7.2 Service Provided &ldquo;As Is&rdquo;</h3>
                  <p>
                    The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
                    either express or implied. We do not warrant that the Service will be uninterrupted,
                    secure, or error-free.
                  </p>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">7.3 Limitation of Liability</h3>
                  <p>
                    To the maximum extent permitted by law, Growzilla shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages arising from your use of the
                    Service. Our total liability shall not exceed the amount paid by you in the 12 months
                    preceding the claim.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">8. Termination</h2>
                  <h3 className="text-xl font-medium text-white mb-2">8.1 Termination by You</h3>
                  <p>
                    You may cancel your membership at any time through your account settings or by
                    contacting us. Cancellation takes effect at the end of your current billing period.
                  </p>

                  <h3 className="text-xl font-medium text-white mb-2 mt-6">8.2 Termination by Us</h3>
                  <p>
                    We may suspend or terminate your membership immediately, without prior notice, for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Violation of these Terms or community guidelines</li>
                    <li>Conduct harmful to other members or the community</li>
                    <li>Non-payment of fees</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Any other reason at our sole discretion</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">9. Confidentiality</h2>
                  <p>
                    Information shared within the Growzilla community, including member discussions,
                    AI systems, and strategic insights, is confidential. You agree not to disclose
                    confidential information to third parties without the consent of the disclosing party.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the
                    State of Delaware, United States, without regard to its conflict of law provisions.
                    Any disputes arising from these Terms shall be resolved in the courts of Delaware.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms at any time. We will notify members of
                    material changes via email or through the Service. Your continued use after changes
                    are posted constitutes acceptance of the revised Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Information</h2>
                  <p>
                    For questions about these Terms of Service, please contact us at:
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

export default TermsPage;
