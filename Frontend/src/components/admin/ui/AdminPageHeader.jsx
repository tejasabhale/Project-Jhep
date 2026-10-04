import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function AdminPageHeader({
  title,
  description,
  subtitle,
  breadcrumbs = [],
  actions = null,
  badge = null,
  backLink = null,
  backTo = null,
  className = "",
}) {
  const headerDescription = description || subtitle;
  const backHref = backLink || backTo;

  const renderBadge =
    typeof badge === "string" ? (
      <span className="inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-text-secondary">
        {badge}
      </span>
    ) : (
      badge
    );
  return (
    <div className={`mb-6 border-b border-border pb-5 ${className}`}>
      {/* Breadcrumb nav */}
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-text-muted"
        >
          <Link
            to="/admin"
            className="hover:text-primary transition font-medium"
          >
            Admin
          </Link>
          {breadcrumbs.map((crumb, idx) => {
            const crumbLink = crumb.path || crumb.href;
            return (
              <React.Fragment key={idx}>
                <ChevronRight size={13} className="shrink-0 text-text-muted/60" />
                {crumbLink ? (
                  <Link
                    to={crumbLink}
                    className="hover:text-primary transition font-medium"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-text-primary font-semibold">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {/* Main Title Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            {backHref && (
              <Link
                to={backHref}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
                aria-label="Go back"
              >
                <ArrowLeft size={16} />
              </Link>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl truncate">
                  {title}
                </h1>
                {renderBadge}
              </div>

              {headerDescription && (
                <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                  {headerDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2.5 flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
