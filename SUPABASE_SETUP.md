# V4 private digital delivery setup

The repository is ready for a private-storage + database backend, but credentials are intentionally not committed.

## Supabase

Create:

- `orders` table: `id`, `order_id`, `product_id`, `customer_name`, `contact`, `requirements`, `status`, `payment_reference`, `created_at`
- `products` table: `id`, `name`, `price`, `storage_path`, `active`
- Private Storage bucket: `products`

Recommended order statuses:

`pending_payment` → `payment_review` → `paid` → `delivered`

Do not make the storage bucket public. After a trusted server-side payment verification marks an order `paid`, generate a short-lived signed URL for the exact product storage path.

## Environment variables

Configure these in Vercel, never in GitHub:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYMENT_WEBHOOK_SECRET`

The service-role key must remain server-side and must never be exposed to browser JavaScript.

## Payment verification

UPI/Binance manual payments cannot safely be treated as automatically verified by the current frontend. A payment provider/webhook or a controlled server-side verification workflow is required before enabling automatic delivery.
