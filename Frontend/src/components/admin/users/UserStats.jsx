import { Users, ShieldCheck, UserRound } from "lucide-react";

export default function UserStats({ users }) {
  const totalAdmins = users.filter((user) =>
    ["admin", "owner"].includes(user.role),
  ).length;

  const totalUsers = users.filter((user) => user.role === "user").length;

  const cards = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      description: "Total registered accounts",
      iconStyle: "bg-orange-100 text-orange-600",
    },
    {
      title: "Administrators",
      value: totalAdmins,
      icon: ShieldCheck,
      description: "Users with admin access",
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      title: "Regular Users",
      value: totalUsers,
      icon: UserRound,
      description: "Standard user accounts",
      iconStyle: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-100
              bg-white
              p-6
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {card.description}
                </p>
              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${card.iconStyle}
                `}
              >
                <Icon size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
