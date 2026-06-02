import { Link } from "react-router-dom";
import {
  Clock,
  DollarSign,
  BarChart3,
  Users,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Nav from "../component/nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-gray-900 overflow-x-hidden font-sans">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Smart billing for modern freelancers
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl leading-tight mb-4 max-w-4xl tracking-tight font-bold text-gray-950">
          Bill Smarter.
          <br />
          <span className="italic font-light text-[#1a4a3a]">Earn More.</span>
        </h1>

        {/* Accent line */}
        <div className="w-32 h-0.5 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#1a4a3a] via-emerald-500 to-transparent" />

        <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
          Track clients, run timers, and calculate earnings automatically — so
          you focus on work, not paperwork.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16 sm:mb-24 w-full sm:w-auto">
          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm bg-[#1a4a3a] hover:bg-[#163d30] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started Free <ArrowRight size={15} />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-[#1a4a3a] border border-[#1a4a3a]/25 bg-white hover:bg-emerald-50 hover:border-[#1a4a3a]/50 transition-all duration-200"
          >
            Log in
          </Link>
        </div>

        {/* ── DASHBOARD MOCKUP ── */}
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
          {/* Window bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-[#F5F5F0]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-4 text-xs text-gray-400 font-medium">
              TimeBill — Dashboard
            </span>
          </div>

          {/* Mock content */}
          <div className="p-4 sm:p-6 text-left">
            {/* Header row */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="font-bold text-gray-900 text-base sm:text-lg">
                  Dashboard
                </h2>
                <p className="text-xs text-gray-400">
                  Welcome back — here's your overview
                </p>
              </div>
              <div className="bg-[#1a4a3a] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold">
                + New Client
              </div>
            </div>

            {/* Stats — 2-col on mobile, 4-col on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
              {[
                { label: "TOTAL CLIENTS", val: "12", sub: "registered" },
                {
                  label: "ACTIVE TIMERS",
                  val: "3",
                  sub: "● Running now",
                  accent: true,
                },
                { label: "TIME TRACKED", val: "48h 12m", sub: "this month" },
                {
                  label: "TOTAL EARNINGS",
                  val: "₹52,400",
                  sub: "all sessions",
                  green: true,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#f8f8f5] border border-gray-100 rounded-xl p-2.5 sm:p-3"
                >
                  <p className="text-gray-400 text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
                    {s.label}
                  </p>
                  <p
                    className={`font-bold text-base sm:text-xl ${s.green ? "text-emerald-700 font-mono" : "text-gray-900"}`}
                  >
                    {s.val}
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs mt-0.5 font-medium ${s.accent ? "text-emerald-600" : "text-gray-400"}`}
                  >
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Search mock */}
            <div className="bg-white border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 mb-3 sm:mb-4 text-gray-400 text-xs flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="truncate">
                Search by name, email, phone or type...
              </span>
            </div>

            {/* Table — hidden on very small, shown sm+ */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hidden sm:block">
              <div className="grid grid-cols-7 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                {[
                  "Client",
                  "Email",
                  "Type",
                  "Status",
                  "Duration",
                  "Amount",
                  "Timer",
                ].map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
              {[
                {
                  name: "Ravi Shah",
                  email: "ravi@...",
                  type: "Hourly",
                  running: true,
                  dur: "1h 12m",
                  amt: "₹1,200",
                },
                {
                  name: "Priya M.",
                  email: "priya@...",
                  type: "Fixed",
                  running: false,
                  dur: "3h 5m",
                  amt: "₹5,000",
                },
                {
                  name: "Amit K.",
                  email: "amit@...",
                  type: "Per Unit",
                  running: false,
                  dur: "45m",
                  amt: "₹800",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 px-4 py-3 border-t border-gray-50 items-center"
                >
                  <span className="font-bold text-gray-900 text-sm">
                    {r.name}
                  </span>
                  <span className="text-gray-500 text-xs truncate">
                    {r.email}
                  </span>
                  <span className="text-xs">
                    <span className="capitalize bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-bold">
                      {r.type}
                    </span>
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${r.running ? "text-emerald-700" : "text-gray-400"}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${r.running ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`}
                    />
                    {r.running ? "Running" : "Stopped"}
                  </span>
                  <span className="text-gray-700 text-sm font-semibold">
                    {r.dur}
                  </span>
                  <span className="text-emerald-700 font-bold font-mono text-sm">
                    {r.amt}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border w-fit ${r.running ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}
                  >
                    {r.running ? "Stop" : "Start"}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile client cards — shown only below sm */}
            <div className="sm:hidden space-y-2">
              {[
                {
                  name: "Ravi Shah",
                  type: "Hourly",
                  running: true,
                  amt: "₹1,200",
                },
                {
                  name: "Priya M.",
                  type: "Fixed",
                  running: false,
                  amt: "₹5,000",
                },
                {
                  name: "Amit K.",
                  type: "Per Unit",
                  running: false,
                  amt: "₹800",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3 py-2.5"
                >
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="capitalize bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs font-bold">
                        {r.type}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-xs font-semibold ${r.running ? "text-emerald-700" : "text-gray-400"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${r.running ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`}
                        />
                        {r.running ? "Running" : "Stopped"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-700 font-bold font-mono text-sm">
                      {r.amt}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${r.running ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}
                    >
                      {r.running ? "Stop" : "Start"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-200/70" />

      {/* ─── FEATURES ─── */}
      <section
        id="features"
        className="px-5 sm:px-6 py-16 sm:py-24 max-w-6xl mx-auto scroll-mt-16"
      >
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">
            Everything you need
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-950">
            Built for how you <em className="font-light italic">actually</em>{" "}
            work
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: <Clock size={20} className="text-emerald-700" />,
              title: "Real-Time Timer",
              desc: "Start and stop timers per client with a single click. Duration tracked to the second, billing calculated instantly.",
              points: [
                "Per-client timers",
                "Auto duration tracking",
                "Instant billing on stop",
              ],
            },
            {
              icon: <DollarSign size={20} className="text-emerald-700" />,
              title: "Flexible Billing Types",
              desc: "Every client is different. Hourly, fixed, per unit, or manual — set billing exactly how your agreement works.",
              points: [
                "Hourly rate billing",
                "Fixed price projects",
                "Per unit & manual billing",
              ],
            },
            {
              icon: <Users size={20} className="text-emerald-700" />,
              title: "Client Management",
              desc: "Add, edit, and delete clients easily. Search by name, email, phone or billing type. All in one clean place.",
              points: [
                "Add & edit clients",
                "Search & filter",
                "Duplicate prevention",
              ],
            },
            {
              icon: <BarChart3 size={20} className="text-emerald-700" />,
              title: "Live Dashboard Stats",
              desc: "Top-line numbers always visible — total clients, active timers, total earned and total time tracked.",
              points: [
                "Total earnings overview",
                "Active timer count",
                "Total time tracked",
              ],
            },
            {
              icon: <Zap size={20} className="text-emerald-700" />,
              title: "Instant Calculations",
              desc: "No manual math. When you stop a timer, the amount is computed based on the client's pricing and displayed immediately.",
              points: [
                "Auto amount calculation",
                "Shows on stop",
                "Persistent across sessions",
              ],
            },
            {
              icon: <Shield size={20} className="text-emerald-700" />,
              title: "Secure & Private",
              desc: "Each user sees only their own clients and timers. JWT-based authentication keeps your billing data safe.",
              points: [
                "JWT authentication",
                "Per-user data isolation",
                "Secure API access",
              ],
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-100 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 font-light">
                {f.desc}
              </p>
              <ul className="space-y-1.5">
                {f.points.map((p, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <CheckCircle
                      size={12}
                      className="text-emerald-600 shrink-0"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gray-200/70" />

      {/* ─── HOW IT WORKS ─── */}
      <section
        id="how-it-works"
        className="px-5 sm:px-6 py-16 sm:py-24 max-w-5xl mx-auto scroll-mt-16"
      >
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">
            Simple workflow
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-bold text-gray-950">
            Up and running <em className="font-light italic">in minutes</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
          {[
            {
              step: "01",
              title: "Add your client",
              desc: "Enter the client's name, email, phone and choose a billing type — hourly, fixed, per unit, or manual.",
            },
            {
              step: "02",
              title: "Start the timer",
              desc: "Hit Start when you begin working. The timer runs in real time. Hit Stop when you're done.",
            },
            {
              step: "03",
              title: "Get your amount",
              desc: "The bill is calculated automatically based on the billing type and displayed instantly on the dashboard.",
            },
          ].map((s) => (
            <div key={s.step}>
              <p
                className="text-7xl sm:text-8xl font-bold italic text-emerald-900/8 leading-none mb-2 select-none"
                style={{ color: "rgba(26,74,58,0.08)" }}
              >
                {s.step}
              </p>
              <div className="w-8 h-0.5 bg-[#1a4a3a] mb-4 rounded-full" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gray-200/70" />

      {/* ─── CTA ─── */}
      <section className="px-5 sm:px-6 py-16 sm:py-28 text-center">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <p className="text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">
            Get started today
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 font-bold text-gray-950">
            Stop leaving money
            <br />
            <em className="font-light italic">on the table</em>
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
            Create your free account and start billing clients in under 2
            minutes. No credit card required.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1a4a3a] hover:bg-[#163d30] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Create Free Account <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <div className="h-px bg-gray-200/70" />

      {/* ─── FOOTER ─── */}
      <footer className="px-5 sm:px-6 py-10 sm:py-12 bg-[#111c18]">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
            {/* Brand */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
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
                <span className="text-white font-bold text-base tracking-tight">
                  TimeBill
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
                The simplest way for freelancers to track time and bill clients
                — accurately, every time.
              </p>
            </div>

            <div>
              <p className="text-white text-xs font-bold mb-4 uppercase tracking-wider">
                Product
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How it works", href: "#how-it-works" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-gray-500 text-sm hover:text-emerald-400 transition"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-xs font-bold mb-4 uppercase tracking-wider">
                Account
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Log in", to: "/login" },
                  { label: "Sign Up", to: "/signup" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-gray-500 text-sm hover:text-emerald-400 transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} TimeBill. All rights reserved.
            </p>
            <p className="text-gray-700 text-xs">
              Built for freelancers who value their time 🕐
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
