import { HeroSlider } from "@/components/home/hero-slider";
import { CategoryRail } from "@/components/home/category-rail";
import { SignatureBento } from "@/components/home/signature-bento";
import { HomeSections } from "@/components/home/home-sections";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Crownstone | Electronics, Computing and Home Appliances",
  description:
    "Shop computing accessories, connectivity, power products, smart-home technology and compact appliances from Crownstone LLC.",
  path: "/",
});

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-soft-white">
      <HeroSlider />
      <CategoryRail />
      <div className="bg-soft-white">
        <SignatureBento />
        <HomeSections />
      </div>
    </div>
  );
}
