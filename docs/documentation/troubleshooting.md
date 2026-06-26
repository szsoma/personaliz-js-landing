# Troubleshooting

Common issues and how to fix them.

## Content doesn't change

**Check the URL parameter name.** Parameter names are case-sensitive. `?Industry=saas` does not match `data-if-param-industry="saas"`.

**Check the attribute value.** Values are case-insensitive, but must match exactly (comma-separated for OR logic). `data-if-param-industry="SaaS"` matches `?industry=saas`.

**Check that the script loaded.** Open DevTools → Network tab and look for `shifty.min.js`. Verify it returned 200.

**Check the console for errors.** Set `debug: true` in the config and look for `[Shifty]` messages.

**Check attribute spelling.** Common mistakes:
- `data-shifty-text` (correct) vs. `data-personalise-text` (wrong)
- `data-if-param-industry` (correct) vs. `data-if-param-Industry` (wrong — param key is lowercase)
- `data-value` (correct) vs. `data-values` (wrong)

## Script authorization error

The console shows: `Shifty: script authorization failed (…).`

1. **Domain mismatch** — the published hostname must exactly match the licensed hostname. `www.example.com` and `example.com` are different unless both were included in the license.
2. **Missing referrerpolicy** — the script tag must have `referrerpolicy="origin"`.
3. **Wrong protocol** — the script must be served over HTTPS, not HTTP or `file://`.
4. **Malformed token** — copy the full token without spaces or line breaks.
5. **Revoked license** — contact the license operator.

## Content flashes then reverts

The `shifty-cloak` class hides elements until personalization runs. If you see a flash:

1. Ensure the `<style>` block with `.shifty-cloak` is in the page
2. Add `shifty-cloak` to the element's class list
3. Ensure the script has `defer` (not `async`) so it runs after DOM parsing

## Returning visitor not detected

The library tracks `visitCount`. A visitor is "returning" when `visitCount > 1`, which requires at least two page loads. Reload the page once to trigger returning-visitor state.

Check that `storage` is not `"memory"` or `"none"` — these modes do not persist across page loads.

## Segment not persisting

1. Ensure `persistSegments: true` (default)
2. Ensure the parameter name is in `segmentParams` (default includes `industry`, `persona`, `company_size`, `role`, `use_case`, `segment`)
3. Check that `storage` is `"localStorage"` or `"sessionStorage"` (not `"memory"` or `"none"`)
4. Storage is scoped per origin — the staging domain and custom domain have separate storage

## Behavior not tracking

1. Ensure `data-track-click` is on the clicked element or a parent
2. Ensure `data-track-submit` is on the `<form>` element itself
3. The behavior block must be evaluated after the click — use `observeMutations: true` (default) or call `Shifty.evaluate()` after the interaction

## Dynamic content not personalized

If content is added after page load (e.g., Webflow CMS, SPA navigation):

1. `observeMutations: true` (default) re-evaluates when new elements with personalization attributes appear
2. Call `Shifty.evaluate()` manually after dynamic content loads
3. For URL variants, call `Shifty.applyUrlVariants()` after content appears

## URL variants not applying

1. Ensure `urlVariantReplacement: true` (default)
2. For explicit mappings, check the parameter name against `getUrlVariantMap()`
3. For generic `p_<name>` parameters, check that an element exists with `data-variant="<name>"` or `data-variant="<name without _url>"` for href variants; inferred generic mappings do not appear in `getUrlVariantMap()`
4. Text values containing `<` or `>` are blocked
5. Text values longer than `maxTextLength` (default 160) are blocked
6. Href values with `javascript:`, `data:`, `vbscript:`, `file:`, or protocol-relative URLs are blocked

## HTML sanitization stripping tags

Only `strong`, `em`, `span`, `br`, `b`, `i`, `u` tags survive sanitization. All attributes are removed. If you need other tags, you must disable sanitization and ensure all values are trusted:

```js
Shifty.init({ sanitizeHtml: false });
```

## Storage quota exceeded

If `localStorage` is full, the library falls back to memory storage silently. Clear old data with:

```js
Shifty.reset();
```

Or clear specific storage keys manually in DevTools → Application → Local Storage.

## MutationObserver performance

The default `observeMutations: true` watches the entire document body for changes. On very large pages with frequent DOM mutations, this may cause performance issues. Disable if not needed:

```js
Shifty.init({ observeMutations: false });
```

## Multiple evaluations

Calling `init()` more than once has no effect. Call `evaluate()` to re-run personalization. Call `reset()` then `init()` to fully reinitialize.

## Still stuck?

1. Enable `debug: true` and check the console
2. Use `Shifty.getContext()` to inspect the current context
3. Check `Shifty.getSegment(key)` to verify stored values
4. Open an issue with: browser version, config, attributes used, and console output
