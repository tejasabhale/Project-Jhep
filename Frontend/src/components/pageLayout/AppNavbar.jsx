import { useEffect, useRef, useState } from "react";
import { UserCircle, User, LogOut, ArrowLeft, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const AppNavbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const dashboardPath = user?.role === "admin" ? "/admin" : "/topics";

  const profilePath = user?.role === "admin" ? "/admin/profile" : "/profile";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const goForward = () => {
    window.history.forward();
  };

  return (
    <nav
      className="
      w-full
      border-b
      border-orange-100
      bg-white
      "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <button
          onClick={() => navigate(dashboardPath)}
          className="
          flex
          items-center
          gap-3
          "
        >
          <img
            src="https://res.cloudinary.com/jwamgvca/image/upload/v1785234935/Project-Jhep-Logo_nsnlyc.png"
            alt="Project Jhep Logo"
            className="
            w-13
            h-13
            object-contain
            "
          />

          <div className="text-left">
            <h1
              className="
              text-xl
              font-extrabold
              text-slate-800
              "
            >
              Project
              <span className="text-orange-600"> Jhep</span>
            </h1>

            <p
              className="
              text-xs
              text-orange-600
              font-medium
              "
            >
              {user?.role === "admin" ? "Admin Panel" : "Learn English"}
            </p>
          </div>
        </button>

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          {/* Browser Navigation */}

          <div
            className="
            hidden
            md:flex
            items-center
            gap-2
            "
          >
            <button
              onClick={goBack}
              className="
              rounded-xl
              border
              border-orange-200
              p-2
              text-orange-600
              hover:bg-orange-50
              "
              title="Go Back"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={goForward}
              className="
              rounded-xl
              border
              border-orange-200
              p-2
              text-orange-600
              hover:bg-orange-50
              "
              title="Go Forward"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Profile Dropdown */}

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-200
              bg-white
              px-3
              py-2
              hover:bg-orange-50
              transition
              "
            >
              <UserCircle
                className="
                h-8
                w-8
                text-orange-500
                "
              />

              <span
                className="
                hidden
                sm:block
                text-sm
                font-semibold
                text-slate-700
                "
              >
                {user?.fullName || "Profile"}
              </span>
            </button>

            {profileOpen && (
              <div
                className="
                absolute
                right-0
                mt-2
                w-48
                rounded-xl
                border
                border-orange-100
                bg-white
                shadow-xl
                z-50
                overflow-hidden
                "
              >
                <button
                  onClick={() => {
                    navigate(profilePath);
                    setProfileOpen(false);
                  }}
                  className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  hover:bg-orange-50
                  "
                >
                  <User
                    className="
                    w-4
                    h-4
                    text-orange-500
                    "
                  />
                  Profile
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    handleLogout();
                  }}
                  className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-red-600
                  hover:bg-red-50
                  "
                >
                  <LogOut
                    className="
                    w-4
                    h-4
                    "
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
