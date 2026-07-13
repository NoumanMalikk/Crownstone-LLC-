"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getActiveProducts, getProductBySlug } from "@/data/products";
import { ProductSlider } from "@/components/sliders/product-slider";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utilities/format";
import { cn } from "@/lib/utilities/cn";

export function HomeSections() {
  const products = useMemo(() => getActiveProducts(), []);
  const newArrivals = products.filter((p) => p.newArrival);
  const featuredComputing = products.filter((p) => p.category === "computing").slice(0, 6);
  const underFifty = products.filter((p) => p.underFifty || p.price < 50);
  const powerProducts = [
    "compact-usb-c-charger-30w",
    "three-port-gan-charger-65w",
    "portable-power-bank-20000mah-65w",
    "eleven-outlet-surge-protector-usb",
  ]
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <section className="bg-soft-white py-16 md:py-20">
        <div className="container-wide relative px-4">
          <p className="eyebrow text-electric">Latest Technology</p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="heading-display text-3xl text-[var(--text)] md:text-5xl">
                New tools for modern routines
              </h2>
              <p className="mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
                Explore recently added computing, power and home-technology products - shown with clean studio photography.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/new-arrivals">View all new arrivals</Link>
            </Button>
          </div>
          <div className="mt-10">
            <ProductSlider products={newArrivals} label="new arrivals" />
          </div>
        </div>
      </section>

      <WorkspaceEditorial />
      <FeaturedComputing products={featuredComputing} />
      <ConnectivityStrip />
      <SetupBuilder />
      <SmartHomeEditorial />
      <PowerSlider products={powerProducts as NonNullable<ReturnType<typeof getProductBySlug>>[]} />
      <ApplianceCampaign />
      <ApplianceReel />
      <ApplianceComparePreview />
      <UnderFifty products={underFifty} />
      <BusinessBand />
      <WhyCrownstone />
      <CompareCallout />
      <JournalTeaser />
      <NewsletterPanel />
    </>
  );
}

