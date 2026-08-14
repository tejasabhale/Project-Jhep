export default function PublishToggle({ checked, onChange }) {
  const handleToggle = () => {
    onChange({
      target: {
        name: "isPublished",
        type: "checkbox",
        checked: !checked,
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-slate-800">Publish Topic</p>

        <p className="mt-1 text-xs text-slate-500">
          {checked
            ? "This topic is visible to students."
            : "This topic is hidden from students."}
        </p>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={checked}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-100 ${
          checked ? "bg-orange-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
