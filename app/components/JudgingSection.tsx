import ScrollReveal from "./ScrollReveal";

const criteria = [
  {
    name: "Clinical Impact",
    weight: 30,
    description:
      "Does this solution address a real, significant problem in cancer care? Would it meaningfully improve patient outcomes or clinician experience?",
  },
  {
    name: "Feasibility",
    weight: 25,
    description:
      "Can this be built and deployed within MD Anderson's infrastructure? Is the pathway to implementation realistic?",
  },
  {
    name: "Innovation",
    weight: 20,
    description:
      "Does the solution bring a new perspective, novel approach, or creative use of technology to a known problem?",
  },
  {
    name: "Presentation",
    weight: 15,
    description:
      "Is the pitch clear, compelling, and well-structured? Does the team communicate their idea effectively in 3 minutes?",
  },
  {
    name: "Team Collaboration",
    weight: 10,
    description:
      "Did the team leverage diverse backgrounds? Is there evidence of genuine cross-disciplinary thinking?",
  },
];

export default function JudgingSection() {
  return (
    <section id="judging" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
              Evaluation
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Judging Criteria
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Teams are scored by a panel of clinicians, technologists, and
              administrators on five dimensions.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {criteria.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 60}>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-gray-900 font-semibold text-base">
                    {c.name}
                  </h3>
                  <span className="text-accent-600 font-bold text-xl shrink-0">
                    {c.weight}%
                  </span>
                </div>
                {/* Weight bar */}
                <div className="h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-600 to-accent-400 rounded-full transition-all duration-700"
                    style={{ width: `${c.weight * 3}%` }}
                  />
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {c.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={350}>
          <div className="mt-10 p-6 rounded-2xl border border-accent-600/30 bg-accent-600/5 text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              Judges include faculty physicians, engineers, and operational
              leaders at MD Anderson. Panel composition will be announced closer
              to the event.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
