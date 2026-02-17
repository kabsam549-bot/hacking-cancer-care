const items = [
  "Clickable prototypes (Figma, v0.dev)",
  "AI-powered tools (ChatGPT, Copilot, custom prompts)",
  "Process redesigns and workflow maps",
  "Patient-facing apps or dashboards",
  "Communication frameworks and protocols",
];

export default function WhatTeamsBuild() {
  return (
    <section id="build" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
          What Teams Build
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] mb-8 max-w-2xl">
          This is not a coding competition. Teams develop ideas and pitch them.
          No-code tools, AI assistants, and mentors are provided throughout the
          day.
        </p>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
              <p className="text-base text-[var(--color-text)]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
