import * as React from 'react';
import type { ErrorEnvelope } from './ErrorCard.types';

export type ErrorCardProps = {
  envelope: ErrorEnvelope;
  className?: string;
};

export function ErrorCard({ envelope, className }: ErrorCardProps): React.ReactElement {
  const [copied, setCopied] = React.useState(false);
  const e = envelope.error;

  const onCopy = React.useCallback(async () => {
    const text = JSON.stringify(envelope, null, 2);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: create a textarea, select, execCommand
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [envelope]);

  const root =
    'rounded-lg border border-red-200 bg-red-50/60 p-4 text-sm' +
    (className ? ' ' + className : '');

  return (
    <div className={root} role="alert" aria-live="assertive" data-testid="error-card">
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-red-700">
          {(e.id ?? 'NO-ID')} · {e.code}
        </code>
        <button
          type="button"
          onClick={onCopy}
          className="text-xs text-red-700 underline hover:text-red-900"
          data-testid="error-card-copy"
        >
          {copied ? 'Copied' : 'Copy error'}
        </button>
      </div>
      <p className="mt-1 text-red-800">{e.message}</p>
      {(e.file || e.line != null) && (
        <p className="mt-1 text-xs text-red-500">
          {e.file ?? 'unknown'}
          {e.line != null ? `:${e.line}` : ''}
        </p>
      )}
      {e.trace_id && (
        <p className="mt-1 text-xs text-red-400">trace: {e.trace_id}</p>
      )}
    </div>
  );
}

export default ErrorCard;
