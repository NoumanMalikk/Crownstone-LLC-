import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Smart Home",
  description: "Smart plugs, lighting and connected routines.",
  path: "/smart-home",
});

export default function Page() {
  const products = getProductsByCategory("smart-home");
  return (
    <CatalogPage
      title={"Smart Home"}
      description={"Smart plugs, lighting and connected routines."}
      products={products}
    />
  );
}
