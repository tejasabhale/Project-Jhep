import { Upload } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThumbnailUpload({ file, onChange }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    if (typeof file === "string") {
      setPreview(file);
    }
  }, [file]);

  return (
    <div>
      <label className="mb-2 block font-medium">Lesson Thumbnail</label>

      <label
        className="
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-xl
          border-2
          border-dashed
          border-orange-200
          p-6
          transition
          hover:bg-orange-50
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="Thumbnail preview"
            className="
              mb-4
              h-40
              w-full
              rounded-xl
              object-cover
            "
          />
        ) : (
          <Upload className="mb-3 text-orange-600" />
        )}

        <div className="text-sm text-slate-600">
          {file instanceof File
            ? file.name
            : preview
              ? "Change Image"
              : "Upload Image"}
        </div>

        <input type="file" accept="image/*" onChange={onChange} hidden />
      </label>
    </div>
  );
}
