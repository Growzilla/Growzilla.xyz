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

        <div className="relative rounded-2xl bg-zilla-surface/50 border border-gray-800/50 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* Video */}
          <div className="relative aspect-video bg-zilla-charcoal/30">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              playsInline
              poster=""
            >
              <source src="/ugc-conversion-story.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPlaceholder;
