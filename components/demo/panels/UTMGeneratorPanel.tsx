import React, { useState } from 'react';
import type { Platform } from '@/types/smdashboard';
import { platformColor } from '@/lib/design-tokens';

const UTMGeneratorPanel: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [creator, setCreator] = useState('sarahglow');
  const [contentType, setContentType] = useState('reel');
  const [copied, setCopied] = useState(false);

  const generatedUrl = `https://glowserum.com?utm_source=${platform}&utm_medium=social&utm_campaign=glowserum_${creator}&utm_content=${contentType}_${Date.now().toString(36)}`;

  function handleCopy() {
    navigator.clipboard.writeText(generatedUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Platform */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
          Platform
        </label>
        <div className="flex gap-1.5">
          {(['tiktok', 'instagram', 'youtube'] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                platform === p
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300 bg-white/[0.02]'
              }`}
              style={
                platform === p
                  ? { backgroundColor: `${platformColor(p)}20`, color: platformColor(p), border: `1px solid ${platformColor(p)}40` }
                  : { border: '1px solid rgba(255,255,255,0.06)' }
              }
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Creator handle */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
          Creator Handle
        </label>
        <input
          type="text"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#00FF94]/30"
          placeholder="@handle"
        />
      </div>

      {/* Content type */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
          Content Type
        </label>
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#00FF94]/30 appearance-none"
        >
          <option value="reel">Reel</option>
          <option value="video">Video</option>
          <option value="post">Post</option>
          <option value="story">Story</option>
        </select>
      </div>

      {/* Generated URL */}
      <div>
        <label className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium block mb-1.5">
          Generated URL
        </label>
        <div className="p-3 rounded-md bg-white/[0.02] border border-white/[0.06] break-all">
          <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">{generatedUrl}</p>
        </div>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="w-full py-2.5 rounded-lg bg-[#00FF94] text-[#09090B] text-sm font-semibold hover:bg-[#00E676] transition-colors"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <p className="text-[10px] text-zinc-600 text-center">
        Demo mode — links are not tracked
      </p>
    </div>
  );
};

export default UTMGeneratorPanel;
