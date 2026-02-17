const events = [
  { time: "8:00 AM", title: "Check-in & Breakfast", type: "break" },
  { time: "8:30 AM", title: "Opening Keynote", type: "main" },
  { time: "9:00 AM", title: "Challenge Briefing & Team Formation", type: "main" },
  { time: "9:30 AM", title: "Hacking Begins", type: "hack" },
  { time: "12:00 PM", title: "Lunch & Midday Check-in", type: "break" },
  { time: "12:30 PM", title: "Hacking Continues", type: "hack" },
  { time: "3:00 PM", title: "Pitch Prep Workshop", type: "main" },
  { time: "4:00 PM", title: "Final Presentations", desc: "3 minutes per team", type: "main" },
  { time: "5:00 PM", title: "Judging & Awards", type: "main" },
  { time: "5:30 PM", title: "Closing & Networking", type: "break" },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
          Schedule
        </h2>
        <p className="text-[var(--color-text-muted)] mb-12">
          Saturday, May 2, 2026 -- One full day, start to finish.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[88px] top-2 bottom-2 w-px bg-gray-200 hidden sm:block" />

          <div className="space-y-0">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-6 py-4 group">
                <span className="w-20 text-right text-sm font-mono text-[var(--color-text-muted)] shrink-0 pt-0.5">
                  {e.time}
                </span>
                <div className="hidden sm:block relative">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-1.5 ${
                      e.type === "hack"
                        ? "bg-[var(--color-accent)]"
                        : e.type === "main"
                        ? "bg-[var(--color-navy)]"
                        : "bg-gray-300"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`text-base font-medium ${
                      e.type === "hack"
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-navy)]"
                    }`}
                  >
                    {e.title}
                  </p>
                  {e.desc && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {e.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
