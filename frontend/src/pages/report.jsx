import { useEffect, useState, useMemo } from "react";
import Sidebar from "../component/sidebare";
import {
  getDailyReportAPI,
  getReportInvoicesAPI,
} from "../services/dashboardService";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-bold text-gray-900 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}:{" "}
          {p.name === "Earnings (₹)"
            ? `₹${Number(p.value).toFixed(2)}`
            : p.value}
        </p>
      ))}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Reports() {
  const [daily, setDaily] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(7);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [dailyData, allInvoices] = await Promise.all([
          getDailyReportAPI(),
          getReportInvoicesAPI(),
        ]);
        setDaily(dailyData);
        setInvoices(allInvoices || []);
      } catch (err) {
        console.error("Report Error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const chartData = useMemo(() => {
    if (!invoices.length) return [];
    const map = {};
    invoices.forEach((inv) => {
      const day = new Date(inv.createdAt).toISOString().split("T")[0];
      if (!map[day]) map[day] = { date: day, earnings: 0, clients: new Set() };
      map[day].earnings += inv.amount || 0;
      if (inv.email) map[day].clients.add(inv.email);
    });
    return Object.values(map)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-range)
      .map((d) => ({
        date: formatDate(d.date),
        "Earnings (₹)": parseFloat(d.earnings.toFixed(2)),
        "Clients billed": d.clients.size,
      }));
  }, [invoices, range]);

  const typeBreakdown = useMemo(() => {
    const map = {};
    invoices.forEach((inv) => {
      const t = inv.pricingType || "manual";
      if (!map[t]) map[t] = { type: t, count: 0, total: 0 };
      map[t].count++;
      map[t].total += inv.amount || 0;
    });
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [invoices]);

  const todayInvoices = daily?.invoices || [];

  return (
    <div className="h-screen bg-[#F5F5F0] text-gray-800 flex font-sans overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop sticky, mobile drawer */}
      <div className="hidden lg:flex h-screen sticky top-0 shrink-0">
        <Sidebar />
      </div>
      <div
        className={`fixed inset-y-0 left-0 z-30 lg:hidden transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main — only this scrolls */}
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
          <span className="font-bold text-gray-900 text-base">Reports</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* ── HEADER ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 lg:mb-8">
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-gray-950 tracking-tight">
                Reports
              </h1>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {/* Mobile date */}
            <p className="text-xs text-gray-400 font-medium lg:hidden">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Range selector */}
            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1 shadow-sm self-start sm:self-auto">
              {[7, 14, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => setRange(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    range === d
                      ? "bg-[#1a4a3a] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="ml-3 text-sm text-gray-500">
                Loading report...
              </span>
            </div>
          ) : (
            <>
              {/* ── STAT CARDS ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 lg:mb-8">
                <StatCard
                  title="TODAY'S EARNINGS"
                  value={`₹${(daily?.totalAmount || 0).toFixed(2)}`}
                  sub="from today's sessions"
                  accent
                />
                <StatCard
                  title="TIME TRACKED TODAY"
                  value={formatTime(daily?.totalTime || 0)}
                  sub="across all clients"
                />
                <StatCard
                  title="CLIENTS BILLED TODAY"
                  value={daily?.totalCustomers || 0}
                  sub="unique clients"
                />
              </div>

              {/* ── CHARTS ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6 lg:mb-8">
                {/* Earnings chart */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">
                        Total Earnings
                      </h2>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        Last {range} days
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                      ₹
                      {invoices
                        .reduce((s, i) => s + (i.amount || 0), 0)
                        .toFixed(2)}{" "}
                      total
                    </span>
                  </div>
                  {chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-gray-300 text-sm">
                      No data yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart
                        data={chartData}
                        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="earningsGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#1a4a3a"
                              stopOpacity={0.15}
                            />
                            <stop
                              offset="95%"
                              stopColor="#1a4a3a"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 10, fill: "#9ca3af" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: "#9ca3af" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="Earnings (₹)"
                          stroke="#1a4a3a"
                          strokeWidth={2.5}
                          fill="url(#earningsGrad)"
                          dot={{ r: 3, fill: "#1a4a3a", strokeWidth: 0 }}
                          activeDot={{ r: 5, fill: "#1a4a3a" }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Clients billed chart */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">
                        Clients Billed
                      </h2>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        Last {range} days
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                      {
                        new Set(invoices.map((i) => i.email).filter(Boolean))
                          .size
                      }{" "}
                      unique
                    </span>
                  </div>
                  {chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-gray-300 text-sm">
                      No data yet
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart
                        data={chartData}
                        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 10, fill: "#9ca3af" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: "#9ca3af" }}
                          axisLine={false}
                          tickLine={false}
                          allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="Clients billed"
                          fill="#1a4a3a"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* ── BOTTOM ROW ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Pricing type breakdown */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <h2 className="text-sm font-bold text-gray-900">
                      Revenue by Pricing Type
                    </h2>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      All time breakdown
                    </p>
                  </div>
                  {typeBreakdown.length === 0 ? (
                    <div className="text-center py-10 text-gray-300 text-sm">
                      No data yet
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {typeBreakdown.map((t) => {
                        const totalEarnings = typeBreakdown.reduce(
                          (s, x) => s + x.total,
                          0,
                        );
                        const pct =
                          totalEarnings > 0
                            ? Math.round((t.total / totalEarnings) * 100)
                            : 0;
                        return (
                          <div key={t.type} className="px-5 py-3.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs font-bold">
                                  {t.type}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                  {t.count} invoice{t.count !== 1 ? "s" : ""}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-emerald-700 font-mono">
                                ₹{t.total.toFixed(2)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className="bg-[#1a4a3a] h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-1 font-medium">
                              {pct}% of total revenue
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Today's invoices */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">
                        Today's Invoices
                      </h2>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {todayInvoices.length} record
                        {todayInvoices.length !== 1 ? "s" : ""} today
                      </p>
                    </div>
                    {todayInvoices.length > 0 && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                        ₹{(daily?.totalAmount || 0).toFixed(2)} today
                      </span>
                    )}
                  </div>
                  {todayInvoices.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <svg
                        className="w-10 h-10 mx-auto mb-2 text-gray-200"
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
                        No invoices today yet
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                      {todayInvoices.map((inv) => (
                        <div
                          key={inv._id}
                          className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/70 transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {inv.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="capitalize bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs font-bold">
                                {inv.pricingType || "manual"}
                              </span>
                              <span className="text-xs text-gray-400 font-medium">
                                {formatTime(inv.duration)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm font-bold text-emerald-700 font-mono ml-4 shrink-0">
                            ₹{Number(inv.amount).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, sub, accent = false }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
        {title}
      </p>
      <h2
        className={`font-bold tracking-tight text-2xl sm:text-3xl ${accent ? "text-emerald-700 font-mono" : "text-gray-950"}`}
      >
        {value}
      </h2>
      {sub && (
        <p className="text-xs mt-1 sm:mt-1.5 font-medium text-gray-400">
          {sub}
        </p>
      )}
    </div>
  );
}
