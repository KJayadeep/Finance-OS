import { useState } from "react";
import { Wallet, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, setUser, login } = useAuthContext();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate("/");
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3] p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-xl">
        {/* Left Branding */}
        <div className="relative hidden w-1/2 overflow-hidden bg-[#111827] p-12 text-white lg:flex lg:flex-col">
          {/* Decorative circles */}
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

          {/* Main Content */}
          <div className="relative z-10 mt-auto mb-auto">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#a3e635]">
              Your money. Your control.
            </p>

            <h2 className="max-w-lg text-5xl font-bold leading-[1.1] tracking-tight">
              Take control of your finances.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              Track your income, manage your expenses and understand where your
              money goes.
            </p>

            {/* Mini balance card */}
            <div className="mt-10 max-w-sm rounded-2xl border border-slate-700 bg-slate-800/70 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">TOTAL BALANCE</span>

                <span className="rounded-full bg-lime-400/10 px-2 py-1 text-xs text-lime-400">
                  +12.8%
                </span>
              </div>

              <p className="mt-3 text-3xl font-bold">₹12,580</p>

              <div className="mt-5 flex items-end gap-1">
                {[30, 45, 35, 60, 50, 75, 65, 90].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t bg-[#a3e635]"
                    style={{ height: `${height / 2}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-xs text-slate-500">
            © 2026 Finance OS
          </p>
        </div>

        {/* Login */}
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
                WELCOME BACK
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to Finance OS
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Enter your details to access your dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#65a30d] hover:text-[#4d7c0f]"
                  >
                    Forgot password?
                  </button>
                </div>

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
                    placeholder="Enter your password"
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

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Sign In
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <button className="font-semibold text-[#65a30d] hover:text-[#4d7c0f]"
              type="button"
              onClick={()=> navigate('/signup')}
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
