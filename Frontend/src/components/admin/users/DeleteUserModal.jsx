import { Trash2, X, AlertTriangle } from "lucide-react";

export default function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  user,
  loading = false,
}) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-red-100 bg-red-50 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
              <Trash2 className="text-red-600" size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">Delete User</h2>

              <p className="mt-1 text-sm text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-white
              hover:text-slate-600
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-start gap-3 rounded-xl bg-orange-50 p-4">
            <AlertTriangle size={20} className="mt-0.5 text-orange-500" />

            <p className="text-sm text-slate-600">
              Are you sure you want to permanently remove this user account?
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-800">{user.fullName}</h3>

            <p className="mt-1 text-sm text-slate-500">{user.email}</p>

            <p className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
              {user.role}
            </p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5">
          <button
            onClick={onClose}
            className="
              flex-1
              cursor-pointer
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              font-medium
              text-slate-600
              transition
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              flex-1
              cursor-pointer
              rounded-xl
              bg-red-600
              px-4
              py-3
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}
