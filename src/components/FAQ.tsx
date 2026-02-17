"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need coding experience?",
    a: "No. This hackathon is designed for multidisciplinary teams. Clinical insight, design thinking, and operational knowledge are just as valuable as technical skills. No-code tools and AI assistants are provided.",
  },
  {
    q: "What should I bring?",
    a: "A laptop and curiosity. We provide everything else: food, tools, mentors, and workspace.",
  },
  {
    q: "Can I participate if I'm not at MD Anderson?",
    a: "This inaugural event is currently limited to MD Anderson Cancer Center faculty, trainees, and staff. We hope to expand in future editions.",
  },
  {
    q: "How are teams formed?",
    a: "We build balanced teams from registration data -- mixing clinical, technical, and operational backgrounds. You will not need to arrive with a pre-formed team.",
  },
  {
    q: "What tools are available?",
    a: "No-code prototyping platforms (Figma, v0.dev), AI assistants (ChatGPT, Copilot), and experienced mentors in clinical informatics, design, and implementation science.",
  },
  {
    q: "Is food provided?",
    a: "Yes. Breakfast, lunch, snacks, and drinks are provided for all participants throughout the day.",
  },
  {
    q: "What if I can't stay all day?",
    a: "Full-day attendance is expected. The event is structured as a continuous experience from 8 AM to 5:30 PM, and teams depend on every member being present.",
  },
  {
    q: "Who organizes this?",
    a: "The AIDH (AI/Digital Health) Committee at MD Anderson Cancer Center, with support from institutional leadership.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-5 flex items-center justify-between gap-4"
              >
                <span className="text-base font-medium text-[var(--color-navy)]">
                  {f.q}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
