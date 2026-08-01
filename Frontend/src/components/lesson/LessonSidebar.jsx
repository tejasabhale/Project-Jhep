import { BookOpen, ClipboardList, X } from "lucide-react";
import { useEffect } from "react";

const tabs = [
  {
    id: "content",
    label: "Content",
    icon: BookOpen,
  },
  // {
  //   id: "quiz",
  //   label: "Quiz",
  //   icon: ClipboardList,
  // },
];

const LessonSidebar = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
}) => {
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


  const sidebarContent = (
    <nav
      className="
        flex
        flex-col
        h-full
        bg-white
        border-r
        border-gray-100
        py-6
        px-4
      "
    >
      {/* Mobile Close Button */}
      <button
        className="
          lg:hidden
          self-end
          mb-4
          text-gray-500
          hover:text-gray-700
        "
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <X size={24} />
      </button>


      {/* Sidebar Title */}
      <h2
        className="
          text-xs
          font-semibold
          text-gray-400
          uppercase
          tracking-wider
          mb-6
          px-2
        "
      >
        Lesson Menu
      </h2>


      {/* Navigation Tabs */}
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-sm
            font-medium
            transition

            ${
              activeTab === id
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:bg-gray-50"
            }
          `}
        >
          <Icon size={20} />

          <span>
            {label}
          </span>


          {activeTab === id && (
            <span
              className="
                ml-auto
                w-1.5
                h-5
                rounded-full
                bg-orange-500
              "
            />
          )}
        </button>
      ))}
    </nav>
  );


  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          hidden
          lg:flex
          lg:flex-col
          lg:w-64
          lg:flex-shrink-0
        "
      >
        {sidebarContent}
      </aside>


      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            lg:hidden
          "
        >

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/30
            "
            onClick={onClose}
          />


          {/* Sidebar */}
          <aside
            className="
              relative
              z-50
              w-72
              h-full
              bg-white
              shadow-xl
            "
          >
            {sidebarContent}
          </aside>

        </div>
      )}
    </>
  );
};

export default LessonSidebar;