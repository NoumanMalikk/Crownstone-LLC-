import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Products Under $50",
  description: "Practical upgrades priced under fifty dollars.",
  path: "/collections/under-50",
});

export default function Page() {
  const products = getUnderFifty();
  return (
    <CatalogPage
      title={"Products Under $50"}
      description={"Practical upgrades priced under fifty dollars."}
      products={products}
    />
  );
}
