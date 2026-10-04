import React from "react";
import { Users, ShieldCheck, UserRound, Activity } from "lucide-react";

export default function UserStats({ users = [], activeCount = 0 }) {
  const totalCount = users.length;
  const totalAdmins = users.filter((u) =>
    ["admin", "owner"].includes(u.role)
  ).length;
  const totalRegular = users.filter((u) => u.role === "user").length;

  const cards = [
    {
      title: "Total Users",
      value: totalCount,
      icon: Users,
      description: "Registered platform accounts",
      iconBox: "bg-surface-muted text-text-secondary",
    },
    {
      title: "Active Now",
      value: activeCount,
      icon: Activity,
      description: "Users with live sessions",
      iconBox: "bg-success-light text-success",
      badge: "live",
    },
    {
      title: "Administrators",
      value: totalAdmins,
      icon: ShieldCheck,
      description: "Admin & owner staff",
      iconBox: "bg-primary-light text-primary-dark",
    },
    {
      title: "Learners",
      value: totalRegular,
      icon: UserRound,
      description: "Standard learner accounts",
      iconBox: "bg-secondary-light text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-2xl border border-border bg-surface p-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                {card.title}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBox}`}
              >
                <Icon size={18} strokeWidth={2} />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                {card.value}
              </span>
              {card.badge && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Online
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-text-muted">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}
