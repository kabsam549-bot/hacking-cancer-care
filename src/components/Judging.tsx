const criteria = [
  { name: "Clinical Impact", pct: 30 },
  { name: "Feasibility", pct: 25 },
  { name: "Innovation", pct: 20 },
  { name: "Presentation", pct: 15 },
  { name: "Team Collaboration", pct: 10 },
];

export default function Judging() {
  return (
    <section id="judging" className="py-24 bg-[var(--color-warm-gray)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
          Judging Criteria
        </h2>
        <p className="text-[var(--color-text-muted)] mb-10">
          Solutions are evaluated on what matters: can this actually improve
          cancer care?
        </p>

        <div className="space-y-4 max-w-lg">
          {criteria.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-[var(--color-navy)]">
                  {c.name}
                </span>
                <span className="text-sm font-mono text-[var(--color-text-muted)]">
                  {c.pct}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-accent)] rounded-full"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
