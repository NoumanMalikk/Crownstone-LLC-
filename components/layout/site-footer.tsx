import Link from "next/link";
import { footerNavigation } from "@/data/navigation";
import { storeConfig } from "@/data/store-config";
import { Logo } from "@/components/layout/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { legal, ...columns } = footerNavigation;

  return (
    <footer className="mt-auto border-t border-white/10 bg-carbon text-silver">
      <div className="container-wide grid gap-10 px-4 py-16 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <Logo variant="horizontal-light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-silver">
            {storeConfig.positioning} {storeConfig.supportingStatement}
          </p>
          <div className="mt-6 space-y-1.5 text-sm text-silver">
            <p className="font-semibold text-white">{storeConfig.legalName}</p>
            <p>{storeConfig.brandDescriptor}</p>
            <p>{storeConfig.address.displayShort}</p>
            <p>
              Phone:{" "}
              <a className="text-white underline-offset-2 hover:underline" href={storeConfig.phoneHref}>
                {storeConfig.phone}
              </a>
            </p>
            <p className="pt-3 text-[13px] leading-relaxed text-silver/90">
              {storeConfig.address.locationDescriptor}. The registered address is for
              business correspondence and is not presented as a public showroom or
              pickup location.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              Legal
            </p>
            <ul className="mt-3 flex flex-wrap gap-4">
              {legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-silver hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {Object.entries(columns).map(([group, links]) => (
          <div key={group}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
              {group}
            </p>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-silver transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-2 px-4 py-6 text-sm text-silver sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {storeConfig.legalName}. All rights reserved.
          </p>
          <p>{storeConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
