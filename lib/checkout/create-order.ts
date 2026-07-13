import { randomBytes } from "crypto";
import { getProductById } from "@/data/products";
import { isDemoMode, storeConfig } from "@/data/store-config";
import type { CheckoutInput } from "@/lib/validation/checkout";
import { computeCartWeight, computeSubtotal, resolveCartLines } from "@/lib/pricing/cart-totals";
import { getShippingMethod } from "@/lib/pricing/shipping";
import { saveOrder } from "@/lib/orders/store";
import type { OrderRecord } from "@/lib/types";
import { roundMoney } from "@/lib/utilities/format";

export function createOrderReference() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `CRN-${stamp}-${suffix}`;
}

export function estimateTax(subtotal: number, shipping: number, state: string) {
  // Destination-based readiness placeholder. No hardcoded production tax rate.
  // Returns 0 until Stripe Tax or another provider is connected.
  void subtotal;
  void shipping;
  void state;
  return 0;
}

export async function createValidatedOrder(
  input: CheckoutInput,
  options?: { stripeSessionId?: string; markPaid?: boolean }
) {
  const demo = isDemoMode();

  for (const item of input.items) {
    const product = getProductById(item.productId);
    if (!product || !product.active) {
      throw new Error("One or more products are unavailable.");
    }
    if (!demo && (product.incomplete || product.imageReplacementRequired)) {
      throw new Error(
        `${product.title} cannot be purchased until exact model mapping and authorized imagery are complete.`
      );
    }
    if (product.stockStatus === "out_of_stock") {
      throw new Error(`${product.title} is currently unavailable.`);
    }
    if (item.quantity > product.maximumOrderQuantity) {
      throw new Error(`Quantity exceeds the maximum for ${product.title}.`);
    }
    if (item.variantId) {
      const variant = product.availableVariants.find((v) => v.id === item.variantId);
      if (!variant || !variant.inStock) {
        throw new Error(`Selected variant is unavailable for ${product.title}.`);
      }
    }
  }

  const lines = resolveCartLines(input.items);
  if (!lines.length) throw new Error("Your cart is empty.");

  const weight = computeCartWeight(lines);
  const shippingMethod = getShippingMethod(input.shippingMethodId, weight);
  if (!shippingMethod) throw new Error("Select a valid shipping method.");

  const subtotal = computeSubtotal(lines);
  const shipping = shippingMethod.price;
  const billingAddress = input.billingSameAsShipping
    ? input.shippingAddress
    : input.billingAddress;
  if (!billingAddress) throw new Error("Billing address is required.");

  const tax = estimateTax(subtotal, shipping, input.shippingAddress.state);
  const total = roundMoney(subtotal + shipping + tax);
  const paid = Boolean(options?.markPaid) && !demo;

  const order: OrderRecord = {
    id: randomBytes(8).toString("hex"),
    reference: createOrderReference(),
    email: input.customer.email.toLowerCase(),
    status: paid ? "paid" : demo ? "demo_incomplete" : "pending_payment",
    paymentStatus: paid ? "paid" : demo ? "demo" : "unpaid",
    fulfillmentStatus: "unfulfilled",
    items: lines.map((line) => ({
      productId: line.productId,
      sku: line.sku,
      supplierSku: line.supplierSku,
      title: line.title,
      model: line.model,
      variantLabel: line.variantLabel,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      lineTotal: line.lineTotal,
      imageSrc: line.imageSrc,
    })),
    subtotal,
    shipping,
    tax,
    total,
    currency: storeConfig.currency,
    shippingAddress: {
      ...input.shippingAddress,
      line2: input.shippingAddress.line2 || undefined,
    },
    billingAddress: {
      ...billingAddress,
      line2: billingAddress.line2 || undefined,
    },
    shippingMethodId: shippingMethod.id,
    shippingMethodName: shippingMethod.name,
    customer: input.customer,
    createdAt: new Date().toISOString(),
    stripeSessionId: options?.stripeSessionId,
    demoMode: demo,
  };

  await saveOrder(order);
  return order;
}
