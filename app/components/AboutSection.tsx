import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "40", label: "Participants" },
  { value: "1", label: "Full Day" },
  { value: "4", label: "Challenge Areas" },
  { value: "0", label: "Coding Required" },
];

const highlights = [
  {
    title: "Beginner-Friendly",
    description:
      "No technical background needed. If you see problems in cancer care, you qualify.",
  },
  {
    title: "Mentor Support",
    description:
      "Clinicians, engineers, and designers available throughout the day to guide your team.",
  },
  {
    title: "Real Problems",
    description:
      "Challenges drawn directly from MD Anderson workflows, patient feedback, and clinical gaps.",
  },
  {
    title: "Multidisciplinary Teams",
    description:
      "Teams of 4 bring together trainees, faculty, technologists, and operations staff.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
              About the Event
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              What is Hacking Cancer Care?
            </h2>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 px-6 py-8 text-center"
              >
                <div className="text-4xl font-bold text-accent-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Description */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <ScrollReveal delay={150}>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p className="text-lg">
                MD Anderson&#39;s inaugural AI and Digital Health Mini Hackathon brings together
                40 participants — GME trainees, faculty physicians, technologists,
                and operations staff — for a single day of focused problem-solving.
              </p>
              <p>
                Teams of 4 tackle real challenges in cancer care: reducing
                preventable readmissions, simulated education, accelerating
                research, and improving patient throughput.
              </p>
              <p>
                This is not a coding competition. Teams will develop and pitch
                innovative ideas — using creativity, clinical insight, and
                collaborative problem-solving. No technical background needed.
              </p>
              <p>
                Organized by the AI and Digital Health (AIDH) Committee at
                MD Anderson Cancer Center.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-accent-600/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-600/10 flex items-center justify-center mb-3">
                    <div className="w-2 h-2 rounded-full bg-accent-600" />
                  </div>
                  <h3 className="text-gray-900 font-semibold text-sm mb-1.5">
                    {h.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
