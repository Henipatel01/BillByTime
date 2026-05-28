import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//Response debug
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

// ─── Dashboard ─────────────────────────────────────
export const getDashboardStats = async () => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};

// ─── Customers (YOUR CURRENT API) ───────────────────
export const getCustomers = async () => {
  const res = await api.get("/dashboard/clients");
  return res.data;
};

// ─── Timers ────────────────────────────────────────
export const startTimerAPI = async (data) => {
  console.log("START TIMER PAYLOAD:", data);

  const res = await api.post("/time/start", data);

  console.log("START TIMER RESPONSE:", res.data);

  return res.data.data;
};

export const stopTimerAPI = async (timerId, extra = {}) => {
  console.log("STOP TIMER:", { timerId, extra });

  const res = await api.post("/time/stop", {
    id: timerId,
    ...extra,
  });

  console.log("STOP TIMER RESPONSE:", res.data);
  return res.data.data;
};

// ─── Customers CRUD ─────────────────────────────────
export const createCustomerAPI = async (data) => {
  const res = await api.post("/customer/create", data);
  return res.data.data;
};

export const updateCustomerAPI = async (id, data) => {
  const res = await api.put(`/customer/update/${id}`, data);
  return res.data.data;
};

export const deleteCustomerAPI = async (id) => {
  const res = await api.delete(`/customer/delete/${id}`);
  return res.data;
};

// ─── Invoices ───────────────────────────────────────
export const createInvoiceAPI = async (data) => {
  const res = await api.post("/invoice/create", data);
  return res.data.data;
};

export const getInvoicesAPI = async () => {
  const res = await api.get("/invoice/list");
  return res.data.data;
};

export const deleteInvoiceAPI = async (id) => {
  const res = await api.delete(`/invoice/delete/${id}`);
  return res.data;
};

// All invoices used to build day-by-day chart data on the frontend
export const getReportInvoicesAPI = async () => {
  const res = await api.get("/invoice/list");
  return res.data.data;
};

export const getDailyReportAPI = async () => {
  const res = await api.get("/report/daily");
  return res.data.data;
};

// Range report — drives all charts and history (days = 7 | 14 | 30)
export const getRangeReportAPI = async (days = 7) => {
  const res = await api.get(`/report/range?days=${days}`);
  return res.data.data;
};

// ─── Client History ───────────────────────────────────────────────────────────
// date format: "YYYY-MM-DD"
export const getClientHistoryAPI = async (date) => {
  const res = await api.get(`/history/client?date=${date}`);
  return res.data.data;
};
