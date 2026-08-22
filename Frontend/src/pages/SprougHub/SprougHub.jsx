import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Quote,
  Target,
  Users,
} from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const impactPoints = [
  "Accessible education",
  "Technology for learning",
  "Community collaboration",
  "Opportunities for every learner",
  "Confidence through knowledge",
  "Learning without barriers",
];

const journey = [
  {
    icon: Target,
    label: "Our Mission",
    heading: "To turn access into opportunity.",
    description:
      "We make quality education accessible to every learner through innovative, inclusive, and meaningful learning experiences — no matter their background, location, or resources.",
  },
  {
    icon: Lightbulb,
    label: "Our Vision",
    heading: "A future every learner can reach.",
    description:
      "A world where quality education is within reach for everyone. Through innovation, collaboration, and community-driven initiatives, we aim to create lasting positive impact.",
  },
];

const values = [
  {
    icon: BookOpen,
    title: "Learning First",
    description:
      "Practical lessons, stories, conversations, quizzes, and digital resources that make learning engaging and useful.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Bringing together teachers, volunteers, creators, and communities to build learning opportunities with real impact.",
  },
  {
    icon: HeartHandshake,
    title: "Social Impact",
    description:
      "Reducing educational barriers and helping learners build confidence, skills, and better opportunities.",
  },
];

const navSections = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Story" },
  { id: "journey", label: "Mission" },
  { id: "values", label: "Values" },
  { id: "cta", label: "Join" },
];

