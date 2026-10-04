import Hero from "../../components/home/Hero";
import JourneySteps from "../../components/home/JourneySteps";
import LearningPreview from "../../components/home/LessonPreview/LearningPreview";
import PartnerSchools from "../../components/home/PartnerSchools";
import StudentTestimonials from "../../components/home/TestimonialCarousel";
import FinalCTA from "../../components/home/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-text-primary">
      <Hero />

      <JourneySteps />

      <LearningPreview />

      <PartnerSchools />

      <StudentTestimonials />

      <FinalCTA />
    </main>
  );
}
