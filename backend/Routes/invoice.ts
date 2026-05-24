import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../Controllers/invoiceController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js"; 

const router = express.Router();

router.use(authMiddleware);

router.post("/create",   createInvoice);   
router.get("/list",       getInvoices);    
router.get("/:id",        getInvoiceById);  
router.put("/update/:id", updateInvoice);   
router.delete("/delete/:id", deleteInvoice); 

export default router;