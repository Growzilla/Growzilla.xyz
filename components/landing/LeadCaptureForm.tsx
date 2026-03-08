import React, { useState } from 'react';

interface LeadCaptureFormProps {
  variant?: 'hero' | 'inline' | 'compact';
  onSubmit?: (data: LeadData) => void;
}

export interface LeadData {
  email: string;
  whatsapp: string;
  storeUrl: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ variant = 'hero', onSubmit }) => {
  const [form, setForm] = useState<LeadData>({ email: '', whatsapp: '', storeUrl: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate store URL
    const storeUrl = form.storeUrl.trim().toLowerCase();
    if (!storeUrl.includes('.myshopify.com')) {
      setError('Please enter a valid .myshopify.com store URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          whatsapp: form.whatsapp || undefined,
          store_url: storeUrl.replace('https://', '').replace('http://', ''),
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setSuccess(true);
      onSubmit?.(form);
    } catch {
      setError('Something went wrong. Try again or email contact@growzilla.xyz');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`rounded-xl border border-zilla-neon/30 bg-zilla-neon/5 p-6 ${variant === 'compact' ? 'p-4' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zilla-neon/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-zilla-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-white font-medium">You&apos;re in.</p>
            <p className="text-sm text-gray-400">We&apos;ll reach out within 24 hours to get you set up.</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="flex-1 bg-zilla-surface border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
        />
        <input
          type="text"
          required
          placeholder="yourstore.myshopify.com"
          value={form.storeUrl}
          onChange={(e) => setForm({ ...form, storeUrl: e.target.value })}
          className="flex-1 bg-zilla-surface border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-zilla px-6 py-3 text-sm font-medium whitespace-nowrap disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Get Started Free →'}
        </button>
        {error && <p className="text-red-400 text-xs col-span-full">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-zilla-surface border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
        />
      </div>
      <div>
        <input
          type="text"
          required
          placeholder="yourstore.myshopify.com"
          value={form.storeUrl}
          onChange={(e) => setForm({ ...form, storeUrl: e.target.value })}
          className="w-full bg-zilla-surface border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="WhatsApp (optional) — +46 70 123 4567"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          className="w-full bg-zilla-surface border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/50 transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-zilla py-4 text-base font-semibold disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Get Started Free →'}
      </button>
      <p className="text-center text-xs text-gray-500">
        Free forever. Paid plans when you&apos;re ready.
      </p>
      {error && <p className="text-red-400 text-xs text-center">{error}</p>}
    </form>
  );
};

export default LeadCaptureForm;
