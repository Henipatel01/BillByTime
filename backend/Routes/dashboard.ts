import express from "express";
import { getDashboardStats,getDashboardClients } from "../Controllers/dashboardController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, getDashboardStats);
router.get("/clients", authMiddleware,getDashboardClients);

export default router;