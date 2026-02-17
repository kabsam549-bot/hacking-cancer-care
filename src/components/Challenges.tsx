"use client";

import { useState, useRef, useEffect } from "react";

const challenges = [
  {
    num: "01",
    title: "The Information Gap",
    subtitle: "Patient Education & Health Literacy",
    hook: "A patient hears \"stage III.\" Ten minutes later, they can't remember what it means.",
    short:
      "Patients retain only 20-40% of what's communicated during an oncology consultation. They leave appointments uncertain about what was discussed, what comes next, and what to watch for. The raw materials for better education exist inside our systems -- they're just not assembled in a way that meets the patient where they are.",
    detail:
      "Design a solution that ensures a cancer patient leaves a clinical encounter actually understanding their diagnosis, treatment plan, and next steps -- in language that works for them. Pick a specific patient and a specific moment: the newly diagnosed patient after their first consult, the patient starting chemo for the first time, the family caregiver who wasn't in the room.",
    examples: [
      "AI-generated plain-language visit summary delivered to MyChart within an hour",
      "Nurse-led 3-minute post-appointment teach-back protocol",
      "Multimedia education module triggered at chemo check-in, tailored to the regimen",
      "Caregiver digest: a brief summary emailed to the patient's care partner",
    ],
  },
  {
    num: "02",
    title: "The 72-Hour Window",
    subtitle: "Post-Discharge Care Coordination",
    hook: "The hospital door closes. For the next three days, the patient is on their own.",
    short:
      "15-30% of oncology patients are readmitted within 30 days -- and a significant share of those readmissions are preventable. Unmanaged side effects, medication confusion, missed follow-ups, delayed escalation. Many MD Anderson patients don't live locally; they're discharged to hotels, long drives, and unfamiliar cities.",
    detail:
      "Design a solution that actively supports oncology patients in the critical 72 hours after discharge. Reduce preventable readmissions, improve medication adherence and side-effect monitoring, and make sure patients know exactly when and how to raise the alarm. Pick your population: the post-surgical patient, the first-time chemo discharge, the patient on complex oral regimens at home.",
    examples: [
      "Automated 48-hour text check-in with structured symptom questions and triage escalation",
      "Personalized one-page discharge document generated from Epic, translated, listing the five things to watch for",
      "24-hour post-discharge phone call by a trained volunteer using a standardized script",
      "MyChart discharge companion: medication schedule, reminders, and a one-button clinic line",
    ],
  },
  {
    num: "03",
    title: "The Conversation That Changes Everything",
    subtitle: "Physician-Patient Communication",
    hook: "\"You have cancer.\" Everything said after that sentence gets harder to hear.",
    short:
      "Delivering a diagnosis. Presenting treatment options to someone with a poor prognosis. Transitioning to palliative care. These are among the most consequential conversations in medicine -- and the least well-supported by existing tools. Patients leave pivotal consultations without a clear understanding of what they were asked to decide.",
    detail:
      "Design a solution that meaningfully improves one specific communication moment in cancer care. The new diagnosis conversation. The treatment decision. The goals-of-care discussion. The clinical trial consent. Pick the moment, design for that patient, and make the conversation land the way it should.",
    examples: [
      "Pre-visit intake: patients list their top questions and primary concern, surfaced to the physician before they walk in",
      "Post-visit audio summary: AI-generated recap of key decisions and next steps, available in MyChart within 24 hours",
      "Visual shared decision-making aid for a specific treatment choice",
      "Communication training module for fellows using de-identified case transcripts with AI feedback",
    ],
  },
  {
    num: "04",
    title: "The Weight of the Work",
    subtitle: "Cancer Care Workflow Optimization",
    hook: "For every hour of patient care, clinicians spend two on paperwork. Something has to give.",
    short:
      "Documentation, prior authorizations, scheduling coordination across five subspecialties, care navigation for newly diagnosed patients. The operational tax on cancer care is enormous -- and it falls hardest on the people who should be spending their time with patients. The systems are deeply interconnected, and fixing one step often just shifts the burden somewhere else.",
    detail:
      "Design a solution that meaningfully reduces one specific administrative or operational burden in cancer care. Choose one workflow, one role, one failure point. The best solutions here don't just save time -- they prevent errors and handoff failures without creating new ones. Be specific. Solve one thing well.",
    examples: [
      "AI-drafted prior authorization letters pre-populated from Epic, ready for one-click review and submission",
      "Smart discharge checklist that auto-populates from Epic and updates in real time for nurse and resident",
      "NLP tool that drafts responses to common patient portal messages for physician review",
      "New patient coordination dashboard showing all scheduled and pending consultations in one view",
    ],
  },
];

function AnimatedExpand({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(isOpen ? ref.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        height,
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
}

export default function Challenges() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setVisible((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="challenges" className="py-24 bg-[var(--color-warm-gray)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-3">
          Four Problems. One Day.
        </h2>
        <p className="text-[var(--color-text-muted)] mb-14 max-w-2xl text-lg">
          Each team picks one challenge area. These aren&apos;t hypotheticals -- they&apos;re drawn
          from the daily reality of cancer care at MD Anderson.
        </p>

        <div className="space-y-5">
          {challenges.map((c, i) => {
            const isOpen = expanded === i;
            const isVisible = visible.has(i);

            return (
              <div
                key={c.num}
                ref={(el) => { refs.current[i] = el; }}
                data-idx={i}
                className="rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, box-shadow 0.2s ease`,
                  background: isOpen ? "white" : "rgba(255,255,255,0.7)",
                  boxShadow: isOpen
                    ? "0 8px 30px rgba(0,0,0,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left px-6 py-6 flex items-start gap-5 group"
                >
                  <span
                    className="text-xs font-mono font-bold shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{
                      background: isOpen ? "var(--color-accent)" : "var(--color-warm-gray)",
                      color: isOpen ? "white" : "var(--color-accent)",
                    }}
                  >
                    {c.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-accent)] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mt-0.5 mb-2">
                      {c.subtitle}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] italic">
                      &ldquo;{c.hook}&rdquo;
                    </p>
                  </div>
                  <div
                    className="shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "var(--color-accent)" : "transparent",
                      border: isOpen ? "none" : "1px solid #e5e7eb",
                    }}
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: isOpen ? "white" : "#9ca3af",
                      }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatedExpand isOpen={isOpen}>
                  <div className="px-6 pb-6 pl-[4.25rem]">
                    <div className="border-t border-gray-100 pt-5">
                      <p className="text-sm text-[var(--color-text)] leading-relaxed mb-4">
                        {c.short}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
                        {c.detail}
                      </p>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-navy)] mb-3">
                          Example angles a team might take
                        </p>
                        <div className="space-y-2">
                          {c.examples.map((ex, j) => (
                            <div key={j} className="flex items-start gap-2.5">
                              <div className="w-1 h-1 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                              <p className="text-sm text-[var(--color-text-muted)]">
                                {ex}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedExpand>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
