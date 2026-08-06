import { useEffect, useState } from "react";

const initialState = {
  fullName: "",
  userName: "",
  email: "",
  password: "",
  mobileNo: "",
  role: "user",
};

export default function UserModal({ isOpen, onClose, onSubmit, user }) {
  const [formData, setFormData] = useState(initialState);

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-orange-100 bg-orange-50 px-8 py-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {user ? "Edit User" : "Add New User"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {user
              ? "Update the user's information."
              : "Fill in the details to create a new user account."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>

              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                placeholder="Enter username"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!user}
                placeholder={
                  user
                    ? "Leave blank to keep current password"
                    : "Enter password"
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Mobile Number
              </label>

              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl cursor-pointer border border-slate-200 px-6 py-3 font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl cursor-pointer bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600"
            >
              {user ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
