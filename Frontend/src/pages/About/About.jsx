import {
  BookOpen,
  Users,
  HeartHandshake,
  Target,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make quality English learning accessible for every student, especially children from rural and underserved communities.",
    },
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description:
        "We provide lessons, conversations, activities, quizzes, and engaging content to make learning simple and enjoyable.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Teachers, volunteers, and creators work together to build better learning experiences for students.",
    },
    {
      icon: HeartHandshake,
      title: "Social Impact",
      description:
        "We aim to reduce language barriers and create better opportunities through education.",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section */}

      <Reveal>
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-orange-600 font-semibold mb-3">
                About Project Jhep
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Making English Learning
                <span className="text-orange-600"> Simple & Accessible</span>
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Project Jhep is an educational initiative focused on helping
                students improve their English communication skills through
                simple explanations, activities, and practical learning methods.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Our goal is to support students who may not have access to
                quality learning resources and create a platform where every
                child can learn with confidence.
              </p>
            </div>

            <div className="bg-orange-100 rounded-3xl p-10 flex justify-center">
              <GraduationCap
                className="w-40 h-40 text-orange-600"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Vision Section */}

      <Reveal>
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Lightbulb className="mx-auto text-orange-600 w-12 h-12 mb-4" />

            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>

            <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe education should not depend on someone's location or
              background. Project Jhep aims to create a learning environment
              where students can improve their skills, build confidence, and
              prepare themselves for future opportunities.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Values Cards */}

      <Reveal>
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              What We Stand For
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal key={index}>
                    <div
                      className="
                        bg-orange-50
                        rounded-2xl
                        p-6
                        border
                        border-orange-100
                        hover:shadow-md
                        transition
                        h-full
                      "
                    >
                      <div
                        className="
                          bg-orange-600
                          w-12
                          h-12
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          mb-5
                        "
                      >
                        <Icon className="text-white w-6 h-6" />
                      </div>

                      <h3 className="font-semibold text-lg text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}

      <Reveal>
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="
                bg-orange-600
                rounded-3xl
                p-10
                text-center
                text-white
              "
            >
              <h2 className="text-3xl font-bold">
                Join Us in Building Better Learning Opportunities
              </h2>

              <p className="mt-4 text-orange-100 max-w-2xl mx-auto">
                Together, we can help students learn, grow, and communicate
                confidently.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default About;
