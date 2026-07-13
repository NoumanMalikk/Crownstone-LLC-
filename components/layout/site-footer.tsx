import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { storeConfig } from "@/data/store-config";
import { Logo } from "@/components/layout/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-graphite text-silver">
      <div className="container-wide grid gap-10 px-4 py-16 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <Logo variant="horizontal-light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-silver/80">
            {storeConfig.positioning} {storeConfig.supportingStatement}
          </p>
          <div className="mt-6 space-y-1 text-sm">
            <p className="font-semibold text-white">{storeConfig.legalName}</p>
            <p>{storeConfig.brandDescriptor}</p>
            <p>{storeConfig.address.displayShort}</p>
            <p>
              Phone:{" "}
              <a className="hover:text-white" href={storeConfig.phoneHref}>
                {storeConfig.phone}
              </a>
            </p>
            <p className="pt-2 text-xs text-silver/70">
              {storeConfig.address.locationDescriptor}. The registered address is for
              business correspondence and is not presented as a public showroom or
              pickup location.
            </p>
          </div>
        </div>
        {Object.entries(footerNavigation).map(([group, links]) => (
          <div key={group}>
            <p className="eyebrow text-silver/70">{group}</p>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-2 px-4 py-6 text-xs text-silver/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {storeConfig.legalName}. All rights reserved.
          </p>
          <p>{storeConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
