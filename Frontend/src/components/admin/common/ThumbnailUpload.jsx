import React, { useEffect, useState } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

export default function ThumbnailUpload({
  image,
  onChange,
  label = "Upload Image",
  aspect = "h-48 sm:h-56",
}) {
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
    <div className="w-full">
      <label
        className={`relative flex ${aspect} cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition-colors hover:border-primary/60`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Thumbnail preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="rounded-lg bg-surface/90 px-3 py-1.5 text-xs font-semibold text-text-primary shadow-xs">
                Change Image
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-black/70 text-white hover:bg-black/90 transition shadow-sm"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-primary">
              <UploadCloud size={24} strokeWidth={1.8} />
            </div>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-text-primary">
              {label}
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              PNG, JPG, or WEBP up to 5MB
            </p>
            <span className="mt-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary shadow-2xs hover:bg-surface-muted transition">
              Browse Files
            </span>
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
