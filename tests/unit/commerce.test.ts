import { describe, expect, it } from "vitest";
import { formatPrice, roundMoney } from "@/lib/utilities/format";
import { filterProducts, sortProducts } from "@/lib/products/filters";
import { searchProducts } from "@/lib/products/search";
import { getActiveProducts } from "@/data/products";
import { resolveCartLines, computeSubtotal } from "@/lib/pricing/cart-totals";
import { getShippingMethods } from "@/lib/pricing/shipping";
import { checkoutSchema } from "@/lib/validation/checkout";

describe("price formatting", () => {
  it("formats USD", () => {
    expect(formatPrice(39.99)).toContain("39.99");
  });
  it("rounds money", () => {
    expect(roundMoney(10.005)).toBe(10.01);
  });
});

describe("catalogue", () => {
  it("has exactly 26 active products", () => {
    expect(getActiveProducts()).toHaveLength(26);
  });

  it("never prices below $5", () => {
    expect(getActiveProducts().every((p) => p.price >= 5)).toBe(true);
  });
});

describe("search filters sort", () => {
  it("finds wireless keyboard", () => {
    const results = searchProducts(getActiveProducts(), "wireless keyboard");
    expect(results.some((p) => p.slug.includes("keyboard"))).toBe(true);
  });

  it("filters under fifty", () => {
    const results = filterProducts(getActiveProducts(), { underFifty: true });
    expect(results.every((p) => p.price < 50 || p.underFifty)).toBe(true);
  });

  it("sorts price ascending", () => {
    const sorted = sortProducts(getActiveProducts(), "price-asc");
    expect(sorted[0].price).toBeLessThanOrEqual(sorted[sorted.length - 1].price);
  });
});

describe("cart totals", () => {
  it("computes subtotal from catalogue prices", () => {
    const product = getActiveProducts()[0];
    const lines = resolveCartLines([{ productId: product.id, quantity: 2, addedAt: Date.now() }]);
    expect(computeSubtotal(lines)).toBe(roundMoney(product.price * 2));
  });
});

describe("shipping", () => {
  it("returns configurable methods", () => {
    const methods = getShippingMethods(2);
    expect(methods.length).toBeGreaterThan(0);
    expect(methods[0].price).toBeGreaterThan(0);
  });
});

describe("checkout validation", () => {
  it("requires terms acceptance", () => {
    const parsed = checkoutSchema.safeParse({
      customer: {
        email: "a@b.com",
        firstName: "A",
        lastName: "B",
        phone: "3052039928",
      },
      shippingAddress: {
        line1: "1 Main",
        city: "Lewisville",
        state: "TX",
        postalCode: "75067",
        country: "United States",
      },
      billingSameAsShipping: true,
      shippingMethodId: "standard",
      acceptTerms: false,
      marketingConsent: false,
      items: [{ productId: "prod-001", quantity: 1 }],
    });
    expect(parsed.success).toBe(false);
  });
});

describe("equal card / image ratio contract", () => {
  it("products expose square image dimensions", () => {
    for (const product of getActiveProducts()) {
      expect(product.images[0].width).toBe(product.images[0].height);
    }
  });
});
