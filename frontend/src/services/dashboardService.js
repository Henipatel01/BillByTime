// // import axios from "axios";

// // const BASE_URL = "http://localhost:8080/api";

// // const api = axios.create({
// //   baseURL: BASE_URL,
// // });

// // // 🔐 Attach token
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // // 📊 Dashboard
// // export const getDashboardStats = async () => {
// //   const res = await api.get("/dashboard/stats");
// //   return res.data;
// // };

// // // 👤 Customers
// // export const getCustomers = async () => {
// //   const res = await api.get("/customer/list");
// //   return res.data;
// // };// delete these api if refrece and data save

// // export const getDashboardClients = async () => {
// //   const res = await api.get("/dashboard/clients");
// //   return res.data;
// // };

// // // Fix 1: point getCustomers to the correct endpoint
// // // export const getCustomers = () =>
// // //   axiosInstance.get("/clients").then(r => r.data);

// // // Fix 2: stopTimerAPI must send id in request body (not URL param)
// // // export const stopTimerAPI = (timerId, payload = {}) =>
// //   // axiosInstance.post("/time/stop", { id: timerId, ...payload }).then(r => r.data.data);

// // // ▶️ Start Timer
// // export const startTimerAPI = async (data) => {
// //   const res = await api.post("/time/start", data);
// //   return res.data.data; // ✅ FIXED
// // };

// // // ⏹️ Stop Timer// it off because referece issue
// // export const stopTimerAPI = async (timerId, extra = {}) => {
// //   console.log("Timer ID:", timerId); // ✅ FIXED

// //   const res = await api.post("/time/stop", {
// //     id: timerId,
// //     ...extra, // supports units / manualAmount
// //   });

// //   return res.data.data;
// // };

// // export const createCustomerAPI = async (data) => {
// //   const res = await api.post("/customer/create", data);
// //   return res.data.data;
// // };


// // export const updateCustomerAPI = async (id, data) => {
// //   const res = await api.put(`/customer/update/${id}`, data);
// //   return res.data.data;
// // };
 
// // // 🗑️ Delete Customer
// // // export const deleteCustomerAPI = async (id) => {
// // //   const res = await api.delete(`/customer/delete/${id}`);
// // //   return res.data;
// // // };

// // export const deleteCustomerAPI = async (id) => {
// //   return await api.delete(`/customer/delete/${id}`);
// // };

// // export const createInvoiceAPI = async (data) => {
// //   const res = await api.post("/invoice/create", data);
// //   return res.data.data;
// // };

// // export const getInvoicesAPI = async () => {
// //   const res = await api.get("/invoice/list");
// //   return res.data.data;
// // };


// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api";

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// // Attach token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // ─── Dashboard ────────────────────────────────────────────────────────────────
// export const getDashboardStats = async () => {
//   const res = await api.get("/dashboard/stats");
//   return res.data;
// };

// // FIX: was "/customer/list" — changed to "/dashboard/clients"
// // so that isRunning + timerId come back from the backend on every load
// export const getCustomers = async () => {
//   const res = await api.get("/dashboard/clients");
//   return res.data;
// };

// // ─── Timers ───────────────────────────────────────────────────────────────────
// export const startTimerAPI = async (data) => {
//   const res = await api.post("/time/start", data);
//   return res.data.data;
// };

// export const stopTimerAPI = async (timerId, extra = {}) => {
//   console.log("Stopping timer ID:", timerId);
//   const res = await api.post("/time/stop", {
//     id: timerId,
//     ...extra, // passes units (perunit) or manualAmount (manual)
//   });
//   return res.data.data;
// };

// // ─── Customers ────────────────────────────────────────────────────────────────
// export const createCustomerAPI = async (data) => {
//   const res = await api.post("/customer/create", data);
//   return res.data.data;
// };

// export const updateCustomerAPI = async (id, data) => {
//   const res = await api.put(`/customer/update/${id}`, data);
//   return res.data.data;
// };

