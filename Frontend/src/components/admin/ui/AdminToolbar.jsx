import React from "react";
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function AdminToolbar({
  search = "",
  onSearchChange,
  searchPlaceholder = "Search records...",
  filters = [],
  totalItems,
  totalCount,
  showingItems,
  filteredCount,
  hasActiveFilters,
  onClearFilters,
  onReset,
  extraActions = null,
  className = "",
}) {
  const displayTotal = totalItems !== undefined ? totalItems : (totalCount ?? 0);
  const displayShowing = showingItems !== undefined ? showingItems : (filteredCount ?? 0);
  const handleClear = onClearFilters || onReset;

  const isFiltered =
    hasActiveFilters !== undefined
      ? hasActiveFilters
      : Boolean(
          (search && search.trim()) ||
          filters.some((f) => f.value && f.value !== "all" && f.value !== "")
        );
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-3.5 shadow-xs ${className}`}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search bar */}
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-9 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search text"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-muted hover:text-text-primary"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter, fIdx) => (
            <div key={filter.id || filter.key || fIdx} className="relative min-w-[130px] flex-1 sm:flex-initial">
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                aria-label={filter.label || filter.key || "Filter"}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs sm:text-sm font-medium text-text-secondary outline-none transition focus:border-primary"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {isFiltered && handleClear && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-xs font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}

          {extraActions}
        </div>
      </div>

      {/* Counter bar */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-xs text-text-muted">
        <span>
          Showing{" "}
          <strong className="font-semibold text-text-primary">
            {displayShowing}
          </strong>{" "}
          of{" "}
          <strong className="font-semibold text-text-primary">
            {displayTotal}
          </strong>{" "}
          records
        </span>
        {isFiltered && (
          <span className="text-primary font-medium">Filtered</span>
        )}
      </div>
    </div>
  );
}
