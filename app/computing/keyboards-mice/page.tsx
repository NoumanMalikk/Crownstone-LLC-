import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Keyboards & Mice",
  description: "Wireless and USB input for focused work.",
  path: "/computing/keyboards-mice",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("keyboards-mice") || p.category === "keyboards-mice");
  return (
    <CatalogPage
      title={"Keyboards & Mice"}
      description={"Wireless and USB input for focused work."}
      products={products}
    />
  );
}
