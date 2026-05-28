import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LoginSuccessPopup } from "../component/SuccessPopup";

export default function Login() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors({});
      setErrorMsg("");
      setSuccessMsg("");

      const data = await loginUser(user);
      localStorage.setItem("token", data.token);
      // setSuccessMsg("Login successful ");

      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 1500);

      setSuccessMsg("Login successful");
      setShowPopup(true);

      // setTimeout(() => {
      //   setShowPopup(false);
      //   navigate("/dashboard");
      // }, 3000);
    } catch (err) {
      const fieldErrors = err.response?.data?.errors;
      const message =
        err.response?.data?.message ||
        err.response?.data?.msg ||
        "Something went wrong";

      if (fieldErrors) {
        setErrors(fieldErrors);
      } else {
        setErrorMsg(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0] font-sans px-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
        {/* ── LEFT PANEL ── */}
        <div className="bg-[#111c18] p-12 flex flex-col justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              BillByTime
            </span>
          </div>

          {/* Headline */}
          <div className="mt-10">
            <h1 className="text-4xl font-bold leading-tight text-white tracking-tight">
              Welcome Back.
              <span className="block text-emerald-400 mt-1">
                Let's Continue.
              </span>
            </h1>
            <p className="mt-5 text-gray-400 text-sm leading-relaxed">
              Log in to manage your time, track projects, and generate invoices.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: "⚡", text: "Fast & secure login" },
                { icon: "📊", text: "Access your dashboard" },
                { icon: "🔒", text: "Your data is protected" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                    {icon}
                  </span>
                  <span className="text-sm text-gray-300 font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-600 mt-10">
            © {new Date().getFullYear()} BillByTime. All rights reserved.
          </p>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="p-10 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-950 tracking-tight">
              Login
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Welcome back
            </p>
          </div>

          {/* Error / Success messages */}
          {errorMsg && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 mb-4">
              <svg
                className="w-4 h-4 text-red-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-xs font-semibold">{errorMsg}</p>
            </div>
          )}
          {successMsg && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5 mb-4">
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-emerald-700 text-xs font-semibold">
                {successMsg}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <fieldset className="border-0 p-0 m-0">
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                placeholder="you@example.com"
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 border rounded-xl outline-none text-sm font-medium text-gray-900 transition focus:ring-2 ${
                  errors.email
                    ? "border-red-400 bg-red-50 focus:ring-red-100"
                    : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-100"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.email}
                </p>
              )}
            </fieldset>

            {/* PASSWORD */}
            <fieldset className="border-0 p-0 m-0">
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={user.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 border rounded-xl outline-none text-sm font-medium text-gray-900 transition focus:ring-2 ${
                  errors.password
                    ? "border-red-400 bg-red-50 focus:ring-red-100"
                    : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-100"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.password}
                </p>
              )}
            </fieldset>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md mt-2 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-[#1a4a3a] hover:bg-[#163d30] text-white hover:shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login →"
              )}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center font-medium">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-emerald-700 font-bold hover:text-emerald-800 transition"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
      {showPopup && (
        <LoginSuccessPopup
          onContinue={() => {
            setShowPopup(false);
            navigate("/dashboard");
          }}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
