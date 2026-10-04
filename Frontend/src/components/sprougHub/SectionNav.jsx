export default function SectionNav({ sections, activeSection, onNavigate }) {
  return (
    <nav
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 lg:flex"
    >
      {sections.map((section) => {
        const active = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            aria-label={`Go to ${section.label}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
                active
                  ? "translate-x-0 text-primary-dark opacity-100"
                  : "translate-x-2 text-text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>

            <span
              className={`h-2.5 w-2.5 rounded-full border-2 transition-all duration-300 ${
                active
                  ? "scale-125 border-primary bg-primary"
                  : "border-border bg-background group-hover:border-primary/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
