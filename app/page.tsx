import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ChallengesSection from "./components/ChallengesSection";
import ScheduleSection from "./components/ScheduleSection";
import WhoSection from "./components/WhoSection";
import JudgingSection from "./components/JudgingSection";
import FAQSection from "./components/FAQSection";
import RegistrationSection from "./components/RegistrationSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <section className="bg-gray-50 py-16 px-4">
          <p className="text-xl sm:text-2xl text-center text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            One day. Real problems. Forty people from across MD Anderson
            turning ideas into solutions for cancer care — no coding experience required.
          </p>
        </section>
        <AboutSection />
        <ChallengesSection />
        <ScheduleSection />
        <WhoSection />
        <JudgingSection />
        <FAQSection />
        <RegistrationSection />
      </main>
      <Footer />
    </>
  );
}
