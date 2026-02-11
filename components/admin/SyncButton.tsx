import React, { useState } from 'react';
import type { SyncStatus } from '@/types/admin';
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface SyncButtonProps {
  domain: string;
  onSyncComplete?: () => void;
}

const SyncButton: React.FC<SyncButtonProps> = ({ domain, onSyncComplete }) => {
  const [status, setStatus] = useState<SyncStatus>('idle');

  const handleSync = async () => {
    if (status === 'syncing') return;

    setStatus('syncing');
    try {
      const res = await fetch(`/api/admin/shops/${encodeURIComponent(domain)}/sync`, {
        method: 'POST',
      });

      if (res.ok) {
        setStatus('success');
        onSyncComplete?.();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const config = {
    idle: {
      icon: ArrowPathIcon,
      label: 'Sync Data',
      className: 'btn-zilla-outline text-xs py-1.5 px-3',
    },
    syncing: {
      icon: ArrowPathIcon,
      label: 'Syncing...',
      className: 'btn-zilla-outline text-xs py-1.5 px-3 opacity-70 cursor-wait',
    },
    success: {
      icon: CheckCircleIcon,
      label: 'Synced',
      className: 'text-xs py-1.5 px-3 border border-zilla-neon/30 rounded-lg text-zilla-neon bg-zilla-neon/10',
    },
    error: {
      icon: ExclamationCircleIcon,
      label: 'Failed',
      className: 'text-xs py-1.5 px-3 border border-zilla-danger/30 rounded-lg text-zilla-danger bg-zilla-danger/10',
    },
  };

  const { icon: Icon, label, className } = config[status];

  return (
    <button onClick={handleSync} disabled={status === 'syncing'} className={`inline-flex items-center gap-1.5 font-medium transition-all ${className}`}>
      <Icon className={`w-3.5 h-3.5 ${status === 'syncing' ? 'animate-spin' : ''}`} />
      {label}
    </button>
  );
};

export default SyncButton;
