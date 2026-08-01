import {
  User,
  Database,
  Lock,
  BookOpen,
  Mail,
  ShieldCheck,
} from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: User,
      title: "1. Information We Collect",
      content:
        "We may collect basic information such as name, email address, profile details, and learning progress information when you create an account or use our platform.",
    },
    {
      icon: Database,
      title: "2. How We Use Information",
      content:
        "The information collected is used to provide better learning experiences, manage accounts, track progress, improve our platform, and communicate important updates.",
    },
    {
      icon: BookOpen,
      title: "3. Educational Data",
      content:
        "Learning activities, quiz results, and progress data may be stored to help students and educators understand learning improvement.",
    },
    {
      icon: Lock,
      title: "4. Data Security",
      content:
        "We take reasonable security measures to protect user information from unauthorized access, misuse, or disclosure.",
    },
    {
      icon: ShieldCheck,
      title: "5. Information Sharing",
      content:
        "We do not sell or misuse personal information. User data is only shared when required for providing platform services or when legally required.",
    },
    {
      icon: Mail,
      title: "6. Contact Us",
      content:
        "If you have questions about this Privacy Policy or how your information is handled, please contact our support team.",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your privacy matters to us. This policy explains how Project Jhep
            collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-orange-100
              shadow-sm
              p-6
              md:p-10
            "
          >
            <p className="text-gray-600 leading-relaxed mb-8">
              Project Jhep is committed to protecting the privacy of students,
              teachers, volunteers, and users who access our educational
              platform. This Privacy Policy describes our practices regarding
              user information.
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
                      <Icon className="w-5 h-5 text-white" />
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

            <div className="mt-10 pt-6 border-t border-orange-100">
              <p className="text-sm text-gray-500">Last Updated: August 2026</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
