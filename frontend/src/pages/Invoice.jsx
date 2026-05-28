import { useEffect, useState } from "react";
import Sidebar from "../component/sidebare";
import {
  getInvoicesAPI,
  deleteInvoiceAPI,
  createInvoiceAPI,
} from "../services/dashboardService";

// ─── PDF Generator ────────────────────────────────────────────────────────────
function generateInvoicePDF(inv, formatTime) {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  const date = new Date(inv.createdAt || Date.now()).toLocaleDateString(
    "en-IN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  const invoiceNo = inv._id
    ? `INV-${inv._id.toString().slice(-6).toUpperCase()}`
    : `INV-${Date.now().toString().slice(-6)}`;

  const startTime = inv.startTime
    ? new Date(inv.startTime).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;
  const endTime = inv.endTime
    ? new Date(inv.endTime).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  printWindow.document.write(`
    <!DOCTYPE html><html><head>
    <title>Invoice - ${inv.name}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',sans-serif;background:#fff;color:#111}
      .page{max-width:720px;margin:0 auto;padding:48px}
      .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px}
      .brand{font-size:22px;font-weight:800;color:#1a4a3a}
      .brand span{color:#10b981}
      .invoice-meta{text-align:right}
      .invoice-meta h2{font-size:28px;font-weight:800;color:#111;letter-spacing:-1px}
      .invoice-meta p{font-size:13px;color:#666;margin-top:4px}
      .divider{height:2px;background:linear-gradient(90deg,#1a4a3a,#10b981,transparent);margin-bottom:36px;border-radius:2px}
      .bill-to{margin-bottom:36px}
      .bill-to label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;display:block;margin-bottom:8px}
      .bill-to h3{font-size:18px;font-weight:700;color:#111}
      .bill-to p{font-size:13px;color:#555;margin-top:3px}
      table{width:100%;border-collapse:collapse;margin-bottom:32px}
      th{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;padding:10px 14px;text-align:left;background:#f5f5f0;border-bottom:2px solid #e5e7eb}
      th:last-child{text-align:right}
      td{padding:14px;font-size:14px;color:#333;border-bottom:1px solid #f0f0f0}
      td:last-child{text-align:right;font-weight:700;color:#1a4a3a}
      .desc{font-weight:600;color:#111}
      .sub{font-size:12px;color:#888;margin-top:2px}
      .total-section{display:flex;justify-content:flex-end;margin-bottom:48px}
      .total-box{background:#f5f5f0;border-radius:12px;padding:20px 28px;min-width:260px}
      .total-row{display:flex;justify-content:space-between;font-size:13px;color:#666;margin-bottom:8px}
      .total-row.grand{font-size:20px;font-weight:800;color:#111;margin-top:12px;padding-top:12px;border-top:2px solid #d1d5db}
      .total-row.grand span:last-child{color:#10b981}
      .footer{text-align:center;font-size:12px;color:#aaa;padding-top:32px;border-top:1px solid #f0f0f0}
      .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:capitalize;background:#d1fae5;color:#065f46}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:32px}}
    </style></head><body>
    <div class="page">
      <div class="header">
        <div class="brand">BillBy<span>Time</span></div>
        <div class="invoice-meta">
          <h2>INVOICE</h2>
          <p>${invoiceNo}</p>
          <p>${date}</p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="bill-to">
        <label>Bill To</label>
        <h3>${inv.name}</h3>
        <p>${inv.email}</p>
        ${inv.phone ? `<p>${inv.phone}</p>` : ""}
      </div>
      <table>
        <thead><tr><th>Description</th><th>Type</th><th>Duration</th><th>Amount</th></tr></thead>
        <tbody>
          <tr>
            <td>
              ${
                inv.notes && inv.notes.trim()
                  ? `<div class="desc">${inv.notes}</div>`
                  : `<div class="desc">Service rendered</div>`
              }
              ${startTime ? `<div class="sub">Start: ${startTime}</div>` : ""}
              ${endTime ? `<div class="sub">End: ${endTime}</div>` : ""}
            </td>
            <td><span class="badge">${inv.pricingType || "manual"}</span></td>
            <td>${inv.duration ? formatTime(inv.duration) : "-"}</td>
            <td>&#8377;${Number(inv.amount).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div class="total-section">
        <div class="total-box">
          <div class="total-row"><span>Subtotal</span><span>&#8377;${Number(inv.amount).toFixed(2)}</span></div>
          <div class="total-row"><span>Tax (0%)</span><span>&#8377;0.00</span></div>
          <div class="total-row grand"><span>Total</span><span>&#8377;${Number(inv.amount).toFixed(2)}</span></div>
        </div>
      </div>
      <div class="footer">
        <p>Thank you for your business!</p>
        <p style="margin-top:4px">Generated by TimeBill &bull; ${new Date().getFullYear()}</p>
      </div>
    </div>
    <script>window.onload=()=>{window.print()}<\/script>
    </body></html>
  `);
  printWindow.document.close();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const defaultManual = { name: "", email: "", phone: "", amount: "", notes: "" };

const inputCls = (hasError) =>
  `w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition text-gray-900 font-medium ${
    hasError
      ? "border-red-400 bg-red-50"
      : "border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
  }`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [manualForm, setManualForm] = useState(defaultManual);
  const [manualErrors, setManualErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoicesAPI();
      setInvoices(data);
    } catch (err) {
      console.error("Invoice Error:", err);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return "-";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return (
      [h ? `${h}h` : "", m ? `${m}m` : "", s ? `${s}s` : ""]
        .filter(Boolean)
        .join(" ") || "0s"
    );
  };

  const closeModal = () => {
    setShowManual(false);
    setManualForm(defaultManual);
    setManualErrors({});
  };

  const setField = (key, val) => {
    setManualForm((prev) => ({ ...prev, [key]: val }));
    setManualErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateManual = () => {
    const e = {};
    if (!manualForm.name.trim()) e.name = "Name is required";
    if (!manualForm.email.trim()) e.email = "Email is required";
    if (!manualForm.amount || Number(manualForm.amount) <= 0)
      e.amount = "Enter a valid amount";
    setManualErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveManualInvoice = async () => {
    if (!validateManual()) return;
    setSaving(true);
    try {
      const saved = await createInvoiceAPI({
        name: manualForm.name,
        email: manualForm.email,
        phone: manualForm.phone,
        amount: Number(manualForm.amount),
        duration: 0,
        pricingType: "manual",
        notes: manualForm.notes,
        startTime: null,
        endTime: null,
      });
      setInvoices((prev) => [saved, ...prev]);
      closeModal();
    } catch (err) {
      console.error("Manual Invoice Error:", err);
      alert("Failed to save invoice.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (inv) => {
    if (!window.confirm(`Delete invoice for "${inv.name}"?`)) return;
    try {
      await deleteInvoiceAPI(inv._id);
      setInvoices((prev) => prev.filter((i) => i._id !== inv._id));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete invoice.");
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      inv.name?.toLowerCase().includes(q) ||
      inv.email?.toLowerCase().includes(q) ||
      inv.pricingType?.toLowerCase().includes(q)
    );
  });

  return (
    // <div className="min-h-screen bg-[#F5F5F0] text-gray-800 flex font-sans">

    <div className="h-screen bg-[#F5F5F0] text-gray-800 flex font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto">
          {/* ── HEADER ── */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-950 tracking-tight">
                Invoices
              </h1>
              <p className="text-sm text-gray-600 mt-0.5 font-medium">
                All billing records
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                {invoices.length} TOTAL
              </span>
              <button
                onClick={() => setShowManual(true)}
                className="flex items-center gap-2 bg-[#1a4a3a] hover:bg-[#163d30] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
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
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Invoice
              </button>
            </div>
          </div>

          {/* ── SEARCH ── */}
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
              placeholder="Search by name, email or type..."
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

          {/* ── TABLE ── */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Table header — 6 cols */}
            <div className="grid grid-cols-6 px-5 py-3.5 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 bg-gray-100">
              <p className="col-span-2">Client</p>
              <p>Duration</p>
              <p>Type</p>
              <p>Amount</p>
              <p>Date &amp; Actions</p>
            </div>

            {filteredInvoices.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
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
                    ? `No invoices found for "${search}"`
                    : 'No invoices yet. Click "New Invoice" to create one.'}
                </p>
              </div>
            ) : (
              filteredInvoices.map((inv) => (
                <div
                  key={inv._id}
                  className="grid grid-cols-6 px-5 py-3.5 border-t border-gray-100 items-center hover:bg-gray-50/70 transition-colors duration-150"
                >
                  {/* Client */}
                  <div className="col-span-2 min-w-0 pr-4">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {inv.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium truncate">
                      {inv.email}
                    </p>
                  </div>

                  {/* Duration */}
                  <p className="text-sm text-gray-800 font-semibold">
                    {formatTime(inv.duration)}
                  </p>

                  {/* Type badge */}
                  <p>
                    <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs font-bold">
                      {inv.pricingType || "manual"}
                    </span>
                  </p>

                  {/* Amount */}
                  <p className="text-sm font-bold text-emerald-700 font-mono">
                    ₹{Number(inv.amount).toFixed(2)}
                  </p>

                  {/* Date + Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        {new Date(inv.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      {inv.startTime && (
                        <p className="text-xs text-gray-400 whitespace-nowrap">
                          {new Date(inv.startTime).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {inv.endTime && (
                            <>
                              {" "}
                              →{" "}
                              {new Date(inv.endTime).toLocaleTimeString(
                                "en-IN",
                                { hour: "2-digit", minute: "2-digit" },
                              )}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    {/* Download PDF */}
                    <button
                      onClick={() => generateInvoicePDF(inv, formatTime)}
                      title="Download PDF"
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition shrink-0"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(inv)}
                      title="Delete Invoice"
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 transition shrink-0"
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
              ))
            )}
          </div>

          {search && (
            <p className="text-xs text-gray-400 mt-3">
              Showing {filteredInvoices.length} of {invoices.length} invoices
            </p>
          )}
        </div>

        {/* ── MANUAL INVOICE MODAL ─────────────────────────────────────────────── */}
        {showManual && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl w-[420px] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="bg-[#1a4a3a] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-white">
                    New Manual Invoice
                  </h2>
                </div>
                <button
                  onClick={closeModal}
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

              <div className="p-6 space-y-5">
                {/* Client Info */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Client Info
                  </p>
                  <div className="space-y-3">
                    <div>
                      <input
                        placeholder="Full name *"
                        value={manualForm.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className={inputCls(manualErrors.name)}
                      />
                      {manualErrors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {manualErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Email address *"
                        value={manualForm.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className={inputCls(manualErrors.email)}
                      />
                      {manualErrors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {manualErrors.email}
                        </p>
                      )}
                    </div>
                    <input
                      placeholder="Phone (optional)"
                      value={manualForm.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      className={inputCls(false)}
                    />
                  </div>
                </div>

                {/* Billing Details */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Billing Details
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-bold text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="0"
                          placeholder="0.00"
                          value={manualForm.amount}
                          onChange={(e) => setField("amount", e.target.value)}
                          className={`${inputCls(manualErrors.amount)} pl-7`}
                        />
                      </div>
                      {manualErrors.amount && (
                        <p className="text-red-500 text-xs mt-1">
                          {manualErrors.amount}
                        </p>
                      )}
                    </div>
                    <textarea
                      placeholder="Notes / description (optional)"
                      value={manualForm.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none transition text-gray-900 font-medium focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 resize-none"
                    />
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveManualInvoice}
                    disabled={saving}
                    className="flex-1 py-2.5 bg-[#1a4a3a] hover:bg-[#163d30] text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md disabled:opacity-60"
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      "Save Invoice"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
