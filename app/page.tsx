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
    <div className="overflow-x-hidden bg-[linear-gradient(180deg,#0B0D10_0%,#0B0D10_42%,#f7f9fc_42%,#ffffff_70%,#f4f7fb_100%)]">
      <HeroSlider />
      <CategoryRail />
      <SignatureBento />
      <HomeSections />
    </div>
  );
}
