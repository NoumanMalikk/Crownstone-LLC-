import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Connected Home",
  description: "Networking, smart control, streaming and Bluetooth audio.",
  path: "/collections/connected-home",
});

export default function Page() {
  const products = getProductsByCollection("connected-home");
  return (
    <CatalogPage
      title={"Connected Home"}
      description={"Networking, smart control, streaming and Bluetooth audio."}
      products={products}
    />
  );
}
