import {
  BookOpen,
  Users,
  HeartHandshake,
  Target,
  Lightbulb,
} from "lucide-react";

import Reveal from "../../components/ui/Reveal";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make quality education accessible for every learner through innovative learning experiences, with a special focus on underserved communities.",
    },
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description:
        "We create engaging lessons, activities, stories, quizzes, and digital learning resources that inspire curiosity and lifelong learning.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Teachers, volunteers, creators, and partners collaborate to build meaningful educational experiences for students.",
    },
    {
      icon: HeartHandshake,
      title: "Social Impact",
      description:
        "We believe education can transform lives by reducing barriers and creating better opportunities for future generations.",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Foundation Banner */}
      <Reveal>
        <section className="bg-orange-100 border-b border-orange-200 py-4">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <HeartHandshake className="w-5 h-5 text-orange-600" />

            <p className="text-gray-700">
              <span className="font-semibold text-orange-700">
                Empowering Communities Through Education, Innovation &
                Opportunity
              </span>
            </p>
          </div>
        </section>
      </Reveal>

      {/* Hero Section */}
      <Reveal>
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-orange-600 font-semibold uppercase tracking-widest mb-3">
                ABOUT US
              </p>

              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                <span className="text-orange-600">Sproug Hub</span>
                <br />
                Foundation
              </h1>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                <span className="font-semibold text-orange-700">
                  Sproug Hub Foundation
                </span>{" "}
                is a non-profit organization committed to creating equal
                opportunities through education, innovation, and technology. We
                strive to empower children and communities by making quality
                learning accessible, engaging, and impactful.
              </p>

              <p className="mt-4 text-gray-600 leading-relaxed">
                One of our flagship initiatives,
                <span className="font-semibold text-gray-900">
                  {" "}
                  Project Jhep
                </span>
                , focuses on helping students improve their English
                communication skills through interactive lessons, conversations,
                stories, activities, quizzes, and practical learning
                experiences—especially for children from rural and underserved
                communities.
              </p>
            </div>

            {/* Logo */}
            <img
              src="https://res.cloudinary.com/jwamgvca/image/upload/v1785740728/LOGO.jpg_1_io5dvd.jpg"
              alt="Sproug Hub Foundation Logo"
              className="w-96 h-96 object-contain"
            />
          </div>
        </section>
      </Reveal>

      {/* Vision */}
      <Reveal>
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <Lightbulb className="mx-auto text-orange-600 w-12 h-12 mb-4" />

            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>

            <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We envision a future where every learner, regardless of their
              background or location, has access to quality education and the
              opportunity to achieve their full potential. Through innovation,
              collaboration, and community-driven initiatives, we aim to create
              lasting social impact.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Values */}
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
                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 hover:shadow-md transition h-full">
                      <div className="bg-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
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
            <div className="bg-orange-600 rounded-3xl p-10 text-center text-white">
              <h2 className="text-3xl font-bold">
                Join Us in Creating a Better Future
              </h2>

              <p className="mt-4 text-orange-100 max-w-2xl mx-auto">
                Together, we can empower children, strengthen communities, and
                create meaningful learning opportunities through education and
                innovation.
              </p>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default About;
