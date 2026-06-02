import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Shadow nav on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200/70 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* ── Brand ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm">
            <svg
              className="w-3.5 h-3.5 text-white"
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
          <span className="font-bold text-[#1a4a3a] text-base tracking-tight">
            BillByTime
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[#1a4a3a] hover:bg-emerald-50 transition-all duration-150"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTAs ── */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-[#1a4a3a] border border-[#1a4a3a]/20 hover:bg-[#1a4a3a]/5 hover:border-[#1a4a3a]/40 transition-all duration-150"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#1a4a3a] hover:bg-[#163d30] shadow-sm hover:shadow-md transition-all duration-150"
          >
            Get Started
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          {menuOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        } bg-white/95 backdrop-blur-md border-b border-gray-200/70`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-[#1a4a3a] hover:bg-emerald-50 transition-all"
            >
              {label}
            </a>
          ))}

          <div className="divider h-px bg-gray-100 my-2" />

          <Link
            to="/login"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1a4a3a] border border-[#1a4a3a]/20 text-center hover:bg-emerald-50 transition-all"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1a4a3a] text-center hover:bg-[#163d30] shadow-sm transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </header>
  );
}
