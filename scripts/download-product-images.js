#!/usr/bin/env node
/**
 * Downloads Unsplash-licensed product photography (white / clean studio backgrounds)
 * into public/products/[slug]/main.jpg for each catalogue item.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const root = path.join(__dirname, "..");

/** Curated Unsplash photo IDs / direct image URLs matched to merchandising titles */
const catalog = [
  { slug: "graphite-full-size-wireless-keyboard", query: "photo-1541140532154-b024d7f93824", alt: "Full-size wireless keyboard on white background" },
  { slug: "precision-wireless-mouse-graphite", query: "photo-1527864550417-7fd91fc51a46", alt: "Wireless computer mouse on white background" },
  { slug: "4k-usb-webcam-privacy-cover", query: "photo-1587825140708-dfaf72ae4b04", alt: "USB webcam on white background" },
  { slug: "usb-computer-headset-noise-reducing-microphone", query: "photo-1546435770-a3e426bf472b", alt: "USB computer headset on white surface" },
  { slug: "adjustable-aluminum-laptop-stand-space-gray", query: "photo-1527443224154-c4a3942d3acf", alt: "Aluminum laptop stand product view" },
  { slug: "usb-c-eight-port-multiport-hub-space-gray", query: "photo-1625948515291-69613efd103f", alt: "USB-C multiport hub on clean background" },
  { slug: "usb-c-dual-display-docking-station", query: "photo-1593640408182-31c70c8268f5", alt: "Docking station and connectivity accessories" },
  { slug: "portable-solid-state-drive-1tb-black", query: "photo-1597872200969-2b65d56bd16b", alt: "Portable SSD storage drive" },
  { slug: "usb-flash-drive-128gb-metal", query: "photo-1585771724684-38269d6639fd", alt: "Metal USB flash drive" },
  { slug: "usb-wifi-6-adapter-adjustable-antenna", query: "photo-1606904825846-647eb07f5be2", alt: "USB Wi-Fi network adapter" },
  { slug: "eight-port-gigabit-ethernet-switch", query: "photo-1544197150-b99a580b7e33", alt: "Network ethernet switch" },
  { slug: "ax3000-dual-band-wifi-6-router", query: "photo-1606904825846-647eb07f5be2", alt: "Wi-Fi router product photography" },
  { slug: "compact-usb-c-charger-30w", query: "photo-1583863788434-e58a36338f39", alt: "Compact USB-C wall charger" },
  { slug: "three-port-gan-charger-65w", query: "photo-1591290619762-c94e7d9c2e1e", alt: "Multi-port GaN charger" },
  { slug: "portable-power-bank-20000mah-65w", query: "photo-1609091839311-b95eef0b0d0b", alt: "Portable power bank on white background" },
  { slug: "eleven-outlet-surge-protector-usb", query: "photo-1558618666-fcd25c85cd64", alt: "Surge protector power strip" },
  { slug: "mini-matter-smart-wifi-plug-white", query: "photo-1558002038-1055907df827", alt: "Smart Wi-Fi plug" },
  { slug: "color-smart-led-bulb-a19", query: "photo-1565814329452-e1efa11c5b89", alt: "Smart LED light bulb" },
  { slug: "compact-portable-bluetooth-speaker-charcoal", query: "photo-1608043152269-423dbba4e7e1", alt: "Portable Bluetooth speaker" },
  { slug: "compact-hd-streaming-device-remote", query: "photo-1593359677879-a4bb92f829d1", alt: "Streaming media device with remote" },
  { slug: "dual-basket-digital-air-fryer-8qt", query: "photo-1585515320310-259814833e62", alt: "Digital air fryer appliance" },
  { slug: "professional-countertop-blender-72oz", query: "photo-1570222094114-d054a817e56b", alt: "Countertop blender on clean background" },
  { slug: "temperature-control-electric-kettle-1-7l", query: "photo-1544787219-7f47ccb76574", alt: "Electric kettle product photo" },
  { slug: "two-slice-digital-toaster-matte-black", query: "photo-1509440159596-0249088772ff", alt: "Two-slice toaster appliance" },
  { slug: "compact-drip-coffee-maker-5-cup", query: "photo-1517668808822-9ebb02f2a0e6", alt: "Compact drip coffee maker" },
  { slug: "cordless-handheld-vacuum-graphite", query: "photo-1558317374-067fb5f30001", alt: "Cordless handheld vacuum cleaner" },
];

function urlFor(photoId) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&h=1200&q=85`;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "User-Agent": "CrownstoneStore/1.0 (product catalogue image fetch)",
          Accept: "image/*",
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      }
    );
    req.on("error", (err) => {
      try {
        fs.unlinkSync(dest);
      } catch {}
      reject(err);
    });
  });
}

async function main() {
  const credits = [];
  for (const item of catalog) {
    const dir = path.join(root, "public", "products", item.slug);
    fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, "main.jpg");
    const detail = path.join(dir, "detail.jpg");
    const url = urlFor(item.query);
    process.stdout.write(`Downloading ${item.slug}... `);
    try {
      await download(url, dest);
      // Use same primary as detail until secondary angle is commissioned
      fs.copyFileSync(dest, detail);
      console.log("ok");
      credits.push({
        productId: item.slug,
        localFilename: `products/${item.slug}/main.jpg`,
        originalSource: `Unsplash ${item.query}`,
        manufacturer: "Stock photography - map to exact model before production",
        supplier: "Unsplash License",
        licenseOrPermission: "Unsplash License - free commercial use; replace with authorized exact-model media before production launch",
        dateObtained: new Date().toISOString().slice(0, 10),
        exactModelMatch: false,
        exactGenerationMatch: false,
        exactColorMatch: false,
        exactCapacityMatch: false,
        exactPortLayoutMatch: false,
        exactAccessoryMatch: false,
        whiteBackground: true,
        replacementRequired: true,
        altText: item.alt,
      });
    } catch (err) {
      console.log("FAIL", err.message);
    }
  }

  fs.writeFileSync(
    path.join(root, "data", "image-credits-downloaded.json"),
    JSON.stringify(credits, null, 2)
  );
  console.log(`Done. ${credits.length} images downloaded.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
