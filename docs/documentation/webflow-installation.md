# Webflow Installation

Step-by-step guide for installing shiftyjs on a Webflow site.

## 1. Add custom code

In Webflow, open **Project Settings → Custom Code → Before `</body>` tag** and paste:

```html
<style>
  .shifty-cloak { visibility: hidden; }
  html.shifty-ready .shifty-cloak { visibility: visible; }
  .shifty-hidden { display: none !important; }
</style>
<script>
  window.ShiftyConfig = {
    storage: "localStorage",
    persistSegments: true,
    debug: false
  };
</script>
<script
  src="https://YOUR_CDN_HOST/v1/shifty.min.js?license=YOUR_LICENSE_TOKEN"
  referrerpolicy="origin"
  defer>
</script>
```

Replace `YOUR_CDN_HOST` and `YOUR_LICENSE_TOKEN` with your licensed values.

**Important:** Keep `referrerpolicy="origin"`. The CDN uses the referring origin for authorization and does not receive the full page URL.

## 2. Add personalization attributes

In Webflow Designer, select an element and open the **Custom Attributes** panel (the gear icon).

### Replace text on condition

| Name | Value |
| --- | --- |
| `data-shifty-text` | *(empty)* |
| `data-if-param-industry` | `saas` |
| `data-value` | `Webflow websites for SaaS teams` |

### Show/hide on condition

| Name | Value |
| --- | --- |
| `data-show-if-returning` | `true` |

Or:

| Name | Value |
| --- | --- |
| `data-hide-if-param-industry` | `saas` |

### Replace link href

| Name | Value |
| --- | --- |
| `data-shifty-href` | *(empty)* |
| `data-if-segment-industry` | `saas` |
| `data-value` | `/contact?industry=saas` |

### Track clicks

| Name | Value |
| --- | --- |
| `data-track-click` | `pricing-cta` |

### Track form submissions

On the `<form>` element:

| Name | Value |
| --- | --- |
| `data-track-submit` | `contact-form` |

### URL variant

| Name | Value |
| --- | --- |
| `data-variant` | `h1` |

## 3. Add the cloak class (optional)

To prevent a flash of default content, add `shifty-cloak` to elements that will be personalized:

| Name | Value |
| --- | --- |
| `class` | `shifty-cloak` (add to existing classes) |

Only use this where a brief flash is unacceptable. The original content remains the fallback when JavaScript is unavailable.

## 4. Publish and test

1. Publish your Webflow site
2. Open the production URL with test parameters: `https://your-site.com/?industry=saas`
3. Verify the content changes
4. Remove the parameter and verify the original content shows
5. Test on the Webflow staging domain and your custom domain (storage is scoped per origin)

## 5. Debug mode

Set `debug: true` during development:

```js
window.ShiftyConfig = { debug: true };
```

Open the browser console to see rule matches:

```
[Shifty] Matched rule shifty-abc123 text
```

Set `debug: false` before going to production.

## Testing checklist

- URL parameter matching (`?industry=saas`)
- UTM parameter matching (`?utm_campaign=startup`)
- Returning visitor detection (reload once)
- Persisted segments (visit `/?industry=saas`, then navigate to another page)
- Referrer detection (navigate from another site)
- Click tracking and behavior matching
- Form submission tracking
- URL variant replacement (`?p_h1=Custom_Headline`)
- Disabled JavaScript fallback (original content shows)
- Mobile and desktop browsers

## License loading errors

If the browser console reports a script authorization error:

1. Confirm the published hostname exactly matches the licensed hostname
2. Confirm the script tag contains `referrerpolicy="origin"`
3. Confirm the token was copied without spaces or line breaks
4. Test the published HTTPS domain, not an HTTP or local preview URL
5. Contact the license operator if billing was restored after revocation

## Webflow-specific notes

- The library uses delegated submit listeners and does not call `preventDefault`, so native Webflow form handling remains intact
- Storage is scoped per origin, so test on both the `.webflow.io` staging domain and your custom domain
- Webflow's CMS loads content dynamically — if personalization runs before CMS content appears, set `observeMutations: true` (default) to re-evaluate when new elements are added
