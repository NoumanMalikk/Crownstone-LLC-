import type { NavItem } from "@/lib/types";

export const mainNavigation: NavItem[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  {
    label: "Computing",
    href: "/computing",
    children: [
      { label: "Keyboards", href: "/computing/keyboards-mice", description: "Full-size and wireless keyboards" },
      { label: "Mice", href: "/computing/keyboards-mice", description: "Precision wireless pointing" },
      { label: "Webcams", href: "/computing/webcams-headsets", description: "Clear video for calls" },
      { label: "Headsets", href: "/computing/webcams-headsets", description: "USB voice clarity" },
      { label: "Laptop Stands", href: "/computing/workspace", description: "Elevated ergonomics" },
      { label: "Storage", href: "/storage", description: "Portable SSD and flash" },
    ],
  },
  {
    label: "Connectivity",
    href: "/connectivity",
    children: [
      { label: "USB Hubs", href: "/connectivity/hubs-docks", description: "Expand ports from USB-C" },
      { label: "Docking Stations", href: "/connectivity/hubs-docks", description: "Displays and peripherals" },
      { label: "Wi-Fi Adapters", href: "/connectivity/networking", description: "USB Wi-Fi upgrades" },
      { label: "Routers", href: "/connectivity/networking", description: "Dual-band Wi-Fi 6" },
      { label: "Network Switches", href: "/connectivity/networking", description: "Gigabit wired ports" },
    ],
  },
  {
    label: "Audio",
    href: "/audio-entertainment",
    children: [
      { label: "Bluetooth Audio", href: "/audio-entertainment", description: "Portable speakers" },
      { label: "Streaming", href: "/audio-entertainment", description: "Compact streaming devices" },
      { label: "Headsets", href: "/computing/webcams-headsets", description: "USB computer headsets" },
    ],
  },
  {
    label: "Smart Home",
    href: "/smart-home",
    children: [
      { label: "Smart Plugs", href: "/smart-home", description: "Matter and Wi-Fi control" },
      { label: "Smart Lighting", href: "/smart-home", description: "Color LED bulbs" },
      { label: "Streaming", href: "/audio-entertainment", description: "Entertainment devices" },
      { label: "Bluetooth Audio", href: "/audio-entertainment", description: "Room-ready sound" },
      { label: "Air Care", href: "/appliances/home-cleaning", description: "Compact cleaning tools" },
    ],
  },
  { label: "Power", href: "/power" },
  {
    label: "Appliances",
    href: "/appliances",
    children: [
      { label: "Air Fryers", href: "/appliances/kitchen", description: "Dual-basket digital cooking" },
      { label: "Blenders", href: "/appliances/kitchen", description: "Countertop blending" },
      { label: "Coffee Makers", href: "/appliances/kitchen", description: "Compact drip coffee" },
      { label: "Kettles", href: "/appliances/kitchen", description: "Temperature control" },
      { label: "Toasters", href: "/appliances/kitchen", description: "Digital two-slice" },
      { label: "Cleaning Appliances", href: "/appliances/home-cleaning", description: "Cordless handheld vacuums" },
    ],
  },
  { label: "Business", href: "/business" },
];

export const mobileExtraLinks = [
  { label: "Business Orders", href: "/business/quote" },
  { label: "Product Comparison", href: "/compare" },
  { label: "Warranty", href: "/warranty" },
  { label: "Contact", href: "/contact" },
  { label: "Order Tracking", href: "/order-tracking" },
  { label: "Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
] as const;

export const footerNavigation = {
  shop: [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Computing", href: "/computing" },
    { label: "Connectivity", href: "/connectivity" },
    { label: "Smart Home", href: "/smart-home" },
    { label: "Audio", href: "/audio-entertainment" },
    { label: "Appliances", href: "/appliances" },
  ],
  collections: [
    { label: "Workspace Essentials", href: "/collections/workspace-essentials" },
    { label: "Connected Home", href: "/collections/connected-home" },
    { label: "Power & Charging", href: "/collections/power-charging" },
    { label: "Products Under $50", href: "/collections/under-50" },
    { label: "Business Technology", href: "/collections/business-technology" },
  ],
  help: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Warranty", href: "/warranty" },
    { label: "Order Tracking", href: "/order-tracking" },
    { label: "Business Pricing", href: "/business/quote" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Crownstone Journal", href: "/journal" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
