
// import { Link } from "react-router-dom";
// import { Clock, DollarSign, BarChart3, Users, Zap, Shield, ArrowRight, Play, CheckCircle } from "lucide-react";
// import Nav from "../component/nav";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-[#0a0010] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

//       {/* Google Font Import */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

//         * { box-sizing: border-box; }

//         .font-display { font-family: 'Syne', sans-serif; }

//         /* Animated gradient orbs */
//         .orb {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(80px);
//           animation: float 8s ease-in-out infinite;
//           pointer-events: none;
//         }
//         .orb-1 {
//           width: 500px; height: 500px;
//           background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%);
//           top: -100px; left: -100px;
//           animation-delay: 0s;
//         }
//         .orb-2 {
//           width: 400px; height: 400px;
//           background: radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%);
//           top: 200px; right: -50px;
//           animation-delay: -3s;
//         }
//         .orb-3 {
//           width: 300px; height: 300px;
//           background: radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%);
//           bottom: 100px; left: 30%;
//           animation-delay: -5s;
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px) scale(1); }
//           50% { transform: translateY(-30px) scale(1.05); }
//         }

//         /* Grid background */
//         .grid-bg {
//           background-image:
//             linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px);
//           background-size: 60px 60px;
//         }

//         /* Glow border */
//         .glow-border {
//           border: 1px solid rgba(139,92,246,0.3);
//           box-shadow: 0 0 30px rgba(139,92,246,0.1), inset 0 0 30px rgba(139,92,246,0.05);
//         }

//         /* Dashboard mockup */
//         .dashboard-mockup {
//           background: linear-gradient(135deg, rgba(30,10,60,0.95) 0%, rgba(15,5,40,0.98) 100%);
//           border: 1px solid rgba(139,92,246,0.25);
//           box-shadow:
//             0 40px 80px rgba(0,0,0,0.6),
//             0 0 0 1px rgba(139,92,246,0.1),
//             inset 0 1px 0 rgba(255,255,255,0.05);
//         }

//         /* Feature card hover */
//         .feature-card {
//           background: linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(79,70,229,0.05) 100%);
//           border: 1px solid rgba(139,92,246,0.15);
//           transition: all 0.3s ease;
//         }
//         .feature-card:hover {
//           background: linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(79,70,229,0.1) 100%);
//           border-color: rgba(139,92,246,0.4);
//           transform: translateY(-4px);
//           box-shadow: 0 20px 40px rgba(139,92,246,0.15);
//         }

//         /* Stat number pulse */
//         .stat-num {
//           background: linear-gradient(135deg, #c4b5fd, #8b5cf6);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         /* CTA button glow */
//         .btn-primary {
//           background: linear-gradient(135deg, #7c3aed, #6d28d9);
//           box-shadow: 0 0 30px rgba(124,58,237,0.4), 0 4px 15px rgba(0,0,0,0.3);
//           transition: all 0.3s ease;
//         }
//         .btn-primary:hover {
//           box-shadow: 0 0 50px rgba(124,58,237,0.6), 0 4px 20px rgba(0,0,0,0.4);
//           transform: translateY(-2px);
//         }

//         /* Fade in animation */
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up { animation: fadeUp 0.7s ease forwards; }
//         .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
//         .fade-up-2 { animation-delay: 0.25s; opacity: 0; }
//         .fade-up-3 { animation-delay: 0.4s; opacity: 0; }
//         .fade-up-4 { animation-delay: 0.55s; opacity: 0; }

//         /* Badge pill */
//         .badge {
//           background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(79,70,229,0.15));
//           border: 1px solid rgba(139,92,246,0.35);
//         }

//         /* Scrollbar */
//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-track { background: #0a0010; }
//         ::-webkit-scrollbar-thumb { background: #5b21b6; border-radius: 3px; }

//         /* Divider gradient */
//         .divider {
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent);
//         }
//       `}</style>

//       <Nav />

//       {/* ─── HERO ─── */}
//       <section className="relative grid-bg min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
//         {/* Orbs */}
//         <div className="orb orb-1" />
//         <div className="orb orb-2" />
//         <div className="orb orb-3" />

//         {/* Badge */}
//         <div className="fade-up fade-up-1 badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
//           <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
//           <span className="text-purple-300 text-sm font-medium">Smart billing for modern freelancers</span>
//         </div>

//         {/* Headline */}
//         <h1 className="fade-up fade-up-2 font-display text-6xl md:text-8xl font-800 leading-tight mb-6 max-w-4xl">
//           Bill Smarter.<br />
//           <span className="stat-num">Earn More.</span>
//         </h1>

//         <p className="fade-up fade-up-3 text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
//           BillByTime gives you a real-time dashboard to track clients, run timers,
//           and calculate earnings automatically — so you focus on work, not paperwork.
//         </p>

