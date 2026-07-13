import { CatalogPage } from "@/components/commerce/catalog-page";
import { getActiveProducts, getNewArrivals, getUnderFifty, getBusinessProducts, getProductsByCategory, getProductsByCollection } from "@/data/products";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Audio & Entertainment",
  description: "Bluetooth audio and streaming devices.",
  path: "/audio-entertainment",
});

export default function Page() {
  const products = getProductsByCategory("audio-entertainment");
  return (
    <CatalogPage
      title={"Audio & Entertainment"}
      description={"Bluetooth audio and streaming devices."}
      products={products}
    />
  );
}
