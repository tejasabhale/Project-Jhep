import React, { useEffect } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

export default function AdminConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isDestructive = true,
  variant,
  loading = false,
}) {
  const dialogDescription = description || message || "This action cannot be undone.";
  const isDestructiveAction = variant ? variant === "danger" : isDestructive;
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-secondary-dark/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl transition-all duration-200">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-text-muted hover:bg-surface-muted hover:text-text-primary transition"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isDestructiveAction
                ? "bg-error-light text-error"
                : "bg-warning-light text-warning"
            }`}
          >
            {isDestructiveAction ? (
              <Trash2 size={22} strokeWidth={1.8} />
            ) : (
              <AlertTriangle size={22} strokeWidth={1.8} />
            )}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-display text-base font-bold text-text-primary">
              {title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
              {dialogDescription}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-60 ${
              isDestructiveAction
                ? "bg-error hover:bg-red-700 active:bg-red-800"
                : "bg-primary hover:bg-primary-dark active:bg-primary-dark"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
