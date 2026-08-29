import { useState } from "react";
import { User, Lock, X, Save, Eye, EyeOff } from "lucide-react";
import { useAuthContext } from "../context/authContext";

const ProfileCard = ({ onClose }) => {

    const { updateProfile, user } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData)
  };

  return (
    <div className="absolute right-5 top-[68px] z-50 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:right-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a3e635] text-sm font-bold text-slate-900">
            {user?.name.at(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">{user?.name}</h3>

            <p className="text-xs text-slate-400">Manage your profile</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5">
        {/* Name */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Name
          </label>

          <div className="relative">
            <User
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-100" />

          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
            Change Password
          </span>

          <div className="h-px flex-1 bg-slate-100" />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            New Password
          </label>

          <div className="relative">
            <Lock
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Confirm Password
          </label>

          <div className="relative">
            <Lock
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {/* Save */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
        >
          <Save size={17} />
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileCard;
