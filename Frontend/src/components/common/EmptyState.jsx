import { FileQuestion } from "lucide-react";

export default function EmptyState({
  title = "Nothing Found",
  message = "There's nothing to display here yet.",
  icon: Icon = FileQuestion,
  action = null,
}) {
  return (
    <div
      className="
        flex
        min-h-[320px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-orange-200
        bg-white
        px-6
        py-12
        text-center
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-orange-100
          text-orange-500
        "
      >
        <Icon size={42} strokeWidth={1.7} />
      </div>

      <h2
        className="
          mt-6
          text-2xl
          font-bold
          text-slate-800
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-relaxed
          text-slate-500
        "
      >
        {message}
      </p>

      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
