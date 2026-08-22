import { Mail, GraduationCap, Users } from "lucide-react";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { useEffect, useState } from "react";

import Reveal from "../../components/ui/Reveal";
import EmptyState from "../../components/common/EmptyState";
import { getTeamMembers } from "../../api/team.api";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getTeamMembers();
        setTeamMembers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFAF5]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-orange-100 border-t-orange-500" />

          <p className="text-sm font-medium text-slate-500">
            Loading our team...
          </p>
        </div>
      </div>
    );
  }

  const faculty = teamMembers[0];
  const members = teamMembers.slice(1);

  /* ---------------------------------------------------------------------
     Social Links
  --------------------------------------------------------------------- */

  const SocialLinks = ({ member }) => {
    if (
      !member.linkedin &&
      !member.github &&
      !member.twitter &&
      !member.email
    ) {
      return null;
    }

    const links = [
      {
        href: member.linkedin,
        label: "LinkedIn",
        Icon: FaLinkedinIn,
      },
      {
        href: member.github,
        label: "GitHub",
        Icon: FaGithub,
      },
      {
        href: member.twitter,
        label: "X",
        Icon: FaXTwitter,
      },
      {
        href: member.email ? `mailto:${member.email}` : null,
        label: "Email",
        Icon: Mail,
      },
    ].filter((link) => link.href);

    return (
      <div className="flex flex-wrap items-center gap-2">
        {links.map(({ href, label, Icon }, i) => (
          <a
            key={label}
            href={href}
            target={label === "Email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={`${member.name} ${label}`}
            style={{
              transitionDelay: `${i * 30}ms`,
            }}
            className="social-link flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 hover:shadow-[0_6px_16px_-6px_rgba(234,88,12,0.45)] active:translate-y-0"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    );
  };

  /* ---------------------------------------------------------------------
     Member Image
  --------------------------------------------------------------------- */

  const MemberImage = ({ member, size = "large", orbit = false }) => {
    const imageSize =
      size === "large"
        ? "h-32 w-32 md:h-36 md:w-36"
        : "h-28 w-28 md:h-32 md:w-32";

    return (
      <div className={`relative ${imageSize}`}>
        {orbit && (
          <>
            <span className="orbit-ring pointer-events-none absolute -inset-4 rounded-full border border-dashed border-orange-200 md:-inset-5" />

            <span className="orbit-dot pointer-events-none absolute -inset-4 rounded-full md:-inset-5" />
          </>
        )}

        <div className="image-frame relative h-full w-full rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 p-[3px] transition-transform duration-500 ease-out">
          <img
            src={
              member.photo?.url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                member.name,
              )}&background=f97316&color=ffffff&size=256`
            }
            alt={member.name}
            className="h-full w-full rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <style>{`
        /* ================================================================
           GENERAL ANIMATIONS
        ================================================================ */

        @keyframes spinSlow {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinSlowReverse {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes heroWord {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes chipIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes ctaFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(4px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes ctaHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.96);
            filter: blur(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes ctaLinePulse {
          0%,
          100% {
            transform: scaleX(0.4);
            opacity: 0.5;
          }

          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        /* ================================================================
           LOGO FLOAT
        ================================================================ */

        @keyframes logoFloat {
          0%,
          100% {
            transform:
              translate(-50%, -50%)
              translateZ(0)
              translateY(0);
          }

          50% {
            transform:
              translate(-50%, -50%)
              translateZ(0)
              translateY(-7px);
          }
        }

        /* ================================================================
           HERO
        ================================================================ */

        .hero-word {
          display: inline-block;
          opacity: 0;

          animation:
            heroWord 0.7s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .hero-chip {
          opacity: 0;

          animation:
            chipIn 0.6s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        /* ================================================================
           FACULTY ORBIT
        ================================================================ */

        .orbit-ring {
          animation: spinSlow 22s linear infinite;
        }

        .orbit-dot::before {
          content: "";

          position: absolute;
          top: -3px;
          left: 50%;

          width: 7px;
          height: 7px;

          margin-left: -3.5px;

          border-radius: 9999px;

          background: #EA580C;

          box-shadow:
            0 0 0 4px rgba(234, 88, 12, 0.14);
        }

        .orbit-dot {
          animation: spinSlowReverse 22s linear infinite;
        }

        /* ================================================================
           3D TEAM ORBIT
        ================================================================ */

        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes orbit3D {
          to {
            --angle: calc(var(--start-angle) + 360deg);
          }
        }

        .team-orbit-wrap {
          --orbit-w: clamp(300px, 96vw, 1320px);
          --orbit-h: clamp(150px, 20vw, 220px);

          --orbit-rx: calc(var(--orbit-w) * 0.36);
          --orbit-ry: calc(var(--orbit-h) * 0.36);

          --orbit-visible-ry: calc(var(--orbit-ry) * 0.53);

          --orbit-depth: clamp(35px, 6vw, 75px);

          --orbit-avatar: clamp(2.75rem, 5vw, 3.75rem);

          position: relative;

          width: var(--orbit-w);
          height: var(--orbit-h);

          max-width: 100%;

          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* ---------------------------------------------------------------
           ORBIT LINE
        --------------------------------------------------------------- */

        .team-orbit-line {
          position: absolute;

          left: 50%;
          top: 50%;

          width: calc(var(--orbit-rx) * 2);
          height: calc(var(--orbit-ry) * 2);

          border: 1px solid rgba(234, 88, 12, 0.25);

          border-radius: 50%;

          transform:
            translate(-50%, -50%)
            rotateX(58deg);

          transform-style: preserve-3d;

          box-shadow:
            0 0 0 1px rgba(255, 122, 48, 0.04),
            0 0 20px rgba(234, 88, 12, 0.1),
            inset 0 0 20px rgba(234, 88, 12, 0.06);

          pointer-events: none;

          z-index: 1;
        }

        .team-orbit-line::before {
          content: "";

          position: absolute;

          inset: 6px;

          border: 1px dashed rgba(234, 88, 12, 0.12);

          border-radius: 50%;
        }

        /* ---------------------------------------------------------------
           TEAM AVATARS — TRUE 3D DEPTH
        --------------------------------------------------------------- */

        .team-orbit-item {
          --angle: var(--start-angle);

          position: absolute;

          left: 50%;
          top: 50%;

          width: var(--orbit-avatar);
          height: var(--orbit-avatar);

          transform:
            translate(-50%, -50%)
            translate3d(
              calc(cos(var(--angle)) * var(--orbit-rx)),
              calc(sin(var(--angle)) * var(--orbit-visible-ry)),
              calc(sin(var(--angle)) * var(--orbit-depth))
            );

          /*
            Slower, more cinematic orbit.
          */
          animation: orbit3D 70s linear infinite;

          transform-style: preserve-3d;

          will-change: transform;
        }

        .team-orbit-item::before {
          content: "";

          position: absolute;

          inset: -3px;

          border-radius: 9999px;

          background: white;

          z-index: -1;
        }

        /* ---------------------------------------------------------------
           AVATAR IMAGE
        --------------------------------------------------------------- */

        .team-orbit-item img {
          position: relative;

          display: block;

          width: 100%;
          height: 100%;

          border-radius: 9999px;

          object-fit: cover;

          border: 2px solid white;

          background: white;

          filter: grayscale(20%);

          box-shadow:
            0 5px 15px -5px rgba(234, 88, 12, 0.32);

          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.35s ease,
            box-shadow 0.35s ease;
        }

        .team-orbit-item:hover {
          z-index: 20;
        }

        .team-orbit-item:hover img {
          transform: scale(1.2);

          filter: grayscale(0%);

          box-shadow:
            0 12px 28px -8px rgba(234, 88, 12, 0.55),
            0 0 0 4px rgba(255, 255, 255, 0.9);
        }

        /* ================================================================
           CENTER LOGO
        ================================================================ */

        .team-orbit-center {
          position: absolute;

          left: 50%;
          top: calc(50% - 18px);

          width: clamp(3rem, 7vw, 4.5rem);
          height: clamp(3rem, 7vw, 4.5rem);

          padding: 0.65rem;

          background: rgba(255, 255, 255, 0.96);

          border: 1px solid rgba(234, 88, 12, 0.2);

          border-radius: 9999px;

          backdrop-filter: blur(8px);

          box-shadow:
            0 10px 30px -15px rgba(234, 88, 12, 0.4);

          /*
            Slower floating animation.
          */
          animation:
            logoFloat 5.5s ease-in-out infinite;

          transform-style: preserve-3d;

          will-change: transform;

          z-index: 10;
        }

        .team-orbit-center img {
          width: 100%;
          height: 100%;

          object-fit: contain;
        }

        /* ================================================================
           TEAM CARDS
        ================================================================ */

        .image-frame img {
          filter: grayscale(20%);

          transition: filter 0.4s ease;
        }

        .faculty-card:hover .image-frame img,
        .member-card:hover .image-frame img {
          filter: grayscale(0%);
        }

        .faculty-card:hover .image-frame {
          transform: scale(1.04);
        }

        .member-card {
          transform: translateY(0) scale(1);

          border-color: #F4E3D5;

          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.45s ease;

          will-change: transform, box-shadow;
        }

        .member-card:hover {
          transform: translateY(-8px) scale(1.015);

          border-color: #F8C9A8;

          box-shadow:
            0 24px 50px -28px
            rgba(234, 88, 12, 0.38);
        }

        .member-card .image-frame {
          transform: scale(1) rotate(0deg);

          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

          will-change: transform;
        }

        .member-card:hover .image-frame {
          transform: scale(1.06) rotate(-1deg);
        }

        /* ================================================================
           CTA
        ================================================================ */

        .cta-wrap {
          width: 100vw;
          max-width: 100vw;

          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
        }

        .cta-eyebrow {
          opacity: 0;

          animation:
            ctaFadeUp 0.7s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;

          animation-delay: 80ms;
        }

        .cta-heading {
          opacity: 0;

          animation:
            ctaHeadingReveal 0.9s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;

          animation-delay: 200ms;
        }

        .cta-desc {
          opacity: 0;

          animation:
            ctaFadeUp 0.75s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;

          animation-delay: 300ms;
        }

        .cta-rule {
          transform-origin: center;

          animation:
            ctaLinePulse 3.6s ease-in-out infinite;

          animation-delay: 900ms;
        }

        /* ================================================================
           REDUCED MOTION
        ================================================================ */

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring,
          .orbit-dot,
          .team-orbit-item,
          .team-orbit-center,
          .hero-word,
          .hero-chip,
          .member-card,
          .member-card .image-frame,
          .cta-eyebrow,
          .cta-heading,
          .cta-desc,
          .cta-rule {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* ================================================================
          HERO
      ================================================================ */}

      <Reveal>
        <section className="relative bg-white px-6 pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="relative mx-auto max-w-4xl text-center">
            <span
              className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                background: "#FFEEE0",
                color: "#C2410C",
              }}
            >
              <Users size={13} />
              Our Team
            </span>

            <h1
              className="mt-5 text-3xl font-semibold leading-tight md:text-[2.75rem]"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              {"Meet the People Behind".split(" ").map((word, i) => (
                <span
                  key={i}
                  className="hero-word"
                  style={{
                    animationDelay: `${120 + i * 60}ms`,
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}

              <span
                className="hero-word"
                style={{
                  animationDelay: "480ms",
                  background: "linear-gradient(90deg, #FF7A30, #EA580C)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Project Jhep
              </span>
            </h1>

            <p
              className="hero-chip mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base"
              style={{
                color: "#5B6472",
                fontFamily: "'Inter', sans-serif",
                animationDelay: "560ms",
              }}
            >
              A passionate team working together to make English learning
              simple, accessible, and meaningful for students.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ================================================================
          TEAM
      ================================================================ */}

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          {teamMembers.length === 0 ? (
            <EmptyState message="No team members found." />
          ) : (
            <>
              {/* FACULTY */}

              {faculty && (
                <Reveal>
                  <div className="mb-16">
                    <div className="mb-7 text-center">
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.16em]"
                        style={{
                          color: "#C2410C",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Guiding Faculty
                      </span>

                      <h2
                        className="mt-2 text-2xl font-semibold md:text-3xl"
                        style={{
                          color: "#17213B",
                          fontFamily: "'Fraunces', serif",
                        }}
                      >
                        Mentoring the Journey
                      </h2>
                    </div>

                    <div
                      className="faculty-card mx-auto max-w-4xl overflow-hidden rounded-[2rem] border bg-white transition-shadow duration-500 hover:shadow-[0_28px_60px_-30px_rgba(234,88,12,0.4)]"
                      style={{
                        borderColor: "#FBDBBE",
                      }}
                    >
                      <div className="grid items-center md:grid-cols-[auto_1fr]">
                        <div className="flex justify-center px-8 py-10 md:px-12">
                          <MemberImage member={faculty} size="large" orbit />
                        </div>

                        <div className="px-8 pb-10 text-center md:px-10 md:py-10 md:text-left">
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5">
                            <GraduationCap
                              size={15}
                              className="text-orange-600"
                            />

                            <span className="text-xs font-semibold text-orange-600">
                              Guiding Faculty
                            </span>
                          </div>

                          <h3
                            className="text-2xl font-semibold md:text-3xl"
                            style={{
                              color: "#17213B",
                              fontFamily: "'Fraunces', serif",
                            }}
                          >
                            {faculty.name}
                          </h3>

                          {faculty.description && (
                            <p
                              className="mt-4 max-w-2xl text-sm leading-6"
                              style={{
                                color: "#687386",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {faculty.description}
                            </p>
                          )}

                          <div className="mt-6 flex justify-center md:justify-start">
                            <SocialLinks member={faculty} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* MEMBERS */}

              {members.length > 0 && (
                <div>
                  <Reveal>
                    <div className="mb-8 text-center">
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.16em]"
                        style={{
                          color: "#C2410C",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        The Team
                      </span>

                      <h2
                        className="mt-2 text-2xl font-semibold md:text-3xl"
                        style={{
                          color: "#17213B",
                          fontFamily: "'Fraunces', serif",
                        }}
                      >
                        The People Making It Happen
                      </h2>
                    </div>
                  </Reveal>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {members.map((member, i) => (
                      <Reveal key={member._id} delay={i * 90}>
                        <article className="member-card group flex h-full flex-col rounded-2xl border bg-white p-6 text-center">
                          <div className="flex justify-center">
                            <MemberImage member={member} size="small" />
                          </div>

                          <h3
                            className="mt-5 text-lg font-semibold transition-colors duration-200 group-hover:text-orange-600"
                            style={{
                              color: "#17213B",
                              fontFamily: "'Fraunces', serif",
                            }}
                          >
                            {member.name}
                          </h3>

                          {member.role && (
                            <p
                              className="mt-1 text-xs font-semibold uppercase tracking-wide"
                              style={{
                                color: "#EA580C",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {member.role}
                            </p>
                          )}

                          {member.description && (
                            <p
                              className="mt-3 flex-grow text-sm leading-6"
                              style={{
                                color: "#7A8494",
                                fontFamily: "'Inter', sans-serif",
                              }}
                            >
                              {member.description}
                            </p>
                          )}

                          <div className="mt-5 flex justify-center">
                            <SocialLinks member={member} />
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}

      <Reveal>
        <section className="cta-wrap relative overflow-hidden border-t border-orange-100 bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28">
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            {/* 3D TEAM ORBIT */}

            <div className="team-orbit-wrap relative mb-8 flex items-center justify-center sm:mb-10 md:mb-12">
              {/* Orbit line */}

              <span className="team-orbit-line" />

              {/* Soft center atmosphere */}

              <span className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/30 blur-2xl" />

              {/* Team members */}

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

              {/* Project Jhep Logo */}

              <div className="team-orbit-center flex items-center justify-center">
                <img
                  src="/logo.svg"
                  alt="Project Jhep"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Eyebrow */}

            <span
              className="cta-eyebrow inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] sm:px-4 sm:text-xs"
              style={{
                background: "#FFEEE0",
                color: "#C2410C",
              }}
            >
              One team, one mission
            </span>

            {/* Heading */}

            <h2
              className="cta-heading mt-5 max-w-4xl px-2 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-[2.75rem]"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              Every lesson, every detail,
              <br className="hidden sm:block" />
              shaped by people who care.
            </h2>

            {/* Accent Rule */}

            <span
              className="cta-rule mt-4 block h-[3px] w-12 rounded-full sm:mt-5 sm:w-16 md:w-20"
              style={{
                background: "linear-gradient(90deg, #FF7A30, #EA580C)",
              }}
            />

            {/* Description */}

            <p
              className="cta-desc mx-auto mt-6 max-w-2xl px-2 text-sm leading-7 sm:text-base md:text-lg"
              style={{
                color: "#7A8494",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Many people. Many strengths. One shared purpose — that’s the
              spirit behind Project Jhep.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Team;
