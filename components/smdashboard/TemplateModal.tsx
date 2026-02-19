import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import type { SMInsight } from '@/types/smdashboard';

interface TemplateModalProps {
  insight: SMInsight | null;
  onClose: () => void;
}

const ACTION_LABELS: Record<string, string> = {
  template: 'Content Template',
  strategy: 'Strategy Brief',
  playbook: 'Creator Playbook',
  brief: 'Investment Brief',
};

const TemplateModal: React.FC<TemplateModalProps> = ({ insight, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (insight) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(t);
    }
  }, [insight]);

  if (!insight) return null;

  const template = insight.template;

  const handleCopy = () => {
    const text = [
      `Hook: ${template.hook}`,
      '',
      'Script:',
      ...template.script.map((s, i) => `${i + 1}. ${s}`),
      '',
      `Hashtags: ${template.hashtags.join(' ')}`,
      '',
      'Recording Notes:',
      ...template.recordingNotes.map((n) => `- ${n}`),
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-zilla-dark/95 backdrop-blur-xl shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>

          {/* Header */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">\u2728</span>
              <h3 className="text-base font-medium text-white">
                {ACTION_LABELS[insight.ctaAction] || 'Template'}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zilla-neon/10 text-zilla-neon border border-zilla-neon/20">
                AI Generated
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Based on: {insight.title}
            </p>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-zilla-neon/30 border-t-zilla-neon rounded-full animate-spin mb-3" />
                <p className="text-sm text-gray-400">Generating template...</p>
                <p className="text-[10px] text-gray-600 mt-1">Analyzing top-performing content patterns</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {/* Hook */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">\ud83c\udfaf</span>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Hook (first 3 seconds)
                    </h4>
                  </div>
                  <div className="rounded-lg border border-zilla-neon/20 bg-zilla-neon/5 p-3">
                    <p className="text-sm text-white font-medium italic">
                      &ldquo;{template.hook}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Script */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">\ud83d\udcdd</span>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Script Structure
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {template.script.map((step, i) => (
                      <div
                        key={i}
                        className="flex gap-3 text-sm text-gray-300 leading-relaxed"
                      >
                        <span className="text-zilla-neon font-mono text-xs flex-shrink-0 mt-0.5">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hashtags */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">#</span>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Hashtags
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {template.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs font-mono bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recording Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">\ud83d\udccb</span>
                    <h4 className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      Recording Notes
                    </h4>
                  </div>
                  <div className="space-y-1.5">
                    {template.recordingNotes.map((note, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-gray-400"
                      >
                        <span className="text-gray-600 mt-0.5">\u2022</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zilla-neon text-zilla-black text-sm font-medium hover:bg-zilla-glow transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-4 h-4" />
                        Copy All
                      </>
                    )}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                    \ud83d\udcbe Save to Library
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TemplateModal;
