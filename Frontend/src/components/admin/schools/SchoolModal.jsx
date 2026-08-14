import { X } from "lucide-react";
import SchoolForm from "./SchoolForm";

const SchoolModal = ({
  isOpen,
  school,
  onClose,
  onSubmit,
  loading = false,
}) => {
  if (!isOpen) return null;

  const isEditMode = Boolean(school);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-orange-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? "Edit School" : "Add School"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEditMode
                ? "Update the school information."
                : "Add a new partnered school."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <SchoolForm
            school={school}
            onSubmit={onSubmit}
            onCancel={onClose}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolModal;
