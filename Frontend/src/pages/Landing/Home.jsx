import React from "react";
import HeroCarousel from "../../components/home/HeroCarousel";
import Features from "../../components/home/Features";
import PartnerSchools from "../../components/home/PartnerSchools";
import TestimonialCarousel from "../../components/home/TestimonialCarousel";

function Home() {
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1122&auto=format&fit=crop",
      eyebrow: "Project Jhep",
      title: "Learn English the Fun Way",
      subtitle:
        "Interactive lessons and activities for Grade 1 to Grade 10 students.",
      cta: {
        label: "Start Learning",
        onClick: () => {},
      },
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1232&auto=format&fit=crop",
      eyebrow: "Interactive Lessons",
      title: "Learn Through Practice",
      subtitle: "Explore vocabulary, conversations, quizzes, and stories.",
      cta: {
        label: "Explore Topics",
        onClick: () => {},
      },
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop",
      eyebrow: "Build Confidence",
      title: "Speak English Confidently",
      subtitle: "Improve speaking, reading, and writing skills step by step.",
      cta: {
        label: "Start Exploing",
        onClick: () => {},
      },
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
      eyebrow: "Education For Everyone",
      title: "Quality Learning For Every Child",
      subtitle: "Making English education accessible for rural students.",
      cta: {
        label: "Discover More",
        onClick: () => {},
      },
    },
  ];
  return (
    <div>
      <HeroCarousel slides={slides} interval={6000} height="90vh" />
      <Features />
      {/* <PartnerSchools /> */}
      {/* <TestimonialCarousel /> */}
    </div>
  );
}

export default Home;
