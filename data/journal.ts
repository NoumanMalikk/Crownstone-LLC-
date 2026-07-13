export const journalArticles = [
  {
    slug: "how-to-choose-the-right-usb-c-hub",
    title: "How to Choose the Right USB-C Hub",
    excerpt:
      "Match host requirements, port layout, display needs and power delivery before you buy.",
    publishedAt: "2026-06-01",
    seoTitle: "How to Choose the Right USB-C Hub | Crownstone Journal",
    seoDescription:
      "A practical guide to USB-C hubs: host compatibility, ports, displays and power delivery.",
    sections: [
      {
        heading: "Start with your host device",
        body: "Confirm whether your laptop or tablet provides USB-C data, video output and power delivery. Hub performance depends on the host, not only the accessory.",
      },
      {
        heading: "List the ports you actually need",
        body: "Count HDMI or DisplayPort needs, USB-A peripherals, Ethernet, SD readers and charging pass-through. Choose a hub whose verified port layout matches that list.",
      },
      {
        heading: "Check display and OS limitations",
        body: "Dual-display claims are not universal. Review resolution limits, adapter requirements and operating-system constraints on the product page before checkout.",
      },
    ],
  },
  {
    slug: "practical-home-office-upgrade-checklist",
    title: "A Practical Home-Office Upgrade Checklist",
    excerpt:
      "Improve focus with input, video, ergonomics, connectivity and cleaner power - without clutter.",
    publishedAt: "2026-06-08",
    seoTitle: "Home-Office Upgrade Checklist | Crownstone Journal",
    seoDescription:
      "A practical checklist for upgrading a home office with computing accessories and connectivity.",
    sections: [
      {
        heading: "Input and posture",
        body: "A full-size keyboard, precise mouse and adjustable laptop stand can reduce reach and raise screen height. Verify compatibility and weight capacity on each listing.",
      },
      {
        heading: "Video and voice",
        body: "Clear calls usually need a dedicated webcam and headset. Review connection type, microphone details and package contents before purchasing.",
      },
      {
        heading: "Ports and power",
        body: "A USB-C hub or dock plus a verified charger or surge protector helps keep cables intentional. Confirm port counts and electrical ratings on the product pages.",
      },
    ],
  },
  {
    slug: "choosing-the-right-compact-kitchen-appliance",
    title: "Choosing the Right Compact Kitchen Appliance",
    excerpt:
      "Compare capacity, footprint, power and cleaning needs for air fryers, blenders, kettles and more.",
    publishedAt: "2026-06-15",
    seoTitle: "Choosing Compact Kitchen Appliances | Crownstone Journal",
    seoDescription:
      "How to compare compact kitchen appliances by capacity, power, footprint and cleaning.",
    sections: [
      {
        heading: "Capacity versus counter space",
        body: "Measure the space you can spare, then compare published capacity and exterior dimensions. Compact does not always mean low capacity.",
      },
      {
        heading: "Functions you will use weekly",
        body: "Prioritize temperature control, presets and accessories that match your routines. Ignore unverified feature claims until the exact model is confirmed.",
      },
      {
        heading: "Cleaning and safety",
        body: "Review dishwasher guidance, removable parts, automatic shutoff and boil-dry protection where listed. Follow only verified safety information.",
      },
    ],
  },
] as const;

export function getJournalArticle(slug: string) {
  return journalArticles.find((a) => a.slug === slug);
}
