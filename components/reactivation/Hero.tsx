import HeroIllustration from "./HeroIllustration";
import HeroBackground from "./HeroBackground";
import MiniWindow from "./MiniWindow";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden"
      style={{ background: "#080808", isolation: "isolate" }}
    >
      <HeroBackground />
      <div
        className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center pt-20 pb-8 md:py-20"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Left: text */}
        <div>
          {/* Headline with logo floating top-right */}
          <div className="relative mb-8 fade-up-delay-1">
            <img
              src="/growzillalogo.png"
              alt=""
              className="md:hidden"
              style={{
                position: "absolute",
                right: 0,
                top: "-4px",
                height: "88px",
                width: "auto",
                opacity: 0.85,
                zIndex: 0,
              }}
            />
            <h1
              className="font-black leading-[0.9] tracking-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                position: "relative",
                zIndex: 1,
              }}
            >
              THE FASTEST <span style={{ color: "#00FF66" }}>REVENUE</span>
              <br />
              IS FROM PEOPLE WHO
              <br />
              HAVE ALREADY SAID <span style={{ color: "#00FF66" }}>YES.</span>
            </h1>
          </div>

          {/* Sub */}
          <p
            className="text-sm md:text-base max-w-xl mb-8 md:mb-12 leading-relaxed fade-up-delay-2"
            style={{ color: "var(--slate)" }}
          >
            We reactivate dormant email subscribers and turn cold lists into
            consistent revenue. No ad spend. No new leads. Just money you&apos;re
            already leaving behind.
          </p>

          {/* Mini window — mobile only */}
          <div className="md:hidden mb-8 fade-up-delay-2" style={{ opacity: 0.8 }}>
            <MiniWindow />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 fade-up-delay-3 mt-20 md:mt-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: "#00FF66", color: "#080808" }}
            >
              Get Your Free Audit
              <span>→</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/5"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff",
              }}
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Right: full illustration — desktop only */}
        <div className="hidden md:flex items-center justify-center fade-up-delay-2">
          <HeroIllustration />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          background: "linear-gradient(to bottom, transparent, #080808)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </section>
  );
}
