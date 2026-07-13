import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Computing",
  description: "Keyboards, mice, webcams, headsets and workspace accessories.",
  path: "/computing",
});

export default function Page() {
  const products = getProductsByCategory("computing");
  return (
    <CatalogPage
      title={"Computing"}
      description={"Keyboards, mice, webcams, headsets and workspace accessories."}
      products={products}
    />
  );
}
