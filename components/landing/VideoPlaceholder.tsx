import React from 'react';

const VideoPlaceholder: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            See Growzilla in Action
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            2-minute walkthrough of how content attribution works.
          </p>
        </div>

        {/* Video embed placeholder */}
        <div className="relative rounded-2xl bg-zilla-surface/50 border border-gray-800/50 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* 16:9 video area */}
          <div className="relative aspect-video flex items-center justify-center bg-zilla-charcoal/30">
            {/* TODO: Replace with actual video embed */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-zilla-neon/10 border border-zilla-neon/30 flex items-center justify-center cursor-pointer hover:bg-zilla-neon/20 hover:scale-105 transition-all duration-200">
                <svg className="w-7 h-7 text-zilla-neon ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 font-mono">Video coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlaceholder;
