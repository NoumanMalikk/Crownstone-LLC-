import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utilities/cn";
import { storeConfig } from "@/data/store-config";

type LogoVariant = "horizontal" | "horizontal-light" | "stacked" | "mark";

const sources: Record<LogoVariant, string> = {
  horizontal: "/brand/logo-horizontal.svg",
  "horizontal-light": "/brand/logo-horizontal-light.svg",
  stacked: "/brand/logo-stacked.svg",
  mark: "/brand/mark.svg",
};

export function Logo({
  variant = "horizontal",
  className,
  priority = false,
}: {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}) {
  const isMark = variant === "mark";
  const isStacked = variant === "stacked";
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={`${storeConfig.publicName} home`}
    >
      <Image
        src={sources[variant]}
        alt={storeConfig.publicName}
        width={isMark ? 36 : isStacked ? 120 : 168}
        height={isMark ? 36 : isStacked ? 90 : 32}
        priority={priority}
        className={cn(
          isMark ? "h-9 w-9" : isStacked ? "h-auto w-28" : "h-8 w-auto"
        )}
      />
    </Link>
  );
}
