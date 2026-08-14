import { useState } from "react";
import { UserRound, AtSign, Phone, Save } from "lucide-react";

const UpdateProfileForm = ({ user, onSubmit, loading }) => {
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
      placeholder: "Enter your full name",
      icon: UserRound,
    },
    {
      name: "userName",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      icon: AtSign,
    },
    {
      name: "mobileNo",
      label: "Mobile Number",
      type: "tel",
      placeholder: "Enter your mobile number",
      icon: Phone,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map(({ name, label, type, placeholder, icon: Icon }, index) => (
          <div key={name} className={index === 0 ? "md:col-span-2" : ""}>
            <label
              htmlFor={name}
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              {label}
            </label>

            <div className="relative">
              <Icon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  hover:border-orange-200
                  focus:border-orange-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-orange-400/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-orange-500
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            shadow-orange-500/20
            transition
            hover:bg-orange-600
            hover:shadow-md
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save size={17} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
