import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "Accessibility",
  description: "Accessibility for Crownstone LLC",
  path: "/accessibility",
});

export default function Page() {
  return (
    <div className="container-wide px-4 py-12">
      <p className="eyebrow">Crownstone LLC</p>
      <h1 className="heading-display mt-3 text-4xl">Accessibility</h1>
      <p className="mt-4 max-w-3xl text-sm text-[var(--text-secondary)]">
        This page is a launch template for {storeConfig.legalName}. Require legal review before production use.
      </p>
      <div className="prose-cs mt-10 max-w-3xl space-y-8">
        <section><h2 className="heading-editorial text-2xl">Commitment</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">Crownstone aims for WCAG 2.2 AA alignment across navigation, forms, sliders, drawers and checkout.</p></section>
        <section><h2 className="heading-editorial text-2xl">Features</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">The storefront includes skip links, keyboard support, visible focus, reduced-motion preferences and screen-reader announcements where practical.</p></section>
        <section><h2 className="heading-editorial text-2xl">Feedback</h2><p className="mt-3 text-[var(--text-secondary)] leading-relaxed">If you encounter an accessibility barrier, contact Crownstone LLC so we can improve the experience.</p></section>
      </div>
    </div>
  );
}
