# Security

shiftyjs applies several layers of protection to prevent XSS and other injection attacks.

## HTML sanitization

When `sanitizeHtml: true` (default), HTML values inserted via `data-shifty-html` are sanitized before insertion.

### Allowed tags

Only these formatting tags survive sanitization:

- `strong`, `em`, `span`, `br`, `b`, `i`, `u`

All other tags are replaced with their text content. All attributes are removed from allowed tags.

### Example

Input:
```html
<strong>Bold</strong> and <script>alert('xss')</script>
```

Output:
```html
<strong>Bold</strong> and alert('xss')
```

### Disabling sanitization

```js
Shifty.init({ sanitizeHtml: false });
```

Only disable if every replacement value is from a trusted source. With sanitization disabled, the site owner is responsible for ensuring every replacement is safe.

## Text replacement safety

`data-shifty-text` uses `textContent`, never `innerHTML`. This means text values cannot contain HTML — they are always plain text.

## URL safety

### Href values (`data-shifty-href`)

Allowed protocols:
- `http:`
- `https:`
- `mailto:`
- `tel:`

Blocked protocols:
- `javascript:`
- `data:`
- `vbscript:`
- `file:`

Also blocked:
- Protocol-relative URLs (`//evil.com`)
- Bare relative paths without `/` or `#` prefix

Allowed forms:
- `https://example.com`
- `/contact`
- `#section`
- `mailto:team@example.com`
- `tel:+1234567890`

### Src values (`data-shifty-src`)

Allowed protocols:
- `http:`
- `https:`

All other protocols are blocked.

### URL variant href safety

The same rules apply to URL variant href replacement. Values using `javascript:`, `data:`, `vbscript:`, `file:`, protocol-relative URLs, or bare relative paths are ignored.

## URL variant text safety

- Assigned with `textContent`, never `innerHTML`
- Values containing `<` or `>` are ignored
- Values longer than `urlVariantOptions.maxTextLength` (default 160) are ignored

## Class manipulation safety

`data-add-class` and `data-remove-class` values must:
- Not be empty
- Not contain whitespace (only single class names are allowed)

## License token security

The CDN Worker validates license tokens using HMAC-SHA-256 signatures. The production signing key is stored as a Cloudflare Worker secret. Operators also need a protected local or password-manager copy of the same key to generate customer license tokens; it must never be committed, logged, or sent to customers. Tokens are verified against the `Referer` header to ensure the script is only served to authorized domains.

See [Cloudflare Worker Setup](./cloudflare-worker-setup.md) for details.

## Content Security Policy

If your site uses a Content Security Policy, ensure:

- The script source is allowed in `script-src`
- `unsafe-inline` is not required (the library uses `textContent` and `classList`, not inline event handlers)
- The CDN domain is allowed in `connect-src` if you use the licensed Worker

## Recommendations

1. Keep `sanitizeHtml: true` in production
2. Keep `referrerpolicy="origin"` on the script tag
3. Do not place secrets or sensitive data in URL parameters, segment values, or `data-value` attributes
4. Use `storage: "memory"` or `storage: "none"` when persistence is not appropriate
5. Test with script, event-handler, `javascript:`, `data:`, and `vbscript:` payloads to confirm they are blocked