// export const deleteCustomerAPI = async (id) => {
//   return await api.delete(`/customer/delete/${id}`);
// };

// // ─── Invoices ─────────────────────────────────────────────────────────────────
// export const createInvoiceAPI = async (data) => {
//   const res = await api.post("/invoice/create", data);
//   return res.data.data;
// };

// export const getInvoicesAPI = async () => {
//   const res = await api.get("/invoice/list");
//   return res.data.data;
// };

// export const deleteInvoiceAPI = async (id) => {
//   const res = await api.delete(`/invoice/delete/${id}`);
//   return res.data;
// };




import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// 🔐 Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("🔐 TOKEN:", token); // ✅ DEBUG

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("📤 REQUEST:", config.method?.toUpperCase(), config.url, config); // ✅ DEBUG

  return config;
});

// 🔴 Response debug
api.interceptors.response.use(
  (response) => {
    console.log("📥 RESPONSE:", response.config.url, response.data); // ✅ DEBUG
    return response;
  },
  (error) => {
    console.error("❌ API ERROR:", error.response?.data || error.message); // ✅ DEBUG
    return Promise.reject(error);
  }
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
  console.log("▶️ START TIMER PAYLOAD:", data); // ✅ DEBUG

  const res = await api.post("/time/start", data);

  console.log("✅ START TIMER RESPONSE:", res.data); // ✅ DEBUG

  return res.data.data;
};

export const stopTimerAPI = async (timerId, extra = {}) => {
  console.log("⏹️ STOP TIMER:", { timerId, extra }); // ✅ DEBUG

  const res = await api.post("/time/stop", {
    id: timerId,
    ...extra,
  });

  console.log("✅ STOP TIMER RESPONSE:", res.data); // ✅ DEBUG

  return res.data.data;
};

// ─── Customers CRUD ─────────────────────────────────
export const createCustomerAPI = async (data) => {
  console.log("➕ CREATE CUSTOMER:", data); // ✅ DEBUG

  const res = await api.post("/customer/create", data);

  console.log("✅ CREATED:", res.data); // ✅ DEBUG

  return res.data.data;
};

export const updateCustomerAPI = async (id, data) => {
  console.log("✏️ UPDATE CUSTOMER:", id, data); // ✅ DEBUG

  const res = await api.put(`/customer/update/${id}`, data);

  console.log("✅ UPDATED:", res.data); // ✅ DEBUG

  return res.data.data;
};

export const deleteCustomerAPI = async (id) => {
  console.log("🗑️ DELETE CUSTOMER:", id); // ✅ DEBUG

  const res = await api.delete(`/customer/delete/${id}`);

  console.log("✅ DELETED:", res.data); // ✅ DEBUG

  return res.data;
};

// ─── Invoices ───────────────────────────────────────
export const createInvoiceAPI = async (data) => {
  console.log("🧾 CREATE INVOICE:", data); // ✅ DEBUG

  const res = await api.post("/invoice/create", data);

  console.log("✅ INVOICE CREATED:", res.data); // ✅ DEBUG

  return res.data.data;
};

export const getInvoicesAPI = async () => {
  const res = await api.get("/invoice/list");

  console.log("📄 INVOICES:", res.data); // ✅ DEBUG

  return res.data.data;
};

export const deleteInvoiceAPI = async (id) => {
  const res = await api.delete(`/invoice/delete/${id}`);

  console.log("🗑️ INVOICE DELETED:", res.data); // ✅ DEBUG

  return res.data;
};

// export const getDailyReportAPI = async () => {
//   const res = await api.get("/report/daily");
//   return res.data.data;
// };
 
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


// export const getClientHistoryAPI = async () => {
//   const res = await api.get("/history");
//   return res.data.data;
// };


// ─── Client History ───────────────────────────────────────────────────────────
// date format: "YYYY-MM-DD"
export const getClientHistoryAPI = async (date) => {
  const res = await api.get(`/history/client?date=${date}`);
  return res.data.data;
};



