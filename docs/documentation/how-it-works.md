# How ShiftyJS Works (For Humans)

## What does ShiftyJS do?

Imagine you have a website. When someone visits from a Google ad about "shoes," you want the headline to say "Best Shoes for You." But when they come from a Facebook ad about "hats," you want it to say "Cool Hats Here."

ShiftyJS does this. It changes what visitors see based on where they came from, what they clicked, or what they're interested in. It works right in the browser, so it's fast and doesn't send anyone's data to a server.

## How does the license work?

Think of it like a concert ticket:

1. **You buy a ticket** (subscribe to ShiftyJS)
2. **We write your name on it** (your website domain, like `yoursite.com`)
3. **The bouncer checks your ticket at the door** (the Cloudflare Worker checks your license)

The "ticket" is a special code called a **token**. It contains:

- Your website's name
- An expiration date (never: it lasts forever unless we revoke it)
- A signature that proves it's real

## How does the Worker check the ticket?

Here's what happens when someone visits your site:

```text
Visitor's browser
      |
      v
+--------------+     +-------------------+     +------------+
| Your website |---->| Cloudflare Worker |---->| The script |
| loads        |     | checks access     |     | runs       |
+--------------+     +-------------------+     +------------+
                             |
                             v
                      +---------------+
                      | Checks:       |
                      | - Token real? |
                      | - Domain ok?  |
                      | - Revoked?    |
                      +---------------+
```

Step by step:

1. Your website loads and asks for `shifty.min.js?license=TOKEN`
2. The request goes to the **Cloudflare Worker**
3. The Worker looks at the token and asks:
   - "Is this a real ticket?" (checks the cryptographic signature)
   - "Is this ticket for this website?" (checks the `Referer` header matches the domain in the token)
   - "Has this ticket been canceled?" (checks the revocation list)
4. If everything checks out, the Worker serves the script
5. If anything is wrong, the Worker returns an error

## What keeps it secure?

- **The signing key** is a protected operator secret. Cloudflare stores it as a Worker secret for request-time verification, and the operator uses a protected local/password-manager copy to generate tokens. Nobody can forge a token without it.
- **Domain checking** means a token for `site-a.com` will not work on `site-b.com`. The Worker checks the `Referer` header, which browsers send automatically, to verify the site.
- **No database needed**: the Worker checks everything using cryptography, so it is fast and does not need to look anything up during normal requests.

## How do I revoke access?

If someone stops paying or you need to cut off access:

1. Open `worker/revoked-license-ids.ts`
2. Add their license ID to the list:

   ```ts
   export const REVOKED_LICENSE_IDS = new Set([
     "lic_old_customer_abc123",
     "lic_another_customer"
   ]);
   ```

3. Deploy the Worker:

   ```bash
   npm run worker:deploy
   ```

4. Their script stops working within 1 hour, which is how long browsers cache the script.

### How do I find someone's license ID?

- Check your private customer register
- Or inspect the token they're using; the license ID is inside it and starts with `lic_`

### Can they get around it?

No. The license ID is part of the signed token. They cannot change it without the signing key.

## Quick reference

| What | Where |
|------|-------|
| Generate a license | `npm run provision -- theirsite.com` |
| Revoke a license | Add ID to `worker/revoked-license-ids.ts`, then deploy |
| Signing key | Protected operator secret and Cloudflare Worker secret |
| Customer list | Your private register, never in Git |

## TL;DR

1. Customer pays, you generate a token with their domain
2. Token goes in their script tag
3. Worker checks the token on every request
4. If someone stops paying, add their ID to the blocklist and deploy
