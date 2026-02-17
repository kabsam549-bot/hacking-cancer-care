"use client";

import { useState, useEffect } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "challenges", label: "Challenges" },
  { id: "schedule", label: "Schedule" },
  { id: "register", label: "Register" },
  { id: "faq", label: "FAQ" },
];

export default function Nav({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHero = activeSection === "hero";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#hero"
          className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
            isHero && !scrolled ? "text-white" : "text-[var(--color-navy)]"
          }`}
        >
          HCC
          <span className="hidden sm:inline text-[10px] font-normal tracking-wider uppercase ml-2 opacity-50">
            AIDH Hackathon
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const isActive = activeSection === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200 ${
                  isActive
                    ? scrolled
                      ? "bg-[var(--color-navy)] text-white font-medium"
                      : "bg-white/15 text-white font-medium"
                    : isHero && !scrolled
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-gray-100"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 transition-colors ${
            isHero && !scrolled ? "text-white" : "text-[var(--color-navy)]"
          }`}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 py-3 space-y-1"
          style={{
            background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(26,26,46,0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                scrolled
                  ? "text-[var(--color-text-muted)] hover:bg-gray-100 hover:text-[var(--color-text)]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
