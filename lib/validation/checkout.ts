import { z } from "zod";

export const customerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  firstName: z.string().min(1, "First name is required").max(80),
  lastName: z.string().min(1, "Last name is required").max(80),
  phone: z.string().min(7, "Enter a valid phone number").max(30),
});

export const addressSchema = z.object({
  line1: z.string().min(1, "Address is required").max(120),
  line2: z.string().max(120).optional().or(z.literal("")),
  city: z.string().min(1, "City is required").max(80),
  state: z.string().min(2, "State is required").max(40),
  postalCode: z.string().min(3, "ZIP / postal code is required").max(20),
  country: z.string().min(2),
});

export const checkoutSchema = z.object({
  customer: customerSchema,
  shippingAddress: addressSchema,
  billingSameAsShipping: z.boolean(),
  billingAddress: addressSchema.optional(),
  shippingMethodId: z.string().min(1),
  acceptTerms: z.literal(true, {
    message: "You must accept the Terms and Privacy Policy",
  }),
  marketingConsent: z.boolean(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string().optional(),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
