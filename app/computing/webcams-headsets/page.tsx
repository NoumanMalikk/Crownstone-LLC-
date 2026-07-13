import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Webcams & Headsets",
  description: "Clear video and voice for calls and learning.",
  path: "/computing/webcams-headsets",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("webcams-headsets") || p.category === "webcams-headsets");
  return (
    <CatalogPage
      title={"Webcams & Headsets"}
      description={"Clear video and voice for calls and learning."}
      products={products}
    />
  );
}
