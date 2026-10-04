import React from "react";
import { Link } from "react-router-dom";
import { Search, Plus, FolderX } from "lucide-react";

export default function AdminEmptyState({
  title,
  description,
  icon: Icon = FolderX,
  actionLabel,
  actionLink,
  actionTo,
  onAction,
  isFiltered = false,
  onClearFilters,
  onResetFilters,
  onReset,
  className = "",
}) {
  const linkHref = actionLink || actionTo;
  const handleClear = onClearFilters || onResetFilters || onReset;
  return (
    <div
      className={`rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center ${className}`}
    >
      <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-surface-muted text-text-muted">
        {isFiltered ? (
          <Search size={24} strokeWidth={1.8} />
        ) : (
          <Icon size={24} strokeWidth={1.8} />
        )}
      </div>

      <h3 className="mt-4 font-display text-base font-bold text-text-primary sm:text-lg">
        {title || (isFiltered ? "No matching results found" : "No items found")}
      </h3>

      <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-text-secondary">
        {description ||
          (isFiltered
            ? "No items match your active filters. Try adjusting or clearing search terms."
            : "Get started by adding your first record.")}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isFiltered && handleClear ? (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
          >
            Clear Filters
          </button>
        ) : linkHref ? (
          <Link
            to={linkHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition"
          >
            <Plus size={16} />
            {actionLabel || "Add Item"}
          </Link>
        ) : onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition"
          >
            <Plus size={16} />
            {actionLabel || "Add Item"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
