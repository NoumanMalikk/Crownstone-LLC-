import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Crownstone Business",
  description: "Request quantity pricing for workplace technology from Crownstone LLC.",
  path: "/business",
});

export default function BusinessPage() {
  return (
    <div className="container-wide px-4 py-16">
      <p className="eyebrow">Crownstone Business</p>
      <h1 className="heading-display mt-3 max-w-3xl text-4xl md:text-5xl">
        Buying for a team, office or organization?
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
        Request quantity pricing for keyboards, mice, headsets, connectivity, networking and workplace technology.
        Submitting a request does not guarantee wholesale pricing.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/business/quote">Request Business Pricing</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/collections/business-technology">Explore Business Essentials</Link>
        </Button>
      </div>
    </div>
  );
}
