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
      className="relative min-h-screen flex items-center justify-center bg-[var(--color-navy)] text-white overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Red accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-[0.06] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
          MD Anderson Cancer Center
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-3">
          Hacking
          <br />
          <span className="text-[var(--color-accent)]">Cancer Care</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 font-light mb-2">
          AIDH Mini Hackathon
        </p>
        <p className="text-sm text-white/40 mb-10">
          Saturday, May 2, 2026
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-12">
          {[
            { value: days, label: "Days" },
            { value: hours, label: "Hours" },
            { value: minutes, label: "Min" },
            { value: seconds, label: "Sec" },
          ].map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/40 mt-2 block">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            className="px-8 py-3.5 bg-[var(--color-accent)] text-white font-semibold text-sm rounded-lg hover:bg-[var(--color-accent-light)] transition-colors"
          >
            Register Now
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 border border-white/15 text-white/80 font-medium text-sm rounded-lg hover:bg-white/5 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
