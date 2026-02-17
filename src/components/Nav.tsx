"use client";

import { useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "challenges", label: "Challenges" },
  { id: "schedule", label: "Schedule" },
  { id: "register", label: "Register" },
  { id: "faq", label: "FAQ" },
];

export default function Nav({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-[var(--color-navy)]"
        >
          Hacking Cancer Care
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`text-sm transition-colors ${
                activeSection === l.id
                  ? "text-[var(--color-accent)] font-medium"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[var(--color-navy)]"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
