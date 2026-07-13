# Setup

## Requirements

- Node.js 20+
- npm 10+

## Install

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Environment

See `.env.example`. Minimum for local demo:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STORE_MODE=demo
SUPPORT_EMAIL=support@your-domain.com
```

## Optional services

| Service | Purpose | Required for demo? |
| --- | --- | --- |
| Stripe | Payments + tax readiness | No |
| Supabase | Accounts / order sync | No |
| Resend | Order confirmation email | No |

## Catalogue generation

Product placeholder silhouettes can be regenerated with:

```bash
node scripts/generate-catalog.js
```

Replace placeholders with authorized images under `public/products/[slug]/` and update `data/image-credits.ts`.
