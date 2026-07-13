# Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set environment variables from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Keep `NEXT_PUBLIC_STORE_MODE=demo` until catalogue verification and Stripe are complete.
6. Deploy.
7. Configure Stripe webhook endpoint: `https://your-domain/api/stripe/webhook`.
8. Re-test checkout, webhook, order success and confirmation email.

## Security

- Never expose `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` or `CRON_SECRET` to the browser.
- Review security headers in `next.config.ts`.
- Run dependency audit before launch.
