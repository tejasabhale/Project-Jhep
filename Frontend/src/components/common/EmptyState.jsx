import { FileQuestion } from "lucide-react";

export default function EmptyState({
  message = "No data available",
  icon: Icon = FileQuestion,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Icon size={48} strokeWidth={1.5} />
      <p className="mt-4 text-lg font-medium">{message}</p>
    </div>
  );
}
