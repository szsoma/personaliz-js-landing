# Quickstart

Get shiftyjs running on a Webflow site in 5 minutes.

## 1. Add the script

In Webflow, open **Project Settings → Custom Code → Before `</body>` tag** and paste:

```html
<style>
  .shifty-cloak { visibility: hidden; }
  html.shifty-ready .shifty-cloak { visibility: visible; }
  .shifty-hidden { display: none !important; }
</style>
<script>
  window.ShiftyConfig = { debug: true, persistSegments: true };
</script>
<script
  src="https://YOUR_CDN_HOST/v1/shifty.min.js?license=YOUR_LICENSE_TOKEN"
  referrerpolicy="origin"
  defer>
</script>
```

Replace `YOUR_CDN_HOST` and `YOUR_LICENSE_TOKEN` with your licensed values. Keep `referrerpolicy="origin"` — the CDN uses the referring origin for authorization and does not receive the full page URL.

## 2. Add a personalization attribute

Select any element in Webflow Designer. In the **Custom Attributes** panel, add:

| Name | Value |
| --- | --- |
| `data-shifty-text` | *(leave empty)* |
| `data-if-param-industry` | `saas` |
| `data-value` | `Webflow websites for SaaS teams` |

This replaces the element's text when the URL contains `?industry=saas`.

## 3. Publish and test

Publish your Webflow site, then open:

```
https://your-site.com/?industry=saas
```

The heading should change to "Webflow websites for SaaS teams". Remove the parameter to see the original text.

## 4. Debug mode

With `debug: true`, open the browser console. You'll see:

```
[Shifty] Matched rule shifty-abc123 text
```

Set `debug: false` before going to production.

## Local development

If you're developing the library itself:

```bash
npm ci
npm run dev
```

Open `http://localhost:4173/?industry=saas`. Changes under `src/` rebuild `dist/` automatically; refresh the browser manually.

## Next steps

- [Webflow Installation](./webflow-installation.md) — Detailed setup with all attribute types
- [Concepts](./concepts/index.md) — Understand rules, conditions, and actions
- [Examples](./examples.md) — Copy-paste examples for common patterns
