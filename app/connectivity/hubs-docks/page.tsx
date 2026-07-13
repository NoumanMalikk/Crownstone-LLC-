import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Hubs & Docking",
  description: "Expand ports and displays with USB-C hubs and docks.",
  path: "/connectivity/hubs-docks",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("hubs-docks") || p.category === "hubs-docks");
  return (
    <CatalogPage
      title={"Hubs & Docking"}
      description={"Expand ports and displays with USB-C hubs and docks."}
      products={products}
    />
  );
}
