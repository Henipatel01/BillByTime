import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email"),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  pricing: z.object({
    type: z.enum(["hourly", "fixed", "perunit", "manual"]),
    ratePerHour: z.number().optional(),
    fixedAmount: z.number().optional(),
    pricePerUnit: z.number().optional(),
  }),
}).superRefine((data, ctx) => {
  const { type, ratePerHour, fixedAmount, pricePerUnit } = data.pricing;

  if (type === "hourly" && (!ratePerHour || ratePerHour <= 0)) {
    ctx.addIssue({
      path: ["pricing", "ratePerHour"],
      message: "Enter valid hourly rate",
      code: "custom",
    });
  }

  if (type === "fixed" && (!fixedAmount || fixedAmount <= 0)) {
    ctx.addIssue({
      path: ["pricing", "fixedAmount"],
      message: "Enter valid fixed amount",
      code: "custom",
    });
  }

  if (type === "perunit" && (!pricePerUnit || pricePerUnit <= 0)) {
    ctx.addIssue({
      path: ["pricing", "pricePerUnit"],
      message: "Enter valid price per unit",
      code: "custom",
    });
  }
});