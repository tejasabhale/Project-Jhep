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

        /* ---- phrase cycler: smoother easing + slight scale for a softer feel ---- */
        @keyframes jhep-fade-cycle {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          8% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          28% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          36% {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
        }

        .jhep-phrase {
          animation: jhep-fade-cycle 7.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0;
        }

        /* ---- gentle ambient float for the mockup card's background blobs ---- */
        @keyframes jhep-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.04); }
        }

        .jhep-blob {
          animation: jhep-float 6s ease-in-out infinite;
        }

        /* ---- card + icon transitions, centralized so timing stays consistent ---- */
        .jhep-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease;
        }

        .jhep-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -24px rgba(23, 33, 59, 0.22);
        }

        .jhep-icon {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.35s ease, color 0.35s ease;
        }

        .jhep-card:hover .jhep-icon {
          transform: scale(1.08) rotate(-4deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .jhep-phrase {
            animation: none;
            opacity: 1;
          }

          .jhep-phrase:not(:first-child) {
            display: none;
          }

          .jhep-blob {
            animation: none;
          }

          .jhep-card,
          .jhep-icon {
            transition: none;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 text-center">
            <span
              className="jhep-body inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "#C2410C", background: "#FFF1E4" }}
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

        {/* ---- symmetric two-column row: mockup + description, equal visual weight ---- */}
        <div className="grid items-stretch gap-14 lg:grid-cols-2">
          <Reveal>
            <div
              className="relative flex h-full w-full flex-col justify-center rounded-[2rem] p-8"
              style={{
                background:
                  "radial-gradient(120% 120% at 15% 10%, #FFF1E4 0%, #FFFFFF 60%)",
                border: "1px solid #FBDBBE",
              }}
            >
              <div
                className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-white px-6"
                style={{ boxShadow: "0 24px 48px -28px rgba(23,33,59,0.35)" }}
              >
                <span
                  className="jhep-body absolute left-6 top-6 rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{ background: "#FFEEE0", color: "#C2410C" }}
                >
                  Spoken English
                </span>

                <span
                  className="jhep-body absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{ background: "#EEF2FF", color: "#4338CA" }}
                >
                  Marathi Support
                </span>

                <div className="relative h-28 w-full text-center">
                  {PHRASE_PAIRS.map((pair, i) => (
                    <div
                      key={pair.en}
                      className="jhep-phrase absolute inset-0 flex flex-col items-center justify-center"
                      style={{ animationDelay: `${i * 2.5}s` }}
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
                className="jhep-blob absolute -right-4 -top-4 h-16 w-16 rounded-full"
                style={{ background: "#FFD9B3", opacity: 0.7 }}
              />

              <div
                className="jhep-blob absolute -bottom-5 -left-5 h-20 w-20 rounded-full"
                style={{ background: "#FFEEE0", animationDelay: "1.5s" }}
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col justify-center">
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
            </div>
          </Reveal>
        </div>

        {/* ---- benefits grid moved out to its own full-width, evenly-balanced row ---- */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;

            return (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <article
                  className="jhep-card jhep-body group flex h-full flex-col items-center rounded-2xl border bg-white p-6 text-center"
                  style={{ borderColor: "#F1E5DC" }}
                >
                  <div className="jhep-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <h4
                    className="jhep-display mt-4 text-[17px] font-semibold leading-snug"
                    style={{ color: "#17213B" }}
                  >
                    {benefit.title}
                  </h4>

                  <p
                    className="mt-2 text-[13px] leading-6"
                    style={{ color: "#6B7280" }}
                  >
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
