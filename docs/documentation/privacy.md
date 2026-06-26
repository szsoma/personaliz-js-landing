# Privacy

shiftyjs performs personalization entirely in the browser and makes no network requests.

## What data is stored

| Data | Storage key | Purpose |
| --- | --- | --- |
| Visitor ID | `{namespace}.visitor` | Anonymous random ID |
| First seen | `{namespace}.visitor` | Timestamp of first visit |
| Last seen | `{namespace}.visitor` | Timestamp of most recent visit |
| Visit count | `{namespace}.visitor` | Number of page loads |
| Segments | `{namespace}.segments` | Key-value pairs (e.g., industry=saas) |
| Behavior | `{namespace}.behavior` | Clicked, viewed, and submitted identifiers |

All data stays in the configured browser storage (`localStorage`, `sessionStorage`, or memory). Nothing is sent to any server.

## Storage modes

| Mode | Persistence | Use case |
| --- | --- | --- |
| `localStorage` | Survives browser restarts | Default. Best for cross-session personalization. |
| `sessionStorage` | Cleared when tab closes | When personalization should not persist across sessions. |
| `memory` | Cleared on page reload | When no persistence is appropriate. |
| `none` | No storage at all | When you only need URL-based personalization. |

## Clearing data

```js
// Clear segments only
Shifty.clearSegments();

// Clear all namespaced data (visitor, segments, behavior)
Shifty.reset();
```

## What is NOT collected

- No IP addresses
- No fingerprinting
- No cookies
- No tracking pixels
- No external analytics calls
- No cross-device identity
- No precise geolocation
- No health, religion, political, sexual orientation, or financial data

## Guidelines

Do not personalize on:
- Health status
- Religion
- Political affiliation
- Sexual orientation
- Ethnicity
- Financial distress
- Precise location

without informed consent.

Do not place in URL parameters, segment values, or debug output:
- Secrets or API keys
- Direct identifiers (email, name, phone)
- Sensitive personal data

Query parameters can appear in browser history, referrer headers, analytics tools, and server logs.

## Compliance

shiftyjs is designed to be compatible with GDPR, CCPA, and similar privacy frameworks because it:
- Processes all data locally in the browser
- Does not transmit personal data to any server
- Uses anonymous, random visitor IDs
- Allows users to clear all stored data
- Supports memory-only or no-storage modes

Consult a qualified legal adviser for your specific compliance requirements.
