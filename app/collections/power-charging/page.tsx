import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Power & Charging",
  description: "GaN chargers, power banks and surge protection.",
  path: "/collections/power-charging",
});

export default function Page() {
  const products = getProductsByCollection("power-charging");
  return (
    <CatalogPage
      title={"Power & Charging"}
      description={"GaN chargers, power banks and surge protection."}
      products={products}
    />
  );
}
