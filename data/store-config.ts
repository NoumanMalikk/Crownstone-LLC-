export const storeConfig = {
  publicName: process.env.NEXT_PUBLIC_STORE_NAME ?? "Crownstone",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Crownstone LLC",
  brandDescriptor:
    process.env.NEXT_PUBLIC_BRAND_DESCRIPTOR ??
    "Electronics, Computing & Home Appliances",
  positioning: "Technology with purpose.",
  tagline: "Designed for the way you live.",
  supportingStatement:
    "Discover thoughtfully selected electronics, connectivity products, workspace technology and compact appliances through one refined online store.",
  editorialLine: "Smarter tools. Cleaner spaces. Better everyday routines.",
  phone: "+1 (305) 203-9928",
  phoneHref: "tel:+13052039928",
  email: process.env.SUPPORT_EMAIL ?? "support@crownstone.example",
  address: {
    line1: "208 S Shore Pl",
    city: "Lewisville",
    state: "TX",
    postalCode: "75067",
    country: "United States",
    displayShort: "Lewisville, Texas 75067",
    locationDescriptor:
      "Lewisville, Texas-based online electronics and appliance retailer",
  },
  showFullAddress: process.env.NEXT_PUBLIC_SHOW_FULL_ADDRESS === "true",
  storeMode: (process.env.NEXT_PUBLIC_STORE_MODE ?? "demo") as "demo" | "production",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  currency: "USD" as const,
  locale: "en-US",
  announcement: {
    primary:
      "Technology selected for modern work, connected homes and everyday living.",
    secondary:
      "Business quantity requests are available through Crownstone Business.",
  },
  shipping: {
    localPickupEnabled: false,
    localDeliveryEnabled: false,
    freeShippingEnabled: false,
    freeShippingThreshold: null as number | null,
    message:
      "Available shipping methods and costs are calculated during checkout based on product size, weight, quantity and destination.",
    methods: [
      {
        id: "standard",
        name: "Standard Shipping",
        description: "Ground delivery for most contiguous U.S. destinations.",
        estimatedDays: "5-8 business days",
        baseRate: 8.99,
        perPound: 1.25,
      },
      {
        id: "expedited",
        name: "Expedited Shipping",
        description: "Faster ground and regional air service where available.",
        estimatedDays: "2-4 business days",
        baseRate: 18.99,
        perPound: 2.1,
      },
    ],
  },
  tax: {
    provider: "stripe_tax" as "stripe_tax" | "external" | "destination",
    message:
      "Applicable sales tax is calculated at checkout based on destination and product type when tax services are connected.",
  },
  returns: {
    periodDays: 30,
    restockingFeeEnabled: false,
    requiresLegalReview: true,
  },
  comparison: {
    maxProducts: 4,
  },
  cart: {
    maxQuantityPerItem: 20,
  },
  demo: {
    notice:
      "Demonstration mode is active. Checkout validates your details but does not collect card information, mark orders as paid, or send production emails until Stripe and email credentials are configured.",
  },
  social: {
    ogImage: "/brand/og-image.svg",
  },
} as const;

export type StoreConfig = typeof storeConfig;

export function isDemoMode() {
  if (storeConfig.storeMode === "demo") return true;
  // Stripe secret is server-only; absence on the server means demo checkout.
  if (typeof window === "undefined") {
    return !process.env.STRIPE_SECRET_KEY;
  }
  return false;
}
