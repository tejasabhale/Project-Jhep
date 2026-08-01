import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Mail } from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const Team = () => {
  const teamMembers = [
    {
      name: "Yashraj Bhogade",
      role: "Project Lead",
      description:
        "Leads the development of creative educational content, activities, and resources designed for effective student learning.",
      image:
        "https://res.cloudinary.com/jwamgvca/image/upload/v1785581805/Yashraj_img_gaqt5o.jpg",
      linkedin: "https://www.linkedin.com/in/yashraj-bhogade-95231b385/",
      github: "https://github.com/itsthemaverick",
    },
    {
      name: "Tejas Abhale",
      role: "Full Stack Developer",
      description:
        "Full Stack Developer responsible for designing, developing, and maintaining Project Jhep's frontend, backend, database, and deployment infrastructure.",
      image:
        "https://res.cloudinary.com/jwamgvca/image/upload/v1785572296/Tejas_img_knfr8f.jpg",
      linkedin: "https://www.linkedin.com/in/tejas-abhale-50743128a/",
      github: "https://github.com/tejasabhale",
      twitter: "https://x.com/Tejas55451",
      email: "abhaletejas2767@gmail.com",
    },
    {
      name: "Dhanashree Zanwar",
      role: "Senior Associate",
      description:
        "I'm a second-year Artificial Intelligence and Data Science student at Dr. D. Y. Patil Institute of Technology. Passionate about AI and Data Science, I enjoy learning new technologies, improving my skills, and working on innovative projects.",
      image:
        "https://res.cloudinary.com/jwamgvca/image/upload/v1785572254/Dhanashree_img_ks0s4p.jpg",
      linkedin:
        "https://www.linkedin.com/in/dhanashree-zanwar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    },
    {
      name: "Aditya Kambli",
      role: "Website and Content Design",
      description:
        "Drives bilingual curriculum development and embeds interactive learning tools across the website to transform passive reading into active, hands-on practice.",
      image:
        "https://res.cloudinary.com/jwamgvca/image/upload/v1785578178/Aditya_img_kwzygr.jpg",
      linkedin:
        "https://www.linkedin.com/in/dhanashree-zanwar?utm_source=share_via&utm_content=profile&utm_medium=member_android",
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Reveal key={index}>
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
        </div>
      </section>
    </div>
  );
};

export default Team;
