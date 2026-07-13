import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Networking",
  description: "Routers, switches and Wi-Fi adapters.",
  path: "/connectivity/networking",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("networking") || p.category === "networking");
  return (
    <CatalogPage
      title={"Networking"}
      description={"Routers, switches and Wi-Fi adapters."}
      products={products}
    />
  );
}
