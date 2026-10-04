import React from "react";
import { Link } from "react-router-dom";

export function AdminFormCard({
  title,
  description = null,
  children,
  className = "",
}) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-6 shadow-xs ${className}`}>
      {(title || description) && (
        <div className="mb-5 border-b border-border/80 pb-4">
          {title && (
            <h3 className="font-display text-base font-bold text-text-primary">{title}</h3>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-text-secondary">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export function AdminFormSection({
  title,
  description = null,
  children,
  className = "",
}) {
  return (
    <section className={`border-b border-border/80 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0 ${className}`}>
      <div className="mb-4">
        <h3 className="font-display text-base font-bold text-text-primary">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-xs text-text-secondary">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function AdminFormField({
  label,
  required = false,
  error = null,
  hint = null,
  children,
  className = "",
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-text-muted">{hint}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}

export function AdminFormActions({
  onCancel,
  cancelHref,
  cancelTo,
  cancelLabel = "Cancel",
  submitLabel = "Save Changes",
  loading = false,
  disabled = false,
  extra = null,
  className = "",
}) {
  const cancelLink = cancelHref || cancelTo;

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 ${className}`}
    >
      <div>{extra}</div>
      <div className="flex items-center gap-3">
        {cancelLink ? (
          <Link
            to={cancelLink}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition inline-flex items-center justify-center"
          >
            {cancelLabel}
          </Link>
        ) : onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition disabled:opacity-50"
          >
            {cancelLabel}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={disabled || loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-dark active:bg-primary-dark transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Saving...</span>
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </div>
  );
}

export default {
  Section: AdminFormSection,
  Field: AdminFormField,
  Actions: AdminFormActions,
};
