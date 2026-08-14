import { School, CheckCircle2, XCircle } from "lucide-react";

const SchoolStats = ({ schools = [] }) => {
  const totalSchools = schools.length;

  const activeSchools = schools.filter(
    (school) => school.isActive
  ).length;

  const inactiveSchools = totalSchools - activeSchools;

  const stats = [
    {
      title: "Total Schools",
      value: totalSchools,
      icon: School,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Active Schools",
      value: activeSchools,
      icon: CheckCircle2,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Inactive Schools",
      value: inactiveSchools,
      icon: XCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-800">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon
                  size={22}
                  className={stat.iconColor}
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SchoolStats;