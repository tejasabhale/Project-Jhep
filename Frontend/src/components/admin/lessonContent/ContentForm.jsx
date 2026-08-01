import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { createLessonContent } from "../../../api/lessonContent.api";

import TypeSelector from "./TypeSelector";
import UrlInput from "./UrlInput";
import toast from "react-hot-toast";

const initialState = {
  title: "",
  blockType: "ppt",
  fileUrl: "",
  fileName: "",
  order: 1,
};

export default function ContentForm({
  lessonId,
  initialData = initialState,
  onSubmit,
  onSuccess,
  loading: externalLoading = false,
  buttonText = "Save Content",
}) {
  const [formData, setFormData] = useState(initialData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,

      blockType: type,

      fileUrl: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.fileUrl.trim() || !formData.order) {
      alert("Please fill all required fields.");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        lesson: lessonId,

        title: formData.title.trim(),

        blockType: formData.blockType,

        fileUrl: formData.fileUrl.trim(),

        fileName: formData.fileName.trim(),

        order: Number(formData.order),
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await createLessonContent(payload);

        toast.success("Lesson content created successfully.");

        setFormData(initialState);

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to save lesson content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      rounded-2xl
      border
      border-orange-100
      bg-white
      p-6
      shadow-sm
      "
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Content Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Introduction to Greetings"
            className="
            w-full
            rounded-xl
            border
            border-orange-200
            px-4
            py-3
            outline-none
            focus:border-orange-500
            "
          />
        </div>

        <TypeSelector value={formData.blockType} onChange={handleTypeChange} />

        <UrlInput
          value={formData.fileUrl}
          onChange={handleChange}
          blockType={formData.blockType}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            File Name
          </label>

          <input
            type="text"
            name="fileName"
            value={formData.fileName}
            onChange={handleChange}
            placeholder="Lesson 1 Presentation"
            className="
            w-full
            rounded-xl
            border
            border-orange-200
            px-4
            py-3
            outline-none
            focus:border-orange-500
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Display Order
          </label>

          <input
            type="number"
            min={1}
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="
            w-32
            rounded-xl
            border
            border-orange-200
            px-4
            py-3
            outline-none
            focus:border-orange-500
            "
          />
        </div>

        <div
          className="
        flex
        justify-end
        border-t
        border-orange-100
        pt-6
        "
        >
          <button
            type="submit"
            disabled={loading || externalLoading}
            className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-6
            py-3
            font-medium
            text-white
            hover:bg-orange-600
            disabled:opacity-60
            "
          >
            {loading || externalLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />

                {buttonText}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
