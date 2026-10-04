import React, { useId } from "react";

export default function PublishToggle({
  checked,
  onChange,
  title = "Publish Status",
  description = null,
}) {
  const labelId = useId();
  const isOn = Boolean(checked);

  const handleToggle = () => {
    onChange({
      target: {
        name: "isPublished",
        type: "checkbox",
        checked: !isOn,
      },
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p
          id={labelId}
          className="text-xs font-bold uppercase tracking-wider text-text-primary"
        >
          {title}
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">
          {description ||
            (isOn
              ? "This item is published and visible to learners."
              : "This item is hidden in draft mode.")}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-labelledby={labelId}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isOn ? "bg-primary" : "bg-text-muted/40"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
