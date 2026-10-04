import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Hash, User, Briefcase, FileText } from "lucide-react";
import ThumbnailUpload from "../common/ThumbnailUpload";
import {
  AdminFormCard,
  AdminFormSection,
  AdminFormField,
  AdminFormActions,
} from "../ui/AdminFormSection";

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function TeamForm({
  title,
  buttonText = "Save Member",
  initialData,
  loading = false,
  onSubmit,
  backTo = "/admin/team/manage",
}) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <AdminFormCard title="Member Profile" description="Basic information and website visibility settings.">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Photo & Order */}
          <div className="space-y-6 lg:col-span-4">
            <ThumbnailUpload
              image={formData.photo}
              label="Profile Photo"
              onChange={(file) =>
                setFormData((prev) => ({
                  ...prev,
                  photo: file,
                }))
              }
            />

            <AdminFormField
              label="Display Order"
              htmlFor="order"
              hint="Determines display sequence on the team page (lower numbers appear first)"
            >
              <div className="relative">
                <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  id="order"
                  type="number"
                  name="order"
                  min="0"
                  value={formData.order ?? 0}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </AdminFormField>

            <div className="rounded-lg border border-border bg-background p-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  id="isActive"
                  type="checkbox"
                  name="isActive"
                  checked={Boolean(formData.isActive)}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <div>
                  <span className="block text-sm font-semibold text-text-primary">
                    Active Member
                  </span>
                  <span className="block text-xs text-text-secondary mt-0.5">
                    Show this member on the public Team page.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Name, Role, Bio */}
          <div className="space-y-4 lg:col-span-8">
            <AdminFormField label="Full Name" required htmlFor="name">
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </AdminFormField>

            <AdminFormField label="Role / Designation" required htmlFor="role">
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  id="role"
                  type="text"
                  name="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Curriculum Director, Senior Educator"
                  className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </AdminFormField>

            <AdminFormField label="Bio / Description" htmlFor="description">
              <textarea
                id="description"
                rows={4}
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Brief background or responsibilities..."
                className="w-full rounded-lg border border-border bg-surface p-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </AdminFormField>
          </div>
        </div>
      </AdminFormCard>

      {/* Social Links Section */}
      <AdminFormCard
        title="Social & Contact Links"
        description="Optional links displayed on the member's profile card."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AdminFormField label="LinkedIn Profile" htmlFor="linkedin">
            <div className="relative">
              <LinkedinIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="linkedin"
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>

          <AdminFormField label="GitHub Profile" htmlFor="github">
            <div className="relative">
              <GithubIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="github"
                type="url"
                name="github"
                placeholder="https://github.com/username"
                value={formData.github || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>

          <AdminFormField label="Twitter / X" htmlFor="twitter">
            <div className="relative">
              <TwitterIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="twitter"
                type="url"
                name="twitter"
                placeholder="https://twitter.com/username"
                value={formData.twitter || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>

          <AdminFormField label="Email Address" htmlFor="email">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="member@projectjhep.org"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>
        </div>
      </AdminFormCard>

      <AdminFormActions
        loading={loading}
        submitLabel={buttonText}
        cancelHref={backTo}
      />
    </form>
  );
}
