import ScrollReveal from "./ScrollReveal";

const participants = [
  {
    role: "GME Trainees",
    description:
      "Residents and fellows across all programs — the frontline perspective that drives real innovation.",
  },
  {
    role: "Faculty & Attending Physicians",
    description:
      "Clinical expertise and institutional knowledge to ground ideas in medical reality.",
  },
  {
    role: "Technologists & Engineers",
    description:
      "Software engineers, data scientists, and IT professionals who know how to build.",
  },
  {
    role: "Advanced Practice Providers",
    description:
      "NPs, PAs, and CRNAs who navigate the clinical-operational interface every day.",
  },
  {
    role: "Administrative & Operations Staff",
    description:
      "The people who know where the workflow breaks down — and how to fix it.",
  },
];

export default function WhoSection() {
  return (
    <section
      id="who"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
              Participation
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Who Should Participate
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Anyone who sees a problem in cancer care and wants to help fix it.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Participant types */}
          <div>
            <ScrollReveal>
              <h3 className="text-gray-900 font-semibold mb-6 text-base">
                Who We&apos;re Looking For
              </h3>
            </ScrollReveal>
            <div className="space-y-4">
              {participants.map((p, i) => (
                <ScrollReveal key={p.role} delay={i * 60}>
                  <div className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-accent-500 shrink-0 mt-2" />
                    <div>
                      <p className="text-gray-900 font-medium text-sm">
                        {p.role}
                      </p>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={350}>
              <div className="mt-6 p-5 rounded-xl border border-accent-600/30 bg-accent-600/5">
                <p className="text-accent-600 text-sm font-medium">
                  Currently open to MD Anderson personnel only.
                </p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                  Teams require a valid @mdanderson.org email for registration.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* What teams build */}
          <div>
            <ScrollReveal delay={100}>
              <h3 className="text-gray-900 font-semibold mb-6 text-base">
                What Teams Pitch
              </h3>
              <div className="space-y-3 mb-8">
                {[
                  "Innovative solutions to real cancer care challenges",
                  "Process redesigns and workflow improvements",
                  "AI-powered concepts and use cases",
                  "Patient-centered care innovations",
                  "Operational efficiency ideas",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 text-accent-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
