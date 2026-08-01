import { UserCircle, ShieldCheck } from "lucide-react";

const ProfileCard = ({ user }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        border-orange-100
        p-6
        flex
        flex-col
        md:flex-row
        gap-6
        items-center
      "
    >
      <div>
        {user.avatar?.url ? (
          <img
            src={user.avatar.url}
            className="
              w-28
              h-28
              rounded-full
              object-cover
              border-4
              border-orange-200
            "
          />
        ) : (
          <UserCircle
            size={110}
            className="
              text-orange-300
            "
          />
        )}
      </div>

      <div className="space-y-2">
        <h1
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >
          {user.fullName}
        </h1>

        <p className="text-gray-500">@{user.userName}</p>

        <p className="text-gray-500">{user.email}</p>

        <div
          className="
            flex
            gap-3
            mt-3
          "
        >
          <span
            className="
              px-3
              py-1
              rounded-full
              bg-orange-100
              text-orange-600
              text-sm
            "
          >
            {user.role}
          </span>

          <span
            className="
              flex
              items-center
              gap-1
              px-3
              py-1
              rounded-full
              bg-green-100
              text-green-600
              text-sm
            "
          >
            <ShieldCheck size={15} />

            {user.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
