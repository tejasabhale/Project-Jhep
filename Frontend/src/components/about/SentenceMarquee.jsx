const TINTS = [
  "bg-lesson-orange",
  "bg-surface",
  "bg-lesson-peach",
  "bg-lesson-yellow",
];

export default function SentenceMarquee({ sentences, marqueeRef, bleed }) {
  if (!sentences?.length) return null;

  return (
    <div
      ref={marqueeRef}
      className={`${bleed} mt-32 space-y-5 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]`}
    >
      {[0, 1].map((row) => (
        <div
          key={row}
          className="marquee-row flex w-max gap-5 pr-5"
          aria-hidden={row === 1 ? "true" : undefined}
        >
          {[...sentences, ...sentences].map((phrase, index) => {
            const isDuplicate = index >= sentences.length;
            const primary = row === 0 ? phrase.en : phrase.mr;
            const secondary = row === 0 ? phrase.mr : phrase.en;
            const primaryLang = row === 0 ? "en" : "mr";
            const secondaryLang = row === 0 ? "mr" : "en";

            return (
              <div
                key={`${row}-${index}`}
                aria-hidden={isDuplicate ? "true" : undefined}
                className={`group relative shrink-0 whitespace-nowrap rounded-2xl border border-border-light px-6 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md ${
                  TINTS[(index + row * 2) % TINTS.length]
                }`}
              >
                <span className="absolute left-0 top-4 h-6 w-1 rounded-r-full bg-primary" />

                <p
                  lang={primaryLang}
                  className="font-display text-lg font-bold text-secondary md:text-xl"
                >
                  {primary}
                </p>

                <p
                  lang={secondaryLang}
                  className="mt-1 text-sm font-medium text-primary-dark"
                >
                  {secondary}
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
