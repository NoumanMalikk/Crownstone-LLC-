import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Home Cleaning",
  description: "Compact cordless cleaning tools.",
  path: "/appliances/home-cleaning",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("home-cleaning") || p.category === "home-cleaning");
  return (
    <CatalogPage
      title={"Home Cleaning"}
      description={"Compact cordless cleaning tools."}
      products={products}
    />
  );
}
