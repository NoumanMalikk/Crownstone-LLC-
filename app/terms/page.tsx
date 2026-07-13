import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms and Conditions for Crownstone LLC",
  path: "/terms",
});

export default function Page() {
  return (
    <div className="container-wide px-4 py-12">
      <p className="eyebrow">Crownstone LLC</p>
      <h1 className="heading-display mt-3 text-4xl">Terms and Conditions</h1>
      <p className="mt-4 max-w-3xl text-sm text-[var(--text-secondary)]">
        This page is a launch template for {storeConfig.legalName}. Require legal review before production use.
      </p>
      <div className="prose-cs mt-10 max-w-3xl space-y-8">
        <section><h2 className="heading-editorial text-2xl">Agreement</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">By using the Crownstone storefront you agree to these terms with Crownstone LLC.</p></section>
        <section><h2 className="heading-editorial text-2xl">Products & pricing</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Product details, availability and demonstration prices may change. Exact manufacturer models and authorized imagery must be confirmed before production purchase.</p></section>
        <section><h2 className="heading-editorial text-2xl">Orders</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Orders are subject to server-side validation of products, prices, availability, shipping and tax readiness. Payment confirmation is required before an order is marked paid.</p></section>
        <section><h2 className="heading-editorial text-2xl">Limitation of liability</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">To the fullest extent permitted by law, Crownstone LLC is not liable for indirect or consequential damages arising from use of the website or products.</p></section>
        <section><h2 className="heading-editorial text-2xl">Governing law</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">These terms are intended for use under applicable United States and Texas law, subject to legal review.</p></section>
      </div>
    </div>
  );
}
