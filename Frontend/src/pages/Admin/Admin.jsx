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
  ArrowUpRight,
  MessageSquareQuote,
  School,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminStats();
        setStats(response.data);
      } catch (error) {
        console.log("Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Users", value: stats.users, icon: Users },
    { title: "Topics", value: stats.topics, icon: BookOpen },
    { title: "Lessons", value: stats.lessons, icon: FileText },
    { title: "Quizzes", value: stats.quizzes, icon: ClipboardList },
  ];

  const sections = [
    {
      label: "Content",
      items: [
        {
          title: "Topics",
          description: "Create and manage English learning topics.",
          icon: BookOpen,
          link: { name: "Manage Topics", path: "/admin/topics/manage" },
        },
      ],
    },
    {
      label: "Community",
      items: [
        {
          title: "Schools",
          description: "Manage schools and their status.",
          icon: School,
          link: { name: "Manage Schools", path: "/admin/schools/manage" },
        },
        {
          title: "Testimonials",
          description: "Manage testimonials and their status.",
          icon: MessageSquareQuote,
          link: {
            name: "Manage Testimonials",
            path: "/admin/testimonials/manage",
          },
        },
        {
          title: "Team Members",
          description: "Manage team member profiles and social links.",
          icon: UserRound,
          link: { name: "Manage Members", path: "/admin/team/manage" },
        },
      ],
    },
    {
      label: "People & Access",
      items: [
        {
          title: "Manage Users",
          description: "Manage user roles and permissions.",
          icon: UserRound,
          link: { name: "Manage Users", path: "/admin/users/add" },
        },
        {
          title: "User Activity",
          description: "Track login, logout and active members.",
          icon: Activity,
          link: { name: "View Activity", path: "/admin/activity" },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-1 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">
              Admin
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage Sproug Hub Foundation's learning platform.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <Icon size={16} strokeWidth={2.25} />
                  </div>
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  {loading ? (
                    <span className="inline-block h-8 w-14 animate-pulse rounded bg-slate-100 align-middle" />
                  ) : (
                    stat.value
                  )}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Active users - highlighted live metric */}
        <div className="mb-10 flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50/60 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500" />
            </span>
            <p className="text-sm font-medium text-slate-700">
              Active users right now
            </p>
          </div>
          <p className="text-xl font-semibold text-slate-900">
            {loading ? (
              <span className="inline-block h-6 w-10 animate-pulse rounded bg-orange-100 align-middle" />
            ) : (
              stats.activeUsers
            )}
          </p>
        </div>

        {/* Management sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {section.label}
                </h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.link.path}
                      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-orange-300 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition group-hover:bg-orange-50 group-hover:text-orange-600">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-slate-300 transition group-hover:text-orange-500"
                        />
                      </div>

                      <h4 className="mt-4 text-base font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-600">
                        <List size={14} />
                        {item.link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
