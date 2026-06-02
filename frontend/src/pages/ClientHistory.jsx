import Sidebar from "../component/sidebare";
import { useEffect, useState } from "react";
import { getClientHistoryAPI } from "../services/dashboardService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ClientHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadHistory(new Date());
  }, []);

  const loadHistory = async (date) => {
    try {
      setLoading(true);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const data = await getClientHistoryAPI(formattedDate);
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("History error:", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return "0s";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return (
      [h ? `${h}h` : "", m ? `${m}m` : "", s ? `${s}s` : ""]
        .filter(Boolean)
        .join(" ") || "0s"
    );
  };

  const totalRevenue = history.reduce((sum, i) => sum + (i.amount || 0), 0);
  const totalTime = history.reduce((sum, i) => sum + (i.duration || 0), 0);
  const totalSessions = history.length;

  const filteredHistory = history.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      item.customer?.name?.toLowerCase().includes(q) ||
      item.customer?.email?.toLowerCase().includes(q) ||
      item.pricing?.type?.toLowerCase().includes(q) ||
      item.name?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q)
    );
  });

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex overflow-hidden font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile, slide-in on toggle */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-transform duration-300
          lg:relative lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 lg:hidden sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5 text-gray-700"
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
          </button>
          <span className="font-bold text-gray-900 text-base">
            Client History
          </span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* ── HEADER ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-gray-950 tracking-tight">
                Client History
              </h1>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                {isToday
                  ? "Today's sessions"
                  : `Sessions for ${selectedDate.toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}`}
              </p>
            </div>

            {/* Mobile subtitle */}
            <p className="text-sm text-gray-500 font-medium lg:hidden">
              {isToday
                ? "Today's sessions"
                : selectedDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
            </p>

            {/* Date Picker */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-sm self-start sm:self-auto">
              <svg
                className="w-4 h-4 text-gray-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  loadHistory(date);
                }}
                dateFormat="dd MMM yyyy"
                maxDate={new Date()}
                className="outline-none text-sm font-semibold text-gray-800 bg-transparent cursor-pointer w-28"
              />
            </div>
          </div>

          {/* ── SEARCH BAR ── */}
          <div className="mb-5 relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
            <input
              type="text"
              placeholder="Search by name, email or billing type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition text-sm shadow-sm font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            )}
          </div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <StatCard
              title="TOTAL SESSIONS"
              value={totalSessions}
              sub="completed jobs"
            />
            <StatCard
              title="TOTAL EARNINGS"
              value={`₹${totalRevenue.toFixed(2)}`}
              sub="selected date revenue"
              accent
            />
            <StatCard
              title="TIME TRACKED"
              value={formatTime(totalTime)}
              sub="selected date"
            />
          </div>

          {/* ── TABLE (desktop) / CARDS (mobile) ── */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table header info */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-bold text-gray-900">
                  Session History
                </h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {loading
                    ? "Loading..."
                    : search
                      ? `${filteredHistory.length} of ${totalSessions} record${totalSessions !== 1 ? "s" : ""} match "${search}"`
                      : `${totalSessions} record${totalSessions !== 1 ? "s" : ""} found`}
                </p>
              </div>
              {!loading && totalSessions > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                  ₹{totalRevenue.toFixed(2)} total
                </span>
              )}
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span className="ml-3 text-sm text-gray-400">
                  Loading history...
                </span>
              </div>
            ) : filteredHistory.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16 text-gray-400 px-4">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm font-medium">
                  {search
                    ? `No results for "${search}"`
                    : "No sessions found for this date"}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {search
                    ? "Try a different search term"
                    : "Try selecting a different date"}
                </p>
              </div>
            ) : (
              <>
                {/* ── Desktop Table (md and up) ── */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-6 px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 bg-gray-100">
                    <p className="col-span-1">Client</p>
                    <p>Type</p>
                    <p>Duration</p>
                    <p>Amount</p>
                    <p>End Time</p>
                    <p>Status</p>
                  </div>
                  {filteredHistory.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-6 px-5 py-4 border-t border-gray-100 items-center hover:bg-gray-50/70 transition-colors duration-150"
                    >
                      <div className="col-span-1 min-w-0 pr-2">
                        <p className="font-bold text-gray-900 text-sm truncate">
                          {item.customer?.name || item.name || "—"}
                        </p>
                        <p className="text-xs text-gray-400 font-medium truncate">
                          {item.customer?.email || item.email || ""}
                        </p>
                      </div>
                      <p>
                        <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs font-bold">
                          {item.pricing?.type || item.pricingType || "—"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-800 font-semibold">
                        {formatTime(item.duration)}
                      </p>
                      <p className="text-sm font-bold text-emerald-700 font-mono">
                        ₹{Number(item.amount || 0).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {item.endTime
                          ? new Date(item.endTime).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </p>
                      <p>
                        <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Completed
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* ── Mobile Cards (below md) ── */}
                <div className="md:hidden divide-y divide-gray-100">
                  {filteredHistory.map((item) => (
                    <div
                      key={item._id}
                      className="px-4 py-4 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Top row: name + amount */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">
                            {item.customer?.name || item.name || "—"}
                          </p>
                          <p className="text-xs text-gray-400 font-medium truncate">
                            {item.customer?.email || item.email || ""}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-emerald-700 font-mono shrink-0">
                          ₹{Number(item.amount || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* Bottom row: tags + metadata */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs font-bold">
                          {item.pricing?.type || item.pricingType || "—"}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold">
                          {formatTime(item.duration)}
                        </span>
                        {item.endTime && (
                          <span className="text-xs text-gray-400">
                            {new Date(item.endTime).toLocaleTimeString(
                              "en-IN",
                              { hour: "2-digit", minute: "2-digit" },
                            )}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold ml-auto">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, accent = false }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
        {title}
      </p>
      <h2
        className={`font-bold tracking-tight text-2xl sm:text-3xl ${accent ? "text-emerald-700 font-mono" : "text-gray-950"}`}
      >
        {value}
      </h2>
      {sub && <p className="text-xs mt-1.5 font-medium text-gray-400">{sub}</p>}
    </div>
  );
}
