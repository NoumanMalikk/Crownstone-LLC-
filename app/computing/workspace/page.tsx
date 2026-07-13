import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Workspace Accessories",
  description: "Stands and desk tools that reduce clutter.",
  path: "/computing/workspace",
});

export default function Page() {
  const products = getActiveProducts().filter(p => p.secondaryCategories.includes("workspace") || p.category === "workspace");
  return (
    <CatalogPage
      title={"Workspace Accessories"}
      description={"Stands and desk tools that reduce clutter."}
      products={products}
    />
  );
}
