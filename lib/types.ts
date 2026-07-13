export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder";

export type CurrencyCode = "USD";

export interface ProductDimensions {
  lengthIn?: number;
  widthIn?: number;
  heightIn?: number;
  display: string;
}

export interface ProductWeight {
  ounces?: number;
  pounds?: number;
  display: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  type: "main" | "rear" | "side" | "detail" | "package" | "scale" | "lifestyle" | "packaging" | "placeholder";
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  label: string;
  skuSuffix?: string;
  color?: string;
  colorHex?: string;
  capacity?: string;
  priceAdjustment?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  sku: string;
  supplierSku: string;
  upc?: string;
  slug: string;
  brand: string;
  manufacturer: string;
  exactModel: string;
  modelGeneration?: string;
  title: string;
  subtitle?: string;
  category: string;
  secondaryCategories: string[];
  collections: string[];
  price: number;
  compareAtPrice?: number;
  currency: CurrencyCode;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  compatibility: string[];
  systemRequirements: string[];
  dimensions: ProductDimensions;
  weight: ProductWeight;
  capacity?: string;
  powerRating?: string;
  voltage?: string;
  frequency?: string;
  portConfiguration: string[];
  cableLength?: string;
  packageContents: string[];
  warrantyInformation: string;
  certificationInformation: string[];
  safetyInformation: string[];
  images: ProductImage[];
  imageAltText: string;
  imageSource: string;
  imageLicense: string;
  availableColors: { name: string; hex: string }[];
  availableCapacities: string[];
  availableVariants: ProductVariant[];
  stockStatus: StockStatus;
  maximumOrderQuantity: number;
  shippingWeight: number;
  featured: boolean;
  newArrival: boolean;
  underFifty: boolean;
  businessEligible: boolean;
  relatedProductIds: string[];
  active: boolean;
  incomplete: boolean;
  imageReplacementRequired: boolean;
  seoTitle: string;
  seoDescription: string;
  connectionTypes?: string[];
  keySpecification: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  href: string;
  parentId?: string;
  productIds?: string[];
  representativeProductSlug?: string;
  image?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  href: string;
  filter?: {
    collection?: string;
    underFifty?: boolean;
    businessEligible?: boolean;
    newArrival?: boolean;
    category?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  addedAt: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  price: number;
}

export interface OrderLineItem {
  productId: string;
  sku: string;
  supplierSku: string;
  title: string;
  model: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageSrc: string;
}

export interface OrderRecord {
  id: string;
  reference: string;
  email: string;
  status: "pending_payment" | "paid" | "processing" | "shipped" | "cancelled" | "demo_incomplete";
  paymentStatus: "unpaid" | "paid" | "failed" | "demo";
  fulfillmentStatus: "unfulfilled" | "partial" | "fulfilled";
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: CurrencyCode;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethodId: string;
  shippingMethodName: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  stripeSessionId?: string;
  demoMode: boolean;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ImageCredit {
  productId: string;
  localFilename: string;
  originalSource: string;
  manufacturer: string;
  supplier: string;
  licenseOrPermission: string;
  dateObtained: string;
  exactModelMatch: boolean;
  exactGenerationMatch: boolean;
  exactColorMatch: boolean;
  exactCapacityMatch: boolean;
  exactPortLayoutMatch: boolean;
  exactAccessoryMatch: boolean;
  whiteBackground: boolean;
  replacementRequired: boolean;
  altText: string;
}
