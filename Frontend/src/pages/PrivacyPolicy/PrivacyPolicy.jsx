import {
  User,
  Database,
  Lock,
  BookOpen,
  Mail,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      number: "01",
      icon: User,
      title: "Information We Collect",
      content:
        "We may collect basic information such as your name, email address, profile details, and learning progress when you create an account or use our platform.",
    },
    {
      number: "02",
      icon: Database,
      title: "How We Use Information",
      content:
        "The information we collect helps us provide a better learning experience, manage accounts, track progress, improve our platform, and communicate important updates.",
    },
    {
      number: "03",
      icon: BookOpen,
      title: "Educational Data",
      content:
        "Learning activities, quiz results, lesson completion, and progress data may be stored to help students and educators understand learning improvement.",
    },
    {
      number: "04",
      icon: Lock,
      title: "Data Security",
      content:
        "We take reasonable technical and organizational measures to protect user information from unauthorized access, misuse, alteration, or disclosure.",
    },
    {
      number: "05",
      icon: ShieldCheck,
      title: "Information Sharing",
      content:
        "We do not sell or misuse personal information. User data is only shared when necessary to provide platform services or when required by applicable law.",
    },
    {
      number: "06",
      icon: Mail,
      title: "Contact Us",
      content:
        "If you have questions about this Privacy Policy or how your information is handled, please contact our support team.",
    },
  ];

  return (
    <div className="privacy-page min-h-screen overflow-hidden bg-[#FFFCF9] text-black">
      <style>{`
        /* ================================================================
           FULL PAGE ANIMATIONS
        ================================================================ */

        @keyframes privacyPageReveal {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes privacyFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes privacyFadeDown {
          from {
            opacity: 0;
            transform: translateY(-18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes privacyScale {
          from {
            opacity: 0;
            transform: scale(0.94);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes privacyFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -12px, 0);
          }
        }

        @keyframes privacyFloatSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(10px, -8px, 0);
          }
        }

        @keyframes privacyLine {
          from {
            transform: scaleX(0);
            opacity: 0;
          }

          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes privacyShimmer {
          from {
            transform: translateX(-120%);
          }

          to {
            transform: translateX(120%);
          }
        }

        @keyframes privacyPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.08);
            opacity: 0.7;
          }
        }

        .privacy-page {
          animation: privacyPageReveal 0.8s ease-out both;
        }

        .privacy-fade {
          opacity: 0;
          animation: privacyFadeUp 0.75s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .privacy-down {
          opacity: 0;
          animation: privacyFadeDown 0.75s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .privacy-scale {
          opacity: 0;
          animation: privacyScale 0.75s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .privacy-float {
          animation: privacyFloat 5s ease-in-out infinite;
        }

        .privacy-float-slow {
          animation: privacyFloatSlow 8s ease-in-out infinite;
        }

        .privacy-pulse {
          animation: privacyPulse 5s ease-in-out infinite;
        }

        .privacy-line {
          transform: scaleX(0);
          animation: privacyLine 1s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* ================================================================
           CARDS
        ================================================================ */

        .privacy-card {
          position: relative;

          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease,
            box-shadow 0.45s ease;
        }

        .privacy-card:hover {
          transform: translateY(-7px);
          border-color: #fdba74;

          box-shadow:
            0 24px 55px -32px rgba(249, 115, 22, 0.4);
        }

        .privacy-icon {
          transition:
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .privacy-card:hover .privacy-icon {
          transform: scale(1.08) rotate(-4deg);
          background-color: #f97316 !important;

          box-shadow:
            0 12px 24px -12px rgba(249, 115, 22, 0.6);
        }

        .privacy-card:hover .privacy-icon svg {
          color: white !important;
        }

        .privacy-number {
          transition:
            color 0.35s ease,
            transform 0.35s ease;
        }

        .privacy-card:hover .privacy-number {
          color: #ffedd5 !important;
          transform: translateY(-2px);
        }

        .privacy-indicator {
          opacity: 0;
          transform: translateX(-8px);

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
        }

        .privacy-card:hover .privacy-indicator {
          opacity: 1;
          transform: translateX(0);
        }

        /* ================================================================
           CTA
        ================================================================ */

        .privacy-contact {
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease,
            background-color 0.3s ease;
        }

        .privacy-contact:hover {
          transform: translateY(-3px);
          background-color: #ff9514;

          box-shadow:
            0 16px 30px -15px rgba(249, 115, 22, 0.45);
        }

        /* ================================================================
           SHIMMER
        ================================================================ */

        .privacy-shimmer {
          position: relative;
          overflow: hidden;
        }

        .privacy-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 45%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );

          transform: translateX(-120%);
          animation: privacyShimmer 4s ease-in-out infinite;

          pointer-events: none;
        }

        /* ================================================================
           REDUCED MOTION
        ================================================================ */

        @media (prefers-reduced-motion: reduce) {
          .privacy-page,
          .privacy-fade,
          .privacy-down,
          .privacy-scale,
          .privacy-float,
          .privacy-float-slow,
          .privacy-pulse,
          .privacy-line {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }

          .privacy-card,
          .privacy-icon,
          .privacy-indicator,
          .privacy-contact {
            transition: none !important;
          }

          .privacy-shimmer::after {
            animation: none !important;
          }
        }
      `}</style>

      {/* ================================================================
          HERO
      ================================================================ */}

      <section className="relative overflow-hidden border-b border-orange-100 bg-white">
        {/* Decorative orange atmosphere */}

        <div className="privacy-float pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />

        <div
          className="privacy-float-slow pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-orange-50 blur-3xl"
          style={{ animationDelay: "-2s" }}
        />

        <div className="privacy-pulse pointer-events-none absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full bg-orange-100/30 blur-2xl" />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-16 md:pb-20 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}

            <div
              className="privacy-down inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-600"
              style={{ animationDelay: "100ms" }}
            >
              <ShieldCheck size={14} />
              Your Privacy Matters
            </div>

            {/* Heading */}

            <h1
              className="privacy-fade mt-6 text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl lg:text-[3.5rem]"
              style={{
                fontFamily: "'Fraunces', serif",
                animationDelay: "220ms",
              }}
            >
              Privacy <span className="text-orange-500">Policy</span>
            </h1>

            {/* Accent */}

            <div
              className="privacy-line mx-auto mt-5 h-[3px] w-20 rounded-full bg-orange-500"
              style={{ animationDelay: "350ms" }}
            />

            {/* Description */}

            <p
              className="privacy-fade mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-600 md:text-base"
              style={{
                animationDelay: "430ms",
              }}
            >
              We believe learning should be empowering, safe, and accessible.
              This policy explains how Project Jhep handles the information
              entrusted to us.
            </p>

            {/* Date */}

            <p
              className="privacy-fade mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-orange-500"
              style={{ animationDelay: "520ms" }}
            >
              Last updated · August 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          CONTENT
      ================================================================ */}

      <main className="px-5 py-12 md:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          {/* INTRODUCTION */}

          <section
            className="privacy-scale mb-12"
            style={{ animationDelay: "150ms" }}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-white p-7 shadow-[0_12px_40px_-30px_rgba(249,115,22,0.4)] md:p-10">
              {/* Accent */}

              <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />

              <div className="flex gap-5">
                <div className="privacy-float hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 sm:flex">
                  <Sparkles size={20} className="text-orange-500" />
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
                    Our Commitment
                  </p>

                  <p className="text-sm leading-7 text-gray-600 md:text-base">
                    Project Jhep is committed to protecting the privacy of
                    students, teachers, volunteers, and everyone who accesses
                    our educational platform. This Privacy Policy explains what
                    information we collect, why we collect it, and how we work
                    to keep it protected.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION HEADING */}

          <div
            className="privacy-fade mb-7"
            style={{ animationDelay: "250ms" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">
              Understanding Your Data
            </p>

            <h2
              className="mt-2 text-2xl font-bold text-black md:text-3xl"
              style={{
                fontFamily: "'Fraunces', serif",
              }}
            >
              How we handle your information
            </h2>
          </div>

          {/* POLICY CARDS */}

          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="privacy-card privacy-fade group overflow-hidden rounded-[1.5rem] border border-orange-100 bg-white p-6 md:p-7"
                  style={{
                    animationDelay: `${300 + index * 100}ms`,
                  }}
                >
                  {/* Number */}

                  <span
                    className="privacy-number pointer-events-none absolute right-5 top-4 select-none text-5xl font-bold leading-none text-orange-50"
                    style={{
                      fontFamily: "'Fraunces', serif",
                    }}
                  >
                    {section.number}
                  </span>

                  {/* Icon */}

                  <div className="privacy-icon relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                    <Icon size={19} className="text-orange-500" />
                  </div>

                  {/* Content */}

                  <div className="relative mt-5">
                    <h3
                      className="text-lg font-bold text-black"
                      style={{
                        fontFamily: "'Fraunces', serif",
                      }}
                    >
                      {section.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {section.content}
                    </p>
                  </div>

                  {/* Indicator */}

                  <div className="privacy-indicator mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-500">
                    <span>Project Jhep</span>
                    <ChevronRight size={12} />
                  </div>
                </article>
              );
            })}
          </div>

          {/* ================================================================
              CTA
          ================================================================ */}

          <section
            className="privacy-scale mt-12"
            style={{ animationDelay: "950ms" }}
          >
            <div className="privacy-shimmer relative overflow-hidden rounded-[2rem] border border-orange-200 bg-orange-50 px-7 py-10 text-center shadow-[0_18px_50px_-35px_rgba(249,115,22,0.5)] md:px-10 md:py-12">
              {/* Decorative shapes */}

              <div className="privacy-float pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-100/80" />

              <div
                className="privacy-float-slow pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/80"
                style={{ animationDelay: "-3s" }}
              />

              <div className="relative">
                {/* Icon */}

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-[0_10px_25px_-10px_rgba(249,115,22,0.7)]">
                  <Mail size={20} className="text-white" />
                </div>

                <h2
                  className="mt-5 text-2xl font-bold text-black md:text-3xl"
                  style={{
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  Have questions about your privacy?
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
                  If you have questions about this Privacy Policy or how your
                  information is handled, we'd be happy to help.
                </p>

                <a
                  href="mailto:support@projectjhep.org"
                  className="privacy-contact mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <Mail size={15} />
                  Contact Support
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER NOTE */}

          <div
            className="privacy-fade mt-8 border-t border-orange-100 pt-6 text-center"
            style={{ animationDelay: "1050ms" }}
          >
            <p className="text-xs leading-6 text-gray-500">
              By using Project Jhep, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
