import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  topic: z.enum([
    "Product question",
    "Compatibility",
    "Existing order",
    "Business pricing",
    "Shipping",
    "Return",
    "Warranty",
    "Damaged product",
    "Website issue",
    "Other",
  ]),
  orderReference: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  marketingConsent: z.boolean(),
  website: z.string().max(0).optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(1).max(100),
  workEmail: z.string().email(),
  phone: z.string().min(7).max(30),
  company: z.string().min(1).max(120),
  website: z.string().url().optional().or(z.literal("")),
  productOrCategory: z.string().min(1).max(200),
  modelPreference: z.string().max(200).optional().or(z.literal("")),
  quantity: z.number().int().min(1).max(10000),
  requiredDate: z.string().min(1),
  shippingZip: z.string().min(3).max(20),
  taxExempt: z.boolean(),
  additionalRequirements: z.string().max(4000).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "Consent is required to submit a business request",
  }),
  honeypot: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
