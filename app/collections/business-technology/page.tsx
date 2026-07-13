import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Business Technology",
  description: "Quantity-ready computing, connectivity and workplace tools.",
  path: "/collections/business-technology",
});

export default function Page() {
  const products = getBusinessProducts();
  return (
    <CatalogPage
      title={"Business Technology"}
      description={"Quantity-ready computing, connectivity and workplace tools."}
      products={products}
    />
  );
}
