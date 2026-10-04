import React from "react";

export default function PublishToggle({
  checked,
  onChange,
  title = "Publish Status",
  description = null,
}) {
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
        <p className="text-xs font-bold uppercase tracking-wider text-text-primary">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">
          {description ||
            (checked
              ? "This item is published and visible to learners."
              : "This item is hidden in draft mode.")}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          checked ? "bg-primary" : "bg-text-muted/40"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-150 ${
            checked ? "translate-x-5.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
