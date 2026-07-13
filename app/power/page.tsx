import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Power & Charging",
  description: "Chargers, power banks and surge protection.",
  path: "/power",
});

export default function Page() {
  const products = getProductsByCategory("power");
  return (
    <CatalogPage
      title={"Power & Charging"}
      description={"Chargers, power banks and surge protection."}
      products={products}
    />
  );
}
