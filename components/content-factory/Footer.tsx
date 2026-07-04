export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-zilla-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-baseline gap-0.5">
          <span className="font-display text-[14px] font-semibold text-white/80">Growzill</span>
          <span className="font-display text-[14px] font-semibold text-zilla-neon">a</span>
        </div>
        <p className="text-[13px] text-white/40">
          Content partner for startups · Stockholm
        </p>
      </div>
    </footer>
  )
}