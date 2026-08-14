export default function UrlInput({ value, onChange, blockType }) {
  const isVideo = blockType === "video";

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Content URL
      </label>

      <input
        type="url"
        name="fileUrl"
        value={value}
        onChange={onChange}
        required
        placeholder={
          isVideo
            ? "https://www.youtube.com/watch?v=..."
            : "https://drive.google.com/file/d/..."
        }
        className="
          w-full
          rounded-xl
          border
          border-orange-200
          bg-white
          px-4
          py-3
          text-slate-700
          outline-none
          transition-all
          duration-200
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-100
        "
      />

      <p className="mt-2 text-sm text-slate-500">
        {isVideo
          ? "Paste a YouTube video URL."
          : "Paste a Google Drive or Google Slides sharing URL."}
      </p>
    </div>
  );
}
