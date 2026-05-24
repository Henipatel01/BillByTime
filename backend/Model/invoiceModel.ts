// import mongoose, { Schema, Document } from "mongoose";

// export interface IInvoice extends Document {
//   customerId: string;
//   name: string;
//   email: string;
//   duration: number;
//   amount: number;
//   pricingType: string;
//   createdAt: Date;
// }

// const invoiceSchema = new Schema<IInvoice>(
//   {
//     customerId: { type: String, required: true },
//     name: String,
//     email: String,
//     duration: Number,
//     amount: Number,
//     pricingType: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IInvoice>("Invoice", invoiceSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  customerId: string;
  name: string;
  email: string;
  duration: number;
  amount: number;
  pricingType: string;
  startTime?: Date;   // ✅ ADD
  endTime?: Date;     // ✅ ADD
  notes?: string;     // ✅ ADD
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

    startTime: { type: Date },   // ✅ ADD
    endTime: { type: Date },     // ✅ ADD
    notes: { type: String }      // ✅ ADD
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);