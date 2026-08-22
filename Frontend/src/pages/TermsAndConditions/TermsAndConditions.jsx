import {
  BookOpen,
  UserCheck,
  ShieldCheck,
  FileText,
  AlertCircle,
  Users,
  ChevronRight,
  Sparkles,
  Mail,
} from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      number: "01",
      icon: UserCheck,
      title: "User Accounts",
      content:
        "Users are responsible for maintaining the confidentiality of their account information. You agree to provide accurate information while creating an account and using our platform.",
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Learning Content",
      content:
        "All educational materials, including lessons, activities, quizzes, and resources available on Project Jhep are created to support learning. Content should only be used for educational purposes.",
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Privacy & Security",
      content:
        "We respect user privacy and take reasonable steps to protect personal information. Users should avoid sharing their login credentials with others.",
    },
    {
      number: "04",
      icon: FileText,
      title: "Content Ownership",
      content:
        "The design, educational resources, branding, and original content of Project Jhep belong to the organization. Unauthorized copying or redistribution is not allowed.",
    },
    {
      number: "05",
      icon: AlertCircle,
      title: "Platform Usage",
      content:
        "Users must use the platform responsibly and should not attempt to harm, misuse, or interfere with website functionality.",
    },
    {
      number: "06",
      icon: Users,
      title: "Respectful Learning Environment",
      content:
        "Users are expected to interact respectfully with students, teachers, volunteers, and other members of the Project Jhep community. Harassment, abusive behavior, or inappropriate use of the platform is not permitted.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF9] text-black">
      <style>{`
        @keyframes termsReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes termsScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes termsFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes termsLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes termsGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }

        .terms-reveal {
          opacity: 0;
          animation: termsReveal 0.8s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .terms-scale {
          opacity: 0;
          animation: termsScale 0.8s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .terms-float {
          animation: termsFloat 4.5s ease-in-out infinite;
        }

        .terms-line {
          transform: scaleX(0);
          animation: termsLine 0.9s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
        }

        .terms-glow {
          animation: termsGlow 7s ease-in-out infinite;
        }

        .terms-card {
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease,
            box-shadow 0.45s ease;
        }

        .terms-card:hover {
          transform: translateY(-6px);
          border-color: #fed7aa;
          box-shadow:
            0 24px 50px -30px rgba(249, 115, 22, 0.35);
        }

        .terms-icon {
          transition:
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .terms-card:hover .terms-icon {
          transform: translateY(-2px) scale(1.06) rotate(-3deg);
          background-color: #f97316 !important;
          box-shadow:
            0 10px 24px -10px rgba(249, 115, 22, 0.65);
        }

        .terms-card:hover .terms-icon svg {
          color: white !important;
        }

        .terms-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .terms-card:hover .terms-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .terms-contact {
          transition:
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s ease,
            background-color 0.3s ease;
        }

        .terms-contact:hover {
          transform: translateY(-3px);
          background-color: #ff9514;
          box-shadow:
            0 14px 30px -12px rgba(249, 115, 22, 0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .terms-reveal,
          .terms-scale,
          .terms-float,
          .terms-line,
          .terms-glow {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .terms-card,
          .terms-icon,
          .terms-arrow,
          .terms-contact {
            transition: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-orange-100 bg-white">
        <div className="terms-glow pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl" />

        <div
          className="terms-glow pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-orange-50 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="terms-reveal inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-600"
              style={{ animationDelay: "80ms" }}
            >
              <ShieldCheck size={14} />
              Simple & Transparent
            </div>

            <h1
              className="terms-reveal mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[3.5rem]"
              style={{
                animationDelay: "160ms",
                fontFamily: "'Fraunces', serif",
              }}
            >
              Terms &{" "}
              <span className="text-orange-500">Conditions</span>
            </h1>

            <div
              className="terms-line mx-auto mt-5 h-[3px] w-16 rounded-full bg-orange-500"
              style={{ animationDelay: "300ms" }}
            />

            <p
              className="terms-reveal mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-600 md:text-base"
              style={{
                animationDelay: "380ms",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Clear guidelines help us create a safe, respectful, and
              meaningful learning environment for everyone using Project Jhep.
            </p>

            <p
              className="terms-reveal mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-orange-500"
              style={{
                animationDelay: "460ms",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Last updated · August 2026
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="px-5 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          {/* INTRODUCTION */}
          <section
            className="terms-reveal mb-12"
            style={{ animationDelay: "120ms" }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-white p-7 shadow-[0_15px_45px_-32px_rgba(249,115,22,0.35)] md:p-10">
              <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />

              <div className="flex gap-5">
                <div className="terms-float hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 sm:flex">
                  <Sparkles size={20} className="text-orange-500" />
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                    Before You Begin
                  </p>

                  <p className="text-sm leading-7 text-gray-600 md:text-base">
                    Project Jhep is an educational platform designed to
                    provide accessible English learning resources for students.
                    These Terms & Conditions explain the rules and guidelines
                    for using our website and services. By accessing or using
                    Project Jhep, you agree to follow these terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* HEADING */}
          <div
            className="terms-reveal mb-7"
            style={{ animationDelay: "180ms" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
              Know The Guidelines
            </p>

            <h2
              className="mt-2 text-2xl font-bold text-black md:text-3xl"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Using Project Jhep responsibly
            </h2>
          </div>

          {/* CARDS */}
          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="terms-card terms-scale group relative overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white p-6 md:p-7"
                  style={{
                    animationDelay: `${220 + index * 90}ms`,
                  }}
                >
                  <span
                    className="pointer-events-none absolute right-5 top-4 select-none text-5xl font-bold leading-none text-orange-50"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {section.number}
                  </span>

                  <div className="terms-icon relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                    <Icon size={19} className="text-orange-500" />
                  </div>

                  <div className="relative mt-5">
                    <h3
                      className="text-lg font-bold text-black"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {section.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {section.content}
                    </p>
                  </div>

                  <div className="terms-arrow mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-500">
                    <span>Project Jhep</span>
                    <ChevronRight size={12} />
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA */}
          <section
            className="terms-reveal mt-12"
            style={{ animationDelay: "850ms" }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-orange-200 bg-orange-100 px-7 py-10 text-center shadow-[0_18px_50px_-35px_rgba(249,115,22,0.45)] md:px-10 md:py-12">
              <div className="terms-glow pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-orange-200/70 blur-2xl" />

              <div
                className="terms-glow pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/70 blur-2xl"
                style={{ animationDelay: "-2s" }}
              />

              <div className="relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/20">
                  <Mail size={20} className="text-white" />
                </div>

                <h2
                  className="mt-5 text-2xl font-bold text-black md:text-3xl"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Have questions about these terms?
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
                  If something is unclear or you need more information about
                  using Project Jhep, our team is happy to help.
                </p>

                <a
                  href="mailto:support@projectjhep.org"
                  className="terms-contact mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white"
                >
                  <Mail size={15} />
                  Contact Support
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <div className="mt-8 border-t border-orange-100 pt-6 text-center">
            <p className="text-xs leading-6 text-gray-500">
              By using Project Jhep, you acknowledge that you have read and
              understood these Terms & Conditions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;