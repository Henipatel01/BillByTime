import type { Request, Response } from "express";
import Invoice from "../Model/invoiceModel.js";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
  user?: any;
}

const toObjectId = (
  id: string | string[] | undefined,
): mongoose.Types.ObjectId | null => {
  const strId = Array.isArray(id) ? id[0] : id; // take first if array
  if (!strId || !mongoose.Types.ObjectId.isValid(strId)) return null;
  return new mongoose.Types.ObjectId(strId);
};

// CREATE
export const createInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      customerId: req.user.userId,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL
export const getInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const invoices = await Invoice.find({ customerId: req.user.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, data: invoices });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE
export const getInvoiceById = async (req: AuthRequest, res: Response) => {
  try {
    const objectId = toObjectId(req.params.id);
    if (!objectId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid invoice ID" });
    }

    const invoice = await Invoice.findOne({
      _id: objectId,
      customerId: req.user.userId,
    });

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const objectId = toObjectId(req.params.id);
    if (!objectId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid invoice ID" });
    }

    const invoice = await Invoice.findOneAndUpdate(
      { _id: objectId, customerId: req.user.userId },
      req.body,
      { new: true, runValidators: true },
    );

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const objectId = toObjectId(req.params.id);
    if (!objectId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid invoice ID" });
    }

    let invoice = await Invoice.findOneAndDelete({
      _id: objectId,
      customerId: req.user.userId,
    });

    if (!invoice) {
      invoice = await Invoice.findByIdAndDelete(objectId);
    }

    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Invoice deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
