import { useEffect, useState } from "react";

import ThumbnailUpload from "../common/ThumbnailUpload";

export default function TeamForm({
  title,
  buttonText,
  initialData,
  loading,
  onSubmit,
}) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="border-b border-orange-100 p-6">
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 p-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ThumbnailUpload
            image={formData.photo}
            label="Upload Profile Photo"
            onChange={(file) =>
              setFormData((prev) => ({
                ...prev,
                photo: file,
              }))
            }
          />
        </div>

        <div className="space-y-5 lg:col-span-3">
          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Role
            </label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              type="url"
              name="github"
              placeholder="GitHub URL"
              value={formData.github}
              onChange={handleChange}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={formData.linkedin}
              onChange={handleChange}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

            <input
              type="url"
              name="twitter"
              placeholder="Twitter / X URL"
              value={formData.twitter}
              onChange={handleChange}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Display Order
              </label>

              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            <div className="flex items-center pt-9">
              <input
                id="isActive"
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="mr-3 h-5 w-5"
              />

              <label htmlFor="isActive" className="font-medium text-slate-700">
                Active Member
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
