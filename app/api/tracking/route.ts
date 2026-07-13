import { NextRequest, NextResponse } from "next/server";
import { getOrderByReference } from "@/lib/orders/store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const reference = String(body.reference ?? "");
  const email = String(body.email ?? "");
  if (!reference || !email) {
    return NextResponse.json({ error: "Reference and email are required" }, { status: 400 });
  }
  const order = await getOrderByReference(reference, email);
  if (!order) {
    return NextResponse.json({ error: "No order found for that reference and email." }, { status: 404 });
  }
  return NextResponse.json({
    reference: order.reference,
    status: order.status,
    paymentStatus: order.paymentStatus,
    fulfillmentStatus: order.fulfillmentStatus,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      model: item.model,
    })),
  });
}
