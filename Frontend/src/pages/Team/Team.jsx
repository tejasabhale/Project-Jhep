import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Mail, GraduationCap, Users } from "lucide-react";
import { useEffect, useState } from "react";

import Reveal from "../../components/ui/Reveal";
import { getTeamMembers } from "../../api/team.api";
import EmptyState from "../../components/common/EmptyState";

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

  const SocialLinks = ({ member }) => {
    if (
      !member.linkedin &&
      !member.github &&
      !member.twitter &&
      !member.email
    ) {
      return null;
    }

    return (
      <div className="flex flex-wrap items-center gap-2">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <FaLinkedin size={15} />
          </a>
        )}

        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <FaGithub size={15} />
          </a>
        )}

        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} X`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <FaTwitter size={15} />
          </a>
        )}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`${member.name} Email`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <Mail size={16} />
          </a>
        )}
      </div>
    );
  };

  const MemberImage = ({ member, size = "large" }) => {
    const imageSize =
      size === "large" ? "h-32 w-32 md:h-36 md:w-36" : "h-24 w-24";

    return (
      <div
        className={`rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 p-[3px] ${imageSize}`}
      >
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
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5]">
      <Reveal>
        <section className="bg-white px-6 pb-16 pt-16 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
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
              Meet the People Behind{" "}
              <span
                style={{
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
              className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base"
              style={{
                color: "#5B6472",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              A passionate team working together to make English learning
              simple, accessible, and meaningful for students.
            </p>
          </div>
        </section>
      </Reveal>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          {teamMembers.length === 0 ? (
            <EmptyState message="No team members found." />
          ) : (
            <>
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
                      className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border bg-white"
                      style={{
                        borderColor: "#FBDBBE",
                      }}
                    >
                      <div className="grid items-center md:grid-cols-[auto_1fr]">
                        <div className="flex justify-center px-8 py-10 md:px-12">
                          <MemberImage member={faculty} size="large" />
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

                          <p
                            className="mt-1 text-sm font-medium text-orange-600"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {faculty.role}
                          </p>

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
                    {members.map((member) => (
                      <Reveal key={member._id}>
                        <article
                          className="group flex h-full flex-col rounded-2xl border bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1"
                          style={{
                            borderColor: "#F4E3D5",
                          }}
                        >
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

                          <p
                            className="mt-1 text-xs font-semibold uppercase tracking-wide"
                            style={{
                              color: "#EA580C",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {member.role}
                          </p>

                          <p
                            className="mt-3 flex-grow text-sm leading-6"
                            style={{
                              color: "#7A8494",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {member.description}
                          </p>

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

      <Reveal>
        <section className="border-t border-orange-100 bg-white px-6 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <div
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: "#FFEEE0",
              }}
            >
              <Users
                size={20}
                style={{
                  color: "#EA580C",
                }}
              />
            </div>

            <h2
              className="mt-5 text-2xl font-semibold"
              style={{
                color: "#17213B",
                fontFamily: "'Fraunces', serif",
              }}
            >
              Learning is better together.
            </h2>

            <p
              className="mt-3 text-sm leading-6"
              style={{
                color: "#7A8494",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Behind Project Jhep is a team committed to creating better
              learning opportunities for every student.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Team;
