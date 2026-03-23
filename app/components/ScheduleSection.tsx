import ScrollReveal from "./ScrollReveal";

const schedule = [
  {
    time: "8:00 AM",
    title: "Check-in & Breakfast",
    note: "Registration, team previews, light breakfast",
    type: "break",
  },
  {
    time: "8:30 AM",
    title: "Opening Keynote",
    note: "Welcome from AI and Digital Health leadership",
    type: "keynote",
  },
  {
    time: "9:00 AM",
    title: "Challenge Briefing & Team Formation",
    note: "Deep dive into all four challenge areas, teams assembled",
    type: "session",
  },
  {
    time: "9:30 AM",
    title: "Hacking Begins",
    note: "Teams disperse to work — mentors available throughout",
    type: "work",
  },
  {
    time: "12:00 PM",
    title: "Lunch & Midday Check-in",
    note: "Catered lunch, brief status check-ins with mentors",
    type: "break",
  },
  {
    time: "12:30 PM",
    title: "Hacking Continues",
    note: "Afternoon working session — final push",
    type: "work",
  },
  {
    time: "3:00 PM",
    title: "Pitch Prep Workshop",
    note: "Coaching on 3-minute pitch structure and delivery",
    type: "session",
  },
  {
    time: "4:00 PM",
    title: "Final Presentations",
    note: "3 minutes per team — all teams present",
    type: "keynote",
  },
  {
    time: "5:00 PM",
    title: "Judging & Awards",
    note: "Panel deliberation, winner announcement, prize ceremony",
    type: "keynote",
  },
  {
    time: "5:30 PM",
    title: "Closing & Networking",
    note: "Reception and informal networking",
    type: "break",
  },
];

const typeColors: Record<string, string> = {
  break: "bg-gray-50",
  keynote: "bg-accent-600/10 border-l-2 border-l-accent-500",
  session: "bg-gray-50",
  work: "bg-accent-600/5",
};

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent-600 text-xs font-medium uppercase tracking-widest">
              Day-of Schedule
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Saturday, May 2, 2026
            </h2>
            <p className="mt-4 text-gray-500">
              A full day from breakfast through awards.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-accent-600/60 via-accent-600/20 to-transparent hidden sm:block" />

          <div className="space-y-3">
            {schedule.map((item, i) => (
              <ScrollReveal key={item.time} delay={i * 40}>
                <div className="flex items-start gap-6">
                  {/* Time */}
                  <div className="w-20 shrink-0 text-right">
                    <span className="text-gray-400 text-xs font-mono leading-none block pt-3">
                      {item.time}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative shrink-0 hidden sm:flex items-center justify-center mt-2.5">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        item.type === "keynote"
                          ? "bg-accent-500 border-accent-400"
                          : "bg-gray-300 border-gray-200"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 rounded-xl px-5 py-4 ${typeColors[item.type]}`}
                  >
                    <p className="text-gray-900 font-medium text-sm">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
