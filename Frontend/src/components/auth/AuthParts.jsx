/* Page heading used at the top of every auth page */
export function AuthHeader({ title, subtitle }) {
  return (
    <div className="mb-10 text-center lg:text-left">
      <h1 className="font-display text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* Small text or links under the form */
export function AuthFooter({ children }) {
  return (
    <div className="mt-8 text-center text-xs text-text-muted lg:text-left">
      {children}
    </div>
  );
}
