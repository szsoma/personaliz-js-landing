# Examples

Copy-paste examples for common personalization patterns.

## 1. URL-parameter headline

Replace a heading when the URL contains `?industry=saas`:

```html
<h1
  data-shifty-text
  data-if-param-industry="saas"
  data-value="Webflow websites for SaaS teams"
>
  Webflow websites for modern teams
</h1>
```

Test: `https://your-site.com/?industry=saas`

## 2. UTM campaign section

Show a section only for a specific UTM campaign:

```html
<section data-show-if-utm_campaign="startup">
  A launch offer for startup campaigns.
</section>
```

Test: `https://your-site.com/?utm_campaign=startup`

## 3. Returning visitor CTA

Show different content for first-time vs. returning visitors:

```html
<div data-show-if-returning="false">
  <a href="/guide">Download the guide</a>
</div>
<div data-show-if-returning="true">
  <a href="/demo">Ready for a demo?</a>
</div>
```

Reload the page once to enter the returning-visitor state (visitCount > 1).

## 4. Persisted industry link

Replace a link's href when a segment is stored. The segment persists from a previous page visit:

```html
<a
  href="/contact"
  data-shifty-href
  data-if-segment-industry="saas"
  data-value="/contact?industry=saas"
>
  Book a call
</a>
```

Visit `/?industry=saas` first, then navigate to the page containing this link.

## 5. Referrer-specific proof

Show content based on the referring domain:

```html
<section data-show-if-referrer-contains="producthunt">
  A launch offer for Product Hunt visitors.
</section>
```

Referrer behavior requires actual navigation. Typing a URL directly produces an empty referrer.

## 6. Previous CTA behavior

Track a click, then show content based on that behavior:

```html
<a href="/pricing" data-track-click="pricing-cta">View pricing</a>

<div data-if-behavior-clicked="pricing-cta">
  Still comparing? Book a walkthrough.
</div>
```

The click is stored locally. The behavior-dependent block matches after the next evaluation or page load.

## 7. Safe formatted replacement

Replace content with formatted HTML (only formatting tags survive sanitization):

```html
<div
  data-shifty-html
  data-if-param-industry="saas"
  data-value="<strong>Built for SaaS teams</strong>"
>
  Built for modern teams
</div>
```

Only `strong`, `em`, `span`, `br`, `b`, `i`, and `u` tags survive. All attributes are removed.

## 8. Multiple conditions (AND)

All conditions must match:

```html
<div
  data-show-if
  data-if-param-industry="saas"
  data-if-returning="true"
>
  Returning SaaS visitor
</div>
```

## 9. Comma-separated values (OR)

Match any of several values:

```html
<div data-if-param-industry="saas,startup,agency">
  Matches SaaS, startup, or agency
</div>
```

## 10. Existence check

Match if a parameter exists, regardless of value:

```html
<div data-if-param-industry="">
  The industry parameter is present
</div>
```

## 11. CSS class toggling

Add or remove a CSS class based on conditions:

```html
<div data-add-class="highlight" data-if-param-industry="saas">
  Gets the "highlight" class for SaaS visitors
</div>

<div data-remove-class="dimmed" data-if-returning="true">
  Loses the "dimmed" class for returning visitors
</div>
```

## 12. URL-controlled landing page copy

Use URL variants for campaign landing pages:

```html
<h1 data-variant="h1">Default headline</h1>
<p data-variant="subtitle">Default subtitle</p>
<p>Plans start at $<span data-variant="price">49</span>.</p>
<a href="/contact" data-variant="signup">Start free</a>
```

The generic convention maps `p_<name>` to the text of `[data-variant="<name>"]` and `p_<name>_url` to the `href` of an anchor with `[data-variant="<name>"]`.

Campaign URL:

```
https://example.com/landing?p_h1=Grow_your_business_online&p_price=99&p_signup_url=/join
```

Keep analytics UTM parameters separate:

```
?utm_source=google&utm_medium=ppc&utm_campaign=erp-demo&p_h1=Grow_your_business_online&p_price=99&p_signup_url=/join
```

## 13. Form submission tracking

Track when a form is submitted:

```html
<form data-track-submit="newsletter" action="/subscribe" method="post">
  <input type="email" name="email" required>
  <button type="submit">Subscribe</button>
</form>

<div data-if-behavior-submitted="newsletter">
  Thanks for subscribing! Check out our <a href="/guide">getting started guide</a>.
</div>
```

## 14. Cloaking (prevent flash of default content)

Add `shifty-cloak` to hide elements until personalization runs:

```html
<style>
  .shifty-cloak { visibility: hidden; }
  html.shifty-ready .shifty-cloak { visibility: visible; }
</style>

<h1 class="shifty-cloak" data-shifty-text data-if-param-industry="saas" data-value="For SaaS">
  Default headline
</h1>
```

The CSS is included in the installation snippet. Only use cloaking where a brief flash of default content is unacceptable.

## 15. Manual segment via JavaScript

Set segments programmatically:

```js
Shifty.setSegment("plan", "enterprise");
Shifty.evaluate();
```

## Local smoke page

Run `npm run dev` and open `http://localhost:4173/?industry=saas`.

The smoke page uses the bundled `dist/shifty.min.js` file, so it exercises the same browser artifact you would ship to production.
