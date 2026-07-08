import React, { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { DocumentArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { JobUploadConfig } from '@/types/careers';
import type { JobLocale } from '@/types/careers';

interface Props {
  config: JobUploadConfig;
  locale: JobLocale;
  jobSlug: string;
  kind: 'resume' | 'video';
  value: string | null;
  onChange: (url: string | null) => void;
  fileName?: string | null;
  onFileNameChange?: (name: string | null) => void;
}

export default function FileUpload({
  config,
  locale,
  jobSlug,
  kind,
  value,
  onChange,
  fileName,
  onFileNameChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const label = config.label[locale] ?? config.label.en ?? 'Upload file';
  const hint = config.hint?.[locale] ?? config.hint?.en;

  const handleFile = async (file: File) => {
    setError(null);
    const maxBytes = config.maxMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(`File too large. Max ${config.maxMB} MB.`);
      return;
    }

    setUploading(true);
    setProgress(0);
    onFileNameChange?.(file.name);

    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/careers/upload',
        clientPayload: JSON.stringify({ kind, jobSlug }),
        onUploadProgress: (e) => setProgress(Math.round(e.percentage)),
      });
      onChange(blob.url);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      if (msg.includes('blob_not_configured') || msg.includes('503')) {
        setError('Uploads are not configured yet. Please email hello@growzilla.xyz with your files.');
      } else {
        setError(msg);
      }
      onChange(null);
      onFileNameChange?.(null);
    } finally {
      setUploading(false);
    }
  };

  const clear = () => {
    onChange(null);
    onFileNameChange?.(null);
    setProgress(0);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {config.required && <span className="text-zilla-neon ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-white/40 mb-3">{hint}</p>}

      {value ? (
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-zilla-surface border border-zilla-neon/30 rounded-lg">
          <div className="flex items-center gap-2 min-w-0">
            <DocumentArrowUpIcon className="w-5 h-5 text-zilla-neon shrink-0" />
            <span className="text-sm text-white/80 truncate">{fileName || 'Uploaded'}</span>
          </div>
          <button
            type="button"
            onClick={clear}
            className="p-1 text-white/40 hover:text-white transition-colors"
            aria-label="Remove file"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`relative border border-dashed rounded-lg p-6 text-center transition-colors ${
            uploading
              ? 'border-zilla-neon/40 bg-zilla-neon/5'
              : 'border-white/[0.12] hover:border-zilla-neon/30 cursor-pointer'
          }`}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && !uploading && inputRef.current?.click()}
          role="button"
          tabIndex={0}
        >
          <input
            ref={inputRef}
            type="file"
            accept={config.accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          {uploading ? (
            <div>
              <p className="text-sm text-white/70 mb-2">Uploading… {progress}%</p>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
                <div
                  className="h-full bg-zilla-neon transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <DocumentArrowUpIcon className="w-8 h-8 text-white/30 mx-auto mb-2" />
              <p className="text-sm text-white/55">Click to upload</p>
              <p className="text-xs text-white/35 mt-1">Max {config.maxMB} MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}