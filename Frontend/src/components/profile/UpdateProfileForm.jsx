import { useState } from "react";

const UpdateProfileForm = ({ user, onSubmit }) => {
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    userName: user.userName || "",
    mobileNo: user.mobileNo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
    },
    {
      name: "userName",
      label: "Username",
      type: "text",
    },
    {
      name: "mobileNo",
      label: "Mobile Number",
      type: "tel",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
      {fields.map(({ name, label, type }) => (
        <div key={name} className="flex flex-col">
          <label
            htmlFor={name}
            className="mb-2 text-sm font-medium text-gray-700"
          >
            {label}
          </label>

          <input
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-orange-200
              px-4
              py-3
              outline-none
              transition
              focus:border-orange-400
              focus:ring-2
              focus:ring-orange-400/30
            "
          />
        </div>
      ))}

      <button
        type="submit"
        className="
          md:col-span-2
          rounded-xl
          bg-orange-500
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-orange-600
          active:scale-[0.98]
        "
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateProfileForm;
