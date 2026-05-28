// component/SuccessPopup.jsx
// Usage:
//   import { SignupSuccessPopup, LoginSuccessPopup } from "../component/SuccessPopup";

// -------------Shared base popup----------------------------------------------------------
function SuccessPopup({ icon, badge, badgeColor, title, subtitle, steps, onContinue, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-[#1a4a3a]" />

        <div className="p-7 text-center">
          {/* Icon ring */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: icon.bg }}
          >
            <svg className="w-7 h-7" fill="none" stroke={icon.stroke} viewBox="0 0 24 24">
              {icon.path}
            </svg>
          </div>

          {/* Badge */}
          <span
            className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide uppercase"
            style={{ background: badgeColor.bg, color: badgeColor.text }}
          >
            {badge}
          </span>

          {/* Title & subtitle */}
          <h2 className="text-xl font-bold text-gray-950 tracking-tight mb-1">{title}</h2>
          <p className="text-sm text-gray-500 font-medium mb-5 leading-relaxed">{subtitle}</p>

          {/* Steps */}
          <div className="text-left space-y-3 mb-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#1a4a3a] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">{step.title}</span>
                  {" — "}{step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={onContinue}
            className="w-full py-2.5 bg-[#1a4a3a] hover:bg-[#163d30] text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md mb-2"
          >
            Go to Dashboard →
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-400 hover:text-gray-600 text-sm font-medium transition"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Signup celebration popup ─────────────────────────────────────────────────
export function SignupSuccessPopup({ onContinue, onClose }) {
  return (
    <SuccessPopup
      icon={{
        bg: "#d1fae5",
        stroke: "#065f46",
        path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      }}
      badge="Account created"
      badgeColor={{ bg: "#d1fae5", text: "#065f46" }}
      title="Welcome to TimeBill!"
      subtitle="Your account is ready. Here's how to get started in 3 simple steps."
      steps={[
        { title: "Add your first client", desc: 'Go to Dashboard and click "+ New Client"' },
        { title: "Start a timer",         desc: "Hit the green Start button next to any client" },
        { title: "Generate an invoice",   desc: "Stop the timer and an invoice is auto-created" },
      ]}
      onContinue={onContinue}
      onClose={onClose}
    />
  );
}

// ─── Login welcome-back popup ─────────────────────────────────────────────────
export function LoginSuccessPopup({ onContinue, onClose }) {
  return (
    <SuccessPopup
      icon={{
        bg: "#dbeafe",
        stroke: "#1e40af",
        path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />,
      }}
      badge="Login successful"
      badgeColor={{ bg: "#dbeafe", text: "#1e40af" }}
      title="Welcome back!"
      subtitle="You're logged in and ready to go. Pick up right where you left off."
      steps={[
        { title: "View your dashboard", desc: "Check today's active sessions and earnings" },
        { title: "Check invoices",      desc: "Review and download pending billing records" },
        { title: "Start billing",       desc: "Hit Start on a client to begin tracking time" },
      ]}
      onContinue={onContinue}
      onClose={onClose}
    />
  );
}