const roles = [
  {
    title: "GME Trainees",
    desc: "Residents, fellows -- you see the problems daily. Bring that perspective.",
  },
  {
    title: "Faculty & Attendings",
    desc: "Clinical expertise meets creative problem-solving. Mentor and build.",
  },
  {
    title: "Technologists & Engineers",
    desc: "Developers, data scientists, IT professionals. Build what others imagine.",
  },
  {
    title: "Advanced Practice Providers",
    desc: "PAs, NPs, pharmacists -- often first to see workflow failures.",
  },
  {
    title: "Administrative & Operations Staff",
    desc: "Schedulers, coordinators, navigators. You know where the system breaks.",
  },
];

export default function WhoShouldParticipate() {
  return (
    <section id="who" className="py-24 bg-[var(--color-warm-gray)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
          Who Should Participate
        </h2>
        <p className="text-[var(--color-text-muted)] mb-12 max-w-2xl">
          Anyone who sees a problem in cancer care and wants dedicated time to
          help fix it.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-xl p-5 border border-gray-100"
            >
              <h3 className="font-semibold text-[var(--color-navy)] mb-1.5">
                {r.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
