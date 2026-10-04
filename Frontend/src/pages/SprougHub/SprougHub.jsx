import { useEffect, useState } from "react";
import { HeartHandshake } from "lucide-react";

import SectionNav from "../../components/sprougHub/SectionNav";
import ImpactMarquee from "../../components/sprougHub/ImpactMarquee";
import SprougHero from "../../components/sprougHub/SprougHero";
import SprougStory from "../../components/sprougHub/SprougStory";
import SprougJourney from "../../components/sprougHub/SprougJourney";
import SprougValues from "../../components/sprougHub/SprougValues";
import SprougImpact from "../../components/sprougHub/SprougImpact";
import SprougCTA from "../../components/sprougHub/SprougCTA";

import {
  IMPACT_POINTS,
  JOURNEY,
  NAV_SECTIONS,
  VALUES,
} from "../../components/sprougHub/SprougHubData";

export default function SprougHub() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-text-primary">
      {/* Section navigation */}
      <SectionNav
        sections={NAV_SECTIONS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Foundation banner */}
      <section className="border-b border-border-light bg-surface-muted">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-3 text-center">
          <HeartHandshake size={16} className="shrink-0 text-primary" />

          <p className="text-xs font-medium text-text-secondary sm:text-sm">
            Building opportunities through{" "}
            <span className="font-semibold text-primary-dark">
              education, innovation & opportunity
            </span>
          </p>
        </div>
      </section>

      {/* Hero */}
      <SprougHero onDiscover={() => scrollToSection("story")} />

      {/* Impact ticker */}
      <ImpactMarquee items={IMPACT_POINTS} />

      {/* Story */}
      <SprougStory />

      {/* Mission + Vision */}
      <SprougJourney journey={JOURNEY} />

      {/* Values */}
      <SprougValues values={VALUES} />

      {/* Impact */}
      <SprougImpact />

      {/* CTA */}
      <SprougCTA />
    </main>
  );
}
