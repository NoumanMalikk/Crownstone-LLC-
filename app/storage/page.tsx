import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Storage",
  description: "Portable SSDs and flash storage.",
  path: "/storage",
});

export default function Page() {
  const products = getProductsByCategory("storage");
  return (
    <CatalogPage
      title={"Storage"}
      description={"Portable SSDs and flash storage."}
      products={products}
    />
  );
}
