import type { Request, Response } from "express";
import TimeEntry from "../Model/TimeEntry.js";
import mongoose from "mongoose";

export const getClientHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const selectedDate = req.query.date as string; // "YYYY-MM-DD"

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const adminId = new mongoose.Types.ObjectId(userId);

    const query: any = {
      userId: adminId,
      isRunning: false,
      endTime: { $exists: true, $ne: null },
    };

    if (selectedDate) {
      const parts = selectedDate.split("-");
      const year = parseInt(parts[0]!, 10);
      const month = parseInt(parts[1]!, 10);
      const day = parseInt(parts[2]!, 10);

      const start = new Date(year, month - 1, day, 0, 0, 0, 0);

      const end = new Date(year, month - 1, day, 23, 59, 59, 999);

      console.log("Date range:", start.toISOString(), "→", end.toISOString());

      query.endTime = {
        $gte: start,
        $lte: end,
      };
    }

    console.log("History Query:", JSON.stringify(query, null, 2));

    const history = await TimeEntry.find(query).sort({ endTime: -1 });

    console.log(`Found ${history.length} entries`);

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (err: any) {
    console.error("Client History Error:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};
