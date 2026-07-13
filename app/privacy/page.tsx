import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Crownstone LLC",
  path: "/privacy",
});

export default function Page() {
  return (
    <div className="container-wide px-4 py-12">
      <p className="eyebrow">Crownstone LLC</p>
      <h1 className="heading-display mt-3 text-4xl">Privacy Policy</h1>
      <p className="mt-4 max-w-3xl text-sm text-[var(--text-secondary)]">
        This page is a launch template for {storeConfig.legalName}. Require legal review before production use.
      </p>
      <div className="prose-cs mt-10 max-w-3xl space-y-8">
        <section><h2 className="heading-editorial text-2xl">Who we are</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Crownstone LLC is a Lewisville, Texas-based online electronics and appliance retailer. Contact details appear in the site footer and Contact page.</p></section>
        <section><h2 className="heading-editorial text-2xl">Information we collect</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">We collect information you submit for orders, contact requests, business quotes, accounts and optional marketing. Payment card data is processed by Stripe when connected and is not collected through ordinary form fields.</p></section>
        <section><h2 className="heading-editorial text-2xl">How we use information</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Information is used to fulfill orders, respond to inquiries, provide tracking updates, improve the storefront and send communications you request or consent to.</p></section>
        <section><h2 className="heading-editorial text-2xl">Sharing</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">We may share information with payment, email, hosting and shipping providers as needed to operate the store. We do not sell personal information.</p></section>
        <section><h2 className="heading-editorial text-2xl">Retention & rights</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Retention periods depend on order, legal and support requirements. Contact Crownstone LLC to request access or correction where applicable.</p></section>
      </div>
    </div>
  );
}
