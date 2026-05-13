'use client';

import { useEffect, useRef, useState } from 'react';
import type { MorsdagQuizData } from '@/lib/morsdag/types';
import StepLayout from './_layout';

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  next: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Step1Contact({ data, update, next }: Props) {
  const namnRef = useRef<HTMLInputElement>(null);
  const foretagRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefonRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    namnRef.current?.focus();
  }, []);

  const c = data.contact;

  function setField<K extends keyof MorsdagQuizData['contact']>(key: K, value: string) {
    update({ contact: { ...c, [key]: value } });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!c.namn.trim()) next.namn = 'Fyll i ditt namn.';
    if (!c.foretag.trim()) next.foretag = 'Fyll i företagsnamn.';
    if (!c.email.trim()) next.email = 'Fyll i email.';
    else if (!EMAIL_RE.test(c.email.trim())) next.email = 'Ogiltig email.';
    if (!c.url.trim()) next.url = 'Fyll i webbshopens URL.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit() {
    if (validate()) next();
  }

  function focusNextOrSubmit(current: HTMLInputElement | null) {
    if (!current) return;
    const order = [namnRef, foretagRef, emailRef, telefonRef, urlRef];
    const idx = order.findIndex((r) => r.current === current);
    if (idx >= 0 && idx < order.length - 1) {
      order[idx + 1].current?.focus();
    } else {
      submit();
    }
  }

  return (
    <StepLayout
      eyebrow="Steg 1"
      heading="Berätta vilka ni är."
      subheading="Vi behöver lite kontaktinfo innan vi börjar."
      primaryCta={{ label: 'Nästa', onClick: submit }}
    >
      <div className="grid gap-5">
        <Field
          id="namn"
          label="Namn"
          required
          error={errors.namn}
        >
          <input
            ref={namnRef}
            id="namn"
            type="text"
            autoComplete="name"
            value={c.namn}
            onChange={(e) => setField('namn', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-morsdag-rose px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="Anna Andersson"
          />
        </Field>
        <Field id="foretag" label="Företag" required error={errors.foretag}>
          <input
            ref={foretagRef}
            id="foretag"
            type="text"
            autoComplete="organization"
            value={c.foretag}
            onChange={(e) => setField('foretag', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-morsdag-rose px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="Ditt företag AB"
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
            className="w-full bg-white/[0.03] border border-white/10 focus:border-morsdag-rose px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="anna@dittforetag.se"
          />
        </Field>
        <Field id="telefon" label="Telefonnummer (valfritt)" error={errors.telefon}>
          <input
            ref={telefonRef}
            id="telefon"
            type="tel"
            autoComplete="tel"
            value={c.telefon ?? ''}
            onChange={(e) => setField('telefon', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                focusNextOrSubmit(e.currentTarget);
              }
            }}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-morsdag-rose px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="+46 70 123 45 67"
          />
        </Field>
        <Field id="url" label="Webbshop URL" required error={errors.url}>
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
            className="w-full bg-white/[0.03] border border-white/10 focus:border-morsdag-rose px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors"
            placeholder="https://dinbutik.se"
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
        {label} {required && <span className="text-morsdag-rose">*</span>}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-morsdag-rose">{error}</p>}
    </div>
  );
}
