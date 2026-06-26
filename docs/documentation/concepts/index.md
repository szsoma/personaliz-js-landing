# Concepts

Understand how shiftyjs works under the hood.

## How personalization works

When the page loads, shiftyjs:

1. **Initializes** — creates storage adapters, loads visitor state, reads URL parameters
2. **Builds context** — assembles a snapshot of the current URL, UTM tags, referrer, visitor state, segments, and behavior
3. **Scans the DOM** — walks the document tree looking for elements with `data-*` personalization attributes
4. **Parses rules** — extracts conditions and actions from each element's attributes
5. **Evaluates rules** — checks each rule's conditions against the context
6. **Applies actions** — shows/hides elements, replaces text, swaps hrefs, or toggles CSS classes
7. **Emits events** — fires `ready`, `evaluated`, `matched`, and `error` events

This happens automatically on DOMContentLoaded when `autoEvaluate: true` (the default).

## Rules

A **rule** is a declarative instruction attached to an HTML element via custom attributes. It has:

- **Conditions** — what must be true (e.g., `?industry=saas`)
- **Action** — what to do when conditions match (e.g., replace text)
- **Match mode** — always `all` (AND logic for multiple conditions)

Rules are parsed from the DOM on every evaluation. There is no rule registry — the DOM is the source of truth.

## Conditions

A condition checks one aspect of the current context. Conditions are defined with `data-if-*` attributes.

### Condition sources

| Source | Attribute pattern | Example |
| --- | --- | --- |
| URL parameter | `data-if-param-{key}` | `data-if-param-industry="saas"` |
| UTM tag | `data-if-utm_{key}` | `data-if-utm_campaign="startup"` |
| Referrer domain | `data-if-referrer-domain` | `data-if-referrer-domain="google.com"` |
| Referrer contains | `data-if-referrer-contains` | `data-if-referrer-contains="producthunt"` |
| Returning visitor | `data-if-returning` | `data-if-returning="true"` |
| Segment | `data-if-segment-{key}` | `data-if-segment-industry="saas"` |
| Behavior | `data-if-behavior-{type}` | `data-if-behavior-clicked="pricing-cta"` |
| Alias (query or segment) | `data-if-{key}` | `data-if-industry="saas"` |

### Condition operators

All conditions use **equals** by default. Comma-separated values use **OR** logic:

```html
<div data-if-param-industry="saas,startup">Matches SaaS or startup</div>
```

An empty value checks for **existence**:

```html
<div data-if-param-industry="">Matches if ?industry is present</div>
```

### Multiple conditions

Multiple `data-if-*` attributes on one element use **AND** logic:

```html
<div
  data-if-param-industry="saas"
  data-if-returning="true"
>
  Returning SaaS visitor
</div>
```

## Actions

An action defines what happens when conditions match. Actions are defined with `data-shifty-*`, `data-show-if-*`, `data-hide-if-*`, `data-add-class`, or `data-remove-class` attributes.

| Action | Attribute | Value source |
| --- | --- | --- |
| Replace text | `data-shifty-text` | `data-value` |
| Replace HTML | `data-shifty-html` | `data-value` |
| Replace href | `data-shifty-href` | `data-value` |
| Replace src | `data-shifty-src` | `data-value` |
| Show element | `data-show-if-{condition}` | *(none)* |
| Hide element | `data-hide-if-{condition}` | *(none)* |
| Add CSS class | `data-add-class` | attribute value |
| Remove CSS class | `data-remove-class` | attribute value |

### Show/hide

Show/hide actions embed their condition in the attribute name:

```html
<div data-show-if-param-industry="saas">Visible for SaaS</div>
<div data-hide-if-returning="true">Hidden for returning visitors</div>
```

Show/hide uses the `shifty-hidden` CSS class by default (`display: none !important`).

### Content replacement

Text and HTML replacement read the new value from `data-value`:

```html
<h1 data-shifty-text data-if-param-industry="saas" data-value="For SaaS teams">
  Default headline
</h1>
```

When conditions don't match and `restoreOriginalsOnMismatch` is `true` (default), the original content is restored.

## Segments

A **segment** is a key-value pair stored in the browser. Segments persist across page visits when `persistSegments: true` (default).

### How segments are created

