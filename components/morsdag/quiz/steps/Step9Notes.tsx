'use client';

import type { MorsdagQuizData } from '@/lib/morsdag/types';
import StepLayout from './_layout';

interface Props {
  data: MorsdagQuizData;
  update: (partial: Partial<MorsdagQuizData>) => void;
  submitting: boolean;
  onSubmit: () => void;
  prev: () => void;
}

export default function Step9Notes({ data, update, submitting, onSubmit, prev }: Props) {
  return (
    <StepLayout
      eyebrow="Steg 9"
      heading="Vad säljer ni och varför tror ni att det kan funka till Mors dag?"
      onBack={submitting ? undefined : prev}
      primaryCta={{ label: 'Skicka ansökan', onClick: onSubmit, loading: submitting }}
    >
      <div>
        <label
          htmlFor="notes"
          className="block text-[11px] font-mono uppercase tracking-[0.18em] text-white/55 mb-2"
        >
          Berätta kort
        </label>
        <textarea
          id="notes"
          rows={6}
          value={data.notes}
          onChange={(e) => update({ notes: e.target.value })}
          disabled={submitting}
          className="w-full bg-white/[0.03] border border-white/10 focus:border-morsdag-rose px-4 py-3 rounded-lg text-white placeholder-white/30 focus:outline-none transition-colors resize-y disabled:opacity-60"
          placeholder="Vi säljer handgjorda doftljus, marginal runt 70%. Mors dag är vår näst största säsong efter jul. Vi har en ny limited edition redo att lansera."
        />
      </div>
    </StepLayout>
  );
}
