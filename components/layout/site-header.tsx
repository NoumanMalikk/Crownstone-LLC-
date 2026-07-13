"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  GitCompareArrows,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { mainNavigation, mobileExtraLinks } from "@/data/navigation";
import { storeConfig } from "@/data/store-config";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCompareStore } from "@/lib/cart/compare-store";
import { useUiStore } from "@/lib/cart/ui-store";
import { cn } from "@/lib/utilities/cn";
import { PredictiveSearch } from "@/components/search/predictive-search";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCartStore((s) => s.open);
  const wishCount = useWishlistStore((s) => s.ids.length);
  const compareCount = useCompareStore((s) => s.ids.length);
  const mobileOpen = useUiStore((s) => s.mobileNavOpen);
  const setMobileOpen = useUiStore((s) => s.setMobileNavOpen);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (mobileOpen || openMenu) {
        setHidden(false);
      } else if (y > lastY && y > 140) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastY(y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, mobileOpen, openMenu]);

  useEffect(() => {
    const id = window.setInterval(() => setAnnounceIndex((i) => (i + 1) % 2), 6000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Over-hero only when the dark homepage campaign sits behind the header.
  const overHero = isHome && !scrolled && !mobileOpen;
  const messages = [
    storeConfig.announcement.primary,
    storeConfig.announcement.secondary,
  ];

  return (
    <>
      <div className="relative z-[60] bg-carbon text-center text-[12px] font-medium text-silver">
        <p className="container-wide px-4 py-2.5 tracking-[0.02em]">{messages[announceIndex]}</p>
      </div>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          hidden && !mobileOpen ? "-translate-y-[120%]" : "translate-y-0",
          overHero
            ? "border-b border-white/10 bg-carbon/55 text-white shadow-none backdrop-blur-xl"
            : "border-b border-border bg-white text-[var(--text)] shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
        )}
      >
        <div
          className={cn(
            "container-wide flex items-center gap-3 px-4 transition-[height] duration-300",
            scrolled ? "h-14" : "h-[4.25rem]"
          )}
        >
          <button
            type="button"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border lg:hidden",
              overHero ? "border-white/25 text-white" : "border-border text-[var(--text)]"
            )}
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Logo
            variant={overHero ? "horizontal-light" : "horizontal"}
            priority
            className="shrink-0"
          />

          <nav className="ml-2 hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {mainNavigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition",
                    overHero
                      ? "text-white/92 hover:bg-white/10 hover:text-white"
                      : "text-[var(--text)] hover:bg-cool-gray hover:text-electric"
                  )}
                  onFocus={() => setOpenMenu(item.label)}
                >
                  {item.label}
                  {item.children ? <ChevronDown className="h-3.5 w-3.5 opacity-70" /> : null}
                </Link>
                {item.children && openMenu === item.label ? (
                  <div className="absolute left-0 top-full z-50 w-[340px] rounded-2xl border border-border bg-white p-3 text-[var(--text)] shadow-2xl">
                    {item.children.map((child) => (
                      <Link
                        key={`${child.href}-${child.label}`}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 hover:bg-cool-gray"
                      >
                        <span className="block text-sm font-semibold">{child.label}</span>
                        {child.description ? (
                          <span className="text-xs text-[var(--text-secondary)]">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
            <div className={cn("hidden md:block", overHero && "[&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/55 [&_svg]:text-white/70")}>
              <PredictiveSearch compact />
            </div>
            <HeaderIcon href="/search" label="Search" className="md:hidden" overHero={overHero}>
              <Search className="h-5 w-5" />
            </HeaderIcon>
            <HeaderIcon href="/compare" label="Compare" overHero={overHero} count={compareCount}>
              <GitCompareArrows className="h-5 w-5" />
            </HeaderIcon>
            <HeaderIcon href="/wishlist" label="Wishlist" overHero={overHero} count={wishCount}>
              <Heart className="h-5 w-5" />
            </HeaderIcon>
            <HeaderIcon href="/account" label="Account" overHero={overHero}>
              <User className="h-5 w-5" />
            </HeaderIcon>
            <button
              type="button"
              onClick={openCart}
              className={cn(
                "relative grid h-11 w-11 place-items-center rounded-full transition",
                overHero ? "text-white hover:bg-white/10" : "text-[var(--text)] hover:bg-cool-gray"
              )}
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 ? <CountBadge count={cartCount} /> : null}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] bg-carbon/50 backdrop-blur-sm lg:hidden">
          <div className="flex h-full w-full max-w-md flex-col bg-white text-[var(--text)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Logo variant="horizontal" />
              <button
                type="button"
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-border"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-border p-4">
              <PredictiveSearch onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {mainNavigation.map((item) => (
                <details key={item.href} className="border-b border-border py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-lg font-semibold">
                    <Link href={item.href} onClick={() => setMobileOpen(false)}>
                      {item.label}
                    </Link>
                    {item.children ? <ChevronDown className="h-4 w-4" /> : null}
                  </summary>
                  {item.children ? (
                    <div className="pb-3 pl-2">
                      {item.children.map((child) => (
                        <Link
                          key={`${child.href}-${child.label}`}
                          href={child.href}
                          className="block py-2 text-[var(--text-secondary)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </details>
              ))}
              <div className="mt-4 space-y-2">
                {mobileExtraLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-3 py-3 font-medium hover:bg-cool-gray"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function HeaderIcon({
  href,
  label,
  children,
  overHero,
  count,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  overHero: boolean;
  count?: number;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative grid h-11 w-11 place-items-center rounded-full transition",
        overHero ? "text-white hover:bg-white/10" : "text-[var(--text)] hover:bg-cool-gray",
        className
      )}
      aria-label={label}
    >
      {children}
      {count && count > 0 ? <CountBadge count={count} /> : null}
    </Link>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-electric px-1 text-[10px] font-bold text-white">
      {count}
    </span>
  );
}
