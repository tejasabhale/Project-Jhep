import { useEffect, useState } from "react";

import Reveal from "../../components/ui/Reveal";
import EmptyState from "../../components/common/EmptyState";
import { getTeamMembers } from "../../api/team.api";

import TeamHero from "../../components/team/TeamHero";
import FacultyCard from "../../components/team/FacultyCard";
import MemberCard from "../../components/team/MemberCard";
import TeamCTA from "../../components/team/TeamCTA";

export default function Team() {
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
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary-light border-t-primary" />

          <p className="font-sans text-sm font-medium text-text-secondary">
            Loading our team...
          </p>
        </div>
      </div>
    );
  }

  const faculty = teamMembers[0];
  const members = teamMembers.slice(1);

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-background">
      <TeamHero />

      <section className="w-full bg-background px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          {teamMembers.length === 0 ? (
            <EmptyState message="No team members found." />
          ) : (
            <>
              {faculty && <FacultyCard faculty={faculty} />}

              {members.length > 0 && (
                <div>
                  <Reveal>
                    <div className="mb-8 text-center">
                      <span className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark">
                        The Team
                      </span>

                      <h2 className="mt-2 font-display text-2xl font-semibold text-secondary md:text-3xl">
                        The People Making It Happen
                      </h2>
                    </div>
                  </Reveal>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {members.map((member, i) => (
                      <MemberCard key={member._id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <TeamCTA teamMembers={teamMembers} />

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

          background: var(--primary);

          box-shadow:
            0 0 0 4px
            color-mix(in srgb, var(--primary) 14%, transparent);
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

        .team-orbit-line {
          position: absolute;

          left: 50%;
          top: 50%;

          width: calc(var(--orbit-rx) * 2);
          height: calc(var(--orbit-ry) * 2);

          border: 1px solid
            color-mix(in srgb, var(--primary) 25%, transparent);

          border-radius: 50%;

          transform:
            translate(-50%, -50%)
            rotateX(58deg);

          transform-style: preserve-3d;

          box-shadow:
            0 0 0 1px
            color-mix(in srgb, var(--accent) 4%, transparent),
            0 0 20px
            color-mix(in srgb, var(--primary) 10%, transparent),
            inset 0 0 20px
            color-mix(in srgb, var(--primary) 6%, transparent);

          pointer-events: none;

          z-index: 1;
        }

        .team-orbit-line::before {
          content: "";

          position: absolute;

          inset: 6px;

          border: 1px dashed
            color-mix(in srgb, var(--primary) 12%, transparent);

          border-radius: 50%;
        }

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

          animation: orbit3D 70s linear infinite;

          transform-style: preserve-3d;

          will-change: transform;
        }

        .team-orbit-item::before {
          content: "";

          position: absolute;

          inset: -3px;

          border-radius: 9999px;

          background: var(--surface);

          z-index: -1;
        }

        .team-orbit-item img {
          position: relative;

          display: block;

          width: 100%;
          height: 100%;

          border-radius: 9999px;

          object-fit: cover;

          border: 2px solid var(--surface);

          background: var(--surface);

          filter: grayscale(20%);

          box-shadow:
            0 5px 15px -5px
            color-mix(in srgb, var(--primary) 32%, transparent);

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
            0 12px 28px -8px
            color-mix(in srgb, var(--primary) 55%, transparent),
            0 0 0 4px
            color-mix(in srgb, var(--surface) 90%, transparent);
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

          background:
            color-mix(in srgb, var(--surface) 96%, transparent);

          border: 1px solid
            color-mix(in srgb, var(--primary) 20%, transparent);

          border-radius: 9999px;

          backdrop-filter: blur(8px);

          box-shadow: var(--shadow-md);

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

          border-color: var(--border-light);

          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.45s ease;

          will-change: transform, box-shadow;
        }

        .member-card:hover {
          transform: translateY(-8px) scale(1.015);

          border-color: var(--primary-light);

          box-shadow: var(--shadow-lg);
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
          width: 100%;
          max-width: 100%;

          margin-left: 0;
          margin-right: 0;
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
    </div>
  );
}
