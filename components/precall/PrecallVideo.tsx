import React, { useMemo } from 'react';

function resolveVideoUrl(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PRECALL_VIDEO_URL) {
    return process.env.NEXT_PUBLIC_PRECALL_VIDEO_URL.trim();
  }
  return '';
}

function toEmbedUrl(url: string): { type: 'iframe' | 'video' | 'none'; src: string } {
  if (!url) return { type: 'none', src: '' };

  // YouTube
  const yt =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/);
  if (yt) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}?rel=0` };
  }

  // Loom
  const loom = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (loom) {
    return { type: 'iframe', src: `https://www.loom.com/embed/${loom[1]}` };
  }

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }

  // Direct mp4 / public path
  if (url.endsWith('.mp4') || url.startsWith('/') || url.startsWith('http')) {
    return { type: 'video', src: url };
  }

  return { type: 'none', src: '' };
}

const PrecallVideo: React.FC = () => {
  const rawUrl = useMemo(() => resolveVideoUrl(), []);
  const embed = useMemo(() => toEmbedUrl(rawUrl), [rawUrl]);

  return (
    <section id="video" className="pb-14 sm:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-xl border border-white/[0.08] bg-zilla-surface overflow-hidden">
          <div className="relative aspect-video bg-zilla-black">
            {embed.type === 'iframe' && (
              <iframe
                src={embed.src}
                title="Founder Pipeline OS — Precall video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {embed.type === 'video' && (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src={embed.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {embed.type === 'none' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-14 h-14 rounded-full border border-zilla-neon/30 bg-zilla-neon/[0.08] flex items-center justify-center mb-5">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-zilla-neon ml-1" />
                </div>
                <p className="text-white font-medium text-base sm:text-lg">
                  Precall video loading soon
                </p>
                <p className="mt-2 text-sm text-white/45 max-w-md">
                  Set <code className="text-zilla-neon/80 text-xs">NEXT_PUBLIC_PRECALL_VIDEO_URL</code>{' '}
                  or drop an MP4 — booking below is open now.
                </p>
                <a
                  href="#book"
                  className="mt-6 inline-flex items-center text-sm font-medium text-zilla-neon hover:text-zilla-glow transition-colors"
                >
                  Skip to book the call →
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-white/45">
          Still relevant after watching? Book below. The call is a diagnosis — not a pitch.
        </p>
      </div>
    </section>
  );
};

export default PrecallVideo;
