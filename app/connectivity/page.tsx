import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Connectivity",
  description: "Hubs, docks, networking and adapters.",
  path: "/connectivity",
});

export default function Page() {
  const products = getProductsByCategory("connectivity");
  return (
    <CatalogPage
      title={"Connectivity"}
      description={"Hubs, docks, networking and adapters."}
      products={products}
    />
  );
}
