import { ArrowUpRight, BookOpen, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LINE_1_WIDTH = 300;
const LINE_2_WIDTH = 230;
const UNDERLINE_WIDTH = 250;

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDFB]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Caveat:wght@600;700&family=Kalam:wght@400;700&display=swap');

        .jhep-display {
          font-family: 'Fraunces', serif;
        }

        .jhep-body {
          font-family: 'Inter', sans-serif;
        }

        .jhep-kalam {
          font-family: 'Kalam', cursive;
        }

        .jhep-chalk {
          font-family: 'Caveat', cursive;
        }

        /* ==============================
           BACKGROUND IMAGE
        ============================== */

        @keyframes slowZoom {
          0%, 100% {
            transform: scale(1.04);
          }

          50% {
            transform: scale(1.08);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.18;
          }

          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes underlineGrow {
          from {
            transform: scaleX(0);
            opacity: 0;
          }

          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .hero-image {
          animation: slowZoom 12s ease-in-out infinite;
        }

        .hero-glow {
          animation: pulseGlow 9s ease-in-out infinite;
        }

        .hero-underline {
          transform: scaleX(0);
          transform-origin: left;
          animation: underlineGrow 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }

        /* ==============================
           DESKTOP BLACKBOARD
        ============================== */

        @keyframes boardAppear {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chalk-board {
          opacity: 0;
          animation: boardAppear 0.6s ease-out forwards;
          animation-delay: 0.3s;
        }

        /* ==============================
           TEXT WRITING ANIMATION
        ============================== */

        @keyframes chalkWrite {
          from {
            clip-path: inset(-5px 100% -5px 0);
          }

          to {
            clip-path: inset(-5px 0 -5px 0);
          }
        }

        .chalk-line-1 {
          clip-path: inset(-5px 100% -5px 0);
          animation: chalkWrite 1.3s steps(28) forwards;
          animation-delay: 0.9s;
        }

        .chalk-line-2 {
          clip-path: inset(-5px 100% -5px 0);
          animation: chalkWrite 1s steps(20) forwards;
          animation-delay: 2.35s;
        }

        /* ==============================
           UNDERLINE
        ============================== */

        @keyframes chalkUnderlineGrow {
          from {
            transform: scaleX(0);
            opacity: 0;
          }

          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        .chalk-emphasis {
          transform: scaleX(0);
          transform-origin: left;
          animation: chalkUnderlineGrow 0.4s ease-out forwards;
          animation-delay: 2.3s;
        }

        /* ==============================
           SUCCESS BADGE
        ============================== */

        @keyframes badgeAppear {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }

          70% {
            transform: scale(1.08);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes badgeGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(234, 88, 12, 0);
          }

          50% {
            box-shadow: 0 0 0 9px rgba(234, 88, 12, 0.15);
          }
        }

        .chalk-badge-final {
          opacity: 0;
          animation-name: badgeAppear, badgeGlow;
          animation-duration: 0.7s, 3s;
          animation-timing-function: ease-out, ease-in-out;
          animation-delay: 3.4s, 3.4s;
          animation-iteration-count: 1, infinite;
          animation-fill-mode: forwards, none;
        }

        /* ==============================
           REDUCED MOTION
        ============================== */

        @media (prefers-reduced-motion: reduce) {
          .hero-image,
          .hero-glow,
          .hero-underline,
          .chalk-board,
          .chalk-line-1,
          .chalk-line-2,
          .chalk-emphasis,
          .chalk-badge-final {
            animation: none !important;
          }

          .chalk-board {
            opacity: 1;
            transform: none;
          }

          .chalk-line-1,
          .chalk-line-2 {
            clip-path: none;
          }

          .chalk-emphasis {
            transform: scaleX(1);
            opacity: 1;
          }

          .chalk-badge-final {
            opacity: 1;
          }

          .hero-underline {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* ==============================
          BACKGROUND GLOW
      ============================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-glow absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#FFD9B3] blur-[120px]" />

        <div className="hero-glow absolute -bottom-48 -left-40 h-[350px] w-[350px] rounded-full bg-[#FFEEE0] blur-[100px]" />
      </div>

      {/* ==============================
          HERO
      ============================== */}

      <div className="relative w-full">
        <div className="relative h-[500px] w-full overflow-hidden bg-[#FFF7F0] sm:h-[540px] lg:h-[570px]">
          {/* ==============================
              BACKGROUND IMAGE
          ============================== */}

          <div className="absolute inset-0 overflow-hidden">
            {/* DESKTOP BACKGROUND — UNCHANGED */}

            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
              alt="Students learning together in a classroom"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="100vw"
              className="hero-image hidden h-full w-full object-cover motion-reduce:animate-none lg:block"
            />

            {/* MOBILE / TABLET BACKGROUND */}

            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
              alt="Children learning in a classroom"
              loading="eager"
              decoding="async"
              sizes="100vw"
              className="hero-image h-full w-full object-cover object-center motion-reduce:animate-none lg:hidden"
            />

            {/* Base soft overlay */}

            <div className="absolute inset-0 bg-white/10" />

            {/* ==============================
                MOBILE / TABLET FADE
            ============================== */}

            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDFB]/100 via-[#FFFDFB]/90 via-50% to-[#FFF7F0]/35 lg:hidden" />

            {/* Bottom fade for mobile */}

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFFDFB]/60 to-transparent lg:hidden" />

            {/* ==============================
                DESKTOP FADE — UNCHANGED
            ============================== */}

            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#FFFDFB]/95 via-[#FFFDFB]/85 via-55% to-transparent lg:block" />
          </div>

          {/* ==============================
              CONTENT
          ============================== */}

          <div className="relative flex h-full items-center">
            <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24">
              <div className="max-w-xl">
                {/* ==============================
                    BADGE
                ============================== */}

                <div
                  className={`mb-5 transition-all duration-700 ${
                    loaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="jhep-body inline-flex items-center gap-2 rounded-full border border-[#F3D5BD] bg-[#FFF7F0]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C2410C] backdrop-blur-md">
                    <Sparkles size={11} />
                    Project Jhep
                  </span>
                </div>

                {/* ==============================
                    HEADING
                ============================== */}

                <h1
                  className={`jhep-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#17213B] transition-all duration-1000 sm:text-5xl md:text-[3.7rem] lg:text-[4.1rem] xl:text-[4.4rem] ${
                    loaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-7 opacity-0"
                  }`}
                >
                  Every child deserves
                  <br />a{" "}
                  <span className="relative inline-block text-[#EA580C]">
                    confident voice.
                    <span className="hero-underline absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#FF9F66]" />
                  </span>
                </h1>

                {/* ==============================
                    DESCRIPTION
                ============================== */}

                <p
                  className={`jhep-body mt-5 max-w-md text-[14px] leading-6 text-[#5B6472] transition-all delay-200 duration-700 sm:text-[15px] sm:leading-7 ${
                    loaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                >
                  Simple English learning with Marathi support, designed to
                  build confidence.
                </p>

                {/* ==============================
                    CTA
                ============================== */}

                <div
                  className={`mt-6 transition-all delay-[400ms] duration-700 ${
                    loaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                >
                  <button
                    className="jhep-body group inline-flex items-center gap-3 rounded-full bg-[#EA580C] px-5 py-3 text-[13px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(234,88,12,0.45)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDFB]"
                    onClick={() => navigate("/login")}
                  >
                    Explore Project Jhep
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight size={13} />
                    </span>
                  </button>
                </div>

                {/* ==============================
                    SUPPORTING DETAIL
                ============================== */}

                <div
                  className={`mt-6 flex items-center gap-2 transition-all delay-500 duration-700 ${
                    loaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <BookOpen size={14} className="text-[#EA580C]" />

                  <span className="jhep-body text-[11px] text-[#6B7280]">
                    English • Marathi • Grades 1–10
                  </span>
                </div>
              </div>
            </div>

            {/* ==============================
                DESKTOP BLACKBOARD ONLY
                Hidden below lg
            ============================== */}

            <div className="absolute right-[4%] top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="rounded-[2rem] border border-white/50 bg-gradient-to-br from-white/80 via-[#FFF9F2]/75 to-[#FFEEDF]/70 p-7 shadow-[0_30px_70px_-25px_rgba(23,33,59,0.22)] backdrop-blur-xl">
                <div className="w-[320px]">
                  <p className="jhep-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8A8175]">
                    Project Jhep
                  </p>

                  <p className="jhep-display mt-1 text-lg font-semibold text-[#17213B]">
                    Learn • Speak • Grow
                  </p>

                  {/* ==============================
                      BLACKBOARD
                  ============================== */}

                  <div className="chalk-board relative mt-5 rounded-2xl border-[6px] border-[#8B5E3C]/80 bg-[#1C2620] p-6 shadow-inner">
                    {/* Chalk texture */}

                    <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_60%)]" />

                    {/* ==============================
                        ENGLISH
                    ============================== */}

                    <div
                      className="relative"
                      style={{
                        width: LINE_1_WIDTH,
                        minHeight: "36px",
                      }}
                    >
                      <span className="chalk-line-1 jhep-chalk block whitespace-nowrap text-[26px] font-semibold leading-[1.2] text-[#FDF8ED]">
                        Let's learn English!
                      </span>

                      {/* SHORTER LINE BETWEEN ENGLISH AND MARATHI */}

                      <span
                        className="chalk-emphasis absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#FFB577]/70"
                        style={{
                          width: `${UNDERLINE_WIDTH}px`,
                        }}
                      />
                    </div>

                    {/* ==============================
                        MARATHI
                    ============================== */}

                    <div
                      className="relative mt-5"
                      style={{
                        width: LINE_2_WIDTH,
                        minHeight: "34px",
                      }}
                    >
                      <span
                        className="
                          chalk-line-2
                          jhep-kalam
                          block
                          whitespace-nowrap
                          text-[18px]
                          font-bold
                          leading-[1.35]
                          text-[#FFB577]
                        "
                      >
                        चला इंग्रजी शिकूया
                      </span>
                    </div>

                    {/* ==============================
                        CHALK LEDGE
                    ============================== */}

                    <div className="mt-6 flex gap-1.5 border-t border-white/10 pt-3">
                      <span className="h-1.5 w-6 rounded-full bg-[#FDF8ED]/70" />
                      <span className="h-1.5 w-4 rounded-full bg-[#FFB577]/70" />
                    </div>

                    {/* ==============================
                        SUCCESS BADGE
                    ============================== */}

                    <div className="chalk-badge-final absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#FFF7F0] bg-[#EA580C] text-white shadow-[0_15px_30px_-12px_rgba(234,88,12,0.55)]">
                      <Star size={18} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
