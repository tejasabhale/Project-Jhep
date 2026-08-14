import { BookOpen, ClipboardList, X } from "lucide-react";
import { useEffect } from "react";

const tabs = [
  {
    id: "content",
    label: "Content",
    icon: BookOpen,
  },
  {
    id: "quiz",
    label: "Quiz",
    icon: ClipboardList,
  },
];

const LessonSidebar = ({ activeTab, onTabChange, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleTabClick = (id) => {
    onTabChange(id);

    onClose();
  };

  const sidebarContent = (
    <nav
      className="
        flex
        h-full
        flex-col
        bg-white
        px-4
        py-6
      "
    >
      {/* Close Button */}

      <button
        onClick={onClose}
        className="
          mb-4
          self-end
          rounded-lg
          p-2
          text-gray-500
          transition
          hover:bg-orange-100
          hover:text-orange-600
        "
        aria-label="Close sidebar"
      >
        <X size={22} />
      </button>

      <h2
        className="
          mb-6
          px-2
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-gray-400
        "
      >
        Lesson Menu
      </h2>

      <div className="space-y-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`

                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-left
                text-sm
                font-medium
                transition-all


                ${
                  activeTab === id
                    ? "bg-orange-50 text-orange-600 shadow-sm"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }

              `}
          >
            <Icon
              size={20}
              className="
                  transition-transform
                  group-hover:scale-110
                "
            />

            <span className="flex-1">{label}</span>

            {activeTab === id && (
              <span
                className="
                      h-5
                      w-1.5
                      rounded-full
                      bg-orange-500
                    "
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}

      <aside
        className={`

          hidden
          lg:flex
          lg:flex-col

          border-r
          border-orange-100

          transition-all
          duration-300


          ${isOpen ? "w-64" : "w-0 overflow-hidden"}

        `}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}

      <div
        onClick={onClose}
        className={`

          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm

          transition-opacity

          lg:hidden


          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }

        `}
      />

      {/* Mobile Sidebar */}

      <aside
        className={`

          fixed
          left-0
          top-0
          z-50
          h-full
          w-72
          bg-white
          shadow-xl


          transition-transform
          duration-300


          lg:hidden


          ${isOpen ? "translate-x-0" : "-translate-x-full"}

        `}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default LessonSidebar;
