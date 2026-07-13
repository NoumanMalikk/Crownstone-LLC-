import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "Warranty Information",
  description: "Warranty Information for Crownstone LLC",
  path: "/warranty",
});

export default function Page() {
  return (
    <div className="container-wide px-4 py-12">
      <p className="eyebrow">Crownstone LLC</p>
      <h1 className="heading-display mt-3 text-4xl">Warranty Information</h1>
      <p className="mt-4 max-w-3xl text-sm text-[var(--text-secondary)]">
        This page is a launch template for {storeConfig.legalName}. Require legal review before production use.
      </p>
      <div className="prose-cs mt-10 max-w-3xl space-y-8">
        <section><h2 className="heading-editorial text-2xl">Varies by product</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Warranty coverage varies by the exact product purchased. Crownstone LLC does not invent warranty periods.</p></section>
        <section><h2 className="heading-editorial text-2xl">Manufacturer & supplier coverage</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Manufacturer warranty applies only where verified. Supplier warranty terms may differ.</p></section>
        <section><h2 className="heading-editorial text-2xl">Proof requirements</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Proof of purchase and serial numbers may be required. Misuse, unauthorized modification or regional model mismatches may not be covered.</p></section>
        <section><h2 className="heading-editorial text-2xl">How to start a claim</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Contact Crownstone LLC with your order reference, product model and a description of the issue.</p></section>
      </div>
    </div>
  );
}
