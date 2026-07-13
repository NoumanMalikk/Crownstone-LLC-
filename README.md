# Crownstone Storefront

Premium customer-facing electronics, computing and home-appliance e-commerce storefront for **Crownstone LLC**.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand (cart, wishlist, compare)
- Zod + React Hook Form
- Stripe Checkout readiness
- Supabase account readiness
- Resend email readiness
- Vitest + Playwright

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demonstration mode is the default. All 26 products, search, filters, comparison, wishlist, cart and checkout validation work without Stripe, Supabase or Resend credentials.

## Important docs

- [Setup](docs/setup.md)
- [Deployment](docs/deployment.md)
- [Product editing](docs/product-editing.md)
- [Image sourcing](docs/image-sourcing.md)
- [Campaign images](docs/campaign-image-guide.md)
- [Payment setup](docs/payment-setup.md)
- [Launch checklist](docs/launch-checklist.md)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:e2e
```

## Brand

Public brand configuration lives in `data/store-config.ts` and `.env` / `.env.local`. Change the public name without rebuilding the full site architecture.

## Catalogue

Exactly 26 initial products are defined in `data/products.ts`. Development placeholders are used until authorized manufacturer/supplier photography and exact model mapping are complete. Production purchases are blocked for incomplete products when `NEXT_PUBLIC_STORE_MODE=production`.

## No admin dashboard

This repository intentionally contains no `/admin` routes or internal management dashboards.
