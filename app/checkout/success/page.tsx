import Link from "next/link";
import { getOrderByReference, getOrderByStripeSession } from "@/lib/orders/store";
import { formatPrice } from "@/lib/utilities/format";
import { buildMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { isStripeConfigured, getStripe } from "@/lib/stripe/client";

export const metadata = buildMetadata({
  title: "Order success",
  description: "Your Crownstone LLC order confirmation.",
  path: "/checkout/success",
  noIndex: true,
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  let order = null as Awaited<ReturnType<typeof getOrderByReference>>;

  if (params.session_id && isStripeConfigured()) {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(params.session_id);
    if (session.payment_status === "paid") {
      order = await getOrderByStripeSession(params.session_id);
    }
  } else if (params.reference) {
    order = await getOrderByReference(params.reference);
    if (order && order.paymentStatus !== "paid") {
      order = null;
    }
  }

  if (!order) {
    return (
      <div className="container-wide px-4 py-20 text-center">
        <h1 className="heading-display text-3xl">Order not confirmed</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          This success page only displays after verified payment. Demonstration checkouts do not create paid orders.
        </p>
        <Button asChild className="mt-6">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-wide px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-border bg-white p-8 text-center shadow-sm animate-fade-up">
        <p className="eyebrow text-success">Payment verified</p>
        <h1 className="heading-display mt-3 text-4xl">Thank you for your order</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Reference <span className="spec-mono text-[var(--text)]">{order.reference}</span>
        </p>
        <p className="mt-2 text-sm">Confirmation details were prepared for {order.email}.</p>
        <ul className="mt-8 space-y-3 text-left text-sm">
          {order.items.map((item) => (
            <li key={item.sku + item.quantity} className="flex justify-between gap-4 border-b border-border pb-2">
              <span>{item.title} × {item.quantity}</span>
              <span>{formatPrice(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-semibold">Total {formatPrice(order.total)}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/order-tracking">Track order</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
