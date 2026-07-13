import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "Shipping Policy",
  description: "Shipping Policy for Crownstone LLC",
  path: "/shipping",
});

export default function Page() {
  return (
    <div className="container-wide px-4 py-12">
      <p className="eyebrow">Crownstone LLC</p>
      <h1 className="heading-display mt-3 text-4xl">Shipping Policy</h1>
      <p className="mt-4 max-w-3xl text-sm text-[var(--text-secondary)]">
        This page is a launch template for {storeConfig.legalName}. Require legal review before production use.
      </p>
      <div className="prose-cs mt-10 max-w-3xl space-y-8">
        <section><h2 className="heading-editorial text-2xl">Online fulfillment</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Crownstone LLC ships products according to methods calculated at checkout based on size, weight, quantity and destination.</p></section>
        <section><h2 className="heading-editorial text-2xl">Pickup & local delivery</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Local pickup and local delivery are disabled unless the owner explicitly confirms and configures those services.</p></section>
        <section><h2 className="heading-editorial text-2xl">Timing</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Estimated delivery windows are shown with each shipping method and may vary by carrier and destination.</p></section>
        <section><h2 className="heading-editorial text-2xl">Address accuracy</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Customers are responsible for providing accurate shipping details. Undeliverable shipments may incur additional fees or delays.</p></section>
      </div>
    </div>
  );
}
