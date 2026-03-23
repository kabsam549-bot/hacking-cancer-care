"use client";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-red-50" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-16">
        {/* Institution badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-500/30 bg-accent-600/10 mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-accent-600" />
          <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
            MD Anderson Cancer Center
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
          Hacking
          <br />
          Cancer Care
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-accent-600 font-medium mb-3">
          AI and Digital Health Mini Hackathon
        </p>

        {/* Date and description */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-gray-500 text-sm">
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Saturday, May 2, 2026
          </span>
          <span className="hidden sm:block text-gray-300">|</span>
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Houston, Texas
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("register")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent-600 hover:bg-accent-500 text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-accent-600/25 hover:-translate-y-0.5"
          >
            Register Now
          </button>
          <button
            onClick={() => scrollTo("about")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-900 font-medium text-base transition-all duration-200"
          >
            Learn More
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo("about")}
            className="text-gray-300 hover:text-gray-500 transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
