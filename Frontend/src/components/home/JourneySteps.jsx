import {
  BookOpen,
  MessageCircle,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const journeySteps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Start Learning",
    description: "Begin with simple English words and everyday vocabulary.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Learn Words",
    description:
      "Build your vocabulary with easy examples and Marathi support.",
  },
  {
    number: "03",
    icon: Target,
    title: "Build Sentences",
    description: "Learn how to combine words and create simple sentences.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Start Speaking",
    description: "Practice everyday conversations and express yourself.",
  },
  {
    number: "05",
    icon: Trophy,
    title: "Gain Confidence",
    description: "Use English confidently in school and everyday life.",
  },
];

export default function StudentJourney() {
  return (
    <section className="bg-[#FFFAF5] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ================= Heading ================= */}
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <span
              className="inline-block rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] sm:px-4 sm:text-xs"
              style={{
                background: "#FFEEE0",
                color: "#C2410C",
              }}
            >
              Student Journey
            </span>

            <h2
              className="mt-4 text-[2rem] font-semibold leading-[1.15] sm:mt-5 sm:text-3xl md:text-[2.5rem]"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              From{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF7A30, #EA580C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Learning to Confidence
              </span>
            </h2>

            <p
              className="mx-auto mt-4 max-w-xl text-[13px] leading-6 sm:text-sm sm:leading-7 md:text-base"
              style={{
                color: "#5B6472",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Every student starts with simple words and gradually builds the
              skills and confidence to communicate in English.
            </p>
          </div>
        </Reveal>

        {/* ================= Journey ================= */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="absolute left-[10%] right-[10%] top-[34px] hidden h-px md:block"
            style={{
              background: "linear-gradient(90deg, #FBD0AD, #EA580C, #FBD0AD)",
            }}
          />

          {/* Mobile Connecting Line */}
          <div
            className="absolute bottom-[40px] left-[34px] top-[34px] w-px md:hidden"
            style={{
              background: "linear-gradient(180deg, #FBD0AD, #EA580C, #FBD0AD)",
            }}
          />

          <div className="space-y-8 md:grid md:grid-cols-5 md:gap-4 md:space-y-0">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.number}>
                  <div className="group relative flex items-start text-left md:block md:text-center">
                    {/* ================= Mobile Icon ================= */}
                    <div
                      className="relative z-10 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border bg-white transition-all duration-300 group-hover:-translate-y-1 md:mx-auto"
                      style={{
                        borderColor: "#FBDBBE",
                        boxShadow: "0 8px 20px -16px rgba(23, 33, 59, 0.3)",
                      }}
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.8}
                        style={{
                          color: "#EA580C",
                        }}
                      />

                      {/* Step Number */}
                      <span
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
                        style={{
                          background: "#EA580C",
                          color: "#FFFFFF",
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>

                    {/* ================= Content ================= */}
                    <div className="ml-5 flex-1 md:ml-0 md:mt-6">
                      <span
                        className="text-[9px] font-semibold uppercase tracking-[0.15em] sm:text-[10px]"
                        style={{
                          color: "#C2410C",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Step {step.number}
                      </span>

                      <h3
                        className="mt-1.5 text-[16px] font-semibold sm:text-base md:mt-2 md:text-lg"
                        style={{
                          color: "#17213B",
                          fontFamily: "'Fraunces', serif",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="mt-1.5 max-w-[280px] text-xs leading-5 sm:text-[13px] md:mx-auto md:mt-2 md:max-w-[190px] md:text-sm"
                        style={{
                          color: "#6B7280",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ================= Bottom Journey Indicator ================= */}
        <Reveal>
          <div className="mx-auto mt-12 w-full max-w-3xl sm:mt-14">
            <div
              className="rounded-2xl border bg-white px-4 py-4 sm:px-5 md:px-6"
              style={{
                borderColor: "#FBDBBE",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold sm:text-sm"
                    style={{
                      color: "#17213B",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Every step matters
                  </p>

                  <p
                    className="mt-1 text-[11px] leading-5 sm:text-xs"
                    style={{
                      color: "#8A93A3",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Learn at your own pace and keep moving forward.
                  </p>
                </div>

                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "#FFEEE0",
                  }}
                >
                  <Trophy
                    size={17}
                    style={{
                      color: "#EA580C",
                    }}
                  />
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className="mt-4 h-1.5 overflow-hidden rounded-full"
                style={{
                  background: "#FFF1E4",
                }}
              >
                <div
                  className="h-full w-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #FFB37A, #EA580C)",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
