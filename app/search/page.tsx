import { Suspense } from "react";
import { getActiveProducts } from "@/data/products";
import { searchProducts } from "@/lib/products/search";
import { sortProducts, type SortOption } from "@/lib/products/filters";
import { CatalogPage } from "@/components/commerce/catalog-page";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Search",
  description: "Search Crownstone products by title, model, category and specifications.",
  path: "/search",
});

async function Results({ q, sort }: { q: string; sort: SortOption }) {
  const products = sortProducts(searchProducts(getActiveProducts(), q || " ", 26), sort);
  return (
    <CatalogPage
      eyebrow="Search"
      title={q ? `Results for “${q}”` : "Search the catalogue"}
      description="Predictive search covers titles, brands, models, categories, capacities, connections and specifications."
      products={q ? products : getActiveProducts()}
    />
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<div className="container-wide px-4 py-20">Searching…</div>}>
      <Results q={params.q ?? ""} sort={(params.sort as SortOption) ?? "featured"} />
    </Suspense>
  );
}
