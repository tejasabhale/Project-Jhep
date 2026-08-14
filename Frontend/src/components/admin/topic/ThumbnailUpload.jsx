import { UploadCloud } from "lucide-react";
import { useState } from "react";

export default function ThumbnailUpload({ image, onChange }) {
  const [preview, setPreview] = useState(
    image instanceof File ? URL.createObjectURL(image) : "",
  );

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className="bg-orange-50 p-8">
      <label className="flex h-96 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-300 bg-white">
        {preview ? (
          <img
            src={preview}
            alt=""
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <>
            <UploadCloud size={60} className="text-orange-500" />

            <p className="mt-5 text-slate-600">Upload Thumbnail</p>
          </>
        )}

        <input hidden type="file" accept="image/*" onChange={handleImage} />
      </label>
    </div>
  );
}
