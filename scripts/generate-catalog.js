#!/usr/bin/env node
/**
 * Generates product placeholder SVGs and the complete products.ts catalog.
 * Placeholders are development-only and marked replacement-required.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const catalog = [
  { id: "prod-001", sku: "CRN-COM-001", slug: "graphite-full-size-wireless-keyboard", title: "Graphite Full-Size Wireless Keyboard", category: "computing", secondary: ["keyboards-mice"], collections: ["workspace-essentials", "new-arrivals", "business-technology"], price: 39.99, color: "Graphite", hex: "#4A5058", keySpec: "Full-size · Wireless · Graphite", underFifty: true, featured: true, newArrival: true, business: true, connections: ["Wireless"], related: ["prod-002", "prod-003", "prod-005"], weight: 1.4, shape: "keyboard" },
  { id: "prod-002", sku: "CRN-COM-002", slug: "precision-wireless-mouse-graphite", title: "Precision Wireless Mouse, Graphite", category: "computing", secondary: ["keyboards-mice"], collections: ["workspace-essentials", "business-technology"], price: 29.99, color: "Graphite", hex: "#4A5058", keySpec: "Wireless · Graphite", underFifty: true, featured: true, newArrival: false, business: true, connections: ["Wireless"], related: ["prod-001", "prod-005", "prod-003"], weight: 0.4, shape: "mouse" },
  { id: "prod-003", sku: "CRN-COM-003", slug: "4k-usb-webcam-privacy-cover", title: "4K USB Webcam with Privacy Cover", category: "computing", secondary: ["webcams-headsets"], collections: ["workspace-essentials", "new-arrivals", "business-technology"], price: 79.99, color: "Black", hex: "#1A1D22", keySpec: "USB · Privacy cover", underFifty: false, featured: true, newArrival: true, business: true, connections: ["USB"], related: ["prod-001", "prod-004", "prod-007"], weight: 0.6, shape: "webcam", note: "Do not claim 4K until verified." },
  { id: "prod-004", sku: "CRN-COM-004", slug: "usb-computer-headset-noise-reducing-microphone", title: "USB Computer Headset with Noise-Reducing Microphone", category: "computing", secondary: ["webcams-headsets"], collections: ["workspace-essentials", "business-technology"], price: 39.99, color: "Black", hex: "#1A1D22", keySpec: "USB · Noise-reducing mic", underFifty: true, featured: false, newArrival: false, business: true, connections: ["USB"], related: ["prod-003", "prod-001", "prod-019"], weight: 0.7, shape: "headset" },
  { id: "prod-005", sku: "CRN-COM-005", slug: "adjustable-aluminum-laptop-stand-space-gray", title: "Adjustable Aluminum Laptop Stand, Space Gray", category: "computing", secondary: ["workspace"], collections: ["workspace-essentials", "new-arrivals"], price: 42.99, color: "Space Gray", hex: "#6B717A", keySpec: "Aluminum · Space Gray · Adjustable", underFifty: true, featured: true, newArrival: true, business: true, connections: [], related: ["prod-001", "prod-002", "prod-006"], weight: 2.0, shape: "stand" },
  { id: "prod-006", sku: "CRN-CON-001", slug: "usb-c-eight-port-multiport-hub-space-gray", title: "USB-C Eight-Port Multiport Hub, Space Gray", category: "connectivity", secondary: ["hubs-docks"], collections: ["workspace-essentials", "new-arrivals", "business-technology"], price: 59.99, color: "Space Gray", hex: "#6B717A", keySpec: "USB-C · 8 ports · Space Gray", underFifty: false, featured: true, newArrival: true, business: true, connections: ["USB-C"], related: ["prod-007", "prod-005", "prod-001"], weight: 0.5, shape: "hub" },
  { id: "prod-007", sku: "CRN-CON-002", slug: "usb-c-dual-display-docking-station", title: "USB-C Dual-Display Docking Station", category: "connectivity", secondary: ["hubs-docks"], collections: ["workspace-essentials", "business-technology"], price: 169.99, color: "Space Gray", hex: "#6B717A", keySpec: "USB-C · Dual-display dock", underFifty: false, featured: true, newArrival: false, business: true, connections: ["USB-C"], related: ["prod-006", "prod-008", "prod-014"], weight: 1.8, shape: "dock" },
  { id: "prod-008", sku: "CRN-STO-001", slug: "portable-solid-state-drive-1tb-black", title: "Portable Solid-State Drive, 1 TB, Black", category: "storage", secondary: ["computing"], collections: ["workspace-essentials", "new-arrivals"], price: 99.99, color: "Black", hex: "#1A1D22", keySpec: "1 TB · Portable SSD · Black", underFifty: false, featured: true, newArrival: true, business: true, connections: ["USB-C"], related: ["prod-009", "prod-007", "prod-006"], weight: 0.3, shape: "ssd", capacity: "1 TB" },
  { id: "prod-009", sku: "CRN-STO-002", slug: "usb-flash-drive-128gb-metal", title: "USB Flash Drive, 128 GB, Metal", category: "storage", secondary: ["computing"], collections: ["under-50"], price: 17.99, color: "Metal", hex: "#A8B0B0", keySpec: "128 GB · Metal", underFifty: true, featured: false, newArrival: false, business: true, connections: ["USB"], related: ["prod-008", "prod-006"], weight: 0.1, shape: "flash", capacity: "128 GB" },
  { id: "prod-010", sku: "CRN-NET-001", slug: "usb-wifi-6-adapter-adjustable-antenna", title: "USB Wi-Fi 6 Adapter with Adjustable Antenna", category: "connectivity", secondary: ["networking"], collections: ["connected-home", "business-technology"], price: 34.99, color: "Black", hex: "#1A1D22", keySpec: "Wi-Fi 6 · USB · Antenna", underFifty: true, featured: false, newArrival: false, business: true, connections: ["USB"], related: ["prod-012", "prod-011", "prod-006"], weight: 0.3, shape: "adapter" },
  { id: "prod-011", sku: "CRN-NET-002", slug: "eight-port-gigabit-ethernet-switch", title: "Eight-Port Gigabit Ethernet Switch", category: "connectivity", secondary: ["networking"], collections: ["connected-home", "business-technology"], price: 39.99, color: "Black", hex: "#1A1D22", keySpec: "8-port · Gigabit", underFifty: true, featured: false, newArrival: false, business: true, connections: ["Ethernet"], related: ["prod-012", "prod-010", "prod-007"], weight: 1.2, shape: "switch" },
  { id: "prod-012", sku: "CRN-NET-003", slug: "ax3000-dual-band-wifi-6-router", title: "AX3000 Dual-Band Wi-Fi 6 Router", category: "connectivity", secondary: ["networking"], collections: ["connected-home", "new-arrivals", "business-technology"], price: 109.99, color: "Black", hex: "#1A1D22", keySpec: "AX3000 · Wi-Fi 6 · Dual-band", underFifty: false, featured: true, newArrival: true, business: true, connections: ["Ethernet", "Wi-Fi"], related: ["prod-010", "prod-011", "prod-017"], weight: 2.2, shape: "router" },
  { id: "prod-013", sku: "CRN-PWR-001", slug: "compact-usb-c-charger-30w", title: "Compact USB-C Charger, 30W", category: "power", secondary: [], collections: ["power-charging", "under-50", "new-arrivals"], price: 24.99, color: "White", hex: "#F4F6F8", keySpec: "30W · USB-C · Compact", underFifty: true, featured: false, newArrival: true, business: true, connections: ["USB-C"], related: ["prod-014", "prod-015", "prod-016"], weight: 0.3, shape: "charger", power: "30W" },
  { id: "prod-014", sku: "CRN-PWR-002", slug: "three-port-gan-charger-65w", title: "Three-Port GaN Charger, 65W", category: "power", secondary: [], collections: ["power-charging", "workspace-essentials", "new-arrivals"], price: 49.99, color: "White", hex: "#F4F6F8", keySpec: "65W · GaN · 3 ports", underFifty: true, featured: true, newArrival: true, business: true, connections: ["USB-C", "USB-A"], related: ["prod-013", "prod-015", "prod-007"], weight: 0.4, shape: "charger", power: "65W" },
  { id: "prod-015", sku: "CRN-PWR-003", slug: "portable-power-bank-20000mah-65w", title: "Portable Power Bank, 20,000 mAh, 65W", category: "power", secondary: [], collections: ["power-charging"], price: 79.99, color: "Black", hex: "#1A1D22", keySpec: "20,000 mAh · 65W", underFifty: false, featured: true, newArrival: false, business: false, connections: ["USB-C"], related: ["prod-014", "prod-013", "prod-016"], weight: 1.0, shape: "powerbank", capacity: "20,000 mAh", power: "65W" },
  { id: "prod-016", sku: "CRN-PWR-004", slug: "eleven-outlet-surge-protector-usb", title: "Eleven-Outlet Surge Protector with USB Charging", category: "power", secondary: [], collections: ["power-charging", "business-technology"], price: 44.99, color: "Black", hex: "#1A1D22", keySpec: "11 outlets · USB charging", underFifty: true, featured: false, newArrival: false, business: true, connections: ["AC", "USB"], related: ["prod-014", "prod-013", "prod-017"], weight: 2.5, shape: "surge" },
  { id: "prod-017", sku: "CRN-SMT-001", slug: "mini-matter-smart-wifi-plug-white", title: "Mini Matter Smart Wi-Fi Plug, White", category: "smart-home", secondary: [], collections: ["connected-home", "under-50", "new-arrivals"], price: 19.99, color: "White", hex: "#F8FAFC", keySpec: "Matter · Wi-Fi · Mini plug", underFifty: true, featured: true, newArrival: true, business: false, connections: ["Wi-Fi"], related: ["prod-018", "prod-012", "prod-020"], weight: 0.2, shape: "plug" },
  { id: "prod-018", sku: "CRN-SMT-002", slug: "color-smart-led-bulb-a19", title: "Color Smart LED Bulb, A19", category: "smart-home", secondary: [], collections: ["connected-home", "under-50"], price: 16.99, color: "White", hex: "#F8FAFC", keySpec: "A19 · Color smart LED", underFifty: true, featured: false, newArrival: false, business: false, connections: ["Wi-Fi"], related: ["prod-017", "prod-012", "prod-019"], weight: 0.2, shape: "bulb" },
  { id: "prod-019", sku: "CRN-AUD-001", slug: "compact-portable-bluetooth-speaker-charcoal", title: "Compact Portable Bluetooth Speaker, Charcoal", category: "audio-entertainment", secondary: ["audio"], collections: ["connected-home"], price: 49.99, color: "Charcoal", hex: "#364049", keySpec: "Bluetooth · Portable · Charcoal", underFifty: true, featured: true, newArrival: false, business: false, connections: ["Bluetooth"], related: ["prod-020", "prod-017", "prod-004"], weight: 0.8, shape: "speaker" },
  { id: "prod-020", sku: "CRN-ENT-001", slug: "compact-hd-streaming-device-remote", title: "Compact HD Streaming Device with Remote", category: "audio-entertainment", secondary: ["streaming"], collections: ["connected-home", "under-50"], price: 39.99, color: "Black", hex: "#1A1D22", keySpec: "HD streaming · Remote included", underFifty: true, featured: false, newArrival: false, business: false, connections: ["HDMI", "Wi-Fi"], related: ["prod-019", "prod-012", "prod-017"], weight: 0.5, shape: "streamer" },
  { id: "prod-021", sku: "CRN-APP-001", slug: "dual-basket-digital-air-fryer-8qt", title: "Dual-Basket Digital Air Fryer, 8 Quart", category: "appliances", secondary: ["kitchen"], collections: ["new-arrivals"], price: 149.99, color: "Black", hex: "#1A1D22", keySpec: "8 qt · Dual basket · Digital", underFifty: false, featured: true, newArrival: true, business: false, connections: ["AC"], related: ["prod-022", "prod-023", "prod-025"], weight: 14, shape: "airfryer", capacity: "8 Quart", power: "Pending verification" },
  { id: "prod-022", sku: "CRN-APP-002", slug: "professional-countertop-blender-72oz", title: "Professional Countertop Blender, 72 oz", category: "appliances", secondary: ["kitchen"], collections: [], price: 119.99, color: "Silver", hex: "#C5CCD4", keySpec: "72 oz · Countertop blender", underFifty: false, featured: true, newArrival: false, business: false, connections: ["AC"], related: ["prod-021", "prod-023", "prod-024"], weight: 9, shape: "blender", capacity: "72 oz" },
  { id: "prod-023", sku: "CRN-APP-003", slug: "temperature-control-electric-kettle-1-7l", title: "Temperature-Control Electric Kettle, 1.7 Liter", category: "appliances", secondary: ["kitchen"], collections: [], price: 69.99, color: "Stainless", hex: "#C8CED6", keySpec: "1.7 L · Temperature control", underFifty: false, featured: true, newArrival: false, business: false, connections: ["AC"], related: ["prod-025", "prod-024", "prod-021"], weight: 3.2, shape: "kettle", capacity: "1.7 Liter" },
  { id: "prod-024", sku: "CRN-APP-004", slug: "two-slice-digital-toaster-matte-black", title: "Two-Slice Digital Toaster, Matte Black", category: "appliances", secondary: ["kitchen"], collections: [], price: 59.99, color: "Matte Black", hex: "#2A2F36", keySpec: "2-slice · Digital · Matte Black", underFifty: false, featured: false, newArrival: false, business: false, connections: ["AC"], related: ["prod-025", "prod-023", "prod-022"], weight: 4.0, shape: "toaster" },
  { id: "prod:025", sku: "CRN-APP-005", slug: "compact-drip-coffee-maker-5-cup", title: "Compact Drip Coffee Maker, 5 Cup", category: "appliances", secondary: ["kitchen"], collections: ["under-50"], price: 49.99, color: "Black", hex: "#1A1D22", keySpec: "5 cup · Compact drip", underFifty: true, featured: false, newArrival: false, business: false, connections: ["AC"], related: ["prod-023", "prod-024", "prod-021"], weight: 3.5, shape: "coffee", capacity: "5 Cup" },
  { id: "prod-026", sku: "CRN-HOM-001", slug: "cordless-handheld-vacuum-graphite", title: "Cordless Handheld Vacuum, Graphite", category: "appliances", secondary: ["home-cleaning"], collections: ["new-arrivals"], price: 89.99, color: "Graphite", hex: "#4A5058", keySpec: "Cordless · Handheld · Graphite", underFifty: false, featured: true, newArrival: true, business: false, connections: ["USB-C"], related: ["prod-021", "prod-016"], weight: 2.8, shape: "vacuum" },
];

// Fix typo in prod-025 id
catalog[24].id = "prod-025";

function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shapePaths(shape, hex) {
  const fill = hex;
  switch (shape) {
    case "keyboard":
      return `<rect x="180" y="420" width="840" height="280" rx="28" fill="${fill}"/><g fill="#EEF1F5" opacity="0.85">${Array.from({ length: 14 }, (_, i) => `<rect x="${220 + i * 55}" y="470" width="42" height="42" rx="6"/>`).join("")}${Array.from({ length: 12 }, (_, i) => `<rect x="${250 + i * 55}" y="540" width="42" height="42" rx="6"/>`).join("")}</g>`;
    case "mouse":
      return `<ellipse cx="600" cy="560" rx="140" ry="220" fill="${fill}"/><rect x="585" y="420" width="30" height="80" rx="10" fill="#EEF1F5" opacity="0.5"/>`;
    case "webcam":
      return `<rect x="420" y="430" width="360" height="220" rx="40" fill="${fill}"/><circle cx="600" cy="530" r="70" fill="#0B0D10"/><circle cx="600" cy="530" r="36" fill="#246BFD" opacity="0.7"/><rect x="540" y="650" width="120" height="40" rx="8" fill="${fill}"/>`;
    case "headset":
      return `<path d="M320 520c0-160 120-260 280-260s280 100 280 260" stroke="${fill}" stroke-width="48" fill="none"/><rect x="280" y="500" width="110" height="170" rx="36" fill="${fill}"/><rect x="810" y="500" width="110" height="170" rx="36" fill="${fill}"/>`;
    case "stand":
      return `<path d="M360 720 L520 280 H680 L840 720 Z" fill="none" stroke="${fill}" stroke-width="28" stroke-linejoin="round"/><rect x="340" y="700" width="520" height="36" rx="10" fill="${fill}"/>`;
    case "hub":
      return `<rect x="280" y="480" width="640" height="180" rx="28" fill="${fill}"/><g fill="#246BFD">${Array.from({ length: 8 }, (_, i) => `<rect x="${330 + i * 70}" y="540" width="40" height="28" rx="4"/>`).join("")}</g>`;
    case "dock":
      return `<rect x="260" y="460" width="680" height="220" rx="24" fill="${fill}"/><rect x="300" y="510" width="120" height="40" rx="6" fill="#246BFD"/><rect x="450" y="510" width="120" height="40" rx="6" fill="#20C5E8"/><rect x="600" y="510" width="80" height="40" rx="6" fill="#EEF1F5"/>`;
    case "ssd":
      return `<rect x="360" y="440" width="480" height="280" rx="24" fill="${fill}"/><rect x="400" y="560" width="160" height="24" rx="6" fill="#246BFD"/>`;
    case "flash":
      return `<rect x="520" y="360" width="160" height="420" rx="18" fill="${fill}"/><rect x="555" y="300" width="90" height="70" rx="6" fill="#CBD2DC"/>`;
    case "adapter":
      return `<rect x="480" y="500" width="240" height="120" rx="16" fill="${fill}"/><rect x="580" y="360" width="40" height="150" rx="8" fill="${fill}"/><circle cx="600" cy="340" r="28" fill="#246BFD"/>`;
    case "switch":
      return `<rect x="260" y="480" width="680" height="200" rx="20" fill="${fill}"/><g fill="#24815A">${Array.from({ length: 8 }, (_, i) => `<rect x="${300 + i * 75}" y="550" width="50" height="28" rx="4"/>`).join("")}</g>`;
    case "router":
      return `<rect x="340" y="520" width="520" height="180" rx="24" fill="${fill}"/><rect x="400" y="300" width="18" height="230" rx="8" fill="${fill}"/><rect x="590" y="280" width="18" height="250" rx="8" fill="${fill}"/><rect x="780" y="300" width="18" height="230" rx="8" fill="${fill}"/>`;
    case "charger":
      return `<rect x="460" y="420" width="280" height="320" rx="36" fill="${fill}"/><circle cx="600" cy="560" r="36" fill="#246BFD" opacity="0.8"/>`;
    case "powerbank":
      return `<rect x="420" y="360" width="360" height="440" rx="40" fill="${fill}"/><rect x="500" y="440" width="200" height="40" rx="8" fill="#20C5E8" opacity="0.7"/>`;
    case "surge":
      return `<rect x="220" y="500" width="760" height="160" rx="20" fill="${fill}"/><g fill="#EEF1F5">${Array.from({ length: 11 }, (_, i) => `<circle cx="${280 + i * 60}" cy="560" r="14"/>`).join("")}</g>`;
    case "plug":
      return `<rect x="480" y="420" width="240" height="320" rx="28" fill="${fill}"/><rect x="545" y="360" width="50" height="70" rx="6" fill="#CBD2DC"/><rect x="615" y="360" width="50" height="70" rx="6" fill="#CBD2DC"/>`;
    case "bulb":
      return `<circle cx="600" cy="480" r="140" fill="${fill}"/><rect x="545" y="610" width="110" height="120" rx="16" fill="#CBD2DC"/><circle cx="600" cy="480" r="70" fill="#20C5E8" opacity="0.35"/>`;
    case "speaker":
      return `<rect x="380" y="400" width="440" height="360" rx="120" fill="${fill}"/><circle cx="600" cy="560" r="90" fill="#0B0D10" opacity="0.35"/><circle cx="600" cy="560" r="40" fill="#246BFD" opacity="0.6"/>`;
    case "streamer":
      return `<rect x="360" y="500" width="480" height="140" rx="24" fill="${fill}"/><rect x="700" y="420" width="90" height="160" rx="16" fill="#38414D"/>`;
    case "airfryer":
      return `<rect x="300" y="360" width="600" height="420" rx="32" fill="${fill}"/><rect x="360" y="520" width="220" height="180" rx="16" fill="#0B0D10" opacity="0.35"/><rect x="620" y="520" width="220" height="180" rx="16" fill="#0B0D10" opacity="0.35"/>`;
    case "blender":
      return `<path d="M420 720 L460 400 H740 L780 720 Z" fill="${fill}"/><rect x="500" y="280" width="200" height="130" rx="20" fill="#CBD2DC"/><rect x="390" y="700" width="420" height="50" rx="12" fill="#38414D"/>`;
    case "kettle":
      return `<path d="M400 420 h320 v280 a80 80 0 0 1 -80 80 H480 a80 80 0 0 1 -80 -80 Z" fill="${fill}"/><path d="M720 480 h90 a40 40 0 0 1 0 120 h-90" fill="none" stroke="${fill}" stroke-width="28"/><ellipse cx="560" cy="400" rx="110" ry="28" fill="#CBD2DC"/>`;
    case "toaster":
      return `<rect x="320" y="460" width="560" height="280" rx="28" fill="${fill}"/><rect x="400" y="500" width="120" height="160" rx="10" fill="#0B0D10" opacity="0.4"/><rect x="560" y="500" width="120" height="160" rx="10" fill="#0B0D10" opacity="0.4"/>`;
    case "coffee":
      return `<rect x="380" y="400" width="440" height="360" rx="24" fill="${fill}"/><rect x="470" y="280" width="260" height="130" rx="16" fill="#CBD2DC"/><ellipse cx="600" cy="620" rx="70" ry="50" fill="#EEF1F5" opacity="0.5"/>`;
    case "vacuum":
      return `<rect x="420" y="360" width="280" height="420" rx="80" fill="${fill}"/><rect x="700" y="480" width="160" height="60" rx="20" fill="${fill}"/><circle cx="560" cy="700" r="50" fill="#246BFD" opacity="0.5"/>`;
    default:
      return `<rect x="360" y="420" width="480" height="320" rx="28" fill="${fill}"/>`;
  }
}

function svgFor(item, type) {
  const title = escapeXml(item.title);
  const label = type === "main" ? "Exact product image required" : "Secondary view · Exact image required";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-label="${title}">
  <rect width="1200" height="1200" fill="#FFFFFF"/>
  <rect x="48" y="48" width="1104" height="1104" rx="32" fill="#F8FAFC" stroke="#DCE2EA"/>
  ${shapePaths(item.shape, item.hex)}
  <rect x="220" y="980" width="760" height="72" rx="16" fill="#171B21"/>
  <text x="600" y="1024" text-anchor="middle" font-family="Manrope, Inter, sans-serif" font-size="28" font-weight="650" fill="#FFFFFF">${escapeXml(label)}</text>
  <text x="600" y="180" text-anchor="middle" font-family="Manrope, Inter, sans-serif" font-size="26" font-weight="600" fill="#647080">${escapeXml(item.sku)}</text>
</svg>`;
}

const productsDir = path.join(root, "public", "products");
fs.mkdirSync(productsDir, { recursive: true });

const imageCredits = [];
const productObjects = catalog.map((item) => {
  const dir = path.join(productsDir, item.slug);
  fs.mkdirSync(dir, { recursive: true });
  for (const type of ["main", "detail"]) {
    fs.writeFileSync(path.join(dir, `${type}.svg`), svgFor(item, type));
  }
  imageCredits.push({
    productId: item.id,
    localFilename: `products/${item.slug}/main.svg`,
    originalSource: "Crownstone development placeholder silhouette",
    manufacturer: "Pending verification",
    supplier: "Pending verification",
    licenseOrPermission: "Internal placeholder only — replace before production",
    dateObtained: "2026-07-13",
    exactModelMatch: false,
    exactGenerationMatch: false,
    exactColorMatch: false,
    exactCapacityMatch: false,
    exactPortLayoutMatch: false,
    exactAccessoryMatch: false,
    whiteBackground: true,
    replacementRequired: true,
    altText: `${item.title} — exact authorized product image required`,
  });

  const shortDescription = `${item.title} for modern work and home routines. Exact manufacturer, model and specifications require supplier confirmation before production launch.`;
  return `  {
    id: "${item.id}",
    sku: "${item.sku}",
    supplierSku: "PENDING-SUPPLIER-SKU",
    slug: "${item.slug}",
    brand: "Pending verification",
    manufacturer: "Pending verification",
    exactModel: "Pending exact model mapping",
    title: ${JSON.stringify(item.title)},
    category: "${item.category}",
    secondaryCategories: ${JSON.stringify(item.secondary)},
    collections: ${JSON.stringify(item.collections)},
    price: ${item.price},
    currency: "USD",
    shortDescription: ${JSON.stringify(shortDescription)},
    fullDescription: ${JSON.stringify(shortDescription + (item.note ? " " + item.note : "") + " Unverified certifications, speeds and warranty periods are intentionally hidden.")},
    keyFeatures: [
      ${JSON.stringify(item.keySpec)},
      "Exact model pending supplier confirmation",
      "Authorized photography required before production purchase",
    ],
    specifications: {
      Color: ${JSON.stringify(item.color)},
      SKU: "${item.sku}",
      ${item.capacity ? `Capacity: ${JSON.stringify(item.capacity)},` : ""}
      ${item.power ? `"Power rating": ${JSON.stringify(item.power)},` : ""}
      "Verification status": "Specifications incomplete until supplier mapping is complete",
    },
    compatibility: ["Compatible systems pending manufacturer confirmation"],
    systemRequirements: [],
    dimensions: { display: "Pending verification" },
    weight: { display: "Pending verification", pounds: ${item.weight} },
    ${item.capacity ? `capacity: ${JSON.stringify(item.capacity)},` : ""}
    ${item.power ? `powerRating: ${JSON.stringify(item.power)},` : ""}
    portConfiguration: ${JSON.stringify(item.connections.length ? item.connections : [])},
    packageContents: ["Primary product unit", "Additional package contents pending verification"],
    warrantyInformation: "Warranty varies by exact product, manufacturer and supplier. Proof of purchase and serial number may be required. Misuse may not be covered. Regional models may differ.",
    certificationInformation: [],
    safetyInformation: ["Follow manufacturer safety guidance once the exact model is confirmed."],
    images: [
      { src: "/products/${item.slug}/main.svg", alt: ${JSON.stringify(item.title + " — exact authorized product image required")}, type: "placeholder", width: 1200, height: 1200 },
      { src: "/products/${item.slug}/detail.svg", alt: ${JSON.stringify(item.title + " secondary placeholder")}, type: "placeholder", width: 1200, height: 1200 },
    ],
    imageAltText: ${JSON.stringify(item.title + " — exact authorized product image required")},
    imageSource: "Development placeholder — replace with authorized manufacturer or supplier media",
    imageLicense: "Placeholder only. Not for production merchandising.",
    availableColors: [{ name: ${JSON.stringify(item.color)}, hex: "${item.hex}" }],
    availableCapacities: ${JSON.stringify(item.capacity ? [item.capacity] : [])},
    availableVariants: [],
    stockStatus: "in_stock",
    maximumOrderQuantity: 20,
    shippingWeight: ${item.weight},
    featured: ${item.featured},
    newArrival: ${item.newArrival},
    underFifty: ${item.underFifty},
    businessEligible: ${item.business},
    relatedProductIds: ${JSON.stringify(item.related)},
    active: true,
    incomplete: true,
    imageReplacementRequired: true,
    seoTitle: ${JSON.stringify(item.title + " | Crownstone")},
    seoDescription: ${JSON.stringify(shortDescription)},
    connectionTypes: ${JSON.stringify(item.connections)},
    keySpecification: ${JSON.stringify(item.keySpec)},
  }`;
});

const productsTs = `import type { Product } from "@/lib/types";

/**
 * Initial 26-product Crownstone catalogue.
 * Prices are editable demonstration values in USD.
 * Exact manufacturer, model, supplier SKU, certifications and authorized images
 * must be confirmed before production launch. Incomplete products cannot be
 * purchased when NEXT_PUBLIC_STORE_MODE=production.
 */
export const products: Product[] = [
${productObjects.join(",\n")}
];

export function getActiveProducts() {
  return products.filter((p) => p.active);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug && p.active);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string) {
  return getActiveProducts().filter(
    (p) => p.category === category || p.secondaryCategories.includes(category)
  );
}

export function getProductsByCollection(collection: string) {
  return getActiveProducts().filter((p) => p.collections.includes(collection));
}

export function getFeaturedProducts() {
  return getActiveProducts().filter((p) => p.featured);
}

export function getNewArrivals() {
  return getActiveProducts().filter((p) => p.newArrival);
}

export function getUnderFifty() {
  return getActiveProducts().filter((p) => p.underFifty || p.price < 50);
}

export function getBusinessProducts() {
  return getActiveProducts().filter((p) => p.businessEligible);
}
`;

fs.writeFileSync(path.join(root, "data", "products.ts"), productsTs);

const creditsTs = `import type { ImageCredit } from "@/lib/types";

export const imageCredits: ImageCredit[] = ${JSON.stringify(imageCredits, null, 2)};
`;
fs.writeFileSync(path.join(root, "data", "image-credits.ts"), creditsTs);

console.log(`Generated ${catalog.length} products and placeholder images.`);
