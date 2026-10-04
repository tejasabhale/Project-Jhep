import React, { useEffect, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024;

const getImageUrl = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  if (image?.url) {
    return image.url;
  }

  return "";
};

export default function ThumbnailUpload({
  image = null,
  onChange,
  label = "Upload Thumbnail",
  helperText = "PNG, JPG or WEBP · Max 5MB",
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(() => getImageUrl(image));
  const [error, setError] = useState("");

  useEffect(() => {
    const existingUrl = getImageUrl(image);

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreview(existingUrl);
  }, [image]);

  const handleFile = (file) => {
    setError("");

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    onChange?.(file);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation();

    setPreview("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  return (
    <div className="w-full">
      <p className="mb-2 text-sm font-semibold text-text-primary">{label}</p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-dashed border-border bg-background transition-colors duration-200 hover:border-primary hover:bg-primary-light/20"
      >
        {preview ? (
          <div className="relative aspect-video w-full">
            <img
              src={preview}
              alt="Lesson thumbnail preview"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/90 text-text-primary shadow-sm transition hover:bg-white"
              aria-label="Remove thumbnail"
            >
              <X size={15} />
            </button>

            <div className="absolute bottom-3 left-3 rounded-lg bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              Change thumbnail
            </div>
          </div>
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center px-6 py-10 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary-dark">
              <ImagePlus size={22} />
            </div>

            <p className="text-sm font-bold text-text-primary">
              Click to upload thumbnail
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              or drag and drop an image here
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary">
              <Upload size={13} />
              Choose image
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      <p className="mt-2 text-xs text-text-muted">{helperText}</p>

      {error && <p className="mt-2 text-xs font-medium text-error">{error}</p>}
    </div>
  );
}
