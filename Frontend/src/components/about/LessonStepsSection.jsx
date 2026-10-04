const CARD_TINTS = [
  "bg-lesson-orange",
  "bg-lesson-blue",
  "bg-lesson-green",
  "bg-lesson-purple",
];

export default function LessonStepsSection({ steps, stepsRef, bleed, pad }) {
  return (
    <section
      className={`${bleed} ${pad} relative mt-32 grid gap-16 border-y border-border-light bg-surface py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}
    >
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#f1dfcf_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* Left: heading */}
      <div className="relative z-10 lg:sticky lg:top-28 lg:self-start">
        <span className="mb-5 block h-1 w-12 rounded-full bg-primary" />

        <h3 className="font-display text-3xl font-bold leading-tight text-secondary md:text-4xl">
          How a lesson works
        </h3>

        <p className="mt-4 max-w-md text-lg leading-8 text-text-secondary">
          Every lesson follows the same four steps, so students always know what
          comes next.
        </p>
      </div>

      {/* Right: timeline */}
      <div ref={stepsRef} className="relative z-10 pl-12">
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="step-item relative">
              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute -left-7 top-[60px] h-[calc(100%+2rem-20px)] w-0.5 rounded-full bg-border"
                >
                  <div className="steps-line h-full origin-top rounded-full bg-primary" />
                </div>
              )}

              {/* Number badge */}
              <span className="absolute -left-12 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary-dark font-display text-base font-bold text-white shadow-md ring-4 ring-surface">
                {index + 1}
              </span>

              {/* Card */}
              <div
                className={`group rounded-2xl border border-border-light p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md md:p-7 ${
                  CARD_TINTS[index % CARD_TINTS.length]
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-dark">
                  Step {String(index + 1).padStart(2, "0")}
                </span>

                <h4 className="mt-2 font-display text-xl font-bold text-secondary">
                  {step.title}
                </h4>

                <p className="mt-2 max-w-xl leading-7 text-text-secondary">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
