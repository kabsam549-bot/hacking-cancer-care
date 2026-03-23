"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const challenges = [
  {
    number: "01",
    title: "Reducing Preventable Readmissions in Oncology",
    summary:
      "Lowering avoidable readmissions by strengthening discharge planning, symptom monitoring, and post-discharge support for cancer patients.",
    detail:
      "Post-discharge complications in oncology are often predictable but not detected early enough. Patients leave with complex medications, evolving symptoms, and tight follow-up schedules. Teams will propose solutions that identify risk, keep patients connected to care teams, and close the gaps that lead to preventable readmissions.",
    themes: [
      "Early warning symptom monitoring and escalation",
      "Discharge checklists that personalize follow-up plans",
      "Medication and side-effect management support",
      "Caregiver and outpatient coordination workflows",
    ],
  },
  {
    number: "02",
    title: "Simulated Education for Cancer Care Teams",
    summary:
      "Reimagining training with simulations that prepare teams for complex oncology scenarios before they happen.",
    detail:
      "Cancer care involves rare events, fast-changing protocols, and high-stakes communication. Teams will envision simulation-based education that helps clinicians practice decision-making, teamwork, and patient conversations in realistic scenarios that scale across departments.",
    themes: [
      "Virtual patient cases and interactive scenarios",
      "Team-based simulations for rapid response situations",
      "Procedural rehearsal and competency tracking",
      "Feedback loops that measure skill growth over time",
    ],
  },
  {
    number: "03",
    title: "Accelerating Research Efficiency in Oncology",
    summary:
      "Cutting the time from clinical question to actionable insight by streamlining research workflows.",
    detail:
      "Oncology research is slowed by manual chart review, fragmented data, and inefficient trial pipelines. Teams will propose approaches that automate data extraction, cohort building, and eligibility matching so research teams can move faster without sacrificing rigor.",
    themes: [
      "Automated chart abstraction and data harmonization",
      "Clinical trial matching and eligibility screening",
      "Cohort discovery and retrospective analytics",
      "Literature synthesis and evidence tracking",
    ],
  },
  {
    number: "04",
    title: "Improving Patient Throughput in Cancer Care Operations",
    summary:
      "Reducing wait times and bottlenecks across clinics, imaging, infusion, and radiation operations.",
    detail:
      "Patient flow is constrained by scheduling complexity, capacity limits, and variability in visit length. Teams will pitch ideas that forecast demand, optimize scheduling, and improve real-time coordination so patients move smoothly through care.",
    themes: [
      "Predictive scheduling and capacity planning",
      "Real-time patient flow dashboards and alerts",
      "No-show reduction and dynamic waitlist management",
      "Resource orchestration across departments",
    ],
  },
];

export default function ChallengesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="challenges"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
              Challenge Areas
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Challenge Areas
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Each team selects one challenge area and spends the day building a
              solution. Problems are real. Impact is immediate.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge, i) => (
            <ScrollReveal key={challenge.number} delay={i * 75}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  expanded === i
                    ? "border-accent-600/60 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full text-left p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-accent-500/60 font-mono text-xs font-bold mt-1 shrink-0">
                      {challenge.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 font-semibold text-base mb-2 leading-snug">
                        {challenge.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {challenge.summary}
                      </p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${
                        expanded === i ? "rotate-180" : ""
                      }`}
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
                  </div>
                </button>

                {expanded === i && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {challenge.detail}
                    </p>
                    <div>
                      <p className="text-accent-600 text-xs font-medium uppercase tracking-wide mb-2">
                        Example Directions
                      </p>
                      <ul className="space-y-1.5">
                        {challenge.themes.map((theme) => (
                          <li
                            key={theme}
                            className="text-gray-500 text-sm flex items-start gap-2"
                          >
                            <span className="text-accent-500 mt-1 shrink-0">
                              &mdash;
                            </span>
                            {theme}
                          </li>
                        ))}
                      </ul>
                    </div>
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