export default function SprougHub() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFFDFC] text-gray-900">
      {/* Fonts + animation system */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .sproug-display {
          font-family: 'Fraunces', serif;
        }

        .sproug-body {
          font-family: 'Inter', sans-serif;
        }

        @keyframes labelLineIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12px, 16px) scale(1.06); }
        }

        @keyframes blobFloatReverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -14px) scale(1.05); }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.16); }
          50% { box-shadow: 0 0 0 7px rgba(234, 88, 12, 0); }
        }

        @keyframes dividerGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.35); }
          70% { box-shadow: 0 0 0 10px rgba(234, 88, 12, 0); }
        }

        .label-dash {
          transform-origin: left center;
          animation: labelLineIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .blob-float { animation: blobFloat 9s ease-in-out infinite; }
        .blob-float-reverse { animation: blobFloatReverse 10s ease-in-out infinite; }

        .marquee-track {
          animation: marquee 26s linear infinite;
        }

        .marquee-track-reverse {
          animation: marqueeReverse 30s linear infinite;
        }

        .marquee-row:hover .marquee-track,
        .marquee-row:hover .marquee-track-reverse {
          animation-play-state: paused;
        }

        .icon-badge {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease;
        }

        .icon-badge:hover {
          transform: translateY(-2px) scale(1.05);
          animation: badgePulse 1.6s ease-out infinite;
        }

        .icon-badge svg {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .icon-badge:hover svg {
          transform: rotate(-8deg) scale(1.08);
        }

        .journey-divider {
          transform-origin: top center;
          animation: dividerGrow 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 200ms;
        }

        .journey-node {
          animation: nodePulse 2.6s ease-out infinite;
        }

        .value-row {
          transition: background-color 0.35s ease, transform 0.35s ease;
        }

        .value-row:hover {
          background-color: #fff9f5;
          transform: translateX(6px);
        }

        .value-ghost-number {
          transition: color 0.35s ease, transform 0.35s ease;
        }

        .value-row:hover .value-ghost-number {
          color: #fdba74;
          transform: translateX(-4px);
        }

        .pill-primary {
          position: relative;
          overflow: hidden;
        }

        .pill-primary::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.35) 50%, transparent 80%);
          transform: translateX(-100%);
          transition: transform 0.7s ease;
        }

        .pill-primary:hover::after {
          transform: translateX(100%);
        }

        .pill-primary svg {
          transition: transform 0.3s ease;
        }

        .pill-primary:hover svg {
          transform: translateX(4px);
        }

        .nav-dot {
          transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }

        .nav-label {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .label-dash,
          .blob-float,
          .blob-float-reverse,
          .marquee-track,
          .marquee-track-reverse,
          .icon-badge,
          .icon-badge:hover,
          .icon-badge svg,
          .journey-divider,
          .journey-node,
          .value-row,
          .value-row:hover,
          .value-ghost-number,
          .pill-primary::after,
          .pill-primary svg,
          .nav-dot,
          .nav-label {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          SCROLL-SPY SIDE NAV
      ========================================================= */}
      <nav
        aria-label="Page sections"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex"
      >
        {navSections.map((s) => {
          const active = activeSection === s.id;

          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              aria-label={`Go to ${s.label}`}
              className="group flex items-center gap-3"
            >
              <span
                className={`nav-label sproug-body text-xs font-semibold uppercase tracking-wide ${
                  active
                    ? "translate-x-0 text-orange-600 opacity-100"
                    : "translate-x-2 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {s.label}
              </span>

              <span
                className={`nav-dot h-2.5 w-2.5 rounded-full border-2 ${
                  active
                    ? "scale-125 border-orange-600 bg-orange-600"
                    : "border-gray-300 bg-white group-hover:border-orange-400"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* =========================================================
          FOUNDATION BANNER
      ========================================================= */}
      <section className="border-b border-orange-100 bg-[#FFF7F1]">
        <div className="sproug-body mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-3 text-center">
          <HeartHandshake
            size={17}
            strokeWidth={2}
            className="shrink-0 text-orange-600"
          />

          <p className="text-xs font-medium text-gray-600 sm:text-sm">
            Empowering communities through{" "}
            <span className="font-semibold text-orange-700">
              education, innovation &amp; opportunity
            </span>
          </p>
        </div>
      </section>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        id="hero"
        data-section
        className="relative overflow-hidden bg-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl md:mx-0">
              <div className="sproug-body mb-6 flex items-center gap-3">
                <span className="label-dash h-px w-10 bg-orange-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  About Sproug Hub
                </span>
              </div>

              <h1 className="sproug-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#17213B] sm:text-5xl md:text-6xl">
                Growing <span className="text-orange-600">opportunities</span>
                <br />
                through education.
              </h1>

              <p className="sproug-body mt-7 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
                Sproug Hub Foundation is a non-profit organization working to
                create equal opportunities through education, innovation, and
                technology.
              </p>

              <p className="sproug-body mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                We believe every learner deserves access to quality education,
                regardless of their background, location, or available
                resources.
              </p>

              <button
                onClick={() => scrollToSection("story")}
                className="pill-primary sproug-body mt-9 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_14px_28px_-14px_rgba(234,88,12,0.55)]"
              >
                Discover our story
                <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative mx-auto flex max-w-md justify-center md:mx-0 md:justify-end">
              <div className="blob-float pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-orange-100 blur-3xl" />
              <div className="blob-float-reverse pointer-events-none absolute -bottom-6 -left-8 h-32 w-32 rounded-full bg-orange-50 blur-3xl" />

              <div className="relative w-full max-w-md">
                <div
                  className="overflow-hidden rounded-[2rem] border p-7 sm:p-9"
                  style={{
                    borderColor: "#FBDBBE",
                    background:
                      "radial-gradient(120% 120% at 15% 10%, #FFF1E4 0%, #FFFFFF 65%)",
                  }}
                >
                  <div
                    className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-8 transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                      boxShadow: "0 24px 48px -28px rgba(23,33,59,0.30)",
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/jwamgvca/image/upload/v1785740728/LOGO.jpg_1_io5dvd.jpg"
                      alt="Sproug Hub Foundation Logo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div className="blob-float absolute -right-4 -top-4 h-14 w-14 rounded-full bg-[#FFD9B3]" />
                <div className="blob-float-reverse absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-[#FFEEE0]" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee ticker */}
        <div className="marquee-row border-t border-orange-100 bg-[#FFF7F1] py-4">
          <div className="flex overflow-hidden">
            <div className="marquee-track sproug-body flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-sm font-semibold text-orange-700">
              {[...impactPoints, ...impactPoints].map((point, i) => (
                <span key={i} className="flex items-center gap-8">
                  {point}
                  <span className="text-orange-300">•</span>
                </span>
              ))}
            </div>

            <div
              className="marquee-track sproug-body flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 text-sm font-semibold text-orange-700"
              aria-hidden="true"
            >
              {[...impactPoints, ...impactPoints].map((point, i) => (
                <span key={i} className="flex items-center gap-8">
                  {point}
                  <span className="text-orange-300">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STORY — editorial pull-quote layout
      ========================================================= */}
      <section id="story" data-section className="bg-[#FFF8F2]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <div className="icon-badge flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
                  <HeartHandshake
                    size={27}
                    strokeWidth={2}
                    className="text-orange-600"
                  />
                </div>

                <p className="sproug-body mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  Who We Are
                </p>

                <h2 className="sproug-display mt-4 text-3xl font-semibold leading-tight text-[#17213B] md:text-5xl">
                  Education can{" "}
                  <span className="text-orange-600">change lives.</span>
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="relative">
                <Quote
                  size={64}
                  strokeWidth={1.5}
                  className="absolute -left-3 -top-6 text-orange-100"
                />

                <p className="sproug-display relative text-xl font-medium leading-relaxed text-[#17213B] md:text-2xl">
                  Sproug Hub Foundation is built around a simple belief:
                  education should create possibilities.
                </p>

                <p className="sproug-body mt-6 text-base leading-8 text-gray-600 md:text-lg">
                  We work to support learners and communities by combining
                  education, technology, creativity, and collaboration. Our work
                  focuses on creating practical learning experiences that are
                  easy to understand and useful in everyday life.
                </p>

                <p className="sproug-body mt-5 text-sm leading-7 text-gray-500 md:text-base">
                  Through our initiatives, we aim to help learners develop
                  knowledge, confidence, communication skills, and the ability
                  to pursue better opportunities.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOURNEY — Mission & Vision, two-panel with growing divider
      ========================================================= */}
      <section id="journey" data-section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="sproug-body text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                Our Direction
              </p>

              <h2 className="sproug-display mt-4 text-3xl font-semibold tracking-tight text-[#17213B] md:text-5xl">
                What drives us <span className="text-orange-600">forward.</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative mt-16 grid gap-16 md:grid-cols-2 md:gap-0">
            <span className="journey-divider absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-orange-100 md:block" />

            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.label} delay={index * 120}>
                  <div
                    className={`relative mx-auto max-w-sm text-center ${
                      index === 0
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left"
                    }`}
                  >
                    <span
                      className={`journey-node absolute top-0 hidden h-3 w-3 rounded-full bg-orange-500 md:block ${
                        index === 0 ? "-right-[6.5px]" : "-left-[6.5px]"
                      }`}
                    />

                    <div
                      className={`icon-badge mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 ${
                        index === 0
                          ? "md:ml-auto md:mr-0"
                          : "md:ml-0 md:mr-auto"
                      }`}
                    >
                      <Icon
                        size={27}
                        strokeWidth={2}
                        className="text-orange-600"
                      />
                    </div>

                    <p className="sproug-body mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                      {item.label}
                    </p>

                    <h3 className="sproug-display mt-3 text-2xl font-semibold text-[#17213B] md:text-3xl">
                      {item.heading}
                    </h3>

                    <p className="sproug-body mt-4 text-sm leading-7 text-gray-500 md:text-base">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES — numbered horizontal rows
      ========================================================= */}
      <section id="values" data-section className="bg-[#FFF8F7]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-24 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="sproug-body text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                What We Stand For
              </p>

              <h2 className="sproug-display mt-4 text-3xl font-semibold tracking-tight text-[#17213B] md:text-5xl">
                Our work is guided by{" "}
                <span className="text-orange-600">purpose.</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 divide-y divide-orange-100 overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 90}>
                  <div className="value-row group sproug-body flex flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
                    <span className="value-ghost-number sproug-display shrink-0 text-4xl font-semibold text-orange-100 sm:text-5xl">
                      0{index + 1}
                    </span>

                    <div className="icon-badge flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon size={20} strokeWidth={2} />
                    </div>

                    <div className="flex-1">
                      <h3 className="sproug-display text-lg font-semibold text-[#17213B]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className="hidden shrink-0 text-orange-200 transition-colors duration-300 group-hover:text-orange-500 sm:block"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA — dark closing band with marquee bookend
      ========================================================= */}
      <section
        id="cta"
        data-section
        className="relative overflow-hidden bg-orange-50"
      >
        {/* Decorative blobs */}
        <div className="blob-float pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />

        <div className="blob-float-reverse pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-28 lg:px-8">
          <Reveal>
            <p className="sproug-body text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              Our Purpose
            </p>

            <h2 className="sproug-display mt-4 text-3xl font-semibold leading-tight text-[#17213B] md:text-5xl">
              Every learner deserves the{" "}
              <span className="text-orange-500">opportunity to grow.</span>
            </h2>

            <p className="sproug-body mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              At Sproug Hub Foundation, we are working to make education more
              accessible, practical, and meaningful for learners and
              communities.
            </p>
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="marquee-row relative border-t border-orange-200/70 py-4">
          <div className="flex overflow-hidden">
            <div className="marquee-track-reverse sproug-display flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 text-lg font-medium text-orange-900/15">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="flex items-center gap-6">
                  Learn • Empower • Grow
                </span>
              ))}
            </div>

            <div
              className="marquee-track-reverse sproug-display flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 text-lg font-medium text-orange-900/15"
              aria-hidden="true"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="flex items-center gap-6">
                  Learn • Empower • Grow
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