//         {/* CTAs */}
//         <div className="fade-up fade-up-4 flex flex-wrap gap-4 justify-center mb-20">
//           <Link to="/signup" className="btn-primary px-8 py-3.5 rounded-xl font-semibold text-white flex items-center gap-2">
//             Get Started Free <ArrowRight size={16} />
//           </Link>
//           <Link to="/login" className="flex items-center gap-2 border border-purple-700/50 px-8 py-3.5 rounded-xl hover:bg-purple-900/30 transition text-purple-200">
//             <Play size={14} fill="currentColor" /> Login
//           </Link>
//         </div>

//         {/* ── DASHBOARD MOCKUP ── */}
//         <div className="fade-up fade-up-4 w-full max-w-5xl mx-auto dashboard-mockup rounded-2xl overflow-hidden">
//           {/* Window bar */}
//           <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-900/50 bg-black/30">
//             <span className="w-3 h-3 rounded-full bg-red-500/70" />
//             <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
//             <span className="w-3 h-3 rounded-full bg-green-500/70" />
//             <span className="ml-4 text-xs text-purple-400/60">BillByTime — Dashboard</span>
//           </div>

//           {/* Mock dashboard content */}
//           <div className="p-6">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-5">
//               <h2 className="font-display text-xl text-white">Dashboard</h2>
//               <div className="bg-purple-700/40 border border-purple-600/40 px-4 py-1.5 rounded-lg text-sm text-purple-200">+ New client</div>
//             </div>

//             {/* Stats row */}
//             <div className="grid grid-cols-4 gap-3 mb-5">
//               {[
//                 { label: "TOTAL CLIENTS", val: "12" },
//                 { label: "ACTIVE NOW", val: "3" },
//                 { label: "TOTAL EARNED", val: "₹52,400" },
//                 { label: "TOTAL TIME", val: "48h 12m" },
//               ].map((s) => (
//                 <div key={s.label} className="bg-purple-900/40 border border-purple-800/40 rounded-xl p-3">
//                   <p className="text-purple-400 text-xs mb-1">{s.label}</p>
//                   <p className="text-white font-semibold text-lg">{s.val}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Search bar mock */}
//             <div className="bg-purple-900/30 border border-purple-800/30 rounded-lg px-4 py-2 mb-4 text-purple-500 text-sm text-left">
//               🔍 Search by name, email, phone or type...
//             </div>

//             {/* Table header */}
//             <div className="grid grid-cols-8 px-3 py-2 text-purple-400 text-xs mb-1">
//               {["CLIENT", "EMAIL", "PHONE", "TYPE", "STATUS", "DURATION", "AMOUNT", "ACTION"].map(h => (
//                 <span key={h}>{h}</span>
//               ))}
//             </div>

//             {/* Table rows */}
//             {[
//               { name: "Ravi Shah", email: "ravi@...", phone: "98765...", type: "Hourly", status: "Running", dur: "1h 12m", amt: "₹1,200", color: "green" },
//               { name: "Priya M.", email: "priya@...", phone: "91234...", type: "Fixed", status: "Stopped", dur: "3h 5m", amt: "₹5,000", color: "gray" },
//               { name: "Amit K.", email: "amit@...", phone: "90000...", type: "Per Unit", status: "Stopped", dur: "45m", amt: "₹800", color: "gray" },
//             ].map((r, i) => (
//               <div key={i} className="grid grid-cols-8 px-3 py-2.5 border-t border-purple-900/40 text-sm items-center hover:bg-purple-900/20 transition rounded">
//                 <span className="font-medium text-white">{r.name}</span>
//                 <span className="text-purple-300">{r.email}</span>
//                 <span className="text-purple-300">{r.phone}</span>
//                 <span className="text-purple-200">{r.type}</span>
//                 <span className={r.color === "green" ? "text-green-400 font-semibold" : "text-gray-500"}>
//                   {r.color === "green" ? "● Running" : "○ Stopped"}
//                 </span>
//                 <span className="text-purple-200">{r.dur}</span>
//                 <span className="text-green-400 font-bold">{r.amt}</span>
//                 <div className="flex gap-1">
//                   <span className={`px-2 py-1 rounded text-xs ${r.color === "green" ? "bg-red-500/80" : "bg-green-500/80"}`}>
//                     {r.color === "green" ? "⏹ Stop" : "▶ Start"}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <div className="divider" />

