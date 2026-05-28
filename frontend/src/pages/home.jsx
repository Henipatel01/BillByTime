import { Link } from "react-router-dom";
import { Clock, DollarSign, BarChart3, Users, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react";
import Nav from "../component/nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-gray-900 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; }

        .font-serif-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        /* Subtle texture */
        .texture-bg {
          background-color: #F5F5F0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a4a3a' fill-opacity='0.025'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* Hero accent line */
        .accent-line {
          background: linear-gradient(90deg, #1a4a3a, #10b981, transparent);
          height: 2px;
          border-radius: 2px;
        }

        /* Green pill */
        .green-pill {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        /* Feature card */
        .feature-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          transition: all 0.25s ease;
        }
        .feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(26,74,58,0.1);
          border-color: rgba(26,74,58,0.2);
        }

        /* CTA button */
        .btn-primary {
          background: #1a4a3a;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: #163d30;
          box-shadow: 0 8px 24px rgba(26,74,58,0.3);
          transform: translateY(-1px);
        }

        .btn-outline {
          border: 1.5px solid rgba(26,74,58,0.25);
          color: #1a4a3a;
          transition: all 0.2s ease;
        }
        .btn-outline:hover {
          background: rgba(26,74,58,0.06);
          border-color: #1a4a3a;
        }

        /* Dashboard mockup */
        .mockup-card {
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06);
        }

        /* Stat card in mockup */
        .mock-stat {
          background: #f8f8f5;
          border: 1px solid rgba(0,0,0,0.06);
        }

        /* Fade up */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.15s; }
        .delay-3 { animation-delay: 0.28s; }
        .delay-4 { animation-delay: 0.42s; }
        .delay-5 { animation-delay: 0.58s; }

        /* Step number */
        .step-num {
          font-family: 'Instrument Serif', serif;
          font-size: 80px;
          line-height: 1;
          color: rgba(26,74,58,0.08);
          font-style: italic;
        }

        /* Divider */
        .divider {
          height: 1px;
          background: rgba(0,0,0,0.07);
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F5F5F0; }
        ::-webkit-scrollbar-thumb { background: #1a4a3a; border-radius: 3px; }
      `}</style>

      <Nav />

      {/* ─── HERO ─── */}
      <section className="texture-bg relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 min-h-screen">

        {/* Badge */}
        <div className="fade-up delay-1 green-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Smart billing for modern freelancers
        </div>

        {/* Headline */}
        <h1 className="fade-up delay-2 font-serif-display text-6xl md:text-8xl leading-tight mb-4 max-w-4xl tracking-tight">
          Bill Smarter.<br />
          <span className="italic text-[#1a4a3a]">Earn More.</span>
        </h1>

        <div className="fade-up delay-2 accent-line w-32 mx-auto mb-8" />

        <p className="fade-up delay-3 text-gray-500 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
          Track clients, run timers, and calculate earnings automatically —
          so you focus on work, not paperwork.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-4 flex flex-wrap gap-3 justify-center mb-24">
          <Link to="/signup" className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white flex items-center gap-2 text-sm shadow-md">
            Get Started Free <ArrowRight size={15} />
          </Link>
          <Link to="/login" className="btn-outline px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 bg-white">
            Login
          </Link>
        </div>

        {/* ── DASHBOARD MOCKUP ── */}
        <div className="fade-up delay-5 w-full max-w-5xl mx-auto mockup-card rounded-2xl overflow-hidden">
          {/* Window bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-[#F5F5F0]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-4 text-xs text-gray-400 font-medium">TimeBill — Dashboard</span>
          </div>

          {/* Mock content */}
          <div className="p-6 text-left">
            {/* Header row */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Dashboard</h2>
                <p className="text-xs text-gray-400">Welcome back — here's your overview</p>
              </div>
              <div className="bg-[#1a4a3a] text-white px-4 py-2 rounded-xl text-xs font-semibold">+ New Client</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: "TOTAL CLIENTS", val: "12", sub: "registered" },
                { label: "ACTIVE TIMERS", val: "3", sub: "● Running now", accent: true },
                { label: "TIME TRACKED", val: "48h 12m", sub: "this month" },
                { label: "TOTAL EARNINGS", val: "₹52,400", sub: "all sessions", green: true },
              ].map((s) => (
                <div key={s.label} className="mock-stat rounded-xl p-3">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">{s.label}</p>
                  <p className={`font-bold text-xl ${s.green ? "text-emerald-700 font-mono" : "text-gray-900"}`}>{s.val}</p>
                  <p className={`text-xs mt-1 font-medium ${s.accent ? "text-emerald-600" : "text-gray-400"}`}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Search mock */}
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 mb-4 text-gray-400 text-xs flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Search by name, email, phone or type...
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-7 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                {["Client","Email","Type","Status","Duration","Amount","Timer"].map(h => <span key={h}>{h}</span>)}
              </div>
              {[
                { name: "Ravi Shah",  email: "ravi@...",  type: "Hourly",   running: true,  dur: "1h 12m", amt: "₹1,200" },
                { name: "Priya M.",   email: "priya@...", type: "Fixed",    running: false, dur: "3h 5m",  amt: "₹5,000" },
                { name: "Amit K.",    email: "amit@...",  type: "Per Unit", running: false, dur: "45m",    amt: "₹800"   },
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-7 px-4 py-3 border-t border-gray-50 items-center hover:bg-gray-50/50 transition-colors">
                  <span className="font-bold text-gray-900 text-sm">{r.name}</span>
                  <span className="text-gray-500 text-xs">{r.email}</span>
                  <span className="text-xs"><span className="capitalize bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md font-bold">{r.type}</span></span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${r.running ? "text-emerald-700" : "text-gray-400"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${r.running ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
                    {r.running ? "Running" : "Stopped"}
                  </span>
                  <span className="text-gray-700 text-sm font-semibold">{r.dur}</span>
                  <span className="text-emerald-700 font-bold font-mono text-sm">{r.amt}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border w-fit ${r.running ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                    {r.running ? "Stop" : "Start"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ─── FEATURES ─── */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">Everything you need</p>
          <h2 className="font-serif-display text-4xl md:text-5xl leading-tight">
            Built for how you <span className="italic">actually</span> work
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: <Clock size={20} className="text-emerald-700" />,
              title: "Real-Time Timer",
              desc: "Start and stop timers per client with a single click. Duration tracked to the second, billing calculated instantly.",
              points: ["Per-client timers", "Auto duration tracking", "Instant billing on stop"],
            },
            {
              icon: <DollarSign size={20} className="text-emerald-700" />,
              title: "Flexible Billing Types",
              desc: "Every client is different. Hourly, fixed, per unit, or manual — set billing exactly how your agreement works.",
              points: ["Hourly rate billing", "Fixed price projects", "Per unit & manual billing"],
            },
            {
              icon: <Users size={20} className="text-emerald-700" />,
              title: "Client Management",
              desc: "Add, edit, and delete clients easily. Search by name, email, phone or billing type. All in one clean place.",
              points: ["Add & edit clients", "Search & filter", "Duplicate prevention"],
            },
            {
              icon: <BarChart3 size={20} className="text-emerald-700" />,
              title: "Live Dashboard Stats",
              desc: "Top-line numbers always visible — total clients, active timers, total earned and total time tracked.",
              points: ["Total earnings overview", "Active timer count", "Total time tracked"],
            },
            {
              icon: <Zap size={20} className="text-emerald-700" />,
              title: "Instant Calculations",
              desc: "No manual math. When you stop a timer, the amount is computed based on the client's pricing and displayed immediately.",
              points: ["Auto amount calculation", "Shows on stop", "Persistent across sessions"],
            },
            {
              icon: <Shield size={20} className="text-emerald-700" />,
              title: "Secure & Private",
              desc: "Each user sees only their own clients and timers. JWT-based authentication keeps your billing data safe.",
              points: ["JWT authentication", "Per-user data isolation", "Secure API access"],
            },
          ].map((f, i) => (
            <div key={i} className="feature-card rounded-2xl p-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 font-light">{f.desc}</p>
              <ul className="space-y-1.5">
                {f.points.map((p, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle size={12} className="text-emerald-600 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">Simple workflow</p>
          <h2 className="font-serif-display text-4xl md:text-5xl leading-tight">
            Up and running <span className="italic">in minutes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: "01", title: "Add your client", desc: "Enter the client's name, email, phone and choose a billing type — hourly, fixed, per unit, or manual." },
            { step: "02", title: "Start the timer", desc: "Hit Start when you begin working. The timer runs in real time. Hit Stop when you're done." },
            { step: "03", title: "Get your amount", desc: "The bill is calculated automatically based on the billing type and displayed instantly on the dashboard." },
          ].map((s, i) => (
            <div key={s.step} className="relative">
              <div className="step-num mb-2">{s.step}</div>
              <div className="w-8 h-0.5 bg-[#1a4a3a] mb-4 rounded-full" />
              <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ─── CTA ─── */}
      <section className="px-6 py-28 text-center">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-12">
          <p className="text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4">Get started today</p>
          <h2 className="font-serif-display text-4xl md:text-5xl leading-tight mb-4">
            Stop leaving money<br /><span className="italic">on the table</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
            Create your free account and start billing clients in under 2 minutes. No credit card required.
          </p>
          <Link
            to="/signup"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white shadow-md"
          >
            Create Free Account <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <div className="divider" />

      {/* ─── FOOTER ─── */}
      <footer className="px-6 py-12 bg-[#111c18]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-base tracking-tight">TimeBill</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
                The simplest way for freelancers to track time and bill clients — accurately, every time.
              </p>
            </div>

            <div>
              <p className="text-white text-xs font-bold mb-4 uppercase tracking-wider">Product</p>
              <ul className="space-y-2">
                {["Dashboard", "Reports", "Invoices"].map(l => (
                  <li key={l}><span className="text-gray-500 text-sm hover:text-emerald-400 transition cursor-pointer">{l}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-xs font-bold mb-4 uppercase tracking-wider">Account</p>
              <ul className="space-y-2">
                {[{ label: "Login", to: "/login" }, { label: "Sign Up", to: "/signup" }].map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-gray-500 text-sm hover:text-emerald-400 transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">© {new Date().getFullYear()} TimeBill. All rights reserved.</p>
            <p className="text-gray-700 text-xs">Built for freelancers who value their time 🕐</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
