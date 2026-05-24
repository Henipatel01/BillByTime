
import TimeEntry from "../Model/TimeEntry.js";
import Customer from "../Model/Customer.js";
import mongoose from "mongoose";
import type { Request, Response } from "express";


  //  FORMAT TIME FUNCTION
const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours ? `${hours}h` : "",
    minutes ? `${minutes}m` : "",
    seconds ? `${seconds}s` : "",
  ]
    .filter(Boolean)
    .join(" ") || "0s"; 
};


  //   DASHBOARD STATS

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const adminId = new mongoose.Types.ObjectId(userId);

   
    const totalClients = await Customer.countDocuments({
      userId: adminId,
    });

 
    const timers = await TimeEntry.find({
      userId: adminId, 
    });

    let totalSeconds = 0;
    let totalEarned = 0;

    const activeTimers = timers.filter((t) => t.isRunning);

    timers.forEach((t) => {
      totalSeconds += t.duration || 0;
      totalEarned += t.amount || 0;
    });

  

    res.status(200).json({
      totalClients: totalClients,
      activeNow: activeTimers.length,
      totalEarned: parseFloat(totalEarned.toFixed(2)),
      totalTime: formatTime(totalSeconds),
      totalSeconds,
    });

  } catch (err: any) {
    console.error("Dashboard Error:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

export const getDashboardClients = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const adminId = new mongoose.Types.ObjectId(userId);

    // get all customers
    const customers = await Customer.find({ userId: adminId });

    // get active timers
    const activeTimers = await TimeEntry.find({
      userId: adminId,
      isRunning: true,
    });

    const result = customers.map((c) => {
      const running = activeTimers.find(
        (t) => t.customer.email === c.email
      );

      return {
        _id: c._id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        pricing: c.pricing,

   
        isRunning: !!running,
        timerId: running?._id || null,
        startTime: running?.startTime || null,
      };
    });

    res.status(200).json(result);

  } catch (err: any) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};