import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { Wallet, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

const VerifyEmail = () => {
  const { verifyEmail } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move backwards when pressing backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (!email) {
      navigate("/signup");
      return;
    }

    const response = await verifyEmail(email, otpValue);

    if (response.success) {
      navigate("/");
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
              Secure your account
            </p>

            <h2 className="max-w-lg text-5xl font-bold leading-[1.1] tracking-tight">
              Your finances deserve protection.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              Verify your email address to keep your Finance OS account secure.
            </p>

            {/* Security Card */}
            <div className="mt-10 flex max-w-sm items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/70 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <ShieldCheck size={25} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Email verification
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  A one-time verification code helps protect your account.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="relative z-10 text-xs text-slate-500">
            © 2026 Finance OS
          </p>
        </div>

        {/* OTP Section */}
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

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-50 text-lime-600">
              <ShieldCheck size={28} />
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-[#84cc16]">
                VERIFY EMAIL
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Enter verification code
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                We've sent a 6-digit verification code to
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                your@email.com
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleSubmit}>
              {/* OTP Inputs */}
              <div className="mb-7 flex justify-between gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="h-14 w-12 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 outline-none transition focus:border-lime-400 focus:bg-white focus:ring-4 focus:ring-lime-100 sm:h-16 sm:w-14"
                  />
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={otp.join("").length !== 6}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Verify Account
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Resend */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">Didn't receive the code?</p>

              <button
                type="button"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-lime-600 hover:text-lime-700"
              >
                <RefreshCw size={15} />
                Resend code
              </button>
            </div>

            {/* Back */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900"
              >
                ← Back to signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
