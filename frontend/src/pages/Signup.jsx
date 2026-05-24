import { useState } from "react";
import { signupUser } from "../services/authService";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SignupSuccessPopup } from "../component/SuccessPopup";


export default function Signup() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

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

            const data = await signupUser(user);
            console.log("Success:", data);
            // setSuccessMsg("Signup successful");

            // setTimeout(() => {
            //     navigate("/login");
            // }, 1500);

            setSuccessMsg("Signup successful");
            setShowPopup(true); // show popup first

            setTimeout(() => {
                setShowPopup(false);
                navigate("/login");
            }, 4000);

            setUser({ name: "", email: "", password: "" });

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
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-base tracking-tight">BillByTime</span>
                    </div>

                    {/* Headline */}
                    <div className="mt-10">
                        <h1 className="text-4xl font-bold leading-tight text-white tracking-tight">
                            Start Free.
                            <span className="block text-emerald-400 mt-1">Grow Fast.</span>
                        </h1>
                        <p className="mt-5 text-gray-400 text-sm leading-relaxed">
                            Track your time, manage clients, and generate invoices effortlessly.
                        </p>

                        <div className="mt-8 space-y-3">
                            {[
                                { icon: "✓", text: "Free trial available" },
                                { icon: "⚡", text: "Setup in minutes" },
                                { icon: "📄", text: "Auto invoicing" },
                                { icon: "🔒", text: "Secure data" },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                                        {icon}
                                    </span>
                                    <span className="text-sm text-gray-300 font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-xs text-gray-600 mt-10">© {new Date().getFullYear()} BillByTime. All rights reserved.</p>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="p-10 flex flex-col justify-center bg-white">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-950 tracking-tight">Create Account</h2>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Start your journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* NAME */}
                        <fieldset className="border-0 p-0 m-0">
                            <label
                                htmlFor="name"
                                className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={user.name}
                                placeholder="John Doe"
                                onChange={handleChange}
                                className={`w-full px-3.5 py-2.5 border rounded-xl outline-none text-sm font-medium text-gray-900 transition focus:ring-2 ${errors.name
                                    ? "border-red-400 bg-red-50 focus:ring-red-100"
                                    : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-100"
                                    }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
                            )}
                        </fieldset>

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
                                className={`w-full px-3.5 py-2.5 border rounded-xl outline-none text-sm font-medium text-gray-900 transition focus:ring-2 ${errors.email
                                    ? "border-red-400 bg-red-50 focus:ring-red-100"
                                    : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-100"
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
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
                                placeholder="Min. 6 characters"
                                onChange={handleChange}
                                className={`w-full px-3.5 py-2.5 border rounded-xl outline-none text-sm font-medium text-gray-900 transition focus:ring-2 ${errors.password
                                    ? "border-red-400 bg-red-50 focus:ring-red-100"
                                    : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-100"
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
                            )}
                        </fieldset>

                        {/* Error / Success messages */}
                        {errorMsg && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                                <svg className="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-600 text-xs font-semibold">{errorMsg}</p>
                            </div>
                        )}
                        {successMsg && (
                            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
                                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-emerald-700 text-xs font-semibold">{successMsg}</p>
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md mt-2 ${loading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                : "bg-[#1a4a3a] hover:bg-[#163d30] text-white hover:shadow-lg"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account →"
                            )}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6 text-center font-medium">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-emerald-700 font-bold hover:text-emerald-800 transition">
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>

            {showPopup && <SignupSuccessPopup
                onContinue={() => navigate("/dashboard")}
                onClose={() => setShowPopup(false)}
            />}
        </div>
    );
}
