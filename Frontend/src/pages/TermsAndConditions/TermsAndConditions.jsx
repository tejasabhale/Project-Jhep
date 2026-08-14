import {
  BookOpen,
  UserCheck,
  ShieldCheck,
  FileText,
  AlertCircle,
} from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "1. User Accounts",
      content:
        "Users are responsible for maintaining the confidentiality of their account information. You agree to provide accurate information while creating an account and using our platform.",
    },
    {
      icon: BookOpen,
      title: "2. Learning Content",
      content:
        "All educational materials, including lessons, activities, quizzes, and resources available on Project Jhep are created to support learning. Content should only be used for educational purposes.",
    },
    {
      icon: ShieldCheck,
      title: "3. Privacy & Security",
      content:
        "We respect user privacy and take reasonable steps to protect personal information. Users should avoid sharing their login credentials with others.",
    },
    {
      icon: FileText,
      title: "4. Content Ownership",
      content:
        "The design, educational resources, branding, and original content of Project Jhep belong to the organization. Unauthorized copying or redistribution is not allowed.",
    },
    {
      icon: AlertCircle,
      title: "5. Platform Usage",
      content:
        "Users must use the platform responsibly and should not attempt to harm, misuse, or interfere with website functionality.",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using Project Jhep. By
            accessing our platform, you agree to follow these terms.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 md:p-10">
            <p className="text-gray-600 leading-relaxed mb-8">
              Project Jhep is an educational platform designed to provide
              accessible English learning resources for students. These Terms &
              Conditions explain the rules and guidelines for using our website
              and services.
            </p>

            <div className="space-y-6">
              {sections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <div
                    key={index}
                    className="
                      flex
                      gap-5
                      p-5
                      rounded-2xl
                      bg-orange-50
                      border
                      border-orange-100
                    "
                  >
                    <div
                      className="
                      flex-shrink-0
                      w-11
                      h-11
                      rounded-xl
                      bg-orange-600
                      flex
                      items-center
                      justify-center
                    "
                    >
                      <Icon className="text-white w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {section.title}
                      </h3>

                      <p className="mt-2 text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Last Updated */}
            <div className="mt-10 pt-6 border-t border-orange-100">
              <p className="text-sm text-gray-500">Last Updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
