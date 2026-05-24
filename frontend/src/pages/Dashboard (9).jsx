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
    const [activeTab, setActiveTab] = useState("all");// add for seprate active user table
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(defaultForm);
    const [errors, setErrors] = useState({});
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        client: null,
    });

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         const statsData = await getDashboardStats();
    //         const customerData = await getCustomers(); // hits /dashboard/clients
    //         setStats(statsData);

    //         // getDashboardClients returns isRunning + timerId already
    //         const data = Array.isArray(customerData) ? customerData : customerData.data || [];
    //         setClients(
    //             data.map((item) => ({
    //                 ...item,
    //                 amount: item.amount || 0,
    //                 duration: item.duration || 0,
    //             }))
    //         );
    //     } catch (err) {
    //         console.error("Dashboard Error:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchData = async () => {
        try {
            setLoading(true);

            console.log("🚀 FETCHING DASHBOARD DATA...");

            const statsData = await getDashboardStats();
            const customerData = await getCustomers();

            console.log("📊 STATS:", statsData); // ✅ DEBUG
            console.log("👥 RAW CUSTOMERS:", customerData); // ✅ DEBUG

            setStats(statsData);

            // ✅ STRICT handling (your backend returns ARRAY)
            let data = [];

            if (Array.isArray(customerData)) {
                data = customerData;
                console.log("✅ USING ARRAY DATA");
            } else {
                console.warn("⚠️ NOT ARRAY RESPONSE:", customerData);
            }

            console.log("📦 FINAL CLIENT DATA:", data); // ✅ DEBUG

            setClients(
                data.map((item) => ({
                    ...item,
                    amount: item.amount || 0,
                    duration: item.duration || 0,
                    isRunning: item.isRunning || false,
                    timerId: item.timerId || null,
                }))
            );

        } catch (err) {
            console.error("❌ Dashboard Error:", err);
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

    // const handleDelete = async (c) => {
    //     if (!window.confirm(`Delete "${c.name}"? This cannot be undone.`)) return;
    //     try {
    //         await deleteCustomerAPI(c._id);
    //         setClients((prev) => prev.filter((item) => item._id !== c._id));
    //     } catch (err) {
    //         console.error("Delete Error:", err);
    //         alert("Failed to delete client.");
    //     }
    // };

    const handleDelete = async (c) => {
    try {
        await deleteCustomerAPI(c._id);

        setClients((prev) => {
            const updated = prev.filter((item) => item._id !== c._id);

            setStats((prevStats) => ({
                ...prevStats,
                totalClients: updated.length,
            }));

            return updated;
        });

        // ✅ CLOSE MODAL FIRST
        setDeleteModal({ open: false, client: null });

        // ✅ THEN SHOW TOAST
        toast.success(`${c.name} deleted successfully ✅`);

    } catch (err) {
        console.error("Delete Error:", err);

        setDeleteModal({ open: false, client: null });

        toast.error("Failed to delete client ❌");
    }
};

    // const handleDelete = async (c) => {
    //     // if (!window.confirm(`Delete "${c.name}"? This cannot be undone.`)) return;

    //     try {
    //         await deleteCustomerAPI(c._id);

    //         setClients((prev) => {
    //             const updated = prev.filter((item) => item._id !== c._id);

    //             // 🔥 update stats also
    //             setStats((prevStats) => ({
    //                 ...prevStats,
    //                 totalClients: updated.length,
    //             }));

    //             return updated;


    //             toast.success(`${c.name} deleted successfully ✅`); // 🎉 success popup
    //         });

    //     } catch (err) {
    //         console.error("Delete Error:", err);
    //         alert("Failed to delete client.");
    //     } finally {
    //         setDeleteModal({ open: false, client: null });
    //     }
    // };

    const handleStart = async (c) => {
        if (c.isRunning) return;

        const pricing = c.pricing || {};
        if (!pricing.type) {
            alert("This client has no pricing type set. Please edit the client first.");
            return;
        }
        if (pricing.type === "hourly" && !pricing.ratePerHour) {
            alert("No hourly rate set. Please edit the client first.");
            return;
        }
        if (pricing.type === "fixed" && !pricing.fixedAmount) {
            alert("No fixed amount set. Please edit the client first.");
            return;
        }
        if (pricing.type === "perunit" && !pricing.pricePerUnit) {
            alert("No price per unit set. Please edit the client first.");
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
                        ? { ...item, isRunning: true, timerId: res._id, startTime: res.startTime }
                        : item
                )
            );
        } catch (err) {
            console.error("Start Error:", err);
            const msg = err.response?.data?.message || err.response?.data?.msg || "Failed to start timer";
            alert(`Start failed: ${msg}`);
        }
    };

    const handleStop = async (c) => {
        if (!c.timerId) {
            alert("No active timer found. Please refresh the page.");
            return;
        }

        let stopPayload = {};

        if (c.pricing?.type === "perunit") {
            const unitsStr = window.prompt(`How many units did you complete for ${c.name}?`, "1");
            if (unitsStr === null) return;
            const units = parseInt(unitsStr, 10);
            if (isNaN(units) || units <= 0) {
                alert("Please enter a valid number of units.");
                return;
            }
            stopPayload = { units };
        }

        if (c.pricing?.type === "manual") {
            const amountStr = window.prompt(`Enter the billing amount for ${c.name} (₹):`, "0");
            if (amountStr === null) return;
            const manualAmount = parseFloat(amountStr);
            if (isNaN(manualAmount) || manualAmount <= 0) {
                alert("Please enter a valid amount.");
                return;
            }
            stopPayload = { manualAmount };
        }

        try {
            const res = await stopTimerAPI(c.timerId, stopPayload);
            const invoice = await createInvoiceAPI({
                customerId: c._id,
                name: c.name,
                email: c.email,
                duration: res.durationInSeconds,
                amount: res.amount,
                pricingType: c.pricing?.type,
            });
            console.log("INVOICE CREATED:", invoice);
            setClients((prev) =>
                prev.map((item) =>
                    item._id === c._id
                        ? { ...item, isRunning: false, duration: res.durationInSeconds, amount: res.amount, timerId: null }
                        : item
                )
            );
        } catch (err) {
            console.error("Stop Error:", err);
            const msg = err.response?.data?.message || err.response?.data?.msg || "Failed to stop timer";
            alert(`Stop failed: ${msg}`);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        if (form.type === "hourly" && !form.ratePerHour) newErrors.ratePerHour = "Rate per hour is required";
        if (form.type === "fixed" && !form.fixedAmount) newErrors.fixedAmount = "Fixed amount is required";
        if (form.type === "perunit" && !form.pricePerUnit) newErrors.pricePerUnit = "Price per unit is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const buildPricing = () => {
        switch (form.type) {
            case "hourly": return { type: "hourly", ratePerHour: Number(form.ratePerHour) };
            case "fixed": return { type: "fixed", fixedAmount: Number(form.fixedAmount) };
            case "perunit": return { type: "perunit", pricePerUnit: Number(form.pricePerUnit) };
            case "manual": return { type: "manual" };
            default: return { type: "hourly" };
        }
    };

    const addClient = async () => {
        setErrors({});
        if (!validateForm()) return;
        const pricing = buildPricing();
        if (form.type === "hourly" && Number(form.ratePerHour) <= 0) { setErrors((p) => ({ ...p, ratePerHour: "Enter valid hourly rate" })); return; }
        if (form.type === "fixed" && Number(form.fixedAmount) <= 0) { setErrors((p) => ({ ...p, fixedAmount: "Enter valid fixed amount" })); return; }
        if (form.type === "perunit" && Number(form.pricePerUnit) <= 0) { setErrors((p) => ({ ...p, pricePerUnit: "Enter valid price per unit" })); return; }

        try {
            if (editingId) {
                const updated = await updateCustomerAPI(editingId, {
                    name: form.name, email: form.email, phone: form.phone, pricing,
                });
                setClients((prev) =>
                    prev.map((item) => (item._id === editingId ? { ...item, ...updated } : item))
                );
            } else {
                const saved = await createCustomerAPI({
                    name: form.name, email: form.email, phone: form.phone, pricing,
                });
                setClients((prev) => [...prev, { ...saved, isRunning: false, timerId: null, amount: 0, duration: 0 }]);
            }
            closeForm();
        } catch (err) {
            if (err.response?.data?.message === "Customer already exists") {
                alert("Client already exists ✅");
                closeForm();
                return;
            }
            console.error(err);
        }
    };

    const uniqueClients = [];
    clients.forEach((c) => {
        if (!uniqueClients.find((u) => u.email === c.email)) uniqueClients.push(c);
    });

    // const filteredClients = uniqueClients.filter((c) => {
    //     const q = search.toLowerCase().trim();
    //     if (!q) return true;
    //     return (
    //         c.name?.toLowerCase().includes(q) ||
    //         c.email?.toLowerCase().includes(q) ||
    //         c.phone?.toLowerCase().includes(q) ||
    //         c.pricing?.type?.toLowerCase().includes(q)
    //     );
    // }); comment for sepration active client 

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


    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [h ? `${h}h` : "", m ? `${m}m` : "", s ? `${s}s` : ""].filter(Boolean).join(" ") || "0s";
    };

    const activeCount = clients.filter(c => c.isRunning).length;

    return (
        <div className="min-h-screen bg-[#F5F5F0] text-gray-800 flex font-sans">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-0.5 font-medium">Welcome back — here's your overview</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-800 bg-white border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm">ADMIN</span>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-[#1a4a3a] hover:bg-[#163d30] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
                        >
                            + New Client
                        </button>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                    <StatCard title="TOTAL CLIENTS" value={stats.totalClients} sub="registered" />
                    <StatCard title="ACTIVE TIMERS" value={activeCount} sub="● Running now" subColor={activeCount > 0 ? "text-emerald-600" : "text-gray-400"} />
                    <StatCard title="TIME TRACKED" value={stats.totalTime || "0s"} sub="this month" large />
                    <StatCard title="TOTAL EARNINGS" value={`₹${stats.totalEarned?.toFixed(2) || "0.00"}`} sub="all sessions" accent large />
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-sm text-gray-500">Loading...</span>
                    </div>
                )}

                {/* SEARCH */}
                <div className="mb-5 relative">
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name, email, phone or type..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition text-sm shadow-sm font-medium"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>


                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "all"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        All Clients ({filteredClients.length})
                    </button>

                    <button
                        onClick={() => setActiveTab("active")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "active"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        Active Clients ({activeClients.length})
                    </button>
                </div>
                {/* TABLE */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-9 px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 bg-gray-100">
                        <p>Client</p><p>Email</p><p>Phone</p><p>Type</p><p>Status</p><p>Duration</p><p>Amount</p><p>Timer</p><p>Actions</p>
                    </div>

                    {displayClients.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-sm">{search ? `No clients found for "${search}"` : "No clients yet. Add your first client."}</p>
                        </div>
                    ) : (
                        <div>
                            {displayClients
                                .filter((c) => c.name && c.name.trim() !== "")
                                .map((c) => (
                                    <div
                                        key={`${c._id}-${c.timerId || "noTimer"}`}
                                        className="grid grid-cols-9 gap-2 px-5 py-4 border-t border-gray-100 items-center hover:bg-gray-50/70 transition-colors duration-150"
                                    >
                                        <p className="font-bold text-gray-900 text-sm truncate">{c.name || "No Name"}</p>
                                        <p className="text-sm text-gray-700 truncate font-medium">{c.email || "-"}</p>
                                        <p className="text-sm text-gray-700 font-medium">{c.phone || "-"}</p>
                                        <p className="text-sm">
                                            <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs font-bold">
                                                {c.pricing?.type || "-"}
                                            </span>
                                        </p>
                                        <p>
                                            {c.isRunning ? (
                                                <span className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Running
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Stopped
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-800 font-semibold">{c.duration ? formatTime(c.duration) : "-"}</p>
                                        <p className="text-sm font-bold text-emerald-700 font-mono">
                                            {c.amount !== undefined && c.amount !== 0 ? `₹${c.amount}` : "-"}
                                        </p>
                                        <div>
                                            <button
                                                onClick={() => c.isRunning ? handleStop(c) : handleStart(c)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm ${c.isRunning ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"}`}
                                            >
                                                {c.isRunning ? "Stop" : "Start"}
                                            </button>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(c)} title="Edit client" className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-600">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setDeleteModal({ open: true, client: c })} title="Delete client" className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 transition text-red-500">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
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

            {/* MODAL */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50" onClick={closeForm}>
                    <div className="bg-white rounded-2xl w-96 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-[#1a4a3a] px-6 py-4 flex items-center justify-between">
                            <h2 className="text-base font-semibold text-white">{editingId ? "Edit Client" : "Add New Client"}</h2>
                            <button onClick={closeForm} className="text-white/60 hover:text-white transition">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Client Info</p>
                                <div className="space-y-3">
                                    <div>
                                        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange}
                                            className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`} />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input name="email" placeholder="Email address" value={form.email} onChange={handleChange} disabled={!!editingId}
                                            className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${editingId ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200" : errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <input name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange}
                                            className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`} />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Pricing</p>
                                <div className="space-y-3">
                                    <select name="type" value={form.type} onChange={handleChange}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition">
                                        <option value="hourly">Hourly</option>
                                        <option value="fixed">Fixed</option>
                                        <option value="perunit">Per Unit</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                    {form.type === "hourly" && (
                                        <div>
                                            <input name="ratePerHour" placeholder="Rate per hour (₹)" type="number" min="0" value={form.ratePerHour} onChange={handleChange}
                                                className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${errors.ratePerHour ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`} />
                                            {errors.ratePerHour && <p className="text-red-500 text-xs mt-1">{errors.ratePerHour}</p>}
                                        </div>
                                    )}
                                    {form.type === "fixed" && (
                                        <div>
                                            <input name="fixedAmount" placeholder="Fixed amount (₹)" type="number" min="0" value={form.fixedAmount} onChange={handleChange}
                                                className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${errors.fixedAmount ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`} />
                                            {errors.fixedAmount && <p className="text-red-500 text-xs mt-1">{errors.fixedAmount}</p>}
                                        </div>
                                    )}
                                    {form.type === "perunit" && (
                                        <div>
                                            <input name="pricePerUnit" placeholder="Price per unit (₹)" type="number" min="0" value={form.pricePerUnit} onChange={handleChange}
                                                className={`w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition ${errors.pricePerUnit ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"}`} />
                                            {errors.pricePerUnit && <p className="text-red-500 text-xs mt-1">{errors.pricePerUnit}</p>}
                                        </div>
                                    )}
                                    {form.type === "manual" && (
                                        <p className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                                            Amount will be entered manually at stop.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button onClick={addClient}
                                className="w-full py-2.5 bg-[#1a4a3a] hover:bg-[#163d30] text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg">
                                {editingId ? "Update Client" : "Save Client"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteModal.open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">

                        <h2 className="text-lg font-bold text-gray-900 mb-2">
                            Delete Client
                        </h2>

                        <p className="text-sm text-gray-600 mb-5">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-900">
                                {deleteModal.client?.name}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModal({ open: false, client: null })}
                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-semibold"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleDelete(deleteModal.client)}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, sub, subColor = "text-gray-500", accent = false }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</p>
            <h2 className={`font-bold tracking-tight text-3xl ${accent ? "text-emerald-700 font-mono" : "text-gray-950"}`}>{value}</h2>
            {sub && <p className={`text-xs mt-1.5 font-medium ${subColor}`}>{sub}</p>}
        </div>
    );
}
