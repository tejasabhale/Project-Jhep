import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BookOpenCheck,
  ClipboardCheck,
  PlayCircle,
  WifiOff,
  Mic,
  Award,
} from "lucide-react";

/**
 * Project HEP — Feature Carousel
 * ---------------------------------------------------------------
 * Infinite, autoplaying carousel of feature cards, navigated only
 * by the dots beneath it (no prev/next buttons). Built for an
 * English-learning web app for students in under-resourced rural
 * schools — the palette and copy lean toward "sunrise over the
 * fields", low-bandwidth reality, and mentor visibility rather
 * than generic ed-tech gloss.
 * ---------------------------------------------------------------
 */

const FEATURES = [
  {
    icon: BookOpenCheck,
    title: "Interactive Lessons",
    description:
      "Bite-sized lessons students tap and explore at their own pace, built to run smoothly on shared, low-power devices.",
  },
  {
    icon: ClipboardCheck,
    title: "Adaptive Quizzes",
    description:
      "Quick checks after every lesson that adjust in difficulty, so each student gets practice pitched right for them.",
  },
  {
    icon: PlayCircle,
    title: "Animated Story Videos",
    description:
      "Vocabulary taught through short, folk-tale style animations that turn new words into stories worth remembering.",
  },
  {
    icon: WifiOff,
    title: "Offline-First Access",
    description:
      "Lessons download once and keep working without signal — built for villages where connectivity comes and goes.",
  },
  {
    icon: Mic,
    title: "Voice Speaking Practice",
    description:
      "Students speak English aloud and get gentle pronunciation feedback — no reading required to get started.",
  },
  {
    icon: Award,
    title: "Progress for Mentors",
    description:
      "Teachers and parents see simple, visual progress reports, so encouragement can follow every small win.",
  },
];

const AUTOPLAY_MS = 4200;
const TRANSITION_MS = 650;

export default function FeatureCarousel() {
  const n = FEATURES.length;
  // Clone last slide at the front and first slide at the back so the
  // strip can slide "past the end" and be snapped back invisibly —
  // this is what makes the loop feel infinite instead of resetting.
  const slides = [FEATURES[n - 1], ...FEATURES, FEATURES[0]];

  const [index, setIndex] = useState(1); // position within `slides`
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const realIndex = ((index - 1) % n + n) % n;

  const goToReal = useCallback((i) => {
    setWithTransition(true);
    setIndex(i + 1);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return undefined;
    const id = setInterval(() => {
      setWithTransition(true);
      setIndex((i) => i + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, index]);

  // Seamless wrap: when we land on a clone, jump instantly (no transition)
  // to the matching real slide.
  const handleTransitionEnd = () => {
    if (index === slides.length - 1) {
      setWithTransition(false);
      setIndex(1);
    } else if (index === 0) {
      setWithTransition(false);
      setIndex(n);
    }
  };

  // Re-arm the transition on the next paint after a silent jump.
  useEffect(() => {
    if (withTransition) return undefined;
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setWithTransition(true));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [withTransition]);

  return (
    <section
      className="relative w-full overflow-hidden py-16 px-4 sm:px-8"
      style={{
        background:
          "linear-gradient(180deg, #FBF7EE 0%, #F6EFE1 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap');
        .hep-display { font-family: 'Fraunces', serif; }
        .hep-body { font-family: 'Karla', sans-serif; }
      `}</style>

      {/* Signature backdrop: a quiet sunrise arc behind the carousel */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 300"
        className="pointer-events-none absolute left-1/2 top-6 -z-0 hidden -translate-x-1/2 sm:block"
        style={{ width: "min(1100px, 130%)", opacity: 0.35 }}
      >
        <defs>
          <linearGradient id="hepArc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4F8B6E" stopOpacity="0" />
            <stop offset="50%" stopColor="#F0A83A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1B2A4C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 20 260 A 480 480 0 0 1 980 260"
          fill="none"
          stroke="url(#hepArc)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <span
            className="hep-body inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#4F8B6E" }}
          >
            Inside Project HEP
          </span>
          <h2
            className="hep-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "#1B2A4C" }}
          >
            Everything a first lesson in English needs
          </h2>
          <p
            className="hep-body mx-auto mt-3 max-w-xl text-base"
            style={{ color: "#5B5240" }}
          >
            Designed with rural classrooms in mind — light on data,
            heavy on encouragement.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: withTransition
                  ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((feature, pos) => {
                const Icon = feature.icon;
                const isActive = pos === index;
                return (
                  <div
                    key={pos}
                    className="w-full flex-shrink-0 px-2 sm:px-4"
                    aria-hidden={!isActive}
                  >
                    <div
                      className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border px-8 py-12 text-center sm:px-14"
                      style={{
                        background: "#FFFFFF",
                        borderColor: "#EDE3CE",
                        boxShadow: "0 18px 40px -22px rgba(27,42,76,0.35)",
                        opacity: isActive ? 1 : 0.6,
                        transform: isActive ? "scale(1)" : "scale(0.96)",
                        transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
                      }}
                    >
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #F0A83A 0%, #E8902C 100%)",
                        }}
                      >
                        <Icon size={30} color="#FFFFFF" strokeWidth={2} />
                      </div>
                      <h3
                        className="hep-display text-2xl font-semibold"
                        style={{ color: "#1B2A4C" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="hep-body text-base leading-relaxed"
                        style={{ color: "#5B5240" }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {FEATURES.map((feature, i) => {
              const active = i === realIndex;
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => goToReal(i)}
                  aria-label={`Show feature: ${feature.title}`}
                  aria-current={active}
                  className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    height: 10,
                    width: active ? 30 : 10,
                    background: active
                      ? "linear-gradient(90deg, #F0A83A, #E8902C)"
                      : "#D9CDAE",
                    transition:
                      "width 400ms cubic-bezier(0.65,0,0.35,1), background 400ms ease",
                    outlineColor: "#F0A83A",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}