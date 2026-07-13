import { Suspense } from "react";
import { getActiveProducts } from "@/data/products";
import { filterProducts, sortProducts, type SortOption } from "@/lib/products/filters";
import { CatalogPage } from "@/components/commerce/catalog-page";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Shop All Products",
  description: "Browse the Crownstone catalogue of computing, connectivity, power, smart-home and appliance products.",
  path: "/shop",
});

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; under50?: string; q?: string }>;
}) {
  const params = await searchParams;
  const filtered = filterProducts(getActiveProducts(), {
    underFifty: params.under50 === "1",
    query: params.q,
  });
  const products = sortProducts(filtered, (params.sort as SortOption) ?? "featured");

  return (
    <Suspense fallback={<div className="container-wide px-4 py-20">Loading catalogue…</div>}>
      <CatalogPage
        title="Shop technology with purpose"
        description="Explore the full Crownstone catalogue. Exact models and authorized images are confirmed before production launch."
        products={products}
      />
    </Suspense>
  );
}
