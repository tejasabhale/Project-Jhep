/* Shared classes for auth forms */

export const authInputClass = (hasError, paddingRight = "pr-4") =>
  `w-full rounded-xl border bg-surface py-3.5 pl-11 ${paddingRight} text-sm text-text-primary outline-none transition-colors duration-200 placeholder:text-text-muted disabled:cursor-not-allowed disabled:bg-surface-muted ${
    hasError
      ? "border-error focus:border-error"
      : "border-border focus:border-primary"
  }`;

export const authLabelClass = "mb-2 block text-sm font-semibold text-secondary";

export const authButtonClass =
  "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark py-3.5 text-sm font-bold !text-white transition-colors duration-200 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70";
