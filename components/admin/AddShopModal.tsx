import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface AddShopModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (domain: string, label: string) => Promise<void>;
}

const AddShopModal: React.FC<AddShopModalProps> = ({ open, onClose, onAdd }) => {
  const [domain, setDomain] = useState('');
  const [label, setLabel] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDomain('');
      setLabel('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await onAdd(domain.trim(), label.trim() || domain.trim());
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md card-zilla p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-bold text-white">Add Store</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="shop-domain" className="block text-sm text-gray-400 mb-1.5">
              Shopify Domain
            </label>
            <input
              ref={inputRef}
              id="shop-domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="store.myshopify.com"
              className="w-full px-4 py-2.5 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="shop-label" className="block text-sm text-gray-400 mb-1.5">
              Display Name <span className="text-gray-600">(optional)</span>
            </label>
            <input
              id="shop-label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="My Store"
              className="w-full px-4 py-2.5 bg-zilla-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-zilla-neon/50 focus:ring-1 focus:ring-zilla-neon/30 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-zilla-danger">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-zilla-outline text-sm py-2.5">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !domain.trim()}
              className="flex-1 btn-zilla text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-zilla-black border-t-transparent rounded-full animate-spin" />
                  Adding...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Add Store
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShopModal;
