import React, { useMemo } from 'react';

/** Local precall recording. Env override optional for Loom/YouTube later. */
const LOCAL_PRECALL_VIDEO = '/precall/precall.mp4';

function resolveVideoUrl(forceLocal?: boolean): string {
  if (forceLocal) return LOCAL_PRECALL_VIDEO;
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PRECALL_VIDEO_URL) {
    return process.env.NEXT_PUBLIC_PRECALL_VIDEO_URL.trim();
  }
  return LOCAL_PRECALL_VIDEO;
}

function toEmbedUrl(url: string): { type: 'iframe' | 'video' | 'none'; src: string } {
  if (!url) return { type: 'none', src: '' };

  const yt =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/);
  if (yt) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}?rel=0` };
  }

  const loom = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (loom) {
    return { type: 'iframe', src: `https://www.loom.com/embed/${loom[1]}` };
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }

  if (url.endsWith('.mp4') || url.startsWith('/') || url.startsWith('http')) {
    return { type: 'video', src: url };
  }

  return { type: 'none', src: '' };
}

type PrecallVideoProps = {
  /** Always use /precall/precall.mp4 (ignore env override). */
  forceLocal?: boolean;
};

const PrecallVideo: React.FC<PrecallVideoProps> = ({ forceLocal = false }) => {
  const rawUrl = useMemo(() => resolveVideoUrl(forceLocal), [forceLocal]);
  const embed = useMemo(() => toEmbedUrl(rawUrl), [rawUrl]);

  return (
    <section id="video" className="pb-6 sm:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-xl border border-white/[0.1] bg-zilla-surface overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          <div className="relative aspect-video bg-zilla-black">
            {embed.type === 'iframe' && (
              <iframe
                src={embed.src}
                title="Precall — 5–10 qualified meetings from LinkedIn"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {embed.type === 'video' && (
              <video
                className="absolute inset-0 w-full h-full object-contain bg-zilla-black"
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
                <div className="w-14 h-14 rounded-full border border-zilla-neon/25 bg-zilla-neon/[0.05] flex items-center justify-center mb-5">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-zilla-neon ml-1" />
                </div>
                <p className="text-white font-medium text-base sm:text-lg">
                  Precall video loading soon
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

        {/* Mid-page CTA strip */}
        <div className="flex flex-col items-center pt-8 pb-2">
          <p className="text-sm sm:text-base text-white/55 text-center max-w-md mb-4">
            If this already feels like the missing piece, book the fit call. Or keep
            scrolling the system breakdown below.
          </p>
          <a
            href="#book"
            className="group flex flex-col items-center gap-2 text-zilla-neon hover:text-zilla-glow transition-colors"
            aria-label="Scroll to book the fit call"
          >
            <span className="text-xs font-medium tracking-[0.14em] uppercase">
              Book the fit call
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-zilla-neon/40 bg-zilla-neon/[0.08] group-hover:border-zilla-neon/70 group-hover:bg-zilla-neon/[0.14] transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-bounce"
                aria-hidden
              >
                <path
                  d="M10 3v12m0 0l-5-5m5 5l5-5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PrecallVideo;
