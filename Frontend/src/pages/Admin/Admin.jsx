import { Link } from "react-router-dom";

import { BookOpen, Plus, List, FileText } from "lucide-react";

export default function Admin() {
  const cards = [
    {
      title: "Topics",

      description: "Create and manage English learning topics.",

      links: [
        {
          name: "Add Topic",
          path: "/admin/topics/add",
          icon: Plus,
        },

        {
          name: "Manage Topics",
          path: "/admin/topics/manage",
          icon: List,
        },
      ],

      icon: BookOpen,
    },

    {
      title: "Lessons",

      description: "Create and manage lessons under topics.",

      links: [
        {
          name: "Add Lesson",
          path: "/admin/lessons/add",
          icon: Plus,
        },

        {
          name: "Manage Lessons",
          path: "/admin/lessons/manage",
          icon: List,
        },
      ],

      icon: BookOpen,
    },

    {
      title: "Lesson Content",

      description: "Manage PPT, PDF and video resources inside lessons.",

      links: [
        {
          name: "Manage Lessons Content",
          path: "/admin/lessons/manage",
          icon: FileText,
        },
      ],

      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1
            className="
          text-3xl
          font-bold
          text-slate-800
          "
          >
            Admin Dashboard
          </h1>

          <p
            className="
          mt-2
          text-slate-600
          "
          >
            Manage Project Jhep learning content.
          </p>
        </div>

        <div
          className="
        grid
        gap-6
        md:grid-cols-2
        lg:grid-cols-3
        "
        >
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                rounded-2xl
                border
                border-orange-100
                bg-white
                p-6
                shadow-sm
                "
              >
                <div
                  className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-orange-100
                text-orange-600
                "
                >
                  <Icon size={24} />
                </div>

                <h2
                  className="
                text-xl
                font-semibold
                text-slate-800
                "
                >
                  {card.title}
                </h2>

                <p
                  className="
                mt-2
                text-sm
                text-slate-600
                "
                >
                  {card.description}
                </p>

                <div
                  className="
                mt-6
                space-y-3
                "
                >
                  {card.links.map((link) => {
                    const LinkIcon = link.icon;

                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          bg-orange-50
                          px-4
                          py-3
                          text-orange-600
                          hover:bg-orange-100
                          "
                      >
                        <LinkIcon size={18} />

                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
