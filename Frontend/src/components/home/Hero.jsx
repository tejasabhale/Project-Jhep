import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-background lg:min-h-[100svh]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Kalam:wght@400;700&display=swap');

        .jhep-chalk { font-family: 'Caveat', cursive; }
        .jhep-kalam { font-family: 'Kalam', cursive; }

        @keyframes slowZoom {
          0%, 100% { transform: scale(1.04); }
          50%      { transform: scale(1.08); }
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1);   opacity: 0.18; }
          50%      { transform: scale(1.1); opacity: 0.3; }
        }

        @keyframes boardAppear {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes chalkWrite {
          from { clip-path: inset(-5px 100% -5px 0); }
          to   { clip-path: inset(-5px 0 -5px 0); }
        }

        @keyframes underlineGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        @keyframes markGrow {
          from { background-size: 0% 100%; }
          to   { background-size: 100% 100%; }
        }

        @media (min-width: 1024px) {
          .hero-image { animation: slowZoom 12s ease-in-out infinite; }
          .hero-glow  { animation: pulseGlow 9s ease-in-out infinite; }
        }

        .hero-mark {
          background-image: linear-gradient(
            transparent 58%,
            rgb(251 146 60 / 0.4) 58%,
            rgb(251 146 60 / 0.4) 92%,
            transparent 92%
          );
          background-repeat: no-repeat;
          background-size: 0% 100%;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          padding: 0 0.08em;
          margin: 0 -0.08em;
          animation: markGrow 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: 0.9s;
        }

        .chalk-board {
          opacity: 0;
          animation: boardAppear 0.6s ease-out forwards;
          animation-delay: 0.3s;
        }

        .chalk-line-1 {
          clip-path: inset(-5px 100% -5px 0);
          animation: chalkWrite 1.3s steps(22) forwards;
          animation-delay: 0.9s;
        }

        .chalk-line-2 {
          clip-path: inset(-5px 100% -5px 0);
          animation: chalkWrite 1s steps(17) forwards;
          animation-delay: 2.35s;
        }

        .chalk-emphasis {
          transform: scaleX(0);
          transform-origin: left;
          animation: underlineGrow 0.4s ease-out forwards;
          animation-delay: 2.2s;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-image, .hero-glow, .hero-mark,
          .chalk-board, .chalk-line-1, .chalk-line-2, .chalk-emphasis {
            animation: none !important;
          }
          .hero-mark { background-size: 100% 100%; }
          .chalk-board { opacity: 1; transform: none; }
          .chalk-line-1, .chalk-line-2 { clip-path: none; }
          .chalk-emphasis { transform: scaleX(1); opacity: 1; }
        }
      `}</style>

      {/* Background glow (large screens only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      >
        <div className="hero-glow absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-lesson-peach blur-[120px]" />
        <div className="hero-glow absolute -bottom-48 -left-40 h-[350px] w-[350px] rounded-full bg-accent-light blur-[100px]" />
      </div>

      {/* Photo: banner on mobile, full background on desktop */}
      <div
        aria-hidden="true"
        className="relative h-64 overflow-hidden sm:h-80 lg:absolute lg:inset-0 lg:h-auto"
      >
        <picture className="block h-full w-full">
          <source
            media="(min-width: 1024px)"
            srcSet="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
          />
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="hero-image h-full w-full object-cover object-center"
          />
        </picture>

        <div className="absolute inset-0 bg-surface/10" />

        {/* Mobile: photo fades into the cream page below it */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/60 to-transparent lg:hidden" />

        {/* Desktop: cream behind the text, then the photo shows through the middle */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background/95 via-background/55 via-50% to-background/10 lg:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-5 pb-14 sm:px-10 md:px-14 lg:min-h-[100svh] lg:flex-row lg:items-center lg:px-20 lg:py-28 xl:px-24">
        {/* Blackboard: overlaps photo on mobile, floats right on desktop */}
        <div className="order-first -mt-20 mb-8 w-full max-w-md sm:-mt-24 lg:absolute lg:right-[6%] lg:top-1/2 lg:mb-0 lg:mt-0 lg:w-auto lg:max-w-none lg:-translate-y-1/2 xl:right-[8%]">
          {/* Soft glow behind the board (desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 -z-10 hidden rounded-full bg-lesson-peach/80 blur-3xl lg:block"
          />

          <div className="rounded-[1.5rem] border border-border bg-gradient-to-br from-surface/95 via-accent-light/85 to-primary-light/60 p-4 shadow-[var(--shadow-lg)] backdrop-blur-xl sm:p-5 lg:rounded-[2rem] lg:p-7">
            <div className="lg:w-[340px]">
              <div className="flex items-baseline justify-between gap-3 lg:block">
                <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Project Jhep
                </p>
                <p className="font-display text-sm font-semibold text-secondary lg:mt-1 lg:text-lg">
                  Learn • Speak • Grow
                </p>
              </div>

              {/* Blackboard */}
              <div className="chalk-board relative mt-3 rounded-2xl border-[5px] border-secondary bg-dark-bg p-5 shadow-inner sm:border-[6px] sm:p-6 lg:mt-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[10px] bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255_/_0.05),transparent_60%)]"
                />

                {/* English */}
                <span className="relative inline-block max-w-full">
                  <span className="chalk-line-1 jhep-chalk block whitespace-nowrap text-[clamp(22px,7vw,26px)] font-semibold leading-[1.2] text-dark-text lg:text-[28px]">
                    Let&apos;s learn English!
                  </span>
                  <span
                    aria-hidden="true"
                    className="chalk-emphasis absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-accent"
                  />
                </span>

                {/* Marathi */}
                <span className="relative mt-4 block">
                  <span
                    lang="mr"
                    className="chalk-line-2 jhep-kalam inline-block whitespace-nowrap text-[clamp(16px,5vw,18px)] font-bold leading-[1.45] text-primary-light lg:text-[19px]"
                  >
                    चला इंग्रजी शिकूया
                  </span>
                </span>

                {/* Chalk ledge */}
                <div
                  aria-hidden="true"
                  className="mt-4 flex gap-1.5 border-t border-white/10 pt-3"
                >
                  <span className="h-1.5 w-6 rounded-full bg-dark-text/70" />
                  <span className="h-1.5 w-4 rounded-full bg-primary-light/70" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="max-w-xl lg:max-w-[34rem]">
          <h1
            className={`font-display text-[clamp(2.1rem,10vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-secondary transition-all duration-1000 motion-reduce:transition-none sm:text-5xl md:text-[3.7rem] lg:text-[4.3rem] xl:text-[4.7rem] ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-7 opacity-0 motion-reduce:translate-y-0"
            }`}
          >
            Every child deserves
            <br className="hidden sm:block" /> a{" "}
            <span className="hero-mark whitespace-nowrap text-primary-dark">
              confident voice.
            </span>
          </h1>

          <p
            className={`mt-5 max-w-md font-sans text-[15px] leading-7 text-text-secondary transition-all delay-200 duration-700 motion-reduce:transition-none sm:text-base ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0 motion-reduce:translate-y-0"
            }`}
          >
            Simple English learning with Marathi support, designed to build
            confidence.
          </p>

          <div
            className={`mt-7 transition-all delay-[400ms] duration-700 motion-reduce:transition-none ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0 motion-reduce:translate-y-0"
            }`}
          >
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-primary-dark px-6 py-3.5 font-sans text-sm font-semibold !text-white shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto sm:px-6 sm:py-3 sm:text-[13px]"
            >
              <span className="!text-white">Explore Project Jhep</span>

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="text-white"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
