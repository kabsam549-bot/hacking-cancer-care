export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[var(--color-navy)] text-white overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-300 mb-6">
          MD Anderson Cancer Center
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-4">
          Hacking
          <br />
          Cancer Care
        </h1>
        <p className="text-lg sm:text-xl text-blue-200 font-light mb-2">
          AIDH Mini Hackathon
        </p>
        <p className="text-base text-blue-300/80 mb-12">
          Saturday, May 2, 2026
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            className="px-8 py-3.5 bg-white text-[var(--color-navy)] font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors"
          >
            Register Now
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 border border-white/20 text-white font-medium text-sm rounded-lg hover:bg-white/5 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-navy)] to-transparent" />
    </section>
  );
}