//       {/* ─── FEATURES ─── */}
//       <section className="px-6 py-24 max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">Everything you need</p>
//           <h2 className="font-display text-4xl md:text-5xl font-bold">Built for how you actually work</h2>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {[
//             {
//               icon: <Clock size={24} className="text-purple-400" />,
//               title: "Real-Time Timer",
//               desc: "Start and stop timers per client with a single click. Duration is tracked to the second and billing is calculated automatically when you stop.",
//               points: ["Per-client timers", "Auto duration tracking", "Instant billing on stop"],
//             },
//             {
//               icon: <DollarSign size={24} className="text-purple-400" />,
//               title: "Flexible Billing Types",
//               desc: "Every client is different. Set up billing exactly how your agreement works — no more manual calculations or spreadsheets.",
//               points: ["Hourly rate billing", "Fixed price projects", "Per unit & manual billing"],
//             },
//             {
//               icon: <Users size={24} className="text-purple-400" />,
//               title: "Client Management",
//               desc: "Add, edit, and delete clients easily. Search by name, email, phone or billing type. All your client data in one clean place.",
//               points: ["Add & edit clients", "Search & filter", "Duplicate prevention"],
//             },
//             {
//               icon: <BarChart3 size={24} className="text-purple-400" />,
//               title: "Live Dashboard Stats",
//               desc: "Your top-line numbers always visible — total clients, how many are active right now, total earned and total time tracked.",
//               points: ["Total earnings overview", "Active timer count", "Total time tracked"],
//             },
//             {
//               icon: <Zap size={24} className="text-purple-400" />,
//               title: "Instant Calculations",
//               desc: "No manual math. When you stop a timer, the amount is computed based on the client's pricing type and displayed immediately.",
//               points: ["Auto amount calculation", "Shows on stop", "Persistent across sessions"],
//             },
//             {
//               icon: <Shield size={24} className="text-purple-400" />,
//               title: "Secure & Private",
//               desc: "Each user sees only their own clients and timers. JWT-based authentication keeps your billing data safe and isolated.",
//               points: ["JWT authentication", "Per-user data isolation", "Secure API access"],
//             },
//           ].map((f, i) => (
//             <div key={i} className="feature-card rounded-2xl p-6">
//               <div className="w-10 h-10 rounded-xl bg-purple-900/60 flex items-center justify-center mb-4">
//                 {f.icon}
//               </div>
//               <h3 className="font-display text-lg font-bold mb-2 text-white">{f.title}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
//               <ul className="space-y-1.5">
//                 {f.points.map((p, j) => (
//                   <li key={j} className="flex items-center gap-2 text-sm text-purple-300">
//                     <CheckCircle size={13} className="text-purple-500 shrink-0" />
//                     {p}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="divider" />

//       {/* ─── HOW IT WORKS ─── */}
//       <section className="px-6 py-24 max-w-4xl mx-auto text-center">
//         <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">Simple workflow</p>
//         <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">Up and running in minutes</h2>

//         <div className="grid md:grid-cols-3 gap-8 text-left">
//           {[
//             { step: "01", title: "Add your client", desc: "Enter the client's name, email, phone and choose a billing type — hourly, fixed, per unit, or manual." },
//             { step: "02", title: "Start the timer", desc: "Hit Start when you begin working. The timer runs in real time. Hit Stop when you're done." },
//             { step: "03", title: "Get your amount", desc: "The bill is calculated automatically based on the billing type and displayed instantly on the dashboard." },
//           ].map((s) => (
//             <div key={s.step} className="relative">
//               <div className="font-display text-6xl font-800 text-purple-900/60 mb-3">{s.step}</div>
//               <h3 className="font-display text-xl font-bold mb-2 text-white">{s.title}</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="divider" />

//       {/* ─── CTA ─── */}
//       <section className="relative px-6 py-28 text-center overflow-hidden">
//         <div className="orb orb-1" style={{ opacity: 0.5 }} />
//         <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-4">Get started today</p>
//         <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
//           Stop leaving money on the table
//         </h2>
//         <p className="text-gray-400 mb-10 max-w-lg mx-auto">
//           Create your free account and start billing clients in under 2 minutes.
//           No credit card required.
//         </p>
//         <Link to="/signup" className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-lg font-semibold text-white">
//           Create Free Account <ArrowRight size={18} />
//         </Link>
//       </section>

//       <div className="divider" />

//       {/* ─── FOOTER ─── */}
//       <footer className="px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-10 mb-12">
//             {/* Brand */}
//             <div className="md:col-span-2">
//               <div className="font-display text-2xl font-bold text-white mb-3">
//                 Bill<span className="text-purple-400">By</span>Time
//               </div>
//               <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
//                 The simplest way for freelancers and small businesses to track time and bill clients — accurately, every time.
//               </p>
//             </div>

//             {/* Links */}
//             <div>
//               <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Product</p>
//               <ul className="space-y-2">
//                 {["Dashboard", "Reports", "All Users"].map(l => (
//                   <li key={l}><span className="text-gray-500 text-sm hover:text-purple-400 transition cursor-pointer">{l}</span></li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Account</p>
//               <ul className="space-y-2">
//                 {[
//                   { label: "Login", to: "/login" },
//                   { label: "Sign Up", to: "/signup" },
//                 ].map(l => (
//                   <li key={l.label}>
//                     <Link to={l.to} className="text-gray-500 text-sm hover:text-purple-400 transition">{l.label}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="divider mb-6" />

//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-600 text-sm">
//               © {new Date().getFullYear()} BillByTime. All rights reserved.
//             </p>
//             <p className="text-gray-700 text-xs">
//               Built for freelancers who value their time 🕐
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



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
