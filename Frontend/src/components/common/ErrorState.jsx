import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

export default function ErrorState({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <AlertCircle size={48} className="text-red-400" strokeWidth={1.5} />
      <p className="mt-4 text-lg font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          <RefreshCw size={18} className="mr-2" /> Retry
        </Button>
      )}
    </div>
  );
}
