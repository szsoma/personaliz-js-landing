# Cloudflare Worker Setup

Use this guide when you want to run and deploy the licensed CDN Worker that serves `dist/shifty.min.js` behind signed-domain authorization.

## What the Worker does

The Cloudflare Worker:

1. Receives a request for `/v1/shifty.min.js?license=TOKEN`
2. Validates the license token (HMAC-SHA-256 signature)
3. Checks the token is not revoked
4. Verifies the `Referer` header matches the licensed domain
5. Serves the script with a `private, max-age=3600` cache header

## Prerequisites

- A Cloudflare account that can create and deploy Workers
- Node.js and npm installed locally
- The repository checked out locally

## 1. Install dependencies

```bash
npm ci
```

## 2. Log in to Cloudflare

```bash
npx wrangler login
```

Complete the browser-based OAuth flow.

## 3. Generate a local signing key

```bash
export LICENSE_SIGNING_KEY="$(openssl rand -base64 32)"
printf 'LICENSE_SIGNING_KEY=%s\n' "$LICENSE_SIGNING_KEY" > .dev.vars
```

Do not commit `.dev.vars`. Do not reuse a production signing key for local development.

## 4. Run the Worker locally

```bash
npm run worker:dev
```

This builds the browser bundle and starts the local Worker.

## 5. Generate a local license token

In a second terminal:

```bash
set -a
. ./.dev.vars
set +a
npm run auth:license -- --domain example.com --include-www
```

Use the printed token in a request:

```bash
curl -i \
  -H 'Referer: https://example.com/' \
  'http://127.0.0.1:8787/v1/shifty.min.js?license=TOKEN'
```

## 6. Check before deployment

```bash
npm run worker:check
npm run benchmark:auth
```

`worker:check` validates that Wrangler can bundle the Worker. `benchmark:auth` checks the authentication performance budget.

## 7. Add the production signing secret

```bash
npx wrangler secret put LICENSE_SIGNING_KEY
```

This stores the secret in Cloudflare. It is separate from `.dev.vars`.

## 8. Deploy

```bash
npm run worker:deploy
```

The first deployment runs on the default `workers.dev` hostname.

## 9. Attach a custom domain (optional)

Add a `routes` entry in `wrangler.jsonc`:

```jsonc
{
  "routes": [
    {
      "pattern": "cdn.example.com",
      "custom_domain": true
    }
  ]
}
```

Deploy again:

```bash
npm run worker:deploy
```

## 10. Verify the production deployment

Test all three cases:

```bash
# Valid token, correct domain → 200
curl -i \
  -H 'Referer: https://example.com/' \
  'https://YOUR-WORKER-URL/v1/shifty.min.js?license=TOKEN'

# Invalid token → 4xx
curl -i \
  -H 'Referer: https://example.com/' \
  'https://YOUR-WORKER-URL/v1/shifty.min.js?license=bad-token'

# Valid token, wrong domain → 4xx
curl -i \
  -H 'Referer: https://wrong-example.com/' \
  'https://YOUR-WORKER-URL/v1/shifty.min.js?license=TOKEN'
```

## Revoking access

Add the license ID to `worker/revoked-license-ids.ts` and deploy:

```bash
npm run worker:deploy
```

Confirm revoked requests return 403 after browser cache expiry (up to 1 hour).

## Troubleshooting

- **`wrangler login` keeps prompting:** Run `npx wrangler login` again in the same environment.
- **Local requests fail:** Confirm `.dev.vars` exists and contains `LICENSE_SIGNING_KEY=...`.
- **Token rejected:** Confirm the `Referer` header matches the licensed domain and the token was generated with the same signing key.
- **Asset missing after deploy:** Run `npm run build` and confirm `dist/shifty.min.js` exists.
