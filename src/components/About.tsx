export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-6">
          One day. Real problems. Actionable solutions.
        </h2>
        <div className="space-y-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
          <p>
            Hacking Cancer Care is MD Anderson&apos;s inaugural AI and Digital
            Health hackathon. Forty participants from across the institution
            come together for a single, beginner-friendly day to tackle real
            challenges in cancer care delivery.
          </p>
          <p>
            Teams of 5&ndash;6 people &mdash; trainees, faculty, technologists,
            APPs, and operations staff &mdash; choose one of four challenge
            areas and spend the day developing practical, implementable
            solutions. No coding experience required. Mentors and no-code tools
            are provided.
          </p>
          <p>
            This is not a coding competition. It is a structured environment for
            creative problem-solving, built for people who see problems in
            cancer care every day and want dedicated time to fix them.
          </p>
          <p>
            Breakfast and lunch are provided. At the end of the day, teams
            present their solutions to a panel of expert judges from across MD
            Anderson. Top teams receive awards and institutional exposure to
            help move their ideas forward.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { num: "40", label: "Participants" },
            { num: "4", label: "Challenge Areas" },
            { num: "1", label: "Day" },
            { num: "10+", label: "Mentors" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-[var(--color-accent)]">
                {s.num}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
