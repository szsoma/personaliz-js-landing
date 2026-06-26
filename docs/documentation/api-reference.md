# API Reference

The `Shifty` object is available as `window.Shifty` (browser script) or as a named ESM export.

```ts
import { Shifty } from "shiftyjs";
```

## Methods

### init(config?)

Initialize the engine. Called automatically on DOMContentLoaded unless `autoEvaluate: false`.

```ts
Shifty.init({
  debug: true,
  storage: "localStorage",
  persistSegments: true
});
```

Calling `init()` more than once has no effect. Pass config to override defaults before first evaluation.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `config` | `ShiftyConfigInput` | Optional configuration overrides |

---

### evaluate()

Rebuild context, rescan the DOM for rules, apply matches, and restore unmatched content.

```ts
Shifty.evaluate();
```

Call this after dynamic content changes (e.g., Webflow CMS loading, SPA navigation, `history.pushState()`).

---

### getContext()

Return a deep copy of the current context snapshot.

```ts
const ctx = Shifty.getContext();
console.log(ctx.url.query.industry);
console.log(ctx.visitor.isReturning);
console.log(ctx.segments);
```

**Returns:** `ShiftyContext`

---

### setSegment(key, value, options?)

Store a manual segment.

```ts
Shifty.setSegment("industry", "saas");
Shifty.setSegment("campaign", "spring", { expiresInDays: 30 });
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string` | Segment key |
| `value` | `string` | Segment value |
| `options.expiresInDays` | `number?` | Auto-expire after N days |

---

### getSegment(key)

Return a segment value or `null` if not set or expired.

```ts
const industry = Shifty.getSegment("industry");
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string` | Segment key |

**Returns:** `string | null`

---

### removeSegment(key)

Delete a single segment.

```ts
Shifty.removeSegment("industry");
```

---

### clearSegments()

Delete all segments.

```ts
Shifty.clearSegments();
```

---

### track(eventName, value?)

Track a behavior event.

```ts
Shifty.track("clicked", "pricing-cta");
Shifty.track("submitted", "contact-form");
Shifty.track("viewed", "/pricing");
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `eventName` | `"clicked" \| "viewed" \| "submitted"` | Event type |
| `value` | `string?` | Identifier. Defaults to `location.pathname` for `"viewed"`. |

---

### applyUrlVariants()

Apply URL-variant mappings for the current query string. Use after `history.pushState()` or when third-party scripts reveal content.

```ts
Shifty.applyUrlVariants();
```

Does not clear previously applied values when parameters disappear. Call `reset()` first if you need to restore originals.

---

### getUrlVariantMap()

Return the active explicit URL variant map, including configured current mappings and enabled legacy mappings.

```ts
const map = Shifty.getUrlVariantMap();
// { text: { p_h1: "h1", ... }, href: { p_cta_url: "cta", ... } }
```

Generic `p_<name>` and `p_<name>_url` mappings are derived from the current query string when variants are applied. They are not persisted and do not appear in the returned map.

**Returns:** `UrlVariantMap`

---

### setUrlVariantMap(map)

Override the explicit URL variant map at runtime. Explicit entries take priority over inferred generic mappings for the same parameter.

```ts
Shifty.setUrlVariantMap({
  text: { headline: "h1", description: "subtitle" },
  href: { button_url: "cta" }
});
```

---

### reset()

Stop listeners and mutation observers, restore all modified elements to their original state, and clear all namespaced storage.

```ts
Shifty.reset();
```

After calling `reset()`, the engine must be re-initialized with `init()`.

---

### on(eventName, callback)

Subscribe to an event. Returns an unsubscribe function.

```ts
const unsubscribe = Shifty.on("evaluated", (detail) => {
  console.log(detail.matched, detail.total);
});

// Later:
unsubscribe();
```

**Events:**

| Event | Detail |
| --- | --- |
| `ready` | `{ context: ShiftyContext }` |
| `evaluated` | `{ matched: number, total: number, context: ShiftyContext }` |
| `matched` | `{ ruleId: string, action: ActionType, conditions: Condition[] }` |
| `error` | `{ phase: string, error: unknown }` |

---

## Auto-initialization

When loaded as a browser script, shiftyjs auto-initializes on DOMContentLoaded. Configure via `window.ShiftyConfig`:

```html
<script>
  window.ShiftyConfig = {
    debug: false,
    persistSegments: true
  };
</script>
<script src="..." defer></script>
```

`evaluateOnLoad` is accepted as a compatibility alias for `autoEvaluate`. When both are set, `autoEvaluate` wins.

## Browser events

All events are also dispatched as browser `CustomEvent` on `window` with a `shifty:` prefix:

```js
window.addEventListener("shifty:evaluated", (event) => {
  console.log(event.detail);
});
```
