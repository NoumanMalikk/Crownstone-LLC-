import { QuoteForm } from "@/components/forms/quote-form";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Business Quote",
  description: "Request business quantity pricing from Crownstone LLC.",
  path: "/business/quote",
});

export default function BusinessQuotePage() {
  return (
    <div className="container-wide px-4 py-12">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="heading-display text-4xl">Business quantity request</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          Tell us what you need. Crownstone LLC will review quantity, timing and shipping requirements.
        </p>
      </div>
      <QuoteForm />
    </div>
  );
}
