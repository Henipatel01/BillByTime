import express from "express";
import { getClientHistory } from "../Controllers/historyController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/client", getClientHistory); // GET /api/history/client?date=YYYY-MM-DD

export default router;