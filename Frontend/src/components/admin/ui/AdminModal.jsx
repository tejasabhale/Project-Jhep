import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function AdminModal({
  isOpen,
  onClose,
  title,
  description = null,
  children,
  footer = null,
  maxWidth,
  size,
  loading = false,
}) {
  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };
  const modalWidth = maxWidth || (size ? sizeMap[size] : "max-w-xl");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-secondary-dark/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${modalWidth} my-8 rounded-2xl border border-border bg-surface shadow-2xl transition-all duration-200 z-10`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5 sm:p-6">
          <div className="min-w-0 pr-4">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl truncate">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-text-muted hover:bg-surface-muted hover:text-text-primary transition disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-border bg-surface-muted/30 px-5 py-4 sm:px-6 rounded-b-2xl flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
