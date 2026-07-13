import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Kitchen Appliances",
  description: "Air fryers, blenders, kettles, toasters and coffee makers.",
  path: "/appliances/kitchen",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("kitchen") || p.category === "kitchen");
  return (
    <CatalogPage
      title={"Kitchen Appliances"}
      description={"Air fryers, blenders, kettles, toasters and coffee makers."}
      products={products}
    />
  );
}
