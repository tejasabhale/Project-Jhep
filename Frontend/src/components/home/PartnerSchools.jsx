import { useEffect, useState } from "react";
import { School, MapPin } from "lucide-react";
import Reveal from "../../components/ui/Reveal";
import { getAllSchools } from "../../api/school.api";

const ANIMATION_SECONDS = 32;

export default function PartneredSchoolsCarousel() {
  const [schools, setSchools] = useState([]);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await getAllSchools();

        setSchools(response?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Don't render anything while loading or when no schools exist
  if (loading || schools.length === 0) {
    return null;
  }

  const track = [...schools, ...schools];

  return (
    <section className="relative w-full overflow-hidden bg-[#FBF7EE] py-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Karla:wght@400;500;600;700&display=swap');

        .hep-display {
          font-family: 'Fraunces', serif;
        }

        .hep-body {
          font-family: 'Karla', sans-serif;
        }

        @keyframes hep-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .hep-marquee-track {
          animation: hep-marquee ${ANIMATION_SECONDS}s linear infinite;
        }

        .hep-marquee-track.is-paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .hep-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <Reveal>
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-8">
          <span
            className="hep-body inline-block text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#4F8B6E" }}
          >
            Where Project Jhep shows up
          </span>

          <h2
            className="hep-display mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: "#1B2A4C" }}
          >
            Partnered schools across rural India
          </h2>

          <p
            className="hep-body mx-auto mt-3 max-w-xl text-base"
            style={{ color: "#5B5240" }}
          >
            Every partner school gets the same lessons, quizzes, and mentor
            tools — no matter how small the classroom.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32"
            style={{
              background: "linear-gradient(90deg, #FBF7EE, transparent)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32"
            style={{
              background: "linear-gradient(270deg, #FBF7EE, transparent)",
            }}
          />

          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div
              className={`hep-marquee-track flex w-max gap-5 ${
                paused ? "is-paused" : ""
              }`}
            >
              {track.map((school, index) => (
                <div
                  key={`${school._id}-${index}`}
                  tabIndex={0}
                  className="
                    flex
                    w-72
                    flex-shrink-0
                    flex-col
                    gap-4
                    rounded-2xl
                    border
                    px-6
                    py-6
                    text-left
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-orange-400
                    focus-visible:ring-offset-2
                  "
                  style={{
                    background: "#FFFFFF",
                    borderColor: "#EDE3CE",
                    boxShadow: "0 14px 30px -22px rgba(27,42,76,0.35)",
                    outlineColor: "#F0A83A",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #F0A83A, #E8902C)",
                    }}
                  >
                    <School size={22} color="#FFFFFF" strokeWidth={2} />
                  </div>

                  <div>
                    <h3
                      className="hep-display text-lg font-semibold leading-snug"
                      style={{ color: "#1B2A4C" }}
                    >
                      {school.name}
                    </h3>

                    <div
                      className="hep-body mt-1 flex items-center gap-1.5 text-sm"
                      style={{ color: "#8A7F65" }}
                    >
                      <MapPin size={14} />
                      <span>{school.location}</span>
                    </div>
                  </div>

                  <div
                    className="hep-body mt-auto flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: "#E8902C" }}
                  >
                    <School size={14} />
                    <span>Project Jhep Learning Partner</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
