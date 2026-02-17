export default function Footer() {
  return (
    <footer className="py-12 bg-[var(--color-navy)] text-white/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-sm">
          Organized by the Association for Intelligent Design in Healthcare (AIDH) at MD Anderson Cancer Center
        </p>
        <p className="text-xs mt-3 text-white/40">
          Questions?{" "}
          <a href="mailto:aidh-hackathon@mdanderson.org" className="underline hover:text-white/60">
            aidh-hackathon@mdanderson.org
          </a>
        </p>
      </div>
    </footer>
  );
}
