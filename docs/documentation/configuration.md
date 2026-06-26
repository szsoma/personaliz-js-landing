# Configuration

Configure shiftyjs via `window.ShiftyConfig` (browser) or the `init()` options object (ESM).

## Defaults

```js
{
  debug: false,
  storage: "localStorage",
  persistSegments: true,
  segmentParams: ["industry", "persona", "company_size", "role", "use_case", "segment"],
  defaultHiddenClass: "shifty-hidden",
  autoEvaluate: true,
  observeMutations: true,
  sanitizeHtml: true,
  restoreOriginalsOnMismatch: true,
  namespace: "shifty",
  urlVariantReplacement: true,
  urlVariants: {
    text: {
      p_h1: "h1",
      p_subtitle: "subtitle",
      p_cta: "cta"
    },
    href: {
      p_cta_url: "cta"
    }
  },
  legacyUrlVariants: true,
  legacyUrlVariantMap: {
    text: {
      utm_h1: "h1",
      utm_subtitle: "subtitle",
      utm_button: "cta"
    },
    href: {}
  },
  urlVariantOptions: {
    replaceUnderscores: true,
    replacePlusSigns: true,
    trimValues: true,
    maxTextLength: 160,
    restoreOriginalsOnMismatch: false
  }
}
```

## Options

### debug

| Type | Default |
| --- | --- |
| `boolean` | `false` |

Log rule matches and warnings to the console with `[Shifty]` prefix.

### storage

| Type | Default | Values |
| --- | --- | --- |
| `string` | `"localStorage"` | `"localStorage"`, `"sessionStorage"`, `"memory"`, `"none"` |

Where to persist visitor state, segments, and behavior.

- `localStorage` — survives browser restarts. Falls back to memory if storage is unavailable.
- `sessionStorage` — cleared when the tab closes. Falls back to memory if storage is unavailable.
- `memory` — in-memory only, cleared on page reload.
- `none` — no persistence, no memory storage.

### persistSegments

| Type | Default |
| --- | --- |
| `boolean` | `true` |

When `true`, URL parameters listed in `segmentParams` are automatically stored as segments on page load.

### segmentParams

| Type | Default |
| --- | --- |
| `string[]` | `["industry", "persona", "company_size", "role", "use_case", "segment"]` |

URL parameter names to persist as segments when `persistSegments: true`.

### defaultHiddenClass

| Type | Default |
| --- | --- |
| `string` | `"shifty-hidden"` |

CSS class applied to elements by `show`/`hide` actions. Must match your stylesheet.

### autoEvaluate

| Type | Default |
| --- | --- |
| `boolean` | `true` |

Automatically evaluate rules on DOMContentLoaded. Set to `false` to call `Shifty.evaluate()` manually.

`evaluateOnLoad` is accepted as a compatibility alias. When both are set, `autoEvaluate` wins.

### observeMutations

| Type | Default |
| --- | --- |
| `boolean` | `true` |

Watch for dynamically added elements and re-evaluate when personalization attributes appear. Uses a debounced `MutationObserver` (100ms delay).

### sanitizeHtml

| Type | Default |
| --- | --- |
| `boolean` | `true` |

Sanitize HTML values before inserting. Only allows `strong`, `em`, `span`, `br`, `b`, `i`, `u` tags with no attributes. Disable only if every replacement value is trusted.

### restoreOriginalsOnMismatch

| Type | Default |
| --- | --- |
| `boolean` | `true` |

Restore original element content when conditions no longer match. When `false`, elements keep their last applied state.

### namespace

| Type | Default |
| --- | --- |
| `string` | `"shifty"` |

Prefix for storage keys. Change to avoid collisions with other scripts.

### urlVariantReplacement

| Type | Default |
| --- | --- |
| `boolean` | `true` |

Enable URL variant replacement. When `false`, `data-variant` attributes are ignored.

### urlVariants

| Type | Default |
| --- | --- |
| `object` | *(see above)* |

Explicit mappings from URL parameter names to `data-variant` target names. Split the map into `text` (text content replacement) and `href` (anchor href replacement).

Generic `p_` parameters also infer mappings directly from the query string:

| Pattern | Target | Behavior | Example |
| --- | --- | --- | --- |
| `p_<name>` | `[data-variant="<name>"]` | Replaces text | `p_price=99` targets `[data-variant="price"]` |
| `p_<name>_url` | anchor `[data-variant="<name>"]` | Replaces `href` | `p_signup_url=/join` targets anchor `[data-variant="signup"]` |

These inferred mappings are query-derived; they do not need to be added to `urlVariants`. Explicit text or href mappings override inferred mappings for the same parameter, including when the explicit entry maps the parameter to a different target or behavior.

### legacyUrlVariants

| Type | Default |
| --- | --- |
| `boolean` | `true` |

Enable legacy `utm_h1`, `utm_subtitle`, `utm_button` parameter aliases.

### legacyUrlVariantMap

| Type | Default |
| --- | --- |
| `object` | *(see above)* |

Legacy parameter-to-variant mapping, merged with `urlVariants`.

### urlVariantOptions

Controls URL variant text normalization and safety.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `replaceUnderscores` | `boolean` | `true` | Replace `_` with spaces in text values |
| `replacePlusSigns` | `boolean` | `true` | Replace `+` with spaces in text values |
| `trimValues` | `boolean` | `true` | Trim whitespace from values |
| `maxTextLength` | `number` | `160` | Max characters for text replacement |
| `restoreOriginalsOnMismatch` | `boolean` | `false` | Restore originals when URL params disappear |

## Examples

### Minimal Webflow config

```html
<script>
  window.ShiftyConfig = { debug: false, persistSegments: true };
</script>
```

### Memory-only storage

```js
Shifty.init({
  storage: "memory",
  persistSegments: false
});
```

### Custom segment parameters

```js
Shifty.init({
  segmentParams: ["vertical", "tier", "source"]
});
```

### Disable auto-evaluation

```js
Shifty.init({ autoEvaluate: false });

// Later, manually:
Shifty.evaluate();
```
