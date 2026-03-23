export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-gray-300 font-semibold mb-2">Hacking Cancer Care</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              AI and Digital Health Mini Hackathon at MD Anderson Cancer Center. May 2, 2026.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {[
                ["About", "#about"],
                ["Challenges", "#challenges"],
                ["Schedule", "#schedule"],
                ["FAQ", "#faq"],
                ["Register", "#register"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block text-gray-500 hover:text-gray-300 text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>
                Questions:{" "}
                <a
                  href="mailto:rkouzy@mdanderson.org"
                  className="text-accent-400 hover:text-accent-300 transition-colors"
                >
                  rkouzy@mdanderson.org
                </a>
              </p>
              <p>
                Learn more about{" "}
                <a
                  href="https://www.mdanderson.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300 transition-colors"
                >
                  MD Anderson
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex items-center justify-center">
          <p className="text-gray-600 text-xs text-center">
            Organized by the AI and Digital Health Committee
          </p>
        </div>
      </div>
    </footer>
  );
}
