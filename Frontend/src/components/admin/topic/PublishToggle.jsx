export default function PublishToggle({ checked, onChange }) {
  return (
    <label className="flex items-center justify-between rounded-xl border bg-orange-50 p-4">
      <div>
        <h3 className="font-semibold">Publish Topic</h3>

        <p className="text-sm text-slate-500">Visible to students</p>
      </div>

      <input
        type="checkbox"
        name="isPublished"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-orange-500"
      />
    </label>
  );
}
