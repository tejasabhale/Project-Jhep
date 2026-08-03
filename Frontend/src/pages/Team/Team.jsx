import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Mail } from "lucide-react";

import Reveal from "../../components/ui/Reveal";
import { useEffect, useState } from "react";
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
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-lg text-slate-600">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <Reveal>
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-orange-600 font-semibold mb-3">Our Team</p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Meet The People Behind{" "}
              <span className="text-orange-600">Project Jhep</span>
            </h1>

            <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              A passionate team of developers, educators, and creators working
              together to make English learning accessible and meaningful for
              every student.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {teamMembers.length === 0 ? (
            <EmptyState message="No team members found." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Reveal key={member._id}>
                  <div
                    className="
                      group
                      h-full
                      flex
                      flex-col
                      bg-white
                      rounded-3xl
                      border
                      border-orange-100
                      p-6
                      text-center
                      shadow-sm
                      hover:shadow-xl
                      hover:-translate-y-2
                      transition-all
                      duration-300
                    "
                  >
                    {/* Image */}
                    <div className="flex justify-center">
                      <div
                        className="
                          rounded-full
                          p-1
                          bg-gradient-to-br
                          from-orange-400
                          to-orange-600
                        "
                      >
                        <img
                          src={
                            member.photo?.url ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name,
                            )}&background=f97316&color=ffffff&size=256`
                          }
                          alt={member.name}
                          className="
                            w-28
                            h-28
                            rounded-full
                            object-cover
                            border-4
                            border-white
                          "
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <h3
                      className="
                        mt-6
                        text-xl
                        font-bold
                        text-gray-900
                        group-hover:text-orange-600
                        transition
                      "
                    >
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p className="mt-2 text-sm font-medium text-orange-600">
                      {member.role}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed flex-grow">
                      {member.description}
                    </p>

                    {/* Social Links */}
                    {(member.linkedin ||
                      member.github ||
                      member.twitter ||
                      member.email) && (
                      <div className="flex justify-center gap-3 mt-auto pt-6 flex-wrap">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} LinkedIn`}
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-orange-50
                              flex
                              items-center
                              justify-center
                              text-gray-700
                              hover:bg-orange-600
                              hover:text-white
                              transition
                            "
                          >
                            <FaLinkedin size={18} />
                          </a>
                        )}

                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} GitHub`}
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-orange-50
                              flex
                              items-center
                              justify-center
                              text-gray-700
                              hover:bg-orange-600
                              hover:text-white
                              transition
                            "
                          >
                            <FaGithub size={18} />
                          </a>
                        )}

                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} X`}
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-orange-50
                              flex
                              items-center
                              justify-center
                              text-gray-700
                              hover:bg-orange-600
                              hover:text-white
                              transition
                            "
                          >
                            <FaTwitter size={18} />
                          </a>
                        )}

                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`${member.name} Email`}
                            className="
                              w-10
                              h-10
                              rounded-full
                              bg-orange-50
                              flex
                              items-center
                              justify-center
                              text-gray-700
                              hover:bg-orange-600
                              hover:text-white
                              transition
                            "
                          >
                            <Mail size={18} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;
