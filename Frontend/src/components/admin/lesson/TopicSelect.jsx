import React from "react";

export default function TopicSelect({
  topics = [],
  value,
  onChange,
  disabled = false,
  required = true,
}) {
  return (
    <div>
      <select
        name="topic"
        value={value || ""}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
      >
        <option value="">Select a topic module...</option>
        {topics.map((t) => (
          <option key={t._id} value={t._id}>
            {t.title}
          </option>
        ))}
      </select>
    </div>
  );
}
