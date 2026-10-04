import { useEffect, useState } from "react";
import AdminModal from "../ui/AdminModal";
import { AdminFormField } from "../ui/AdminFormSection";
import { User, Mail, Phone, Lock, AtSign, Shield } from "lucide-react";

const initialState = {
  fullName: "",
  userName: "",
  email: "",
  password: "",
  mobileNo: "",
  role: "user",
};

export default function UserModal({
  isOpen,
  onClose,
  onSubmit,
  user = null,
  currentUser = null,
}) {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        userName: user.userName || "",
        email: user.email || "",
        password: "",
        mobileNo: user.mobileNo || "",
        role: user.role || "user",
      });
    } else {
      setFormData(initialState);
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  const isOwner = currentUser?.role === "owner";

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User Account" : "Create New User"}
      description={
        user
          ? "Update account details and role permissions."
          : "Register a new user account with designated access role."
      }
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <AdminFormField label="Full Name" required htmlFor="fullName">
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="h-10 w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>

          {/* Username */}
          <AdminFormField label="Username" required htmlFor="userName">
            <div className="relative">
              <AtSign size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                id="userName"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                placeholder="janedoe"
                className="h-10 w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Email */}
          <AdminFormField label="Email Address" required htmlFor="email">
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="h-10 w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>

          {/* Mobile No */}
          <AdminFormField label="Mobile Number" htmlFor="mobileNo" required={!user}>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                id="mobileNo"
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required={!user}
                placeholder="9876543210 (10 digits)"
                maxLength={10}
                className="h-10 w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Password */}
          <AdminFormField
            label={user ? "New Password" : "Password"}
            required={!user}
            htmlFor="password"
            hint={user ? "Leave blank to preserve existing password" : "Minimum 8 characters"}
          >
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!user}
                placeholder={user ? "••••••••" : "Min. 8 characters"}
                className="h-10 w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </AdminFormField>

          {/* Role */}
          <AdminFormField label="Account Role" required htmlFor="role">
            <div className="relative">
              <Shield size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="h-10 w-full rounded-xl border border-border bg-background py-2 pl-9 pr-8 text-sm text-text-primary transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="user">User (Standard Access)</option>
                {isOwner && (
                  <option value="admin">Administrator</option>
                )}
              </select>
            </div>
          </AdminFormField>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-surface-muted hover:text-text-primary transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-dark active:bg-primary-dark transition disabled:opacity-50"
          >
            {submitting ? "Saving..." : user ? "Update Account" : "Create Account"}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
