# Introduction

## What is shiftyjs?

shiftyjs is a client-side JavaScript library that personalizes web page content based on URL parameters, UTM tags, visitor behavior, and stored segments. It was built for Webflow marketing sites but works on any HTML page.

## How it works

1. You add `data-*` custom attributes to HTML elements in Webflow Designer
2. The library scans the DOM for these attributes on page load
3. It builds a context object from the current URL, referrer, stored segments, and visitor state
4. It evaluates rules defined by your attributes against the context
5. Matching rules apply actions: show/hide elements, replace text, swap hrefs, or toggle CSS classes

The original content stays in the DOM as a fallback. If JavaScript is unavailable, visitors see the default content.

## Key properties

- **Zero network requests.** All personalization runs in the browser. No visitor data is sent to any server.
- **Zero dependencies.** The minified bundle is under 5 KB gzipped.
- **Privacy-first.** Visitor IDs, segments, and behavior stay in browser storage. Use `storage: "memory"` or `storage: "none"` when persistence is not appropriate.
- **Webflow-native.** Use Webflow Designer's custom attribute panel — no custom code embeds needed for most use cases.
- **Non-destructive.** Original element content is restored when conditions no longer match (configurable).

## Architecture overview

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                            │
│                                                         │
│  URL params ──┐                                         │
│  UTM tags ────┤                                         │
│  Referrer ────┼──► Context Builder ──► Rule Evaluator   │
│  Visitor ─────┤         │                    │          │
│  Segments ────┤         ▼                    ▼          │
│  Behavior ────┘    ShiftyContext         DOM Actions     │
│                                       show/hide/text    │
│                                       html/href/src     │
│                                       addClass/removeClass│
└─────────────────────────────────────────────────────────┘
```

## Core concepts

| Concept | Description |
| --- | --- |
| **Rules** | Declarative conditions attached to elements via `data-*` attributes |
| **Conditions** | Checks against URL params, UTM tags, referrer, segments, or behavior |
| **Actions** | What happens when conditions match: show, hide, replace text, swap links |
| **Segments** | Key-value pairs stored in the browser, persistable across visits |
| **Behavior** | Tracked clicks, page views, and form submissions |
| **Context** | The full snapshot of URL, UTM, referrer, visitor, segments, behavior, and time |

## Next steps

- [Quickstart](./quickstart.md) — Install and run in 5 minutes
- [Concepts](./concepts/index.md) — Deep dive into rules, conditions, and actions
