import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThumbnailUpload({ image, onChange }) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);

      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (typeof image === "string") {
      setPreview(image);
    }
  }, [image]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onChange(null);
    setPreview("");
  };

  return (
    <div className="bg-orange-50 p-6 sm:p-8">
      <label className="relative flex h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-orange-300 bg-white transition hover:border-orange-500 sm:h-80">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Thumbnail preview"
              className="h-full w-full rounded-2xl object-cover"
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              aria-label="Remove thumbnail"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="rounded-2xl bg-orange-100 p-5">
              <UploadCloud size={48} className="text-orange-500" />
            </div>

            <p className="mt-5 font-medium text-slate-700">Upload Thumbnail</p>

            <p className="mt-1 text-sm text-slate-400">
              PNG, JPG, JPEG, or WEBP
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Click to choose an image
            </p>
          </div>
        )}

        <input
          hidden
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleImage}
        />
      </label>
    </div>
  );
}
