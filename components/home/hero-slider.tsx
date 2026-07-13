"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { getProductBySlug } from "@/data/products";
import { cn } from "@/lib/utilities/cn";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    eyebrow: "Technology for focused work",
    headline: "Build a workspace that works beautifully.",
    text: "Upgrade productivity with refined computing accessories, connectivity and storage.",
    primary: { label: "Shop Workspace Technology", href: "/collections/workspace-essentials" },
    secondary: { label: "Explore New Arrivals", href: "/new-arrivals" },
    scene: "/campaigns/workspace.svg",
    accent: "from-[#0B0D10] via-[#12161d] to-[#1a2740]",
    products: [
      "graphite-full-size-wireless-keyboard",
      "precision-wireless-mouse-graphite",
      "4k-usb-webcam-privacy-cover",
      "adjustable-aluminum-laptop-stand-space-gray",
      "usb-c-eight-port-multiport-hub-space-gray",
    ],
  },
  {
    id: 2,
    eyebrow: "Connected home, simplified",
    headline: "Smarter technology. Less complexity.",
    text: "Discover networking, smart control, power and entertainment products designed for everyday use.",
    primary: { label: "Shop Connected Home", href: "/collections/connected-home" },
    secondary: { label: "Explore Smart Technology", href: "/smart-home" },
    scene: "/campaigns/connected-home.svg",
    accent: "from-[#0B0D10] via-[#13202e] to-[#16324a]",
    products: [
      "ax3000-dual-band-wifi-6-router",
      "mini-matter-smart-wifi-plug-white",
      "color-smart-led-bulb-a19",
      "compact-hd-streaming-device-remote",
      "compact-portable-bluetooth-speaker-charcoal",
    ],
  },
  {
    id: 3,
    eyebrow: "Performance for everyday routines",
    headline: "Bring better technology into the kitchen.",
    text: "Explore compact appliances selected for practical performance and clean modern spaces.",
    primary: { label: "Shop Appliances", href: "/appliances" },
    secondary: { label: "Explore Home Essentials", href: "/appliances/kitchen" },
    scene: "/campaigns/kitchen.svg",
    accent: "from-[#100e0c] via-[#1c1713] to-[#2a2118]",
    products: [
      "dual-basket-digital-air-fryer-8qt",
      "professional-countertop-blender-72oz",
      "temperature-control-electric-kettle-1-7l",
      "compact-drip-coffee-maker-5-cup",
    ],
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
    setProgress(0);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const started = Date.now();
    const tick = window.setInterval(() => {
      if (document.hidden) return;
      const elapsed = Date.now() - started;
      setProgress(Math.min(100, (elapsed / 7000) * 100));
      if (elapsed >= 7000) next();
    }, 50);
    return () => window.clearInterval(tick);
  }, [index, paused, next, reducedMotion]);

  const slide = slides[index];

  return (
    <section
      className="relative isolate h-[min(88vh,920px)] min-h-[600px] overflow-hidden text-white md:min-h-[680px]"
      aria-roledescription="carousel"
      aria-label="Featured technology campaigns"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[900ms]",
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-hidden={i !== index}
        >
          <div className={cn("absolute inset-0 bg-gradient-to-br", item.accent)} />
          <Image
            src={item.scene}
            alt=""
            fill
            priority={i === 0}
            className={cn(
              "object-cover opacity-45 mix-blend-luminosity transition-transform duration-[1000ms] ease-out",
              i === index && !reducedMotion ? "scale-100" : "scale-[1.04]"
            )}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(36,107,253,0.28),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carbon to-transparent" />
        </div>
      ))}

      <div className="container-wide relative z-10 grid h-full items-end gap-10 px-4 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-16">
        <div key={slide.id} className="max-w-2xl animate-fade-up">
          <p className="eyebrow text-cyan">{slide.eyebrow}</p>
          <h1 className="heading-display mt-4 text-[2.6rem] leading-[1.02] text-white sm:text-5xl lg:text-[3.6rem]">
            {slide.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-silver sm:text-lg">
            {slide.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="min-h-12 px-6 shadow-[0_16px_40px_rgba(36,107,253,0.35)]">
              <Link href={slide.primary.href}>{slide.primary.label}</Link>
            </Button>
            <Button asChild variant="secondary" className="min-h-12 border-white/25 text-white hover:bg-white/10">
              <Link href={slide.secondary.href}>{slide.secondary.label}</Link>
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-3">
            {slide.products.map((slug, idx) => {
              const product = getProductBySlug(slug);
              if (!product) return null;
              const span =
                idx === 0 ? "col-span-4 row-span-2 min-h-[280px]" : "col-span-2 min-h-[132px]";
              return (
                <Link
                  key={slug}
                  href={`/product/${slug}`}
                  className={cn(
                    "hero-product-chip group relative overflow-hidden rounded-[1.35rem] p-3 transition duration-500 hover:-translate-y-1",
                    span
                  )}
                >
                  <div className="relative h-full min-h-[100px] overflow-hidden rounded-2xl bg-white">
                    <Image
                      src={product.images[0].src}
                      alt={product.imageAltText}
                      fill
                      className="object-contain p-4 transition duration-700 group-hover:scale-105"
                      sizes="280px"
                    />
                  </div>
                  {idx === 0 ? (
                    <p className="mt-3 line-clamp-1 text-sm font-medium text-silver">
                      {product.title}
                    </p>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="col-span-full flex gap-3 overflow-x-auto pb-1 lg:hidden">
          {slide.products.map((slug) => {
            const product = getProductBySlug(slug);
            if (!product) return null;
            return (
              <Link
                key={slug}
                href={`/product/${slug}`}
                className="hero-product-chip min-w-[148px] rounded-2xl p-2.5"
              >
                <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-white">
                  <Image
                    src={product.images[0].src}
                    alt={product.imageAltText}
                    fill
                    className="object-contain p-2"
                    sizes="148px"
                  />
                </div>
                <p className="line-clamp-2 text-xs font-medium text-silver">{product.title}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="container-wide flex items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <span className="spec-mono text-sm text-silver">
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
            <div className="h-1 w-28 overflow-hidden rounded-full bg-white/20 sm:w-44">
              <div className="h-full bg-electric transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur"
              aria-label="Previous slide"
              onClick={prev}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur"
              aria-label="Next slide"
              onClick={next}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
