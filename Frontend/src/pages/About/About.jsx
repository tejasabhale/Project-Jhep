import { BookOpen, Languages, Sparkles, Clock3 } from "lucide-react";
import Reveal from "../../components/ui/Reveal";

const benefits = [
  {
    icon: BookOpen,
    title: "Easy English Learning",
    description:
      "Learn English through simple lessons, examples, and everyday conversations.",
  },
  {
    icon: Languages,
    title: "Marathi Support",
    description:
      "Understand English better with helpful Marathi translations and explanations.",
  },
  {
    icon: Sparkles,
    title: "Interactive Lessons",
    description:
      "Learn through engaging activities, conversations, quizzes, and visual content.",
  },
  {
    icon: Clock3,
    title: "Learn at Your Own Pace",
    description:
      "Learn whenever you want and revisit lessons whenever you need them.",
  },
];

const PHRASE_PAIRS = [
  { en: "Good Morning", mr: "सुप्रभात" },
  { en: "Thank You", mr: "धन्यवाद" },
  { en: "How are you?", mr: "तू कसा आहेस?" },
];

export default function About() {
  return (
    <section className="px-6 py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

        .jhep-display {
          font-family: 'Fraunces', serif;
        }

        .jhep-body {
          font-family: 'Inter', sans-serif;
        }

        @keyframes jhep-fade-cycle {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }

          5% {
            opacity: 1;
            transform: translateY(0);
          }

          28% {
            opacity: 1;
            transform: translateY(0);
          }

          33% {
            opacity: 0;
            transform: translateY(-8px);
          }

          100% {
            opacity: 0;
            transform: translateY(-8px);
          }
        }

        .jhep-phrase {
          animation: jhep-fade-cycle 7.5s ease-in-out infinite;
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .jhep-phrase {
            animation: none;
            opacity: 1;
          }

          .jhep-phrase:not(:first-child) {
            display: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 text-center">
            <span
              className="jhep-body inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                color: "#C2410C",
              }}
            >
              About Project Jhep
            </span>

            <h2
              className="jhep-display mt-5 text-3xl font-semibold md:text-[2.75rem] md:leading-[1.15]"
              style={{ color: "#17213B" }}
            >
              What is{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #FF7A30, #EA580C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Project Jhep?
              </span>
            </h2>

            <p
              className="jhep-body mx-auto mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "#5B6472" }}
            >
              Project Jhep is an educational initiative that helps students
              improve their English communication skills through simple,
              engaging, and accessible learning resources.
            </p>
          </div>
        </Reveal>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="flex justify-center">
              <div
                className="relative w-full max-w-lg rounded-[2rem] p-8"
                style={{
                  background:
                    "radial-gradient(120% 120% at 15% 10%, #FFF1E4 0%, #FFFFFF 60%)",
                  border: "1px solid #FBDBBE",
                }}
              >
                <div
                  className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-white px-6"
                  style={{
                    boxShadow: "0 24px 48px -28px rgba(23,33,59,0.35)",
                  }}
                >
                  <span
                    className="jhep-body absolute left-6 top-6 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{
                      background: "#FFEEE0",
                      color: "#C2410C",
                    }}
                  >
                    Spoken English
                  </span>

                  <span
                    className="jhep-body absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-semibold"
                    style={{
                      background: "#EEF2FF",
                      color: "#4338CA",
                    }}
                  >
                    Marathi Support
                  </span>

                  <div className="relative h-28 w-full text-center">
                    {PHRASE_PAIRS.map((pair, i) => (
                      <div
                        key={pair.en}
                        className="jhep-phrase absolute inset-0 flex flex-col items-center justify-center"
                        style={{
                          animationDelay: `${i * 2.5}s`,
                        }}
                      >
                        <span
                          className="jhep-display text-3xl font-semibold"
                          style={{ color: "#17213B" }}
                        >
                          {pair.en}
                        </span>

                        <span
                          className="jhep-body mt-2 text-lg"
                          style={{ color: "#EA580C" }}
                        >
                          {pair.mr}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p
                    className="jhep-body mt-4 text-sm"
                    style={{ color: "#8A93A3" }}
                  >
                    Learn. Practice. Grow.
                  </p>
                </div>

                <div
                  className="absolute -right-4 -top-4 h-16 w-16 rounded-full"
                  style={{
                    background: "#FFD9B3",
                    opacity: 0.7,
                  }}
                />

                <div
                  className="absolute -bottom-5 -left-5 h-20 w-20 rounded-full"
                  style={{
                    background: "#FFEEE0",
                  }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <h3
                className="jhep-display text-2xl font-semibold md:text-3xl"
                style={{ color: "#17213B" }}
              >
                Making English learning{" "}
                <span style={{ color: "#EA580C" }}>simple and accessible.</span>
              </h3>

              <p
                className="jhep-body mt-5 leading-7"
                style={{ color: "#5B6472" }}
              >
                Project Jhep is designed especially to support students who want
                to build confidence in English. The platform combines simple
                English content with Marathi support so that students can learn
                comfortably and understand concepts clearly.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <Reveal key={benefit.title}>
                      <article
                        className="
            jhep-body
            group
            h-full
            rounded-2xl
            border
            bg-white
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-200
          "
                        style={{
                          borderColor: "#F1E5DC",
                        }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-orange-50
                text-orange-600
                transition-colors
                duration-300
                group-hover:bg-orange-100
              "
                          >
                            <Icon size={19} strokeWidth={2} />
                          </div>

                          {/* Content */}
                          <div className="min-w-0">
                            <h4
                              className="
                  jhep-display
                  text-[17px]
                  font-semibold
                  leading-snug
                "
                              style={{
                                color: "#17213B",
                              }}
                            >
                              {benefit.title}
                            </h4>

                            <p
                              className="
                  mt-2
                  text-[13px]
                  leading-5.5
                "
                              style={{
                                color: "#6B7280",
                              }}
                            >
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
