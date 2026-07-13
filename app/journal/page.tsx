import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Crownstone Journal",
  description: "Practical buying guides for hubs, home offices and compact appliances.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <div className="container-wide px-4 py-12">
      <h1 className="heading-display text-4xl">Crownstone Journal</h1>
      <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
        Short practical guides — not a large content site.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {journalArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/journal/${article.slug}`}
            className="rounded-[1.35rem] border border-border bg-white p-6 transition hover:border-electric/40"
          >
            <p className="text-xs text-[var(--text-secondary)]">{article.publishedAt}</p>
            <h2 className="heading-editorial mt-2 text-xl">{article.title}</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
