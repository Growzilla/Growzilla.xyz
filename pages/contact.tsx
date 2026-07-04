import React from 'react'
import Head from 'next/head'
import LeadForm from '../components/LeadForm'

/**
 * /contact — minimal host page for the generic LeadForm.
 * Submitting pings the operator on WhatsApp (CallMeBot) + emails a backup.
 */
const ContactPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Get in touch · Growzilla</title>
        <meta name="description" content="Tell us about your store — we’ll reach out fast." />
      </Head>
      <main className="min-h-screen bg-zilla-black flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg">
          <LeadForm source="contact_page" />
        </div>
      </main>
    </>
  )
}

export default ContactPage
