import { notFound } from "next/navigation";
import { getJournalArticle, journalArticles } from "@/data/journal";
import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/journal/${article.slug}`,
  });
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: storeConfig.legalName },
    description: article.excerpt,
  };

  return (
    <article className="container-wide px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow">Journal</p>
      <h1 className="heading-display mt-3 max-w-3xl text-4xl md:text-5xl">{article.title}</h1>
      <p className="mt-4 text-sm text-[var(--text-secondary)]">{article.publishedAt}</p>
      <p className="mt-6 max-w-3xl text-lg text-[var(--text-secondary)]">{article.excerpt}</p>
      <div className="mt-10 max-w-3xl space-y-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="heading-editorial text-2xl">{section.heading}</h2>
            <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
