import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThumbnailUpload({
  image,
  onChange,
  label = "Upload Thumbnail",
}) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);

      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPreview(image?.url || "");
  }, [image]);

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <div className="bg-orange-50 p-8">
      <label
        className="
          flex
          h-96
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-orange-300
          bg-white
          overflow-hidden
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="
              h-full
              w-full
              rounded-2xl
              object-cover
            "
          />
        ) : (
          <>
            <UploadCloud size={60} className="text-orange-500" />

            <p className="mt-5 text-slate-600">{label}</p>
          </>
        )}

        <input hidden type="file" accept="image/*" onChange={handleImage} />
      </label>
    </div>
  );
}
