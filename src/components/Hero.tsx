"use client";

import { useState, useEffect } from "react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero() {
  const hackathonDate = new Date("2026-05-02T08:00:00-05:00");
  const { days, hours, minutes, seconds } = useCountdown(hackathonDate);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center bg-[var(--color-navy)] text-white overflow-hidden px-6 py-16"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Red glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--color-accent)] opacity-[0.05] rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6 sm:mb-10">
          MD Anderson Cancer Center
        </p>

        <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.05]">
          Hacking
        </h1>
        <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.05] text-[var(--color-accent)]">
          Cancer Care
        </h1>

        <p className="mt-4 text-[0.95rem] sm:text-lg text-white/60 font-light tracking-wide">
          One day. Real problems. Actionable solutions.
        </p>

        <div className="mt-4 sm:mt-6 mb-8 sm:mb-10">
          <p className="text-sm sm:text-base text-white/40 font-light">
            AI &amp; Digital Health Mini Hackathon
          </p>
          <div className="inline-flex items-center gap-3 mt-4 px-5 py-2.5 border border-[var(--color-accent)]/30 rounded-full bg-[var(--color-accent)]/[0.08]">
            <svg className="w-4 h-4 text-[var(--color-accent)] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="text-sm sm:text-base font-medium tracking-wide text-white/80">
              Friday, May 2, 2026
            </span>
            <span className="text-xs text-white/40">|</span>
            <span className="text-xs sm:text-sm text-white/50">
              1MC, MD Anderson
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div className="inline-flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {[
            { value: days, label: "Days" },
            { value: hours, label: "Hrs" },
            { value: minutes, label: "Min" },
            { value: seconds, label: "Sec" },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
              <div className="text-center">
                <div className="w-14 sm:w-[4.5rem] h-14 sm:h-[4.5rem] bg-white/[0.05] border border-white/[0.08] rounded-xl flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-white/90">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/30 mt-1.5 block">
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <span className="text-white/20 text-lg font-light mb-4">:</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-3 bg-[var(--color-accent)] text-white font-semibold text-sm rounded-lg hover:brightness-110 transition-all"
          >
            Register Now
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-8 py-3 border border-white/12 text-white/70 font-medium text-sm rounded-lg hover:bg-white/5 transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
