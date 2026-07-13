import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-wide px-4 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="heading-display mt-3 text-4xl">Page not found</h1>
      <p className="mt-4 text-[var(--text-secondary)]">
        The page you requested is not part of the Crownstone storefront.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </div>
  );
}
