import { useState } from "react";

const UpdateProfileForm = ({ user, onSubmit }) => {
  const [form, setForm] = useState({
    fullName: user.fullName,
    userName: user.userName,
    mobileNo: user.mobileNo,
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="
grid
md:grid-cols-2
gap-5
"
    >
      {[
        ["fullName", "Full Name"],
        ["userName", "Username"],
        ["mobileNo", "Mobile Number"],
      ].map(([name, label]) => (
        <div key={name}>
          <label
            className="
text-sm
font-medium
text-gray-700
"
          >
            {label}
          </label>

          <input
            name={name}
            value={form[name]}
            onChange={change}
            className="
w-full
mt-2
rounded-xl
border
border-orange-200
px-4
py-3
outline-none
focus:ring-2
focus:ring-orange-400
"
          />
        </div>
      ))}

      <button
        className="
md:col-span-2
bg-orange-500
text-white
py-3
rounded-xl
font-semibold
hover:bg-orange-600
transition
"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateProfileForm;
