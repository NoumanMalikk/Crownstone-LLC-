import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "Return and Refund Policy",
  description: "Return and Refund Policy for Crownstone LLC",
  path: "/returns",
});

export default function Page() {
  return (
    <div className="container-wide px-4 py-12">
      <p className="eyebrow">Crownstone LLC</p>
      <h1 className="heading-display mt-3 text-4xl">Return and Refund Policy</h1>
      <p className="mt-4 max-w-3xl text-sm text-[var(--text-secondary)]">
        This page is a launch template for {storeConfig.legalName}. Require legal review before production use.
      </p>
      <div className="prose-cs mt-10 max-w-3xl space-y-8">
        <section><h2 className="heading-editorial text-2xl">Return period</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Returns are generally considered within 30 days of delivery when products are in original condition with packaging, accessories and serial labels intact. This template requires legal review before launch.</p></section>
        <section><h2 className="heading-editorial text-2xl">Opened electronics & appliances</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Opened electronics and used appliances may have limited return eligibility depending on condition and safety requirements.</p></section>
        <section><h2 className="heading-editorial text-2xl">Defective or incorrect items</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Contact Crownstone LLC for defective, incorrect or shipping-damaged products. Proof of purchase may be required.</p></section>
        <section><h2 className="heading-editorial text-2xl">Refunds</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Approved refunds are processed to the original payment method after inspection. Restocking fees are disabled by default.</p></section>
        <section><h2 className="heading-editorial text-2xl">Return shipping</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Return shipping responsibility depends on the reason for return and will be confirmed during the return request.</p></section>
      </div>
    </div>
  );
}
