"use client";

import { useState } from "react";

const challenges = [
  {
    num: "01",
    title: "Patient Education & Health Literacy",
    short:
      "Patients retain only 20-40% of what they hear in an oncology consultation. How do we close that gap?",
    detail:
      "Design a solution that ensures oncology patients leave a clinical encounter understanding their diagnosis, their treatment plan, and what to do next -- in language they can actually understand. Target a specific patient population and a specific moment in the care journey.",
  },
  {
    num: "02",
    title: "Post-Discharge Care Coordination",
    short:
      "15-30% of oncology patients are readmitted within 30 days. Many of these are preventable.",
    detail:
      "Design a solution that actively supports oncology patients in the 72 hours immediately following hospital discharge -- reducing preventable readmissions, improving medication adherence and side effect monitoring, and ensuring patients know when and how to escalate concerns.",
  },
  {
    num: "03",
    title: "Physician-Patient Communication",
    short:
      "The conversations that change everything -- diagnosis, prognosis, goals of care -- deserve better tools.",
    detail:
      "Design a solution that meaningfully improves the quality, clarity, or outcomes of a physician-patient communication encounter at a specific pivotal moment in cancer care. Choose your moment: the new diagnosis conversation, the treatment options discussion, the goals-of-care conversation.",
  },
  {
    num: "04",
    title: "Cancer Care Workflow Optimization",
    short:
      "Physicians spend 2 hours on admin for every 1 hour of patient care. That math needs to change.",
    detail:
      "Design a solution that meaningfully reduces a specific administrative or operational burden in cancer care delivery -- reducing time spent, errors made, or handoff failures without simply shifting the burden to a different part of the system.",
  },
];

export default function Challenges() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="challenges" className="py-24 bg-[var(--color-warm-gray)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
          Challenge Areas
        </h2>
        <p className="text-[var(--color-text-muted)] mb-12 max-w-2xl">
          Each team picks one. These are real problems drawn from real clinical
          workflows at MD Anderson.
        </p>

        <div className="space-y-4">
          {challenges.map((c, i) => (
            <div
              key={c.num}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-start gap-4"
              >
                <span className="text-sm font-mono text-[var(--color-accent)] mt-0.5 shrink-0">
                  {c.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--color-navy)]">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {c.short}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform ${
                    expanded === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expanded === i && (
                <div className="px-6 pb-5 pl-16">
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {c.detail}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
