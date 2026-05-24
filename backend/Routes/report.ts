import express from "express";
import { getDailyReport } from "../Controllers/reportController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js"

const router = express.Router();

router.use(authMiddleware);

router.get("/daily", getDailyReport);

export default router;

