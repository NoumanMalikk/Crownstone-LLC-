import { NextRequest, NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validation/checkout";
import { createValidatedOrder } from "@/lib/checkout/create-order";
import { isDemoMode, storeConfig } from "@/data/store-config";
import { isStripeConfigured, getStripe } from "@/lib/stripe/client";
import { sendOrderConfirmation } from "@/lib/email/order-confirmation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid checkout data" },
        { status: 400 }
      );
    }

    if (isDemoMode() || !isStripeConfigured()) {
      const order = await createValidatedOrder(parsed.data);
      await sendOrderConfirmation(order);
      return NextResponse.json({
        mode: "demo",
        reference: order.reference,
        paymentStatus: order.paymentStatus,
        message: storeConfig.demo.notice,
      });
    }

    const order = await createValidatedOrder(parsed.data);
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.customer.email,
      success_url: `${storeConfig.siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${storeConfig.siteUrl}/checkout`,
      line_items: order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.unitPrice * 100),
          product_data: {
            name: item.title,
            metadata: { sku: item.sku, model: item.model },
          },
        },
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: Math.round(order.shipping * 100), currency: "usd" },
            display_name: order.shippingMethodName,
          },
        },
      ],
      metadata: {
        orderReference: order.reference,
        orderId: order.id,
      },
    });

    order.stripeSessionId = session.id;
    const { saveOrder } = await import("@/lib/orders/store");
    await saveOrder(order);

    return NextResponse.json({ mode: "stripe", url: session.url, reference: order.reference });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 400 }
    );
  }
}
