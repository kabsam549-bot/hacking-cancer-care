"use client";

import { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Challenges from "@/components/Challenges";
import Schedule from "@/components/Schedule";
import WhoShouldParticipate from "@/components/WhoShouldParticipate";
import WhatTeamsBuild from "@/components/WhatTeamsBuild";
import Judging from "@/components/Judging";
import RegistrationForm from "@/components/RegistrationForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Nav activeSection={activeSection} />
      <Hero />
      <About />
      <Challenges />
      <Schedule />
      <WhoShouldParticipate />
      <WhatTeamsBuild />
      <Judging />
      <RegistrationForm />
      <FAQ />
      <Footer />
    </main>
  );
}
