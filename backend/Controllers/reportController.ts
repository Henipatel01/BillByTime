
import type{ Request, Response } from "express";
import Invoice from "../Model/invoiceModel.js";

export const getDailyReport = async (req: Request, res: Response) => {
  try {
    // today start
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    // today end
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // fetch invoices of logged-in user
    const invoices = await Invoice.find({
      customerId: req.user!.userId, 
      createdAt: {
        $gte: start,
        $lte: end
      }
    });

    // total earnings
    const totalAmount = invoices.reduce((sum, i) => sum + (i.amount || 0), 0);

    // total time
    const totalTime = invoices.reduce((sum, i) => sum + (i.duration || 0), 0);

    // unique customers
    const uniqueCustomers = new Set(invoices.map(i => i.email));

    res.json({
      success: true,
      data: {
        totalAmount,
        totalTime,
        totalCustomers: uniqueCustomers.size,
        invoices
      }
    });

  } catch (err) {
    console.error("Daily Report Error:", err);
    res.status(500).json({ message: "Error fetching report" });
  }
};