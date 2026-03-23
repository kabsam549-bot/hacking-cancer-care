"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Do I need coding or technical experience?",
    a: "No. This is not a coding competition. Teams will build prototypes using no-code tools, AI platforms, design tools, and creative problem-solving. Your domain expertise — whether clinical, operational, or administrative — is what we need.",
  },
  {
    q: "What should I bring?",
    a: "A laptop (required) and your curiosity. Everything else is provided — tools, mentors, food, and a working space. Come ready to collaborate with people outside your usual team.",
  },
  {
    q: "Can I participate if I'm not at MD Anderson?",
    a: "Registration is currently open to MD Anderson Cancer Center personnel only, verified by @mdanderson.org email. We may expand in future iterations.",
  },
  {
    q: "How are teams formed?",
    a: "We build balanced teams from registration data, pairing clinical, technical, and operational backgrounds. You will not form your own team — and that's intentional. Working with people you haven't met before is core to the experience.",
  },
  {
    q: "What tools and platforms are provided?",
    a: "Teams have access to no-code platforms (Bubble, Glide), AI tools (ChatGPT, Claude, Gemini), design tools (Figma, Canva, Whimsical), and productivity tools. Mentors with technical expertise are available throughout the day if you want to go further.",
  },
  {
    q: "Is food provided?",
    a: "Yes. Breakfast, lunch, and snacks are provided throughout the day. Please indicate any dietary restrictions in your registration so we can accommodate you.",
  },
  {
    q: "What if I can't stay the full day?",
    a: "Full-day attendance is expected. The hackathon is designed as a complete arc from team formation to final pitch. If you have a conflict, please reach out before registering.",
  },
  {
    q: "Who organizes this event?",
    a: "Hacking Cancer Care is organized by the AI and Digital Health (AIDH) Committee at MD Anderson Cancer Center. For questions, contact the organizing team at rkouzy@mdanderson.org.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
              Questions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 40}>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 font-medium text-sm leading-relaxed">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${
                      open === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {open === i && (
                  <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
