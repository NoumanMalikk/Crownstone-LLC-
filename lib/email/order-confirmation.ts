import { Resend } from "resend";
import { storeConfig, isDemoMode } from "@/data/store-config";
import type { OrderRecord } from "@/lib/types";
import { formatPrice } from "@/lib/utilities/format";

export function buildOrderConfirmationHtml(order: OrderRecord) {
  const lines = order.items
    .map(
      (item) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #DCE2EA;">${item.title}<br/><span style="color:#647080;font-size:12px;">${item.model}${item.variantLabel ? ` · ${item.variantLabel}` : ""}</span></td><td style="padding:8px 0;border-bottom:1px solid #DCE2EA;">${item.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #DCE2EA;text-align:right;">${formatPrice(item.lineTotal)}</td></tr>`
    )
    .join("");

  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#151A22;background:#F8FAFC;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #DCE2EA;border-radius:16px;padding:32px;">
    <p style="letter-spacing:0.08em;text-transform:uppercase;color:#647080;font-size:12px;">${storeConfig.legalName}</p>
    <h1 style="font-size:24px;margin:8px 0 16px;">Order confirmation</h1>
    <p>Thank you, ${order.customer.firstName}. ${order.demoMode ? "This message was generated in demonstration mode and payment was not collected." : "We received your order."}</p>
    <p><strong>Reference:</strong> ${order.reference}<br/><strong>Email:</strong> ${order.email}<br/><strong>Payment status:</strong> ${order.paymentStatus}</p>
    <table style="width:100%;border-collapse:collapse;margin:24px 0;">${lines}</table>
    <p>Subtotal: ${formatPrice(order.subtotal)}<br/>Shipping (${order.shippingMethodName}): ${formatPrice(order.shipping)}<br/>Tax: ${formatPrice(order.tax)}<br/><strong>Total: ${formatPrice(order.total)}</strong></p>
    <p><strong>Ship to</strong><br/>${order.shippingAddress.line1}${order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br/>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br/>${order.shippingAddress.country}</p>
    <p>Track your order at ${storeConfig.siteUrl}/order-tracking using your reference and email.</p>
    <p>Support: ${storeConfig.email} · ${storeConfig.phone}</p>
  </div></body></html>`;
}

export async function sendOrderConfirmation(order: OrderRecord) {
  const html = buildOrderConfirmationHtml(order);
  if (isDemoMode() || !process.env.RESEND_API_KEY || !process.env.ORDER_EMAIL_FROM) {
    console.info("[demo-email] Order confirmation prepared", {
      reference: order.reference,
      to: order.email,
    });
    return { sent: false, demo: true, html };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.ORDER_EMAIL_FROM,
    to: order.email,
    subject: `${storeConfig.legalName} order ${order.reference}`,
    html,
  });
  return { sent: true, demo: false };
}
