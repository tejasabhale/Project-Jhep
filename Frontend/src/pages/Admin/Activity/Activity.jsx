import { useEffect, useState } from "react";
import { getUserActivity } from "../../../api/admin.api";

export default function Activity() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await getUserActivity();
        setActivities(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">
          User Activity
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-orange-50">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Login Time</th>
                <th className="p-4">Logout Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id} className="border-b">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{activity.user?.name}</p>

                      <p className="text-sm text-gray-500">
                        {activity.user?.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    {new Date(activity.loginTime).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {activity.logoutTime
                      ? new Date(activity.logoutTime).toLocaleString()
                      : "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        activity.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
