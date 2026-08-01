const CONTENT_TYPES = [
  {
    label: "PPT",
    value: "ppt",
    description: "Google Drive Presentation",
  },
  {
    label: "PDF",
    value: "pdf",
    description: "Google Drive PDF",
  },
  {
    label: "Video",
    value: "video",
    description: "YouTube Video",
  },
];

export default function TypeSelector({ value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Content Type
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CONTENT_TYPES.map((type) => {
          const active = value === type.value;

          return (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange(type.value)}
              className={`rounded-xl border p-4 text-left transition ${
                active
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-orange-200 bg-white hover:border-orange-400"
              }`}
            >
              <h3
                className={`font-semibold ${
                  active ? "text-white" : "text-slate-800"
                }`}
              >
                {type.label}
              </h3>

              <p
                className={`mt-1 text-sm ${
                  active ? "text-orange-100" : "text-slate-500"
                }`}
              >
                {type.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
