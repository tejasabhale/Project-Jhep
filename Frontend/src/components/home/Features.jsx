import {
  BookOpen,
  MessageCircle,
  Brain,
  Trophy,
  BarChart3,
  Users,
  FileText,
  Smartphone,
} from "lucide-react";
import Reveal from "../ui/Reveal";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Structured Lessons",
      description:
        "Learn English through well-organized lessons covering vocabulary, conversations, stories, and activities.",
    },
    {
      icon: MessageCircle,
      title: "Real Conversations",
      description:
        "Practice practical English conversations with simple explanations and translations to improve communication skills.",
    },
    {
      icon: Brain,
      title: "Interactive Activities",
      description:
        "Engage with quizzes, matching activities, and learning exercises designed to make learning enjoyable.",
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description:
        "Monitor learning improvement and encourage students to achieve their educational goals.",
    },
    {
      icon: Users,
      title: "Student Friendly Platform",
      description:
        "A simple and easy-to-use learning environment designed for students of different age groups.",
    },
    {
      icon: FileText,
      title: "Rich Learning Resources",
      description:
        "Access educational materials including presentations, documents, audio resources, and lesson content.",
    },
    {
      icon: BarChart3,
      title: "Learning Insights",
      description:
        "Help educators understand student performance and improve teaching strategies.",
    },
    {
      icon: Smartphone,
      title: "Accessible Anywhere",
      description:
        "Learn anytime and anywhere using a responsive platform available across devices.",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero */}

      <Reveal>
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-orange-600 font-semibold mb-3">
              Project Jhep Features
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Learning Made
              <span className="text-orange-600"> Simple & Effective</span>
            </h1>

            <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              Project Jhep provides a complete learning experience that helps
              students improve their English skills through interactive content,
              practice, and continuous learning.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Features */}

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal key={index}>
                  <div
                    className="
                      h-full
                      bg-white
                      rounded-2xl
                      p-6
                      border
                      border-orange-100
                      shadow-sm
                      hover:shadow-md
                      transition
                      flex
                      flex-col
                    "
                  >
                    <div
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-orange-600
                        flex
                        items-center
                        justify-center
                        mb-5
                        shrink-0
                      "
                    >
                      <Icon className="text-white w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        text-gray-600
                        leading-relaxed
                        flex-grow
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educator Section */}

      <Reveal>
        <section className="py-16 bg-orange-50">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="
                bg-white
                rounded-3xl
                border
                border-orange-100
                shadow-sm
                p-8
                md:p-12
                text-center
              "
            >
              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-2xl
                  bg-orange-600
                  flex
                  items-center
                  justify-center
                  mb-6
                "
              >
                <Users className="w-7 h-7 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                Empowering Teachers & Learners
              </h2>

              <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-relaxed">
                Project Jhep helps educators create and manage engaging English
                learning content while providing students with interactive
                lessons, activities, and resources for better learning outcomes.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div
                  className="
                    rounded-xl
                    bg-orange-50
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-orange-600
                  "
                >
                  Easy Content Management
                </div>

                <div
                  className="
                    rounded-xl
                    bg-orange-50
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-orange-600
                  "
                >
                  Interactive Learning
                </div>

                <div
                  className="
                    rounded-xl
                    bg-orange-50
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-orange-600
                  "
                >
                  Student Growth Tracking
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
};

export default Features;
