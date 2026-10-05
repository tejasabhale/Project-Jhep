import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  School,
  MessageSquareQuote,
  Users,
  Activity,
  ExternalLink,
} from "lucide-react";

export const adminMenuSections = [
  {
    label: "Overview",
    roles: ["admin", "owner"],
    items: [
      {
        name: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
        end: true,
      },
    ],
  },
  {
    label: "Content",
    roles: ["admin", "owner", "content_creator"],
    items: [
      {
        name: "Topics",
        path: "/admin/topics/manage",
        icon: BookOpen,
      },
      {
        name: "Lessons",
        path: "/admin/lessons/manage",
        icon: FileText,
      },
      {
        name: "Quizzes",
        path: "/admin/quizzes/manage",
        icon: HelpCircle,
      },
    ],
  },
  {
    label: "Community",
    roles: ["admin", "owner"],
    items: [
      {
        name: "Schools",
        path: "/admin/schools/manage",
        icon: School,
      },
      {
        name: "Testimonials",
        path: "/admin/testimonials/manage",
        icon: MessageSquareQuote,
      },
      {
        name: "Team Members",
        path: "/admin/team/manage",
        icon: Users,
      },
    ],
  },
  {
    label: "People & Access",
    roles: ["admin", "owner"],
    items: [
      {
        name: "Manage Users",
        path: "/admin/users/manage",
        icon: Users,
      },
      {
        name: "User Activity",
        path: "/admin/activity",
        icon: Activity,
      },
    ],
  },
];

export const adminUtilityItems = [
  {
    name: "View Website",
    path: "/",
    icon: ExternalLink,
  },
];
