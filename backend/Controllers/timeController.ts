import TimeEntry from "../Model/TimeEntry.js";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import { customerSchema } from "../validation/customerschema.js";

console.log("timeController loaded");

export const startTimer = async (req: Request, res: Response) => {
  console.log("startTimer function called");
  try {
    //  AUTH 
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const adminId = new mongoose.Types.ObjectId(userId);

    // VALIDATE USING ZOD 
    let validated;
        try {
      validated = customerSchema.parse({
        ...req.body,
        pricing: {
          ...req.body.pricing,
          ratePerHour: Number(req.body.pricing?.ratePerHour),
          fixedAmount: Number(req.body.pricing?.fixedAmount),
          pricePerUnit: Number(req.body.pricing?.pricePerUnit),
        },
      });
    } catch (err: any) {
      return res.status(400).json({
        message: err.errors?.[0]?.message || "Validation error",
      });
    }

    const { name, email, phone, pricing } = validated;
  
    // PREVENT DUPLICATE TIMER 
    const existingRunning = await TimeEntry.findOne({
      userId: adminId,
      "customer.email": email,
      isRunning: true,
    });
    if (existingRunning) {
      return res.status(400).json({ message: "Timer already running for this customer" });
    }


    const cleanPricing = (pricing: any) => {
  const cleaned: any = { type: pricing.type };

  if (pricing.ratePerHour !== undefined)
    cleaned.ratePerHour = pricing.ratePerHour;

  if (pricing.fixedAmount !== undefined)
    cleaned.fixedAmount = pricing.fixedAmount;

  if (pricing.pricePerUnit !== undefined)
    cleaned.pricePerUnit = pricing.pricePerUnit;

  return cleaned;
};

const cleanedPricing = cleanPricing(pricing);
    const newEntry:any = await TimeEntry.create({
      userId: adminId,
      customer: { name, email, phone },  
      pricing:cleanedPricing,                           
      startTime: new Date(),
      isRunning: true,
      duration: 0,
      amount: 0,
      status: "in-progress",
    });

    //  RESPONSE 
    return res.status(201).json({
      message: "Timer started",
      data: {
        _id: newEntry._id.toString(),
        customer: newEntry.customer,
        pricing: newEntry.pricing,
        startTime: newEntry.startTime,
        isRunning: newEntry.isRunning,
        duration: newEntry.duration,
        amount: newEntry.amount,
        status: newEntry.status,
      },
    });

  } catch (err: any) {
    console.error("Start Timer Error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const stopTimer = async (req: Request, res: Response) => {
  console.log("stopTimer function called");
  try {
    // AUTH 
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const adminId = new mongoose.Types.ObjectId(userId);

    const { id, units, manualAmount } = req.body;
    console.log("STOP BODY:", { id, units, manualAmount });

    if (!id) {
      return res.status(400).json({ message: "Timer ID required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Timer ID" });
    }

    // FIND RUNNING TIMER 
    const runningEntry = await TimeEntry.findOne({
      _id: id,
      userId: adminId,
      isRunning: true,
    });

    console.log("Found timer:", runningEntry?._id);
    console.log("Pricing:", runningEntry?.pricing);

    if (!runningEntry) {
      return res.status(404).json({ message: "No active timer found" });
    }

    // CALCULATE DURATION 
    const endTime = new Date();
    const totalSeconds = Math.floor(
      (endTime.getTime() - runningEntry.startTime.getTime()) / 1000
    );
    const totalMinutes = Math.max(1, Math.ceil(totalSeconds / 60));

    //  CALCULATE AMOUNT 
    let amount = 0;
    const pricing = runningEntry.pricing;

    switch (pricing.type) {
      case "hourly":
        amount = (totalMinutes / 60) * (pricing.ratePerHour || 0);
        break;

      case "fixed":
        amount = pricing.fixedAmount || 0;
        break;

case "perunit": {
  const parsedUnits = Number(units);

  if (!Number.isFinite(parsedUnits) || parsedUnits <= 0) {
    return res.status(400).json({
      message: "Valid units required for perunit pricing",
    });
  }

  const price = Number(pricing.pricePerUnit) || 0;

  amount = Math.round(parsedUnits * price * 100) / 100;

  runningEntry.pricing.units = parsedUnits;

  break;
}
  

      case "manual":
        if (!manualAmount || Number(manualAmount) <= 0) {
          return res.status(400).json({ message: "Valid manual amount required" });
        }
        amount = Number(manualAmount);
        break;

      default:
        return res.status(400).json({ message: "Invalid pricing type" });
    }

    //  FORMAT TIME 
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = [
      hours ? `${hours}h` : "",
      minutes ? `${minutes}m` : "",
      seconds ? `${seconds}s` : "",
    ].filter(Boolean).join(" ") || "0s";

    // SAVE 
    runningEntry.endTime = endTime;
    runningEntry.duration = totalSeconds;
    runningEntry.amount = parseFloat(amount.toFixed(2));
    runningEntry.isRunning = false;
    runningEntry.status = "completed";
    await runningEntry.save();

 
    return res.status(200).json({
      message: "Timer stopped successfully",
      data: {
        _id: runningEntry._id.toString(),
        customer: runningEntry.customer,
        startTime: runningEntry.startTime,
        endTime: runningEntry.endTime,
        time: formattedTime,
        durationInSeconds: totalSeconds,
        pricingType: pricing.type,
        amount: runningEntry.amount,
        status: runningEntry.status,
      },
    });

  } catch (err: any) {
    console.error("Stop Timer Error:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getAllTimers = async (req: any, res: any) => {
  try {
    const timers = await TimeEntry.find();
    res.status(200).json({ data: timers });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getActiveTimer = async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const activeTimer = await TimeEntry.findOne({ userId, isRunning: true })
      .populate("userId", "name email")
      .populate("projectId", "title ratePerHour");

    if (!activeTimer) {
      return res.status(404).json({ message: "No active timer" });
    }
    res.status(200).json({ message: "Active timer found", data: activeTimer });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};