1. **From URL parameters** — when `persistSegments: true`, the library reads parameters listed in `segmentParams` and stores them as segments
2. **Manually** — via `Shifty.setSegment(key, value, options?)`
3. **From behavior** — tracked clicks, views, and submissions

### Default segment parameters

These URL parameters are automatically persisted as segments:

```
industry, persona, company_size, role, use_case, segment
```

Configure with `segmentParams` in the config object.

### Segment expiration

Segments can expire after a number of days:

```js
Shifty.setSegment("campaign", "spring-sale", { expiresInDays: 30 });
```

Expired segments are removed on the next evaluation.

### Querying segments

Use `data-if-segment-{key}` to condition on stored segments:

```html
<div data-if-segment-industry="saas">Returning SaaS visitor</div>
```

Or use the alias shorthand `data-if-{key}`, which checks the URL parameter first, then falls back to the stored segment:

```html
<div data-if-industry="saas">Matches ?industry=saas OR segment industry=saas</div>
```

## Behavior

**Behavior** tracks what the visitor has done: pages viewed, links clicked, and forms submitted.

### Tracking clicks

Add `data-track-click` to any element:

```html
<a href="/pricing" data-track-click="pricing-cta">View pricing</a>
```

### Tracking form submissions

Add `data-track-submit` to a form:

```html
<form data-track-submit="contact-form" action="/submit" method="post">
  <!-- fields -->
</form>
```

### Querying behavior

Use `data-if-behavior-clicked`, `data-if-behavior-viewed`, or `data-if-behavior-submitted`:

```html
<div data-if-behavior-clicked="pricing-cta">
  Still comparing? Book a walkthrough.
</div>
```

### Behavior limits

| Type | Max stored items |
| --- | --- |
| Pages viewed | 50 |
| Clicks | 100 |
| Form submissions | 50 |

Older items are dropped when the limit is reached.

## Context

The **context** is a snapshot of everything shiftyjs knows about the current page visit. It's built on every evaluation and available via `Shifty.getContext()`.

```ts
interface ShiftyContext {
  url: {
    href: string;     // Full URL
    path: string;     // Pathname
    query: Record<string, string>;  // Query parameters
  };
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    content: string | null;
    term: string | null;
  };
  referrer: {
    raw: string;            // Raw referrer string
    domain: string | null;  // Normalized domain (without www)
  };
  visitor: {
    id: string;           // Anonymous visitor ID
    firstSeenAt: string;  // ISO timestamp
    lastSeenAt: string;   // ISO timestamp
    visitCount: number;
    isReturning: boolean; // true if visitCount > 1
  };
  segments: Record<string, string>;  // Stored segment values
  behavior: {
    pagesViewed: string[];
    clicked: string[];
    formsSubmitted: string[];
    lastPageViewed: string | null;
  };
  time: {
    localHour: number;    // 0-23
    dayOfWeek: number;    // 0 (Sunday) - 6 (Saturday)
    timezone: string | null;
  };
  location: {
    country: null;  // Reserved for future use
    region: null;   // Reserved for future use
    city: null;     // Reserved for future use
  };
}
```

## Events

shiftyjs emits events you can subscribe to:

| Event | When |
| --- | --- |
| `ready` | Initialization complete, context built |
| `evaluated` | All rules evaluated (includes match count) |
| `matched` | A specific rule matched |
| `error` | An error occurred during init, evaluate, or track |

Subscribe with `Shifty.on()`:

```js
Shifty.on("evaluated", (detail) => {
  console.log(`Matched ${detail.matched} of ${detail.total} rules`);
});
```

Or listen to browser events with the `shifty:` prefix:

```js
window.addEventListener("shifty:evaluated", (event) => {
  console.log(event.detail);
});
```

## Cloaking

To prevent a flash of default content before personalization runs, add the `shifty-cloak` class to elements:

```html
<h1 class="shifty-cloak" data-shifty-text data-if-param-industry="saas" data-value="For SaaS">
  Default headline
</h1>
```

The included CSS makes `.shifty-cloak` elements invisible until `html.shifty-ready` is added after evaluation.

## Next steps

- [API Reference](../api-reference.md) — Every public method
- [Configuration](../configuration.md) — All config options
- [Examples](../examples.md) — Copy-paste patterns
