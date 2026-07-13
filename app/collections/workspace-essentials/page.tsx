import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Workspace Essentials",
  description: "Keyboards, mice, stands, hubs and storage for a refined desk.",
  path: "/collections/workspace-essentials",
});

export default function Page() {
  const products = getProductsByCollection("workspace-essentials");
  return (
    <CatalogPage
      title={"Workspace Essentials"}
      description={"Keyboards, mice, stands, hubs and storage for a refined desk."}
      products={products}
    />
  );
}
