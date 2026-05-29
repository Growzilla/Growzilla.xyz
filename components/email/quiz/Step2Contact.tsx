'use client';

import { useEffect, useRef, useState } from 'react';
import type { EmailQuizData } from '@/lib/email/types';
import StepLayout from './_layout';

interface Props {
  data: EmailQuizData;
  update: (partial: Partial<EmailQuizData>) => void;
  next: () => void;
  prev: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Step2Contact({ data, update, next, prev }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const c = data.contact;

  function setField<K extends keyof EmailQuizData['contact']>(key: K, value: string) {
    update({ contact: { ...c, [key]: value } });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!c.name.trim()) e.name = 'Your name, please.';
    if (!c.brand.trim()) e.brand = 'Your brand name.';
    if (!c.email.trim()) e.email = 'Email required.';
    else if (!EMAIL_RE.test(c.email.trim())) e.email = 'That email looks off.';
    if (!c.url.trim()) e.url = 'Your store URL.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (validate()) next();
  }

  function focusNextOrSubmit(current: HTMLInputElement | null) {
    if (!current) return;
    const order = [nameRef, brandRef, emailRef, urlRef];
    const idx = order.findIndex((r) => r.current === current);
    if (idx >= 0 && idx < order.length - 1) {
      order[idx + 1].current?.focus();
    } else {
      submit();
    }
  }

  return (
    <StepLayout
      eyebrow="Step 2 of 5"
      heading="Who are you?"
      subheading="So we can send your personalized audit and stay in touch."
      onBack={prev}
      primaryCta={{ label: 'Continue', onClick: submit }}
    >
      <div className="grid gap-5">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            ref={nameRef}
            id="name"
            type="text"
            autoComplete="name"
            value={c.name}
            onChange={(e) => setField('name', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="Erik Andersson"
          />
        </Field>
        <Field id="brand" label="Brand" required error={errors.brand}>
          <input
            ref={brandRef}
            id="brand"
            type="text"
            autoComplete="organization"
            value={c.brand}
            onChange={(e) => setField('brand', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="Your Shopify brand"
          />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input
            ref={emailRef}
            id="email"
            type="email"
            autoComplete="email"
            value={c.email}
            onChange={(e) => setField('email', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="you@yourbrand.com"
          />
        </Field>
        <Field id="url" label="Store URL" required error={errors.url}>
          <input
            ref={urlRef}
            id="url"
            type="url"
            inputMode="url"
            value={c.url}
            onChange={(e) => setField('url', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-zilla-neon px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="https://yourbrand.com"
          />
        </Field>
      </div>
    </StepLayout>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 mb-2"
      >
        {label} {required && <span className="text-zilla-neon">*</span>}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-zilla-neon">{error}</p>}
    </div>
  );
}
