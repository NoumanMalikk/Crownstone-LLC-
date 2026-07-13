import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export const metadata = buildMetadata({
  title: "Account",
  description: "Crownstone customer account access.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="container-wide px-4 py-16">
      <h1 className="heading-display text-4xl">Account</h1>
      {configured ? (
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          Supabase authentication is configured. Connect sign-in UI credentials in deployment to enable persistent accounts and order history sync.
        </p>
      ) : (
        <div className="mt-6 max-w-2xl rounded-2xl border border-border bg-white p-6">
          <p className="heading-editorial text-xl">Optional accounts</p>
          <p className="mt-3 text-[var(--text-secondary)]">
            Customer accounts are available when Supabase credentials are configured. Until then, you can still shop, track orders with your reference and email, and save wishlist or cart data locally on this device.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/order-tracking">Track an order</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/wishlist">Wishlist</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
