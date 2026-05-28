import Sidebar from "../component/sidebare";
import { useState, useEffect } from "react";
import { createInvoiceAPI } from "../services/dashboardService";
import {
  getDashboardStats,
  getCustomers,
  startTimerAPI,
  createCustomerAPI,
  stopTimerAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
} from "../services/dashboardService";
import toast from "react-hot-toast";
import { customerSchema } from "../validation/customerSchema";
import InputModal from "../component/InputModal";

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  type: "hourly",
  ratePerHour: "",
  fixedAmount: "",
  pricePerUnit: "",
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({
    totalClients: 0,
    activeNow: 0,
    totalEarned: 0,
    totalTime: "0s",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, client: null });
  const [inputModal, setInputModal] = useState({
    open: false,
    type: null,
    client: null,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const statsData = await getDashboardStats();
      const customerData = await getCustomers();
      setStats(statsData);
      const data = Array.isArray(customerData) ? customerData : [];
      setClients(
        data.map((item) => ({
          ...item,
          amount: item.amount || 0,
          duration: item.duration || 0,
          isRunning: item.isRunning || false,
          timerId: item.timerId || null,
        })),
      );
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closeForm = () => {
    setShowForm(false);
    setForm(defaultForm);
    setErrors({});
    setEditingId(null);
  };

  const openEdit = (c) => {
    const pricing = c.pricing || {};
    setForm({
      name: c.name || "",
      email: c.email || "",
      phone: c.phone || "",
      type: pricing.type || "hourly",
      ratePerHour: pricing.ratePerHour?.toString() || "",
      fixedAmount: pricing.fixedAmount?.toString() || "",
      pricePerUnit: pricing.pricePerUnit?.toString() || "",
    });
    setEditingId(c._id);
    setShowForm(true);
  };

  const handleDelete = async (c) => {
    try {
      await deleteCustomerAPI(c._id);
      setClients((prev) => {
        const updated = prev.filter((item) => item._id !== c._id);
        setStats((s) => ({ ...s, totalClients: updated.length }));
        return updated;
      });
      setDeleteModal({ open: false, client: null });
      toast.success(`${c.name} deleted successfully`);
    } catch (err) {
      setDeleteModal({ open: false, client: null });
      toast.error("Failed to delete client");
    }
  };

  const handleStart = async (c) => {
    if (c.isRunning) return;
    const pricing = {
      ...c.pricing,
      ratePerHour: Number(c.pricing?.ratePerHour),
      fixedAmount: Number(c.pricing?.fixedAmount),
      pricePerUnit: Number(c.pricing?.pricePerUnit),
    };
    try {
      customerSchema.parse({
        name: c.name,
        email: c.email,
        phone: c.phone,
        pricing: c.pricing,
      });
    } catch (err) {
      toast.error(err.issues?.[0]?.message || "Invalid client data");
      return;
    }
    try {
      const res = await startTimerAPI({
        customerId: c._id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        pricing,
      });
      setClients((prev) =>
        prev.map((item) =>
          item._id === c._id
            ? {
                ...item,
                isRunning: true,
                timerId: res._id,
                startTime: res.startTime,
              }
            : item,
        ),
      );
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to start timer";
      toast.error(msg);
    }
  };

  const handleStop = async (c) => {
    if (!c.timerId) {
      toast.error("No active timer. Please refresh.");
      return;
    }
    if (c.pricing?.type === "perunit") {
      setInputModal({ open: true, type: "perunit", client: c });
      return;
    }
    if (c.pricing?.type === "manual") {
      setInputModal({ open: true, type: "manual", client: c });
      return;
    }
    try {
      const res = await stopTimerAPI(c.timerId, {});
      await createInvoiceAPI({
        customerId: c._id,
        name: c.name,
        email: c.email,
        duration: res.durationInSeconds,
        amount: res.amount,
        pricingType: c.pricing?.type,
        startTime: c.startTime || res.startTime,
        endTime: res.endTime,
        notes: "",
      });
      setClients((prev) =>
        prev.map((item) =>
          item._id === c._id
            ? {
                ...item,
                isRunning: false,
                duration: res.durationInSeconds,
                amount: res.amount,
                timerId: null,
              }
            : item,
        ),
      );
      toast.success("Stopped & invoice created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to stop timer");
    }
  };

  const stopTimerDirect = async (c, payload) => {
    try {
      const res = await stopTimerAPI(c.timerId, payload);
      await createInvoiceAPI({
        customerId: c._id,
        name: c.name,
        email: c.email,
        duration: res.durationInSeconds,
        amount: res.amount,
        pricingType: c.pricing?.type,
        startTime: c.startTime || res.startTime,
        endTime: res.endTime,
        notes: "",
      });
      setClients((prev) =>
        prev.map((item) =>
          item._id === c._id
            ? {
                ...item,
                isRunning: false,
                duration: res.durationInSeconds,
                amount: res.amount,
                timerId: null,
              }
            : item,
        ),
      );
      toast.success("Stopped successfully");
    } catch (err) {
      toast.error("Stop failed");
      throw err;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    try {
      customerSchema.parse({
        name: form.name,
        email: form.email,
        phone: form.phone,
        pricing: {
          type: form.type,
          ratePerHour: Number(form.ratePerHour),
          fixedAmount: Number(form.fixedAmount),
          pricePerUnit: Number(form.pricePerUnit),
        },
      });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.issues.forEach((e) => {
        newErrors[e.path.join(".")] = e.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const buildPricing = () => {
    switch (form.type) {
      case "hourly":
        return { type: "hourly", ratePerHour: Number(form.ratePerHour) };
      case "fixed":
        return { type: "fixed", fixedAmount: Number(form.fixedAmount) };
      case "perunit":
        return { type: "perunit", pricePerUnit: Number(form.pricePerUnit) };
      case "manual":
        return { type: "manual" };
      default:
        return { type: "hourly" };
    }
  };

  const addClient = async () => {
    setErrors({});
    if (!validateForm()) return;
    const pricing = buildPricing();
    try {
      if (editingId) {
        const updated = await updateCustomerAPI(editingId, {
          name: form.name,
          email: form.email,
          phone: form.phone,
          pricing,
        });
        setClients((prev) =>
          prev.map((item) =>
            item._id === editingId ? { ...item, ...updated } : item,
          ),
        );
      } else {
        const saved = await createCustomerAPI({
          name: form.name,
          email: form.email,
          phone: form.phone,
          pricing,
        });
        setClients((prev) => [
          ...prev,
          { ...saved, isRunning: false, timerId: null, amount: 0, duration: 0 },
        ]);
      }
      closeForm();
    } catch (err) {
      if (err.response?.data?.message === "Customer already exists") {
        toast.error("Client already exists");
        closeForm();
        return;
      }
    }
  };

  const uniqueClients = [];
  clients.forEach((c) => {
    if (!uniqueClients.find((u) => u.email === c.email)) uniqueClients.push(c);
  });

  const filteredClients = uniqueClients.filter((c) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q) ||
      c.pricing?.type?.toLowerCase().includes(q)
    );
  });

  const activeClients = filteredClients.filter((c) => c.isRunning);
  const displayClients =
    activeTab === "active" ? activeClients : filteredClients;
  const activeCount = clients.filter((c) => c.isRunning).length;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return (
      [h ? `${h}h` : "", m ? `${m}m` : "", s ? `${s}s` : ""]
        .filter(Boolean)
        .join(" ") || "0s"
    );
  };

  const inputCls = (key) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`;

  return (
    <div className="h-screen bg-[#F5F5F0] text-gray-800 flex font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* ── HEADER ── */}
          <div className="flex justify-between items-start md:items-center mb-6 md:mb-8 gap-3">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-950 tracking-tight">
                Dashboard
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5 font-medium hidden sm:block">
                Welcome back — here's your overview
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <span className="hidden sm:block text-xs md:text-sm font-bold text-gray-800 bg-white border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm">
                ADMIN
              </span>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#1a4a3a] hover:bg-[#163d30] text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold shadow-md transition-all"
              >
                + New Client
              </button>
            </div>
          </div>

          {/* ── STATS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
            <StatCard
              title="TOTAL CLIENTS"
              value={uniqueClients.length}
              sub="registered"
            />
            <StatCard
              title="ACTIVE TIMERS"
              value={activeCount}
              sub="● Running now"
              subColor={activeCount > 0 ? "text-emerald-600" : "text-gray-400"}
            />
            <StatCard
              title="TIME TRACKED"
              value={stats.totalTime || "0s"}
              sub="this month"
            />
            <StatCard
              title="TOTAL EARNINGS"
              value={`₹${stats.totalEarned?.toFixed(2) || "0.00"}`}
              sub="all sessions"
              accent
            />
          </div>

          {loading && (
            <div className="flex items-center justify-center py-6">
              <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          )}

          {/* ── SEARCH ── */}
          <div className="mb-4 relative">
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
              placeholder="Search by name, email, phone or type..."
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

          {/* ── TABS ── */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition ${activeTab === "all" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              All ({filteredClients.length})
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition ${activeTab === "active" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Active ({activeClients.length})
            </button>
          </div>

          {/* ── TABLE (desktop) / CARDS (mobile) ── */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Desktop table header — hidden on mobile */}
            <div className="hidden lg:grid lg:grid-cols-9 px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 bg-gray-100">
              <p>Client</p>
              <p>Email</p>
              <p>Phone</p>
              <p>Type</p>
              <p>Status</p>
              <p>Duration</p>
              <p>Amount</p>
              <p>Timer</p>
              <p>Actions</p>
            </div>

            {displayClients.length === 0 ? (
              <div className="text-center py-14 text-gray-400">
                <svg
                  className="w-10 h-10 mx-auto mb-3 text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-sm font-medium">
                  {activeTab === "active"
                    ? "No active clients."
                    : search
                      ? `No results for "${search}"`
                      : "No clients yet."}
                </p>
              </div>
            ) : (
              <div>
                {displayClients
                  .filter((c) => c.name?.trim())
                  .map((c) => (
                    <div key={`${c._id}-${c.timerId || "x"}`}>
                      {/* ── DESKTOP ROW ── */}
                      <div className="hidden lg:grid lg:grid-cols-9 gap-2 px-5 py-4 border-t border-gray-100 items-center hover:bg-gray-50/70 transition-colors">
                        <p className="font-bold text-gray-900 text-sm truncate">
                          {c.name}
                        </p>
                        <p className="text-sm text-gray-700 truncate font-medium">
                          {c.email || "-"}
                        </p>
                        <p className="text-sm text-gray-700 font-medium">
                          {c.phone || "-"}
                        </p>
                        <p>
                          <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs font-bold">
                            {c.pricing?.type || "-"}
                          </span>
                        </p>
                        <p>
                          {c.isRunning ? (
                            <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Running
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              Stopped
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-800 font-semibold">
                          {c.duration ? formatTime(c.duration) : "-"}
                        </p>
                        <p className="text-sm font-bold text-emerald-700 font-mono">
                          {c.amount ? `₹${c.amount}` : "-"}
                        </p>
                        <div>
                          <button
                            onClick={() =>
                              c.isRunning ? handleStop(c) : handleStart(c)
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${c.isRunning ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"}`}
                          >
                            {c.isRunning ? "Stop" : "Start"}
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(c)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({ open: true, client: c })
                            }
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition text-red-500"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* ── MOBILE CARD ── */}
                      <div className="lg:hidden border-t border-gray-100 px-4 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate">
                              {c.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {c.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="capitalize bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-xs font-bold">
                              {c.pricing?.type}
                            </span>
                            {c.isRunning ? (
                              <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Running
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-gray-400 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                Stopped
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div>
                              <p className="text-xs text-gray-400 font-medium">
                                Duration
                              </p>
                              <p className="text-sm font-semibold text-gray-800">
                                {c.duration ? formatTime(c.duration) : "—"}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 font-medium">
                                Amount
                              </p>
                              <p className="text-sm font-bold text-emerald-700 font-mono">
                                {c.amount ? `₹${c.amount}` : "—"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                c.isRunning ? handleStop(c) : handleStart(c)
                              }
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${c.isRunning ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}
                            >
                              {c.isRunning ? "Stop" : "Start"}
                            </button>
                            <button
                              onClick={() => openEdit(c)}
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-600"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                setDeleteModal({ open: true, client: c })
                              }
                              className="p-1.5 rounded-lg bg-red-50 text-red-500"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {search && (
            <p className="text-xs text-gray-400 mt-3">
              Showing {filteredClients.length} of {uniqueClients.length} clients
            </p>
          )}
        </div>

        {/* ── ADD / EDIT MODAL ── */}
        {showForm && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50 p-4"
            onClick={closeForm}
          >
            <div
              className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#1a4a3a] px-6 py-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">
                  {editingId ? "Edit Client" : "Add New Client"}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-white/60 hover:text-white transition"
                >
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
                </button>
              </div>
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Client Info
                  </p>
                  <div className="space-y-3">
                    <div>
                      <input
                        name="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputCls("name")}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        disabled={!!editingId}
                        className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${editingId ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200" : errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        name="phone"
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          })
                        }
                        className={inputCls("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Pricing
                  </p>
                  <div className="space-y-3">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="fixed">Fixed</option>
                      <option value="perunit">Per Unit</option>
                      <option value="manual">Manual</option>
                    </select>
                    {form.type === "hourly" && (
                      <div>
                        <input
                          name="ratePerHour"
                          placeholder="Rate per hour (₹)"
                          type="number"
                          min="0"
                          value={form.ratePerHour}
                          onChange={handleChange}
                          className={inputCls("pricing.ratePerHour")}
                        />
                        {errors["pricing.ratePerHour"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["pricing.ratePerHour"]}
                          </p>
                        )}
                      </div>
                    )}
                    {form.type === "fixed" && (
                      <div>
                        <input
                          name="fixedAmount"
                          placeholder="Fixed amount (₹)"
                          type="number"
                          min="0"
                          value={form.fixedAmount}
                          onChange={handleChange}
                          className={inputCls("pricing.fixedAmount")}
                        />
                        {errors["pricing.fixedAmount"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["pricing.fixedAmount"]}
                          </p>
                        )}
                      </div>
                    )}
                    {form.type === "perunit" && (
                      <div>
                        <input
                          name="pricePerUnit"
                          placeholder="Price per unit (₹)"
                          type="number"
                          min="0"
                          value={form.pricePerUnit}
                          onChange={handleChange}
                          className={inputCls("pricing.pricePerUnit")}
                        />
                        {errors["pricing.pricePerUnit"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["pricing.pricePerUnit"]}
                          </p>
                        )}
                      </div>
                    )}
                    {form.type === "manual" && (
                      <p className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                        Amount will be entered manually at stop.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={addClient}
                  className="w-full py-2.5 bg-[#1a4a3a] hover:bg-[#163d30] text-white rounded-xl font-semibold text-sm transition-all shadow-md"
                >
                  {editingId ? "Update Client" : "Save Client"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── DELETE MODAL ── */}
        {deleteModal.open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Delete Client
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                Delete{" "}
                <span className="font-semibold text-gray-900">
                  {deleteModal.client?.name}
                </span>
                ? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ open: false, client: null })}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModal.client)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <InputModal
          open={inputModal.open}
          title={
            inputModal.type === "manual"
              ? `Enter amount for ${inputModal.client?.name}`
              : `Enter units for ${inputModal.client?.name}`
          }
          label={inputModal.type === "manual" ? "Amount ₹" : "Units"}
          onClose={() =>
            setInputModal({ open: false, type: null, client: null })
          }
          onSubmit={async (value) => {
            const c = inputModal.client;
            const payload =
              inputModal.type === "manual"
                ? { manualAmount: value }
                : { units: value };
            await stopTimerDirect(c, payload);
            setInputModal({ open: false, type: null, client: null });
          }}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  sub,
  subColor = "text-gray-400",
  accent = false,
}) {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 md:mb-3">
        {title}
      </p>
      <h2
        className={`font-bold tracking-tight text-2xl md:text-3xl ${accent ? "text-emerald-700 font-mono" : "text-gray-950"}`}
      >
        {value}
      </h2>
      {sub && (
        <p className={`text-xs mt-1 md:mt-1.5 font-medium ${subColor}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
