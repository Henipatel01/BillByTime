import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name must not exceed 255 characters" }),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not exceed 255 characters" }),

  phone: z
    .string()
    .trim()
    .min(1, "Phone is required")
    .regex(/^[0-9]{10}$/, { message: "Phone must be exactly 10 digits" }),

  pricing: z.object({
    type: z.enum(["hourly", "fixed", "perunit", "manual"]),

    ratePerHour: z.number().optional(),
    fixedAmount: z.number().optional(),
    pricePerUnit: z.number().optional(),
  }),
})
.superRefine((data, ctx) => {
  const { type, ratePerHour, fixedAmount, pricePerUnit } = data.pricing;

  if (type === "hourly" && (!ratePerHour || ratePerHour <= 0)) {
    ctx.addIssue({
      path: ["pricing", "ratePerHour"],
      message: "Valid rate per hour required",
      code: z.ZodIssueCode.custom,
    });
  }

  if (type === "fixed" && (!fixedAmount || fixedAmount <= 0)) {
    ctx.addIssue({
      path: ["pricing", "fixedAmount"],
      message: "Valid fixed amount required",
      code: z.ZodIssueCode.custom,
    });
  }

  if (type === "perunit" && (!pricePerUnit || pricePerUnit <= 0)) {
    ctx.addIssue({
      path: ["pricing", "pricePerUnit"],
      message: "Valid price per unit required",
      code: z.ZodIssueCode.custom,
    });
  }
});