import { faqs } from "@/data/faq";
import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Answers about shipping, returns, warranty, business quotes and shopping with Crownstone.",
  path: "/faq",
});

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="container-wide px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="heading-display text-4xl">FAQ</h1>
      <p className="mt-3 text-[var(--text-secondary)]">Helpful answers from {storeConfig.legalName}.</p>
      <div className="mt-10 space-y-4">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-2xl border border-border bg-white p-5">
            <summary className="cursor-pointer heading-editorial text-lg">{faq.question}</summary>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
