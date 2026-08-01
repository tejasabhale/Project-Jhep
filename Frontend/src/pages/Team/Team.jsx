import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Mail } from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const Team = () => {
  const teamMembers = [
    {
      name: "Member Name 1",
      role: "Founder",
      image: "/team/member1.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member1@example.com",
    },
    {
      name: "Member Name 2",
      role: "Frontend Developer",
      image: "/team/member2.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member2@example.com",
    },
    {
      name: "Member Name 3",
      role: "Backend Developer",
      image: "/team/member3.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member3@example.com",
    },
    {
      name: "Member Name 4",
      role: "UI/UX Designer",
      image: "/team/member4.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member4@example.com",
    },
    {
      name: "Member Name 5",
      role: "Content Creator",
      image: "/team/member5.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member5@example.com",
    },
    {
      name: "Member Name 6",
      role: "Education Coordinator",
      image: "/team/member6.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member6@example.com",
    },
    {
      name: "Member Name 7",
      role: "Marketing",
      image: "/team/member7.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member7@example.com",
    },
    {
      name: "Member Name 8",
      role: "Volunteer",
      image: "/team/member8.jpg",
      linkedin: "#",
      github: "#",
      twitter: "#",
      email: "member8@example.com",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}

      <Reveal>
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-orange-600 font-semibold mb-3">Our Team</p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Meet The People Behind
              <span className="text-orange-600"> Project Jhep</span>
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
          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-4
              gap-8
            "
          >
            {teamMembers.map((member, index) => (
              <Reveal key={index}>
                <div
                  className="
                    group
                    h-full
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
                        src={member.image}
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

                  <p className="mt-2 text-sm font-medium text-orange-600">
                    {member.role}
                  </p>

                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    Helping build a better learning experience through
                    creativity and teamwork.
                  </p>

                  {/* Social Links */}

                  <div className="flex justify-center gap-3 mt-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
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

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
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

                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
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

                    <a
                      href={`mailto:${member.email}`}
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
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
