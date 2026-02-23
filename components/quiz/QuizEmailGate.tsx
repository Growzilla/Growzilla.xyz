'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface QuizEmailGateProps {
  email: string
  phone: string
  onSubmit: (email: string, phone: string) => void
  onBack: () => void
}

export default function QuizEmailGate({ email: initialEmail, phone: initialPhone, onSubmit, onBack }: QuizEmailGateProps) {
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  function validate() {
    const e: typeof errors = {}
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = 'Please enter a valid email'
    }
    if (!phone.trim()) {
      e.phone = 'Please enter your phone number'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (validate()) {
      onSubmit(email.trim(), phone.trim())
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-white text-sm mb-8 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
          Where should we send your personalized report?
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Get your full breakdown with actionable recommendations.
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="you@company.com"
              className="w-full rounded-xl border border-white/10 bg-zilla-charcoal/40 px-4 py-4 text-white placeholder:text-gray-600 focus:border-zilla-neon/50 focus:outline-none focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
              autoFocus
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })) }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-xl border border-white/10 bg-zilla-charcoal/40 px-4 py-4 text-white placeholder:text-gray-600 focus:border-zilla-neon/50 focus:outline-none focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-zilla w-full mt-6 py-4 rounded-xl text-base"
        >
          Send My Report &rarr;
        </motion.button>

        <p className="text-xs text-gray-600 text-center mt-4">
          We&apos;ll never share your info. No spam, ever.
        </p>
      </motion.div>
    </div>
  )
}
