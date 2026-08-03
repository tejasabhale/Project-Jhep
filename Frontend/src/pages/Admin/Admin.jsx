import { Link } from "react-router-dom";

import {
  BookOpen,
  Plus,
  List,
  FileText,
  ClipboardList,
  Users,
  Activity,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminStats } from "../../api/admin.api";

export default function Admin() {
  const [stats, setStats] = useState({
    users: 0,

    topics: 0,

    lessons: 0,

    quizzes: 0,

    activeUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminStats();
        setStats(response.data);
      } catch (error) {
        console.log("Stats Error:", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Users",
      value: stats.users,
      icon: Users,
    },

    {
      title: "Topics",
      value: stats.topics,
      icon: BookOpen,
    },

    {
      title: "Lessons",
      value: stats.lessons,
      icon: FileText,
    },

    {
      title: "Quizzes",
      value: stats.quizzes,
      icon: ClipboardList,
    },

    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: Activity,
    },
  ];

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

      icon: FileText,
    },

    {
      title: "Lesson Content",

      description: "Manage PPT, PDF, videos and activities inside lessons.",

      links: [
        {
          name: "Manage Lesson Content",
          path: "/admin/lessons/content",
          icon: FileText,
        },
      ],

      icon: FileText,
    },

    {
      title: "Quizzes",

      description: "Create and manage quizzes for lessons.",

      links: [
        {
          name: "Add Quiz",
          path: "/admin/quizzes/add",
          icon: Plus,
        },

        {
          name: "Manage Quizzes",
          path: "/admin/quizzes/manage",
          icon: List,
        },
      ],

      icon: ClipboardList,
    },

    {
      title: "User Activity",

      description: "Track login, logout and active members.",

      links: [
        {
          name: "View Activity",
          path: "/admin/activity",
          icon: Activity,
        },
      ],

      icon: Users,
    },

    {
      title: "Team Members",

      description: "Manage team member profiles and social links.",

      links: [
        {
          name: "Add Member",
          path: "/admin/team/add",
          icon: Plus,
        },

        {
          name: "Manage Members",
          path: "/admin/team/manage",
          icon: List,
        },
      ],

      icon: UserRound,
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

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
            Manage Sproug Hub Foundation learning platform.
          </p>
        </div>

        {/* Statistics */}

        <div
          className="
          mb-8
          grid
          gap-5
          sm:grid-cols-2
          lg:grid-cols-5
          "
        >
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                rounded-2xl
                bg-white
                border
                border-orange-100
                p-5
                shadow-sm
                "
              >
                <div
                  className="
                  flex
                  items-center
                  gap-4
                  "
                >
                  <div
                    className="
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

                  <div>
                    <p
                      className="
                      text-sm
                      text-slate-500
                      "
                    >
                      {stat.title}
                    </p>

                    <h2
                      className="
                      text-2xl
                      font-bold
                      text-slate-800
                      "
                    >
                      {stat.value}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Management Cards */}

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
                        transition
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
