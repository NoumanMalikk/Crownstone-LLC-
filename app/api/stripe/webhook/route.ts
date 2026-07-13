import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe/client";
import { getOrderByReference, saveOrder } from "@/lib/orders/store";
import { sendOrderConfirmation } from "@/lib/email/order-confirmation";

export async function POST(request: NextRequest) {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const payload = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { id: string; metadata?: { orderReference?: string }; payment_status?: string };
    const reference = session.metadata?.orderReference;
    if (reference && session.payment_status === "paid") {
      const order = await getOrderByReference(reference);
      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.status = "paid";
        order.stripeSessionId = session.id;
        order.demoMode = false;
        await saveOrder(order);
        await sendOrderConfirmation(order);
      }
    }
  }

  return NextResponse.json({ received: true });
}
