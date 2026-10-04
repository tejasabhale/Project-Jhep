export default function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-10 bg-primary" />

      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-dark">
        {children}
      </span>
    </div>
  );
}
