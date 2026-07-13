import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Orders",
  description: "View Crownstone order history when accounts are configured.",
  path: "/account/orders",
  noIndex: true,
});

export default function AccountOrdersPage() {
  return (
    <div className="container-wide px-4 py-16">
      <h1 className="heading-display text-4xl">Orders</h1>
      <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
        Order history syncs here when Supabase accounts are connected. You can also use Order Tracking with your reference and email.
      </p>
      <Button asChild className="mt-6">
        <Link href="/order-tracking">Go to order tracking</Link>
      </Button>
    </div>
  );
}
