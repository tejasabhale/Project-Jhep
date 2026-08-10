import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

import { createLessonContent } from "../../../api/lessonContent.api";

import TypeSelector from "./TypeSelector";
import UrlInput from "./UrlInput";

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
      fileName: "",
    }));
  };

  /**
   * Validate content URL based on content type.
   */
  const validateUrl = (url, type) => {
    const normalizedUrl = url.toLowerCase().trim();

    // YouTube video
    if (type === "video") {
      return (
        normalizedUrl.includes("youtube.com") ||
        normalizedUrl.includes("youtu.be")
      );
    }

    // PPT / PowerPoint
    if (type === "ppt") {
      return (
        // Google Drive
        normalizedUrl.includes("drive.google.com") ||

        // Google Slides
        normalizedUrl.includes("docs.google.com/presentation") ||

        // Microsoft OneDrive
        normalizedUrl.includes("onedrive.live.com") ||

        // Microsoft OneDrive short/share link
        normalizedUrl.includes("1drv.ms") ||

        // Microsoft SharePoint
        normalizedUrl.includes("sharepoint.com") ||

        // Microsoft Office Viewer
        normalizedUrl.includes("view.officeapps.live.com")
      );
    }

    // Other content types
    return (
      normalizedUrl.includes("drive.google.com") ||
      normalizedUrl.includes("docs.google.com")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = formData.title.trim();
    const fileUrl = formData.fileUrl.trim();
    const fileName = formData.fileName.trim();
    const order = Number(formData.order);

    if (!title) {
      return toast.error("Content title is required.");
    }

    if (!fileUrl) {
      return toast.error("Content URL is required.");
    }

    if (!validateUrl(fileUrl, formData.blockType)) {
      if (formData.blockType === "video") {
        return toast.error("Please enter a valid YouTube URL.");
      }

      if (formData.blockType === "ppt") {
        return toast.error(
          "Please enter a valid Google Drive, Google Slides, OneDrive, 1drv.ms, SharePoint, or Microsoft PowerPoint URL.",
        );
      }

      return toast.error("Please enter a valid content URL.");
    }

    if (!order || order < 1) {
      return toast.error("Display order must be at least 1.");
    }

    try {
      setLoading(true);

      const payload = {
        lesson: lessonId,
        title,
        blockType: formData.blockType,
        fileUrl,
        fileName,
        order,
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await createLessonContent(payload);

        toast.success("Lesson content created successfully.");

        setFormData(initialState);

        onSuccess?.();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to save lesson content.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">

        {/* Content Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Content Title
          </label>

          <input
            type="text"
            name="title"
            required
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
              transition-all
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-100
            "
          />
        </div>

        {/* Content Type */}
        <TypeSelector
          value={formData.blockType}
          onChange={handleTypeChange}
        />

        {/* Content URL */}
        <UrlInput
          value={formData.fileUrl}
          onChange={handleChange}
          blockType={formData.blockType}
        />

        {/* OneDrive Help */}
        {formData.blockType === "ppt" && (
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <p className="mb-2 text-sm font-semibold text-orange-800">
              OneDrive PowerPoint
            </p>

            <p className="text-sm leading-6 text-orange-700">
              You can paste a normal OneDrive sharing link, including
              <span className="font-medium"> 1drv.ms </span>
              links.
            </p>

            <p className="mt-2 break-all rounded-lg bg-white px-3 py-2 text-xs text-slate-600">
              Example:
              <br />
              https://1drv.ms/p/c/cd0eda4c5840d85f/IQTnrWMRdZJrTrelYIbyoFTvAXfRfQJlUZL9EYlo-vrjRr0
            </p>
          </div>
        )}

        {/* File Name */}
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
              transition-all
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-100
            "
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Display Order
          </label>

          <input
            type="number"
            min={1}
            required
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
              transition-all
              focus:border-orange-500
              focus:ring-2
              focus:ring-orange-100
            "
          />
        </div>

        {/* Submit */}
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
              transition
              hover:bg-orange-600
              disabled:cursor-not-allowed
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