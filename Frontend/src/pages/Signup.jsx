import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useAuthContext } from "../context/authContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    try {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);

    if (result.success) {
      navigate("/");
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3] p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-xl">
        {/* Branding */}
        <div className="relative hidden w-1/2 overflow-hidden bg-[#111827] p-12 text-white lg:flex lg:flex-col">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-slate-800" />

          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full border-[50px] border-slate-800" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#a3e635] text-[#111827]">
              <Wallet size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide">FINANCE</h1>

              <p className="text-[10px] tracking-[4px] text-slate-400">OS</p>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 mt-auto mb-auto">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#a3e635]">
              Start your journey
            </p>

            <h2 className="max-w-lg text-5xl font-bold leading-[1.1] tracking-tight">
              Build better money habits.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              One simple place to track your income, expenses and financial
              activity.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {[
                "Track your income",
                "Monitor your expenses",
                "Understand your balance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-slate-900">
                    ✓
                  </div>

                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-slate-500">
            © 2026 Finance OS
          </p>
        </div>

        {/* Signup */}
        <div className="flex w-full items-center justify-center p-6 md:p-12 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a3e635] text-[#111827]">
                <Wallet size={20} />
              </div>

              <div>
                <h1 className="text-lg font-bold">FINANCE</h1>

                <p className="text-[9px] tracking-[3px] text-slate-400">OS</p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#84cc16]">
                GET STARTED
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Start managing your finances with Finance OS.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jay Deep"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-[#84cc16]"
                />

                <p className="text-xs leading-5 text-slate-400">
                  I agree to the Terms of Service and Privacy Policy.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Create Account
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <button className="font-semibold text-[#65a30d] hover:text-[#4d7c0f]"
              type="button"
              onClick={()=>navigate('/login')}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
