import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  customerId: string;
  name: string;
  email: string;
  duration: number;
  amount: number;
  pricingType: string;
  startTime?: Date;   
  endTime?: Date;     
  notes?: string;     
  createdAt: Date;
}

const invoiceSchema = new Schema<IInvoice>(
  {
    customerId: { type: String, required: true },
    name: String,
    email: String,
    duration: Number,
    amount: Number,
    pricingType: String,

    startTime: { type: Date },  
    endTime: { type: Date },     
    notes: { type: String }      
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);