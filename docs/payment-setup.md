# Payment setup

## Demo mode

When Stripe keys are absent or `NEXT_PUBLIC_STORE_MODE=demo`:

- Checkout validates customer, shipping, billing and terms
- No card fields are shown for raw card entry
- Orders are stored as `demo_incomplete` / `paymentStatus: demo`
- Protected success page does not treat demo orders as paid
- Confirmation email content is logged, not sent as production mail unless Resend is configured carefully

## Production Stripe

1. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
2. Add `STRIPE_WEBHOOK_SECRET`
3. Point webhook to `/api/stripe/webhook`
4. Enable Stripe Tax if using destination tax calculation
5. Set `NEXT_PUBLIC_STORE_MODE=production` only after catalogue verification
6. Test paid success, idempotent order updates and email delivery
