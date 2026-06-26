# URL Variants

URL variant replacement lets campaign URLs update page content without conditional rules. Add `data-variant` to elements, then control their text or href via query parameters.

## How it works

1. You add `data-variant="name"` to elements
2. The visitor arrives with URL parameters such as `?p_price=99&p_signup_url=/join`
3. shiftyjs infers each target from the generic parameter name and applies the value

Generic parameters follow two patterns:

| Pattern | Target | Action |
| --- | --- | --- |
| `p_<name>` | `[data-variant="<name>"]` | Replace text |
| `p_<name>_url` | `a[data-variant="<name>"]` | Replace `href` after stripping the `_url` suffix |

For example, `p_price=99` targets the text of `[data-variant="price"]`, and `p_signup_url=/join` targets the `href` of `a[data-variant="signup"]`.

## Setup

### Add variant attributes

```html
<h1 data-variant="h1">Default headline</h1>
<p data-variant="subtitle">Default subtitle</p>
<p>Plans start at $<span data-variant="price">49</span>.</p>
<a href="/contact" data-variant="signup">Start free</a>
```

### Campaign URL

```
https://example.com/landing?p_h1=Grow_your_business_online&p_price=99&p_signup_url=/join
```

### Rendered result

```html
<h1 data-variant="h1">Grow your business online</h1>
<p data-variant="subtitle">Default subtitle</p>
<p>Plans start at $<span data-variant="price">99</span>.</p>
<a href="/join" data-variant="signup">Start free</a>
```

## Explicit mappings

The default configuration includes explicit mappings for `p_h1`, `p_subtitle`, `p_cta`, and `p_cta_url`. These are not the complete supported set: any valid generic `p_<name>` or `p_<name>_url` parameter can infer its target from the query string.

Explicit `urlVariants` text or href mappings override inference for the same parameter. This lets a parameter target a different variant name or behavior than the generic convention would select.

## Legacy aliases

For backward compatibility, these legacy parameters are also supported:

| Legacy parameter | Maps to |
| --- | --- |
| `utm_h1` | `data-variant="h1"` |
| `utm_subtitle` | `data-variant="subtitle"` |
| `utm_button` | `data-variant="cta"` |

Disable with `legacyUrlVariants: false`.

## Text normalization

URL parameter values are normalized before replacement:

| Behavior | Example input | Result |
| --- | --- | --- |
| Underscores → spaces | `Grow_your_business` | `Grow your business` |
| Plus signs → spaces | `Grow+your+business` | `Grow your business` |
| Trimmed | `  hello  ` | `hello` |

Configure with `urlVariantOptions`:

```js
window.ShiftyConfig = {
  urlVariantOptions: {
    replaceUnderscores: true,
    replacePlusSigns: true,
    trimValues: true,
    maxTextLength: 160
  }
};
```

## Safety

### Text safety

- Text values are assigned with `textContent`, never `innerHTML`
- Values containing `<` or `>` are blocked
- Values longer than `maxTextLength` (default 160) are blocked

### Href safety

Allowed protocols: `http:`, `https:`, `mailto:`, `tel:`

Blocked:
- `javascript:`, `data:`, `vbscript:`, `file:` protocols
- Protocol-relative URLs (`//example.com`)
- Bare relative paths without `/` or `#` prefix

Allowed:
- Absolute URLs: `https://example.com`
- Path-relative: `/demo`, `/pricing?plan=pro`
- Hash: `#section`

## Custom mapping

Override the explicit map at runtime:

```js
Shifty.setUrlVariantMap({
  text: {
    headline: "h1",
    description: "subtitle",
    button: "cta"
  },
  href: {
    button_url: "cta"
  }
});
```

Or in config:

```js
window.ShiftyConfig = {
  urlVariants: {
    text: { headline: "h1" },
    href: { button_url: "cta" }
  }
};
```

In both cases, explicit entries take priority over generic inference.

`Shifty.getUrlVariantMap()` returns only the active merged explicit and enabled legacy map. Inferred `p_` mappings are derived from the current query when variants are applied, so they are not persisted or returned; setting an explicit map does not disable inference for parameters without matching explicit entries.

## Combining with UTM parameters

Keep analytics UTM parameters separate from content parameters:

```
?utm_source=google&utm_medium=ppc&utm_campaign=erp-demo&p_h1=Grow_your_business_online&p_price=99&p_signup_url=/join
```

Do not put page copy in `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or `utm_term`. Use `p_` parameters for content.

## Dynamic content

URL variants run once on initialization. If third-party scripts (like Webflow's CMS) reveal content after initialization, call:

```js
Shifty.applyUrlVariants();
```

This does not clear previously applied values. Call `Shifty.reset()` first if you need to restore originals.

## Combining with conditional rules

For the MVP, avoid targeting the same element with both `data-variant` and conditional personalization attributes (`data-shifty-text`, `data-show-if-*`, etc.). URL variants run first, and conditional rules may override or restore the same element.
