import Reveal from "../ui/Reveal";

export default function TeamCTA({ teamMembers }) {
  return (
    <Reveal>
      <section className="cta-wrap relative overflow-hidden border-t border-border-light bg-surface px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28">
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          {/* 3D TEAM ORBIT */}

          <div className="team-orbit-wrap relative mb-8 flex items-center justify-center sm:mb-10 md:mb-12">
            <span className="team-orbit-line" />

            <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light/30 blur-2xl" />

            {teamMembers.slice(0, 8).map((member, i, arr) => {
              const angleDeg = (360 * i) / arr.length - 90;

              return (
                <div
                  key={member._id}
                  className="team-orbit-item"
                  style={{
                    "--start-angle": `${angleDeg}deg`,
                  }}
                >
                  <img
                    src={
                      member.photo?.url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        member.name,
                      )}&background=f97316&color=ffffff&size=128`
                    }
                    alt={member.name}
                  />
                </div>
              );
            })}

            <div className="team-orbit-center flex items-center justify-center">
              <img
                src="/logo.svg"
                alt="Project Jhep"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Eyebrow */}

          <span className="cta-eyebrow inline-flex items-center gap-2 rounded-full bg-primary-light px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-dark sm:px-4 sm:text-xs">
            One team, one mission
          </span>

          {/* Heading */}

          <h2 className="cta-heading mt-5 max-w-4xl px-2 font-display text-2xl font-semibold leading-tight text-secondary sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            Every lesson, every detail,
            <br className="hidden sm:block" />
            shaped by people who care.
          </h2>

          {/* Accent Rule */}

          <span
            className="cta-rule mt-4 block h-[3px] w-12 rounded-full sm:mt-5 sm:w-16 md:w-20"
            style={{
              background: "var(--gradient-primary)",
            }}
          />

          {/* Description */}

          <p className="cta-desc mx-auto mt-6 max-w-2xl px-2 font-sans text-sm leading-7 text-text-secondary sm:text-base md:text-lg">
            Many people. Many strengths. One shared purpose — that’s the
            spirit behind Project Jhep.
          </p>
        </div>
      </section>
    </Reveal>
  );
}