function WorkspaceEditorial() {
  const products = [
    "graphite-full-size-wireless-keyboard",
    "precision-wireless-mouse-graphite",
    "4k-usb-webcam-privacy-cover",
    "adjustable-aluminum-laptop-stand-space-gray",
  ]
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container-wide grid items-center gap-10 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="rounded-[2rem] bg-gradient-to-br from-graphite to-deep-slate p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {products.map((product) =>
              product ? (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white p-4 transition hover:-translate-y-0.5"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.images[0].src}
                      alt={product.imageAltText}
                      fill
                      className="object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
                      sizes="280px"
                    />
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
        <div>
          <p className="eyebrow text-electric">The organized workspace</p>
          <h2 className="heading-display mt-3 text-3xl text-[var(--text)] md:text-5xl">
            Less clutter. More focus.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            Create a refined setup with wireless input, clear video, elevated ergonomics and streamlined connectivity.
          </p>
          <Button asChild className="mt-8">
            <Link href="/collections/workspace-essentials">Shop Workspace Essentials</Link>
          </Button>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
            {["Wireless input", "Clear video calls", "Elevated ergonomics"].map((label) => (
              <li key={label} className="text-sm font-semibold text-[var(--text)]">
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeaturedComputing({ products }: { products: ReturnType<typeof getActiveProducts> }) {
  return (
    <section className="bg-soft-white py-20 md:py-24">
      <div className="container-wide px-4">
        <div className="max-w-3xl">
          <p className="eyebrow text-electric">Computing</p>
          <h2 className="heading-display mt-3 text-3xl text-[var(--text)] md:text-5xl">
            Performance begins with the right setup
          </h2>
          <p className="mt-4 max-w-xl text-base text-[var(--text-secondary)]">
            Keyboards, mice and webcams selected for everyday productivity.
          </p>
        </div>
        <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectivityStrip() {
  const items = [
    "ax3000-dual-band-wifi-6-router",
    "usb-wifi-6-adapter-adjustable-antenna",
    "eight-port-gigabit-ethernet-switch",
    "usb-c-eight-port-multiport-hub-space-gray",
    "usb-c-dual-display-docking-station",
  ]
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  return (
    <section className="overflow-hidden bg-graphite py-20 text-white">
      <div className="container-wide px-4">
        <p className="eyebrow text-cyan">Connectivity</p>
        <h2 className="heading-display mt-3 max-w-3xl text-3xl text-white md:text-5xl">
          Connect every part of your day.
        </h2>
        <div className="relative mt-10">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" aria-hidden>
            <path d="M40 120 C 220 40, 420 200, 620 100 S 980 40, 1140 140" stroke="#20C5E8" strokeWidth="1.5" fill="none" />
            <path d="M80 220 C 280 280, 480 120, 700 210 S 1020 260, 1180 180" stroke="#246BFD" strokeWidth="1.5" fill="none" />
          </svg>
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((product) =>
              product ? (
                <Link key={product.id} href={`/product/${product.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-white">
                    <Image src={product.images[0].src} alt={product.imageAltText} fill className="object-contain p-3" />
                  </div>
                  <p className="line-clamp-2 text-sm font-medium text-white">{product.title}</p>
                </Link>
              ) : null
            )}
          </div>
        </div>
        <Button asChild className="mt-10">
          <Link href="/connectivity">Explore Connectivity</Link>
        </Button>
      </div>
    </section>
  );
}

function SetupBuilder() {
  const [workStyle, setWorkStyle] = useState("Home office");
  const [connection, setConnection] = useState("USB-C");
  const [goal, setGoal] = useState("Better video calls");
  const products = useMemo(() => {
    const all = getActiveProducts();
    return all
      .filter((p) => {
        if (goal.includes("video") && /webcam|headset/i.test(p.title)) return true;
        if (goal.includes("ports") && /hub|dock/i.test(p.title)) return true;
        if (goal.includes("storage") && /ssd|flash/i.test(p.title)) return true;
        if (goal.includes("ergonomics") && /stand|keyboard|mouse/i.test(p.title)) return true;
        if (goal.includes("power") && p.category === "power") return true;
        if (connection === "USB-C" && (p.connectionTypes ?? []).includes("USB-C")) return true;
        if (connection === "USB-A" && (p.connectionTypes ?? []).some((c) => c === "USB")) return true;
        return p.collections.includes("workspace-essentials");
      })
      .slice(0, 4);
  }, [connection, goal]);

  return (
    <section className="bg-white py-20">
      <div className="container-wide px-4">
        <h2 className="heading-display text-3xl text-[var(--text)] md:text-4xl">Build Your Setup</h2>
        <p className="mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Choose a work style, connection preference and upgrade goal. No personal data is collected.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Chooser label="Work style" value={workStyle} onChange={setWorkStyle} options={["Home office", "Student setup", "Creative workstation", "Small business desk"]} />
          <Chooser label="Primary device connection" value={connection} onChange={setConnection} options={["USB-A", "USB-C", "Mixed devices"]} />
          <Chooser label="Upgrade goal" value={goal} onChange={setGoal} options={["Better video calls", "More ports", "Better storage", "Better ergonomics", "Cleaner power setup"]} />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Chooser({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4">
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-3 py-2 text-sm transition",
              value === option
                ? "border-electric bg-electric text-white"
                : "border-border hover:border-electric/40"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function SmartHomeEditorial() {
  const items = [
    "mini-matter-smart-wifi-plug-white",
    "color-smart-led-bulb-a19",
    "ax3000-dual-band-wifi-6-router",
    "compact-hd-streaming-device-remote",
    "compact-portable-bluetooth-speaker-charcoal",
  ]
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  return (
    <section className="bg-cool-gray py-20">
      <div className="container-wide px-4">
        <h2 className="heading-display text-3xl text-[var(--text)] md:text-4xl">
          Small devices. Smarter routines.
        </h2>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {items.map((product) =>
            product ? (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="w-[78%] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-border bg-white sm:w-[42%] lg:w-[28%]"
              >
                <div className="relative aspect-[4/3] bg-soft-white">
                  <Image src={product.images[0].src} alt={product.imageAltText} fill className="object-contain p-6" />
                </div>
                <div className="p-5">
                  <p className="heading-editorial text-lg">{product.title}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{product.keySpecification}</p>
                </div>
              </Link>
            ) : null
          )}
        </div>
        <Button asChild className="mt-6">
          <Link href="/smart-home">Shop Smart Home</Link>
        </Button>
      </div>
    </section>
  );
}

function PowerSlider({
  products,
}: {
  products: NonNullable<ReturnType<typeof getProductBySlug>>[];
}) {
  return (
    <section className="bg-gradient-to-br from-electric to-graphite py-20 text-white">
      <div className="container-wide px-4">
        <h2 className="heading-display text-3xl md:text-4xl">Power without the clutter.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-white">
                <Image src={product.images[0].src} alt={product.imageAltText} fill className="object-contain p-4" />
              </div>
              <p className="heading-editorial text-lg">{product.title}</p>
              <dl className="mt-3 space-y-1 text-sm text-silver">
                <div className="flex justify-between gap-3"><dt>Ports</dt><dd>{product.portConfiguration.join(", ") || "Pending verification"}</dd></div>
                <div className="flex justify-between gap-3"><dt>Max output</dt><dd>{product.powerRating ?? "Pending verification"}</dd></div>
                <div className="flex justify-between gap-3"><dt>Cable</dt><dd>Pending verification</dd></div>
                <div className="flex justify-between gap-3"><dt>Compatibility</dt><dd>See product page</dd></div>
              </dl>
              <p className="mt-4 font-semibold">{formatPrice(product.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplianceCampaign() {
  return (
    <section className="relative overflow-hidden py-24">
      <Image src="/campaigns/kitchen.svg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-carbon/55" />
      <div className="container-wide relative z-10 px-4 text-white">
        <p className="eyebrow text-cyan">Crownstone Home</p>
        <h2 className="heading-display mt-3 max-w-3xl text-3xl md:text-5xl">
          Technology that earns its place on the counter.
        </h2>
        <p className="mt-4 max-w-2xl text-silver">
          Explore modern appliances selected for useful performance, compact footprints and clean presentation.
        </p>
        <Button asChild className="mt-8">
          <Link href="/appliances">Shop Appliances</Link>
        </Button>
      </div>
    </section>
  );
}

function ApplianceReel() {
  const cards = [
    { label: "Air Frying", slug: "dual-basket-digital-air-fryer-8qt" },
    { label: "Blending", slug: "professional-countertop-blender-72oz" },
    { label: "Coffee", slug: "compact-drip-coffee-maker-5-cup" },
    { label: "Kettles", slug: "temperature-control-electric-kettle-1-7l" },
    { label: "Home Cleaning", slug: "cordless-handheld-vacuum-graphite" },
  ];
  return (
    <section className="py-16">
      <div className="container-wide grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => {
          const product = getProductBySlug(card.slug);
          if (!product) return null;
          return (
            <Link key={card.label} href={`/product/${product.slug}`} className="overflow-hidden rounded-[1.35rem] border border-border bg-white">
              <div className="relative aspect-square bg-soft-white">
                <Image src={product.images[0].src} alt={product.imageAltText} fill className="object-contain p-6" />
              </div>
              <p className="p-4 heading-editorial text-lg">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ApplianceComparePreview() {
  const appliances = [
    getProductBySlug("dual-basket-digital-air-fryer-8qt"),
    getProductBySlug("professional-countertop-blender-72oz"),
    getProductBySlug("temperature-control-electric-kettle-1-7l"),
  ].filter(Boolean);

  return (
    <section className="bg-cool-gray/50 py-20">
      <div className="container-wide px-4">
        <h2 className="heading-display text-3xl md:text-4xl">Compare the details before you choose.</h2>
        <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4">Detail</th>
                {appliances.map((p) => (
                  <th key={p!.id} className="p-4">{p!.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Capacity", (p: NonNullable<(typeof appliances)[number]>) => p.capacity ?? "-"],
                ["Power", (p: NonNullable<(typeof appliances)[number]>) => p.powerRating ?? "Pending verification"],
                ["Dimensions", (p: NonNullable<(typeof appliances)[number]>) => p.dimensions.display],
                ["Functions", (p: NonNullable<(typeof appliances)[number]>) => p.keyFeatures[0] ?? "-"],
                ["Included accessories", (p: NonNullable<(typeof appliances)[number]>) => p.packageContents.join("; ")],
                ["Price", (p: NonNullable<(typeof appliances)[number]>) => formatPrice(p.price)],
              ].map(([label, getter]) => (
                <tr key={label as string} className="border-b border-border/70">
                  <td className="p-4 font-semibold">{label as string}</td>
                  {appliances.map((p) => (
                    <td key={p!.id} className="p-4 text-[var(--text-secondary)]">
                      {(getter as (p: NonNullable<(typeof appliances)[number]>) => string)(p!)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/compare">Compare Appliances</Link>
        </Button>
      </div>
    </section>
  );
}

function UnderFifty({ products }: { products: ReturnType<typeof getActiveProducts> }) {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fafc,#eef3f8)] py-20">
      <div className="container-wide px-4">
        <div className="max-w-3xl">
          <p className="eyebrow text-electric">Value edits</p>
          <h2 className="heading-display mt-3 text-3xl text-[var(--text)] md:text-5xl">
            Smart upgrades under $50
          </h2>
        </div>
        <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessBand() {
  return (
    <section className="bg-stone py-20 text-white">
      <div className="container-wide px-4">
        <h2 className="heading-display max-w-3xl text-3xl text-white md:text-5xl">
          Buying for a team, office or organization?
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-silver">
          Request quantity pricing for keyboards, mice, headsets, connectivity, networking and workplace technology.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/business/quote">Request Business Pricing</Link>
          </Button>
          <Button asChild variant="secondary" className="text-white">
            <Link href="/collections/business-technology">Explore Business Essentials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyCrownstone() {
  const cards = [
    {
      title: "Exact product presentation",
      text: "Every listing uses professional photography matching the exact product and variation offered.",
    },
    {
      title: "Clear specifications",
      text: "Ports, capacities, dimensions, compatibility and package contents are shown before checkout.",
    },
    {
      title: "Refined product selection",
      text: "Browse a focused catalogue instead of thousands of unrelated listings.",
    },
    {
      title: "Secure checkout",
      text: "Payment and customer information are processed through protected services when connected.",
    },
  ];
  return (
    <section className="py-20">
      <div className="container-wide grid gap-4 px-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-[1.35rem] border border-border bg-white p-6">
            <h3 className="heading-editorial text-xl">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CompareCallout() {
  return (
    <section className="bg-soft-cyan/50 py-16">
      <div className="container-wide flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="heading-display text-3xl">Specifications without the confusion.</h2>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Compare models, connections, capacities, power ratings and dimensions in one clear view.
          </p>
        </div>
        <Button asChild>
          <Link href="/compare">Compare Products</Link>
        </Button>
      </div>
    </section>
  );
}

function JournalTeaser() {
  const articles = [
    { href: "/journal/how-to-choose-the-right-usb-c-hub", title: "How to Choose the Right USB-C Hub" },
    { href: "/journal/practical-home-office-upgrade-checklist", title: "A Practical Home-Office Upgrade Checklist" },
    { href: "/journal/choosing-the-right-compact-kitchen-appliance", title: "Choosing the Right Compact Kitchen Appliance" },
  ];
  return (
    <section className="py-20">
      <div className="container-wide px-4">
        <h2 className="heading-display text-3xl">Crownstone Journal</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.href} href={article.href} className="rounded-[1.35rem] border border-border bg-white p-6 transition hover:border-electric/40">
              <p className="heading-editorial text-xl">{article.title}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-electric">Read guide</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterPanel() {
  return (
    <section className="pb-20">
      <div className="container-wide px-4">
        <div className="rounded-[2rem] bg-graphite px-6 py-12 text-white md:px-12">
          <p className="eyebrow text-cyan">Inside Crownstone</p>
          <h2 className="heading-display mt-3 max-w-2xl text-3xl md:text-4xl">
            New technology, setup ideas and practical buying guides.
          </h2>
          <form
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            action="/api/newsletter"
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: data.get("email"),
                  marketingConsent: data.get("marketingConsent") === "on",
                }),
              });
              form.reset();
              alert("Thanks - if email delivery is configured, you will hear from Crownstone.");
            }}
          >
            <Input name="email" type="email" required placeholder="Email address" className="bg-white" />
            <Button type="submit">Join the List</Button>
          </form>
          <label className="mt-4 flex items-start gap-2 text-sm text-silver">
            <input type="checkbox" name="marketingConsent" className="mt-1" />
            <span>Optional: I agree to receive marketing emails from Crownstone LLC. You can unsubscribe anytime.</span>
          </label>
        </div>
      </div>
    </section>
  );
}
