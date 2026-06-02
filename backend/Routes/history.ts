import express from "express";
import { getClientHistory } from "../Controllers/historyController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/client", getClientHistory);

export default router;