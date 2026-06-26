# shiftyjs Documentation

Client-side, dependency-free personalization for Webflow marketing sites.

## What is shiftyjs?

shiftyjs is a lightweight JavaScript library that personalizes web page content based on URL parameters, UTM tags, visitor behavior, and stored segments. It runs entirely in the browser with zero network requests, keeping visitor data private.

Use it to:

- Show different headlines based on ad campaign parameters
- Display returning-visitor-specific CTAs
- Persist industry or persona segments across page visits
- Track clicks and form submissions for conditional content
- Replace page copy via URL parameters for landing page campaigns

## Quick links

| Page | Description |
| --- | --- |
| [Introduction](./introduction.md) | What shiftyjs does and how it works |
| [Quickstart](./quickstart.md) | Install and run in 5 minutes |
| [Webflow Installation](./webflow-installation.md) | Step-by-step Webflow setup |
| [Concepts](./concepts/index.md) | Core ideas: rules, conditions, segments, behavior |
| [API Reference](./api-reference.md) | Every public method and event |
| [Configuration](./configuration.md) | All config options and defaults |
| [URL Variants](./url-variants.md) | Campaign URL parameter replacement |
| [Examples](./examples.md) | Copy-paste Webflow examples |
| [Security](./security.md) | HTML sanitization and URL safety |
| [Privacy](./privacy.md) | What data is stored and how |
| [Cloudflare Worker](./cloudflare-worker-setup.md) | Licensed CDN hosting |
| [Troubleshooting](./troubleshooting.md) | Common issues and fixes |

## npm package

```bash
npm install shiftyjs
```

```ts
import { Shifty } from "shiftyjs";

Shifty.setSegment("industry", "saas");
Shifty.evaluate();
```

## Browser support

shiftyjs targets modern evergreen browsers: Chrome, Safari, Firefox, Edge, and their mobile equivalents. It uses `crypto.randomUUID()`, `URL`, `URLSearchParams`, `CustomEvent`, `MutationObserver`, `classList`, and `WeakMap` — all widely supported in current browsers.

## License

MIT
