import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Target,
  Users,
  Sparkles,
} from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make quality education accessible to every learner through innovative, inclusive, and meaningful learning experiences.",
  },
  {
    icon: BookOpen,
    title: "Learning First",
    description:
      "We create practical lessons, stories, conversations, quizzes, and digital resources that make learning engaging and useful.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We bring together teachers, volunteers, creators, and communities to build learning opportunities that create real impact.",
  },
  {
    icon: HeartHandshake,
    title: "Social Impact",
    description:
      "We work to reduce educational barriers and help learners build confidence, skills, and better opportunities.",
  },
];

const impactPoints = [
  "Accessible education",
  "Technology for learning",
  "Community collaboration",
  "Opportunities for every learner",
];

export default function SprougHub() {
  return (
    <main className="min-h-screen bg-[#FFFDFC] text-gray-900">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .sproug-display {
          font-family: 'Fraunces', serif;
        }

        .sproug-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

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
              education, innovation & opportunity
            </span>
          </p>
        </div>
      </section>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              {/* Label */}
              <div className="sproug-body mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                  About Sproug Hub
                </span>
              </div>

              {/* Heading */}
              <h1 className="sproug-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#17213B] sm:text-5xl md:text-6xl">
                Growing <span className="text-orange-600">opportunities</span>
                <br />
                through education.
              </h1>

              {/* Description */}
              <p className="sproug-body mt-7 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
                Sproug Hub Foundation is a non-profit organization working to
                create equal opportunities through education, innovation, and
                technology.
              </p>

              <p className="sproug-body mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                We believe every learner deserves access to quality education,
                regardless of their background, location, or available
                resources. We build initiatives that make learning accessible,
                engaging, and meaningful.
              </p>

              {/* Small highlights */}
              <div className="sproug-body mt-9 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white">
                  Education for Everyone
                  <ArrowRight size={16} />
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-5 py-3 text-sm font-medium text-orange-700">
                  <Sparkles size={15} />
                  Creating meaningful impact
                </div>
              </div>
            </div>
          </Reveal>

          {/* Hero Visual */}
          <Reveal>
            <div className="relative flex justify-center md:justify-end">
              {/* Decorative background */}
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-orange-100 blur-3xl" />

              <div className="relative w-full max-w-md">
                <div
                  className="overflow-hidden rounded-[2rem] border p-7 sm:p-9"
                  style={{
                    borderColor: "#FBDBBE",
                    background:
                      "radial-gradient(120% 120% at 15% 10%, #FFF1E4 0%, #FFFFFF 65%)",
                  }}
                >
                  {/* Logo Container */}
                  <div
                    className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-8"
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

                {/* Decorative circles */}
                <div className="absolute -right-4 -top-4 h-14 w-14 rounded-full bg-[#FFD9B3]" />

                <div className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full bg-[#FFEEE0]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          WHO WE ARE
      ========================================================= */}
      <section className="bg-[#FFF8F2]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
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
              <div>
                <p className="sproug-body text-base leading-8 text-gray-600 md:text-lg">
                  Sproug Hub Foundation is built around a simple belief:
                  education should create possibilities. We work to support
                  learners and communities by combining education, technology,
                  creativity, and collaboration.
                </p>

                <p className="sproug-body mt-5 text-sm leading-7 text-gray-500 md:text-base">
                  Our work focuses on creating practical learning experiences
                  that are easy to understand and useful in everyday life.
                  Through our initiatives, we aim to help learners develop
                  knowledge, confidence, communication skills, and the ability
                  to pursue better opportunities.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {impactPoints.map((item) => (
                    <div
                      key={item}
                      className="sproug-body flex items-center gap-3 rounded-xl border border-orange-100 bg-white px-4 py-3"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                        ✓
                      </span>

                      <span className="text-sm font-medium text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* =========================================================
          VISION
      ========================================================= */}
      <section className="bg-[#FFF8F7]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-24">
          <Reveal>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
              <Lightbulb
                size={27}
                strokeWidth={2}
                className="text-orange-600"
              />
            </div>

            <p className="sproug-body mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              Our Vision
            </p>

            <h2 className="sproug-display mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[#17213B] md:text-5xl">
              A future where{" "}
              <span className="text-orange-600">every learner</span> can reach
              their potential.
            </h2>

            <p className="sproug-body mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
              We envision a world where quality education is accessible to every
              learner, regardless of their background or location. Through
              innovation, collaboration, and community-driven initiatives, we
              aim to create lasting positive impact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8">
          <Reveal>
            <div className="max-w-2xl">
              <p className="sproug-body text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                What We Stand For
              </p>

              <h2 className="sproug-display mt-4 text-3xl font-semibold tracking-tight text-[#17213B] md:text-5xl">
                Our work is guided by{" "}
                <span className="text-orange-600">purpose.</span>
              </h2>

              <p className="sproug-body mt-5 text-base leading-7 text-gray-500">
                Every initiative we build is rooted in accessibility,
                collaboration, learning, and meaningful social impact.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title}>
                  <article className="sproug-body group h-full rounded-2xl border border-orange-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-[#FFF9F5] hover:shadow-[0_20px_40px_-30px_rgba(234,88,12,0.35)]">
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-100">
                        <Icon size={21} strokeWidth={2} />
                      </div>

                      <span className="text-xs font-bold text-orange-200">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="sproug-display mt-7 text-lg font-semibold text-[#17213B]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-white px-6 pb-20 md:pb-24">
        <Reveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-orange-100 bg-[#FFF7F1] px-7 py-14 text-center sm:px-12 md:py-16">
            <div className="mx-auto max-w-3xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                <Sparkles size={22} className="text-orange-600" />
              </div>

              <p className="sproug-body mt-6 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                Our Purpose
              </p>

              <h2 className="sproug-display mt-4 text-3xl font-semibold leading-tight text-[#17213B] md:text-5xl">
                Every learner deserves the{" "}
                <span className="text-orange-600">opportunity to grow.</span>
              </h2>

              <p className="sproug-body mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
                At Sproug Hub Foundation, we are working to make education more
                accessible, practical, and meaningful for learners and
                communities. Together, we can turn access to education into
                opportunities for a better future.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-700 hover:shadow-md">
                Learn • Empower • Grow
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
