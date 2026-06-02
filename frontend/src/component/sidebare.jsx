// import { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const navItems = [
//     {
//       section: "MAIN",
//       items: [
//         { to: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
//         // { to: "/timers", icon: TimerIcon, label: "Timers" },
//         { to: "/history", icon: HistoryIcon, label: "Client History" },
//         { to: "/invoices", icon: InvoiceIcon, label: "Invoices" },
//         { to: "/reports", icon: ReportsIcon, label: "Reports" },
//       ],
//     },
//   ];

//   return (
//     <div
//       className={`h-screen ${isOpen ? "w-56" : "w-[70px]"} 
//         transition-all duration-300 flex flex-col
//         bg-[#111c18] border-r border-white/5 shrink-0`}
//     >
//       {/* LOGO */}
//       <div
//         className={`flex items-center ${isOpen ? "px-5" : "justify-center"} h-16 border-b border-white/5`}
//       >
//         <div className="flex items-center gap-2.5">
//           <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
//             <svg
//               className="w-4 h-4 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2.5}
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           {isOpen && (
//             <span className="text-white font-bold text-base tracking-tight">
//               BILLBYTIME
//             </span>
//           )}
//         </div>
//       </div>

//       {/* NAV */}
//       <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
//         {navItems.map(({ section, items }) => (
//           <div key={section}>
//             {isOpen && (
//               <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">
//                 {section}
//               </p>
//             )}
//             <div className="space-y-0.5">
//               {items.map(({ to, icon: Icon, label }) => {
//                 const isActive = location.pathname === to;
//                 return (
//                   <Link to={to} key={to}>
//                     <div
//                       className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
//                         ${
//                           isActive
//                             ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
//                             : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
//                         }
//                         ${!isOpen ? "justify-center" : ""}
//                       `}
//                     >
//                       <Icon
//                         className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}
//                       />
//                       {isOpen && (
//                         <span className="text-sm font-medium">{label}</span>
//                       )}
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* USER + LOGOUT */}
//       <div className="border-t border-white/5 p-3">
//         {isOpen ? (
//           <div
//             className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition cursor-pointer group"
//             onClick={logout}
//           >
//             <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
//               AD
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-white text-xs font-semibold truncate">
//                 Admin User
//               </p>
//               <p className="text-gray-500 text-[10px] truncate">Owner</p>
//             </div>
//             <svg
//               className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-400 transition shrink-0"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//           </div>
//         ) : (
//           <button
//             onClick={logout}
//             className="w-full flex items-center justify-center py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition"
//             title="Logout"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//           </button>
//         )}

//         {/* Collapse toggle */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={`mt-2 w-full flex items-center ${isOpen ? "justify-end px-2" : "justify-center"} py-1.5 text-gray-600 hover:text-gray-300 transition text-xs`}
//         >
//           <svg
//             className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "" : "rotate-180"}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ─── Icon Components ─── */
// function DashboardIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"
//       />
//     </svg>
//   );
// }

// function HistoryIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 8v4l2 2m6-2a8 8 0 11-3-6.3M20 4v5h-5"
//       />
//     </svg>
//   );
// }

// function InvoiceIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//       />
//     </svg>
//   );
// }

// function ReportsIcon({ className }) {
//   return (
//     <svg
//       className={className}
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
//       />
//     </svg>
//   );
// }
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen: externalOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If parent passes isOpen (mobile drawer mode), use that.
  // Otherwise fall back to internal collapsed state (desktop mode).
  const isMobileDrawer = externalOpen !== undefined;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    {
      section: "MAIN",
      items: [
        { to: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
        { to: "/history",   icon: HistoryIcon,   label: "Client History" },
        { to: "/invoices",  icon: InvoiceIcon,   label: "Invoices" },
        { to: "/reports",   icon: ReportsIcon,   label: "Reports" },
      ],
    },
  ];

  // On mobile: always show labels (drawer is full-width enough).
  // On desktop: respect collapsed toggle.
  const showLabels = isMobileDrawer ? true : !collapsed;

  return (
    <div
      className={`
        h-full flex flex-col bg-[#111c18] border-r border-white/5 shrink-0
        transition-all duration-300
        ${isMobileDrawer ? "w-64" : collapsed ? "w-[70px]" : "w-56"}
      `}
    >
      {/* ── LOGO ── */}
      <div
        className={`flex items-center ${showLabels ? "px-5" : "justify-center"} h-16 border-b border-white/5 shrink-0`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {showLabels && (
            <span className="text-white font-bold text-base tracking-tight">BILLBYTIME</span>
          )}
        </div>

        {/* Close button — mobile drawer only */}
        {isMobileDrawer && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-200 transition p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── NAV ── */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5">
        {navItems.map(({ section, items }) => (
          <div key={section}>
            {showLabels && (
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">
                {section}
              </p>
            )}
            <div className="space-y-0.5">
              {items.map(({ to, icon: Icon, label }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    to={to}
                    key={to}
                    onClick={isMobileDrawer ? onClose : undefined}
                  >
                    <div
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                        ${isActive
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                          : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                        }
                        ${!showLabels ? "justify-center" : ""}
                      `}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}
                      />
                      {showLabels && (
                        <span className="text-sm font-medium">{label}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── USER + LOGOUT ── */}
      <div className="border-t border-white/5 p-3 shrink-0">
        {showLabels ? (
          <div
            className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition cursor-pointer group"
            onClick={logout}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Admin User</p>
              <p className="text-gray-500 text-[10px] truncate">Owner</p>
            </div>
            <svg
              className="w-3.5 h-3.5 text-gray-500 group-hover:text-red-400 transition shrink-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        ) : (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition"
            title="Logout"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        )}

        {/* Collapse toggle — desktop only */}
        {!isMobileDrawer && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`mt-2 w-full flex items-center ${!collapsed ? "justify-end px-2" : "justify-center"} py-1.5 text-gray-600 hover:text-gray-300 transition text-xs`}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Icons ─── */
function DashboardIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-3a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
    </svg>
  );
}

function HistoryIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4l2 2m6-2a8 8 0 11-3-6.3M20 4v5h-5" />
    </svg>
  );
}

function InvoiceIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ReportsIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}