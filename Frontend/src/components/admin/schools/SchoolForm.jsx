import React, { useEffect, useState } from "react";
import { Building2, MapPin, ListOrdered } from "lucide-react";
import PublishToggle from "../topic/PublishToggle";
import {
  AdminFormField,
  AdminFormActions,
} from "../ui/AdminFormSection";

export default function SchoolForm({
  school,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name || "",
        location: school.location || "",
        order: school.order ?? 0,
        isActive: school.isActive ?? true,
      });
    } else {
      setFormData({
        name: "",
        location: "",
        order: 0,
        isActive: true,
      });
    }
  }, [school]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      order: Number(formData.order) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AdminFormField label="School Name" required>
        <div className="relative">
          <Building2
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Z. P. Primary School, Malshiras"
            required
            disabled={loading}
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </AdminFormField>

      <AdminFormField label="Location / Region" required>
        <div className="relative">
          <MapPin
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Solapur, Maharashtra"
            required
            disabled={loading}
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </AdminFormField>

      <AdminFormField
        label="Display Order"
        hint="Lower numbers appear first on the public website"
      >
        <div className="relative">
          <ListOrdered
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min={0}
            disabled={loading}
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </AdminFormField>

      <div className="rounded-xl border border-border bg-background p-3.5">
        <PublishToggle
          checked={formData.isActive}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
          }
          title="Active Partner School"
          description={
            formData.isActive
              ? "This school is actively partnered and visible on the website."
              : "This school is marked inactive and hidden from the website."
          }
        />
      </div>

      <AdminFormActions
        onCancel={onCancel}
        loading={loading}
        submitLabel={school ? "Save Changes" : "Add School"}
      />
    </form>
  );
}
